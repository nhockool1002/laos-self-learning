import { Lesson } from '../lessons';

const numbers: Lesson = {
  id: 'numbers',
  title: 'Số đếm',
  description: 'Học cách đếm số và sử dụng số trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ສູນ', pronunciation: 'sun', meaning: 'Không (0)', example: 'ມີສູນຄົນ (Có 0 người)' },
      { word: 'ໜຶ່ງ', pronunciation: 'nueng', meaning: 'Một (1)', example: 'ໜຶ່ງຄົນ (Một người)' },
      { word: 'ສອງ', pronunciation: 'song', meaning: 'Hai (2)', example: 'ສອງຄົນ (Hai người)' },
      { word: 'ສາມ', pronunciation: 'sam', meaning: 'Ba (3)', example: 'ສາມຄົນ (Ba người)' },
      { word: 'ສີ່', pronunciation: 'si', meaning: 'Bốn (4)', example: 'ສີ່ຄົນ (Bốn người)' },
      { word: 'ຫ້າ', pronunciation: 'ha', meaning: 'Năm (5)', example: 'ຫ້າຄົນ (Năm người)' },
      { word: 'ຫົກ', pronunciation: 'hok', meaning: 'Sáu (6)', example: 'ຫົກຄົນ (Sáu người)' },
      { word: 'ເຈັດ', pronunciation: 'jet', meaning: 'Bảy (7)', example: 'ເຈັດຄົນ (Bảy người)' },
      { word: 'ແປດ', pronunciation: 'paet', meaning: 'Tám (8)', example: 'ແປດຄົນ (Tám người)' },
      { word: 'ເກົ້າ', pronunciation: 'kao', meaning: 'Chín (9)', example: 'ເກົ້າຄົນ (Chín người)' },
      { word: 'ສິບ', pronunciation: 'sip', meaning: 'Mười (10)', example: 'ສິບຄົນ (Mười người)' },
      { word: 'ສິບເອັດ', pronunciation: 'sip et', meaning: 'Mười một (11)', example: 'ສິບເອັດຄົນ (Mười một người)' },
      { word: 'ສິບສອງ', pronunciation: 'sip song', meaning: 'Mười hai (12)', example: 'ສິບສອງຄົນ (Mười hai người)' },
      { word: 'ສິບເກົ້າ', pronunciation: 'sip kao', meaning: 'Mười chín (19)', example: 'ສິບເກົ້າຄົນ (Mười chín người)' },
      { word: 'ຊາວ', pronunciation: 'sao', meaning: 'Hai mươi (20)', example: 'ຊາວຄົນ (Hai mươi người)' },
      { word: 'ສາມສິບ', pronunciation: 'sam sip', meaning: 'Ba mươi (30)', example: 'ສາມສິບຄົນ (Ba mươi người)' },
      { word: 'ສີ່ສິບ', pronunciation: 'si sip', meaning: 'Bốn mươi (40)', example: 'ສີ່ສິບຄົນ (Bốn mươi người)' },
      { word: 'ຫ້າສິບ', pronunciation: 'ha sip', meaning: 'Năm mươi (50)', example: 'ຫ້າສິບຄົນ (Năm mươi người)' },
      { word: 'ເກົ້າສິບ', pronunciation: 'kao sip', meaning: 'Chín mươi (90)', example: 'ເກົ້າສິບຄົນ (Chín mươi người)' },
      { word: 'ເກົ້າສິບເກົ້າ', pronunciation: 'kao sip kao', meaning: 'Chín mươi chín (99)', example: 'ເກົ້າສິບເກົ້າຄົນ (Chín mươi chín người)' },
      { word: 'ຮ້ອຍ', pronunciation: 'hoi', meaning: 'Một trăm (100)', example: 'ຮ້ອຍຄົນ (Một trăm người)' },
      { word: 'ຮ້ອຍສິບ', pronunciation: 'hoi sip', meaning: 'Một trăm mười (110)', example: 'ຮ້ອຍສິບຄົນ (Một trăm mười người)' },
      { word: 'ສອງຮ້ອຍ', pronunciation: 'song hoi', meaning: 'Hai trăm (200)', example: 'ສອງຮ້ອຍຄົນ (Hai trăm người)' },
      { word: 'ຫົກຮ້ອຍ', pronunciation: 'hok hoi', meaning: 'Sáu trăm (600)', example: 'ຫົກຮ້ອຍຄົນ (Sáu trăm người)' },
      { word: 'ພັນ', pronunciation: 'phan', meaning: 'Một nghìn (1000)', example: 'ພັນຄົນ (Một nghìn người)' },
      { word: 'ສອງພັນ', pronunciation: 'song phan', meaning: 'Hai nghìn (2000)', example: 'ສອງພັນຄົນ (Hai nghìn người)' },
      { word: 'ໝື່ນ', pronunciation: 'meun', meaning: 'Mười nghìn (10000)', example: 'ໝື່ນຄົນ (Mười nghìn người)' },
      { word: 'ແສນ', pronunciation: 'saen', meaning: 'Một trăm nghìn (100000)', example: 'ແສນຄົນ (Một trăm nghìn người)' },
      { word: 'ລ້ານ', pronunciation: 'lan', meaning: 'Một triệu (1000000)', example: 'ລ້ານຄົນ (Một triệu người)' },
    ],
    grammar: [
      {
        title: 'Cách đọc số trong tiếng Lào',
        explanation: 'Số đếm trong tiếng Lào thường đứng trước danh từ, giống như tiếng Việt.',
        structure: '[Số] + [Danh từ]',
        examples: [
          'ໜຶ່ງຄົນ (Một người)',
          'ສອງຄົນ (Hai người)',
          'ສາມປື້ມ (Ba quyển sách)'
        ]
      },
      {
        title: 'Cách nói số lớn',
        explanation: 'Khi nói số lớn, ghép các số lại với nhau, ví dụ: 21 = 20 + 1.',
        structure: '[Chục] + [Đơn vị]',
        examples: [
          'ຊາວຫົກ (Hai mươi sáu)',
          'ສິບເກົ້າ (Mười chín)',
          'ຮ້ອຍສິບເອັດ (Một trăm mười một)'
        ]
      }
    ],
    practice: [
      { question: 'Số "ba" trong tiếng Lào là?', options: ['ສາມ', 'ສີ່', 'ສອງ'] },
      { question: 'Số "năm" trong tiếng Lào là?', options: ['ຫ້າ', 'ສີ່', 'ຫົກ'] },
      { question: 'Số "mười" trong tiếng Lào là?', options: ['ສິບ', 'ສອງ', 'ສາມ'] },
      { question: 'Số "không" trong tiếng Lào là?', options: ['ສູນ', 'ຫົກ', 'ສີ່'] },
      { question: 'Số "hai mươi" trong tiếng Lào là?', options: ['ຊາວ', 'ສິບ', 'ສີ່'] },
      { question: 'Số "một trăm" trong tiếng Lào là?', options: ['ຮ້ອຍ', 'ພັນ', 'ສິບ'] },
      { question: 'Số "một nghìn" trong tiếng Lào là?', options: ['ພັນ', 'ຮ້ອຍ', 'ສິບ'] },
      { question: 'Số "một triệu" trong tiếng Lào là?', options: ['ລ້ານ', 'ໝື່ນ', 'ຮ້ອຍ'] },
      { question: 'Số "bảy" trong tiếng Lào là?', options: ['ເຈັດ', 'ແປດ', 'ສີ່'] },
      { question: 'Số "tám" trong tiếng Lào là?', options: ['ແປດ', 'ເຈັດ', 'ສອງ'] },
      { question: 'Số "chín" trong tiếng Lào là?', options: ['ເກົ້າ', 'ສີ່', 'ຫ້າ'] },
      { question: 'Số "mười một" trong tiếng Lào là?', options: ['ສິບເອັດ', 'ສິບສອງ', 'ສິບ'] },
      { question: 'Số "mười hai" trong tiếng Lào là?', options: ['ສິບສອງ', 'ສິບເອັດ', 'ສິບ'] },
      { question: 'Số "mười chín" trong tiếng Lào là?', options: ['ສິບເກົ້າ', 'ສິບສອງ', 'ສິບ'] },
      { question: 'Số "chín mươi chín" trong tiếng Lào là?', options: ['ເກົ້າສິບເກົ້າ', 'ສິບເກົ້າ', 'ສິບ'] },
      { question: 'Số "một trăm mười" trong tiếng Lào là?', options: ['ຮ້ອຍສິບ', 'ຮ້ອຍ', 'ສິບ'] },
      { question: 'Số "hai trăm" trong tiếng Lào là?', options: ['ສອງຮ້ອຍ', 'ຮ້ອຍ', 'ພັນ'] },
      { question: 'Số "mười nghìn" trong tiếng Lào là?', options: ['ໝື່ນ', 'ພັນ', 'ຮ້ອຍ'] },
      { question: 'Số "một trăm nghìn" trong tiếng Lào là?', options: ['ແສນ', 'ໝື່ນ', 'ພັນ'] },
      { question: 'Số "sáu trăm" trong tiếng Lào là?', options: ['ຫົກຮ້ອຍ', 'ຮ້ອຍ', 'ສີ່'] },
      { question: 'Số "hai nghìn" trong tiếng Lào là?', options: ['ສອງພັນ', 'ພັນ', 'ຮ້ອຍ'] }
    ]
  },
};

export default numbers; 