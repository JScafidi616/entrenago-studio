import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdBox } from '@/features/adbox/components/AdBox';

import { Activity, Clock, Dumbbell, Target, Zap } from 'lucide-react';

export const MyRoutines = () => {
	const renderMyRoutines = () => (
		<div className="space-y-6 px-2 pb-24 md:space-y-8 md:pb-8">
			<div className="flex flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0">
				<h2 className="text-foreground text-xl font-bold md:text-2xl">My Routines</h2>
				<Button className="w-full bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-xl md:w-auto">
					Create New Routine
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
				{[
					{
						name: 'Push Pull Legs',
						workouts: 6,
						duration: '45-60 min',
						difficulty: 'Intermediate',
						active: true,
						category: 'strength',
						icon: Dumbbell,
					},
					{
						name: 'Full Body Beginner',
						workouts: 3,
						duration: '30-40 min',
						difficulty: 'Beginner',
						active: false,
						category: 'bodyweight',
						icon: Activity,
					},
					{
						name: 'HIIT Cardio Blast',
						workouts: 4,
						duration: '20-30 min',
						difficulty: 'Advanced',
						active: false,
						category: 'cardio',
						icon: Zap,
					},
				].map((routine, index) => (
					<Card
						key={index}
						className={`border-border/50 bg-card/50 supports-[backdrop-filter]:bg-card/50 backdrop-blur transition-all duration-200 dark:bg-neutral-800/50 dark:supports-[backdrop-filter]:bg-neutral-800/50 ${
							routine.active ? 'shadow-lg ring-2 ring-cyan-500' : ''
						} rounded-2xl`}
					>
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<routine.icon className="h-5 w-5 text-cyan-500" />
									<CardTitle className="text-foreground text-base md:text-lg">
										{routine.name}
									</CardTitle>
								</div>
								{routine.active && (
									<Badge className="bg-linear-to-r from-cyan-500 to-green-400 text-xs text-white shadow-md">
										Active
									</Badge>
								)}
							</div>
						</CardHeader>
						<CardContent className="space-y-3 md:space-y-4">
							<div className="text-muted-foreground space-y-2 text-sm">
								<div className="flex items-center">
									<Dumbbell className="mr-2 h-4 w-4" />
									{routine.workouts} workouts per week
								</div>
								<div className="flex items-center">
									<Clock className="mr-2 h-4 w-4" />
									{routine.duration}
								</div>
								<div className="flex items-center">
									<Target className="mr-2 h-4 w-4" />
									{routine.difficulty}
								</div>
							</div>
							<div className="flex space-x-2">
								<Button
									variant="outline"
									size="sm"
									className="border-border/50 hover:bg-accent flex-1 bg-transparent text-xs md:text-sm"
								>
									Edit
								</Button>
								<Button
									size="sm"
									className="flex-1 bg-linear-to-r from-cyan-500 to-green-400 text-xs text-white shadow-md transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-lg md:text-sm"
								>
									{routine.active ? 'View' : 'Activate'}
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Ad Box - My Routines, subtle placement below routine cards */}
			<AdBox variant="horizontal" label="Sponsored" />
		</div>
	);

	return (
		<>
			{/* Contenido principal centrado */}
			{renderMyRoutines()}
		</>
	);
};
