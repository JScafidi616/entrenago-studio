import { Dumbbell, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '@/features/auth/hooks/useAuthentications';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '../utils/utils';
import { toast } from 'sonner';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const { mutate: forgotPassword, isPending, error: apiError } = useForgotPassword();
	const [localError, setLocalError] = useState('');

	const displayError = localError ?? apiError?.message ?? '';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');

		if (isPending) return;

		const cleanEmail = email.trim();

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!cleanEmail) {
			setLocalError('Por favor, ingresa tu correo electrónico');
			return;
		}
		if (!emailRegex.test(cleanEmail)) {
			setLocalError('Por favor, ingresa un correo electrónico válido');
			return;
		}

		forgotPassword(email, {
			onSuccess: () => setIsSuccess(true),
			onError: (err) => {
				const errorMessage = err.message || 'Credenciales inválidas';
				toast.error(errorMessage);
				setLocalError(errorMessage);
			},
		});
	};

	// Clear errors when user starts typing
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		if (localError) setLocalError('');
	};

	return (
		<div className="bg-background flex min-h-screen items-center justify-center px-4 transition-colors duration-300 dark:bg-neutral-900">
			<div className="w-full max-w-md">
				{/* Logo */}
				<div className="mb-8 flex items-center justify-center gap-2.5">
					<div className="rounded-full bg-linear-to-r from-cyan-500 to-green-400 p-2.5 shadow-md">
						<Dumbbell className="h-6 w-6 text-white" />
					</div>
					<span className="text-foreground text-xl font-bold">EntrenaGo</span>
				</div>

				<div className="border-border/50 bg-card supports-backdrop-filter:bg-card/90 rounded-2xl border p-8 shadow-xl backdrop-blur dark:bg-neutral-800/80 dark:supports-backdrop-filter:bg-neutral-800/80">
					{!isSuccess ? (
						/* ── Form state ── */
						<>
							<div className="mb-6">
								<h1 className="text-foreground text-2xl font-bold text-balance">
									¿Olvidaste tu contraseña?
								</h1>
								<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
									Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu
									contraseña.
								</p>
							</div>

							<form
								onSubmit={handleSubmit}

								className="space-y-4"
								noValidate={true}
							>
								<div className="flex flex-col">
									{/* Email Section */}
									<div className="mb-1 flex items-center justify-between">
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
											placeholder="Jhon.doe123@gmail.com"
											value={email}
											onChange={handleEmailChange}
											aria-describedby={localError ? 'email-error' : undefined}
											className={cn(
												`bg-muted/30 border-border/50 h-11 rounded-xl pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
													displayError
														? 'border-destructive focus:border-destructive focus:ring-destructive/20 dark:bg-destructive/20'
														: ''
												}`,
											)}
										/>
									</div>

									{/* Unified Error Message */}
									{displayError && (
										<p role="alert" className="text-destructive mt-0.5 text-center text-xs">
											{displayError}
										</p>
									)}
								</div>

								<Button
									type="submit"
									disabled={isPending}
									className="mt-1 h-11 w-full rounded-xl border-0 bg-linear-to-r from-cyan-500 to-green-400 font-semibold text-white shadow-md transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-lg active:scale-[0.98]"
								>
									{isPending ? 'Enviando...' : 'Enviar enlace de recuperación'}
								</Button>
							</form>

							<p className="text-muted-foreground mt-6 text-center text-sm">
								<Link
									to="/login"
									className="inline-flex items-center gap-1.5 font-medium text-cyan-500 transition-colors hover:text-cyan-400"
								>
									<ArrowLeft className="h-3.5 w-3.5" />
									Volver al inicio de sesión
								</Link>
							</p>
						</>
					) : (
						/* ── Success state ── */
						<div className="flex flex-col items-center py-2 text-center">
							<div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 dark:bg-green-500/15">
								<CheckCircle2 className="h-8 w-8 text-green-500" strokeWidth={1.75} />
							</div>

							<h2 className="text-foreground mb-2 text-xl font-bold">Revisa tu correo</h2>
							<p className="text-muted-foreground mb-1 text-sm leading-relaxed">
								Si una cuenta está asociada a{' '}
								<span className="text-foreground font-semibold">{email}</span>, recibirás un enlace
								para restablecer tu contraseña en breve.
							</p>
							<p className="text-muted-foreground mb-8 text-sm">
								Por favor revisa tu bandeja de entrada y carpeta de spam.
							</p>

							<Link
								to="/login"
								className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-400"
							>
								<ArrowLeft className="h-3.5 w-3.5" />
								De vuelta al inicio de sesión
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
