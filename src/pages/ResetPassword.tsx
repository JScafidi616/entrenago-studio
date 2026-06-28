import { cn } from '@/utils/utils';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

	if (isSuccess) {
		return (
			<div className='max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg text-center space-y-4'>
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
				<h2 className='text-xl font-bold text-gray-900'>
					¡Contraseña actualizada!
				</h2>
				<p className='text-gray-600'>
					Tu contraseña ha sido restablecida correctamente. Serás redirigido al
					inicio de sesión en unos segundos...
					<span className='font-bold text-blue-600'>{countdown}</span>
				</p>
				<Link
					to='/login'
					className='inline-block text-sm text-blue-600 hover:underline font-medium'
				>
					Ir al inicio de sesión ahora
				</Link>
			</div>
		);
	}

	return (
		<div
			className={cn(
				'min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900',
			)}
		>
			<div
				className={cn(
					'max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md dark:bg-neutral-800',
				)}
			>
				<h1 className={cn('text-2xl font-bold mb-4 dark:text-gray-300')}>
					Restablecer contraseña
				</h1>

				{/* Case 1: Forgot Password Flow (Signs out) */}
				<PasswordForm onSuccess={() => setIsSuccess(true)} />

				<div className={cn('mt-4 text-center')}>
					<Link to='/login' className={cn('text-blue-600 hover:underline')}>
						Volver al inicio de sesión
					</Link>
				</div>
			</div>
		</div>
	);
};
