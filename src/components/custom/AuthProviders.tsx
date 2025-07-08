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
		<button
			onClick={authClick}
			className={cn(
				'w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400',
			)}
		>
			<img src={providerImage} alt={providerName} className={cn('w-5 h-5')} />
			<span className={cn('text-sm font-semibold')}>{providerDescription}</span>
		</button>
	);
};

export default AuthProviders;
