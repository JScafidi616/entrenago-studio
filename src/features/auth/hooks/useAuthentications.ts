import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/supabase';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
      return data;
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw new Error(error.message);
    },
  });
};

// features/auth/hooks/useAuthentications.ts
export const useResetPassword = () => {
  return useMutation({
    mutationFn: async ({ newPassword, shouldSignOut = false }: { newPassword: string, shouldSignOut?: boolean }) => {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw new Error(error.message);
      
      // Only sign out if requested (Case 1)
      if (shouldSignOut) {
        await supabase.auth.signOut();
      }
    },
  });
};