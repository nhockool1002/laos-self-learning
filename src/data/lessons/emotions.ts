import { Lesson } from './types';

const emotions: Lesson = {
  id: 'emotions',
  title: 'Cảm xúc',
  description: 'Học từ vựng về các cảm xúc trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ຄວາມຮູ້ສຶກ', pronunciation: 'khwam hu suk', meaning: 'Cảm xúc', example: 'ຄວາມຮູ້ສຶກຫຍັງ? (Cảm xúc gì?)' },
      { word: 'ດີໃຈ', pronunciation: 'di chai', meaning: 'Vui', example: 'ຂ້ອຍດີໃຈ (Tôi vui)' },
      { word: 'ເສົ້າໃຈ', pronunciation: 'sao chai', meaning: 'Buồn', example: 'ຂ້ອຍເສົ້າໃຈ (Tôi buồn)' },
      { word: 'ໂກດ', pronunciation: 'kot', meaning: 'Giận', example: 'ຂ້ອຍໂກດ (Tôi giận)' },
      { word: 'ຢ້ານ', pronunciation: 'yan', meaning: 'Sợ', example: 'ຂ້ອຍຢ້ານ (Tôi sợ)' },
      { word: 'ຮັກ', pronunciation: 'hak', meaning: 'Yêu', example: 'ຂ້ອຍຮັກເຈົ້າ (Tôi yêu bạn)' },
      { word: 'ຊັງ', pronunciation: 'sang', meaning: 'Ghét', example: 'ຂ້ອຍຊັງເຈົ້າ (Tôi ghét bạn)' },
      { word: 'ຄຽດ', pronunciation: 'khiad', meaning: 'Căng thẳng', example: 'ຂ້ອຍຄຽດ (Tôi căng thẳng)' },
      { word: 'ສະບາຍ', pronunciation: 'sa bai', meaning: 'Thoải mái', example: 'ຂ້ອຍສະບາຍ (Tôi thoải mái)' },
      { word: 'ຕື່ນເຕັ້ນ', pronunciation: 'tun ten', meaning: 'Phấn khích', example: 'ຂ້ອຍຕື່ນເຕັ້ນ (Tôi phấn khích)' },
      { word: 'ເບື່ອ', pronunciation: 'buea', meaning: 'Chán', example: 'ຂ້ອຍເບື່ອ (Tôi chán)' },
      { word: 'ສົນໃຈ', pronunciation: 'son chai', meaning: 'Thích thú', example: 'ຂ້ອຍສົນໃຈ (Tôi thích thú)' },
      { word: 'ສັບສົນ', pronunciation: 'sap son', meaning: 'Bối rối', example: 'ຂ້ອຍສັບສົນ (Tôi bối rối)' },
      { word: 'ສະຫງົບ', pronunciation: 'sa ngop', meaning: 'Bình tĩnh', example: 'ຂ້ອຍສະຫງົບ (Tôi bình tĩnh)' },
      { word: 'ຮູ້ສຶກດີ', pronunciation: 'hu suk di', meaning: 'Cảm thấy tốt', example: 'ຂ້ອຍຮູ້ສຶກດີ (Tôi cảm thấy tốt)' },
      { word: 'ຮູ້ສຶກບໍ່ດີ', pronunciation: 'hu suk bo di', meaning: 'Cảm thấy không tốt', example: 'ຂ້ອຍຮູ້ສຶກບໍ່ດີ (Tôi cảm thấy không tốt)' },
      { word: 'ຮູ້ສຶກດີຫຼາຍ', pronunciation: 'hu suk di lai', meaning: 'Cảm thấy rất tốt', example: 'ຂ້ອຍຮູ້ສຶກດີຫຼາຍ (Tôi cảm thấy rất tốt)' },
      { word: 'ຮູ້ສຶກບໍ່ດີຫຼາຍ', pronunciation: 'hu suk bo di lai', meaning: 'Cảm thấy rất không tốt', example: 'ຂ້ອຍຮູ້ສຶກບໍ່ດີຫຼາຍ (Tôi cảm thấy rất không tốt)' },
      { word: 'ຮູ້ສຶກດີຫຼາຍຫຼາຍ', pronunciation: 'hu suk di lai lai', meaning: 'Cảm thấy rất rất tốt', example: 'ຂ້ອຍຮູ້ສຶກດີຫຼາຍຫຼາຍ (Tôi cảm thấy rất rất tốt)' },
      { word: 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍ', pronunciation: 'hu suk bo di lai lai', meaning: 'Cảm thấy rất rất rất không tốt', example: 'ຂ້ອຍຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍ (Tôi cảm thấy rất rất rất không tốt)' },
      { word: 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hu suk di lai lai lai', meaning: 'Cảm thấy rất rất rất rất tốt', example: 'ຂ້ອຍຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍ (Tôi cảm thấy rất rất rất rất tốt)' },
      { word: 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hu suk bo di lai lai lai', meaning: 'Cảm thấy rất rất rất rất không tốt', example: 'ຂ້ອຍຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍ (Tôi cảm thấy rất rất rất rất không tốt)' },
      { word: 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hu suk di lai lai lai lai', meaning: 'Cảm thấy rất rất rất rất rất tốt', example: 'ຂ້ອຍຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Tôi cảm thấy rất rất rất rất rất tốt)' },
      { word: 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', pronunciation: 'hu suk bo di lai lai lai lai', meaning: 'Cảm thấy rất rất rất rất rất không tốt', example: 'ຂ້ອຍຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ (Tôi cảm thấy rất rất rất rất rất không tốt)' }
    ],
    grammar: [
      {
        title: 'Cách hỏi về cảm xúc',
        explanation: 'Dùng "ຄວາມຮູ້ສຶກຫຍັງ?" để hỏi về cảm xúc.',
        structure: 'ຄວາມຮູ້ສຶກຫຍັງ?',
        examples: [
          'ຄວາມຮູ້ສຶກຫຍັງ? (Cảm xúc gì?)',
          'ເຈົ້າຮູ້ສຶກຫຍັງ? (Bạn cảm thấy gì?)'
        ]
      },
      {
        title: 'Cách nói về cảm xúc',
        explanation: 'Khi nói về cảm xúc, dùng "ຂ້ອຍ" + [từ chỉ cảm xúc].',
        structure: 'ຂ້ອຍ + [từ chỉ cảm xúc]',
        examples: [
          'ຂ້ອຍດີໃຈ (Tôi vui)',
          'ຂ້ອຍເສົ້າໃຈ (Tôi buồn)',
          'ຂ້ອຍໂກດ (Tôi giận)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Cảm xúc"?', options: ['ຄວາມຮູ້ສຶກ', 'ດີໃຈ', 'ເສົ້າໃຈ'] },
      { question: 'Từ nào có nghĩa là "Vui"?', options: ['ດີໃຈ', 'ເສົ້າໃຈ', 'ໂກດ'] },
      { question: 'Từ nào có nghĩa là "Buồn"?', options: ['ເສົ້າໃຈ', 'ດີໃຈ', 'ໂກດ'] },
      { question: 'Từ nào có nghĩa là "Giận"?', options: ['ໂກດ', 'ດີໃຈ', 'ເສົ້າໃຈ'] },
      { question: 'Từ nào có nghĩa là "Sợ"?', options: ['ຢ້ານ', 'ໂກດ', 'ດີໃຈ'] },
      { question: 'Từ nào có nghĩa là "Yêu"?', options: ['ຮັກ', 'ຢ້ານ', 'ໂກດ'] },
      { question: 'Từ nào có nghĩa là "Ghét"?', options: ['ຊັງ', 'ຮັກ', 'ຢ້ານ'] },
      { question: 'Từ nào có nghĩa là "Căng thẳng"?', options: ['ຄຽດ', 'ຊັງ', 'ຮັກ'] },
      { question: 'Từ nào có nghĩa là "Thoải mái"?', options: ['ສະບາຍ', 'ຄຽດ', 'ຊັງ'] },
      { question: 'Từ nào có nghĩa là "Phấn khích"?', options: ['ຕື່ນເຕັ້ນ', 'ສະບາຍ', 'ຄຽດ'] },
      { question: 'Từ nào có nghĩa là "Chán"?', options: ['ເບື່ອ', 'ຕື່ນເຕັ້ນ', 'ສະບາຍ'] },
      { question: 'Từ nào có nghĩa là "Thích thú"?', options: ['ສົນໃຈ', 'ເບື່ອ', 'ຕື່ນເຕັ້ນ'] },
      { question: 'Từ nào có nghĩa là "Bối rối"?', options: ['ສັບສົນ', 'ສົນໃຈ', 'ເບື່ອ'] },
      { question: 'Từ nào có nghĩa là "Bình tĩnh"?', options: ['ສະຫງົບ', 'ສັບສົນ', 'ສົນໃຈ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy tốt"?', options: ['ຮູ້ສຶກດີ', 'ສະຫງົບ', 'ສັບສົນ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy không tốt"?', options: ['ຮູ້ສຶກບໍ່ດີ', 'ຮູ້ສຶກດີ', 'ສະຫງົບ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất tốt"?', options: ['ຮູ້ສຶກດີຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີ', 'ຮູ້ສຶກດີ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất không tốt"?', options: ['ຮູ້ສຶກບໍ່ດີຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất tốt"?', options: ['ຮູ້ສຶກດີຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất không tốt"?', options: ['ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất rất tốt"?', options: ['ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất rất không tốt"?', options: ['ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất rất rất tốt"?', options: ['ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất rất rất không tốt"?', options: ['ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất rất rất rất tốt"?', options: ['ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Cảm thấy rất rất rất rất rất không tốt"?', options: ['ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍຫຼາຍ', 'ຮູ້ສຶກບໍ່ດີຫຼາຍຫຼາຍຫຼາຍຫຼາຍ'] }
    ]
  },
};

export default emotions; 