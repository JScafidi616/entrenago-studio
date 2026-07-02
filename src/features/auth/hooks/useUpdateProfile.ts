// src/auth/hooks/useUpdateProfile.ts
import { useState } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { useAuth } from '@/context/AuthContext'; // Adjust path to your context

export const useUpdateProfile = () => {
	const { user, refreshProfile } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateProfile = async (updates: { full_name?: string; username?: string; goal?:string; email?:string}) => {
		if (!user) {
			setError('User not authenticated');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			// 1. Update the database (public.profiles)
			const { error: dbError } = await supabase
				.from('profiles')
				.update(updates)
				.eq('id', user.id);

			if (dbError) throw dbError;

			// 2. Sync with Supabase Auth (auth.users metadata)
			// Only sync fields that exist in user_metadata
			const authUpdates: Record<string, string> = {};
			if (updates.full_name) {
				authUpdates.full_name = updates.full_name;
				authUpdates.display_name = updates.full_name;
			}

			if (Object.keys(authUpdates).length > 0) {
				const { error: authError } = await supabase.auth.updateUser({
					data: authUpdates,
				});
				if (authError) throw authError;
			}

			// 3. Refresh the UI (React Context)
			await refreshProfile();

		} catch (err: unknown) {
			const error = err as Error;
			setError(error.message || 'Failed to update profile');
			console.error('Error updating profile:', err);
		} finally {
			setIsLoading(false);
		}
	};

	return { updateProfile, isLoading, error };
};