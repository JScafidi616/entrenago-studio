import { cn } from '@/utils/utils';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPassword } from '@/features/auth/hooks/useAuthentications';

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

	if (isSuccess) {
		return (
			<div className='text-center space-y-4'>
				<h2 className='text-2xl font-bold'>Check your email</h2>
				<p className='text-gray-600'>
					Si una cuenta está asociada al correo <strong>{email}</strong>,
					recibiras un enlace para restablecer tu contraseña en breve. Por favor
					revisa tu bandeja de entrada y carpeta de spam.
				</p>
				<Link
					to='/login'
					className='inline-block mt-4 text-blue-600 hover:underline font-medium'
				>
					&larr; De vuelta al inicio de sesión
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
					¿Olvidaste tu contraseña?
				</h1>
				<p className={cn('mb-6 text-gray-600 dark:text-gray-400')}>
					Ingresa tu correo electrónico y te enviaremos un enlace para
					restablecer tu contraseña.
				</p>

				<form onSubmit={handleSubmit} className={cn('space-y-4')}>
					<input
						type='email'
						placeholder='Correo electrónico'
						className={cn('w-full p-2 border rounded dark:text-gray-500')}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					{error && <div className={cn('text-red-600')}>{error.message}</div>}
					<button
						type='submit'
						className={cn(
							'w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700',
						)}
						disabled={isPending}
					>
						{isPending ? 'Enviando...' : 'Enviar enlace de recuperación'}
					</button>
				</form>

				<div className={cn('mt-4 text-center')}>
					Recordaste tu contraseña?{' '}
					<Link to='/login' className={cn('text-blue-600 hover:underline')}>
						Inicia sesión
					</Link>
				</div>
			</div>
		</div>
	);
};
