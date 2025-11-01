import OnboardingModal from '@/components/Onboarding.tsx';
import { useAuthentication } from '@/lib/hooks/useAuthentication.ts';
import { cn } from '@/lib/utils/utils.ts';
import { supabase } from '@/supabase/client.ts';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
	const { user } = useAuthentication();
	const [, setLocation] = useLocation();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkSessionAndProfile = async () => {
			const { data, error } = await supabase.auth.getSession();
			const session = data.session;

			if (error) {
				console.error('Error al obtener la sesión:', error.message);
			}
			if (!session) {
				setLocation('/login');
				return;
			}

			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('onboarded')
				.eq('id', session.user.id)
				.single();

			if (profileError) {
				console.error('Error al obtener perfil:', profileError.message);
			}

			setShowOnboarding(!profile?.onboarded);
			setIsLoading(false);
		};

		checkSessionAndProfile();
	}, [setLocation]);

	useEffect(() => {
		if (showOnboarding) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [showOnboarding]);

	if (isLoading) return null; // También podrías renderizar un spinner

	return (
		<>
			{/* Contenido principal centrado */}
			<div
				className={cn(
					'bg-white p-8 rounded-xl shadow-lg w-full max-w-md dark:bg-neutral-800',
				)}
			>
				<h2 className={cn('text-2xl font-bold mb-2 dark:text-gray-300')}>
					Bienvenido al Dashboard 🏋️‍♂️
				</h2>
				<p className={cn('mb-4 dark:text-gray-300')}>
					Pronto habra algo aqui LOL
				</p>
			</div>

			{/* Modal de onboarding */}
			<div
				className={cn(
					`fixed inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-gray-800/30 transition-all duration-300 ${
						showOnboarding
							? 'backdrop-blur-sm opacity-100'
							: 'backdrop-blur-0 opacity-0 pointer-events-none'
					}`,
				)}
			>
				{showOnboarding && user && (
					<OnboardingModal
						userId={user.id}
						onComplete={() => setShowOnboarding(false)}
					/>
				)}
			</div>
		</>
	);
}
