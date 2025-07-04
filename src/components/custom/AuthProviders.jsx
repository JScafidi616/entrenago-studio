import cn from 'clsx';

const AuthProviders = ({
	googleProvider,
	facebookProvider,
	googleAuthClick,
	facebAuthClick,
}) => {
	return (
		<div className='space-y-3'>
			<button
				onClick={googleAuthClick}
				className={cn(
					'w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400',
				)}
			>
				<img
					src='/icons/google_icon_socials.svg'
					alt='Google'
					className='w-5 h-5'
				/>
				<span className={cn('text-sm font-semibold')}>{googleProvider}</span>
			</button>

			<button
				onClick={facebAuthClick}
				className={cn(
					'w-full flex items-center justify-center gap-2 py-2 px-4 border border-border rounded-lg hover:bg-muted/80 transition bg-gradient-to-r from-cyan-500 to-green-400',
				)}
			>
				<img
					src='/icons/facebook_icon_socials.svg'
					alt='Facebook'
					className='w-5 h-5'
				/>
				<span className={cn('text-sm font-semibold')}>{facebookProvider}</span>
			</button>
		</div>
	);
};

export default AuthProviders;
