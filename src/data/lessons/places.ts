import { Lesson } from './types';

const places: Lesson = {
  id: 'places',
  title: 'Địa điểm',
  description: 'Học từ vựng về các địa điểm trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ສະຖານທີ່', pronunciation: 'sathan thi', meaning: 'Địa điểm', example: 'ສະຖານທີ່ຫຍັງ? (Địa điểm gì?)' },
      { word: 'ບ້ານ', pronunciation: 'ban', meaning: 'Làng', example: 'ບ້ານ (Làng)' },
      { word: 'ເມືອງ', pronunciation: 'muang', meaning: 'Thành phố', example: 'ເມືອງ (Thành phố)' },
      { word: 'ຫ້ອງ', pronunciation: 'hong', meaning: 'Phòng', example: 'ຫ້ອງ (Phòng)' },
      { word: 'ຫ້ອງນອນ', pronunciation: 'hong non', meaning: 'Phòng ngủ', example: 'ຫ້ອງນອນ (Phòng ngủ)' },
      { word: 'ຫ້ອງກິນເຂົ້າ', pronunciation: 'hong kin khao', meaning: 'Phòng ăn', example: 'ຫ້ອງກິນເຂົ້າ (Phòng ăn)' },
      { word: 'ຫ້ອງຄົວ', pronunciation: 'hong khua', meaning: 'Nhà bếp', example: 'ຫ້ອງຄົວ (Nhà bếp)' },
      { word: 'ຫ້ອງນ້ຳ', pronunciation: 'hong nam', meaning: 'Nhà tắm', example: 'ຫ້ອງນ້ຳ (Nhà tắm)' },
      { word: 'ຫ້ອງສຸກ', pronunciation: 'hong suk', meaning: 'Nhà vệ sinh', example: 'ຫ້ອງສຸກ (Nhà vệ sinh)' },
      { word: 'ຫ້ອງຮຽນ', pronunciation: 'hong hian', meaning: 'Phòng học', example: 'ຫ້ອງຮຽນ (Phòng học)' },
      { word: 'ຫ້ອງການ', pronunciation: 'hong kan', meaning: 'Văn phòng', example: 'ຫ້ອງການ (Văn phòng)' },
      { word: 'ຫ້ອງການສູງ', pronunciation: 'hong kan sung', meaning: 'Văn phòng cao cấp', example: 'ຫ້ອງການສູງ (Văn phòng cao cấp)' },
      { word: 'ຫ້ອງການຕ່ຳ', pronunciation: 'hong kan tam', meaning: 'Văn phòng thấp cấp', example: 'ຫ້ອງການຕ່ຳ (Văn phòng thấp cấp)' },
      { word: 'ຫ້ອງການກາງ', pronunciation: 'hong kan kang', meaning: 'Văn phòng trung cấp', example: 'ຫ້ອງການກາງ (Văn phòng trung cấp)' },
      { word: 'ຫ້ອງການສູງຫຼາຍ', pronunciation: 'hong kan sung lai', meaning: 'Văn phòng rất cao cấp', example: 'ຫ້ອງການສູງຫຼາຍ (Văn phòng rất cao cấp)' },
      { word: 'ຫ້ອງການຕ່ຳຫຼາຍ', pronunciation: 'hong kan tam lai', meaning: 'Văn phòng rất thấp cấp', example: 'ຫ້ອງການຕ່ຳຫຼາຍ (Văn phòng rất thấp cấp)' },
      { word: 'ຫ້ອງການກາງຫຼາຍ', pronunciation: 'hong kan kang lai', meaning: 'Văn phòng rất trung cấp', example: 'ຫ້ອງການກາງຫຼາຍ (Văn phòng rất trung cấp)' },
      { word: 'ຫ້ອງການສູງຫຼາຍຫຼາຍ', pronunciation: 'hong kan sung lai lai', meaning: 'Văn phòng rất rất cao cấp', example: 'ຫ້ອງການສູງຫຼາຍຫຼາຍ (Văn phòng rất rất cao cấp)' },
      { word: 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍ', pronunciation: 'hong kan tam lai lai', meaning: 'Văn phòng rất rất rất thấp cấp', example: 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍ (Văn phòng rất rất rất thấp cấp)' },
      { word: 'ຫ້ອງການກາງຫຼາຍຫຼາຍ', pronunciation: 'hong kan kang lai lai', meaning: 'Văn phòng rất rất rất trung cấp', example: 'ຫ້ອງການກາງຫຼາຍຫຼາຍ (Văn phòng rất rất rất trung cấp)' },
      { word: 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hong kan sung lai lai lai', meaning: 'Văn phòng rất rất rất rất cao cấp', example: 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍ (Văn phòng rất rất rất rất cao cấp)' },
      { word: 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hong kan tam lai lai lai', meaning: 'Văn phòng rất rất rất rất thấp cấp', example: 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍ (Văn phòng rất rất rất rất thấp cấp)' },
      { word: 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hong kan kang lai lai lai', meaning: 'Văn phòng rất rất rất rất trung cấp', example: 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Văn phòng rất rất rất rất trung cấp)' },
      { word: 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hong kan sung lai lai lai lai', meaning: 'Văn phòng rất rất rất rất rất cao cấp', example: 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Văn phòng rất rất rất rất cao cấp)' },
      { word: 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hong kan tam lai lai lai lai', meaning: 'Văn phòng rất rất rất rất rất thấp cấp', example: 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Văn phòng rất rất rất rất thấp cấp)' },
      { word: 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hong kan kang lai lai lai lai', meaning: 'Văn phòng rất rất rất rất rất trung cấp', example: 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Văn phòng rất rất rất rất trung cấp)' }
    ],
    grammar: [
      {
        title: 'Cách hỏi về địa điểm',
        explanation: 'Dùng "ສະຖານທີ່ຫຍັງ?" để hỏi về địa điểm.',
        structure: 'ສະຖານທີ່ຫຍັງ?',
        examples: [
          'ສະຖານທີ່ຫຍັງ? (Địa điểm gì?)',
          'ນີ້ສະຖານທີ່ຫຍັງ? (Đây là địa điểm gì?)'
        ]
      },
      {
        title: 'Cách nói về địa điểm',
        explanation: 'Khi nói về địa điểm, dùng "ສະຖານທີ່" trước tên địa điểm.',
        structure: 'ສະຖານທີ່ + [tên địa điểm]',
        examples: [
          'ສະຖານທີ່ບ້ານ (Địa điểm làng)',
          'ສະຖານທີ່ເມືອງ (Địa điểm thành phố)',
          'ສະຖານທີ່ຫ້ອງ (Địa điểm phòng)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Địa điểm"?', options: ['ສະຖານທີ່', 'ບ້ານ', 'ເມືອງ'] },
      { question: 'Từ nào có nghĩa là "Làng"?', options: ['ບ້ານ', 'ເມືອງ', 'ຫ້ອງ'] },
      { question: 'Từ nào có nghĩa là "Thành phố"?', options: ['ເມືອງ', 'ບ້ານ', 'ຫ້ອງ'] },
      { question: 'Từ nào có nghĩa là "Phòng"?', options: ['ຫ້ອງ', 'ບ້ານ', 'ເມືອງ'] },
      { question: 'Từ nào có nghĩa là "Phòng ngủ"?', options: ['ຫ້ອງນອນ', 'ຫ້ອງກິນເຂົ້າ', 'ຫ້ອງຄົວ'] },
      { question: 'Từ nào có nghĩa là "Phòng ăn"?', options: ['ຫ້ອງກິນເຂົ້າ', 'ຫ້ອງນອນ', 'ຫ້ອງຄົວ'] },
      { question: 'Từ nào có nghĩa là "Nhà bếp"?', options: ['ຫ້ອງຄົວ', 'ຫ້ອງນອນ', 'ຫ້ອງກິນເຂົ້າ'] },
      { question: 'Từ nào có nghĩa là "Nhà tắm"?', options: ['ຫ້ອງນ້ຳ', 'ຫ້ອງສຸກ', 'ຫ້ອງຮຽນ'] },
      { question: 'Từ nào có nghĩa là "Nhà vệ sinh"?', options: ['ຫ້ອງສຸກ', 'ຫ້ອງນ້ຳ', 'ຫ້ອງຮຽນ'] },
      { question: 'Từ nào có nghĩa là "Phòng học"?', options: ['ຫ້ອງຮຽນ', 'ຫ້ອງນ້ຳ', 'ຫ້ອງສຸກ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng"?', options: ['ຫ້ອງການ', 'ຫ້ອງຮຽນ', 'ຫ້ອງນ້ຳ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng cao cấp"?', options: ['ຫ້ອງການສູງ', 'ຫ້ອງການຕ່ຳ', 'ຫ້ອງການກາງ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng thấp cấp"?', options: ['ຫ້ອງການຕ່ຳ', 'ຫ້ອງການສູງ', 'ຫ້ອງການກາງ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng trung cấp"?', options: ['ຫ້ອງການກາງ', 'ຫ້ອງການສູງ', 'ຫ້ອງການຕ່ຳ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất cao cấp"?', options: ['ຫ້ອງການສູງຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất thấp cấp"?', options: ['ຫ້ອງການຕ່ຳຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất trung cấp"?', options: ['ຫ້ອງການກາງຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất cao cấp"?', options: ['ຫ້ອງການສູງຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất thấp cấp"?', options: ['ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất trung cấp"?', options: ['ຫ້ອງການກາງຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất cao cấp"?', options: ['ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất thấp cấp"?', options: ['ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất trung cấp"?', options: ['ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất rất cao cấp"?', options: ['ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất rất thấp cấp"?', options: ['ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất rất trung cấp"?', options: ['ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất rất rất cao cấp"?', options: ['ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất rất rất thấp cấp"?', options: ['ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Văn phòng rất rất rất rất rất trung cấp"?', options: ['ຫ້ອງການກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການສູງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຫ້ອງການຕ່ຳຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] }
    ]
  },
};

export default places; 