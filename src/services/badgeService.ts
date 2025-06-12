import { SHEET_CONFIG } from '../config/sheetConfig';
import { sheetService } from './sheetService';

export interface Badge {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  condition: string;
}

export interface UserBadge {
  username: string;
  badgeId: string;
  achievedDate: string;
}

interface UserData {
  score?: number;
  time?: number;
  completedLessons?: number;
  totalTests?: number;
  [key: string]: any;
}

class BadgeService {
  private readonly BADGES_SHEET = SHEET_CONFIG.SHEETS.BADGES.TITLE;
  private readonly USER_BADGES_SHEET = SHEET_CONFIG.SHEETS.USER_BADGES.TITLE;

  async getAllBadges(): Promise<Badge[]> {
    try {
      const data = await sheetService.fetchSheet('A:E', this.BADGES_SHEET);
      return data.values.slice(1).map((row: any[]) => ({
        id: row[0],
        name: row[1],
        description: row[2],
        imagePath: row[3],
        condition: row[4]
      }));
    } catch (error) {
      console.error('Error fetching badges:', error);
      return [];
    }
  }

  async getUserBadges(username: string): Promise<Badge[]> {
    try {
      const userBadgesData = await sheetService.fetchSheet('A:C', this.USER_BADGES_SHEET);
      const userBadges = userBadgesData.values
        .slice(1)
        .filter((row: any[]) => row[0] === username)
        .map((row: any[]): UserBadge => ({
          username: row[0],
          badgeId: row[1],
          achievedDate: row[2]
        }));

      const allBadges = await this.getAllBadges();
      return userBadges.map((userBadge: UserBadge) => 
        allBadges.find((badge: Badge) => badge.id === userBadge.badgeId)
      ).filter((badge: Badge | undefined): badge is Badge => badge !== undefined);
    } catch (error) {
      console.error('Error fetching user badges:', error);
      return [];
    }
  }

  async addUserBadge(username: string, badgeId: string): Promise<void> {
    try {
      const achievedDate = new Date().toISOString();
      await sheetService.appendToSheet([
        [username, badgeId, achievedDate]
      ], this.USER_BADGES_SHEET);
    } catch (error) {
      console.error('Error adding user badge:', error);
      throw error;
    }
  }

  private evaluateCondition(condition: string, userData: UserData): boolean {
    try {
      // Thay thế các biến trong điều kiện bằng giá trị thực tế
      const safeCondition = condition
        .replace(/userData\.score/g, String(userData.score || 0))
        .replace(/userData\.time/g, String(userData.time || 0))
        .replace(/userData\.completedLessons/g, String(userData.completedLessons || 0))
        .replace(/userData\.totalTests/g, String(userData.totalTests || 0));

      // Sử dụng eval một cách an toàn
      // eslint-disable-next-line no-eval
      return eval(safeCondition);
    } catch (error) {
      console.error('Error evaluating badge condition:', error);
      return false;
    }
  }

  async checkAndAwardBadges(username: string, userData: UserData): Promise<void> {
    try {
      const allBadges = await this.getAllBadges();
      const userBadges = await this.getUserBadges(username);
      const userBadgeIds = userBadges.map((badge: Badge) => badge.id);

      for (const badge of allBadges) {
        if (!userBadgeIds.includes(badge.id)) {
          if (this.evaluateCondition(badge.condition, userData)) {
            await this.addUserBadge(username, badge.id);
          }
        }
      }
    } catch (error) {
      console.error('Error checking and awarding badges:', error);
      throw error;
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
        await this.addUserBadge(username, badgeId);
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