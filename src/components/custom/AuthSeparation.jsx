import cn from 'clsx';

const AuthSeparation = () => {
	return (
		<div
			className={cn(
				'inline-flex mb-4 items-center justify-center w-full relative',
			)}
		>
			<hr
				className={cn('w-64 h-px my-8 bg-black border-0 dark:bg-gray-300')}
			></hr>
			<span
				className={cn(
					'text-base w-40 absolute px-4 font-normal text-gray-900 -translate-x-1/2 left-1/2 dark:text-gray-300 bg-slate-300 dark:bg-neutral-800',
				)}
			>
				O con tu correo:
			</span>
		</div>
	);
};

export default AuthSeparation;
