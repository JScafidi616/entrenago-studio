import { cn } from '@/utils/utils';
import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	isPending?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isPending, ...rest }) => (
	<button
		type='submit'
		disabled={isPending || rest.disabled}
		className={cn(
			'w-full py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition bg-gradient-to-r from-cyan-500 to-green-400',
		)}
		{...rest}
	>
		{isPending ? 'Cargando...' : children}
	</button>
);

export default Button;
