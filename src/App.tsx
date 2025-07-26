// src/App.jsx
import { AuthContext } from '@/context/AuthContext.tsx';
import useDarkMode from '@/lib/hooks/useDarkMode.ts';
import { cn } from '@/lib/utils/utils.ts';
import Dashboard from '@/pages/Dashboard.tsx';
import ForgotPassword from '@/pages/ForgotPassword.tsx';
import Login from '@/pages/Login.tsx';
import Register from '@/pages/Register.tsx';
import ResetPassword from '@/pages/ResetPassword.tsx';
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'wouter';

function App() {
	const [isDark, toggleDark] = useDarkMode();
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('AuthContext is not provided');
	}

	const { user, loading } = auth;

	//Todo Generar un loading mas estilizado y con animaciones
	if (loading) return <div>Cargando...</div>;

	return (
		<>
			{/* Botón de tema fijo arriba a la derecha */}
			<button
				type='button'
				className='fixed top-4 right-4 px-3 py-2 rounded border dark:border-gray-700 border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white shadow transition-colors z-50'
				onClick={toggleDark}
				aria-label='Cambiar tema'
			>
				{isDark ? '☀️ Light' : '🌙 Dark'}
			</button>

			<Switch>
				{/* ... Las rutas */}
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Route path='/forgot-password' component={ForgotPassword} />
				<Route path='/reset-password' component={ResetPassword} />
				<Route path='/dashboard'>
					{user ? <Dashboard /> : <Redirect to='/login' />}
				</Route>
				<Route path='/'>
					{user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
				</Route>
				<Route>
					<div className={cn('p-4 text-center')}>
						404 - Página no encontrada
					</div>
				</Route>
			</Switch>
		</>
	);
}

export default App;
