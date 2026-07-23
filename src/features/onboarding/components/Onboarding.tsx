import { useOnboarding } from '@/features/onboarding/hooks/useOnboarding';
import type { UseOnboardingProps } from '@/features/onboarding/types/onboarding';
import { cn } from '@/shared/utils/utils';
import { m } from 'motion/react';
// import { useEffect } from 'react';

const OnboardingModal = ({ userId, onComplete }: UseOnboardingProps) => {
	const { handleChange, handleSubmit, loading, step, setStep, formData, setFormData, skipStep1 } =
		useOnboarding({ userId, onComplete });

	if (loading) return null;

	return (
		<m.div
			className={cn(
				'fixed inset-0 z-9999 flex items-center justify-center bg-white/30 dark:bg-gray-800/30',
			)}
			initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
			animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
			exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
			transition={{ duration: 0.25, ease: 'easeInOut' }}
		>
			<m.div
				className={cn(
					'w-[90%] max-w-md rounded-2xl border bg-white p-6 shadow-xl dark:bg-neutral-800',
				)}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.2 }}
			>
				{/* Step 1 - Consulta el nombre del usuario si este no fue agregado */}
				{!skipStep1 && step === 1 && (
					<>
						<h2 className={cn('mb-4 text-xl font-bold dark:text-gray-300')}>¿Cuál es tu nombre?</h2>
						<input
							type="text"
							name="full_name"
							value={formData.full_name}
							className={cn(
								'bg-background border-border focus:ring-primary w-full rounded-md border px-4 py-2 transition focus:ring-2 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white',
							)}
							onChange={handleChange}
						/>
						<button
							onClick={() => setStep(2)} // Avanza al siguiente step, supongo es el 2
							className={cn(
								'hover:bg-primary/90 mt-8 w-full rounded-md bg-cyan-400 px-4 py-2 font-semibold',
								!formData.full_name.trim() && 'pointer-events-none bg-gray-600 opacity-50',
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
						<h2 className={cn('mb-4 text-xl font-bold dark:text-gray-300')}>
							¿Cuál es tu objetivo?
						</h2>
						<div className="mt-4 flex flex-col gap-2">
							{['Perder peso', 'Ganar músculo', 'Mantenerse en forma'].map((goal) => (
								<button
									key={goal}
									type="button"
									className={cn(
										'rounded border px-4 py-2 transition-colors',
										formData.goal === goal
											? 'hover:bg-primary/90 rounded-md bg-linear-to-r from-cyan-500 to-green-400'
											: 'border-gray-100 bg-neutral-500 text-white hover:bg-gray-950',
									)}
									onClick={() => setFormData((prev) => ({ ...prev, goal }))}
								>
									{goal}
								</button>
							))}
						</div>
						<button
							onClick={() => setStep(3)}
							className={cn(
								'hover:bg-primary/90 mt-8 w-full rounded-md bg-cyan-400 px-4 py-2 font-semibold',
								!formData.goal && 'pointer-events-none bg-gray-600 opacity-50',
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
						<h2 className={cn('mb-4 text-xl font-bold dark:text-gray-300')}>
							¿Qué tipo de usuario eres?
						</h2>
						<div className="mt-4 flex flex-col gap-2">
							{['Entrenador', 'Atleta', 'Usuario sin experiencia'].map((user_type) => (
								<button
									key={user_type}
									type="button"
									className={cn(
										'rounded border px-4 py-2 transition-colors',
										formData.user_type === user_type
											? 'hover:bg-primary/90 rounded-md bg-linear-to-r from-cyan-500 to-green-400'
											: 'border-gray-100 bg-neutral-500 text-white hover:bg-gray-950',
									)}
									onClick={() => setFormData((prev) => ({ ...prev, user_type }))}
								>
									{user_type}
								</button>
							))}
						</div>
						<button
							onClick={handleSubmit}
							className={cn(
								'hover:bg-primary/90 mt-8 w-full rounded-md bg-green-400 px-4 py-2 font-semibold',
								!formData.user_type && 'pointer-events-none bg-gray-600 opacity-50',
							)}
							disabled={!formData.user_type}
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
