import { useState, useRef, useLayoutEffect, useEffect } from 'react';

export function useCarouselScroll(todayIndex: number) {
	const [activeScrollIndex, setActiveScrollIndex] = useState(todayIndex);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const hasScrolledRef = useRef(false);

	const scrollToCard = (index: number, behavior: ScrollBehavior = 'smooth') => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const cards = container.querySelectorAll<HTMLElement>('[data-day-card]');
		const card = cards[index];
		if (!card) return;

		const target = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;
		const maxScroll = container.scrollWidth - container.clientWidth;

		container.scrollTo({
			left: Math.max(0, Math.min(target, maxScroll)),
			behavior,
		});
	};

	// Auto-scroll to today on initial load
	useLayoutEffect(() => {
		if (todayIndex < 0 || hasScrolledRef.current) return;

		requestAnimationFrame(() => {
			scrollToCard(todayIndex, 'auto');
			setActiveScrollIndex(todayIndex);
			hasScrolledRef.current = true;
		});
	}, [todayIndex]);

	// Handle manual scrolling and update active index
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		let frame = 0;

		const handleScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				const cards = container.querySelectorAll<HTMLElement>('[data-day-card]');
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
	}, [todayIndex]);

	return {
		scrollContainerRef,
		activeScrollIndex,
		setActiveScrollIndex,
		scrollToCard,
	};
}
