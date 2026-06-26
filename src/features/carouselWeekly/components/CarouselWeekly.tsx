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

	const {
		scrollContainerRef,
		activeScrollIndex,
		setActiveScrollIndex,
		scrollToCard,
	} = useCarouselScroll(todayIndex);

	const handleCardClick = (index: number) => {
		setActiveScrollIndex(index);
		scrollToCard(index);
	};

	return (
		<Card
			className={cn(
				'border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl',
			)}
		>
			<CardHeader className='pb-3 md:pb-6'>
				<CardTitle className='flex items-center text-foreground text-lg md:text-xl'>
					<Calendar className='h-5 w-5 mr-2' />
					This Week's Schedule
				</CardTitle>
			</CardHeader>

			<CardContent className='h-auto md:h-77'>
				{/* Scroll Container */}
				<div
					ref={scrollContainerRef}
					className='flex px-2 gap-3 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain py-3 scrollbar-hide snap-x snap-proximity touch-pan-y'
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
