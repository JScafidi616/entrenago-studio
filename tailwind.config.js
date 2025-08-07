const animate = require('tailwindcss-animate');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				zoomFadeIn: 'zoomFadeIn 0.3s ease-out forwards',
			},
			keyframes: {
				zoomFadeIn: {
					'0%': { opacity: 0, transform: 'scale(0.95)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
			},
		},
	},
	plugins: [animate],
	darkMode: 'class',
};
