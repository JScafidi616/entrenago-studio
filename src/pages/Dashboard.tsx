// import OnboardingModal from '@/features/onboarding/components/Onboarding';
import { cn } from '@/utils/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
// import { cn } from '@/utils/utils';
// import { supabase } from '@/lib/supabase/supabase';
import {
	Activity,
	Calendar,
	Clock,
	Dumbbell,
	Flame,
	Indent,
	Play,
	Target,
	Zap,
} from 'lucide-react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/context/AuthContext';

// Workout template data (without dates - will be calculated dynamically)
const weeklyRoutine = [
	{
		workout: 'Push Day',
		category: 'strength',
		icon: Dumbbell,
		exercises: 6,
		duration: 45,
	},
	{
		workout: 'Pull Day',
		category: 'strength',
		icon: Dumbbell,
		exercises: 5,
		duration: 40,
	},
	{
		workout: null, // Rest day
		category: null,
		icon: null,
		exercises: 0,
		duration: 0,
	},
	{
		workout: 'Legs & Core',
		category: 'strength',
		icon: Target,
		exercises: 8,
		duration: 60,
	},
	{
		workout: 'Upper Body',
		category: 'strength',
		icon: Dumbbell,
		exercises: 7,
		duration: 50,
	},
	{
		workout: 'HIT Cardio',
		category: 'cardio',
		icon: Zap,
		exercises: 4,
		duration: 30,
	},
	{
		workout: null, // Rest day
		category: null,
		icon: null,
		exercises: 0,
		duration: 0,
	},
];

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

// Helper function to generate the current week's schedule
const generateWeekSchedule = () => {
	const now = new Date();
	const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
	const currentDate = now.getDate();

	// Calculate the start of the week (Monday)
	const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
	const monday = new Date(now);
	monday.setDate(currentDate + mondayOffset);

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const fullDays = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	return days.map((day, index) => {
		const date = new Date(monday);
		date.setDate(monday.getDate() + index);

		const isToday =
			date.getDate() === now.getDate() &&
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear();

		const isPast = date < now && !isToday;

		return {
			day,
			fullDay: fullDays[index],
			date: date.getDate().toString(),
			dateObj: date,
			isToday,
			completed: isPast, // Auto-mark past days as completed
			...weeklyRoutine[index],
		};
	});
};

