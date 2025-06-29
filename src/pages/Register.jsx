import { Link } from 'wouter';
import { useAuthentication } from '../lib/hooks/useAuthentication';
import { cn } from '../lib/utils/utils';

export default function Register() {
	const { handleOAuth, handleRegister, formData, handleChange, errorMsg } =
		useAuthentication();

	return (
		<div
			className={cn(
				'min-h-screen flex flex-col md:flex-row items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900',
			)}
		>
			{/* Panel izquierdo con EntrenaGo (solo en escritorio) */}
			<div
				className={cn(
					'hidden md:flex w-full max-w-md flex-col gap-6 p-8 text-black',
				)}
			>
				<h1 className={cn('text-3xl font-bold dark:text-gray-300')}>
					EntrenaGo
				</h1>

				<div className={cn('flex items-start gap-4')}>
					<div
						className={cn(
							'h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold flex items-center justify-center',
						)}
					>
						✓
					</div>
					<div>
						<p className={cn('font-semibold dark:text-gray-300')}>
							¡Comienza ya!
						</p>
						<p className={cn('text-sm dark:text-gray-300')}>
							Motívate para mantenerte saludable
						</p>
					</div>
				</div>

				<div className={cn('flex items-start gap-4')}>
					<div
						className={cn(
							'h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold flex items-center justify-center',
						)}
					>
						✓
					</div>
					<div>
						<p className={cn('font-semibold dark:text-gray-300')}>
							Organiza tu rutina
						</p>
						<p className={cn('text-sm dark:text-gray-300')}>
							Adiós a las hojas sueltas y al caos
						</p>
					</div>
				</div>

				<div className={cn('flex items-start gap-4 dark:text-gray-300')}>
					<div
						className={cn(
							'h-6 w-6 rounded-full bg-gradient-to-r from-cyan-500 to-green-400 text-white font-bold flex items-center justify-center',
						)}
					>
						✓
					</div>
					<div>
						<p className={cn('font-semibold dark:text-gray-300')}>
							Sigue tu progreso
						</p>
						<p className={cn('text-sm dark:text-gray-300')}>
							Lleva control de tus entrenamientos y metas
						</p>
					</div>
				</div>
			</div>

			{/* Formulario de registro */}
			<div
				className={cn(
					'w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 mt-6 md:mt-0 dark:bg-neutral-800',
				)}
			>
				<h2
					className={cn(
						'text-2xl font-bold text-center text-black dark:text-gray-300',
					)}
				>
					Bienvenido a EntrenaGo
				</h2>
				<p
					className={cn(
						'text-sm text-center text-muted-foreground dark:text-gray-300',
					)}
				>
					Create an account to continue:
				</p>

				<div className={cn('space-y-3')}>
					<button
						onClick={() => handleOAuth('google')}
						className={cn(
							'w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400',
						)}
					>
						<img
							src='https://www.svgrepo.com/show/475656/google-color.svg'
							alt='Google'
							className={cn('w-5 h-5')}
						/>
						<span className={cn('text-sm font-semibold')}>
							Registrarse con Google
						</span>
					</button>

					<button
						onClick={() => handleOAuth('facebook')}
						className={cn(
							'w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400',
						)}
					>
						<img
							src='https://www.svgrepo.com/show/452196/facebook-1.svg'
							alt='Facebook'
							className={cn('w-5 h-5')}
						/>
						<span className={cn('text-sm font-semibold')}>
							Registrarse con Facebook
						</span>
					</button>
				</div>

				<div
					className={cn(
						'inline-flex mb-4 items-center justify-center w-full relative',
					)}
				>
					<hr
						className={cn('w-64 h-px my-8 bg-black border-0 dark:bg-gray-300')}
					/>
					<span
						className={cn(
							'absolute px-3 font-medium text-gray-900 -translate-x-1/2 left-1/2 dark:text-gray-300 bg-slate-300 dark:bg-neutral-800',
						)}
					>
						O con tu correo
					</span>
				</div>

				<form onSubmit={handleRegister} className={cn('space-y-4')}>
					<div>
						<label
							className={cn(
								'block text-sm mb-1 text-foreground dark:text-gray-300',
							)}
						>
							Correo electrónico
						</label>
						<input
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							required
							className={cn(
								'w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
							)}
						/>
					</div>

					<div>
						<label
							className={cn(
								'block text-sm mb-1 text-foreground dark:text-gray-300',
							)}
						>
							Contraseña
						</label>
						<input
							type='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							required
							className={cn(
								'w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
							)}
						/>
					</div>

					<div>
						<label
							className={cn(
								'block text-sm mb-1 text-foreground dark:text-gray-300',
							)}
						>
							Confirmar contraseña
						</label>
						<input
							type='password'
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className={cn(
								'w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
							)}
						/>
					</div>

					{errorMsg && <p className={cn('text-sm text-red-500')}>{errorMsg}</p>}

					<button
						type='submit'
						className={cn(
							'w-full py-2 bg-gradient-to-r from-cyan-500 to-green-400 text-black font-semibold rounded-md hover:bg-gray-500 transition',
						)}
					>
						Crear cuenta
					</button>
				</form>

				<p
					className={cn(
						'text-center text-sm text-muted-foreground dark:text-gray-300',
					)}
				>
					¿Ya tienes cuenta?{' '}
					<Link
						href='/login'
						className={cn(
							'text-primary text-green-600 dark:text-green-400 hover:underline font-medium',
						)}
					>
						Iniciar sesión
					</Link>
				</p>
			</div>
		</div>
	);
}
