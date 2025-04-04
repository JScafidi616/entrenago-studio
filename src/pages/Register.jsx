import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

export default function Register() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert('Las contraseñas no coinciden');
			return;
		}

		const { data, error } = await supabase.auth.signUp({
			email: formData.email,
			password: formData.password,
		});

		if (error) {
			alert('Error al registrar: ' + error.message);
		} else {
			alert('¡Usuario registrado! Revisa tu correo para confirmar.');
			console.log('Usuario registrado:', data);
			navigate('/login');
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
			<form
				onSubmit={handleSubmit}
				className='bg-white p-6 rounded-2xl shadow-md w-full max-w-sm'
			>
				<h2 className='text-2xl font-semibold mb-4 text-center'>Registro</h2>
				<input
					type='email'
					name='email'
					placeholder='Correo electrónico'
					value={formData.email}
					onChange={handleChange}
					required
					className='w-full p-2 mb-3 border rounded'
				/>
				<input
					type='password'
					name='password'
					placeholder='Contraseña'
					value={formData.password}
					onChange={handleChange}
					required
					className='w-full p-2 mb-3 border rounded'
				/>
				<input
					type='password'
					name='confirmPassword'
					placeholder='Confirmar contraseña'
					value={formData.confirmPassword}
					onChange={handleChange}
					required
					className='w-full p-2 mb-4 border rounded'
				/>
				<button
					type='submit'
					className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
				>
					Registrarse
				</button>
			</form>
		</div>
	);
}
