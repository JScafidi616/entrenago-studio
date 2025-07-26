import { cn } from '@/lib/utils/utils.ts';
import React from 'react';
import { Link } from 'wouter';

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
				<div className={cn('flex justify-between items-center mb-1')}>
					<label
						htmlFor={id}
						className={cn(
							'text-sm text-foreground dark:text-gray-300',
							labelClassName,
						)}
					>
						{label}
					</label>
					<div className='text-xs text-primary hover:underline text-green-600 dark:text-green-400'>
						<Link
							href={linkHref}
							role='button'
							className='text-primary font-medium text-green-600 dark:text-green-400 hover:underline'
						>
							{linkText}
						</Link>
					</div>
				</div>
			) : (
				// Solo label normal
				<label
					htmlFor={id}
					className={cn(
						'block text-sm mb-1 text-foreground dark:text-gray-300',
						labelClassName,
					)}
				>
					{label}
				</label>
			)}
			<input
				id={id}
				className={cn(
					'w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-gray-900 dark:border-gray-700 dark:text-white transition',
					inputClassName,
				)}
				{...inputProps}
			/>
		</div>
	);
};

export default Input;
