import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress.tsx';
import { AdBox } from '@/features/adbox/components/AdBox';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const ProgressTracking = () => {
	// componnent placeholder
	const renderProgress = () => (
		<div className="space-y-6 px-2 pb-24 md:space-y-8 md:pb-8">
			<div className="flex flex-col justify-between space-y-3 md:flex-row md:items-center md:space-y-0">
				<h2 className="text-foreground text-xl font-bold md:text-2xl">Progress Tracking</h2>
				<Button className="w-full bg-linear-to-r from-cyan-500 to-green-400 text-white shadow-lg transition-all duration-200 hover:from-cyan-600 hover:to-green-500 hover:shadow-xl md:w-auto">
					View Detailed Stats
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
				<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-foreground text-lg">Monthly Overview</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3 md:space-y-4">
							<div className="text-foreground flex justify-between">
								<span className="text-sm md:text-base">Workouts Completed</span>
								<span className="text-sm font-bold md:text-base">18/24</span>
							</div>
							<Progress
								value={75}
								className="h-2 md:h-2"
								aria-label="Workout completion"
								aria-labelledby="workout-progress"
							/>
							<p className="text-muted-foreground text-xs md:text-sm">
								75% completion rate this month
							</p>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-foreground text-lg">Strength Progress</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2 md:space-y-3">
							<div className="flex justify-between">
								<span className="text-foreground text-sm">Bench Press</span>
								<span className="text-sm font-semibold text-green-600 dark:text-green-400">
									+15 lbs
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-foreground text-sm">Squat</span>
								<span className="text-sm font-semibold text-green-600 dark:text-green-400">
									+25 lbs
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-foreground text-sm">Deadlift</span>
								<span className="text-sm font-semibold text-green-600 dark:text-green-400">
									+20 lbs
								</span>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="border-border/50 bg-card/50 supports-backdrop-filter:bg-card/50 rounded-2xl backdrop-blur md:col-span-2 lg:col-span-1 dark:bg-neutral-800/50 dark:supports-backdrop-filter:bg-neutral-800/50">
					<CardHeader className="pb-3">
						<CardTitle className="text-foreground text-lg">Weekly Streak</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-2 text-center">
							<div className="text-2xl font-bold text-orange-500 md:text-3xl">12</div>
							<p className="text-muted-foreground text-xs md:text-sm">Days in a row</p>
							<Badge className="bg-orange-100 text-xs text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
								On Fire! 🔥
							</Badge>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Ad Box - Progress, subtle placement below stats grid */}
			<AdBox variant="horizontal" label="Sponsored" />
		</div>
	);

	return (
		<>
			{/* Contenido principal centrado */}
			{renderProgress()}
		</>
	);
};
