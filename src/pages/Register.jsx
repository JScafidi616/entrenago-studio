import { Link } from 'wouter';
import AuthCardTitle from '../components/custom/AuthCardTitle.jsx';
import AuthProviders from '../components/custom/AuthProviders.jsx';
import AuthSeparation from '../components/custom/AuthSeparation.jsx';
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
			{/* Left Panel - EntrenaGo (Desktop Only) */}
			<div
				className={cn(
					'hidden md:flex w-full max-w-md flex-col gap-6 p-8 text-black',
				)}
			>
				<h1 className={cn('text-2xl font-bold text-black dark:text-gray-300')}>
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

			{/* Right Panel - Sign Up form */}
			<div
				className={cn(
					'w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 mt-6 md:mt-0 dark:bg-neutral-800',
				)}
			>
				{/* Card Title Section */}
				<AuthCardTitle
					title='Bienvenido a EntrenaGo'
					description='Crea una cuenta para continuar:'
				/>

				{/* Provider Auth Section */}
				<div className='space-y-3'>
					<AuthProviders
						providerName='Google'
						providerDescription='Registrarse con Google'
						providerImage='/icons/google_icon_socials.svg'
						authClick={() => handleOAuth('google')}
					/>
					<AuthProviders
						providerName='Facebook'
						providerDescription='Registrarse con Facebook'
						providerImage='/icons/facebook_icon_socials.svg'
						facebAuthClick={() => handleOAuth('facebook')}
					/>
				</div>
				<AuthSeparation />

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
							id='email'
							type='email'
							name='email'
							autoComplete='email'
							placeholder='Ingresa tu correo electrónico'
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
							id='password'
							type='password'
							name='password'
							autoComplete='current-password'
							placeholder='Ingresa tu contraseña'
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
							id='confirmPassword'
							type='password'
							name='confirmPassword'
							autoComplete='current-password'
							placeholder='Re-ingresa tu contraseña'
							value={formData.confirmPassword}
							onChange={handleChange}
							required
							className={cn(
								'w-full px-4 py-2 bg-white border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary',
							)}
						/>
					</div>

					{errorMsg && (
						<p className={cn('text-sm text-destructive text-red-500')}>
							{errorMsg}
						</p>
					)}

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
