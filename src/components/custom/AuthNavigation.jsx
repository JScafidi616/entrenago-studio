import cn from 'clsx';
import { Link } from 'wouter';

const AuthNavigation = ({ textQuestion, location, clickAction }) => {
	return (
		<p
			className={cn(
				'text-center text-sm text-muted-foreground dark:text-gray-300',
			)}
		>
			{textQuestion + ' '}
			<Link
				href={location}
				className={cn(
					'text-primary text-green-600 dark:text-green-400 hover:underline font-medium',
				)}
			>
				{clickAction}
			</Link>
		</p>
	);
};

export default AuthNavigation;
