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
