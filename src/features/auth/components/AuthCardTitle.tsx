import cn from 'clsx';

interface AuthCardTitleProps {
	title: string;
	description: string;
}

const AuthCardTitle = ({ title, description }: AuthCardTitleProps) => {
	return (
		<div className={cn('text-center')}>
			<h2 className={cn('text-foreground text-2xl font-bold dark:text-gray-300')}>{title}</h2>
			<p className={cn('text-muted-foreground mt-1 text-sm dark:text-gray-300')}>{description}</p>
		</div>
	);
};

export default AuthCardTitle;
