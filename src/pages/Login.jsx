import { useState } from 'react';
import { Link } from 'wouter';
import AuthCardTitle from '../components/custom/AuthCardTitle.jsx';
import AuthProviders from '../components/custom/AuthProviders.jsx';
import { useAuthentication } from '../lib/hooks/useAuthentication';
import { cn } from '../lib/utils/utils';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { showSuccess, handleOAuth, handleLogin, errorMsg, loading } =
		useAuthentication();

	return (
		<div
			className={cn(
				'min-h-screen flex items-center justify-center bg-background px-4 py-10 sm:px-6 lg:px-8 dark:bg-neutral-900',
			)}
		>
			<div
				className={cn(
					'w-full max-w-md space-y-6 bg-card p-8 rounded-2xl shadow-lg bg-slate-300 dark:bg-neutral-800',
				)}
			>
				{/* Card Title Section */}
				<AuthCardTitle
					title='Inicia sesión en EntrenaGo'
					description='Bienvenido de nuevo, por favor inicia sesión'
				/>
				{showSuccess && (
					<div className={cn('mb-4 p-2 bg-green-100 text-green-700 rounded')}>
						¡Contraseña actualizada correctamente! Ahora puedes iniciar sesión.
					</div>
				)}

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

				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleLogin({ email, password });
					}}
					className='space-y-4'
				>
					<div>
						<label
							htmlFor='email'
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
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className={cn(
								'w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white',
							)}
						/>
					</div>

					<div>
						<div className={cn('flex justify-between items-center mb-1')}>
							<label
								htmlFor='password'
								className='text-sm text-foreground dark:text-gray-300'
							>
								Contraseña
							</label>
							<div
								href='#'
								className={cn(
									'text-xs text-primary hover:underline text-green-600 dark:text-green-400',
								)}
							>
								<Link
									href='/forgot-password'
									role='button'
									className={cn(
										'text-primary font-medium text-green-600 dark:text-green-400 hover:underline',
									)}
								>
									¿Olvidaste tu contraseña?
								</Link>
							</div>
						</div>
						<input
							id='password'
							type='password'
							autoComplete='current-password'
							placeholder='Ingresa tu contraseña'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className={cn(
								'w-full px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white',
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
						disabled={loading}
						className={cn(
							'w-full py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 transition bg-gradient-to-r from-cyan-500 to-green-400',
						)}
					>
						{loading ? 'Cargando...' : 'Iniciar sesión'}
					</button>
				</form>

				<p
					className={cn(
						'text-center text-sm text-muted-foreground dark:text-gray-300',
					)}
				>
					¿No tienes una cuenta?{' '}
					<Link
						href='/register'
						className={cn(
							'text-primary font-medium text-green-600 dark:text-green-400 hover:underline',
						)}
					>
						Crear cuenta
					</Link>
				</p>
			</div>
		</div>
	);
}
