import { AnimatePresence, m } from 'motion/react';
import { createPortal } from 'react-dom';
import { PasswordForm } from '@/features/auth/components/AuthResetPassword';

interface Props {
	open: boolean;
	onClose: () => void;
}

export function ChangePasswordModal({ open, onClose }: Props) {
	if (typeof document === 'undefined') return null;

	return createPortal(
		<AnimatePresence>
			{open && (
				<m.div
					className='fixed inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-gray-800/30'
					initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
					animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
					exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
					transition={{ duration: 0.25 }}
					onClick={onClose}
				>
					<m.div
						className='w-full max-w-md rounded-2xl border bg-white dark:bg-neutral-800 p-6 shadow-xl mx-4'
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className='mb-6'>
							<div className='flex items-start justify-between gap-4'>
								<h2 className='text-2xl font-bold text-foreground text-balance'>
									Restablecer contraseña
								</h2>

								<button
									onClick={() => onClose()}
									className='cursor-pointer text-2xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
									aria-label='Cerrar'
								>
									&times;
								</button>
							</div>

							<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
								Crea una nueva contraseña segura para tu cuenta.
							</p>
						</div>
						<PasswordForm
							shouldSignOut={false}
							onSuccess={() => {
								// TODO show a toast notification here

								alert('Password updated successfully!');
								onClose();
							}}
							submitButtonText='Update Password'
						/>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
