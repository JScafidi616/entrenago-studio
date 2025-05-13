import { useState } from 'react';
import { Link } from 'wouter';

export default function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		// Aquí podrías integrar la lógica real con Supabase para enviar email de recuperación
		setSubmitted(true);
	};

	return (
		<div className='max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md'>
			<h1 className='text-2xl font-bold mb-4'>Recuperar contraseña</h1>

			{!submitted ? (
				<form onSubmit={handleSubmit} className='space-y-4'>
					<input
						type='email'
						placeholder='Tu correo electrónico'
						className='w-full p-2 border rounded'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<button
						type='submit'
						className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'
					>
						Enviar enlace de recuperación
					</button>
				</form>
			) : (
				<p className='text-green-600'>
					Si el correo existe en nuestro sistema, recibirás un enlace para
					restablecer tu contraseña.
				</p>
			)}

			<div className='mt-4 text-center'>
				<Link href='/login' className='text-blue-600 hover:underline'>
					Volver al inicio de sesión
				</Link>
			</div>
		</div>
	);
}
