import { useEffect, useState } from 'react';
import { supabase } from '../../supabase/client';
import type { FormData, UseOnboardingProps } from '../types/onboarding';

export function useOnboarding({ userId, onComplete }: UseOnboardingProps) {
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
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

	return {
		handleChange,
		handleSubmit,
		loading,
		step,
		setStep,
		formData,
		setFormData,
		skipStep1,
		setSkipStep1,
		startAnimation,
		setStartAnimation,
		userId,
	};
}
