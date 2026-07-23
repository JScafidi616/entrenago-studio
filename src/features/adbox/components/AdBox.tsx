import { cn } from '@/shared/utils/utils';
interface AdBoxProps {
	variant: 'horizontal' | 'square';
	label?: string;
}

export function AdBox({ variant, label = 'Advertisement' }: AdBoxProps) {
	return (
		<div
			className={cn(
				`border-border/40 bg-muted/20 relative overflow-hidden rounded-2xl border border-dashed dark:bg-neutral-800/30 ${
					variant === 'horizontal' ? 'h-24 md:h-28' : 'aspect-square md:aspect-auto md:h-full'
				}`,
			)}
		>
			<div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
				<span className="text-muted-foreground/50 text-[10px] font-medium tracking-widest uppercase">
					{label}
				</span>
				<div className="bg-muted-foreground/15 h-px w-10" />
				<span className="text-muted-foreground/35 text-[10px]">Ad Space</span>
			</div>
		</div>
	);
}
