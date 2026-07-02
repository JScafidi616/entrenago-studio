import { cn } from '@/utils/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dumbbell, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PasswordForm } from '@/features/auth/components/AuthResetPassword'; // Adjust path as needed
import { supabase } from '@/lib/supabase/supabase';

export const ResetPassword = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const [countdown, setCountdown] = useState(10);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isSuccess) return;

		if (countdown <= 0) {
			supabase.auth.signOut().then(() => {
				navigate('/login', { replace: true });
			});
			return;
		}

		const timer = setTimeout(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [isSuccess, countdown, navigate]);

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
									Restablecer contraseña
								</h1>
								<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
									Crea una nueva contraseña segura para tu cuenta.
								</p>
							</div>

							<PasswordForm onSuccess={() => setIsSuccess(true)} />

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
								¡Contraseña actualizada!
							</h2>
							<p className='text-sm leading-relaxed text-muted-foreground mb-1'>
								Tu contraseña ha sido restablecida correctamente.
							</p>
							<p className='text-sm text-muted-foreground mb-8'>
								Serás redirigido al inicio de sesión en{' '}
								<span className='font-semibold text-cyan-500'>{countdown}</span>{' '}
								{countdown === 1 ? 'segundo' : 'segundos'}...
							</p>

							<Link
								to='/login'
								className='inline-flex items-center gap-1.5 text-sm text-cyan-500 hover:text-cyan-400 font-medium transition-colors'
							>
								Ir al inicio de sesión ahora
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
