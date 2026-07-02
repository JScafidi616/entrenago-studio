'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/features/darkMode/components/ThemeToggle';
import {
	Bell,
	Mail,
	Volume2,
	Globe,
	Ruler,
	Lock,
	Trash2,
	Palette,
} from 'lucide-react';
import { ChangePasswordModal } from '../components/custom/ChangePasswordModal';

interface ToggleSetting {
	id: string;
	label: string;
	description: string;
	icon: typeof Bell;
	defaultOn: boolean;
}

const notificationSettings: ToggleSetting[] = [
	{
		id: 'push',
		label: 'Push Notifications',
		description: 'Workout reminders and streak alerts',
		icon: Bell,
		defaultOn: true,
	},
	{
		id: 'email',
		label: 'Email Updates',
		description: 'Weekly progress summaries',
		icon: Mail,
		defaultOn: false,
	},
	{
		id: 'sound',
		label: 'Sound Effects',
		description: 'Play sounds during workouts',
		icon: Volume2,
		defaultOn: true,
	},
];

export const Settings = () => {
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
	const [toggles, setToggles] = useState<Record<string, boolean>>(
		Object.fromEntries(notificationSettings.map((s) => [s.id, s.defaultOn])),
	);

	const setToggle = (id: string, value: boolean) => {
		setToggles((prev) => ({ ...prev, [id]: value }));
	};

	return (
		<div className='space-y-6'>
			{/* Appearance */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-foreground text-lg'>
						<Palette className='h-5 w-5 text-cyan-500' />
						Appearance
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='flex items-center justify-between p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30'>
						<div className='space-y-0.5'>
							<p className='font-medium text-foreground text-sm'>Theme</p>
							<p className='text-xs text-muted-foreground'>
								Switch between light and dark mode
							</p>
						</div>
						<div className='p-1 rounded-full bg-background/50 dark:bg-neutral-700/30'>
							<ThemeToggle />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Notifications */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-foreground text-lg'>
						<Bell className='h-5 w-5 text-cyan-500' />
						Notifications
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3'>
					{notificationSettings.map((setting) => (
						<div
							key={setting.id}
							className='flex items-center justify-between p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30'
						>
							<div className='flex items-center gap-3'>
								<div className='p-2 rounded-full bg-background/50 dark:bg-neutral-700/30'>
									<setting.icon className='h-4 w-4 text-muted-foreground' />
								</div>
								<div className='space-y-0.5'>
									<Label
										htmlFor={setting.id}
										className='font-medium text-foreground text-sm cursor-pointer'
									>
										{setting.label}
									</Label>
									<p className='text-xs text-muted-foreground'>
										{setting.description}
									</p>
								</div>
							</div>
							<Switch
								id={setting.id}
								checked={toggles[setting.id]}
								onCheckedChange={(v) => setToggle(setting.id, v)}
								className='data-[state=checked]:bg-cyan-500'
							/>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Preferences */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-foreground text-lg'>
						<Globe className='h-5 w-5 text-cyan-500' />
						Preferences
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3'>
					<div className='flex items-center justify-between p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30'>
						<div className='flex items-center gap-3 '>
							<div className='p-2 rounded-full bg-background/50 dark:bg-neutral-700/30'>
								<Ruler className='h-4 w-4 text-muted-foreground' />
							</div>
							<div className='space-y-0.5'>
								<p className='font-medium text-foreground text-sm cursor-pointer'>
									Units
								</p>
								<p className='text-xs text-muted-foreground'>Metric (kg, cm)</p>
							</div>
						</div>
						<Button
							variant='outline'
							size='sm'
							className='rounded-2xl border-border/50  cursor-pointer'
						>
							Change
						</Button>
					</div>
					<div className='flex items-center justify-between p-3 bg-muted/30 dark:bg-neutral-800/30 rounded-2xl border border-border/30'>
						<div className='flex items-center gap-3'>
							<div className='p-2 rounded-full bg-background/50 dark:bg-neutral-700/30'>
								<Globe className='h-4 w-4 text-muted-foreground' />
							</div>
							<div className='space-y-0.5 '>
								<p className='font-medium text-foreground text-sm cursor-pointer'>
									Language
								</p>
								<p className='text-xs text-muted-foreground'>English (US)</p>
							</div>
						</div>
						<Button
							variant='outline'
							size='sm'
							className='rounded-2xl border-border/50  cursor-pointer'
						>
							Change
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Account & Security */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm'>
				<CardHeader>
					<CardTitle className='flex items-center gap-2 text-foreground text-lg'>
						<Lock className='h-5 w-5 text-cyan-500' />
						Account &amp; Security
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-3'>
					<Button
						variant='outline'
						className='w-full justify-start rounded-2xl border-border/50 bg-muted/30 dark:bg-neutral-800/30 hover:bg-muted/50 cursor-pointer'
						onClick={() => setIsPasswordModalOpen(true)} // Open modal
					>
						<Lock className='h-4 w-4 mr-2 text-muted-foreground' />
						Change Password
					</Button>

					<Separator className='bg-border/50' />
					{/* Delete Account */}
					<div className='rounded-2xl border border-red-500/30 bg-red-50/50 dark:bg-red-950/20 p-4'>
						<div className='flex items-center justify-between gap-4'>
							<div className='space-y-0.5'>
								<p className='font-medium text-red-600 dark:text-red-400 text-sm'>
									Delete Account
								</p>
								<p className='text-xs text-muted-foreground'>
									Permanently remove your account and data
								</p>
							</div>
							<Button
								variant='destructive'
								size='sm'
								className='rounded-2xl shrink-0 bg-red-600 hover:bg-red-700 text-white cursor-pointer'
							>
								<Trash2 className='h-4 w-4 mr-2' />
								Delete
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Change Password Modal */}
			{/* Case 2: Settings Flow (Does NOT sign out) */}
			<ChangePasswordModal
				open={isPasswordModalOpen}
				onClose={() => setIsPasswordModalOpen(false)}
			/>
		</div>
	);
};
