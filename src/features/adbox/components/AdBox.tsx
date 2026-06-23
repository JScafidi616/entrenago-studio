import { cn } from '@/utils/utils';
interface AdBoxProps {
	variant: 'horizontal' | 'square';
	label?: string;
}

export function AdBox({ variant, label = 'Advertisement' }: AdBoxProps) {
	return (
		<div
			className={cn(
				`relative overflow-hidden rounded-2xl border border-dashed border-border/40 bg-muted/20 dark:bg-neutral-800/30 ${
					variant === 'horizontal'
						? 'h-24 md:h-28'
						: 'aspect-square md:aspect-auto md:h-full'
				}`,
			)}
		>
			<div className='absolute inset-0 flex flex-col items-center justify-center gap-1.5'>
				<span className='text-[10px] font-medium uppercase tracking-widest text-muted-foreground/50'>
					{label}
				</span>
				<div className='h-px w-10 bg-muted-foreground/15' />
				<span className='text-[10px] text-muted-foreground/35'>Ad Space</span>
			</div>
		</div>
	);
}
