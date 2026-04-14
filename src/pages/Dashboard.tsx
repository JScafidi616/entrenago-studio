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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';

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
		workout: 'HIIT Cardio',
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

export default function Dashboard() {
	const { user } = useAuthentication();
	const [, setLocation] = useLocation();
	const [showOnboarding, setShowOnboarding] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	// const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);

	// Generate the week schedule dynamically (memoized to prevent recalculation)
	const weeklyRoutine = useMemo(() => generateWeekSchedule(), []);
	const todayIndex = weeklyRoutine.findIndex((d) => d.isToday);

	const [activeScrollIndex, setActiveScrollIndex] = useState(
		todayIndex >= 0 ? todayIndex : 0,
	);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const hasScrolledRef = useRef(false);

	const scrollToCard = useCallback((index: number) => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const cards = container.querySelectorAll<HTMLElement>('[data-day-card]');
		if (cards[index]) {
			const card = cards[index];
			const containerWidth = container.offsetWidth;
			const cardCenter = card.offsetLeft + card.offsetWidth / 2;
			// Desired scroll: center the card, but clamp so we never show empty space
			const idealScroll = cardCenter - containerWidth / 2;
			const maxScroll = container.scrollWidth - containerWidth;
			const clampedScroll = Math.max(0, Math.min(idealScroll, maxScroll));
			container.scrollTo({ left: clampedScroll, behavior: 'smooth' });
		}
	}, []);

	// Auto-scroll to today on mount
	useEffect(() => {
		if (
			todayIndex >= 0 &&
			scrollContainerRef.current &&
			!hasScrolledRef.current
		) {
			const timer = setTimeout(() => {
				const container = scrollContainerRef.current;
				if (!container) return;

				const cards =
					container.querySelectorAll<HTMLElement>('[data-day-card]');
				const todayCard = cards[todayIndex];

				if (todayCard) {
					todayCard.scrollIntoView({
						behavior: 'auto', // Instant on first load
						block: 'nearest',
						inline: 'center',
					});
					hasScrolledRef.current = true;
				}
			}, 150);

			return () => clearTimeout(timer);
		}
	}, [todayIndex]);

	// Track active card on scroll
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const handleScroll = () => {
			const cards = container.querySelectorAll<HTMLElement>('[data-day-card]');
			const containerCenter = container.scrollLeft + container.offsetWidth / 2;
			let closestIndex = 0;
			let closestDistance = Infinity;

			cards.forEach((card, index) => {
				const cardCenter = card.offsetLeft + card.offsetWidth / 2;
				const distance = Math.abs(containerCenter - cardCenter);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestIndex = index;
				}
			});

			setActiveScrollIndex(closestIndex);
		};

		container.addEventListener('scroll', handleScroll, { passive: true });
		return () => container.removeEventListener('scroll', handleScroll);
	}, []);

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

	const renderDashboard = () => (
		<div className='space-y-6 md:space-y-8 pb-12 md:pb-8 px-2'>
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
							// onClick={() => setIsWorkoutModalOpen(true)}
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
								// onClick={() => setIsWorkoutModalOpen(true)}
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
					{/* Mobile: Horizontal Scroll with auto-focus on today */}
					<div className='md:hidden'>
						<div
							ref={scrollContainerRef}
							className='flex gap-3 overflow-x-auto py-3 scrollbar-hide snap-x snap-mandatory px-1'
						>
							{weeklyRoutine.map((day, index) => (
								<div
									key={index}
									data-day-card
									className='flex-shrink-0 w-36 snap-center'
								>
									<Card
										className={`relative transition-all duration-300 h-full ${
											day.isToday
												? 'ring-2 ring-cyan-400 bg-gradient-to-br from-cyan-50 to-green-50 dark:from-cyan-950/40 dark:to-green-950/40 shadow-lg shadow-cyan-500/10'
												: ''
										} ${
											day.completed
												? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800/60'
												: 'border-border/40 bg-card/80 dark:bg-neutral-800/60'
										} ${
											activeScrollIndex === index && !day.isToday
												? 'scale-[1.02] shadow-md'
												: ''
										} rounded-2xl`}
									>
										<CardContent className='p-4'>
											<div className='text-center space-y-2.5'>
												<div className='flex flex-col items-center gap-0.5'>
													<p className='text-xs font-medium text-muted-foreground uppercase tracking-wider'>
														{day.day}
													</p>
													<p className='text-3xl font-bold text-foreground leading-none'>
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
																className='w-full text-xs bg-green-900/50 text-green-300 border-green-700/50 py-1'
															>
																Done
															</Badge>
														)}
														{day.isToday && (
															<Badge className='w-full text-xs bg-gradient-to-r from-cyan-500 to-green-400 text-white shadow-md shadow-cyan-500/20 py-1'>
																Today
															</Badge>
														)}
													</div>
												) : (
													<div className='text-center py-2'>
														<p className='text-xs text-muted-foreground mb-2'>
															Rest Day
														</p>
														<div className='h-10 flex items-center justify-center'>
															<Badge
																variant='outline'
																className='border-border/40 text-muted-foreground/70 text-xs py-1'
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
						<div className='flex justify-center mt-4 pb-1'>
							<div className='flex items-center gap-2 bg-muted/90 dark:bg-neutral-800/80 rounded-full px-3 py-2'>
								{weeklyRoutine.map((day, index) => (
									<button
										key={index}
										onClick={() => {
											scrollToCard(index);
											setActiveScrollIndex(index);
										}}
										aria-label={`Scroll to ${day.fullDay}`}
										className={`rounded-full transition-all duration-300 ${
											activeScrollIndex === index
												? day.isToday
													? 'h-2.5 w-6 bg-gradient-to-r from-cyan-500 to-green-400 shadow-sm shadow-cyan-500/30'
													: day.completed
														? 'h-2.5 w-6 bg-green-500'
														: 'h-2.5 w-6 bg-foreground/70'
												: day.isToday
													? 'h-2 w-2 bg-cyan-500/50'
													: day.completed
														? 'h-2 w-2 bg-green-500/40'
														: 'h-2 w-2 bg-muted-foreground/30'
										}`}
									/>
								))}
							</div>
						</div>
					</div>

					{/* Desktop: Grid Layout */}
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
			{renderDashboard()}

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
