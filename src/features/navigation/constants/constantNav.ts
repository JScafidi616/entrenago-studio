import { Dumbbell, Home, TrendingUp, Settings, UserCircle } from 'lucide-react';

//Add more possible routes from this section...
export const appNavItems = [
  { id: '/dashboard', label: 'Dashboard', icon: Home },
  { id: '/progress-tracking', label: 'Progress', icon: TrendingUp },
  { id: '/my-routines', label: 'Routines', icon: Dumbbell },
];

export const accountNavItems = [
  { id: '/profile', label: 'Profile', icon: UserCircle },
  { id: '/settings', label: 'Settings', icon: Settings }
];