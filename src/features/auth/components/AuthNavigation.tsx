import cn from 'clsx';
import { Link } from 'react-router-dom';

interface AuthNavigationProps {
	textQuestion: string;
	location: string;
	clickAction: string;
}

const AuthNavigation = ({ textQuestion, location, clickAction }: AuthNavigationProps) => {
	return (
		<p className={cn('text-muted-foreground text-center text-sm dark:text-gray-300')}>
			{textQuestion + ' '}
			<Link
				to={location}
				className={cn(
					'text-primary font-medium text-green-600 hover:underline dark:text-green-400',
				)}
			>
				{clickAction}
			</Link>
		</p>
	);
};

export default AuthNavigation;
