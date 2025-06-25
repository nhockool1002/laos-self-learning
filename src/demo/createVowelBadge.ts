import { supabase, TABLES } from '../config/supabaseConfig';

async function createVowelBadge() {
  try {
    // Kiểm tra xem badge_002 đã tồn tại chưa
    const { data: existingBadge, error: checkError } = await supabase
      .from(TABLES.BADGES_SYSTEM)
      .select('*')
      .eq('id', 'badge_002')
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    if (existingBadge) {
      console.log('Badge badge_002 đã tồn tại');
      return;
    }

    // Thêm badge_002 cho luyện tập nguyên âm
    const { error: insertError } = await supabase
      .from(TABLES.BADGES_SYSTEM)
      .insert([{
        id: 'badge_002',
        name: 'Bậc thầy nguyên âm',
        description: 'Hoàn thành 25/25 câu trong luyện tập nguyên âm',
        image_path: '/badges/vowel_master.png',
        condition: 'score == 25'
      }]);

    if (insertError) {
      throw insertError;
    }

    console.log('Đã tạo thành công badge_002 cho luyện tập nguyên âm');
  } catch (error) {
    console.error('Error creating vowel badge:', error);
  }
}

// Chạy script
createVowelBadge(); 