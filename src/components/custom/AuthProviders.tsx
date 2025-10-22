import { Button } from '@/components/ui/button';
import cn from 'clsx';

interface AuthProvidersProps {
	providerName: string;
	providerDescription: string;
	providerImage: string;
	authClick: () => void;
}

const AuthProviders = ({
	providerName,
	providerDescription,
	providerImage,
	authClick,
}: AuthProvidersProps) => {
	return (
		<Button
			onClick={authClick}
			className={cn(
				'w-full flex bg-primary text-primary-foreground items-center justify-center font-semibold gap-2 py-2 px-4 border border-border rounded-md hover:bg-primary/90 transition bg-gradient-to-r from-cyan-500 to-green-400',
			)}
		>
			<img src={providerImage} alt={providerName} className={cn('w-5 h-5')} />
			<span className={cn('text-sm font-semibold')}>{providerDescription}</span>
		</Button>
	);
};

export default AuthProviders;
