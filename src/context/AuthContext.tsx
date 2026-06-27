import { supabase } from '@/lib/supabase/supabase';
import type { AuthContextType, Profile } from '@/types/profile';
import type { Session, User } from '@supabase/supabase-js';
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [profile, setProfile] = useState<Profile>(null);
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchProfile = async (userId: string) => {
		const { data, error } = await supabase
			.from('profiles')
			.select('*') // Selects all columns, including full_name
			.eq('id', userId)
			.single();
		console.log(error);

		if (data) {
			setProfile(data as Profile);
		} else {
			setProfile(null);
		}
	};

	useEffect(() => {
		// 1. Check active session immediately
		supabase.auth.getSession().then(async ({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);

			if (session?.user) await fetchProfile(session.user.id);
			setIsLoading(false);
		});

		// 2. Listen for auth changes (login, logout, password reset token)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);

			if (session?.user) {
				await fetchProfile(session.user.id);
			} else {
				setProfile(null);
			}
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []); // runs once on mount

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	const refreshProfile = async () => {
		if (user) await fetchProfile(user.id);
	};

	return (
		<AuthContext.Provider
			value={{ user, session, profile, isLoading, signOut, refreshProfile }}
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
