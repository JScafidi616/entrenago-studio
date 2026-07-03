import type { FormData, UseOnboardingProps } from '@/features/onboarding/types/onboarding';
import { supabase } from '@/lib/supabase/supabase';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export function useOnboarding({ userId, onComplete }: UseOnboardingProps) {
	const queryClient = useQueryClient();
	const { profile } = useAuth();

	// Derive loading directly from the profile
	const isProfileLoading = !profile;

	const [step, setStep] = useState(1);
	const [skipStep1, setSkipStep1] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		full_name: '',
		goal: '',
		user_type: '',
		onboarded: false,
	});

	// "Adjust state during render" pattern (The React-recommended alternative to useEffect)
	const [initialized, setInitialized] = useState(false);
	if (profile && !initialized) {
		setInitialized(true);

		// ADD THIS CHECK: Only initialize the form if they are NOT already onboarded!
		if (!profile.onboarded && profile.full_name && profile.full_name.trim() !== '') {
			setFormData((prev) => ({ ...prev, full_name: profile.full_name ?? '' }));
			setStep(2);
			setSkipStep1(true);
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	// Handle the DB update and Cache invalidation in one place
	const mutation = useMutation({
		mutationFn: async () => {
			const { error } = await supabase
				.from('profiles')
				.update({
					full_name: formData.full_name,
					goal: formData.goal,
					user_type: formData.user_type,
					onboarded: true,
				})
				.eq('id', userId);

			if (error) throw error;
		},
		onSuccess: () => {
			// 1. Instantly update the cache so the modal closes immediately
			queryClient.setQueryData(['profile', userId], (oldData: FormData | undefined) => {
				if (!oldData) return oldData;
				return {
					...oldData,
					onboarded: true,
					full_name: formData.full_name,
					goal: formData.goal,
					user_type: formData.user_type,
				};
			});

			// 3. Call the parent callback
			if (onComplete) onComplete();
		},
		onError: (error) => {
			// If it still fails, check your browser console for this error!
			console.error('Failed to complete onboarding:', error);
		},
	});

	const handleSubmit = () => {
		mutation.mutate();
	};

	return {
		handleChange,
		handleSubmit,
		loading: isProfileLoading || mutation.isPending,
		step,
		setStep,
		formData,
		setFormData,
		skipStep1,
		setSkipStep1,
		userId,
	};
}
