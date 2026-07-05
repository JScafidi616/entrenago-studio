import AuthCardTitle from '@/features/auth/components/AuthCardTitle';
import AuthNavigation from '@/features/auth/components/AuthNavigation';
import AuthProviders from '@/features/auth/components/AuthProviders';
import AuthSeparation from '@/features/auth/components/AuthSeparation';
import { useLogin } from '@/features/auth/hooks/useAuthentications';
import { useOAuthSignIn } from '@/features/auth/hooks/useOAuthSignIn';
import type { Provider } from '@supabase/supabase-js';
import { cn } from '@/utils/utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
	onSuccess?: () => void;
	submitButtonText?: string;
}

export default function Login({ submitButtonText = 'Iniciar sesión' }: LoginFormProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const { mutate: login, isPending, error: apiError } = useLogin();
	const { signInWithProvider } = useOAuthSignIn();

	const [showPassword, setShowPassword] = useState(false);

	const [localError, setLocalError] = useState('');
	const displayError = localError ?? apiError?.message;

	// Handles manual login with email and password
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');

		if (!email || !password) {
			setLocalError('Por favor, completa todos los campos');
			return;
		}

		login(
			{ email, password },
			{
				onSuccess: () => navigate('/dashboard', { replace: true }),
				onError: (err) => setLocalError(err.message || 'Credenciales inválidas'),
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

	// Clear errors when user starts typing
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (localError) setLocalError('');
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (localError) setLocalError('');
	};

	return (
		<div
			className={cn(
				'bg-background flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900',
			)}
		>
			<div
				className={cn(
					'bg-card w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg dark:bg-neutral-800',
				)}
			>
				{/* Card Title Section */}
				<AuthCardTitle
					title="Inicia sesión en EntrenaGo"
					description="Bienvenido de nuevo, por favor inicia sesión"
				/>

				{/* Provider Auth Section */}
				<div className="space-y-3">
					<AuthProviders
						providerName="Google"
						providerDescription="Iniciar Sesion con Google"
						providerImage="/icons/google_icon_socials.svg"
						authClick={() => handleOAuth({ provider: 'google' })}
					/>
					<AuthProviders
						providerName="Facebook"
						providerDescription="Iniciar Sesion con Facebook"
						providerImage="/icons/facebook_icon_socials.svg"
						authClick={() => handleOAuth({ provider: 'facebook' })}
					/>
				</div>
				<AuthSeparation />

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Email Section */}
					<div className="flex flex-col">
						<div className="mb-2 flex items-center justify-between">
							<Label htmlFor="email" className="text-foreground text-sm font-medium">
								Correo electrónico
							</Label>
						</div>

						<div className="relative">
							<Mail
								className={cn(
									'text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
								)}
							/>
							<Input
								id="email"
								type="email"
								autoComplete="email"
								placeholder="Jhon.doe123@gmail.com"
								onChange={handleEmailChange}
								value={email}
								required
								aria-describedby={localError ? 'email-error' : undefined}
								className={cn(
									`bg-muted/30 border-border/50 h-11 rounded-xl pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
										displayError
											? 'border-destructive focus:border-destructive focus:ring-destructive/20'
											: ''
									}`,
								)}
							/>
						</div>
					</div>

					{/* Password Section */}
					<div className="flex flex-col">
						<div className="mb-2 flex items-center justify-between">
							<Label htmlFor="new-password" className="text-foreground text-sm font-medium">
								Contraseña
							</Label>
							<Link
								to="/forgot-password"
								role="button"
								className="text-primary text-xs font-medium hover:underline dark:text-green-400"
							>
								¿Olvidaste tu contraseña?
							</Link>
						</div>

						<div className="relative">
							<Lock
								className={cn(
									'text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
								)}
							/>
							<Input
								id="new-password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Mínimo 6 caracteres"
								onChange={handlePasswordChange}
								value={password}
								autoComplete="current-password"
								required
								minLength={6}
								className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
									displayError
										? 'border-destructive focus:border-destructive focus:ring-destructive/20'
										: ''
								}`}
							/>
							<button
								type="button"
								aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
								onClick={() => setShowPassword((v) => !v)}
								className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
							>
								{showPassword ? (
									<EyeOff className="h-4 w-4 cursor-pointer" />
								) : (
									<Eye className="h-4 w-4 cursor-pointer" />
								)}
							</button>
						</div>
					</div>

					{/* Unified Error Message */}
					{displayError && (
						<p role="alert" className="text-destructive text-center text-sm">
							{displayError}
						</p>
					)}

					{/* Submit Button */}
					<Button
						type="submit"
						title="Iniciar sesión"
						className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md bg-linear-to-r from-cyan-500 to-green-400 py-2 font-semibold transition"
					>
						{isPending ? 'Verificando...' : submitButtonText}
					</Button>
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
