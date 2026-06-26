// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from '@/App';
import { AuthProvider } from '@/context/AuthContext.tsx';
import '@/styles/global.css';
import { LazyMotion, domMax } from 'motion/react';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Crear una instancia del cliente de React Query
const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 1000 * 60 * 5, retry: 1 },
	},
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<LazyMotion features={domMax}>
					<App />
				</LazyMotion>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
);
