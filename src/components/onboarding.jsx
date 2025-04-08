import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

const OnboardingModal = ({ userId, onComplete }) => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		name: '',
		goal: '',
		userType: '',
	});

	useEffect(() => {
		document.body.classList.add('overflow-hidden');
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, []);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		await supabase
			.from('profiles')
			.update({
				name: formData.name,
				goal: formData.goal,
				user_type: formData.userType,
				onboarded: true,
			})
			.eq('id', userId);

		onComplete();
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-white animate-fade-in duration-300'>
			<div className='bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md border border-gray-300'>
				{step === 1 && (
					<>
						<h2 className='text-xl font-bold mb-4'>¿Cuál es tu nombre?</h2>
						<input
							type='text'
							name='name'
							className='border p-2 w-full rounded'
							onChange={handleChange}
						/>
						<button
							onClick={() => setStep(2)}
							className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
						>
							Siguiente
						</button>
					</>
				)}

				{step === 2 && (
					<>
						<h2 className='text-xl font-bold mb-4'>¿Cuál es tu objetivo?</h2>
						<select
							name='goal'
							className='border p-2 w-full rounded'
							onChange={handleChange}
						>
							<option value=''>Selecciona...</option>
							<option value='perder_peso'>Perder peso</option>
							<option value='ganar_musculo'>Ganar músculo</option>
							<option value='mantenerse_en_forma'>Mantenerse en forma</option>
						</select>
						<button
							onClick={() => setStep(3)}
							className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
						>
							Siguiente
						</button>
					</>
				)}

				{step === 3 && (
					<>
						<h2 className='text-xl font-bold mb-4'>
							¿Qué tipo de usuario eres?
						</h2>
						<select
							name='userType'
							className='border p-2 w-full rounded'
							onChange={handleChange}
						>
							<option value=''>Selecciona...</option>
							<option value='entrenador'>Entrenador</option>
							<option value='atleta'>Atleta</option>
							<option value='usuario'>Usuario sin experiencia</option>
						</select>
						<button
							onClick={handleSubmit}
							className='mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
						>
							Finalizar
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default OnboardingModal;
