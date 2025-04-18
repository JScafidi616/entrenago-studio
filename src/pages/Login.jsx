import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
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
			navigate({ to: '/dashboard' });
		}

		setLoading(false);
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		setErrorMsg('');

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: window.location.origin + '/dashboard',
			},
		});

		if (error) {
			setErrorMsg(error.message);
			setLoading(false);
		}
	};

	const handleFaceBookLogin = async () => {
		setLoading(true);
		setErrorMsg('');

		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'facebook',
			options: {
				// Forzamos el scope más básico
				scopes: 'public_profile',
				redirectTo: window.location.origin + '/dashboard',
			},
		});

		if (error) {
			console.error('OAuth Error:', error.message);
			setErrorMsg(error.message);
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 '>
			<div className='w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300'>
				<div className='text-center '>
					<h2 className='text-2xl font-bold text-foreground dark:text-black '>
						Inicia sesión en EntrenaGo
					</h2>
					<p className='text-sm text-muted-foreground mt-1'>
						Bienvenido de nuevo, por favor inicia sesión
					</p>
				</div>

				<div className='space-y-3'>
					<button
						onClick={handleGoogleLogin}
						className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gray-400'
					>
						<img
							src='https://www.svgrepo.com/show/475656/google-color.svg'
							alt='Google'
							className='w-5 h-5'
						/>
						<span className='text-sm'>Iniciar con Google</span>
					</button>

					<button
						onClick={handleFaceBookLogin}
						className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gray-400'
					>
						<img
							src='https://www.svgrepo.com/show/452196/facebook-1.svg'
							alt='Facebook'
							className='w-5 h-5'
						/>
						<span className='text-sm'>Iniciar con Facebook</span>
					</button>
				</div>

				<div className='inline-flex mb-4 items-center justify-center w-full'>
					<hr className='w-64 h-px my-8 bg-gray-400 border-0'></hr>
					<span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-black bg-slate-300'>
						O con tu cuenta:
					</span>
				</div>

				<form onSubmit={handleLogin} className='space-y-4'>
					<div>
						<label
							htmlFor='email'
							className='block text-sm mb-1 text-foreground'
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
							<label htmlFor='password' className='text-sm text-foreground'>
								Contraseña
							</label>
							<a href='#' className='text-xs text-primary hover:underline'>
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
						className='w-full py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition bg-gray-400'
					>
						{loading ? 'Cargando...' : 'Iniciar sesión'}
					</button>
				</form>

				<p className='text-center text-sm text-muted-foreground '>
					¿No tienes una cuenta?{' '}
					<a
						href='/register'
						className='text-primary hover:underline font-medium'
					>
						Crear cuenta
					</a>
				</p>
			</div>
		</div>
	);
}
