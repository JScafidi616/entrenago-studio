import OnboardingModal from '@/components/Onboarding.tsx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuthentication } from '@/lib/hooks/useAuthentication.ts';
import { cn } from '@/lib/utils/utils.ts';
import { supabase } from '@/supabase/client.ts';
import {
	Activity,
	Calendar,
	Clock,
	Dumbbell,
	Flame,
	Play,
	Target,
	Zap,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

export default function Dashboard() {
	const { user } = useAuthentication();
	const [, setLocation] = useLocation();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [currentSection, setCurrentSection] = useState('dashboard');
	// const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

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

	const todayWorkout = {
		name: 'Legs & Core',
		category: 'strength',
		icon: Target,
		exercises: [
			{
				name: 'Squats',
				sets: '4x12',
				rest: '90s',
				category: 'strength',
				icon: Dumbbell,
			},
			{
				name: 'Romanian Deadlifts',
				sets: '3x10',
				rest: '90s',
				category: 'strength',
				icon: Dumbbell,
			},
			{
				name: 'Bulgarian Split Squats',
				sets: '3x8 each',
				rest: '60s',
				category: 'bodyweight',
				icon: Activity,
			},
			{
				name: 'Leg Press',
				sets: '3x15',
				rest: '90s',
				category: 'strength',
				icon: Dumbbell,
			},
			{
				name: 'Plank',
				sets: '3x60s',
				rest: '30s',
				category: 'core',
				icon: Target,
			},
			{
				name: 'Russian Twists',
				sets: '3x20',
				rest: '30s',
				category: 'core',
				icon: Target,
			},
		],
		estimatedTime: 60,
		difficulty: 'Intermediate',
	};
	const weeklyRoutine = [
		{
			day: 'Mon',
			fullDay: 'Monday',
			date: '15',
			workout: 'Push Day',
			category: 'strength',
			icon: Dumbbell,
			exercises: 6,
			duration: 45,
			completed: true,
		},
		{
			day: 'Tue',
			fullDay: 'Tuesday',
			date: '16',
			workout: 'Pull Day',
			category: 'strength',
			icon: Dumbbell,
			exercises: 5,
			duration: 40,
			completed: true,
		},
		{
			day: 'Wed',
			fullDay: 'Wednesday',
			date: '17',
			workout: null,
			category: null,
			icon: null,
			exercises: 0,
			duration: 0,
			completed: false,
		},
		{
			day: 'Thu',
			fullDay: 'Thursday',
			date: '18',
			workout: 'Legs & Core',
			category: 'strength',
			icon: Target,
			exercises: 8,
			duration: 60,
			completed: false,
			isToday: true,
		},
		{
			day: 'Fri',
			fullDay: 'Friday',
			date: '19',
			workout: 'Upper Body',
			category: 'strength',
			icon: Dumbbell,
			exercises: 7,
			duration: 50,
			completed: false,
		},
		{
			day: 'Sat',
			fullDay: 'Saturday',
			date: '20',
			workout: 'HIIT Cardio',
			category: 'cardio',
			icon: Zap,
			exercises: 4,
			duration: 30,
			completed: false,
		},
		{
			day: 'Sun',
			fullDay: 'Sunday',
			date: '21',
			workout: null,
			category: null,
			icon: null,
			exercises: 0,
			duration: 0,
			completed: false,
		},
	];

	const renderDashboard = () => (
		<div className='space-y-6 md:space-y-8 pb-4 md:pb-8 px-2'>
			{/* Mobile Today's Workout - Priority on mobile */}
			<div className='block md:hidden'>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
					<CardHeader className='pb-3'>
						<CardTitle className='flex items-center justify-between text-foreground text-lg'>
							<div className='flex items-center space-x-2'>
								<todayWorkout.icon className='h-5 w-5 text-cyan-500' />
								<span>Today's Workout</span>
							</div>
							<Badge
								variant='secondary'
								className='bg-secondary/80 text-secondary-foreground text-xs'
							>
								{todayWorkout.difficulty}
							</Badge>
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						<div className='flex items-center justify-between'>
							<h3 className='text-lg font-semibold text-foreground'>
								{todayWorkout.name}
							</h3>
							<div className='flex items-center text-sm text-muted-foreground'>
								<Clock className='h-4 w-4 mr-1' />
								{todayWorkout.estimatedTime} min
							</div>
						</div>

						<div className='space-y-2'>
							{todayWorkout.exercises.slice(0, 3).map((exercise, index) => (
								<div
									key={index}
									className='flex items-center justify-between p-2.5 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30'
								>
									<div className='flex items-center space-x-2'>
										<exercise.icon className='h-4 w-4 text-muted-foreground' />
										<span className='font-medium text-foreground text-sm'>
											{exercise.name}
										</span>
									</div>
									<div className='text-xs text-muted-foreground'>
										{exercise.sets}
									</div>
								</div>
							))}
							{todayWorkout.exercises.length > 3 && (
								<div className='text-center py-1'>
									<span className='text-xs text-muted-foreground'>
										+{todayWorkout.exercises.length - 3} more exercises
									</span>
								</div>
							)}
						</div>

						<Button
							onClick={() => setIsWorkoutModalOpen(true)}
							className='w-full bg-gradient-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200'
							size='lg'
						>
							<Play className='h-5 w-5 mr-2' />
							Start Workout
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Header Stats - Responsive Grid */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2'>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
					<CardContent className='p-4 md:p-6'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-orange-100 dark:bg-orange-900/30 rounded-full'>
								<Flame className='h-4 w-4 md:h-5 md:w-5 text-orange-500' />
							</div>
							<div>
								<p className='text-xs md:text-sm text-muted-foreground'>
									Streak
								</p>
								<p className='text-lg md:text-2xl font-bold text-foreground'>
									12
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
					<CardContent className='p-4 md:p-6'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full'>
								<Target className='h-4 w-4 md:h-5 md:w-5 text-blue-500' />
							</div>
							<div>
								<p className='text-xs md:text-sm text-muted-foreground'>Week</p>
								<p className='text-lg md:text-2xl font-bold text-foreground'>
									2/5
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
					<CardContent className='p-4 md:p-6'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-full'>
								<Clock className='h-4 w-4 md:h-5 md:w-5 text-green-500' />
							</div>
							<div>
								<p className='text-xs md:text-sm text-muted-foreground'>Time</p>
								<p className='text-lg md:text-2xl font-bold text-foreground'>
									85m
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
					<CardContent className='p-4 md:p-6'>
						<div className='flex items-center space-x-3'>
							<div className='p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full'>
								<Dumbbell className='h-4 w-4 md:h-5 md:w-5 text-purple-500' />
							</div>
							<div>
								<p className='text-xs md:text-sm text-muted-foreground'>
									Exercises
								</p>
								<p className='text-lg md:text-2xl font-bold text-foreground'>
									11
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Desktop Layout */}
			<div className='hidden md:grid md:grid-cols-3 gap-6'>
				{/* Today's Workout - Desktop */}
				<div className='md:col-span-2'>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
						<CardHeader>
							<CardTitle className='flex items-center justify-between text-foreground'>
								<span>Today's Workout</span>
								<Badge
									variant='secondary'
									className='bg-secondary/80 text-secondary-foreground'
								>
									{todayWorkout.difficulty}
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-2'>
									<todayWorkout.icon className='h-6 w-6 text-cyan-500' />
									<h3 className='text-xl font-semibold text-foreground'>
										{todayWorkout.name}
									</h3>
								</div>
								<div className='flex items-center text-sm text-muted-foreground'>
									<Clock className='h-4 w-4 mr-1' />
									{todayWorkout.estimatedTime} min
								</div>
							</div>

							<div className='space-y-2'>
								{todayWorkout.exercises.map((exercise, index) => (
									<div
										key={index}
										className='flex items-center justify-between p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30'
									>
										<div className='flex items-center space-x-3'>
											<exercise.icon className='h-4 w-4 text-muted-foreground' />
											<span className='font-medium text-foreground'>
												{exercise.name}
											</span>
										</div>
										<div className='text-sm text-muted-foreground'>
											{exercise.sets} • {exercise.rest}
										</div>
									</div>
								))}
							</div>

							<Button
								onClick={() => setIsWorkoutModalOpen(true)}
								className='w-full bg-gradient-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200'
								size='lg'
							>
								<Play className='h-5 w-5 mr-2' />
								Start Workout
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Weekly Progress - Desktop */}
				<div>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
						<CardHeader>
							<CardTitle className='text-foreground'>Weekly Progress</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-2 mb-4'>
								<div className='flex justify-between text-sm text-foreground'>
									<span>Completed</span>
									<span>2/5 workouts</span>
								</div>
								<Progress value={40} className='h-2' />
							</div>
							<p className='text-sm text-muted-foreground'>
								Keep it up! You're 40% through this week's routine.
							</p>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Mobile Weekly Progress */}
			<div className='block md:hidden'>
				<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
					<CardHeader className='pb-3'>
						<CardTitle className='text-foreground text-lg'>
							Weekly Progress
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2 mb-3'>
							<div className='flex justify-between text-sm text-foreground'>
								<span>Completed</span>
								<span className='font-semibold'>2/5 workouts</span>
							</div>
							<Progress value={40} className='h-3' />
						</div>
						<p className='text-sm text-muted-foreground'>
							You're 40% through this week's routine.
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Weekly Schedule - Mobile Optimized with Horizontal Scroll */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 rounded-2xl'>
				<CardHeader className='pb-3 md:pb-6'>
					<CardTitle className='flex items-center text-foreground text-lg md:text-xl'>
						<Calendar className='h-5 w-5 mr-2' />
						This Week's Schedule
					</CardTitle>
				</CardHeader>
				<CardContent>
					{/* Mobile: Horizontal Scroll */}
					<div className='md:hidden'>
						<div className='flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory'>
							{weeklyRoutine.map((day, index) => (
								<Card
									key={index}
									className={`relative transition-all duration-200 flex-shrink-0 w-32 snap-center ${
										day.isToday
											? 'ring-2 ring-cyan-500 bg-gradient-to-br from-cyan-50 to-green-50 dark:from-cyan-950/30 dark:to-green-950/30 shadow-lg'
											: ''
									} ${
										day.completed
											? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
											: 'border-border/50 bg-card/30'
									} rounded-2xl`}
								>
									<CardContent className='p-3'>
										<div className='text-center space-y-2'>
											<div className='flex flex-col items-center'>
												<p className='text-sm font-medium text-foreground'>
													{day.day}
												</p>
												<p className='text-2xl font-bold text-foreground'>
													{day.date}
												</p>
											</div>

											{day.workout ? (
												<div className='space-y-2'>
													<div className='flex flex-col items-center space-y-1'>
														{day.icon && (
															<day.icon className='h-4 w-4 text-cyan-500' />
														)}
														<p className='text-sm font-semibold text-center text-foreground leading-tight'>
															{day.workout}
														</p>
													</div>
													<div className='text-xs text-muted-foreground space-y-1'>
														<div className='flex items-center justify-center'>
															<Dumbbell className='h-3 w-3 mr-1' />
															<span>{day.exercises}</span>
														</div>
														<div className='flex items-center justify-center'>
															<Clock className='h-3 w-3 mr-1' />
															<span>{day.duration}m</span>
														</div>
													</div>
													{day.completed && (
														<Badge
															variant='secondary'
															className='w-full text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 py-1'
														>
															✓ Done
														</Badge>
													)}
													{day.isToday && (
														<Badge className='w-full text-xs bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md py-1'>
															Today
														</Badge>
													)}
												</div>
											) : (
												<div className='text-center'>
													<p className='text-sm text-muted-foreground'>
														Rest Day
													</p>
													<div className='h-12 flex items-center justify-center'>
														<Badge
															variant='outline'
															className='border-border/50 text-muted-foreground text-xs py-1'
														>
															No workout
														</Badge>
													</div>
												</div>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Scroll indicator dots for mobile */}
						<div className='flex justify-center mt-3'>
							<div className='flex space-x-1'>
								{weeklyRoutine.map((_, index) => (
									<div
										key={index}
										className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
											index < 4 ? 'bg-cyan-500' : 'bg-muted-foreground/30'
										}`}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Desktop: Grid Layout (unchanged) */}
					<div className='hidden md:grid md:grid-cols-7 gap-3'>
						{weeklyRoutine.map((day, index) => (
							<Card
								key={index}
								className={`relative transition-all duration-200 ${
									day.isToday
										? 'ring-2 ring-cyan-500 bg-gradient-to-br from-cyan-50 to-green-50 dark:from-cyan-950/30 dark:to-green-950/30 shadow-lg'
										: ''
								} ${
									day.completed
										? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
										: 'border-border/50 bg-card/30'
								} rounded-2xl`}
							>
								<CardContent className='p-4'>
									<div className='text-center space-y-2'>
										<div className='flex flex-col items-center'>
											<p className='text-sm font-medium text-foreground'>
												{day.day}
											</p>
											<p className='text-2xl font-bold text-foreground'>
												{day.date}
											</p>
										</div>

										{day.workout ? (
											<div className='space-y-2'>
												<div className='flex flex-col items-center space-y-1'>
													{day.icon && (
														<day.icon className='h-4 w-4 text-cyan-500' />
													)}
													<p className='text-sm font-semibold text-center text-foreground leading-tight'>
														{day.workout}
													</p>
												</div>
												<div className='text-xs text-muted-foreground space-y-1'>
													<div className='flex items-center justify-center'>
														<Dumbbell className='h-3 w-3 mr-1' />
														<span>{day.exercises}</span>
													</div>
													<div className='flex items-center justify-center'>
														<Clock className='h-3 w-3 mr-1' />
														<span>{day.duration}m</span>
													</div>
												</div>
												{day.completed && (
													<Badge
														variant='secondary'
														className='w-full text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 py-0.5'
													>
														✓
													</Badge>
												)}
												{day.isToday && (
													<Badge className='w-full text-xs bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md py-0.5'>
														Today
													</Badge>
												)}
											</div>
										) : (
											<div className='text-center'>
												<p className='text-xs text-muted-foreground'>Rest</p>
												<div className='h-8 flex items-center justify-center'>
													<Badge
														variant='outline'
														className='border-border/50 text-muted-foreground text-xs py-0.5'
													>
														Rest
													</Badge>
												</div>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>
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
				{currentSection === 'dashboard' && renderDashboard()}

				{/* <h2 className={cn('text-2xl font-bold mb-2 dark:text-gray-300')}>
					Bienvenido al Dashboard 🏋️‍♂️
				</h2>
				<p className={cn('mb-4 dark:text-gray-300')}>
					Pronto habra algo aqui LOL
				</p> */}
			</div>

			{/* <main className="container mx-auto px-6 py-6 md:py-8 max-w-7xl">
        {currentSection === "dashboard" && renderDashboard()}
        {currentSection === "progress" && renderProgress()}
        {currentSection === "routines" && renderMyRoutines()}
      </main> */}
			{/* Modal de onboarding */}
			<div
				className={cn(
					`fixed inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-gray-800/30 transition-all duration-300 ${
						showOnboarding
							? 'backdrop-blur-sm opacity-100 duration-300'
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
