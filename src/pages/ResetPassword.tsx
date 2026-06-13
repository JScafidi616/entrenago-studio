import { cn } from '@/utils/utils';
import { useResetPassword } from '@/features/auth/hooks/useAuthentications';
import { useState, useEffect } from 'react';
// import { Link, Navigate, useLocation } from 'wouter';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const navigate = useNavigate();
	const {
		mutate: resetPassword,
		isPending,
		isSuccess,
		error,
	} = useResetPassword();

	// Delay redirect to let the user read the success message
	useEffect(() => {
		if (isSuccess) {
			const timer = setTimeout(() => {
				navigate('/login', { replace: true });
			}, 2500); // 2.5 seconds is the sweet spot for reading

			return () => clearTimeout(timer);
		}
	}, [isSuccess, navigate]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Las contraseñas no coinciden');
			return;
		}

		resetPassword(password);
	};
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
				<form onSubmit={handleSubmit} className={cn('space-y-4')}>
					<input
						type='password'
						placeholder='Nueva contraseña'
						className={cn('w-full p-2 border rounded dark:text-gray-400')}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength={6}
					/>
					<input
						type='password'
						placeholder='Confirmar nueva contraseña'
						className={cn('w-full p-2 border rounded dark:text-gray-400')}
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						minLength={6}
					/>
					{error && <div className={cn('text-red-600')}>{error.message}</div>}
					<button
						type='submit'
						className={cn(
							'w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700',
						)}
						disabled={isPending}
					>
						{isPending ? 'Actualizando...' : 'Establecer nueva contraseña'}
					</button>
				</form>
				<div className={cn('mt-4 text-center')}>
					<Link to='/login' className={cn('text-blue-600 hover:underline')}>
						Volver al inicio de sesión
					</Link>
				</div>
			</div>
		</div>
	);
};
