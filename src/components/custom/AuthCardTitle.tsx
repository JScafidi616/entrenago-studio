import cn from 'clsx';

interface AuthCardTitleProps {
	title: string;
	description: string;
}

const AuthCardTitle = ({ title, description }: AuthCardTitleProps) => {
	return (
		<div className={cn('text-center ')}>
			<h2
				className={cn(
					'text-2xl font-bold text-foreground text-black dark:text-gray-300 ',
				)}
			>
				{title}
			</h2>
			<p
				className={cn('text-sm text-muted-foreground mt-1 dark:text-gray-300')}
			>
				{description}
			</p>
		</div>
	);
};

export default AuthCardTitle;
