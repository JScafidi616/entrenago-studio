import type { FormData, UseOnboardingProps } from '@/features/onboarding/types/onboarding';
import { supabase } from '@/lib/supabase/supabase';
import { useAuth } from '@/context/AuthContext'; // Import useAuth
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useOnboarding({ userId, onComplete }: UseOnboardingProps) {
	const queryClient = useQueryClient();
	const { profile } = useAuth();
	const isProfileLoading = !profile;
	const [step, setStep] = useState(1);
	const [skipStep1, setSkipStep1] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		full_name: '',
		goal: '',
		user_type: '',
		onboarded: false,
	});

	useEffect(() => {
		document.body.classList.add('overflow-hidden');
		return () => document.body.classList.remove('overflow-hidden');
	}, []);

	// Replaced the Supabase fetch with the cached profile data
	const [initialized, setInitialized] = useState(false);
	if (profile && !initialized) {
		setInitialized(true); // Mark as initialized to prevent infinite loops
		if (profile.full_name && profile.full_name.trim() !== '') {
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
			console.log('🎯 useOnboarding: Mutation succeeded');

			// Fix the type to match the actual Profile structure
			queryClient.setQueryData(['profile', userId], (oldData: FormData | undefined) => {
				console.log('🔧 useOnboarding: Updating cache, old onboarded =', oldData?.onboarded);

				// Handle case where cache might be empty
				if (!oldData) {
					return {
						id: userId,
						onboarded: true,
						full_name: formData.full_name,
						goal: formData.goal,
						user_type: formData.user_type,
					};
				}

				const updated = {
					...oldData,
					onboarded: true,
					full_name: formData.full_name,
					goal: formData.goal,
					user_type: formData.user_type,
				};
				console.log('✅ useOnboarding: Cache updated, new onboarded =', updated.onboarded);
				return updated;
			});

			// REMOVE THIS LINE - it's causing the race condition
			// queryClient.invalidateQueries({ queryKey: ['profile', userId] });

			console.log('🔄 useOnboarding: Cache updated, no refetch triggered');

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
