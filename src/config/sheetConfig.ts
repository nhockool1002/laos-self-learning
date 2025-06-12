export const SHEET_CONFIG = {
  SPREADSHEET_ID: '174w74Db5fe-_JgSVdhrmzOWaxaIzzH54BalGCqtin9I',
  SHEETS: {
    LEADERBOARD: {
      TITLE: 'Leaderboard',
      HEADERS: ['username', 'score', 'time', 'date']
    },
    USERS: {
      TITLE: 'Users',
      HEADERS: ['username', 'email', 'password', 'createdAt']
    },
    BADGES: {
      TITLE: 'Badges System',
      RANGE: 'A:E',
      COLUMNS: {
        ID: 'A',
        NAME: 'B',
        DESCRIPTION: 'C',
        IMAGE_PATH: 'D',
        CONDITION: 'E'
      }
    },
    USER_BADGES: {
      TITLE: 'User Badges',
      RANGE: 'A:C',
      COLUMNS: {
        USERNAME: 'A',
        BADGE_ID: 'B',
        ACHIEVED_DATE: 'C'
      }
    }
  }
}; 