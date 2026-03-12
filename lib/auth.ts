import { supabase } from './supabase';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    provider: 'google' | 'email' | 'phone';
}

// No constant needed for Supabase auth key

export const login = async (provider: User['provider'], identifier: string) => {
    if (provider === 'google') {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/dashboard`,
            },
        });
        if (error) throw error;
    } else if (provider === 'phone') {
        const { error } = await supabase.auth.signInWithOtp({
            phone: identifier,
        });
        if (error) throw error;
    }
};

export const verifyOtp = async (phone: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms',
    });
    if (error) throw error;
    return data.user;
};

export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error);
};

export const getCurrentUser = async (): Promise<User | null> => {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) return null;

    return {
        id: user.id,
        name: user.user_metadata?.full_name || user.email?.split('@')[0] || user.phone || 'User',
        email: user.email || '',
        provider: user.app_metadata?.provider as User['provider'],
        avatar: user.user_metadata?.avatar_url,
    };
};

export const isAuthenticated = async (): Promise<boolean> => {
    const user = await getCurrentUser();
    return !!user;
};
