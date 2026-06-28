// components/PasswordForm.tsx
import { useState } from 'react';
import { useResetPassword } from '@/features/auth/hooks/useAuthentications';
import { cn } from '@/utils/utils';

interface PasswordFormProps {
	shouldSignOut?: boolean;
	onSuccess?: () => void;
	submitButtonText?: string;
}

export const PasswordForm = ({
	shouldSignOut = false,
	onSuccess,
	submitButtonText = 'Establecer nueva contraseña',
}: PasswordFormProps) => {
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [localError, setLocalError] = useState('');

	const { mutate, isPending, error } = useResetPassword();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLocalError('');

		if (password !== confirmPassword) {
			setLocalError('Las contraseñas no coinciden');
			return;
		}

		mutate(
			{ newPassword: password, shouldSignOut },
			{
				onSuccess: () => {
					if (onSuccess) onSuccess();
				},
			},
		);
	};

	return (
		<form onSubmit={handleSubmit} className={cn('space-y-4')}>
			<input
				type='password'
				placeholder='Nueva contraseña'
				className={cn('w-full p-2 border rounded dark:text-gray-400')}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
				minLength={6}
			/>
			<input
				type='password'
				placeholder='Confirmar nueva contraseña'
				className={cn('w-full p-2 border rounded dark:text-gray-400')}
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				required
				minLength={6}
			/>
			{(error || localError) && (
				<div className={cn('text-red-600')}>{error?.message || localError}</div>
			)}
			<button
				type='submit'
				className={cn(
					'w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50',
				)}
				disabled={isPending}
			>
				{isPending ? 'Actualizando...' : submitButtonText}
			</button>
		</form>
	);
};
