import { withThemeByClassName } from '@storybook/addon-themes';
import type { Decorator, Preview } from '@storybook/react-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { Router } from 'wouter';
import '../App.css';
import '../index.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: Infinity,
		},
	},
});

const decorators: Decorator[] = [
	withThemeByClassName({
		themes: {
			light: 'light',
			dark: 'dark',
		},
		defaultTheme: 'light',
	}),
	(Story) =>
		React.createElement(
			QueryClientProvider,
			{ client: queryClient },
			React.createElement(Router, null, React.createElement(Story)),
		),
];

const preview: Preview = {
	decorators,
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	tags: ['autodocs'],
};

export default preview;
