'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Flame, Dumbbell, Trophy, Calendar } from 'lucide-react';
import { useUpdateProfile } from '@/features/auth/hooks/useUpdateProfile';

import { useAuth } from '@/context/AuthContext';

const profileStats = [
	{
		label: 'Day Streak',
		value: '12',
		icon: Flame,
		color: 'text-orange-500',
		bg: 'bg-orange-100 dark:bg-orange-900/30',
	},
	{
		label: 'Workouts',
		value: '148',
		icon: Dumbbell,
		color: 'text-cyan-500',
		bg: 'bg-cyan-100 dark:bg-cyan-900/30',
	},
	{
		label: 'PRs Set',
		value: '23',
		icon: Trophy,
		color: 'text-green-500',
		bg: 'bg-green-100 dark:bg-green-900/30',
	},
];

export const Profile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const { user, profile } = useAuth();
	const { updateProfile, isLoading, error } = useUpdateProfile();

	// Initialize with empty strings
	const [form, setForm] = useState({
		name: '',
		goal: '',
		email: '',
	});

	// Sync profile data to form state when it loads/updates
	useEffect(() => {
		if (profile) {
			setForm({
				name: profile.full_name || '',
				goal: profile.goal || '',
				email: profile.email || user?.email || '',
			});
		}
	}, [profile, user]);

	const getInitials = (): string => {
		const name = form.name || user?.user_metadata?.full_name;
		if (name) {
			const names = name.trim().split(' ');
			return names.length > 1
				? (names[0][0] + names[names.length - 1][0]).toUpperCase()
				: names[0].substring(0, 2).toUpperCase();
		}
		return user?.email?.substring(0, 2).toUpperCase() || '??';
	};

	const handleChange = (key: keyof typeof form, value: string) => {
		setForm((prev) => ({ ...prev, [key]: value }));
	};

	// Use the `form` state directly instead of FormData
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Call the hook with the mapped data
		await updateProfile({
			full_name: form.name,
			goal: form.goal,
			email: form.email,
		});

		// Exit edit mode after successful save
		setIsEditing(false);
	};

	return (
		<div className='space-y-6'>
			{/* Identity Card */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm'>
				<CardContent className='p-6'>
					<div className='flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6'>
						<div className='relative'>
							<Avatar className='h-24 w-24 ring-4 ring-cyan-500/30'>
								<AvatarImage src='/diverse-user-avatars.png' alt='Profile' />
								<AvatarFallback className='bg-linear-to-r from-cyan-500 to-green-400 text-white text-2xl font-semibold'>
									{getInitials()}
								</AvatarFallback>
							</Avatar>
							<button
								className='absolute -bottom-1 -right-1 p-2 rounded-full bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-md hover:shadow-lg transition-shadow'
								aria-label='Change profile photo'
							>
								<Camera className='h-4 w-4' />
							</button>
						</div>

						<div className='flex flex-col items-center sm:items-start gap-2 text-center sm:text-left'>
							<h2 className='text-2xl font-bold text-foreground'>
								{form.name}
							</h2>
							<p className='text-sm text-muted-foreground'>{form.email}</p>
							<div className='flex flex-wrap items-center justify-center gap-2 sm:justify-start'>
								<Badge className='bg-linear-to-r from-cyan-500 to-green-400 text-white border-0'>
									{form.goal}
								</Badge>
								<Badge
									variant='secondary'
									className='bg-secondary/80 text-secondary-foreground'
								>
									<Calendar className='h-3 w-3 mr-1' />
									Member since 2024
								</Badge>
							</div>
						</div>

						<div className='sm:ml-auto'>
							<Button
								type='button' // ALWAYS type="button" to prevent accidental form submission
								onClick={() => {
									if (isEditing) {
										// If already editing, manually trigger the form submission
										(
											document.getElementById('profile-form') as HTMLFormElement
										)?.requestSubmit();
									} else {
										// Otherwise, just enter edit mode
										setIsEditing(true);
									}
								}}
								disabled={isLoading}
								variant={isEditing ? 'default' : 'outline'}
								className={
									isEditing
										? 'bg-linear-to-r from-cyan-500 to-green-400 hover:from-cyan-600 hover:to-green-500 text-white border-0 rounded-2xl'
										: 'rounded-2xl border-border/50'
								}
							>
								{isLoading
									? 'Saving...'
									: isEditing
										? 'Save Changes'
										: 'Edit Profile'}
							</Button>
							{error && <p className='text-red-500 text-sm'>{error}</p>}
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Stats */}
			<div className='grid grid-cols-3 gap-4'>
				{profileStats.map((stat) => (
					<Card
						key={stat.label}
						className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200'
					>
						<CardContent className='p-4 flex flex-col items-center gap-2 text-center'>
							<div className={`p-2 rounded-full ${stat.bg}`}>
								<stat.icon className={`h-5 w-5 ${stat.color}`} />
							</div>
							<p className='text-xl md:text-2xl font-bold text-foreground'>
								{stat.value}
							</p>
							<p className='text-xs text-muted-foreground'>{stat.label}</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Personal Details */}
			<Card className='border-border/50 bg-card/50 dark:bg-neutral-800/50 backdrop-blur supports-backdrop-filter:bg-card/50 dark:supports-backdrop-filter:bg-neutral-800/50 rounded-2xl shadow-sm'>
				<CardHeader>
					<CardTitle className='text-foreground text-lg'>
						Personal Details
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-5'>
					<form id='profile-form' onSubmit={handleSubmit} className='space-y-5'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							{/* Input - Name */}
							<div className='space-y-2'>
								<Label htmlFor='name' className='text-foreground'>
									Full Name
								</Label>
								<Input
									id='name'
									value={form.name}
									placeholder='Full Name'
									disabled={!isEditing}
									onChange={(e) => handleChange('name', e.target.value)}
									className='rounded-2xl bg-muted/30 dark:bg-neutral-800/30 border-border/50 disabled:opacity-70'
								/>
							</div>
							{/* Input - Email */}
							<div className='space-y-2'>
								<Label htmlFor='email' className='text-foreground'>
									Email
								</Label>
								<Input
									id='email'
									type='email'
									value={form.email}
									disabled={!isEditing}
									onChange={(e) => handleChange('email', e.target.value)}
									className='rounded-2xl bg-muted/30 dark:bg-neutral-800/30 border-border/50 disabled:opacity-70'
								/>
							</div>
							{/* Input - weight */}
							<div className='space-y-2'>
								<Label htmlFor='weight' className='text-foreground'>
									Weight (kg)
								</Label>
								<Input
									id='weight'
									type='number'
									// value={form.weight}
									disabled={!isEditing}
									// onChange={(e) => handleChange('weight', e.target.value)}
									className='rounded-2xl bg-muted/30 dark:bg-neutral-800/30 border-border/50 disabled:opacity-70'
								/>
							</div>
							{/* Input - height */}
							<div className='space-y-2'>
								<Label htmlFor='height' className='text-foreground'>
									Height (cm)
								</Label>
								<Input
									id='height'
									type='number'
									// value={form.height}
									disabled={!isEditing}
									// onChange={(e) => handleChange('height', e.target.value)}
									className='rounded-2xl bg-muted/30 dark:bg-neutral-800/30 border-border/50 disabled:opacity-70'
								/>
							</div>
						</div>
						{/* Text Area - bio */}
						<div className='space-y-2'>
							<Label htmlFor='bio' className='text-foreground'>
								Bio
							</Label>
							<Textarea
								id='bio'
								// value={form.bio}
								disabled={!isEditing}
								// onChange={(e) => handleChange('bio', e.target.value)}
								rows={3}
								className='rounded-2xl bg-muted/30 dark:bg-neutral-800/30 border-border/50 disabled:opacity-70 resize-none'
							/>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
