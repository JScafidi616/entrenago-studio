import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import type { UseOnboardingProps } from '@/features/onboarding/types/onboarding';
import { cn } from '@/utils/utils';
import { m } from 'motion/react';
// import { useEffect } from 'react';

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
	} = useOnboarding({ userId, onComplete });

	if (loading) return null;

	return (
		<m.div
			className={cn(
				'fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 dark:bg-gray-800/30',
			)}
			initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
			animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
			exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
			transition={{ duration: 0.25, ease: 'easeInOut' }}
		>
			<m.div
				className={cn(
					'bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md border  dark:bg-neutral-800',
				)}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2 }}
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
								'mt-8 px-4 py-2 font-semibold rounded-md hover:bg-primary/90 bg-cyan-400 w-full cursor-pointer',
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
											'px-4 py-2 rounded border transition-colors cursor-pointer',
											formData.goal === goal
												? 'rounded-md hover:bg-primary/90  bg-linear-to-r from-cyan-500 to-green-400'
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
								'mt-8 px-4 py-2 font-semibold rounded-md hover:bg-primary/90 bg-cyan-400 w-full cursor-pointer',
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
											'px-4 py-2 rounded border transition-colors cursor-pointer',
											formData.userType === userType
												? 'rounded-md hover:bg-primary/90  bg-linear-to-r from-cyan-500 to-green-400'
												: 'bg-neutral-500 text-white border-gray-100 hover:bg-gray-950 ',
										)}
										onClick={() =>
											setFormData((prev) => ({ ...prev, userType }))
										}
									>
										{userType}
									</button>
								),
							)}
						</div>
						<button
							onClick={handleSubmit}
							className={cn(
								'mt-8 px-4 py-2 font-semibold rounded-md hover:bg-primary/90 bg-green-400 w-full cursor-pointer',
								!formData.userType &&
									'opacity-50 pointer-events-none bg-gray-600',
							)}
							disabled={!formData.userType}
						>
							Finalizar
						</button>
					</>
				)}
			</m.div>
		</m.div>
	);
};

export default OnboardingModal;
