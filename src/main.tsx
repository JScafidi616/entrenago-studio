// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { App } from '@/App';
import { AuthProvider } from '@/context/AuthContext.tsx';
import '@/styles/global.css';
import { LazyMotion, domMax } from 'motion/react';
import { queryClient } from '@/shared/lib/queryClient'; // Adjust path

import { SpeedInsights } from '@vercel/speed-insights/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<LazyMotion features={domMax}>
					<App />
					<SpeedInsights />
				</LazyMotion>
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
);
