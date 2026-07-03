import { cn } from '@/utils/utils';
import React from 'react';
import { Link } from 'react-router-dom';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	linkText?: string;
	linkHref?: string;
	containerClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	linkText,
	linkHref,
	containerClassName,
	labelClassName,
	inputClassName,
	...inputProps
}) => {
	return (
		<div className={cn('mb-4', containerClassName)}>
			{/* Si hay link, label y link en flex */}
			{linkText && linkHref ? (
				<div className={cn('mb-1 flex items-center justify-between')}>
					<label
						htmlFor={id}
						className={cn('text-foreground text-sm dark:text-gray-300', labelClassName)}
					>
						{label}
					</label>
					<div className="text-primary text-xs text-green-600 hover:underline dark:text-green-400">
						<Link
							to={linkHref}
							role="button"
							className="text-primary font-medium text-green-600 hover:underline dark:text-green-400"
						>
							{linkText}
						</Link>
					</div>
				</div>
			) : (
				// Solo label normal
				<label
					htmlFor={id}
					className={cn('text-foreground mb-1 block text-sm dark:text-gray-300', labelClassName)}
				>
					{label}
				</label>
			)}
			<input
				id={id}
				className={cn(
					'bg-background border-border focus:ring-primary w-full rounded-md border bg-white px-4 py-2 transition focus:ring-2 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white',
					inputClassName,
				)}
				{...inputProps}
			/>
		</div>
	);
};

export default Input;
