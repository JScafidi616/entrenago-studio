import { cn } from '@/utils/utils';
import type React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	isPending?: boolean;
}
//TODO deprecated this component, use the Button component from ui folder instead
const Button: React.FC<ButtonProps> = ({ children, isPending, ...rest }) => (
	<button
		type="submit"
		disabled={isPending || rest.disabled}
		className={cn(
			'bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-md bg-linear-to-r from-cyan-500 to-green-400 py-2 font-semibold transition',
		)}
		{...rest}
	>
		{isPending ? 'Cargando...' : children}
	</button>
);

export default Button;
