import ButtonProps from '@/components/custom/AuthButtonProps.tsx';
import AuthCardTitle from '@/components/custom/AuthCardTitle.tsx';
import Input from '@/components/custom/AuthInputProps.tsx';
import AuthNavigation from '@/components/custom/AuthNavigation.tsx';
import AuthProviders from '@/components/custom/AuthProviders.tsx';
import AuthSeparation from '@/components/custom/AuthSeparation.tsx';
import { useRegister } from '@/features/auth/hooks/useAuthentications';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { Provider } from '@supabase/supabase-js';
import { useOAuthSignIn } from '@/features/auth/hooks/useOAuthSignIn';
import { cn } from '@/utils/utils';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const { signInWithProvider } = useOAuthSignIn();
	const navigate = useNavigate();

	const { mutate: register, error } = useRegister();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		register(
			{ email, password },
			{
				onSuccess: () => {
					setIsSuccess(true);
					// Optional: Auto-redirect to login after a few seconds
					setTimeout(() => navigate('/login'), 3000);
				},
			},
		);
	};
	// Handles OAuth login with Google or Facebook
	const handleOAuth = async ({ provider }: { provider: Provider }) => {
		try {
			await signInWithProvider(provider);
		} catch (err) {
			alert('Failed to sign in with Google. Please try again.');
		}
	};
	if (isSuccess) {
		return (
			<div className='text-center space-y-4'>
				<div className='mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center'>
					<svg
						className='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M5 13l4 4L19 7'
						/>
					</svg>
				</div>
				<h2 className='text-2xl font-bold'>Check your email</h2>
				<p className='text-gray-600'>
					We've sent a confirmation link to <strong>{email}</strong>.
				</p>
				<p className='text-sm text-gray-500'>Redirecting to login...</p>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'min-h-screen flex flex-col md:flex-row items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900',
			)}
		>
			{/* Left Panel - EntrenaGo (Desktop Only) */}
			<div
				className={cn(
					'hidden md:flex w-full max-w-md flex-col gap-6 p-8 text-black',
				)}
			>
				<h1 className={cn('text-2xl font-bold text-black dark:text-gray-300')}>
					EntrenaGo
				</h1>

				<div className={cn('flex items-start gap-4')}>
					<div
						className={cn(
							'h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold flex items-center justify-center',
						)}
					>
						✓
					</div>
					<div>
						<p className={cn('font-semibold dark:text-gray-300')}>
							¡Comienza ya!
						</p>
						<p className={cn('text-sm dark:text-gray-300')}>
							Motívate para mantenerte saludable
						</p>
					</div>
				</div>

				<div className={cn('flex items-start gap-4')}>
					<div
						className={cn(
							'h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold flex items-center justify-center',
						)}
					>
						✓
					</div>
					<div>
						<p className={cn('font-semibold dark:text-gray-300')}>
							Organiza tu rutina
						</p>
						<p className={cn('text-sm dark:text-gray-300')}>
							Adiós a las hojas sueltas y al caos
						</p>
					</div>
				</div>

				<div className={cn('flex items-start gap-4 dark:text-gray-300')}>
					<div
						className={cn(
							'h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold flex items-center justify-center',
						)}
					>
						✓
					</div>
					<div>
						<p className={cn('font-semibold dark:text-gray-300')}>
							Sigue tu progreso
						</p>
						<p className={cn('text-sm dark:text-gray-300')}>
							Lleva control de tus entrenamientos y metas
						</p>
					</div>
				</div>
			</div>

			{/* Right Panel - Sign Up form */}
			<div
				className={cn(
					'w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 mt-6 md:mt-0 dark:bg-neutral-800',
				)}
			>
				{/* Card Title Section */}
				<AuthCardTitle
					title='Bienvenido a EntrenaGo'
					description='Crea una cuenta para continuar:'
				/>

				{/* Provider Auth Section */}
				<div className='space-y-3'>
					<AuthProviders
						providerName='Google'
						providerDescription='Registrarse con Google'
						providerImage='/icons/google_icon_socials.svg'
						authClick={() => handleOAuth({ provider: 'google' })}
					/>
					<AuthProviders
						providerName='Facebook'
						providerDescription='Registrarse con Facebook'
						providerImage='/icons/facebook_icon_socials.svg'
						authClick={() => handleOAuth({ provider: 'facebook' })}
					/>
				</div>
				<AuthSeparation />

				<form onSubmit={handleSubmit} className={cn('space-y-4')}>
					{/* Email Section */}
					<Input
						label='Correo electrónico'
						id='email'
						name='email'
						type='email'
						autoComplete='email'
						placeholder='Ingresa tu correo electrónico'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					{/* Password Section */}
					<Input
						label='Contraseña'
						id='password'
						name='password'
						type='password'
						autoComplete='current-password'
						placeholder='Ingresa tu contraseña'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					{/* Re-enter Password Section */}
					<Input
						label='Confirmar contraseña'
						id='confirmPassword'
						name='confirmPassword'
						type='password'
						autoComplete='current-password'
						placeholder='Re-ingresa tu contraseña'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>

					{error && (
						<p className={cn('text-sm text-destructive text-red-500')}>
							{error.message}
						</p>
					)}

					{/* Submit Button */}
					<ButtonProps type='submit' title='Crear cuenta'>
						Crear cuenta
					</ButtonProps>
				</form>

				{/* Navigation to Login */}
				<AuthNavigation
					textQuestion={'¿Ya tienes cuenta?'}
					location={'/login'}
					clickAction={'Iniciar sesión'}
				/>
			</div>
		</div>
	);
}
