import { supabase } from '@/supabase/client';
import type { Provider } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export function useAuthentication() {
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [location, setLocation] = useLocation(); // Hook de Wouter
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const showSuccess = location.includes('reset=success');

	// Verificar si el usuario ya está autenticado
	useEffect(() => {
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				setLocation('/dashboard'); // Redirigir al dashboard si ya está autenticado
			}
		};

		checkUser();
	}, [setLocation]);

	const handleLogin = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		setLoading(true);
		setErrorMsg('');

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setErrorMsg(error.message);
		} else {
			console.log('Usuario logueado:', data);
			setLocation('/dashboard');
		}

		setLoading(false);
	};

	const handleOAuth = async ({ provider }: { provider: Provider }) => {
		setLoading(true);
		setErrorMsg('');
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/dashboard`,
			},
		});

		if (error) {
			console.error('OAuth Error:', error.message);
			setErrorMsg(error.message);
		} else {
			console.log('Usuario logueado con provider:', data);
		}

		setLoading(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password, confirmPassword } = formData;

		if (password !== confirmPassword) {
			setErrorMsg('Las contraseñas no coinciden.');
			return;
		}

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) return setErrorMsg(error.message);

		// Después del registro, redirigir al login
		setLocation('/login');
	};

	return {
		handleLogin,
		handleOAuth,
		handleRegister,
		handleChange,
		showSuccess,
		loading,
		errorMsg,
		formData,
		setFormData,
		location,
	};
}
