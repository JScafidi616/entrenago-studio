import { Button } from '@/components/ui/button';
import cn from 'clsx';

interface AuthProvidersProps {
	providerName: string;
	disabled: boolean;
	providerDescription: string;
	providerImage: string;
	authClick: () => void;
}

const AuthProviders = ({
	disabled,
	providerName,
	providerDescription,
	providerImage,
	authClick,
}: AuthProvidersProps) => {
	return (
		<Button
			disabled={disabled}
			onClick={authClick}
			className={cn(
				'bg-primary text-primary-foreground border-border hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-md border bg-linear-to-r from-cyan-500 to-green-400 px-4 py-2 font-semibold transition',
			)}
		>
			<img src={providerImage} alt={providerName} className={cn('h-5 w-5')} />
			<span className={cn('text-sm font-semibold')}>{providerDescription}</span>
		</Button>
	);
};

export default AuthProviders;
