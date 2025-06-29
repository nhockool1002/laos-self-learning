import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const TABLES = {
  USERS: 'users',
  BADGES_SYSTEM: 'badges_system',
  USER_BADGES: 'user_badges',
  LEADERBOARD: 'leaderboard',
  VIDEO_COURSES: 'video_courses',
  USER_PROGRESS: 'user_progress'
} as const; 