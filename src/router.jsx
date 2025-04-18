// src/router.jsx
import {
	createRootRouteWithContext,
	createRoute,
	createRouter,
	Outlet,
} from '@tanstack/react-router';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Ruta raíz con contexto
const RootRoute = createRootRouteWithContext()({
	component: () => (
		<AuthProvider>
			<Outlet />
		</AuthProvider>
	),
});

// Rutas hijas
const loginRoute = createRoute({
	getParentRoute: () => RootRoute,
	path: '/login',
	component: Login,
});

const dashboardRoute = createRoute({
	getParentRoute: () => RootRoute,
	path: '/dashboard',
	component: Dashboard,
});

const registerRoute = createRoute({
	getParentRoute: () => RootRoute,
	path: '/register',
	component: Register,
});

// Crear router con el árbol de rutas
export const router = createRouter({
	routeTree: RootRoute.addChildren([loginRoute, dashboardRoute, registerRoute]),
});
