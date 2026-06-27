import { useMemo } from 'react';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path to your useAuth hook

export const useUserInitials = () => {
	const { user, profile } = useAuth();

	return useMemo(() => {
		const fullName = user?.user_metadata?.full_name;

		if (fullName) {
			const names = fullName.trim().split(' ');
			return names.length > 1
				? (names[0][0] + names[names.length - 1][0]).toUpperCase()
				: names[0].substring(0, 2).toUpperCase();
		}

		// Fallback to email
		return profile?.email?.substring(0, 2).toUpperCase() || '??';
	}, [user, profile]);
};