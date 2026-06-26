import { Dumbbell, Target, Zap, Activity } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
// 1. Types
export interface RoutineTemplate {
	workout: string | null;
	category: string | null;
	icon: LucideIcon | null;
	exercises: number;
	duration: number;
}

export interface DaySchedule extends RoutineTemplate {
	day: string;
	fullDay: string;
	date: string;
	dateObj: Date;
	isToday: boolean;
	completed: boolean;
}

// 2. Static Data
export const weeklyRoutineTemplate: RoutineTemplate[] = [
	{ workout: 'Push Day', category: 'strength', icon: Dumbbell, exercises: 6, duration: 45 },
	{ workout: 'Pull Day', category: 'strength', icon: Dumbbell, exercises: 5, duration: 40 },
	{ workout: null, category: null, icon: null, exercises: 0, duration: 0 },
	{ workout: 'Legs & Core', category: 'strength', icon: Target, exercises: 8, duration: 60 },
	{ workout: 'Upper Body', category: 'strength', icon: Dumbbell, exercises: 7, duration: 50 },
	{ workout: 'HIT Cardio', category: 'cardio', icon: Zap, exercises: 4, duration: 30 },
	{ workout: null, category: null, icon: null, exercises: 0, duration: 0 },
];

export const todayWorkout = {
	name: 'Legs & Core',
	category: 'strength',
	icon: Target,
	exercises: [
		{ name: 'Squats', sets: '4x12', rest: '90s', category: 'strength', icon: Dumbbell },
		{ name: 'Romanian Deadlifts', sets: '3x10', rest: '90s', category: 'strength', icon: Dumbbell },
		{ name: 'Bulgarian Split Squats', sets: '3x8 each', rest: '60s', category: 'bodyweight', icon: Activity },
		{ name: 'Leg Press', sets: '3x15', rest: '90s', category: 'strength', icon: Dumbbell },
		{ name: 'Plank', sets: '3x60s', rest: '30s', category: 'core', icon: Target },
		{ name: 'Russian Twists', sets: '3x20', rest: '30s', category: 'core', icon: Target },
	],
	estimatedTime: 60,
	difficulty: 'Intermediate',
};

// 3. Helper Function
export const generateWeekSchedule = (): DaySchedule[] => {
	const now = new Date();
	const currentDay = now.getDay();
	const currentDate = now.getDate();

	const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
	const monday = new Date(now);
	monday.setDate(currentDate + mondayOffset);

	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	return days.map((day, index) => {
		const date = new Date(monday);
		date.setDate(monday.getDate() + index);

		const isToday =
			date.getDate() === now.getDate() &&
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear();

		const isPast = date < now && !isToday;

		return {
			day,
			fullDay: fullDays[index],
			date: date.getDate().toString(),
			dateObj: date,
			isToday,
			completed: isPast,
			...weeklyRoutineTemplate[index],
		};
	});
};