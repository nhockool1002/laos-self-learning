// Định nghĩa các kiểu dữ liệu cho bài học

export interface VocabularyItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example?: string;
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  structure: string;
  examples: string[];
}

// Nếu practice là ví dụ minh họa, có thể là dạng string[] hoặc object khác, tạm thời để dạng any[] cho linh hoạt
export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  content: {
    vocabulary: VocabularyItem[];
    grammar: GrammarPoint[];
    practice: any[];
  };
} 