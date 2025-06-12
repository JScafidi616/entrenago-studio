import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [location, setLocation] = useLocation(); // Hook de Wouter
	const showSuccess = location.includes('reset=success');

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
			setLocation('/dashboard');
		}

		setLoading(false);
	};

	// const handleGoogleLogin = async () => {
	// 	setLoading(true);
	// 	setErrorMsg('');

	// 	const { error } = await supabase.auth.signInWithOAuth({
	// 		provider: 'google',
	// 		options: {
	// 			redirectTo: window.location.origin,
	// 		},
	// 	});

	// 	if (error) {
	// 		setErrorMsg(error.message);
	// 		setLoading(false);
	// 	}
	// };

	// const handleFaceBookLogin = async () => {
	// 	setLoading(true);
	// 	setErrorMsg('');

	// 	const { error } = await supabase.auth.signInWithOAuth({
	// 		provider: 'facebook',
	// 		options: {
	// 			// Forzamos el scope más básico
	// 			scopes: 'public_profile',
	// 			redirectTo: window.location.origin,
	// 		},
	// 	});

	// 	if (error) {
	// 		console.error('OAuth Error:', error.message);
	// 		setErrorMsg(error.message);
	// 		setLoading(false);
	// 	}
	// };

	const handleOAuth = async (provider) => {
		setLoading(true);
		setErrorMsg('');
		const { error } = await supabase.auth.signInWithOAuth({ provider });

		if (error) {
			console.error('OAuth Error:', error.message);
			setErrorMsg(error.message);
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900'>
			<div className='w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 dark:bg-neutral-800'>
				<div className='text-center '>
					<h2 className='text-2xl font-bold text-foreground text-black dark:text-gray-300 '>
						Inicia sesión en EntrenaGo
					</h2>
					<p className='text-sm text-muted-foreground mt-1 dark:text-gray-300'>
						Bienvenido de nuevo, por favor inicia sesión
					</p>
					{showSuccess && (
						<div className='mb-4 p-2 bg-green-100 text-green-700 rounded'>
							¡Contraseña actualizada correctamente! Ahora puedes iniciar
							sesión.
						</div>
					)}
				</div>

				<div className='space-y-3'>
					<button
						onClick={() => handleOAuth('google')}
						className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400'
					>
						<img
							src='https://www.svgrepo.com/show/475656/google-color.svg'
							alt='Google'
							className='w-5 h-5'
						/>
						<span className='text-sm font-semibold'>Iniciar con Google</span>
					</button>

					<button
						onClick={() => handleOAuth('facebook')}
						className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400'
					>
						<img
							src='https://www.svgrepo.com/show/452196/facebook-1.svg'
							alt='Facebook'
							className='w-5 h-5'
						/>
						<span className='text-sm font-semibold'>Iniciar con Facebook</span>
					</button>
				</div>

				<div className='inline-flex mb-4 items-center justify-center w-full'>
					<hr className='w-64 h-px my-8 bg-black border-0 dark:bg-gray-300'></hr>
					<span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-gray-300 bg-slate-300 dark:bg-neutral-800'>
						O con tu cuenta:
					</span>
				</div>

				<form onSubmit={handleLogin} className='space-y-4'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm mb-1 text-foreground dark:text-gray-300'
						>
							Correo electrónico
						</label>
						<input
							id='email'
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className='w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white'
						/>
					</div>

					<div>
						<div className='flex justify-between items-center mb-1'>
							<label
								htmlFor='password'
								className='text-sm text-foreground dark:text-gray-300'
							>
								Contraseña
							</label>
							<a
								href='#'
								className='text-xs text-primary hover:underline text-green-600 dark:text-green-400'
							>
								¿Olvidaste tu contraseña?
							</a>
						</div>
						<input
							id='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className='w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white'
						/>
					</div>

					{errorMsg && <p className='text-sm text-destructive'>{errorMsg}</p>}

					<button
						type='submit'
						disabled={loading}
						className='w-full py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition bg-gradient-to-r from-cyan-500 to-green-400'
					>
						{loading ? 'Cargando...' : 'Iniciar sesión'}
					</button>
				</form>

				<p className='text-center text-sm text-muted-foreground dark:text-gray-300'>
					¿No tienes una cuenta?{' '}
					<Link
						href='/register'
						className='text-primary font-medium text-green-600 dark:text-green-400 hover:underline'
					>
						Crear cuenta
					</Link>
				</p>
			</div>
		</div>
	);
}
