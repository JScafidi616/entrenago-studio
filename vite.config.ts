/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { robotsTxtPlugin } from './vite-plugin-robots.ts';

// https://vite.dev/config/
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
		tsconfigPaths(),
		robotsTxtPlugin({
			siteURL: 'https://entrenago-studio.vercel.app',
			// Production URL
			devURL: 'http://localhost:5173', // Custom dev URL
		}),
	],
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.join(dirname, '.storybook'),
					}),
				],
				test: {
					name: 'storybook',
					browser: {
						enabled: true,
						headless: true,
						provider: 'playwright',
						instances: [
							{
								browser: 'chromium',
							},
						],
					},
					setupFiles: ['.storybook/vitest.setup.ts'],
				},
			},
		],
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					// React core
					'react-vendor': ['react', 'react-dom'],

					// Routing
					router: ['wouter'],

					// UI components - Radix UI - biggest chunk
					'radix-ui': [
						'@radix-ui/react-avatar',
						'@radix-ui/react-dialog',
						'@radix-ui/react-dropdown-menu',
						'@radix-ui/react-slot',
					],

					// Animation library - motion can be large
					motion: ['motion'],

					// Icons - Can be heavy
					icons: ['lucide-react', 'react-icons'],

					// Data fetching
					query: ['@tanstack/react-query', '@tanstack/react-query-devtools'],

					// Supabase
					supabase: ['@supabase/supabase-js'],
				},
			},
		},

		// Optionally increase the limit if needed after chunking
		chunkSizeWarningLimit: 600,
	},
});
