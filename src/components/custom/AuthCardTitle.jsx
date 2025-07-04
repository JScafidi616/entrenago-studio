import cn from 'clsx';

const AuthCardTitle = ({ title, description }) => {
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
