import { publicRoutes } from '@/routes';
import { supabase } from '@/supabase/client.ts';
import type { User } from '@supabase/supabase-js';
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { useLocation } from 'wouter';

interface AuthContextType {
	user: User | null; // Define UserType según tu modelo de usuario
	loading: boolean;
	recoveryToken: string | null; // Token de recuperación, si es necesario
	// otros valores que provea el contexto
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useLocation();
	const [recoveryToken, setRecoveryToken] = useState<string | null>(null);

	// Function to determine if we're on the reset-password route with a token
	const isResetPasswordRoute = () => location.startsWith('/reset-password');

	const isPublicRoute = (path: string) =>
		Object.keys(publicRoutes).includes(path);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);

			if (session?.user && isPublicRoute(location) && !isResetPasswordRoute()) {
				setLocation('/dashboard');
			}
		});

		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				switch (event) {
					case 'PASSWORD_RECOVERY':
						setRecoveryToken(session?.access_token ?? null);
						break;
					case 'SIGNED_IN':
						setUser(session?.user ?? null);
						if (!isResetPasswordRoute() && isPublicRoute(location)) {
							setLocation('/dashboard');
						}
						break;
					case 'SIGNED_OUT':
						setUser(null);
						setLocation('/login');
						break;
					case 'USER_UPDATED':
						console.log('Evento USER_UPDATED detectado');
						supabase.auth.signOut();
						setLocation('/login?reset=success');
						break;
				}
			},
		);

		return () => listener.subscription.unsubscribe();
	}, [location, setLocation]);

	return (
		<AuthContext.Provider value={{ user, loading, recoveryToken }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook to use easily
export const useAuth = () => useContext(AuthContext);
