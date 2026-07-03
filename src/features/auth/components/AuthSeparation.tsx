import cn from 'clsx';

const AuthSeparation = () => {
	return (
		<div className={cn('relative mb-3 inline-flex w-full items-center justify-center')}>
			<hr className={cn('my-8 h-px w-64 border-0 bg-black dark:bg-gray-300')}></hr>
			<span
				className={cn(
					'absolute left-1/2 w-40 -translate-x-1/2 bg-slate-300 px-4 text-base font-normal text-gray-900 dark:bg-neutral-800 dark:text-gray-300',
				)}
			>
				O con tu correo:
			</span>
		</div>
	);
};

export default AuthSeparation;
