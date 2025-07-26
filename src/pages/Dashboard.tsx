import OnboardingModal from '@/components/Onboarding.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { supabase } from '@/supabase/client.ts';
import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
	const [user, setUser] = useState<User | null>(null);
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

			setUser(session.user);

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

	const handleLogout = async () => {
		await supabase.auth.signOut();
		setLocation('/login');
	};

	return (
		<div
			className={cn(
				'min-h-screen flex flex-col bg-gray-100 dark:bg-neutral-900',
			)}
		>
			{/* Header */}
			<header
				className={cn('bg-white shadow-md py-4 px-6 dark:bg-neutral-800')}
			>
				<h1 className={cn('text-xl font-semibold dark:text-gray-300')}>
					EntrenaGo Dashboard
				</h1>
			</header>

			{/* Contenido principal centrado */}
			<main
				className={cn(
					'flex-grow flex items-center justify-center text-center px-4',
				)}
			>
				<div
					className={cn(
						'bg-white p-8 rounded-xl shadow-lg w-full max-w-md dark:bg-neutral-800',
					)}
				>
					<h2 className={cn('text-2xl font-bold mb-2 dark:text-gray-300')}>
						Bienvenido al Dashboard 🏋️‍♂️
					</h2>
					{user && (
						<p className={cn('mb-4 dark:text-gray-300')}>
							Sesión activa como: <strong>{user.email}</strong>
						</p>
					)}
					<button
						onClick={handleLogout}
						className={cn(
							'px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg',
						)}
					>
						Cerrar sesión
					</button>
				</div>
			</main>

			{/* Footer */}
			<footer
				className={cn(
					'bg-white shadow-inner py-4 px-6 text-center text-sm text-gray-500 dark:bg-neutral-800 dark:text-gray-400',
				)}
			>
				© {new Date().getFullYear()} EntrenaGo. Todos los derechos reservados.
			</footer>

			{/* Modal de onboarding */}
			<div
				className={cn(
					`fixed inset-0 z-50 flex items-center justify-center bg-white/30 transition-all duration-300 ${
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
		</div>
	);
}
