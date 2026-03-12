export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    provider: 'google' | 'email' | 'phone';
}

const AUTH_KEY = 'vigiverse_auth_session';

export const login = (provider: User['provider'], identifier: string): User => {
    const user: User = {
        id: Date.now().toString(),
        name: identifier.split('@')[0] || 'User',
        email: identifier.includes('@') ? identifier : `${identifier}@example.com`,
        provider,
        avatar: provider === 'google' ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${identifier}` : undefined
    };

    if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    }
    return user;
};

export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY);
    }
};

export const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(AUTH_KEY);
    return stored ? JSON.parse(stored) : null;
};

export const isAuthenticated = (): boolean => {
    return !!getCurrentUser();
};
