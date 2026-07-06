// import ButtonProps from '@/features/auth/components/AuthButtonProps';
import AuthCardTitle from '@/features/auth/components/AuthCardTitle';
// import Input from '@/features/auth/components/AuthInputProps';
import AuthNavigation from '@/features/auth/components/AuthNavigation';
import AuthProviders from '@/features/auth/components/AuthProviders';
import AuthSeparation from '@/features/auth/components/AuthSeparation';
import { useRegister } from '@/features/auth/hooks/useAuthentications';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { Provider } from '@supabase/supabase-js';
import { useOAuthSignIn } from '@/features/auth/hooks/useOAuthSignIn';
import { cn } from '@/utils/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Mail, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [countdown, setCountdown] = useState(30);
	const { signInWithProvider } = useOAuthSignIn();
	const navigate = useNavigate();

	const { mutate: register, isPending, error: apiError } = useRegister();
	const [localError, setLocalError] = useState('');
	const displayError = localError ?? apiError?.message ?? '';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');

		if (isPending) return;

		const cleanEmail = email.trim();
		const cleanPassword = password.trim();
		const cleanConfirmPassword = confirmPassword.trim();
		let verifiedPassword = '';
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// Empty checks
		if (!cleanEmail || !cleanPassword || !cleanConfirmPassword) {
			setLocalError('Por favor, completa todos los campos');
			return;
		}
		// same password check
		if (cleanPassword !== cleanConfirmPassword) {
			setLocalError('Una de las dos contraseñas no coinciden');
			return;
		} else {
			verifiedPassword = cleanPassword;
		}

		// Password complexity checks
		const lowerCaseCheck = /[a-z]/.test(cleanPassword);
		const upperCaseCheck = /[A-Z]/.test(cleanPassword);
		const numberCheck = /[0-9]/.test(cleanPassword);
		const symbolCheck = /[^A-Za-z0-9]/.test(cleanPassword);

		if (!lowerCaseCheck || !upperCaseCheck || !numberCheck || !symbolCheck) {
			setLocalError(
				'La contraseña debe incluir al menos un carácter de cada uno: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\':"|<>?,./`~.',
			);
			return;
		}

		if (password.length < 6 && confirmPassword.length < 6) {
			setLocalError('La contraseña debe tener al menos 6 caracteres');
			return;
		}

		// Email format check
		if (!emailRegex.test(cleanEmail)) {
			setLocalError('Por favor, ingresa un correo electrónico válido');
			return;
		}

		register(
			{ email: cleanEmail, password: verifiedPassword },
			{
				onSuccess: () => {
					setIsSuccess(true);
					// Optional: Auto-redirect to login after a few seconds
					setTimeout(() => navigate('/login'), 1000);
				},
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

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (localError) setLocalError('');
	};
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (localError) setLocalError('');
	};
	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		if (localError) setLocalError('');
	};

	useEffect(() => {
		if (!isSuccess) return;

		if (countdown <= 0) {
			navigate('/login', { replace: true });
			return;
		}

		const timer = setTimeout(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [isSuccess, countdown, navigate]);

	return (
		<div
			className={cn(
				'bg-background flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-6 md:flex-row lg:px-8 dark:bg-neutral-900',
			)}
		>
			{!isSuccess ? (
				<>
					{/* Left Panel - EntrenaGo (Desktop Only) */}
					<div className={cn('hidden w-full max-w-md flex-col gap-6 p-8 text-black md:flex')}>
						<h1 className={cn('text-2xl font-bold text-black dark:text-gray-300')}>EntrenaGo</h1>

						<div className={cn('flex items-start gap-4')}>
							<div
								className={cn(
									'flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-green-400 font-bold text-white',
								)}
							>
								✓
							</div>
							<div>
								<p className={cn('font-semibold dark:text-gray-300')}>¡Comienza ya!</p>
								<p className={cn('text-sm dark:text-gray-300')}>
									Motívate para mantenerte saludable
								</p>
							</div>
						</div>

						<div className={cn('flex items-start gap-4')}>
							<div
								className={cn(
									'flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-green-400 font-bold text-white',
								)}
							>
								✓
							</div>
							<div>
								<p className={cn('font-semibold dark:text-gray-300')}>Organiza tu rutina</p>
								<p className={cn('text-sm dark:text-gray-300')}>
									Adiós a las hojas sueltas y al caos
								</p>
							</div>
						</div>

						<div className={cn('flex items-start gap-4 dark:text-gray-300')}>
							<div
								className={cn(
									'flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-green-400 font-bold text-white',
								)}
							>
								✓
							</div>
							<div>
								<p className={cn('font-semibold dark:text-gray-300')}>Sigue tu progreso</p>
								<p className={cn('text-sm dark:text-gray-300')}>
									Lleva control de tus entrenamientos y metas
								</p>
							</div>
						</div>
					</div>

					{/* Right Panel - Sign Up form */}
					<div
						className={cn(
							'bg-card mt-6 w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg md:mt-0 dark:bg-neutral-800',
						)}
					>
						{/* Card Title Section */}
						<AuthCardTitle
							title="Bienvenido a EntrenaGo"
							description="Crea una cuenta para continuar:"
						/>

						{/* Provider Auth Section */}
						<div className="space-y-3">
							<AuthProviders
								providerName="Google"
								providerDescription="Registrarse con Google"
								providerImage="/icons/google_icon_socials.svg"
								authClick={() => handleOAuth({ provider: 'google' })}
							/>
							<AuthProviders
								providerName="Facebook"
								providerDescription="Registrarse con Facebook"
								providerImage="/icons/facebook_icon_socials.svg"
								authClick={() => handleOAuth({ provider: 'facebook' })}
							/>
						</div>

						<AuthSeparation />

						<form onSubmit={handleSubmit} className="space-y-4" noValidate={true}>
							<div className="flex flex-col">
								{/* Email Section */}
								<div className="mb-1 flex items-center justify-between">
									<Label htmlFor="email" className="text-foreground text-sm font-medium">
										Correo electrónico
									</Label>
								</div>
								<div className="relative mb-2">
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
													? 'border-destructive focus:border-destructive focus:ring-destructive/20 bg-destructive/10 dark:bg-destructive/20'
													: ''
											}`,
										)}
									/>
								</div>

								{/* New password */}
								<div className="mb-1 flex items-center justify-between">
									{' '}
									<Label htmlFor="new-password" className="text-foreground text-sm font-medium">
										Nueva contraseña
									</Label>
								</div>
								<div className="relative mb-2">
									<Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
									<Input
										id="new-password"
										type={showPassword ? 'text' : 'password'}
										placeholder="Mínimo 6 caracteres"
										value={password}
										onChange={handlePasswordChange}
										required
										minLength={6}
										className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
											displayError
												? 'border-destructive focus:border-destructive focus:ring-destructive/20 dark:bg-destructive/20'
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

								{/* Confirm password */}
								<div className="mb-1 flex items-center justify-between">
									<Label htmlFor="confirm-password" className="text-foreground text-sm font-medium">
										Confirmar nueva contraseña
									</Label>
								</div>
								<div className="relative">
									<Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
									<Input
										id="confirm-password"
										type={showPassword ? 'text' : 'password'}
										placeholder="Repite tu contraseña"
										value={confirmPassword}
										onChange={handleConfirmPasswordChange}
										required
										minLength={6}
										className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
											displayError
												? 'border-destructive focus:border-destructive focus:ring-destructive/20 dark:bg-destructive/20'
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

								{/* Unified Error Message */}
								{displayError && (
									<p role="alert" className="text-destructive mt-0.5 text-center text-xs">
										{displayError}
									</p>
								)}
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								title="Crear cuenta"
								className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md bg-linear-to-r from-cyan-500 to-green-400 py-2 font-semibold transition"
								disabled={isPending}
							>
								Crear cuenta
							</Button>
						</form>

						{/* Navigation to Login */}
						<AuthNavigation
							textQuestion={'¿Ya tienes cuenta?'}
							location={'/login'}
							clickAction={'Iniciar sesión'}
						/>
					</div>
				</>
			) : (
				/* ── Success state ── */
				<div className="border-border/50 bg-card supports-backdrop-filter:bg-card/90 rounded-2xl border p-8 shadow-xl backdrop-blur dark:bg-neutral-800/80 dark:supports-backdrop-filter:bg-neutral-800/80">
					<div className="flex flex-col items-center py-2 text-center">
						<div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 dark:bg-green-500/15">
							<CheckCircle2 className="h-8 w-8 text-green-500" strokeWidth={1.75} />
						</div>

						<h2 className="text-foreground mb-2 text-xl font-bold">Revisa buzón de correos</h2>
						<p className="text-muted-foreground mb-1 text-sm leading-relaxed">
							Hemos enviado un enlace de confirmacion a tu correo electrónico:{' '}
							<strong>{email}</strong>.
						</p>
						<p className="text-muted-foreground mb-8 text-sm">
							Serás redirigido al inicio de sesión en{' '}
							<span className="font-semibold text-cyan-500">{countdown}</span>{' '}
							{countdown === 1 ? 'segundo' : 'segundos'}...
						</p>

						<Link
							to="/login"
							className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-400"
						>
							Ir al inicio de sesión ahora
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}
