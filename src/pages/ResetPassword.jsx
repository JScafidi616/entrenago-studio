import { useEffect, useState } from 'react';
import { Link, Redirect, useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export default function ResetPassword() {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [location] = useLocation();

	// Verificar si el usuario ya está autenticado
	// Extraer token de la URL (ej: /reset-password#access_token=...)
	// Función para extraer query params
	// Extraer token del hash
	const getTokenFromHash = () => {
		const hash = window.location.hash.substring(1);
		const params = new URLSearchParams(hash);
		return params.get('access_token');
	};

	const token = getTokenFromHash();

	useEffect(() => {
		if (!token) {
			setErrorMsg('Enlace inválido o expirado. Solicita un nuevo enlace.');
		}
	}, [token]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg('');

		if (password !== confirmPassword) {
			setErrorMsg('Las contraseñas no coinciden.');
			setLoading(false);
			return;
		}

		// Usar verifyResetPasswordForEmail para validar y cambiar contraseña
		const { data, error } = await supabase.auth.verifyResetPasswordForEmail(
			token,
			{
				password,
				redirectTo: window.location.origin + '/login?reset=success',
			},
		);

		if (error) {
			setErrorMsg(error.message || 'Error al actualizar la contraseña');
		} else {
			setSuccess(true);
			// Opcional: redirigir tras unos segundos
			setTimeout(() => (window.location.href = '/login?reset=success'), 2000);
		}
		setLoading(false);
	};

	if (!token) return <Redirect to='/login' />;

	return (
		<div className='max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-4'>Restablecer contraseña</h1>

			{success ? (
				<div className='text-green-600 mb-4'>
					¡Contraseña actualizada correctamente! Redirigiendo...
				</div>
			) : (
				<>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<input
							type='password'
							placeholder='Nueva contraseña'
							className='w-full p-2 border rounded'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={6}
						/>
						<input
							type='password'
							placeholder='Confirmar nueva contraseña'
							className='w-full p-2 border rounded'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							minLength={6}
						/>
						{errorMsg && <div className='text-red-600'>{errorMsg}</div>}
						<button
							type='submit'
							className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
							disabled={loading}
						>
							{loading ? 'Actualizando...' : 'Establecer nueva contraseña'}
						</button>
					</form>
					<div className='mt-4 text-center'>
						<Link href='/login' className='text-blue-600 hover:underline'>
							Volver al inicio de sesión
						</Link>
					</div>
				</>
			)}
		</div>
	);
}
