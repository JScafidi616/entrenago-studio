import { supabase } from '@/lib/supabase/supabase';
import type { AuthContextType, Profile } from '@/types/profile';
import type { Session, User } from '@supabase/supabase-js';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isSessionLoading, setIsSessionLoading] = useState(true);

	// TanStack Query handle the profile fetching
	const {
		data: profile,
		isLoading: isProfileLoading,
		refetch,
	} = useQuery({
		queryKey: ['profile', user?.id],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('profiles')
				.select('*')
				.eq('id', user!.id)
				.single();

			if (error) throw error;
			return data as Profile;
		},
		// Only run the query when a user is logged in
		enabled: !!user?.id,
	});

	useEffect(() => {
		// Check active session immediately
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsSessionLoading(false);
		});

		// 2. Listen for auth changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsSessionLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	// Combine loading states: Loading if session is checking OR if profile is fetching
	const isLoading = isSessionLoading || (!!user?.id && isProfileLoading);

	const refreshProfile = async () => {
		await refetch();
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				profile: user ? (profile ?? null) : null,
				isLoading,
				signOut,
				refreshProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Hook to use easily
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within AuthProvider');
	return context;
};
