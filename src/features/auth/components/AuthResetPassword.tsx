// components/PasswordForm.tsx
import { useState } from 'react';
import { useResetPassword } from '@/features/auth/hooks/useAuthentications';
import { cn } from '@/utils/utils';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PasswordFormProps {
	shouldSignOut?: boolean;
	onSuccess?: () => void;
	submitButtonText?: string;
}

export const PasswordForm = ({
	onSuccess,
	submitButtonText = 'Establecer nueva contraseña',
}: PasswordFormProps) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [localError, setLocalError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const { mutate, isPending, error } = useResetPassword();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');

		if (password !== confirmPassword) {
			setLocalError('Las contraseñas no coinciden');
			return;
		}

		mutate(
			{ newPassword: password },
			{
				onSuccess: () => {
					if (onSuccess) onSuccess();
				},
			},
		);
	};

	const displayError = error?.message || localError;

	return (
		<form onSubmit={handleSubmit} noValidate className='flex flex-col gap-4'>
			{/* New password */}
			<div className='flex flex-col gap-1.5'>
				<Label
					htmlFor='new-password'
					className='text-sm font-medium text-foreground'
				>
					Nueva contraseña
				</Label>
				<div className='relative'>
					<Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
					<Input
						id='new-password'
						type={showPassword ? 'text' : 'password'}
						placeholder='Mínimo 6 caracteres'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength={6}
						className={`pl-10 pr-10 h-11 rounded-xl bg-muted/30 dark:bg-neutral-700/40 border-border/50 focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors ${
							displayError
								? 'border-destructive focus:border-destructive focus:ring-destructive/20'
								: ''
						}`}
					/>
					<button
						type='button'
						aria-label={
							showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
						}
						onClick={() => setShowPassword((v) => !v)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
					>
						{showPassword ? (
							<EyeOff className='h-4 w-4' />
						) : (
							<Eye className='h-4 w-4' />
						)}
					</button>
				</div>
			</div>

			{/* Confirm password */}
			<div className='flex flex-col gap-1.5'>
				<Label
					htmlFor='confirm-password'
					className='text-sm font-medium text-foreground'
				>
					Confirmar nueva contraseña
				</Label>
				<div className='relative'>
					<Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none' />
					<Input
						id='confirm-password'
						type={showConfirm ? 'text' : 'password'}
						placeholder='Repite tu contraseña'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						minLength={6}
						className={`pl-10 pr-10 h-11 rounded-xl bg-muted/30 dark:bg-neutral-700/40 border-border/50 focus:border-cyan-500 focus:ring-cyan-500/20 transition-colors ${
							displayError
								? 'border-destructive focus:border-destructive focus:ring-destructive/20'
								: ''
						}`}
					/>
					<button
						type='button'
						aria-label={
							showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'
						}
						onClick={() => setShowConfirm((v) => !v)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
					>
						{showConfirm ? (
							<EyeOff className='h-4 w-4' />
						) : (
							<Eye className='h-4 w-4' />
						)}
					</button>
				</div>
				{displayError && (
					<p role='alert' className='text-xs text-destructive mt-0.5'>
						{displayError}
					</p>
				)}
			</div>

			<Button
				type='submit'
				disabled={isPending}
				className='w-full h-11 rounded-xl bg-linear-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white font-semibold shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 mt-1 border-0'
			>
				{isPending ? 'Actualizando...' : submitButtonText}
			</Button>
		</form>
	);
};
