import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const checkSession = async () => {
			const { data, error } = await supabase.auth.getSession();
			const session = data.session;

			if (!session) {
				navigate('/login');
			} else {
				setUser(session.user);
			}

			if (error) {
				console.error('Error al obtener la sesión:', error.message);
			}
		};

		checkSession();
	}, [navigate]);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate('/login');
	};

	return (
		<div className='p-4 text-center'>
			<h1 className='text-2xl font-bold'>Bienvenido al Dashboard 🏋️‍♂️</h1>
			{user && (
				<p>
					Sesión activa como: <strong>{user.email}</strong>
				</p>
			)}
			<button
				onClick={handleLogout}
				className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
			>
				Cerrar sesión
			</button>
		</div>
	);
}
