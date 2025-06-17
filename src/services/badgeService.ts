import { supabase, TABLES } from '../config/supabaseConfig';

export interface Badge {
  id: string;
  name: string;
  description: string;
  image_path: string;
  condition: string;
}

interface UserBadge {
  id: string;
  username: string;
  badge_id: string;
  achieved_date: string;
}

interface UserData {
  score?: number;
  time?: number;
  completedLessons?: number;
  totalTests?: number;
}

class BadgeService {
  private evaluateCondition(condition: string, userData: UserData): boolean {
    try {
      const conditionWithData = condition
        .replace(/score/g, String(userData.score || 0))
        .replace(/time/g, String(userData.time || 0))
        .replace(/completedLessons/g, String(userData.completedLessons || 0))
        .replace(/totalTests/g, String(userData.totalTests || 0));

      // Chỉ cho phép các toán tử so sánh và logic cơ bản
      const safeCondition = conditionWithData.match(/^[0-9\s<>=!&|()]+$/);
      if (!safeCondition) {
        console.error('Invalid condition:', condition);
        return false;
      }

      // Đánh giá điều kiện an toàn bằng cách parse và tính toán
      const tokens = safeCondition[0].split(/\s+/);
      let result = 0;
      let currentOperator = '+';
      
      for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/') {
          currentOperator = token;
        } else if (token === '>' || token === '<' || token === '>=' || token === '<=' || token === '==' || token === '!=') {
          currentOperator = token;
        } else if (token === '&&' || token === '||') {
          currentOperator = token;
        } else if (!isNaN(Number(token))) {
          const num = Number(token);
          switch (currentOperator) {
            case '+': result += num; break;
            case '-': result -= num; break;
            case '*': result *= num; break;
            case '/': result /= num; break;
            case '>': result = result > num ? 1 : 0; break;
            case '<': result = result < num ? 1 : 0; break;
            case '>=': result = result >= num ? 1 : 0; break;
            case '<=': result = result <= num ? 1 : 0; break;
            case '==': result = result === num ? 1 : 0; break;
            case '!=': result = result !== num ? 1 : 0; break;
            case '&&': result = result && num ? 1 : 0; break;
            case '||': result = result || num ? 1 : 0; break;
            default: result = num;
          }
        }
      }
      
      return result !== 0;
    } catch (error) {
      console.error('Error evaluating badge condition:', error);
      return false;
    }
  }

  async getAllBadges(): Promise<Badge[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.BADGES_SYSTEM)
        .select('*');
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting badges:', error);
      return [];
    }
  }

  async getUserBadges(username: string): Promise<Badge[]> {
    try {
      const { data: userBadges, error: userBadgesError } = await supabase
        .from(TABLES.USER_BADGES)
        .select('*')
        .eq('username', username);
      if (userBadgesError) throw userBadgesError;

      const badges = await Promise.all(
        (userBadges || []).map(async (userBadge: UserBadge) => {
          const { data: badge, error: badgeError } = await supabase
            .from(TABLES.BADGES_SYSTEM)
            .select('*')
            .eq('id', userBadge.badge_id)
            .single();
          if (badgeError) throw badgeError;
          return badge;
        })
      );

      return badges.filter(badge => badge !== null);
    } catch (error) {
      console.error('Error getting user badges:', error);
      return [];
    }
  }

  async checkAndAwardBadges(username: string, userData: UserData): Promise<void> {
    try {
      const { data: badges, error: badgesError } = await supabase
        .from(TABLES.BADGES_SYSTEM)
        .select('*');
      if (badgesError) throw badgesError;

      for (const badge of badges || []) {
        if (this.evaluateCondition(badge.condition, userData)) {
          const { data: existingBadge, error: existingError } = await supabase
            .from(TABLES.USER_BADGES)
            .select('*')
            .eq('username', username)
            .eq('badge_id', badge.id)
            .single();

          if (existingError && existingError.code !== 'PGRST116') throw existingError;

          if (!existingBadge) {
            const { error: insertError } = await supabase
              .from(TABLES.USER_BADGES)
              .insert([{
                username,
                badge_id: badge.id,
                achieved_date: new Date().toISOString()
              }]);
            if (insertError) throw insertError;
          }
        }
      }
    } catch (error) {
      console.error('Error checking and awarding badges:', error);
    }
  }

  async createSampleUserBadge(): Promise<void> {
    try {
      const username = 'nhockool1002';
      const badgeId = 'badge_001';
      const achievedDate = new Date().toISOString();

      // Kiểm tra xem huy hiệu đã tồn tại chưa
      const userBadges = await this.getUserBadges(username);
      const hasBadge = userBadges.some(badge => badge.id === badgeId);

      if (!hasBadge) {
        await this.checkAndAwardBadges(username, { score: 0, time: 0, completedLessons: 0, totalTests: 0 });
        console.log(`Đã trao huy hiệu ${badgeId} cho người dùng ${username} vào lúc ${achievedDate}`);
      } else {
        console.log(`Người dùng ${username} đã có huy hiệu ${badgeId}`);
      }
    } catch (error) {
      console.error('Error creating sample user badge:', error);
      throw error;
    }
  }
}

export const badgeService = new BadgeService(); 