import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client'; // Asegúrate de tener esta instancia creada

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
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
			navigate('/dashboard');
		}

		setLoading(false);
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
		});

		if (error) setErrorMsg(error.message);
		setLoading(false);
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
			<div className='max-w-md w-full bg-white p-8 rounded-2xl shadow-md'>
				<h2 className='text-2xl font-bold mb-6 text-center text-gray-700'>
					Iniciar sesión
				</h2>

				<form onSubmit={handleLogin} className='space-y-4'>
					<input
						type='email'
						placeholder='Correo electrónico'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
						required
					/>

					<input
						type='password'
						placeholder='Contraseña'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400'
						required
					/>

					{errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}

					<button
						type='submit'
						disabled={loading}
						className='btn w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition'
					>
						{loading ? 'Cargando...' : 'Iniciar sesión'}
					</button>
					<p className='mt-4 text-center text-sm'>
						¿No tienes cuenta?{' '}
						<a href='/register' className='text-blue-600 hover:underline'>
							Regístrate aquí
						</a>
					</p>
				</form>

				<div className='mt-6'>
					<button
						onClick={handleGoogleLogin}
						className='w-full border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition'
					>
						Iniciar con Google
					</button>
				</div>
			</div>
			{/* {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>} */}
		</div>
	);
}
