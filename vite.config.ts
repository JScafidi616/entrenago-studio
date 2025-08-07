import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { robotsTxtPlugin } from './vite-plugin-robots.ts';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		tailwindcss(),
		react(),
		tsconfigPaths(),
		robotsTxtPlugin({
			siteURL: 'https://entrenago-studio.vercel.app', // Production URL
			devURL: 'http://localhost:5173', // Custom dev URL
		}),
	],
});
