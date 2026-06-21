import { supabase } from '@/lib/supabase/supabase';
import type { Session, User } from '@supabase/supabase-js';
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

interface AuthContextType {
	user: User | null;
	session: Session | null;
	isLoading: boolean;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Function to determine if we're on the reset-password route with a token
	// const isResetPasswordRoute = () => location.startsWith('/reset-password');

	// const isPublicRoute = (path: string) =>
	// 	Object.keys(publicRoutes).includes(path);

	useEffect(() => {
		// 1. Check active session immediately
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		// 2. Listen for auth changes (login, logout, password reset token)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user ?? null);
			setIsLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []); // runs once on mount

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	return (
		<AuthContext.Provider value={{ user, session, isLoading, signOut }}>
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