export const Dashboard = () => {
	// const { user } = useAuth();
	// Generate the week schedule dynamically (memoized to prevent recalculation)
	const weeklyRoutine = useMemo(() => generateWeekSchedule(), []);
	const todayIndex = weeklyRoutine.findIndex((d) => d.isToday);
	const [activeScrollIndex, setActiveScrollIndex] = useState(todayIndex);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const hasScrolledRef = useRef(false);

	// function to scroll to a specific card by index with optional smooth behavior
	function scrollToCard(index: number, behavior: ScrollBehavior = 'smooth') {
		const container = scrollContainerRef.current;

		if (!container) return;

		const cards = container.querySelectorAll<HTMLElement>('[data-day-card]');

		const card = cards[index];

		if (!card) return;

		const target =
			card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;

		const maxScroll = container.scrollWidth - container.clientWidth;

		container.scrollTo({
			left: Math.max(0, Math.min(target, maxScroll)),
			behavior,
		});
	}
	// Auto-scroll to today on initial load (only once)
	useLayoutEffect(() => {
		if (todayIndex < 0 || hasScrolledRef.current) {
			return;
		}

		requestAnimationFrame(() => {
			scrollToCard(todayIndex, 'auto');
			setActiveScrollIndex(todayIndex);
			hasScrolledRef.current = true;
		});
	}, [todayIndex]);

	// Auto-scroll to today on mount
	useEffect(() => {
		const container = scrollContainerRef.current;

		if (!container) return;

		let frame = 0;

		const handleScroll = () => {
			cancelAnimationFrame(frame);

			frame = requestAnimationFrame(() => {
				const cards =
					container.querySelectorAll<HTMLElement>('[data-day-card]');

				const maxScroll = container.scrollWidth - container.clientWidth;

				if (maxScroll <= 5) {
					setActiveScrollIndex(todayIndex);
					return;
				}

				if (container.scrollLeft <= 5) {
					setActiveScrollIndex(0);
					return;
				}

				if (container.scrollLeft >= maxScroll - 5) {
					setActiveScrollIndex(cards.length - 1);
					return;
				}

				const center = container.scrollLeft + container.clientWidth / 2;

				let closest = 0;
				let distance = Infinity;

				cards.forEach((card, index) => {
					const cardCenter = card.offsetLeft + card.offsetWidth / 2;

					const d = Math.abs(center - cardCenter);

					if (d < distance) {
						distance = d;
						closest = index;
					}
				});

				setActiveScrollIndex(closest);
			});
		};

		container.addEventListener('scroll', handleScroll, { passive: true });

		handleScroll();

		return () => {
			cancelAnimationFrame(frame);

			container.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			{/* Contenido principal centrado */}
			<div className={cn('space-y-6 md:space-y-8 pb-12 md:pb-8 px-2')}>
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
					<div>
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

				{/* Weekly Schedule - Mobile Optimized with Horizontal Scroll */}
				<Card
					className={cn(
						'border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl',
					)}
				>
					<CardHeader className={cn('pb-3 md:pb-6')}>
						<CardTitle
							className={cn(
								'flex items-center text-foreground text-lg md:text-xl',
							)}
						>
							<Calendar className={cn('h-5 w-5 mr-2')} />
							This Week's Schedule
						</CardTitle>
					</CardHeader>
					<CardContent className={cn('h-auto md:h-77')}>
						{/* Mobile: Horizontal Scroll with auto-focus on today */}
						<div
							ref={scrollContainerRef}
							className={cn(
								'flex px-2 gap-3 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain py-3 scrollbar-hide snap-x snap-proximity touch-pan-y',
							)}
						>
							{weeklyRoutine.map((day, index) => (
								<div
									key={index}
									data-day-card
									onClick={() => {
										setActiveScrollIndex(index);
										scrollToCard(index);
									}}
									className={cn('flex-none md:flex-1 w-36 snap-center pb-3')}
								>
									<Card
										className={cn(`relative transition-all duration-500 ease-in-out h-full ${
											activeScrollIndex !== index &&
											'hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl '
										} ${
											day.isToday
												? 'ring-cyan-400 bg-linear-to-br from-cyan-300/30 to-green-300/30 border-cyan-300 dark:from-cyan-950/40 dark:to-green-950/40 dark:border-cyan-800/60 '
												: ''
										} ${
											day.completed
												? 'ring-green-400 bg-linear-to-br from-lime-300/30 to-green-300/30 border-green-300 dark:from-lime-950/40 dark:to-green-950/40 dark:border-green-800/60 '
												: ''
										}	${
											!day.completed && !day.isToday
												? 'border-border/40 bg-card/80 dark:bg-neutral-800/60 '
												: ''
										}	${
											activeScrollIndex === index
												? 'scale-[1.05] shadow-md ring-2 cursor-default'
												: 'cursor-pointer'
										} ${
											activeScrollIndex === index && day.isToday
												? 'from-cyan-500/20 to-green-500/20 dark:from-cyan-900/30 dark:to-green-900/50 ring-cyan-300 '
												: ''
										} ${
											activeScrollIndex === index && day.completed
												? 'from-lime-400/20 to-green-400/20 dark:from-lime-900/30 dark:to-green-900/50 ring-green-400/90 '
												: ''
										}
											rounded-2xl shadow-lg`)}
									>
										<CardContent className='p-6'>
											<div className={cn('text-center space-y-2')}>
												<div className={cn('flex flex-col items-center')}>
													<p
														className={cn(
															'text-xs font-medium text-foreground uppercase tracking-wider',
														)}
													>
														{day.day}
													</p>
													<p
														className={cn(
															'text-3xl font-bold text-foreground leading-none',
														)}
													>
														{day.date}
													</p>
												</div>

												{day.workout ? (
													<div className='space-y-2.5'>
														<div className='flex flex-col items-center gap-1.5'>
															{day.icon && (
																<div
																	className={`p-1.5 rounded-full ${
																		day.isToday
																			? 'bg-cyan-500/20'
																			: day.completed
																				? 'bg-green-500/20'
																				: 'bg-muted/40'
																	}`}
																>
																	<day.icon
																		className={`h-4 w-4 ${
																			day.isToday
																				? 'text-cyan-400'
																				: day.completed
																					? 'text-green-400'
																					: 'text-muted-foreground'
																		}`}
																	/>
																</div>
															)}
															<p className='text-sm font-semibold text-foreground leading-tight'>
																{day.workout}
															</p>
														</div>

														<div className='flex items-center justify-center gap-3 text-xs text-muted-foreground'>
															<span className='flex items-center gap-1'>
																<Dumbbell className='h-3 w-3' />
																{day.exercises}
															</span>
															<span className='flex items-center gap-1'>
																<Clock className='h-3 w-3' />
																{day.duration}m
															</span>
														</div>

														{day.completed && (
															<Badge
																variant='secondary'
																className='w-full justify-center text-xs bg-green-900/50 text-green-300 border-green-700/50 py-1'
															>
																✓ Done
															</Badge>
														)}
														{day.isToday && (
															<Badge className='w-full justify-center text-xs bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-md shadow-cyan-500/20 py-1'>
																Today
															</Badge>
														)}
													</div>
												) : (
													<div className={cn('text-center py-2')}>
														<p
															className={cn(
																'text-xs text-muted-foreground mb-2',
															)}
														>
															Rest Day
														</p>
														<div
															className={cn(
																'h-10 flex items-center justify-center',
															)}
														>
															<Badge
																variant='outline'
																className={cn(
																	'border-border/40 text-muted-foreground/70 text-xs py-1',
																)}
															>
																Recovery
															</Badge>
														</div>
													</div>
												)}
											</div>
										</CardContent>
									</Card>
								</div>
							))}
						</div>

						{/* Interactive scroll indicator dots */}
						<div className={cn('flex justify-center mt-3 pb-1')}>
							<div
								className={cn(
									'flex items-center gap-2 bg-muted/90 dark:bg-neutral-800/80 rounded-full px-3 py-2',
								)}
							>
								{weeklyRoutine.map((day, index) => (
									<button
										key={index}
										onClick={() => {
											scrollToCard(index);
											setActiveScrollIndex(index);
										}}
										aria-label={`Scroll to ${day.fullDay}`}
										className={cn(
											`rounded-full transition-all duration-300 ${
												activeScrollIndex === index
													? day.isToday
														? 'h-2.5 w-6 bg-linear-to-r from-cyan-500 to-green-400 shadow-sm shadow-cyan-500/30 '
														: day.completed
															? 'h-2.5 w-6 bg-green-500'
															: 'h-2.5 w-6 bg-foreground/70'
													: day.isToday
														? 'h-2 w-2 bg-cyan-500/50'
														: day.completed
															? 'h-2 w-2 bg-green-500/40'
															: 'h-2 w-2 bg-muted-foreground/30'
											}`,
										)}
									/>
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
};
