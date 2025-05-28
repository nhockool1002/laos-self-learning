import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      // Navigation
      home: 'Trang chủ',
      alphabet: 'Bảng chữ cái',
      lessons: 'Bài học',
      practice: 'Luyện tập',
      tests: 'Kiểm tra',

      // Home page
      welcome: 'Chào mừng đến với khóa học tiếng Lào',
      welcomeDescription: 'Học tiếng Lào một cách dễ dàng và hiệu quả thông qua các bài học tương tác, bài tập thực hành và kiểm tra kiến thức.',
      alphabetTitle: 'Bảng chữ cái',
      alphabetDescription: 'Học cách đọc và viết bảng chữ cái tiếng Lào',
      lessonsTitle: 'Bài học',
      lessonsDescription: 'Các bài học theo chủ đề từ cơ bản đến nâng cao',
      practiceTitle: 'Luyện tập',
      practiceDescription: 'Thực hành giao tiếp và phát âm',
      testsTitle: 'Kiểm tra',
      testsDescription: 'Đánh giá kiến thức qua các bài kiểm tra',

      // Alphabet page
      consonants: 'Phụ âm',
      vowels: 'Nguyên âm',
      tones: 'Thanh',
      pronunciation: 'Cách phát âm',
      example: 'Ví dụ',

      // Lessons page
      level: 'Cấp độ',
      beginner: 'Cơ bản',
      intermediate: 'Trung cấp',
      advanced: 'Nâng cao',
      vocabulary: 'Từ vựng',
      sentences: 'Câu mẫu',
      startPractice: 'Bắt đầu luyện tập',

      // Practice page
      exercise: 'Bài tập',
      check: 'Kiểm tra',
      next: 'Tiếp theo',
      previous: 'Câu trước',
      score: 'Điểm số',
      progress: 'Tiến độ',

      // Tests page
      startTest: 'Bắt đầu kiểm tra',
      question: 'Câu hỏi',
      yourAnswer: 'Đáp án của bạn',
      correctAnswer: 'Đáp án đúng',
      finish: 'Kết thúc',
      cancel: 'Hủy',
      close: 'Đóng',
    },
  },
  en: {
    translation: {
      // Navigation
      home: 'Home',
      alphabet: 'Alphabet',
      lessons: 'Lessons',
      practice: 'Practice',
      tests: 'Tests',

      // Home page
      welcome: 'Welcome to Lao Language Learning',
      welcomeDescription: 'Learn Lao language easily and effectively through interactive lessons, practice exercises, and knowledge tests.',
      alphabetTitle: 'Alphabet',
      alphabetDescription: 'Learn how to read and write Lao alphabet',
      lessonsTitle: 'Lessons',
      lessonsDescription: 'Topic-based lessons from basic to advanced',
      practiceTitle: 'Practice',
      practiceDescription: 'Practice communication and pronunciation',
      testsTitle: 'Tests',
      testsDescription: 'Evaluate knowledge through tests',

      // Alphabet page
      consonants: 'Consonants',
      vowels: 'Vowels',
      tones: 'Tones',
      pronunciation: 'Pronunciation',
      example: 'Example',

      // Lessons page
      level: 'Level',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      vocabulary: 'Vocabulary',
      sentences: 'Sample Sentences',
      startPractice: 'Start Practice',

      // Practice page
      exercise: 'Exercise',
      check: 'Check',
      next: 'Next',
      previous: 'Previous',
      score: 'Score',
      progress: 'Progress',

      // Tests page
      startTest: 'Start Test',
      question: 'Question',
      yourAnswer: 'Your Answer',
      correctAnswer: 'Correct Answer',
      finish: 'Finish',
      cancel: 'Cancel',
      close: 'Close',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'vi', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 