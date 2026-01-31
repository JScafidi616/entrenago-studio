import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress.tsx';
import { cn } from '@/lib/utils/utils.ts';
import { supabase } from '@/supabase/client.ts';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export default function Dashboard() {
	const [, setLocation] = useLocation();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentSection, setCurrentSection] = useState('progress');

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

	const renderProgress = () => (
		<div className='space-y-6 md:space-y-8 pb-24 md:pb-8 px-2'>
			<div className='flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0'>
				<h2 className='text-xl md:text-2xl font-bold text-foreground'>
					Progress Tracking
				</h2>
				<Button className='bg-gradient-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 w-full md:w-auto'>
					View Detailed Stats
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-foreground text-lg'>
							Monthly Overview
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-3 md:space-y-4'>
							<div className='flex justify-between text-foreground'>
								<span className='text-sm md:text-base'>Workouts Completed</span>
								<span className='font-bold text-sm md:text-base'>18/24</span>
							</div>
							<Progress value={75} className='h-2 md:h-2' />
							<p className='text-xs md:text-sm text-muted-foreground'>
								75% completion rate this month
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-foreground text-lg'>
							Strength Progress
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2 md:space-y-3'>
							<div className='flex justify-between'>
								<span className='text-sm text-foreground'>Bench Press</span>
								<span className='text-sm font-semibold text-green-600 dark:text-green-400'>
									+15 lbs
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-sm text-foreground'>Squat</span>
								<span className='text-sm font-semibold text-green-600 dark:text-green-400'>
									+25 lbs
								</span>
							</div>
							<div className='flex justify-between'>
								<span className='text-sm text-foreground'>Deadlift</span>
								<span className='text-sm font-semibold text-green-600 dark:text-green-400'>
									+20 lbs
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl md:col-span-2 lg:col-span-1'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-foreground text-lg'>
							Weekly Streak
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='text-center space-y-2'>
							<div className='text-2xl md:text-3xl font-bold text-orange-500'>
								12
							</div>
							<p className='text-xs md:text-sm text-muted-foreground'>
								Days in a row
							</p>
							<Badge className='bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 text-xs'>
								On Fire! 🔥
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);

	return (
		<>
			{/* Contenido principal centrado */}
			<div
				className={cn(
					'w-full max-w-7xl mx-auto" p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg dark:bg-neutral-800',
				)}
			>
				{currentSection === 'progress' && renderProgress()}
			</div>
		</>
	);
}
