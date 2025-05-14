import { useEffect, useState } from 'react';
import { Link, Redirect } from 'wouter';
import { supabase } from '../supabase/client';

export default function ResetPassword() {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [success, setSuccess] = useState(false);
	// const [location] = useLocation();

	// Extraer token de query params
	const getToken = () => {
		const params = new URLSearchParams(window.location.search);
		return params.get('token');
	};

	const token = getToken();

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

		// Aquí no existe verifyResetPasswordForEmail en SDK oficial
		// Usamos updateUser con accessToken (token)
		const { error } = await supabase.auth.updateUser(
			{ password },
			{ accessToken: token },
		);

		if (error) {
			setErrorMsg(error.message || 'Error al actualizar la contraseña');
		} else {
			setSuccess(true);
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
