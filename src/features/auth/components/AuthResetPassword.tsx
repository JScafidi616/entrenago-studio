// components/PasswordForm.tsx
import { useState } from 'react';
import { useResetPassword } from '@/features/auth/hooks/useAuthentications';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/utils';

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
	const [showPassword, setShowPassword] = useState(false);

	const { mutate, isPending, error: apiError } = useResetPassword();
	const [localError, setLocalError] = useState('');
	const displayError = localError ?? apiError?.message ?? '';

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');

		if (isPending) return;

		const cleanPassword = password.trim();
		const cleanConfirmPassword = confirmPassword.trim();
		// Password should be at least 6 characters. Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};':"|<>?,./`~.
		if (!cleanPassword || !cleanConfirmPassword) {
			setLocalError('Por favor, completa ambos los campos');
			return;
		}

		if (password !== confirmPassword) {
			setLocalError('Una de las dos contraseñas no coinciden');
			return;
		}
		const lowerCaseCheck = /[a-z]/.test(cleanPassword);
		const upperCaseCheck = /[A-Z]/.test(cleanPassword);
		const numberCheck = /[0-9]/.test(cleanPassword);
		const symbolCheck = /[^A-Za-z0-9]/.test(cleanPassword);

		if (!lowerCaseCheck || !upperCaseCheck || !numberCheck || !symbolCheck) {
			setLocalError(
				'La contraseña debe incluir al menos un carácter de cada uno: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789, !@#$%^&*()_+-=[]{};\':"|<>?,./`~.',
			);
			return;
		}

		if (password.length < 6 && confirmPassword.length < 6) {
			setLocalError('La contraseña debe tener al menos 6 caracteres');
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
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		if (localError) setLocalError('');
	};
	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		if (localError) setLocalError('');
	};

	return (
		<form onSubmit={handleSubmit} noValidate={true} className="flex flex-col gap-4">
			<div className="flex flex-col">
				{/* New password */}
				<div className="mb-1 flex items-center justify-between">
					{' '}
					<Label htmlFor="new-password" className="text-foreground text-sm font-medium">
						Nueva contraseña
					</Label>
				</div>

				<div className="relative mb-2">
					<Lock
						className={cn(
							'text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
						)}
					/>
					<Input
						id="new-password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Mínimo 6 caracteres"
						value={password}
						onChange={handlePasswordChange}
						required
						minLength={6}
						className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
							displayError
								? 'border-destructive focus:border-destructive focus:ring-destructive/20 dark:bg-destructive/20'
								: ''
						}`}
					/>
					<button
						type="button"
						aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						onClick={() => setShowPassword((v) => !v)}
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4 cursor-pointer" />
						) : (
							<Eye className="h-4 w-4 cursor-pointer" />
						)}
					</button>
				</div>

				{/* Confirm password */}
				<div className="mb-1 flex items-center justify-between">
					<Label htmlFor="confirm-password" className="text-foreground text-sm font-medium">
						Confirmar nueva contraseña
					</Label>
				</div>

				<div className="relative">
					<Lock
						className={cn(
							'text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2',
						)}
					/>
					<Input
						id="confirm-password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Repite tu contraseña"
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						required
						minLength={6}
						className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
							displayError
								? 'border-destructive focus:border-destructive focus:ring-destructive/20 dark:bg-destructive/20'
								: ''
						}`}
					/>
					<button
						type="button"
						aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						onClick={() => setShowPassword((v) => !v)}
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
					>
						{showPassword ? (
							<EyeOff className="h-4 w-4 cursor-pointer" />
						) : (
							<Eye className="h-4 w-4 cursor-pointer" />
						)}
					</button>
				</div>

				{/* Unified Error Message */}
				{displayError && (
					<p role="alert" className="text-destructive mt-0.5 text-center text-xs">
						{displayError}
					</p>
				)}
			</div>

			<Button
				type="submit"
				disabled={isPending}
				className="mt-1 h-11 w-full cursor-pointer rounded-xl border-0 bg-linear-to-r from-cyan-500 to-green-400 font-semibold text-white shadow-md transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-lg active:scale-[0.98]"
			>
				{isPending ? 'Actualizando...' : submitButtonText}
			</Button>
		</form>
	);
};
