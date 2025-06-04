import { Lesson } from './types';

const food: Lesson = {
  id: 'food',
  title: 'Ẩm thực',
  description: 'Học từ vựng về đồ ăn và cách gọi món trong tiếng Lào',
  category: 'Văn hóa',
  level: 'intermediate',
  content: {
    vocabulary: [
      { word: 'ເຂົ້າ', pronunciation: 'khao', meaning: 'Cơm', example: 'ຂ້ອຍກິນເຂົ້າ (Tôi ăn cơm)' },
      { word: 'ນ້ຳ', pronunciation: 'nam', meaning: 'Nước', example: 'ຂ້ອຍດື່ມນ້ຳ (Tôi uống nước)' },
      { word: 'ເຫຼົ້າ', pronunciation: 'lao', meaning: 'Rượu', example: 'ຂ້ອຍດື່ມເຫຼົ້າ (Tôi uống rượu)' },
      { word: 'ຕຳ', pronunciation: 'tam', meaning: 'Gỏi', example: 'ຂ້ອຍກິນຕຳຫມາກຫຸ່ງ (Tôi ăn gỏi đu đủ)' },
      { word: 'ລາບ', pronunciation: 'laap', meaning: 'Lạp', example: 'ຂ້ອຍກິນລາບໝູ (Tôi ăn lạp thịt lợn)' },
      { word: 'ສົ້ມ', pronunciation: 'som', meaning: 'Canh chua', example: 'ຂ້ອຍກິນສົ້ມປາ (Tôi ăn canh chua cá)' },
      { word: 'ໝູ', pronunciation: 'muu', meaning: 'Thịt lợn', example: 'ຂ້ອຍກິນໝູ (Tôi ăn thịt lợn)' },
      { word: 'ປາ', pronunciation: 'paa', meaning: 'Cá', example: 'ຂ້ອຍກິນປາ (Tôi ăn cá)' },
      { word: 'ໄກ່', pronunciation: 'kai', meaning: 'Gà', example: 'ຂ້ອຍກິນໄກ່ (Tôi ăn gà)' },
      { word: 'ປູ', pronunciation: 'puu', meaning: 'Cua', example: 'ຂ້ອຍກິນປູ (Tôi ăn cua)' },
      { word: 'ກຸງ', pronunciation: 'kung', meaning: 'Tôm', example: 'ຂ້ອຍກິນກຸງ (Tôi ăn tôm)' },
      { word: 'ເຫມົາ', pronunciation: 'mao', meaning: 'Say', example: 'ຂ້ອຍເຫມົາ (Tôi say)' },
      { word: 'ຫມາກຫຸ່ງ', pronunciation: 'maak huung', meaning: 'Đu đủ', example: 'ຂ້ອຍກິນຫມາກຫຸ່ງ (Tôi ăn đu đủ)' },
      { word: 'ຫມາກເຜັດ', pronunciation: 'maak phet', meaning: 'Ớt', example: 'ຂ້ອຍກິນຫມາກເຜັດ (Tôi ăn ớt)' },
      { word: 'ຫມາກເຜົາ', pronunciation: 'maak phao', meaning: 'Dừa', example: 'ຂ້ອຍກິນຫມາກເຜົາ (Tôi ăn dừa)' },
      { word: 'ຫມາກຖົ່ວ', pronunciation: 'maak thua', meaning: 'Đậu', example: 'ຂ້ອຍກິນຫມາກຖົ່ວ (Tôi ăn đậu)' },
      { word: 'ຫມາກຖົ່ວດິນ', pronunciation: 'maak thua din', meaning: 'Lạc', example: 'ຂ້ອຍກິນຫມາກຖົ່ວດິນ (Tôi ăn lạc)' },
      { word: 'ຫມາກຖົ່ວລຽນ', pronunciation: 'maak thua lian', meaning: 'Đậu xanh', example: 'ຂ້ອຍກິນຫມາກຖົ່ວລຽນ (Tôi ăn đậu xanh)' },
      { word: 'ຫມາກຖົ່ວດຳ', pronunciation: 'maak thua dam', meaning: 'Đậu đen', example: 'ຂ້ອຍກິນຫມາກຖົ່ວດຳ (Tôi ăn đậu đen)' },
      { word: 'ຫມາກຖົ່ວຂາວ', pronunciation: 'maak thua khao', meaning: 'Đậu trắng', example: 'ຂ້ອຍກິນຫມາກຖົ່ວຂາວ (Tôi ăn đậu trắng)' },
      { word: 'ຫມາກຖົ່ວເຫລືອງ', pronunciation: 'maak thua lueang', meaning: 'Đậu vàng', example: 'ຂ້ອຍກິນຫມາກຖົ່ວເຫລືອງ (Tôi ăn đậu vàng)' },
      { word: 'ຫມາກຖົ່ວແດງ', pronunciation: 'maak thua daeng', meaning: 'Đậu đỏ', example: 'ຂ້ອຍກິນຫມາກຖົ່ວແດງ (Tôi ăn đậu đỏ)' },
      { word: 'ຫມາກຖົ່ວຂຽວ', pronunciation: 'maak thua khiao', meaning: 'Đậu xanh', example: 'ຂ້ອຍກິນຫມາກຖົ່ວຂຽວ (Tôi ăn đậu xanh)' },
      { word: 'ເຂົ້າຫນຽວ', pronunciation: 'khao niao', meaning: 'Xôi', example: 'ຂ້ອຍກິນເຂົ້າຫນຽວ (Tôi ăn xôi)' },
      { word: 'ເຂົ້າປຽກ', pronunciation: 'khao piak', meaning: 'Cháo', example: 'ຂ້ອຍກິນເຂົ້າປຽກ (Tôi ăn cháo)' },
      { word: 'ເຂົ້າຜັດ', pronunciation: 'khao phat', meaning: 'Cơm rang', example: 'ຂ້ອຍກິນເຂົ້າຜັດ (Tôi ăn cơm rang)' },
      { word: 'ເຂົ້າຫມົກ', pronunciation: 'khao mok', meaning: 'Cơm hấp', example: 'ຂ້ອຍກິນເຂົ້າຫມົກ (Tôi ăn cơm hấp)' },
      { word: 'ເຂົ້າຫມູ', pronunciation: 'khao muu', meaning: 'Cơm thịt lợn', example: 'ຂ້ອຍກິນເຂົ້າຫມູ (Tôi ăn cơm thịt lợn)' },
      { word: 'ເຂົ້າໄກ່', pronunciation: 'khao kai', meaning: 'Cơm gà', example: 'ຂ້ອຍກິນເຂົ້າໄກ່ (Tôi ăn cơm gà)' },
      { word: 'ເຂົ້າປາ', pronunciation: 'khao paa', meaning: 'Cơm cá', example: 'ຂ້ອຍກິນເຂົ້າປາ (Tôi ăn cơm cá)' },
      { word: 'ເຂົ້າກຸງ', pronunciation: 'khao kung', meaning: 'Cơm tôm', example: 'ຂ້ອຍກິນເຂົ້າກຸງ (Tôi ăn cơm tôm)' },
      { word: 'ເຂົ້າປູ', pronunciation: 'khao puu', meaning: 'Cơm cua', example: 'ຂ້ອຍກິນເຂົ້າປູ (Tôi ăn cơm cua)' },
      { word: 'ເຂົ້າຫມາກຫຸ່ງ', pronunciation: 'khao maak huung', meaning: 'Cơm đu đủ', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຫຸ່ງ (Tôi ăn cơm đu đủ)' },
      { word: 'ເຂົ້າຫມາກເຜັດ', pronunciation: 'khao maak phet', meaning: 'Cơm ớt', example: 'ຂ້ອຍກິນເຂົ້າຫມາກເຜັດ (Tôi ăn cơm ớt)' },
      { word: 'ເຂົ້າຫມາກເຜົາ', pronunciation: 'khao maak phao', meaning: 'Cơm dừa', example: 'ຂ້ອຍກິນເຂົ້າຫມາກເຜົາ (Tôi ăn cơm dừa)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວ', pronunciation: 'khao maak thua', meaning: 'Cơm đậu', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວ (Tôi ăn cơm đậu)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວດິນ', pronunciation: 'khao maak thua din', meaning: 'Cơm lạc', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວດິນ (Tôi ăn cơm lạc)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວລຽນ', pronunciation: 'khao maak thua lian', meaning: 'Cơm đậu xanh', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວລຽນ (Tôi ăn cơm đậu xanh)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວດຳ', pronunciation: 'khao maak thua dam', meaning: 'Cơm đậu đen', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວດຳ (Tôi ăn cơm đậu đen)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວຂາວ', pronunciation: 'khao maak thua khao', meaning: 'Cơm đậu trắng', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວຂາວ (Tôi ăn cơm đậu trắng)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວເຫລືອງ', pronunciation: 'khao maak thua lueang', meaning: 'Cơm đậu vàng', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວເຫລືອງ (Tôi ăn cơm đậu vàng)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວແດງ', pronunciation: 'khao maak thua daeng', meaning: 'Cơm đậu đỏ', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວແດງ (Tôi ăn cơm đậu đỏ)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວຂຽວ', pronunciation: 'khao maak thua khiao', meaning: 'Cơm đậu xanh', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວຂຽວ (Tôi ăn cơm đậu xanh)' },
      { word: 'ເຂົ້າຫມາກພ້າວ', pronunciation: 'khao maak phao', meaning: 'Cơm dừa', example: 'ຂ້ອຍກິນເຂົ້າຫມາກພ້າວ (Tôi ăn cơm dừa)' },
      { word: 'ເຂົ້າຫມາກພູ', pronunciation: 'khao maak phu', meaning: 'Cơm bí đỏ', example: 'ຂ້ອຍກິນເຂົ້າຫມາກພູ (Tôi ăn cơm bí đỏ)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວຂຽວ', pronunciation: 'khao maak thua khiao', meaning: 'Cơm đậu xanh', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວຂຽວ (Tôi ăn cơm đậu xanh)' },
      { word: 'ເຂົ້າຫມາກຖົ່ວຂຽວ', pronunciation: 'khao maak thua khiao', meaning: 'Cơm đậu xanh', example: 'ຂ້ອຍກິນເຂົ້າຫມາກຖົ່ວຂຽວ (Tôi ăn cơm đậu xanh)' },
    ],
    grammar: [
      {
        title: 'Cấu trúc gọi món ăn',
        explanation: 'Khi gọi món ăn, dùng động từ "ăn" (ກິນ) hoặc "uống" (ດື່ມ) kết hợp với tên món.',
        structure: 'ຂ້ອຍ + [ກິນ/ດື່ມ] + [tên món]',
        examples: [
          'ຂ້ອຍກິນເຂົ້າ (Tôi ăn cơm)',
          'ຂ້ອຍດື່ມນ້ຳ (Tôi uống nước)'
        ]
      },
      {
        title: 'Cách hỏi thích ăn/uống gì',
        explanation: 'Dùng "Bạn thích ăn/uống gì?" để hỏi sở thích về món ăn, thức uống.',
        structure: 'ທ່ານມັກກິນ/ດື່ມຫຍັງ?',
        examples: [
          'ທ່ານມັກກິນຫຍັງ? (Bạn thích ăn gì?)',
          'ທ່ານມັກດື່ມຫຍັງ? (Bạn thích uống gì?)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Cơm"?', options: ['ເຂົ້າ', 'ນ້ຳ', 'ປາ'] },
      { question: 'Từ nào có nghĩa là "Nước"?', options: ['ນ້ຳ', 'ເຂົ້າ', 'ຫມູ'] },
      { question: 'Từ nào có nghĩa là "Rượu"?', options: ['ເຫຼົ້າ', 'ຕຳ', 'ກຸງ'] },
      { question: 'Từ nào có nghĩa là "Gỏi"?', options: ['ຕຳ', 'ປູ', 'ຫມູ'] },
      { question: 'Từ nào có nghĩa là "Lạp"?', options: ['ລາບ', 'ສົ້ມ', 'ປາ'] },
      { question: 'Từ nào có nghĩa là "Canh chua"?', options: ['ສົ້ມ', 'ຫມູ', 'ນ້ຳ'] },
      { question: 'Từ nào có nghĩa là "Thịt lợn"?', options: ['ໝູ', 'ປາ', 'ກຸງ'] },
      { question: 'Từ nào có nghĩa là "Cá"?', options: ['ປາ', 'ໝູ', 'ຫມາກຫຸ່ງ'] },
      { question: 'Từ nào có nghĩa là "Gà"?', options: ['ໄກ່', 'ປູ', 'ຫມາກເຜັດ'] },
      { question: 'Từ nào có nghĩa là "Cua"?', options: ['ປູ', 'ກຸງ', 'ຫມາກເຜັດ'] },
      { question: 'Từ nào có nghĩa là "Tôm"?', options: ['ກຸງ', 'ປູ', 'ຫມາກເຜັດ'] },
      { question: 'Từ nào có nghĩa là "Say"?', options: ['ເຫມົາ', 'ຫມາກເຜັດ', 'ນ້ຳ'] },
      { question: 'Từ nào có nghĩa là "Đu đủ"?', options: ['ຫມາກຫຸ່ງ', 'ຫມາກເຜັດ', 'ຫມາກຖົ່ວ'] },
      { question: 'Từ nào có nghĩa là "Ớt"?', options: ['ຫມາກເຜັດ', 'ຫມາກຖົ່ວ', 'ຫມາກຫຸ່ງ'] },
      { question: 'Từ nào có nghĩa là "Dừa"?', options: ['ຫມາກເຜົາ', 'ຫມາກຖົ່ວ', 'ຫມາກເຜັດ'] },
      { question: 'Từ nào có nghĩa là "Đậu"?', options: ['ຫມາກຖົ່ວ', 'ຫມາກເຜົາ', 'ຫມາກຖົ່ວດິນ'] },
      { question: 'Từ nào có nghĩa là "Lạc"?', options: ['ຫມາກຖົ່ວດິນ', 'ຫມາກຖົ່ວ', 'ຫມາກຖົ່ວລຽນ'] },
      { question: 'Từ nào có nghĩa là "Đậu xanh"?', options: ['ຫມາກຖົ່ວລຽນ', 'ຫມາກຖົ່ວດິນ', 'ຫມາກຖົ່ວດຳ'] },
      { question: 'Từ nào có nghĩa là "Đậu đen"?', options: ['ຫມາກຖົ່ວດຳ', 'ຫມາກຖົ່ວຂາວ', 'ຫມາກຖົ່ວລຽນ'] },
      { question: 'Từ nào có nghĩa là "Đậu trắng"?', options: ['ຫມາກຖົ່ວຂາວ', 'ຫມາກຖົ່ວດຳ', 'ຫມາກຖົ່ວລຽນ'] },
      { question: 'Từ nào có nghĩa là "Đậu vàng"?', options: ['ຫມາກຖົ່ວເຫລືອງ', 'ຫມາກຖົ່ວຂາວ', 'ຫມາກຖົ່ວດຳ'] }
    ]
  },
};

export default food; 