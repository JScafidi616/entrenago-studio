import { supabase } from '../supabase/client';

export default function Login() {
	const login = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) alert(error.message);
		else alert('Login exitoso');
	};

	const loginWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({ provider: 'google' });
	};

	return (
		<div className='p-4'>
			<h1 className='text-xl mb-4'>Login</h1>
			<form onSubmit={login} className='flex flex-col gap-3'>
				<input
					name='email'
					type='email'
					placeholder='Email'
					className='p-2 border'
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					className='p-2 border'
				/>
				<button className='bg-blue-500 text-white p-2 rounded'>Login</button>
			</form>
			<button
				onClick={loginWithGoogle}
				className='mt-4 p-2 bg-red-500 text-white rounded'
			>
				Login con Google
			</button>
		</div>
	);
}
