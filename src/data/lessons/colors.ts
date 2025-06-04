import { Lesson } from './types';

const colors: Lesson = {
  id: 'colors',
  title: 'Màu sắc',
  description: 'Học từ vựng về các màu sắc trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ສີ', pronunciation: 'si', meaning: 'Màu', example: 'ສີຫຍັງ? (Màu gì?)' },
      { word: 'ສີຂາວ', pronunciation: 'si khao', meaning: 'Màu trắng', example: 'ສີຂາວ (Màu trắng)' },
      { word: 'ສີດຳ', pronunciation: 'si dam', meaning: 'Màu đen', example: 'ສີດຳ (Màu đen)' },
      { word: 'ສີແດງ', pronunciation: 'si daeng', meaning: 'Màu đỏ', example: 'ສີແດງ (Màu đỏ)' },
      { word: 'ສີຂຽວ', pronunciation: 'si khiao', meaning: 'Màu xanh lá', example: 'ສີຂຽວ (Màu xanh lá)' },
      { word: 'ສີຟ້າ', pronunciation: 'si fa', meaning: 'Màu xanh dương', example: 'ສີຟ້າ (Màu xanh dương)' },
      { word: 'ສີເຫຼືອງ', pronunciation: 'si lueang', meaning: 'Màu vàng', example: 'ສີເຫຼືອງ (Màu vàng)' },
      { word: 'ສີສົ້ມ', pronunciation: 'si som', meaning: 'Màu cam', example: 'ສີສົ້ມ (Màu cam)' },
      { word: 'ສີມ່ວງ', pronunciation: 'si muang', meaning: 'Màu tím', example: 'ສີມ່ວງ (Màu tím)' },
      { word: 'ສີນ້ຳຕານ', pronunciation: 'si nam tan', meaning: 'Màu nâu', example: 'ສີນ້ຳຕານ (Màu nâu)' },
      { word: 'ສີບົວ', pronunciation: 'si bua', meaning: 'Màu hồng', example: 'ສີບົວ (Màu hồng)' },
      { word: 'ສີເງິນ', pronunciation: 'si ngoen', meaning: 'Màu bạc', example: 'ສີເງິນ (Màu bạc)' },
      { word: 'ສີຄຳ', pronunciation: 'si kham', meaning: 'Màu vàng', example: 'ສີຄຳ (Màu vàng)' },
      { word: 'ສີອິນຊີ', pronunciation: 'si insi', meaning: 'Màu xám', example: 'ສີອິນຊີ (Màu xám)' },
      { word: 'ສີຟ້າອ່ອນ', pronunciation: 'si fa on', meaning: 'Màu xanh nhạt', example: 'ສີຟ້າອ່ອນ (Màu xanh nhạt)' },
      { word: 'ສີຂຽວອ່ອນ', pronunciation: 'si khiao on', meaning: 'Màu xanh lá nhạt', example: 'ສີຂຽວອ່ອນ (Màu xanh lá nhạt)' },
      { word: 'ສີແດງອ່ອນ', pronunciation: 'si daeng on', meaning: 'Màu đỏ nhạt', example: 'ສີແດງອ່ອນ (Màu đỏ nhạt)' },
      { word: 'ສີເຫຼືອງອ່ອນ', pronunciation: 'si lueang on', meaning: 'Màu vàng nhạt', example: 'ສີເຫຼືອງອ່ອນ (Màu vàng nhạt)' },
      { word: 'ສີສົ້ມອ່ອນ', pronunciation: 'si som on', meaning: 'Màu cam nhạt', example: 'ສີສົ້ມອ່ອນ (Màu cam nhạt)' },
      { word: 'ສີມ່ວງອ່ອນ', pronunciation: 'si muang on', meaning: 'Màu tím nhạt', example: 'ສີມ່ວງອ່ອນ (Màu tím nhạt)' },
      { word: 'ສີນ້ຳຕານອ່ອນ', pronunciation: 'si nam tan on', meaning: 'Màu nâu nhạt', example: 'ສີນ້ຳຕານອ່ອນ (Màu nâu nhạt)' },
      { word: 'ສີບົວອ່ອນ', pronunciation: 'si bua on', meaning: 'Màu hồng nhạt', example: 'ສີບົວອ່ອນ (Màu hồng nhạt)' },
      { word: 'ສີຟ້າເຂັ້ມ', pronunciation: 'si fa khem', meaning: 'Màu xanh đậm', example: 'ສີຟ້າເຂັ້ມ (Màu xanh đậm)' },
      { word: 'ສີຂຽວເຂັ້ມ', pronunciation: 'si khiao khem', meaning: 'Màu xanh lá đậm', example: 'ສີຂຽວເຂັ້ມ (Màu xanh lá đậm)' },
      { word: 'ສີແດງເຂັ້ມ', pronunciation: 'si daeng khem', meaning: 'Màu đỏ đậm', example: 'ສີແດງເຂັ້ມ (Màu đỏ đậm)' },
      { word: 'ສີເຫຼືອງເຂັ້ມ', pronunciation: 'si lueang khem', meaning: 'Màu vàng đậm', example: 'ສີເຫຼືອງເຂັ້ມ (Màu vàng đậm)' },
      { word: 'ສີສົ້ມເຂັ້ມ', pronunciation: 'si som khem', meaning: 'Màu cam đậm', example: 'ສີສົ້ມເຂັ້ມ (Màu cam đậm)' },
      { word: 'ສີມ່ວງເຂັ້ມ', pronunciation: 'si muang khem', meaning: 'Màu tím đậm', example: 'ສີມ່ວງເຂັ້ມ (Màu tím đậm)' },
      { word: 'ສີນ້ຳຕານເຂັ້ມ', pronunciation: 'si nam tan khem', meaning: 'Màu nâu đậm', example: 'ສີນ້ຳຕານເຂັ້ມ (Màu nâu đậm)' },
      { word: 'ສີບົວເຂັ້ມ', pronunciation: 'si bua khem', meaning: 'Màu hồng đậm', example: 'ສີບົວເຂັ້ມ (Màu hồng đậm)' },
    ],
    grammar: [
      {
        title: 'Cách hỏi màu sắc',
        explanation: 'Dùng "ສີຫຍັງ?" để hỏi về màu sắc.',
        structure: 'ສີຫຍັງ?',
        examples: [
          'ສີຫຍັງ? (Màu gì?)',
          'ນີ້ສີຫຍັງ? (Cái này màu gì?)'
        ]
      },
      {
        title: 'Cách nói về màu sắc',
        explanation: 'Khi nói về màu sắc, dùng "ສີ" trước tên màu.',
        structure: 'ສີ + [tên màu]',
        examples: [
          'ສີຂາວ (Màu trắng)',
          'ສີດຳ (Màu đen)',
          'ສີແດງ (Màu đỏ)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Màu"?', options: ['ສີ', 'ສີຂາວ', 'ສີດຳ'] },
      { question: 'Từ nào có nghĩa là "Màu trắng"?', options: ['ສີຂາວ', 'ສີດຳ', 'ສີແດງ'] },
      { question: 'Từ nào có nghĩa là "Màu đen"?', options: ['ສີດຳ', 'ສີຂາວ', 'ສີແດງ'] },
      { question: 'Từ nào có nghĩa là "Màu đỏ"?', options: ['ສີແດງ', 'ສີຂາວ', 'ສີດຳ'] },
      { question: 'Từ nào có nghĩa là "Màu xanh lá"?', options: ['ສີຂຽວ', 'ສີຟ້າ', 'ສີແດງ'] },
      { question: 'Từ nào có nghĩa là "Màu xanh dương"?', options: ['ສີຟ້າ', 'ສີຂຽວ', 'ສີແດງ'] },
      { question: 'Từ nào có nghĩa là "Màu vàng"?', options: ['ສີເຫຼືອງ', 'ສີສົ້ມ', 'ສີມ່ວງ'] },
      { question: 'Từ nào có nghĩa là "Màu cam"?', options: ['ສີສົ້ມ', 'ສີເຫຼືອງ', 'ສີມ່ວງ'] },
      { question: 'Từ nào có nghĩa là "Màu tím"?', options: ['ສີມ່ວງ', 'ສີສົ້ມ', 'ສີເຫຼືອງ'] },
      { question: 'Từ nào có nghĩa là "Màu nâu"?', options: ['ສີນ້ຳຕານ', 'ສີບົວ', 'ສີເງິນ'] },
      { question: 'Từ nào có nghĩa là "Màu hồng"?', options: ['ສີບົວ', 'ສີນ້ຳຕານ', 'ສີເງິນ'] },
      { question: 'Từ nào có nghĩa là "Màu bạc"?', options: ['ສີເງິນ', 'ສີຄຳ', 'ສີອິນຊີ'] },
      { question: 'Từ nào có nghĩa là "Màu vàng"?', options: ['ສີຄຳ', 'ສີເງິນ', 'ສີອິນຊີ'] },
      { question: 'Từ nào có nghĩa là "Màu xám"?', options: ['ສີອິນຊີ', 'ສີເງິນ', 'ສີຄຳ'] },
      { question: 'Từ nào có nghĩa là "Màu xanh nhạt"?', options: ['ສີຟ້າອ່ອນ', 'ສີຂຽວອ່ອນ', 'ສີແດງອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu xanh lá nhạt"?', options: ['ສີຂຽວອ່ອນ', 'ສີຟ້າອ່ອນ', 'ສີແດງອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu đỏ nhạt"?', options: ['ສີແດງອ່ອນ', 'ສີຟ້າອ່ອນ', 'ສີຂຽວອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu vàng nhạt"?', options: ['ສີເຫຼືອງອ່ອນ', 'ສີສົ້ມອ່ອນ', 'ສີມ່ວງອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu cam nhạt"?', options: ['ສີສົ້ມອ່ອນ', 'ສີເຫຼືອງອ່ອນ', 'ສີມ່ວງອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu tím nhạt"?', options: ['ສີມ່ວງອ່ອນ', 'ສີສົ້ມອ່ອນ', 'ສີເຫຼືອງອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu nâu nhạt"?', options: ['ສີນ້ຳຕານອ່ອນ', 'ສີບົວອ່ອນ', 'ສີເງິນອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu hồng nhạt"?', options: ['ສີບົວອ່ອນ', 'ສີນ້ຳຕານອ່ອນ', 'ສີເງິນອ່ອນ'] },
      { question: 'Từ nào có nghĩa là "Màu xanh đậm"?', options: ['ສີຟ້າເຂັ້ມ', 'ສີຂຽວເຂັ້ມ', 'ສີແດງເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu xanh lá đậm"?', options: ['ສີຂຽວເຂັ້ມ', 'ສີຟ້າເຂັ້ມ', 'ສີແດງເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu đỏ đậm"?', options: ['ສີແດງເຂັ້ມ', 'ສີຟ້າເຂັ້ມ', 'ສີຂຽວເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu vàng đậm"?', options: ['ສີເຫຼືອງເຂັ້ມ', 'ສີສົ້ມເຂັ້ມ', 'ສີມ່ວງເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu cam đậm"?', options: ['ສີສົ້ມເຂັ້ມ', 'ສີເຫຼືອງເຂັ້ມ', 'ສີມ່ວງເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu tím đậm"?', options: ['ສີມ່ວງເຂັ້ມ', 'ສີສົ້ມເຂັ້ມ', 'ສີເຫຼືອງເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu nâu đậm"?', options: ['ສີນ້ຳຕານເຂັ້ມ', 'ສີບົວເຂັ້ມ', 'ສີເງິນເຂັ້ມ'] },
      { question: 'Từ nào có nghĩa là "Màu hồng đậm"?', options: ['ສີບົວເຂັ້ມ', 'ສີນ້ຳຕານເຂັ້ມ', 'ສີເງິນເຂັ້ມ'] }
    ]
  },
};

export default colors; 