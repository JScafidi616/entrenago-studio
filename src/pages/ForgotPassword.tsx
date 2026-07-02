import { Dumbbell, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '@/features/auth/hooks/useAuthentications';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);
	const { mutate: forgotPassword, isPending, error } = useForgotPassword();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		forgotPassword(email, {
			onSuccess: () => setIsSuccess(true),
		});
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-background dark:bg-neutral-900 px-4 transition-colors duration-300'>
			<div className='w-full max-w-md'>
				{/* Logo */}
				<div className='flex items-center justify-center gap-2.5 mb-8'>
					<div className='p-2.5 bg-linear-to-r from-cyan-500 to-green-400 rounded-full shadow-md'>
						<Dumbbell className='h-6 w-6 text-white' />
					</div>
					<span className='font-bold text-xl text-foreground'>EntrenaGo</span>
				</div>

				<div className='rounded-2xl border border-border/50 bg-card dark:bg-neutral-800/80 shadow-xl backdrop-blur supports-backdrop-filter:bg-card/90 dark:supports-backdrop-filter:bg-neutral-800/80 p-8'>
					{!isSuccess ? (
						/* ── Form state ── */
						<>
							<div className='mb-6'>
								<h1 className='text-2xl font-bold text-foreground text-balance'>
									¿Olvidaste tu contraseña?
								</h1>
								<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
									Ingresa tu correo electrónico y te enviaremos un enlace para
									restablecer tu contraseña.
								</p>
							</div>

							<form
								onSubmit={handleSubmit}
								noValidate
								className='flex flex-col gap-4'
							>
								<div className='flex flex-col gap-1.5'>
									<Label
										htmlFor='email'
										className='text-sm font-medium text-foreground'
									>
										Correo electrónico
									</Label>
									<div className='relative'>
										<Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
										<Input
											id='email'
											type='email'
											placeholder='tu@correo.com'
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											aria-describedby={error ? 'email-error' : undefined}
											className={`pl-10 h-11 rounded-xl bg-muted/30 dark:bg-neutral-700/40 border-border/50 focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors ${
												error
													? 'border-destructive focus:border-destructive focus:ring-destructive/20'
													: ''
											}`}
										/>
									</div>
									{error && (
										<p
											id='email-error'
											role='alert'
											className='text-xs text-destructive mt-0.5'
										>
											{error instanceof Error ? error.message : String(error)}
										</p>
									)}
								</div>

								<Button
									type='submit'
									disabled={isPending}
									className='w-full h-11 rounded-xl bg-linear-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 mt-1 border-0'
								>
									{isPending ? 'Enviando...' : 'Enviar enlace de recuperación'}
								</Button>
							</form>

							<p className='mt-6 text-center text-sm text-muted-foreground'>
								<Link
									to='/login'
									className='inline-flex items-center gap-1.5 text-cyan-500 hover:text-cyan-400 font-medium transition-colors'
								>
									<ArrowLeft className='h-3.5 w-3.5' />
									Volver al inicio de sesión
								</Link>
							</p>
						</>
					) : (
						/* ── Success state ── */
						<div className='flex flex-col items-center text-center py-2'>
							<div className='flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 dark:bg-green-500/15 mb-5'>
								<CheckCircle2
									className='h-8 w-8 text-green-500'
									strokeWidth={1.75}
								/>
							</div>

							<h2 className='text-xl font-bold text-foreground mb-2'>
								Revisa tu correo
							</h2>
							<p className='text-sm leading-relaxed text-muted-foreground mb-1'>
								Si una cuenta está asociada a{' '}
								<span className='font-semibold text-foreground'>{email}</span>,
								recibirás un enlace para restablecer tu contraseña en breve.
							</p>
							<p className='text-sm text-muted-foreground mb-8'>
								Por favor revisa tu bandeja de entrada y carpeta de spam.
							</p>

							<Link
								to='/login'
								className='inline-flex items-center gap-1.5 text-sm text-cyan-500 hover:text-cyan-400 font-medium transition-colors'
							>
								<ArrowLeft className='h-3.5 w-3.5' />
								De vuelta al inicio de sesión
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
