import type { Meta, StoryObj } from '@storybook/react-vite';
import '../App.css';
import AuthButtonTest from '../components/custom/AuthButtonProps';
import '../index.css';

const meta = {
	title: 'Components/Button',
	component: AuthButtonTest,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A custom button component with loading state and gradient styling.',
			},
		},
	},
	tags: ['autodocs'],
	argTypes: {
		children: {
			control: { type: 'text' },
			description: 'Button content',
		},
		loading: {
			control: { type: 'boolean' },
			description: 'Shows loading state with "Cargando..." text',
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Disables the button',
		},
		onClick: {
			description: 'Click handler function',
		},
		type: {
			control: { type: 'select' },
			options: ['button', 'submit', 'reset'],
			description: 'Button type attribute',
		},
	},
} satisfies Meta<typeof AuthButtonTest>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Default: Story = {
	args: {
		children: 'Login',
	},
};

// Loading state
export const Loading: Story = {
	args: {
		children: 'Submit',
		loading: true,
	},
};

// Disabled state
export const Disabled: Story = {
	args: {
		children: 'Disabled Button',
		disabled: true,
	},
};

// Different button types
export const Submit: Story = {
	args: {
		children: 'Submit Form',
		type: 'submit',
	},
};

// Custom container to show full width behavior
export const FullWidth: Story = {
	args: {
		children: 'Full Width Button',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px', padding: '20px' }}>
				<Story />
			</div>
		),
	],
};

// Click interaction example
export const Clickable: Story = {
	args: {
		children: 'Click to test',
		onClick: () => alert('Button clicked!'),
	},
};

// Multiple buttons in a form-like layout
export const InForm: Story = {
	args: {
		children: undefined,
	},
	render: () => (
		<div className='space-y-4 w-64'>
			<AuthButtonTest>Primary Action</AuthButtonTest>
			<AuthButtonTest loading>Loading Action</AuthButtonTest>
			<AuthButtonTest disabled>Disabled Action</AuthButtonTest>
		</div>
	),
};
