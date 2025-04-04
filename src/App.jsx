import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/login' element={<Login />} />
				<Route path='/dashboard' element={<Dashboard />} />
				<Route path='/register' element={<Register />} />
				<Route
					path='*'
					element={
						<div className='text-center mt-20 text-xl'>
							Página no encontrada
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}
