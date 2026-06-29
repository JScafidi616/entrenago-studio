/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import sitemap from 'vite-plugin-sitemap';
import tsconfigPaths from 'vite-tsconfig-paths';

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
		tsconfigPaths(),
		tailwindcss(),
		react(),
		sitemap({
      hostname: 'https://entrenago-studio.vercel.app',
      dynamicRoutes: [
				'/',
				'/login',
				'/register',
				'/forgot-password',
			],
			generateRobotsTxt: true,
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
	resolve: {
		alias: {
			'@': path.resolve(dirname, './src'),
		},
	},
} as any);
