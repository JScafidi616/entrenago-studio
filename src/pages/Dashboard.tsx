import { cn } from '@/shared/utils/utils';
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
			<div className="space-y-6 px-2 pb-12 md:space-y-8 md:pb-8">
				{/* Mobile Today's Workout - Priority on mobile */}
				<div className={cn('block md:hidden')}>
					<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
						<CardHeader className="pb-3">
							<CardTitle className="text-foreground flex items-center justify-between text-lg">
								<div className="flex items-center space-x-2">
									<todayWorkout.icon className="h-5 w-5 text-cyan-500" />
									<span>Today's Workout</span>
								</div>
								<Badge
									variant="secondary"
									className="bg-secondary/80 text-secondary-foreground text-xs"
								>
									{todayWorkout.difficulty}
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<div className="flex items-center justify-between">
								<h3 className="text-foreground text-lg font-semibold">{todayWorkout.name}</h3>
								<div className="text-muted-foreground flex items-center text-sm">
									<Clock className="mr-1 h-4 w-4" />
									{todayWorkout.estimatedTime} min
								</div>
							</div>

							<div className="space-y-2">
								{todayWorkout.exercises.slice(0, 3).map((exercise, index) => (
									<div
										key={index}
										className="bg-muted/30 border-border/30 flex items-center justify-between rounded-2xl border p-2.5 dark:bg-neutral-800/30"
									>
										<div className="flex items-center space-x-2">
											<exercise.icon className="text-muted-foreground h-4 w-4" />
											<span className="text-foreground text-sm font-medium">{exercise.name}</span>
										</div>
										<div className="text-muted-foreground text-xs">{exercise.sets}</div>
									</div>
								))}
								{todayWorkout.exercises.length > 3 && (
									<div className="py-1 text-center">
										<span className="text-muted-foreground text-xs">
											+{todayWorkout.exercises.length - 3} more exercises
										</span>
									</div>
								)}
							</div>

							<Button
								// onClick={() => setIsWorkoutModalOpen(true)}
								className="w-full bg-linear-to-r from-cyan-500 to-green-400 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-xl"
								size="lg"
							>
								<Play className="mr-2 h-5 w-5" />
								Start Workout
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Header Stats - Responsive Grid */}
				<div className={cn('grid grid-cols-2 gap-4 px-2 md:grid-cols-4 md:gap-6')}>
					<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur transition-all duration-200 hover:shadow-md dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
						<CardContent className="p-4 md:p-6">
							<div className="flex items-center space-x-3">
								<div className="rounded-full bg-orange-100 p-2 dark:bg-orange-900/30">
									<Flame className="h-4 w-4 text-orange-500 md:h-5 md:w-5" />
								</div>
								<div>
									<p className="text-muted-foreground text-xs md:text-sm">Streak</p>
									<p className="text-foreground text-lg font-bold md:text-2xl">12</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur transition-all duration-200 hover:shadow-md dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
						<CardContent className="p-4 md:p-6">
							<div className="flex items-center space-x-3">
								<div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
									<Target className="h-4 w-4 text-blue-500 md:h-5 md:w-5" />
								</div>
								<div>
									<p className="text-muted-foreground text-xs md:text-sm">Week</p>
									<p className="text-foreground text-lg font-bold md:text-2xl">2/5</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur transition-all duration-200 hover:shadow-md dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
						<CardContent className="p-4 md:p-6">
							<div className="flex items-center space-x-3">
								<div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
									<Clock className="h-4 w-4 text-green-500 md:h-5 md:w-5" />
								</div>
								<div>
									<p className="text-muted-foreground text-xs md:text-sm">Time</p>
									<p className="text-foreground text-lg font-bold md:text-2xl">85m</p>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur transition-all duration-200 hover:shadow-md dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
						<CardContent className="p-4 md:p-6">
							<div className="flex items-center space-x-3">
								<div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900/30">
									<Dumbbell className="h-4 w-4 text-purple-500 md:h-5 md:w-5" />
								</div>
								<div>
									<p className="text-muted-foreground text-xs md:text-sm">Exercises</p>
									<p className="text-foreground text-lg font-bold md:text-2xl">11</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Ad Box 1 - Below Header Stats */}
				<div className="px-2">
					<AdBox variant="horizontal" label="Sponsored" />
				</div>

				{/* Desktop Layout */}
				<div className={cn('hidden gap-6 md:grid md:grid-cols-3')}>
					{/* Today's Workout - Desktop */}
					<div className="md:col-span-2">
						<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
							<CardHeader>
								<CardTitle className="text-foreground flex items-center justify-between">
									<span>Today's Workout</span>
									<Badge variant="secondary" className="bg-secondary/80 text-secondary-foreground">
										{todayWorkout.difficulty}
									</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<todayWorkout.icon className="h-6 w-6 text-cyan-500" />
										<h3 className="text-foreground text-xl font-semibold">{todayWorkout.name}</h3>
									</div>
									<div className="text-muted-foreground flex items-center text-sm">
										<Clock className="mr-1 h-4 w-4" />
										{todayWorkout.estimatedTime} min
									</div>
								</div>

								<div className="space-y-2">
									{todayWorkout.exercises.map((exercise, index) => (
										<div
											key={index}
											className="bg-muted/30 border-border/30 flex items-center justify-between rounded-2xl border p-3 dark:bg-neutral-800/30"
										>
											<div className="flex items-center space-x-3">
												<exercise.icon className="text-muted-foreground h-4 w-4" />
												<span className="text-foreground font-medium">{exercise.name}</span>
											</div>
											<div className="text-muted-foreground text-sm">
												{exercise.sets} • {exercise.rest}
											</div>
										</div>
									))}
								</div>

								<Button
									// onClick={() => setIsWorkoutModalOpen(true)}
									className="w-full bg-linear-to-r from-cyan-500 to-green-400 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-xl"
									size="lg"
								>
									<Play className="mr-2 h-5 w-5" />
									Start Workout
								</Button>
							</CardContent>
						</Card>
					</div>
					{/* Weekly Progress - Desktop */}
					<div className="flex flex-col gap-6">
						<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
							<CardHeader>
								<CardTitle className="text-foreground">Weekly Progress</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="mb-4 space-y-2">
									<div className="text-foreground flex justify-between text-sm">
										<span>Completed</span>
										<span>2/5 workouts</span>
									</div>
									<Progress
										value={40}
										className="h-2"
										aria-label="Workout completion"
										aria-labelledby="workout-progress"
									/>
								</div>
								<p className="text-muted-foreground text-sm">
									Keep it up! You're 40% through this week's routine.
								</p>
							</CardContent>
						</Card>
						{/* Ad Box 2 - Square, below Weekly Progress */}
						<AdBox variant="square" />
					</div>
				</div>

				{/* Mobile Weekly Progress */}
				<div className={cn('block md:hidden')}>
					<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
						<CardHeader className="pb-3">
							<CardTitle className="text-foreground text-lg">Weekly Progress</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="mb-3 space-y-2">
								<div className="text-foreground flex justify-between text-sm">
									<span>Completed</span>
									<span className="font-semibold">2/5 workouts</span>
								</div>
								<Progress value={40} className="h-3" />
							</div>
							<p className="text-muted-foreground text-sm">
								You're 40% through this week's routine.
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Ad Box 2 - Mobile, below Weekly Progress */}
				<div className="block px-2 md:hidden">
					<AdBox variant="horizontal" />
				</div>

				{/* Weekly Schedule - Mobile/Desktop */}
				<WeeklyScheduleCarousel />

				{/* Ad Box 3 - Below Weekly Schedule */}
				<div className="px-2">
					<AdBox variant="horizontal" label="Sponsored" />
				</div>
			</div>
		</>
	);
};
