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

export const CarouselDayCard = ({ day, isActive, onClick }: CarouselDayCardProps) => {
	return (
		<div
			data-day-card
			onClick={onClick}
			className={cn(
				'w-36 flex-none snap-center pb-3 md:flex-1',
				isActive ? 'cursor-default' : 'cursor-pointer',
			)}
		>
			<Card
				className={cn(
					'relative h-full rounded-2xl shadow-lg transition-all duration-500 ease-in-out',
					!isActive && 'hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl',
					day.isToday &&
						'border-cyan-300 bg-linear-to-br from-cyan-300/30 to-green-300/30 ring-cyan-400 dark:border-cyan-800/60 dark:from-cyan-950/40 dark:to-green-950/40',
					day.completed &&
						'border-green-300 bg-linear-to-br from-lime-300/30 to-green-300/30 ring-green-400 dark:border-green-800/60 dark:from-lime-950/40 dark:to-green-950/40',
					!day.completed && !day.isToday && 'border-border/40 bg-card/80 dark:bg-neutral-800/60',
					isActive && 'scale-[1.05] shadow-md ring-2',
					isActive &&
						day.isToday &&
						'from-cyan-500/20 to-green-500/20 ring-cyan-300 dark:from-cyan-900/30 dark:to-green-900/50',
					isActive &&
						day.completed &&
						'from-lime-400/20 to-green-400/20 ring-green-400/90 dark:from-lime-900/30 dark:to-green-900/50',
				)}
			>
				<CardContent className="p-6">
					<div className="space-y-2 text-center">
						<div className="flex flex-col items-center">
							<p className="text-foreground text-xs font-medium tracking-wider uppercase">
								{day.day}
							</p>
							<p className="text-foreground text-3xl leading-none font-bold">{day.date}</p>
						</div>

						{day.workout ? (
							<div className="space-y-2.5">
								<div className="flex flex-col items-center gap-1.5">
									{day.icon && (
										<div
											className={cn(
												'rounded-full p-1.5',
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
									<p className="text-foreground text-sm leading-tight font-semibold">
										{day.workout}
									</p>
								</div>

								<div className="text-muted-foreground flex items-center justify-center gap-3 text-xs">
									<span className="flex items-center gap-1">
										<Dumbbell className="h-3 w-3" />
										{day.exercises}
									</span>
									<span className="flex items-center gap-1">
										<Clock className="h-3 w-3" />
										{day.duration}m
									</span>
								</div>

								{day.completed && (
									<Badge
										variant="secondary"
										className="w-full justify-center border-green-700/50 bg-green-900/50 py-1 text-xs text-green-300"
									>
										✓ Done
									</Badge>
								)}
								{day.isToday && (
									<Badge className="w-full justify-center bg-linear-to-r from-cyan-500 to-green-400 py-1 text-xs text-white shadow-md shadow-cyan-500/20">
										Today
									</Badge>
								)}
							</div>
						) : (
							<div className="py-2 text-center">
								<p className="text-muted-foreground mb-2 text-xs">Rest Day</p>
								<div className="flex h-10 items-center justify-center">
									<Badge
										variant="outline"
										className="border-border/40 text-muted-foreground/70 py-1 text-xs"
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
