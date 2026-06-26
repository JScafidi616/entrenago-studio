/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
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
	resolve:{
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		react(),
		robotsTxtPlugin({
			siteURL: 'https://entrenago-studio.vercel.app',
			// Production URL
			devURL: 'http://localhost:5173', // Custom dev URL
		}),
	],
	test: {
		// Vite 8 architecture isolation: Disable cross-project dependency reloads
		isolate: false, 
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
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
				manualChunks(id: string) {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				},
			},
		},

		// Optionally increase the limit if needed after chunking
		chunkSizeWarningLimit: 1000,
	},
} as any);
