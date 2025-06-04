import { Lesson } from './types';

const transportation: Lesson = {
  id: 'transportation',
  title: 'Phương tiện giao thông',
  description: 'Học từ vựng về các phương tiện giao thông trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ລົດ', pronunciation: 'lot', meaning: 'Xe', example: 'ລົດຫຍັງ? (Xe gì?)' },
      { word: 'ລົດຈັກ', pronunciation: 'lot chak', meaning: 'Xe máy', example: 'ລົດຈັກ (Xe máy)' },
      { word: 'ລົດຖີບ', pronunciation: 'lot thip', meaning: 'Xe đạp', example: 'ລົດຖີບ (Xe đạp)' },
      { word: 'ລົດເກັງ', pronunciation: 'lot keng', meaning: 'Xe tải', example: 'ລົດເກັງ (Xe tải)' },
      { word: 'ລົດບັນທຸກ', pronunciation: 'lot banthuk', meaning: 'Xe vận tải', example: 'ລົດບັນທຸກ (Xe vận tải)' },
      { word: 'ລົດຕູ້', pronunciation: 'lot tu', meaning: 'Xe tải', example: 'ລົດຕູ້ (Xe tải)' },
      { word: 'ລົດຕູ້ຂະໜາດນ້ອຍ', pronunciation: 'lot tu khanat noy', meaning: 'Xe tải nhỏ', example: 'ລົດຕູ້ຂະໜາດນ້ອຍ (Xe tải nhỏ)' },
      { word: 'ລົດຕູ້ຂະໜາດໃຫຍ່', pronunciation: 'lot tu khanat nyai', meaning: 'Xe tải lớn', example: 'ລົດຕູ້ຂະໜາດໃຫຍ່ (Xe tải lớn)' },
      { word: 'ລົດຕູ້ຂະໜາດກາງ', pronunciation: 'lot tu khanat kang', meaning: 'Xe tải trung bình', example: 'ລົດຕູ້ຂະໜາດກາງ (Xe tải trung bình)' },
      { word: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍ', pronunciation: 'lot tu khanat nyai lai', meaning: 'Xe tải rất lớn', example: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍ (Xe tải rất lớn)' },
      { word: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍ', pronunciation: 'lot tu khanat noy lai', meaning: 'Xe tải rất nhỏ', example: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍ (Xe tải rất nhỏ)' },
      { word: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍ', pronunciation: 'lot tu khanat kang lai', meaning: 'Xe tải rất trung bình', example: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍ (Xe tải rất trung bình)' },
      { word: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat nyai lai lai', meaning: 'Xe tải rất rất lớn', example: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍ (Xe tải rất rất lớn)' },
      { word: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat noy lai lai lai', meaning: 'Xe tải rất rất rất nhỏ', example: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất nhỏ)' },
      { word: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat kang lai lai lai', meaning: 'Xe tải rất rất rất trung bình', example: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất trung bình)' },
      { word: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat nyai lai lai lai lai', meaning: 'Xe tải rất rất rất rất lớn', example: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất rất lớn)' },
      { word: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat noy lai lai lai lai', meaning: 'Xe tải rất rất rất rất nhỏ', example: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất rất nhỏ)' },
      { word: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat kang lai lai lai lai', meaning: 'Xe tải rất rất rất rất trung bình', example: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất rất trung bình)' },
      { word: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat nyai lai lai lai lai lai', meaning: 'Xe tải rất rất rất rất rất lớn', example: 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất rất rất lớn)' },
      { word: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat noy lai lai lai lai lai', meaning: 'Xe tải rất rất rất rất rất nhỏ', example: 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất rất rất nhỏ)' },
      { word: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'lot tu khanat kang lai lai lai lai lai', meaning: 'Xe tải rất rất rất rất rất trung bình', example: 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Xe tải rất rất rất rất rất trung bình)' }
    ],
    grammar: [
      {
        title: 'Cách hỏi về phương tiện giao thông',
        explanation: 'Dùng "ລົດຫຍັງ?" để hỏi về phương tiện giao thông.',
        structure: 'ລົດຫຍັງ?',
        examples: [
          'ລົດຫຍັງ? (Xe gì?)',
          'ນີ້ລົດຫຍັງ? (Đây là xe gì?)'
        ]
      },
      {
        title: 'Cách nói về phương tiện giao thông',
        explanation: 'Khi nói về phương tiện giao thông, dùng "ລົດ" trước tên phương tiện.',
        structure: 'ລົດ + [tên phương tiện]',
        examples: [
          'ລົດຈັກ (Xe máy)',
          'ລົດຖີບ (Xe đạp)',
          'ລົດເກັງ (Xe tải)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Xe"?', options: ['ລົດ', 'ລົດຈັກ', 'ລົດຖີບ'] },
      { question: 'Từ nào có nghĩa là "Xe máy"?', options: ['ລົດຈັກ', 'ລົດຖີບ', 'ລົດເກັງ'] },
      { question: 'Từ nào có nghĩa là "Xe đạp"?', options: ['ລົດຖີບ', 'ລົດຈັກ', 'ລົດເກັງ'] },
      { question: 'Từ nào có nghĩa là "Xe tải"?', options: ['ລົດເກັງ', 'ລົດຈັກ', 'ລົດຖີບ'] },
      { question: 'Từ nào có nghĩa là "Xe vận tải"?', options: ['ລົດບັນທຸກ', 'ລົດເກັງ', 'ລົດຕູ້'] },
      { question: 'Từ nào có nghĩa là "Xe tải"?', options: ['ລົດຕູ້', 'ລົດບັນທຸກ', 'ລົດເກັງ'] },
      { question: 'Từ nào có nghĩa là "Xe tải nhỏ"?', options: ['ລົດຕູ້ຂະໜາດນ້ອຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່', 'ລົດຕູ້ຂະໜາດກາງ'] },
      { question: 'Từ nào có nghĩa là "Xe tải lớn"?', options: ['ລົດຕູ້ຂະໜາດໃຫຍ່', 'ລົດຕູ້ຂະໜາດນ້ອຍ', 'ລົດຕູ້ຂະໜາດກາງ'] },
      { question: 'Từ nào có nghĩa là "Xe tải trung bình"?', options: ['ລົດຕູ້ຂະໜາດກາງ', 'ລົດຕູ້ຂະໜາດນ້ອຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất lớn"?', options: ['ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất nhỏ"?', options: ['ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất trung bình"?', options: ['ລົດຕູ້ຂະໜາດກາງຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất lớn"?', options: ['ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất nhỏ"?', options: ['ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất trung bình"?', options: ['ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất lớn"?', options: ['ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất nhỏ"?', options: ['ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất trung bình"?', options: ['ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất rất lớn"?', options: ['ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất rất nhỏ"?', options: ['ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất rất rất trung bình"?', options: ['ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất rất rất lớn"?', options: ['ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất rất rất nhỏ"?', options: ['ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Xe tải rất rất rất rất rất trung bình"?', options: ['ລົດຕູ້ຂະໜາດກາງຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດນ້ອຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ລົດຕູ້ຂະໜາດໃຫຍ່ຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] }
    ]
  },
};

export default transportation; 