// import { useNavigate } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [location, setLocation] = useLocation();

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
					// Aquí NO hacemos logout para no invalidar el token
					// Simplemente dejamos que el usuario permanezca en /reset-password
					// Puedes agregar lógica si quieres mostrar algo o registrar el evento
					setLocation('/reset-password');
					console.log('Evento PASSWORD_RECOVERY detectado');
				} else if (event === 'SIGNED_IN') {
					setUser(session.user);
					if (!isResetPasswordRoute()) {
						setLocation('/dashboard');
					}
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
