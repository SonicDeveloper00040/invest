'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters long'),
});

export async function updateProfile(formData: { fullName: string }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: { message: 'User not found' } };
  }

  const validatedFields = profileSchema.safeParse(formData);
  if (!validatedFields.success) {
    return {
      error: {
        message: validatedFields.error.flatten().fieldErrors,
      }
    };
  }

  const { fullName } = validatedFields.data;

  const { error } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id);

  if (error) {
    return { error: { message: error.message } };
  }

  return { error: null };
}

export async function updatePassword(formData: { currentPassword?: string, newPassword?: string }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  
  const { data: { user } } = await supabase.auth.getUser();

  if(!user){
    return { error: { message: 'User not found' } };
  }

  const { newPassword } = formData;


  if(!newPassword) {
    return { error: { message: 'New password is required' } };
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    return { error: { message: error.message } };
  }

  return { error: null };
}
