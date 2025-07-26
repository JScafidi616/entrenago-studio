// src/main.jsx
import App from '@/App';
import { AuthProvider } from '@/context/AuthContext.tsx';
import '@/index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Crear una instancia del cliente de React Query
const queryClient = new QueryClient();
const container = document.getElementById('root')!; // Aquí el "non-null assertion"
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<App />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
);
