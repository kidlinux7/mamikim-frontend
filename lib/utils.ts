import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserInitials(email: string): string {
  if (!email) return 'U';
  
  const parts = email.split('@')[0].split(/[._-]/);
  const initials = parts
    .map(part => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
    
  return initials || 'U';
}