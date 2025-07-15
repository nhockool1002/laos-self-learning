import { supabase } from '../config/supabaseConfig';

export async function getGameGroups() {
  const { data, error } = await supabase
    .from('game_groups')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getFlashGamesByGroupId(groupId: string) {
  const { data, error } = await supabase
    .from('flash_games')
    .select('*')
    .eq('group_id', groupId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
} 