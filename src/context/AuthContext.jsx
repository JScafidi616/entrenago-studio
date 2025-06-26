import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useLocation();
	const [recoveryToken, setRecoveryToken] = useState(null);

	// Function to determine if we're on the reset-password route with a token
	const isResetPasswordRoute = () => location.startsWith('/reset-password');

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);

			if (
				session?.user &&
				(location === '/login' || location === '/') &&
				!isResetPasswordRoute()
			) {
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
						if (!isResetPasswordRoute()) {
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

