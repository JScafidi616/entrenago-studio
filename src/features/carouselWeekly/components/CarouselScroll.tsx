import { cn } from '@/utils/utils';
import type { DaySchedule } from '@/features/carouselWeekly/types/weeklyData';

interface CarouselScrollProps {
	weeklyRoutine: DaySchedule[];
	activeScrollIndex: number;
	onDotClick: (index: number) => void;
}

export const CarouselScroll = ({
	weeklyRoutine,
	activeScrollIndex,
	onDotClick,
}: CarouselScrollProps) => {
	return (
		<div className="mt-3 flex justify-center pb-1">
			<div className="bg-muted/90 flex items-center gap-2 rounded-full px-3 py-2 dark:bg-neutral-800/80">
				{weeklyRoutine.map((day, index) => (
					<button
						key={index}
						onClick={() => onDotClick(index)}
						aria-label={`Scroll to ${day.fullDay}`}
						className={cn(
							'rounded-full transition-all duration-300',
							activeScrollIndex === index
								? day.isToday
									? 'h-2.5 w-6 bg-linear-to-r from-cyan-500 to-green-400 shadow-sm shadow-cyan-500/30'
									: day.completed
										? 'h-2.5 w-6 bg-green-500'
										: 'bg-foreground/70 h-2.5 w-6'
								: day.isToday
									? 'h-2 w-2 bg-cyan-500/50'
									: day.completed
										? 'h-2 w-2 bg-green-500/40'
										: 'bg-muted-foreground/30 h-2 w-2',
						)}
					/>
				))}
			</div>
		</div>
	);
};
