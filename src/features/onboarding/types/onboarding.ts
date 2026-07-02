export interface UseOnboardingProps {
	userId: string;
	onComplete: () => void;
}

export interface FormData {
	full_name: string;
	goal: string;
	user_type: string;
	onboarded: boolean;
}
