import { cn } from '@/utils/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, Clock, Dumbbell, Flame, Play, Target } from 'lucide-react';
import { AdBox } from '@/features/adbox/components/AdBox';
import { WeeklyScheduleCarousel } from '@/features/carouselWeekly/components/CarouselWeekly'; // Adjust path

// Mockup data required for Todays workout component
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

export const Dashboard = () => {
	return (
		<>
			{/* Contenido principal centrado */}
			<div className='space-y-6 md:space-y-8 pb-12 md:pb-8 px-2'>
				{/* Mobile Today's Workout - Priority on mobile */}
				<div className={cn('block md:hidden')}>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl'>
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
								// onClick={() => setIsWorkoutModalOpen(true)}
								className='w-full bg-linear-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200'
								size='lg'
							>
								<Play className='h-5 w-5 mr-2' />
								Start Workout
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Header Stats - Responsive Grid */}
				<div
					className={cn('grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 px-2')}
				>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
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
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
						<CardContent className='p-4 md:p-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full'>
									<Target className='h-4 w-4 md:h-5 md:w-5 text-blue-500' />
								</div>
								<div>
									<p className='text-xs md:text-sm text-muted-foreground'>
										Week
									</p>
									<p className='text-lg md:text-2xl font-bold text-foreground'>
										2/5
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
						<CardContent className='p-4 md:p-6'>
							<div className='flex items-center space-x-3'>
								<div className='p-2 bg-green-100 dark:bg-green-900/30 rounded-full'>
									<Clock className='h-4 w-4 md:h-5 md:w-5 text-green-500' />
								</div>
								<div>
									<p className='text-xs md:text-sm text-muted-foreground'>
										Time
									</p>
									<p className='text-lg md:text-2xl font-bold text-foreground'>
										85m
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'>
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

				{/* Ad Box 1 - Below Header Stats */}
				<div className='px-2'>
					<AdBox variant='horizontal' label='Sponsored' />
				</div>

				{/* Desktop Layout */}
				<div className={cn('hidden md:grid md:grid-cols-3 gap-6')}>
					{/* Today's Workout - Desktop */}
					<div className='md:col-span-2'>
						<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl'>
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
									// onClick={() => setIsWorkoutModalOpen(true)}
									className='w-full bg-linear-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-200'
									size='lg'
								>
									<Play className='h-5 w-5 mr-2' />
									Start Workout
								</Button>
							</CardContent>
						</Card>
					</div>
					{/* Weekly Progress - Desktop */}
					<div className='flex flex-col gap-6'>
						<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl'>
							<CardHeader>
								<CardTitle className='text-foreground'>
									Weekly Progress
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div className='space-y-2 mb-4'>
									<div className='flex justify-between text-sm text-foreground'>
										<span>Completed</span>
										<span>2/5 workouts</span>
									</div>
									<Progress
										value={40}
										className='h-2'
										aria-label='Workout completion'
										aria-labelledby='workout-progress'
									/>
								</div>
								<p className='text-sm text-muted-foreground'>
									Keep it up! You're 40% through this week's routine.
								</p>
							</CardContent>
						</Card>
						{/* Ad Box 2 - Square, below Weekly Progress */}
						<AdBox variant='square' />
					</div>
				</div>

				{/* Mobile Weekly Progress */}
				<div className={cn('block md:hidden')}>
					<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl'>
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

				{/* Ad Box 2 - Mobile, below Weekly Progress */}
				<div className='block md:hidden px-2'>
					<AdBox variant='horizontal' />
				</div>

				{/* Weekly Schedule - Mobile/Desktop */}
				<WeeklyScheduleCarousel />

				{/* Ad Box 3 - Below Weekly Schedule */}
				<div className='px-2'>
					<AdBox variant='horizontal' label='Sponsored' />
				</div>
			</div>
		</>
	);
};
