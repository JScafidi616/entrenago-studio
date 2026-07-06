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
		}, 10000);

		return () => clearTimeout(timer);
	}, [isSuccess, countdown, navigate]);

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
									Restablecer contraseña
								</h1>
								<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
									Crea una nueva contraseña segura para tu cuenta.
								</p>
							</div>

							<PasswordForm onSuccess={() => setIsSuccess(true)} />

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

							<h2 className="text-foreground mb-2 text-xl font-bold">¡Contraseña actualizada!</h2>
							<p className="text-muted-foreground mb-1 text-sm leading-relaxed">
								Tu contraseña ha sido restablecida correctamente.
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
					)}
				</div>
			</div>
		</div>
	);
};
