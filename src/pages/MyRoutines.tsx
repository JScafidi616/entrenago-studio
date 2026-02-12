import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/supabase/client.ts';
import { Activity, Clock, Dumbbell, Target, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
	const [, setLocation] = useLocation();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentSection, setCurrentSection] = useState('routines');

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

	const renderMyRoutines = () => (
		<div className='space-y-6 md:space-y-8 pb-24 md:pb-8 px-2'>
			<div className='flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0'>
				<h2 className='text-xl md:text-2xl font-bold text-foreground'>
					My Routines
				</h2>
				<Button className='bg-gradient-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full md:w-auto'>
					Create New Routine
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
				{[
					{
						name: 'Push Pull Legs',
						workouts: 6,
						duration: '45-60 min',
						difficulty: 'Intermediate',
						active: true,
						category: 'strength',
						icon: Dumbbell,
					},
					{
						name: 'Full Body Beginner',
						workouts: 3,
						duration: '30-40 min',
						difficulty: 'Beginner',
						active: false,
						category: 'bodyweight',
						icon: Activity,
					},
					{
						name: 'HIIT Cardio Blast',
						workouts: 4,
						duration: '20-30 min',
						difficulty: 'Advanced',
						active: false,
						category: 'cardio',
						icon: Zap,
					},
				].map((routine, index) => (
					<Card
						key={index}
						className={`border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 transition-all duration-200 ${
							routine.active ? 'ring-2 ring-cyan-500 shadow-lg' : ''
						} rounded-2xl`}
					>
						<CardHeader className='pb-3'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-2'>
									<routine.icon className='h-5 w-5 text-cyan-500' />
									<CardTitle className='text-base md:text-lg text-foreground'>
										{routine.name}
									</CardTitle>
								</div>
								{routine.active && (
									<Badge className='bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md text-xs'>
										Active
									</Badge>
								)}
							</div>
						</CardHeader>
						<CardContent className='space-y-3 md:space-y-4'>
							<div className='space-y-2 text-sm text-muted-foreground'>
								<div className='flex items-center'>
									<Dumbbell className='h-4 w-4 mr-2' />
									{routine.workouts} workouts per week
								</div>
								<div className='flex items-center'>
									<Clock className='h-4 w-4 mr-2' />
									{routine.duration}
								</div>
								<div className='flex items-center'>
									<Target className='h-4 w-4 mr-2' />
									{routine.difficulty}
								</div>
							</div>
							<div className='flex space-x-2'>
								<Button
									variant='outline'
									size='sm'
									className='flex-1 border-border/50 hover:bg-accent bg-transparent text-xs md:text-sm'
								>
									Edit
								</Button>
								<Button
									size='sm'
									className='flex-1 bg-gradient-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white shadow-md hover:shadow-lg transition-all duration-200 text-xs md:text-sm'
								>
									{routine.active ? 'View' : 'Activate'}
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);

	return (
		<>
			{/* Contenido principal centrado */}
			{currentSection === 'routines' && renderMyRoutines()}
		</>
	);
}
