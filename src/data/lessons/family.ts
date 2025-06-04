import { Lesson } from './types';

const family: Lesson = {
  id: 'family',
  title: 'Gia đình',
  description: 'Học từ vựng về các thành viên trong gia đình bằng tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ຄອບຄົວ', pronunciation: 'khob khua', meaning: 'Gia đình', example: 'ຄອບຄົວຂອງຂ້ອຍ (Gia đình của tôi)' },
      { word: 'ພໍ່', pronunciation: 'pho', meaning: 'Bố', example: 'ພໍ່ຂອງຂ້ອຍ (Bố của tôi)' },
      { word: 'ແມ່', pronunciation: 'mae', meaning: 'Mẹ', example: 'ແມ່ຂອງຂ້ອຍ (Mẹ của tôi)' },
      { word: 'ພໍ່ແມ່', pronunciation: 'pho mae', meaning: 'Bố mẹ', example: 'ພໍ່ແມ່ຂອງຂ້ອຍ (Bố mẹ của tôi)' },
      { word: 'ອ້າຍ', pronunciation: 'ai', meaning: 'Anh trai', example: 'ອ້າຍຂອງຂ້ອຍ (Anh trai của tôi)' },
      { word: 'ເອື້ອຍ', pronunciation: 'euay', meaning: 'Chị gái', example: 'ເອື້ອຍຂອງຂ້ອຍ (Chị gái của tôi)' },
      { word: 'ນ້ອງຊາຍ', pronunciation: 'noi sai', meaning: 'Em trai', example: 'ນ້ອງຊາຍຂອງຂ້ອຍ (Em trai của tôi)' },
      { word: 'ນ້ອງສາວ', pronunciation: 'noi sao', meaning: 'Em gái', example: 'ນ້ອງສາວຂອງຂ້ອຍ (Em gái của tôi)' },
      { word: 'ລູກຊາຍ', pronunciation: 'luk sai', meaning: 'Con trai', example: 'ລູກຊາຍຂອງຂ້ອຍ (Con trai của tôi)' },
      { word: 'ລູກສາວ', pronunciation: 'luk sao', meaning: 'Con gái', example: 'ລູກສາວຂອງຂ້ອຍ (Con gái của tôi)' },
      { word: 'ປູ່', pronunciation: 'pu', meaning: 'Ông nội', example: 'ປູ່ຂອງຂ້ອຍ (Ông nội của tôi)' },
      { word: 'ຍ່າ', pronunciation: 'ya', meaning: 'Bà nội', example: 'ຍ່າຂອງຂ້ອຍ (Bà nội của tôi)' },
      { word: 'ຕາ', pronunciation: 'ta', meaning: 'Ông ngoại', example: 'ຕາຂອງຂ້ອຍ (Ông ngoại của tôi)' },
      { word: 'ຍ່າ', pronunciation: 'ya', meaning: 'Bà ngoại', example: 'ຍ່າຂອງຂ້ອຍ (Bà ngoại của tôi)' },
      { word: 'ລຸງ', pronunciation: 'lung', meaning: 'Chú/Cậu', example: 'ລຸງຂອງຂ້ອຍ (Chú của tôi)' },
      { word: 'ປ້າ', pronunciation: 'pa', meaning: 'Cô/Dì', example: 'ປ້າຂອງຂ້ອຍ (Cô của tôi)' },
      { word: 'ພໍ່ເຖົ້າ', pronunciation: 'pho thao', meaning: 'Ông', example: 'ພໍ່ເຖົ້າຂອງຂ້ອຍ (Ông của tôi)' },
      { word: 'ແມ່ເຖົ້າ', pronunciation: 'mae thao', meaning: 'Bà', example: 'ແມ່ເຖົ້າຂອງຂ້ອຍ (Bà của tôi)' },
      { word: 'ພໍ່ຕູ້', pronunciation: 'pho tu', meaning: 'Bố vợ', example: 'ພໍ່ຕູ້ຂອງຂ້ອຍ (Bố vợ của tôi)' },
      { word: 'ແມ່ຕູ້', pronunciation: 'mae tu', meaning: 'Mẹ vợ', example: 'ແມ່ຕູ້ຂອງຂ້ອຍ (Mẹ vợ của tôi)' },
      { word: 'ພໍ່ເມັຽ', pronunciation: 'pho mia', meaning: 'Bố chồng', example: 'ພໍ່ເມັຽຂອງຂ້ອຍ (Bố chồng của tôi)' },
      { word: 'ແມ່ເມັຽ', pronunciation: 'mae mia', meaning: 'Mẹ chồng', example: 'ແມ່ເມັຽຂອງຂ້ອຍ (Mẹ chồng của tôi)' },
      { word: 'ຜົວ', pronunciation: 'phua', meaning: 'Chồng', example: 'ຜົວຂອງຂ້ອຍ (Chồng của tôi)' },
      { word: 'ເມຍ', pronunciation: 'mia', meaning: 'Vợ', example: 'ເມຍຂອງຂ້ອຍ (Vợ của tôi)' },
      { word: 'ພີ່ນ້ອງ', pronunciation: 'phi noi', meaning: 'Anh chị em', example: 'ພີ່ນ້ອງຂອງຂ້ອຍ (Anh chị em của tôi)' },
    ],
    grammar: [
      {
        title: 'Cách nói về gia đình',
        explanation: 'Khi nói về thành viên gia đình, thêm "ຂອງຂ້ອຍ" (của tôi) sau từ chỉ quan hệ.',
        structure: '[Từ chỉ quan hệ] + ຂອງຂ້ອຍ',
        examples: [
          'ພໍ່ຂອງຂ້ອຍ (Bố của tôi)',
          'ແມ່ຂອງຂ້ອຍ (Mẹ của tôi)',
          'ອ້າຍຂອງຂ້ອຍ (Anh trai của tôi)'
        ]
      },
      {
        title: 'Hỏi về gia đình',
        explanation: 'Dùng câu hỏi "ຄອບຄົວຂອງທ່ານມີຫຍັງແດ່?" để hỏi về gia đình.',
        structure: 'ຄອບຄົວຂອງທ່ານມີຫຍັງແດ່?',
        examples: [
          'ຄອບຄົວຂອງທ່ານມີຫຍັງແດ່? (Gia đình bạn có những ai?)',
          'ທ່ານມີພີ່ນ້ອງຫຼາຍບໍ່? (Bạn có nhiều anh chị em không?)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Gia đình"?', options: ['ຄອບຄົວ', 'ພໍ່', 'ແມ່'] },
      { question: 'Từ nào có nghĩa là "Bố"?', options: ['ພໍ່', 'ແມ່', 'ອ້າຍ'] },
      { question: 'Từ nào có nghĩa là "Mẹ"?', options: ['ແມ່', 'ພໍ່', 'ເອື້ອຍ'] },
      { question: 'Từ nào có nghĩa là "Anh trai"?', options: ['ອ້າຍ', 'ເອື້ອຍ', 'ນ້ອງຊາຍ'] },
      { question: 'Từ nào có nghĩa là "Chị gái"?', options: ['ເອື້ອຍ', 'ອ້າຍ', 'ນ້ອງສາວ'] },
      { question: 'Từ nào có nghĩa là "Em trai"?', options: ['ນ້ອງຊາຍ', 'ນ້ອງສາວ', 'ອ້າຍ'] },
      { question: 'Từ nào có nghĩa là "Em gái"?', options: ['ນ້ອງສາວ', 'ນ້ອງຊາຍ', 'ເອື້ອຍ'] },
      { question: 'Từ nào có nghĩa là "Con trai"?', options: ['ລູກຊາຍ', 'ລູກສາວ', 'ພໍ່'] },
      { question: 'Từ nào có nghĩa là "Con gái"?', options: ['ລູກສາວ', 'ລູກຊາຍ', 'ແມ່'] },
      { question: 'Từ nào có nghĩa là "Ông nội"?', options: ['ປູ່', 'ຍ່າ', 'ຕາ'] },
      { question: 'Từ nào có nghĩa là "Bà nội"?', options: ['ຍ່າ', 'ປູ່', 'ຕາ'] },
      { question: 'Từ nào có nghĩa là "Ông ngoại"?', options: ['ຕາ', 'ຍ່າ', 'ປູ່'] },
      { question: 'Từ nào có nghĩa là "Bà ngoại"?', options: ['ຍ່າ', 'ຕາ', 'ປູ່'] },
      { question: 'Từ nào có nghĩa là "Chú/Cậu"?', options: ['ລຸງ', 'ປ້າ', 'ອ້າຍ'] },
      { question: 'Từ nào có nghĩa là "Cô/Dì"?', options: ['ປ້າ', 'ລຸງ', 'ເອື້ອຍ'] },
      { question: 'Từ nào có nghĩa là "Ông"?', options: ['ພໍ່ເຖົ້າ', 'ແມ່ເຖົ້າ', 'ປູ່'] },
      { question: 'Từ nào có nghĩa là "Bà"?', options: ['ແມ່ເຖົ້າ', 'ພໍ່ເຖົ້າ', 'ຍ່າ'] },
      { question: 'Từ nào có nghĩa là "Bố vợ"?', options: ['ພໍ່ຕູ້', 'ແມ່ຕູ້', 'ພໍ່ເມັຽ'] },
      { question: 'Từ nào có nghĩa là "Mẹ vợ"?', options: ['ແມ່ຕູ້', 'ພໍ່ຕູ້', 'ແມ່ເມັຽ'] },
      { question: 'Từ nào có nghĩa là "Bố chồng"?', options: ['ພໍ່ເມັຽ', 'ແມ່ເມັຽ', 'ພໍ່ຕູ້'] },
      { question: 'Từ nào có nghĩa là "Mẹ chồng"?', options: ['ແມ່ເມັຽ', 'ພໍ່ເມັຽ', 'ແມ່ຕູ້'] },
      { question: 'Từ nào có nghĩa là "Chồng"?', options: ['ຜົວ', 'ເມຍ', 'ພໍ່'] },
      { question: 'Từ nào có nghĩa là "Vợ"?', options: ['ເມຍ', 'ຜົວ', 'ແມ່'] },
      { question: 'Từ nào có nghĩa là "Anh chị em"?', options: ['ພີ່ນ້ອງ', 'ຄອບຄົວ', 'ພໍ່ແມ່'] }
    ]
  },
};

export default family; 