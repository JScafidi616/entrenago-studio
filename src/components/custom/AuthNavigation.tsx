import cn from 'clsx';
import { Link } from 'wouter';

interface AuthNavigationProps {
	textQuestion: string;
	location: string;
	clickAction: string;
}

const AuthNavigation = ({
	textQuestion,
	location,
	clickAction,
}: AuthNavigationProps) => {
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
