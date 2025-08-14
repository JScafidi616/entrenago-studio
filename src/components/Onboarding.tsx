import { useOnboarding } from '@/lib/hooks/useOnboarding';
import type { UseOnboardingProps } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils/utils';

const OnboardingModal = ({ userId, onComplete }: UseOnboardingProps) => {
	const {
		handleChange,
		handleSubmit,
		loading,
		step,
		setStep,
		formData,
		setFormData,
		skipStep1,
		startAnimation,
	} = useOnboarding({ userId, onComplete });

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
							'w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary  dark:bg-gray-900 dark:border-gray-700 dark:text-white transition',
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
