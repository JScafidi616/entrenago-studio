// components/PasswordForm.tsx
import { useState } from 'react';
import { useResetPassword } from '@/features/auth/hooks/useAuthentications';
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
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			{/* New password */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="new-password" className="text-foreground text-sm font-medium">
					Nueva contraseña
				</Label>
				<div className="relative">
					<Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
					<Input
						id="new-password"
						type={showPassword ? 'text' : 'password'}
						placeholder="Mínimo 6 caracteres"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						minLength={6}
						className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
							displayError
								? 'border-destructive focus:border-destructive focus:ring-destructive/20'
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
			</div>

			{/* Confirm password */}
			<div className="flex flex-col gap-1.5">
				<Label htmlFor="confirm-password" className="text-foreground text-sm font-medium">
					Confirmar nueva contraseña
				</Label>
				<div className="relative">
					<Lock className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
					<Input
						id="confirm-password"
						type={showConfirm ? 'text' : 'password'}
						placeholder="Repite tu contraseña"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						minLength={6}
						className={`bg-muted/30 border-border/50 h-11 rounded-xl pr-10 pl-10 transition-colors focus:border-cyan-500 focus:ring-cyan-500/20 dark:bg-neutral-700/40 ${
							displayError
								? 'border-destructive focus:border-destructive focus:ring-destructive/20'
								: ''
						}`}
					/>
					<button
						type="button"
						aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
						onClick={() => setShowConfirm((v) => !v)}
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
					>
						{showConfirm ? (
							<EyeOff className="h-4 w-4 cursor-pointer" />
						) : (
							<Eye className="h-4 w-4 cursor-pointer" />
						)}
					</button>
				</div>
				{displayError && (
					<p role="alert" className="text-destructive mt-0.5 text-xs">
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
