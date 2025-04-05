import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Obtenemos sesión al cargar
		supabase.auth.getSession().then(({ data: { session } }) => {
			setUser(session?.user ?? null);
		});

		// Listener de sesión
		const { data: listener } = supabase.auth.onAuthStateChange(
			(event, session) => {
				if (event === 'SIGNED_IN') {
					setUser(session.user);
					navigate('/dashboard');
				} else if (event === 'SIGNED_OUT') {
					setUser(null);
					navigate('/login');
				}
			},
		);

		return () => listener.subscription.unsubscribe();
	}, [navigate]);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

// Hook para usarlo fácilmente
export const useAuth = () => useContext(AuthContext);
