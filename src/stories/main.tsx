import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import '../index.css';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-docs',
	],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
	docs: {
		//👇 See the table below for the list of supported options
		defaultName: 'Documentation',
	},
	typescript: {
		check: false,
		reactDocgen: 'react-docgen-typescript',
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
		},
	},
	viteFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'@': path.resolve(__dirname, '../src'),
			};
		}
		return config;
	},
};

export default config;
