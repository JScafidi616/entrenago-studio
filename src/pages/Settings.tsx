'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/features/darkMode/components/ThemeToggle';
import { Bell, Mail, Volume2, Globe, Ruler, Lock, Trash2, Palette } from 'lucide-react';
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
		<div className="space-y-6">
			{/* Appearance */}
			<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
				<CardHeader>
					<CardTitle className="text-foreground flex items-center gap-2 text-lg">
						<Palette className="h-5 w-5 text-cyan-500" />
						Appearance
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="bg-muted/30 border-border/30 flex items-center justify-between rounded-2xl border p-3 dark:bg-neutral-800/30">
						<div className="space-y-0.5">
							<p className="text-foreground text-sm font-medium">Theme</p>
							<p className="text-muted-foreground text-xs">Switch between light and dark mode</p>
						</div>
						<div className="bg-background/50 rounded-full p-1 dark:bg-neutral-700/30">
							<ThemeToggle />
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Notifications */}
			<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
				<CardHeader>
					<CardTitle className="text-foreground flex items-center gap-2 text-lg">
						<Bell className="h-5 w-5 text-cyan-500" />
						Notifications
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{notificationSettings.map((setting) => (
						<div
							key={setting.id}
							className="bg-muted/30 border-border/30 flex items-center justify-between rounded-2xl border p-3 dark:bg-neutral-800/30"
						>
							<div className="flex items-center gap-3">
								<div className="bg-background/50 rounded-full p-2 dark:bg-neutral-700/30">
									<setting.icon className="text-muted-foreground h-4 w-4" />
								</div>
								<div className="space-y-0.5">
									<Label
										htmlFor={setting.id}
										className="text-foreground cursor-pointer text-sm font-medium"
									>
										{setting.label}
									</Label>
									<p className="text-muted-foreground text-xs">{setting.description}</p>
								</div>
							</div>
							<Switch
								id={setting.id}
								checked={toggles[setting.id]}
								onCheckedChange={(v) => setToggle(setting.id, v)}
								className="data-[state=checked]:bg-cyan-500"
							/>
						</div>
					))}
				</CardContent>
			</Card>

			{/* Preferences */}
			<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
				<CardHeader>
					<CardTitle className="text-foreground flex items-center gap-2 text-lg">
						<Globe className="h-5 w-5 text-cyan-500" />
						Preferences
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="bg-muted/30 border-border/30 flex items-center justify-between rounded-2xl border p-3 dark:bg-neutral-800/30">
						<div className="flex items-center gap-3">
							<div className="bg-background/50 rounded-full p-2 dark:bg-neutral-700/30">
								<Ruler className="text-muted-foreground h-4 w-4" />
							</div>
							<div className="space-y-0.5">
								<p className="text-foreground cursor-pointer text-sm font-medium">Units</p>
								<p className="text-muted-foreground text-xs">Metric (kg, cm)</p>
							</div>
						</div>
						<Button variant="outline" size="sm" className="border-border/50 rounded-2xl">
							Change
						</Button>
					</div>
					<div className="bg-muted/30 border-border/30 flex items-center justify-between rounded-2xl border p-3 dark:bg-neutral-800/30">
						<div className="flex items-center gap-3">
							<div className="bg-background/50 rounded-full p-2 dark:bg-neutral-700/30">
								<Globe className="text-muted-foreground h-4 w-4" />
							</div>
							<div className="space-y-0.5">
								<p className="text-foreground cursor-pointer text-sm font-medium">Language</p>
								<p className="text-muted-foreground text-xs">English (US)</p>
							</div>
						</div>
						<Button variant="outline" size="sm" className="border-border/50 rounded-2xl">
							Change
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Account & Security */}
			<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl shadow-sm backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
				<CardHeader>
					<CardTitle className="text-foreground flex items-center gap-2 text-lg">
						<Lock className="h-5 w-5 text-cyan-500" />
						Account &amp; Security
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<Button
						variant="outline"
						className="border-border/50 bg-muted/30 hover:bg-muted/50 w-full justify-start rounded-2xl dark:bg-neutral-800/30"
						onClick={() => setIsPasswordModalOpen(true)} // Open modal
					>
						<Lock className="text-muted-foreground mr-2 h-4 w-4" />
						Change Password
					</Button>

					<Separator className="bg-border/50" />
					{/* Delete Account */}
					<div className="rounded-2xl border border-red-500/30 bg-red-50/50 p-4 dark:bg-red-950/20">
						<div className="flex items-center justify-between gap-4">
							<div className="space-y-0.5">
								<p className="text-sm font-medium text-red-600 dark:text-red-400">Delete Account</p>
								<p className="text-muted-foreground text-xs">
									Permanently remove your account and data
								</p>
							</div>
							<Button
								variant="destructive"
								size="sm"
								className="shrink-0 rounded-2xl bg-red-600 text-white hover:bg-red-700"
							>
								<Trash2 className="mr-2 h-4 w-4" />
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
