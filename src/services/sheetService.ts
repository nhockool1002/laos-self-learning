import { SHEET_CONFIG } from '../config/sheetConfig';
import bcrypt from 'bcryptjs';

interface ScoreRecord {
  username: string;
  score: number;
  time: number;
  date: string;
}

interface UserRegistration {
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

class SheetService {
  private readonly CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  private readonly SPREADSHEET_ID = SHEET_CONFIG.SPREADSHEET_ID;
  private readonly SHEET_NAME = SHEET_CONFIG.SHEETS.LEADERBOARD.TITLE;
  private readonly USERS_SHEET = SHEET_CONFIG.SHEETS.USERS.TITLE;
  private accessToken: string | null = null;

  constructor() {
    console.log('SheetService initialized with:');
    console.log('CLIENT_ID:', this.CLIENT_ID ? 'Client ID exists' : 'Client ID is missing');
    console.log('SPREADSHEET_ID:', this.SPREADSHEET_ID);
    console.log('SHEET_NAME:', this.SHEET_NAME);
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.CLIENT_ID!,
          client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET!,
          refresh_token: process.env.REACT_APP_GOOGLE_REFRESH_TOKEN!,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      if (!data.access_token) {
        throw new Error('No access token in response');
      }
      this.accessToken = data.access_token;
      return data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  private async fetchSheet(range: string, sheetName: string = this.SHEET_NAME) {
    try {
      console.log('Fetching sheet with range:', range);
      const accessToken = await this.getAccessToken();
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${sheetName}!${range}`;
      console.log('Request URL:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Sheet API Error:', errorData);
        throw new Error(`Failed to fetch sheet data: ${JSON.stringify(errorData)}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in fetchSheet:', error);
      throw error;
    }
  }

  private async appendToSheet(values: any[][], sheetName: string = this.SHEET_NAME) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${sheetName}!A:E:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Sheet API Error:', errorData);
        throw new Error(`Failed to append data to sheet: ${JSON.stringify(errorData)}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in appendToSheet:', error);
      throw error;
    }
  }

  private async ensureSheetExists() {
    try {
      const data = await this.fetchSheet('A1:C1');
      if (!data.values || data.values.length === 0) {
        await this.appendToSheet([['score', 'time', 'date']]);
      }
    } catch (error) {
      console.error('Error ensuring sheet exists:', error);
      throw error;
    }
  }

  private async ensureUsersSheetExists() {
    try {
      const data = await this.fetchSheet('A1:D1', this.USERS_SHEET);
      if (!data.values || data.values.length === 0) {
        await this.appendToSheet([
          ['username', 'email', 'password', 'createdAt']
        ], this.USERS_SHEET);
      }
    } catch (error) {
      console.error('Error ensuring users sheet exists:', error);
      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private async updateSheetValues(range: string, values: any[][], sheetName: string = this.SHEET_NAME) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${sheetName}!${range}?valueInputOption=USER_ENTERED`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Sheet API Error:', errorData);
        throw new Error(`Failed to update sheet data: ${JSON.stringify(errorData)}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in updateSheetValues:', error);
      throw error;
    }
  }

  async getLeaderboard(): Promise<ScoreRecord[]> {
    try {
      await this.ensureSheetExists();
      const data = await this.fetchSheet('A:D');
      const records: ScoreRecord[] = data.values
        .slice(1)
        .map((row: any[]) => ({
          username: row[0],
          score: Number(row[1]),
          time: Number(row[2]),
          date: row[3],
        }))
        .sort((a: ScoreRecord, b: ScoreRecord) => b.score - a.score || a.time - b.time);
      return records;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  async addScore(record: ScoreRecord): Promise<void> {
    try {
      await this.ensureSheetExists();
      const data = await this.fetchSheet('A:D');
      const existingUserIndex = data.values?.findIndex((row: any[]) => row[0] === record.username) ?? -1;

      if (existingUserIndex > 0) {
        // Nếu người dùng đã tồn tại, cập nhật kết quả
        const existingScore = Number(data.values[existingUserIndex][1]);
        const existingTime = Number(data.values[existingUserIndex][2]);

        if (record.score > existingScore || (record.score === existingScore && record.time < existingTime)) {
          // Cập nhật kết quả nếu điểm cao hơn hoặc thời gian thấp hơn
          const range = `A${existingUserIndex + 1}:D${existingUserIndex + 1}`;
          await this.updateSheetValues(range, [[
            record.username,
            record.score,
            record.time,
            record.date
          ]]);
        }
      } else {
        // Nếu người dùng chưa tồn tại, thêm mới
        await this.appendToSheet([[
          record.username,
          record.score,
          record.time,
          record.date
        ]]);
      }
      console.log('Score processed successfully:', record);
    } catch (error) {
      console.error('Error processing score:', error);
      throw error;
    }
  }

  async registerUser(userData: UserRegistration): Promise<boolean> {
    try {
      await this.ensureUsersSheetExists();
      // Kiểm tra xem username đã tồn tại chưa
      const existingUsers = await this.fetchSheet('A:A', this.USERS_SHEET);
      const isUsernameExists = existingUsers.values?.some((row: any[]) => row[0] === userData.username);
      if (isUsernameExists) {
        throw new Error('Username đã tồn tại');
      }
      // Mã hóa mật khẩu
      const hashedPassword = await this.hashPassword(userData.password);
      // Thêm user mới vào sheet
      await this.appendToSheet([
        [
          userData.username,
          userData.email,
          hashedPassword,
          userData.createdAt
        ]
      ], this.USERS_SHEET);
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async getUserByUsername(username: string): Promise<UserRegistration | null> {
    try {
      const data = await this.fetchSheet('A:D', this.USERS_SHEET);
      const user = data.values?.find((row: any[]) => row[0] === username);
      if (!user) {
        return null;
      }
      return {
        username: user[0],
        email: user[1],
        password: user[2],
        createdAt: user[3]
      };
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async checkUserExists(username: string, email: string): Promise<boolean> {
    try {
      const data = await this.fetchSheet('A:B', this.USERS_SHEET);
      return data.values?.some((row: any[]) => 
        row[0] === username || row[1] === email
      ) ?? false;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  }

  async loginUser(usernameOrEmail: string, password: string): Promise<UserRegistration | null> {
    try {
      const data = await this.fetchSheet('A:D', this.USERS_SHEET);
      const user = data.values?.find((row: any[]) =>
        row[0] === usernameOrEmail || row[1] === usernameOrEmail
      );
      if (!user) {
        return null;
      }
      // Kiểm tra mật khẩu
      const isPasswordValid = await this.comparePasswords(password, user[2]);
      if (!isPasswordValid) {
        return null;
      }
      return {
        username: user[0],
        email: user[1],
        password: user[2],
        createdAt: user[3]
      };
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }
}

export const sheetService = new SheetService(); 