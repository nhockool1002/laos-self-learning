import { Lesson } from './types';

const greetings: Lesson = {
  id: 'greetings',
  title: 'Chào hỏi cơ bản',
  description: 'Học cách chào hỏi và giới thiệu bản thân trong tiếng Lào',
  category: 'Giao tiếp cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ສະບາຍດີ', pronunciation: 'sabaidee', meaning: 'Xin chào', example: 'ສະບາຍດີ! (Xin chào!)' },
      { word: 'ຂໍ້ຍ', pronunciation: 'khony', meaning: 'Tôi', example: 'ຂ້ອຍຊື່... (Tôi tên là...)' },
      { word: 'ຊື່', pronunciation: 'sue', meaning: 'Tên', example: 'ທ່ານຊື່ຫຍັງ? (Bạn tên là gì?)' },
      { word: 'ທ່ານ', pronunciation: 'than', meaning: 'Bạn/Ông/Bà', example: 'ທ່ານມາຈາກໃສ? (Bạn đến từ đâu?)' },
      { word: 'ຂອບໃຈ', pronunciation: 'khop chai', meaning: 'Cảm ơn', example: 'ຂອບໃຈຫຼາຍ (Cảm ơn nhiều)' },
      { word: 'ລາກ່ອນ', pronunciation: 'la kon', meaning: 'Tạm biệt', example: 'ລາກ່ອນ! (Tạm biệt!)' },
      { word: 'ແມ່ນ', pronunciation: 'maen', meaning: 'Đúng', example: 'ແມ່ນແລ້ວ (Đúng rồi)' },
      { word: 'ບໍ່', pronunciation: 'bo', meaning: 'Không', example: 'ບໍ່ແມ່ນ (Không phải)' },
      { word: 'ແມ່ນບໍ່', pronunciation: 'maen bo', meaning: 'Có phải không?', example: 'ເຈົ້າແມ່ນຄົນລາວບໍ່? (Bạn là người Lào phải không?)' },
      { word: 'ຢູ່ໃສ', pronunciation: 'yu sai', meaning: 'Ở đâu', example: 'ທ່ານຢູ່ໃສ? (Bạn ở đâu?)' },
      { word: 'ມາຈາກ', pronunciation: 'ma jak', meaning: 'Đến từ', example: 'ຂ້ອຍມາຈາກຫວຽດນາມ (Tôi đến từ Việt Nam)' },
      { word: 'ຫວຽດນາມ', pronunciation: 'huayt nam', meaning: 'Việt Nam', example: 'ຂ້ອຍມາຈາກຫວຽດນາມ (Tôi đến từ Việt Nam)' },
      { word: 'ລາວ', pronunciation: 'lao', meaning: 'Lào', example: 'ຂ້ອຍເປັນຄົນລາວ (Tôi là người Lào)' },
      { word: 'ຄົນ', pronunciation: 'khon', meaning: 'Người', example: 'ຂ້ອຍເປັນຄົນຫວຽດນາມ (Tôi là người Việt Nam)' },
      { word: 'ສຸດຍອດ', pronunciation: 'sut yot', meaning: 'Tuyệt vời', example: 'ມັນສຸດຍອດ! (Thật tuyệt vời!)' },
      { word: 'ດີ', pronunciation: 'dee', meaning: 'Tốt', example: 'ຂ້ອຍສຸກດີ (Tôi khỏe)' },
      { word: 'ບໍ່ດີ', pronunciation: 'bo dee', meaning: 'Không tốt', example: 'ຂ້ອຍບໍ່ສຸກດີ (Tôi không khỏe)' },
      { word: 'ສຸກ', pronunciation: 'suk', meaning: 'Khỏe', example: 'ທ່ານສຸກດີບໍ່? (Bạn khỏe không?)' },
      { word: 'ບໍ່ສຸກ', pronunciation: 'bo suk', meaning: 'Không khỏe', example: 'ຂ້ອຍບໍ່ສຸກ (Tôi không khỏe)' },
      { word: 'ອາຍຸ', pronunciation: 'a yu', meaning: 'Tuổi', example: 'ທ່ານອາຍຸທ່າຍ? (Bạn bao nhiêu tuổi?)' },
      { word: 'ຫຼາຍ', pronunciation: 'lai', meaning: 'Nhiều', example: 'ຂອບໃຈຫຼາຍ (Cảm ơn nhiều)' },
      { word: 'ນ້ອຍ', pronunciation: 'noi', meaning: 'Ít', example: 'ຂ້ອຍເວົ້າພາສາລາວໄດ້ນ້ອຍ (Tôi nói được tiếng Lào một chút)' },
      { word: 'ພາສາ', pronunciation: 'phasa', meaning: 'Ngôn ngữ', example: 'ພາສາລາວ (Tiếng Lào)' },
      { word: 'ເວົ້າ', pronunciation: 'vao', meaning: 'Nói', example: 'ຂ້ອຍເວົ້າພາສາລາວ (Tôi nói tiếng Lào)' },
      { word: 'ຟັງ', pronunciation: 'fang', meaning: 'Nghe', example: 'ຂ້ອຍຟັງບໍ່ອອກ (Tôi nghe không hiểu)' },
      { word: 'ເຂົ້າໃຈ', pronunciation: 'khao jai', meaning: 'Hiểu', example: 'ຂ້ອຍເຂົ້າໃຈ (Tôi hiểu)' },
      { word: 'ບໍ່ເຂົ້າໃຈ', pronunciation: 'bo khao jai', meaning: 'Không hiểu', example: 'ຂ້ອຍບໍ່ເຂົ້າໃຈ (Tôi không hiểu)' },
      { word: 'ອີກ', pronunciation: 'ik', meaning: 'Nữa', example: 'ກະລຸນາເວົ້າອີກ (Làm ơn nói lại lần nữa)' },
      { word: 'ກະລຸນາ', pronunciation: 'ka lu na', meaning: 'Làm ơn', example: 'ກະລຸນາຊ່ວຍຂ້ອຍ (Làm ơn giúp tôi)' },
      { word: 'ຊ່ວຍ', pronunciation: 'suay', meaning: 'Giúp', example: 'ຊ່ວຍຂ້ອຍແນ່ (Giúp tôi với)' },
    ],
    grammar: [
      {
        title: 'Câu chào hỏi cơ bản',
        explanation: 'Cách sử dụng câu chào hỏi và giới thiệu bản thân trong tiếng Lào.',
        structure: 'ສະບາຍດີ + [tên/người]',
        examples: [
          'ສະບາຍດີ ນາງ (Xin chào Nang)',
          'ສະບາຍດີ ທ່ານ (Xin chào bạn)',
        ],
      },
      {
        title: 'Giới thiệu bản thân',
        explanation: 'Cách nói tên và quê quán.',
        structure: 'ຂ້ອຍຊື່... ຂ້ອຍມາຈາກ...',
        examples: [
          'ຂ້ອຍຊື່ອັນ (Tôi tên là An)',
          'ຂ້ອຍມາຈາກຫວຽດນາມ (Tôi đến từ Việt Nam)',
        ],
      },
    ],
    practice: [
      {
        question: 'Từ nào có nghĩa là "Xin chào"?',
        options: ['ສະບາຍດີ', 'ຂອບໃຈ', 'ລາກ່ອນ'],
      },
      {
        question: 'Câu nào dùng để giới thiệu tên?',
        options: ['ຂ້ອຍຊື່...', 'ຂອບໃຈ', 'ສຸດຍອດ'],
      },
      {
        question: 'Từ nào có nghĩa là "Cảm ơn"?',
        options: ['ຂອບໃຈ', 'ສະບາຍດີ', 'ບໍ່'],
      },
      {
        question: 'Từ nào có nghĩa là "Tạm biệt"?',
        options: ['ລາກ່ອນ', 'ຂອບໃຈ', 'ຄົນ'],
      },
      {
        question: 'Câu nào dùng để hỏi quê quán?',
        options: ['ທ່ານມາຈາກໃສ?', 'ຂ້ອຍຊື່...', 'ສຸດຍອດ'],
      },
    ],
  },
};

export default greetings; 