import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from '../lib/utils/utils.ts';
import { supabase } from '../supabase/client.ts';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [errorMsg, setErrorMsg] = useState('');
	const [successMsg, setSuccessMsg] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setErrorMsg('');
		setSuccessMsg('');

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: window.location.origin + '/reset-password',
		});

		if (error) {
			setErrorMsg(error.message);
		} else {
			setSuccessMsg(
				'Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.',
			);
			setSubmitted(true);
		}
		setLoading(false);
	};

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
				{!submitted ? (
					<form onSubmit={handleSubmit} className={cn('space-y-4')}>
						<input
							type='email'
							placeholder='Correo electrónico'
							className={cn('w-full p-2 border rounded dark:text-gray-500')}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						{errorMsg && <div className={cn('text-red-600')}>{errorMsg}</div>}
						<button
							type='submit'
							className={cn(
								'w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700',
							)}
							disabled={loading}
						>
							{loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
						</button>
					</form>
				) : (
					<div className={cn('text-green-600 mb-4')}>{successMsg}</div>
				)}
				<div className={cn('mt-4 text-center')}>
					<Link href='/login' className={cn('text-blue-600 hover:underline')}>
						Volver al inicio de sesión
					</Link>
				</div>
			</div>
		</div>
	);
}
