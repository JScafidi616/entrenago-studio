import { useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/utils';
import { generateWeekSchedule } from '@/features/carouselWeekly/types/weeklyData';
import { useCarouselScroll } from '@/features/carouselWeekly/hooks/useCarouselScroll';
import { CarouselDayCard } from '@/features/carouselWeekly/components/CarouselDayCard';
import { CarouselScroll } from '@/features/carouselWeekly/components/CarouselScroll';

export const WeeklyScheduleCarousel = () => {
	const weeklyRoutine = useMemo(() => generateWeekSchedule(), []);
	const todayIndex = weeklyRoutine.findIndex((d) => d.isToday);

	const { scrollContainerRef, activeScrollIndex, setActiveScrollIndex, scrollToCard } =
		useCarouselScroll(todayIndex);

	const handleCardClick = (index: number) => {
		setActiveScrollIndex(index);
		scrollToCard(index);
	};

	return (
		<Card
			className={cn(
				'border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50',
			)}
		>
			<CardHeader className="pb-3 md:pb-6">
				<CardTitle className="text-foreground flex items-center text-lg md:text-xl">
					<Calendar className="mr-2 h-5 w-5" />
					This Week's Schedule
				</CardTitle>
			</CardHeader>

			<CardContent className="h-auto md:h-77">
				{/* Scroll Container */}
				<div
					ref={scrollContainerRef}
					className="scrollbar-hide flex touch-pan-x touch-pan-y snap-x snap-proximity gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-2 py-3"
				>
					{weeklyRoutine.map((day, index) => (
						<CarouselDayCard
							key={index}
							day={day}
							isActive={activeScrollIndex === index}
							onClick={() => handleCardClick(index)}
						/>
					))}
				</div>

				{/* Indicators */}
				<CarouselScroll
					weeklyRoutine={weeklyRoutine}
					activeScrollIndex={activeScrollIndex}
					onDotClick={(index) => {
						scrollToCard(index);
						setActiveScrollIndex(index);
					}}
				/>
			</CardContent>
		</Card>
	);
};
