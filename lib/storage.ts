import { supabase } from './supabase';

export interface Report {
    id: string;
    drugName: string;
    batchNumber?: string;
    symptoms: string;
    severity: string;
    dateOfOnset: string;
    status: 'Pending' | 'Verified' | 'Investigating' | 'Dismissed';
    timestamp: number;
    aiScore: number;
    aiFeedback: string[];
}

export interface UserProfile {
    name: string;
    points: number;
    level: number;
    badges: string[];
}

const STORAGE_KEY = 'vigiverse_reports';
const PROFILE_KEY = 'vigiverse_profile';

export const getUserProfile = async (): Promise<UserProfile> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { name: 'User', points: 0, level: 1, badges: [] };

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
    
    if (error || !data) {
        return { 
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User', 
            points: 0, 
            level: 1, 
            badges: [] 
        };
    }

    return {
        name: data.full_name || 'User',
        points: data.points || 0,
        level: Math.floor((data.points || 0) / 100) + 1,
        badges: data.badges || []
    };
};

export const updateUserProfile = async (name: string): Promise<UserProfile> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const currentProfile = await getUserProfile();

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: name,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    // If there's an error, it might be because the profile doesn't exist yet, we'd upsert it instead.
    if (error) {
        const { error: insertError } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                full_name: name,
                points: currentProfile.points,
                badges: currentProfile.badges,
                updated_at: new Date().toISOString()
            });
        if (insertError) throw insertError;
    }

    return { ...currentProfile, name };
};

export const updatePoints = async (pointsToAdd: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const currentProfile = await getUserProfile();
    const newPoints = currentProfile.points + pointsToAdd;

    const { data, error } = await supabase
        .from('profiles')
        .update({ 
            points: newPoints,
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
    
    if (error) throw error;
    return { ...currentProfile, points: newPoints };
};

export const awardBadge = async (badgeId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const currentProfile = await getUserProfile();
    if (!currentProfile.badges.includes(badgeId)) {
        const newBadges = [...currentProfile.badges, badgeId];
        const { error } = await supabase
            .from('profiles')
            .update({ badges: newBadges })
            .eq('id', user.id);
        
        if (error) throw error;
        return { ...currentProfile, badges: newBadges };
    }
    return currentProfile;
};

export const getReports = async (): Promise<Report[]> => {
    const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error("Error fetching reports:", error);
        return [];
    }

    return data.map(r => ({
        id: r.id,
        drugName: r.drug_name,
        batchNumber: r.batch_number,
        symptoms: r.symptoms,
        severity: r.severity,
        dateOfOnset: r.date_of_onset,
        status: r.status as Report['status'],
        timestamp: new Date(r.created_at).getTime(),
        aiScore: r.ai_score,
        aiFeedback: r.ai_feedback
    }));
};

export interface LeaderboardProfile {
    id: string;
    rank: number;
    name: string;
    points: number;
    badge: string;
    reports: number;
    avatar: string;
}

export const getLeaderboard = async (limit: number = 20): Promise<LeaderboardProfile[]> => {
    // 1. Fetch top users ordered by points
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name, points, badges')
        .order('points', { ascending: false })
        .limit(limit);

    if (profilesError || !profiles) {
        console.error("Error fetching leaderboard:", profilesError);
        return [];
    }

    // 2. Fetch all reports to accurately count reports per user
    // In a real production app at scale, this should be a DB View or a counter column.
    const { data: reports, error: reportsError } = await supabase
        .from('reports')
        .select('user_id');

    // Create a map to securely count reports per user ID
    const reportCounts: Record<string, number> = {};
    if (!reportsError && reports) {
        reports.forEach(r => {
            reportCounts[r.user_id] = (reportCounts[r.user_id] || 0) + 1;
        });
    }

    // 3. Format into the UI structure
    return profiles.map((p, index) => {
        const name = p.full_name || 'Anonymous User';
        // Generate an avatar string (e.g. "John Doe" -> "JD")
        const nameParts = name.trim().split(' ');
        let avatar = '?';
        if (nameParts.length >= 2) {
            avatar = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        } else if (nameParts.length === 1 && nameParts[0].length > 0) {
            avatar = nameParts[0].substring(0, 2).toUpperCase();
        }

        // Determine Badge string based on points dynamically
        let badge = "✨ Beginner";
        if (p.points >= 2000) badge = "💎 Platinum";
        else if (p.points >= 1500) badge = "🥇 Gold";
        else if (p.points >= 1000) badge = "🥈 Silver";
        else if (p.points >= 500) badge = "⭐ Rising Star";

        return {
            id: p.id,
            rank: index + 1,
            name: name,
            points: p.points || 0,
            badge: badge,
            reports: reportCounts[p.id] || 0,
            avatar: avatar
        };
    });
};

export const saveReport = async (report: Omit<Report, 'id' | 'timestamp' | 'status'>): Promise<Report> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
        .from('reports')
        .insert({
            user_id: user.id,
            drug_name: report.drugName,
            batch_number: report.batchNumber,
            symptoms: report.symptoms,
            severity: report.severity,
            date_of_onset: report.dateOfOnset,
            ai_score: report.aiScore,
            ai_feedback: report.aiFeedback,
            status: 'Pending'
        })
        .select()
        .single();
    
    if (error) throw error;

    return {
        ...report,
        id: data.id,
        timestamp: new Date(data.created_at).getTime(),
        status: 'Pending'
    };
};

export const updateReportStatus = async (id: string, status: Report['status']) => {
    const { error } = await supabase
        .from('reports')
        .update({ status })
        .eq('id', id);
    
    if (error) throw error;
};

export const getStats = async () => {
    const reports = await getReports();
    const total = reports.length;
    const verified = reports.filter(r => r.status === 'Verified').length;
    const investigating = reports.filter(r => r.status === 'Investigating').length;

    const verifiedRate = total > 0 ? Math.round((verified / total) * 100) : 0;

    return {
        total,
        verified,
        investigating,
        verifiedRate
    };
};
