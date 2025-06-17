import { SupabaseClient } from '@supabase/supabase-js';

declare global {
  interface Window {
    supabase: SupabaseClient;
  }
}

interface SupabaseQueryBuilder {
  select(columns?: string): SupabaseQueryBuilder;
  insert(data: any): Promise<{ data: any; error: any }>;
  update(data: any): SupabaseQueryBuilder;
  delete(): SupabaseQueryBuilder;
  eq(column: string, value: any): SupabaseQueryBuilder;
  in(column: string, values: any[]): SupabaseQueryBuilder;
  single(): Promise<{ data: any; error: any }>;
  order(column: string, options: { ascending: boolean }): SupabaseQueryBuilder;
}

interface SupabaseClient {
  from(table: string): SupabaseQueryBuilder;
}

export const supabase: SupabaseClient;
export const TABLES: {
  USERS: string;
  BADGES: string;
  USER_BADGES: string;
  LEADERBOARD: string;
}; 