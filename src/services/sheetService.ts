import { SHEET_CONFIG } from '../config/sheetConfig';

interface ScoreRecord {
  username: string;
  score: number;
  time: number;
  date: string;
}

class SheetService {
  private readonly CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  private readonly SPREADSHEET_ID = SHEET_CONFIG.SPREADSHEET_ID;
  private readonly SHEET_NAME = SHEET_CONFIG.SHEETS.LEADERBOARD.TITLE;
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

  private async fetchSheet(range: string) {
    try {
      console.log('Fetching sheet with range:', range);
      const accessToken = await this.getAccessToken();
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${this.SHEET_NAME}!${range}`;
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

  private async appendToSheet(values: any[][]) {
    try {
      const accessToken = await this.getAccessToken();
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${this.SHEET_NAME}!A:C:append?valueInputOption=USER_ENTERED`,
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

  async getLeaderboard(): Promise<ScoreRecord[]> {
    try {
      await this.ensureSheetExists();
      const data = await this.fetchSheet('A:D');
      const records: ScoreRecord[] = data.values
        .slice(1)
        .map((row: any[]) => ({
          username: row[0] || 'AAA',
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
      await this.appendToSheet([['AAA', record.score, record.time, record.date]]);
      console.log('Score added successfully:', record);
    } catch (error) {
      console.error('Error adding score:', error);
      throw error;
    }
  }
}

export const sheetService = new SheetService(); 