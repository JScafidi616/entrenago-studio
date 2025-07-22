import { useEffect, useState } from 'react';
import { cn } from '../lib/utils/utils';
import { supabase } from '../supabase/client';

interface OnboardingModalProps {
	userId: string;
	onComplete: () => void;
}

interface FormData {
	full_name: string;
	goal: string;
	userType: string;
}

const OnboardingModal = ({ userId, onComplete }: OnboardingModalProps) => {
	const [startAnimation, setStartAnimation] = useState(false);
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(true);
	const [skipStep1, setSkipStep1] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		full_name: '',
		goal: '',
		userType: '',
	});

	useEffect(() => {
		setTimeout(() => setStartAnimation(true), 50);
		document.body.classList.add('overflow-hidden');
		const fetchProfileName = async () => {
			const { data } = await supabase
				.from('profiles')
				.select('full_name')
				.eq('id', userId)
				.single();
			if (data?.full_name && data.full_name.trim() !== '') {
				setFormData((prev) => ({ ...prev, full_name: data.full_name }));
				setStep(2); // Saltar el paso 1
				setSkipStep1(true); // Para no renderizar Step 1 nunca
			}
			setLoading(false); // Siempre quitar el loading después del fetch
		};
		fetchProfileName();
		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, [userId]);

	const handleChange = (
		e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
	) => {
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

	if (loading) return null;

	return (
		<div
			className={cn(
				`bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md border  dark:bg-neutral-800 transition-all duration-300 transform ${
					startAnimation ? 'animate-zoomFadeIn' : 'opacity-0 scale-95'
				}`,
			)}
		>
			{/* Step 1 - Consulta el nombre del usuario si este no fue agregado */}
			{!skipStep1 && step === 1 && (
				<>
					<h2 className={cn('text-xl font-bold mb-4 dark:text-gray-300')}>
						¿Cuál es tu nombre?
					</h2>
					<input
						type='text'
						name='full_name'
						value={formData.full_name}
						className={cn(
							'w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white transition',
						)}
						onChange={handleChange}
					/>
					<button
						onClick={() => setStep(2)} // Avanza al siguiente step, supongo es el 2
						className={cn(
							'mt-8 px-4 py-2 font-semibold rounded-md hover:bg-primary/90 bg-cyan-400 w-full',
							!formData.full_name.trim() &&
								'opacity-50 pointer-events-none bg-gray-600',
						)}
						disabled={!formData.full_name.trim()}
					>
						Siguiente
					</button>
				</>
			)}
			{/* Step 2 - Consulta el Workout objective */}
			{step === 2 && (
				<>
					<h2 className={cn('text-xl font-bold mb-4 dark:text-gray-300')}>
						¿Cuál es tu objetivo?
					</h2>
					<div className='mt-4 flex flex-col gap-2'>
						{['Perder peso', 'Ganar músculo', 'Mantenerse en forma'].map(
							(goal) => (
								<button
									key={goal}
									type='button'
									className={cn(
										'px-4 py-2 rounded border transition-colors',
										formData.goal === goal
											? 'rounded-md hover:bg-primary/90  bg-gradient-to-r from-cyan-500 to-green-400'
											: 'bg-neutral-500 text-white border-gray-100 hover:bg-gray-950 ',
									)}
									onClick={() => setFormData((prev) => ({ ...prev, goal }))}
								>
									{goal}
								</button>
							),
						)}
					</div>
					<button
						onClick={() => setStep(3)}
						className={cn(
							'mt-8 px-4 py-2 font-semibold rounded-md hover:bg-primary/90 bg-cyan-400 w-full',
							!formData.goal && 'opacity-50 pointer-events-none bg-gray-600',
						)}
						disabled={!formData.goal}
					>
						Siguiente
					</button>
				</>
			)}
			{/* Step 3 - Consulta el User Type */}
			{step === 3 && (
				<>
					<h2 className={cn('text-xl font-bold mb-4 dark:text-gray-300')}>
						¿Qué tipo de usuario eres?
					</h2>
					<div className='mt-4 flex flex-col gap-2'>
						{['Entrenador', 'Atleta', 'Usuario sin experiencia'].map(
							(userType) => (
								<button
									key={userType}
									type='button'
									className={cn(
										'px-4 py-2 rounded border transition-colors',
										formData.userType === userType
											? 'rounded-md hover:bg-primary/90  bg-gradient-to-r from-cyan-500 to-green-400'
											: 'bg-neutral-500 text-white border-gray-100 hover:bg-gray-950 ',
									)}
									onClick={() => setFormData((prev) => ({ ...prev, userType }))}
								>
									{userType}
								</button>
							),
						)}
					</div>
					<button
						onClick={handleSubmit}
						className={cn(
							'mt-8 px-4 py-2 font-semibold rounded-md hover:bg-primary/90 bg-green-400 w-full',
							!formData.userType &&
								'opacity-50 pointer-events-none bg-gray-600',
						)}
						disabled={!formData.userType}
					>
						Finalizar
					</button>
				</>
			)}
		</div>
	);
};

export default OnboardingModal;
