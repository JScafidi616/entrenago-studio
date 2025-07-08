// src/App.jsx
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import { AuthContext } from './context/AuthContext.tsx';
import { cn } from './lib/utils/utils.ts';
import Dashboard from './pages/Dashboard.tsx';
import ForgotPassword from './pages/ForgotPassword.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import ResetPassword from './pages/ResetPassword.tsx';

function App() {
	const auth = useContext(AuthContext);
	if (!auth) {
		throw new Error('AuthContext is not provided');
	}

	const { user, loading } = auth;

	//Todo Generar un loading mas estilizado y con animaciones
	if (loading) return <div>Cargando...</div>;

	return (
		<Switch>
			{/* Rutas públicas */}
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/forgot-password' component={ForgotPassword} />
			<Route path='/reset-password' component={ResetPassword} />
			{/* Ruta protegida: dashboard */}
			<Route path='/dashboard'>
				{user ? <Dashboard /> : <Redirect to='/login' />}
			</Route>
			<Route path='/'>
				{user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
			</Route>
			//todo generar un 404 page mas agraciado
			{/* Ruta fallback */}
			<Route>
				<div className={cn('p-4 text-center')}>404 - Página no encontrada</div>
			</Route>
		</Switch>
	);
}

export default App;
