import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dumbbell, Clock } from 'lucide-react';
import { cn } from '@/utils/utils';
import type { DaySchedule } from '@/features/carouselWeekly/types/weeklyData';

interface CarouselDayCardProps {
	day: DaySchedule;
	isActive: boolean;
	onClick: () => void;
}

export const CarouselDayCard = ({
	day,
	isActive,
	onClick,
}: CarouselDayCardProps) => {
	return (
		<div
			data-day-card
			onClick={onClick}
			className={cn(
				'flex-none md:flex-1 w-36 snap-center pb-3',
				isActive ? 'cursor-default' : 'cursor-pointer',
			)}
		>
			<Card
				className={cn(
					'relative transition-all duration-500 ease-in-out h-full rounded-2xl shadow-lg',
					!isActive &&
						'hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl',
					day.isToday &&
						'ring-cyan-400 bg-linear-to-br from-cyan-300/30 to-green-300/30 border-cyan-300 dark:from-cyan-950/40 dark:to-green-950/40 dark:border-cyan-800/60',
					day.completed &&
						'ring-green-400 bg-linear-to-br from-lime-300/30 to-green-300/30 border-green-300 dark:from-lime-950/40 dark:to-green-950/40 dark:border-green-800/60',
					!day.completed &&
						!day.isToday &&
						'border-border/40 bg-card/80 dark:bg-neutral-800/60',
					isActive && 'scale-[1.05] shadow-md ring-2',
					isActive &&
						day.isToday &&
						'from-cyan-500/20 to-green-500/20 dark:from-cyan-900/30 dark:to-green-900/50 ring-cyan-300',
					isActive &&
						day.completed &&
						'from-lime-400/20 to-green-400/20 dark:from-lime-900/30 dark:to-green-900/50 ring-green-400/90',
				)}
			>
				<CardContent className='p-6'>
					<div className='text-center space-y-2'>
						<div className='flex flex-col items-center'>
							<p className='text-xs font-medium text-foreground uppercase tracking-wider'>
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
											className={cn(
												'p-1.5 rounded-full',
												day.isToday
													? 'bg-cyan-500/20'
													: day.completed
														? 'bg-green-500/20'
														: 'bg-muted/40',
											)}
										>
											<day.icon
												className={cn(
													'h-4 w-4',
													day.isToday
														? 'text-cyan-400'
														: day.completed
															? 'text-green-400'
															: 'text-muted-foreground',
												)}
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
							<div className='text-center py-2'>
								<p className='text-xs text-muted-foreground mb-2'>Rest Day</p>
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
	);
};
