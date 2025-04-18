import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import OnboardingModal from '../components/onboarding';
import { supabase } from '../supabase/client';

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkSessionAndProfile = async () => {
			const { data, error } = await supabase.auth.getSession();
			const session = data.session;

			if (!session) {
				navigate({ to: '/login' });
				return;
			}
			if (error) {
				console.error('Error al obtener la sesión:', error.message);
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
	}, [navigate]);

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
		navigate({ to: '/login' });
	};

	return (
		<div className='min-h-screen flex flex-col bg-gray-100'>
			{/* Header */}
			<header className='bg-white shadow-md py-4 px-6'>
				<h1 className='text-xl font-semibold'>EntrenaGo Dashboard</h1>
			</header>

			{/* Contenido principal centrado */}
			<main className='flex-grow flex items-center justify-center text-center px-4'>
				<div className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'>
					<h2 className='text-2xl font-bold mb-2'>
						Bienvenido al Dashboard 🏋️‍♂️
					</h2>
					{user && (
						<p className='mb-4'>
							Sesión activa como: <strong>{user.email}</strong>
						</p>
					)}
					<button
						onClick={handleLogout}
						className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg'
					>
						Cerrar sesión
					</button>
				</div>
			</main>

			{/* Footer */}
			<footer className='bg-white shadow-inner py-4 px-6 text-center text-sm text-gray-500'>
				© {new Date().getFullYear()} EntrenaGo. Todos los derechos reservados.
			</footer>

			{/* Modal de onboarding */}
			<div
				className={`fixed inset-0 z-50 flex items-center justify-center bg-white/30 transition-all duration-300 ${
					showOnboarding
						? 'backdrop-blur-sm opacity-100'
						: 'backdrop-blur-0 opacity-0 pointer-events-none'
				}`}
			>
				{showOnboarding && (
					<OnboardingModal
						userId={user?.id}
						onComplete={() => setShowOnboarding(false)}
					/>
				)}
			</div>
		</div>
	);
}
