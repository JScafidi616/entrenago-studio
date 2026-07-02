import ButtonProps from '@/features/auth/components/AuthButtonProps';
import AuthCardTitle from '@/features/auth/components/AuthCardTitle';
import Input from '@/features/auth/components/AuthInputProps';
import AuthNavigation from '@/features/auth/components/AuthNavigation';
import AuthProviders from '@/features/auth/components/AuthProviders';
import AuthSeparation from '@/features/auth/components/AuthSeparation';
import { useLogin } from '@/features/auth/hooks/useAuthentications';
import { useOAuthSignIn } from '@/features/auth/hooks/useOAuthSignIn';
import type { Provider } from '@supabase/supabase-js';
import { cn } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { mutate: login, isPending, error } = useLogin();
	const { signInWithProvider } = useOAuthSignIn();

	// Handles manual login with email and password
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		login(
			{ email, password },
			{
				onSuccess: () => navigate('/dashboard', { replace: true }),
			},
		);
	};

	// Handles OAuth login with Google or Facebook
	const handleOAuth = async ({ provider }: { provider: Provider }) => {
		try {
			await signInWithProvider(provider);
		} catch {
			alert('Failed to sign in with Google. Please try again.');
		}
	};

	return (
		<div
			className={cn(
				'min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900',
			)}
		>
			<div
				className={cn(
					'w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 dark:bg-neutral-800',
				)}
			>
				{/* Card Title Section */}
				<AuthCardTitle
					title='Inicia sesión en EntrenaGo'
					description='Bienvenido de nuevo, por favor inicia sesión'
				/>

				{/* Provider Auth Section */}
				<div className='space-y-3'>
					<AuthProviders
						providerName='Google'
						providerDescription='Iniciar Sesion con Google'
						providerImage='/icons/google_icon_socials.svg'
						authClick={() => handleOAuth({ provider: 'google' })}
					/>
					<AuthProviders
						providerName='Facebook'
						providerDescription='Iniciar Sesion con Facebook'
						providerImage='/icons/facebook_icon_socials.svg'
						authClick={() => handleOAuth({ provider: 'facebook' })}
					/>
				</div>
				<AuthSeparation />

				<form onSubmit={handleSubmit} className='space-y-4'>
					{/* Email Section */}
					<Input
						label='Correo electrónico'
						id='email'
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
						type='password'
						autoComplete='current-password'
						placeholder='Ingresa tu contraseña'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						linkText='¿Olvidaste tu contraseña?'
						linkHref='/forgot-password'
						required
					/>

					{error && (
						<p className={cn('text-sm text-destructive')}>{error.message}</p>
					)}

					{/* Submit Button */}
					<ButtonProps
						type='submit'
						title='Iniciar sesión'
						isPending={isPending}
					>
						Iniciar sesión
					</ButtonProps>
				</form>

				{/* Navigation to Register */}
				<AuthNavigation
					textQuestion={'¿No tienes una cuenta?'}
					location={'/register'}
					clickAction={'Crear cuenta'}
				/>
			</div>
		</div>
	);
}
