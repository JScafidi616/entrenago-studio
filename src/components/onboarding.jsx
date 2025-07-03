import { useEffect, useState } from 'react';
import { cn } from '../lib/utils/utils';
import { supabase } from '../supabase/client';

const OnboardingModal = ({ userId, onComplete }) => {
	const [startAnimation, setStartAnimation] = useState(false);
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		full_name: '',
		goal: '',
		userType: '',
	});

	useEffect(() => {
		setTimeout(() => setStartAnimation(true), 50);
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
				full_name: formData.full_name,
				goal: formData.goal,
				user_type: formData.userType,
				onboarded: true,
			})
			.eq('id', userId);

		onComplete();
	};

	return (
		<div
			className={cn(
				`bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md border  dark:bg-neutral-800 transition-all duration-300 transform ${
					startAnimation ? 'animate-zoomFadeIn' : 'opacity-0 scale-95'
				}`,
			)}
		>
			{step === 1 && (
				<>
					<h2 className={cn('text-xl font-bold mb-4 dark:text-gray-300')}>
						¿Cuál es tu nombre?
					</h2>
					<input
						type='text'
						name='full_name'
						className={cn('border p-2 w-full rounded dark:text-gray-400')}
						onChange={handleChange}
					/>
					<button
						onClick={() => setStep(2)}
						className={cn(
							'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
						)}
					>
						Siguiente
					</button>
				</>
			)}

			{step === 2 && (
				<>
					<h2 className={cn('text-xl font-bold mb-4 dark:text-gray-300')}>
						¿Cuál es tu objetivo?
					</h2>
					<select
						name='goal'
						className={cn('border p-2 w-full rounded dark:text-gray-400')}
						onChange={handleChange}
					>
						<option value=''>Selecciona...</option>
						<option value='perder_peso'>Perder peso</option>
						<option value='ganar_musculo'>Ganar músculo</option>
						<option value='mantenerse_en_forma'>Mantenerse en forma</option>
					</select>
					<button
						onClick={() => setStep(3)}
						className={cn(
							'mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700',
						)}
					>
						Siguiente
					</button>
				</>
			)}

			{step === 3 && (
				<>
					<h2 className={cn('text-xl font-bold mb-4 dark:text-gray-300')}>
						¿Qué tipo de usuario eres?
					</h2>
					<select
						name='userType'
						className={cn('border p-2 w-full rounded dark:text-gray-400')}
						onChange={handleChange}
					>
						<option value=''>Selecciona...</option>
						<option value='entrenador'>Entrenador</option>
						<option value='atleta'>Atleta</option>
						<option value='usuario'>Usuario sin experiencia</option>
					</select>
					<button
						onClick={handleSubmit}
						className={cn(
							'mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700',
						)}
					>
						Finalizar
					</button>
				</>
			)}
		</div>
	);
};

export default OnboardingModal;
