// import { useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useLocation();
	const [recoveryToken, setRecoveryToken] = useState(null);

	// Función para saber si estamos en reset-password con token
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
				if (event === 'PASSWORD_RECOVERY') {
					//setLocation('/reset-password');
					setRecoveryToken(session?.access_token || null);
					console.log(
						'Evento PASSWORD_RECOVERY detectado, token:',
						session?.access_token,
					);
					return;
				} else if (event === 'SIGNED_IN') {
					setUser(session.user);
					if (!isResetPasswordRoute()) {
						setLocation('/dashboard');
					}
					return;
				} else if (event === 'SIGNED_OUT') {
					setUser(null);
					setLocation('/login');
					return;
				} else if (event === 'USER_UPDATED') {
					console.log('Evento USER_UPDATED detectado');
					supabase.auth.signOut();
					setLocation('/login?reset=success');
					return;
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

// Hook para usarlo fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
