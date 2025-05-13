// import { useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useLocation();

	useEffect(() => {
		// Obtenemos sesión al cargar
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
			setLoading(false);

			// Solo redirige si el usuario está en login o en la raíz
			if (session?.user && (location === '/login' || location === '/')) {
				setLocation('/dashboard');
			}
		});

		// Listener de sesión
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_IN') {
					setUser(session.user);
					setLocation('/dashboard');
				} else if (event === 'SIGNED_OUT') {
					setUser(null);
					setLocation('/login');
				}
			},
		);

		return () => listener.subscription.unsubscribe();
	}, [location, setLocation]);

	return (
		<AuthContext.Provider value={{ user, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

// Hook para usarlo fácilmente
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
