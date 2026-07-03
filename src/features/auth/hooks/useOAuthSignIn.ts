import { supabase } from '@/lib/supabase/supabase';
import type { Provider } from '@supabase/supabase-js';

// export type OAuthProvider = 'google' | 'github' | 'apple';

export const useOAuthSignIn = () => {
	const signInWithProvider = async (provider: Provider) => {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider,
				options: {
					// Redirect back to your app after successful auth
					redirectTo: `${window.location.origin}/dashboard`,
					// Optional: queryParams for things like Google prompt
					queryParams: {
						access_type: 'offline',
						prompt: 'consent',
					},
				},
			});

			if (error) {
				// Handle immediate errors (e.g., provider not configured)
				console.error('OAuth error:', error.message);
				throw error;
			}

			// Note: We do NOT return data or navigate here.
			// The browser will redirect, and AuthContext will catch the new session.
		} catch (error) {
			console.error('Failed to initiate OAuth:', error);
			throw error;
		}
	};

	return { signInWithProvider };
};
