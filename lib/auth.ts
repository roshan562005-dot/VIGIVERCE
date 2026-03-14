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
        const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/dashboard` : '';
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo,
            },
        });
        if (error) throw error;
    } else if (provider === 'phone') {
        const { error } = await supabase.auth.signInWithOtp({
            phone: identifier,
        });
        if (error) throw error;
    } else if (provider === 'email') {
        const { error } = await supabase.auth.signInWithOtp({
            email: identifier,
        });
        if (error) throw error;
    }
};

export const verifyOtp = async (identifier: string, token: string, type: 'sms' | 'email' = 'sms') => {
    const params = type === 'sms' 
        ? { phone: identifier, token, type: 'sms' as const }
        : { email: identifier, token, type: 'email' as const };
        
    const { data, error } = await supabase.auth.verifyOtp(params);
    if (error) throw error;
    
    // Sync to database
    if (data.user) {
        await syncUserToDatabase(data.user);
    }
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

export const syncUserToDatabase = async (user: any) => {
    if (!user) return;
    
    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || user.phone || 'User';
    
    // Upsert the profile into our database
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            full_name: name,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
        
    if (error) console.error("Database sync error:", error);
};

export const isAuthenticated = async (): Promise<boolean> => {
    const user = await getCurrentUser();
    return !!user;
};
