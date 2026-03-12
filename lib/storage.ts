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

export const getUserProfile = (): UserProfile => {
    if (typeof window === 'undefined') return { name: 'User', points: 0, level: 1, badges: [] };

    const stored = localStorage.getItem(PROFILE_KEY);
    if (stored) return JSON.parse(stored);

    // Default profile
    return { name: 'User', points: 0, level: 1, badges: [] };
};

export const updatePoints = (pointsToAdd: number) => {
    const profile = getUserProfile();
    profile.points += pointsToAdd;

    // Level up logic (e.g., every 100 points)
    const newLevel = Math.floor(profile.points / 100) + 1;
    if (newLevel > profile.level) {
        profile.level = newLevel;
        // Could trigger a toast notification here in a real app
    }

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    return profile;
};

export const awardBadge = (badgeId: string) => {
    const profile = getUserProfile();
    if (!profile.badges.includes(badgeId)) {
        profile.badges.push(badgeId);
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
    return profile;
};

export const getReports = (): Report[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const saveReport = (report: Omit<Report, 'id' | 'timestamp' | 'status'>): Report => {
    const reports = getReports();
    const newReport: Report = {
        ...report,
        id: Date.now().toString(),
        timestamp: Date.now(),
        status: 'Pending'
    };

    // Add to beginning of list
    const updatedReports = [newReport, ...reports];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    return newReport;
};

export const updateReportStatus = (id: string, status: Report['status']) => {
    const reports = getReports();
    const updatedReports = reports.map(report =>
        report.id === id ? { ...report, status } : report
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
};

export const getStats = () => {
    const reports = getReports();
    const total = reports.length;
    const verified = reports.filter(r => r.status === 'Verified').length;
    const investigating = reports.filter(r => r.status === 'Investigating').length;

    // Calculate verified percentage
    const verifiedRate = total > 0 ? Math.round((verified / total) * 100) : 0;

    return {
        total,
        verified,
        investigating,
        verifiedRate
    };
};
