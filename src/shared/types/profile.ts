// src/types/profile.ts
import type { Session, User } from '@supabase/supabase-js';

export type Profile = {
	id: string;
	full_name: string | null;
	user_type: string | null;
	username: string | null;
	goal: string | null;
	date_birth: string | null;
	gender: string | null;
	avatar_url: string | null;
	created_at: string;
	onboarded: boolean;
	email: string | null;
} | null;

export interface AuthContextType {
	user: User | null;
	session: Session | null;
	profile: Profile; // Brought back!
	isLoading: boolean;
	signOut: () => Promise<void>;
	refreshProfile: () => Promise<void>;
}
