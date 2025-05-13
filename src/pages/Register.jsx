import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { supabase } from '../supabase/client';

export default function Register() {
	const [, setLocation] = useLocation();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');

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

	const handleChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleRegister = async (e) => {
		e.preventDefault();
		const { email, password, confirmPassword } = formData;

		if (password !== confirmPassword) {
			setError('Las contraseñas no coinciden.');
			return;
		}

		const { error } = await supabase.auth.signUp({ email, password });
		if (error) return setError(error.message);

		// Después del registro, redirigir al login
		setLocation('/login');
	};

	const handleOAuth = async (provider) => {
		const { user, error } = await supabase.auth.signInWithOAuth({ provider });

		if (error) {
			setError(error.message);
			return;
		}

		// Si el registro es exitoso con el proveedor (Google/Facebook), redirigir al dashboard
		if (user) {
			setLocation('/dashboard');
		}
	};

	return (
		<div className='min-h-screen flex flex-col md:flex-row items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8'>
			{/* Panel izquierdo con EntrenaGo (solo en escritorio) */}
			<div className='hidden md:flex w-full max-w-md flex-col gap-6 p-8 text-black'>
				<h1 className='text-3xl font-bold'>EntrenaGo</h1>

				<div className='flex items-start gap-4'>
					<div className='h-6 w-6 rounded-full bg-blue-400 text-white font-bold flex items-center justify-center'>
						✓
					</div>
					<div>
						<p className='font-semibold'>¡Comienza ya!</p>
						<p className='text-sm'>Motívate para mantenerte saludable</p>
					</div>
				</div>

				<div className='flex items-start gap-4'>
					<div className='h-6 w-6 rounded-full bg-blue-400 text-white font-bold flex items-center justify-center'>
						✓
					</div>
					<div>
						<p className='font-semibold'>Organiza tu rutina</p>
						<p className='text-sm'>Adiós a las hojas sueltas y al caos</p>
					</div>
				</div>

				<div className='flex items-start gap-4'>
					<div className='h-6 w-6 rounded-full bg-blue-400 text-white font-bold flex items-center justify-center'>
						✓
					</div>
					<div>
						<p className='font-semibold'>Sigue tu progreso</p>
						<p className='text-sm'>
							Lleva control de tus entrenamientos y metas
						</p>
					</div>
				</div>
			</div>

			{/* Formulario de registro */}
			<div className='w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 mt-6 md:mt-0'>
				<h2 className='text-2xl font-bold text-center dark:text-black'>
					Bienvenido a EntrenaGo
				</h2>
				<p className='text-sm text-center text-muted-foreground'>
					Create an account to continue:
				</p>

				<div className='space-y-3'>
					<button
						onClick={() => handleOAuth('google')}
						className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gray-400'
					>
						<img
							src='https://www.svgrepo.com/show/475656/google-color.svg'
							alt='Google'
							className='w-5 h-5'
						/>
						<span className='text-sm'>Registrarse con Google</span>
					</button>

					<button
						onClick={() => handleOAuth('facebook')}
						className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gray-400'
					>
						<img
							src='https://www.svgrepo.com/show/452196/facebook-1.svg'
							alt='Facebook'
							className='w-5 h-5'
						/>
						<span className='text-sm'>Registrarse con Facebook</span>
					</button>
				</div>

				<div className='inline-flex mb-4 items-center justify-center w-full relative'>
					<hr className='w-64 h-px my-8 bg-gray-400 border-0' />
					<span className='absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-slate-300 left-1/2 dark:text-black'>
						O con tu correo
					</span>
				</div>

				<form onSubmit={handleRegister} className='space-y-4'>
					<div>
						<label className='block text-sm mb-1 text-foreground'>
							Correo electrónico
						</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>

					<div>
						<label className='block text-sm mb-1 text-foreground'>
							Contraseña
						</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>

					<div>
						<label className='block text-sm mb-1 text-foreground'>
							Confirmar contraseña
						</label>
						<input
							type='password'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className='w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
						/>
					</div>

					{error && <p className='text-sm text-red-500'>{error}</p>}

					<button
						type='submit'
						className='w-full py-2 bg-gray-400 text-white font-semibold rounded-md hover:bg-gray-500 transition'
					>
						Crear cuenta
					</button>
				</form>

				<p className='text-center text-sm text-muted-foreground'>
					¿Ya tienes cuenta?{' '}
					<Link
						href='/login'
						className='text-primary text-blue-600 hover:underline font-medium'
					>
						Iniciar sesión
					</Link>
				</p>
			</div>
		</div>
	);
}
