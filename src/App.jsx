// src/App.jsx
import { useContext } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import { AuthContext } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	const { user, loading } = useContext(AuthContext);

	if (loading) return <div>Cargando...</div>;

	return (
		<Switch>
			{/* Rutas públicas */}
			<Route path='/login' component={Login} />
			<Route path='/register' component={Register} />
			<Route path='/forgot-password' component={ForgotPassword} />

			{/* Ruta protegida: dashboard */}
			<Route path='/dashboard'>
				{user ? <Dashboard /> : <Redirect to='/login' />}
			</Route>
			<Route path='/'>
				{user ? <Redirect to='/dashboard' /> : <Redirect to='/login' />}
			</Route>

			{/* Ruta fallback */}
			<Route>
				<div className='p-4 text-center'>404 - Página no encontrada</div>
			</Route>
		</Switch>
	);
}

export default App;
