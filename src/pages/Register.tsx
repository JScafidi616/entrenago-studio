// import ButtonProps from '@/features/auth/components/AuthButtonProps';
import AuthCardTitle from '@/features/auth/components/AuthCardTitle';
// import Input from '@/features/auth/components/AuthInputProps';
import AuthNavigation from '@/features/auth/components/AuthNavigation';
import AuthProviders from '@/features/auth/components/AuthProviders';
import AuthSeparation from '@/features/auth/components/AuthSeparation';
import { useRegister } from '@/features/auth/hooks/useAuthentications';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
// import type { Provider } from '@supabase/supabase-js';
import { useOAuthSignIn } from '@/features/auth/hooks/useOAuthSignIn';
import { cn } from '@/utils/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const newPasswordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const { mutate: register, isPending, error: apiError } = useRegister();
	const { mutate: oauthLogin, isPending: isOAuthPending } = useOAuthSignIn();

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

		if (cleanPassword.length < 6) {
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
					toast.success('¡Registro exitoso!', {
						duration: 10000,
						description: (
							<>
								Enlace de confirmación enviado a:
								<br />
								<strong>{cleanEmail}</strong>
							</>
						),
					});
					// Send them to login immediately
					navigate('/login', { replace: true });
				},
				onError: (err) => {
					const errorMessage = err.message || 'Credenciales inválidas';
					setLocalError(errorMessage);
				},
			},
		);
	};
	// Clears fierds
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
	const handleTogglePassword = (ref: React.RefObject<HTMLInputElement | null>) => {
		const input = ref.current;
		const start = input?.selectionStart ?? 0;
		const end = input?.selectionEnd ?? 0;

		setShowPassword((prev) => !prev);

		setTimeout(() => {
			input?.setSelectionRange(start, end);
		}, 0);
	};

	return (
		<div
			className={cn(
				'bg-background flex min-h-screen flex-col items-center justify-center px-4 py-10 sm:px-6 md:flex-row lg:px-8 dark:bg-neutral-900',
			)}
		>
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
						<p className={cn('text-sm dark:text-gray-300')}>Motívate para mantenerte saludable</p>
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
						<p className={cn('text-sm dark:text-gray-300')}>Adiós a las hojas sueltas y al caos</p>
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
						disabled={isOAuthPending}
						providerName="Google"
						providerDescription={isOAuthPending ? 'Redirigiendo...' : 'Registrarse con Google'}
						providerImage="/icons/google_icon_socials.svg"
						authClick={() => oauthLogin('google')}
					/>
					<AuthProviders
						disabled={isOAuthPending}
						providerName="Facebook"
						providerDescription={isOAuthPending ? 'Redirigiendo...' : 'Registrarse con Facebook'}
						providerImage="/icons/facebook_icon_socials.svg"
						authClick={() => oauthLogin('facebook')}
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
							<Lock
								className={cn(
									'text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
								)}
							/>
							<Input
								ref={newPasswordRef}
								id="new-password"
								name="password"
								autoComplete="new-password"
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
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => handleTogglePassword(newPasswordRef)}
								aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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
							<Lock
								className={cn(
									'text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
								)}
							/>
							<Input
								ref={confirmPasswordRef}
								id="confirm-password"
								name="confirm-password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Repite tu contraseña"
								value={confirmPassword}
								autoComplete="off"
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
								onMouseDown={(e) => e.preventDefault()}
								onClick={() => handleTogglePassword(confirmPasswordRef)}
								aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
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
		</div>
	);
}
