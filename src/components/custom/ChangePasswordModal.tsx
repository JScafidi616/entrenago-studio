import { AnimatePresence, m } from 'motion/react';
import { createPortal } from 'react-dom';
import { PasswordForm } from '@/features/auth/components/AuthResetPassword';
import { toast } from 'sonner';

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
					className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-gray-800/30"
					initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
					animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
					exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
					transition={{ duration: 0.25 }}
					onClick={onClose}
				>
					<m.div
						className="mx-4 w-full max-w-md rounded-2xl border bg-white p-6 shadow-xl dark:bg-neutral-800"
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="mb-6">
							<div className="flex items-start justify-between gap-4">
								<h2 className="text-foreground text-2xl font-bold text-balance">
									Restablecer contraseña
								</h2>

								<button
									onClick={() => onClose()}
									className="text-2xl leading-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
									aria-label="Cerrar"
								>
									&times;
								</button>
							</div>

							<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
								Crea una nueva contraseña segura para tu cuenta.
							</p>
						</div>
						<PasswordForm
							shouldSignOut={false}
							onSuccess={() => {
								toast.success('Contraseña restablecida', {
									description: 'Contraseña se completó con éxito.',
								});
								onClose();
							}}
							onError={() => {
								toast.error('Contraseña no restablecida', {
									description: 'Contacte a soporte',
								});
							}}
							submitButtonText="Restablecer contraseña"
						/>
					</m.div>
				</m.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
