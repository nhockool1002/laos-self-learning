import { Lesson } from './types';

const time: Lesson = {
  id: 'time',
  title: 'Thời gian',
  description: 'Học cách nói về thời gian, ngày tháng và các khoảng thời gian trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ເວລາ', pronunciation: 'vela', meaning: 'Thời gian', example: 'ເວລາເທົ່າໃດ? (Mấy giờ rồi?)' },
      { word: 'ຊົ່ວໂມງ', pronunciation: 'suamong', meaning: 'Giờ', example: 'ຊົ່ວໂມງເທົ່າໃດ? (Mấy giờ rồi?)' },
      { word: 'ນາທີ', pronunciation: 'nathi', meaning: 'Phút', example: 'ສິບນາທີ (Mười phút)' },
      { word: 'ວິນາທີ', pronunciation: 'vinathi', meaning: 'Giây', example: 'ສິບວິນາທີ (Mười giây)' },
      { word: 'ຕອນເຊົ້າ', pronunciation: 'ton sao', meaning: 'Buổi sáng', example: 'ຕອນເຊົ້າ (Buổi sáng)' },
      { word: 'ຕອນບ່າຍ', pronunciation: 'ton bai', meaning: 'Buổi trưa', example: 'ຕອນບ່າຍ (Buổi trưa)' },
      { word: 'ຕອນແລງ', pronunciation: 'ton laeng', meaning: 'Buổi tối', example: 'ຕອນແລງ (Buổi tối)' },
      { word: 'ຕອນກາງຄືນ', pronunciation: 'ton kang khun', meaning: 'Nửa đêm', example: 'ຕອນກາງຄືນ (Nửa đêm)' },
      { word: 'ມື້ນີ້', pronunciation: 'mu ni', meaning: 'Hôm nay', example: 'ມື້ນີ້ (Hôm nay)' },
      { word: 'ມື້ອື່ນ', pronunciation: 'mu un', meaning: 'Ngày khác', example: 'ມື້ອື່ນ (Ngày khác)' },
      { word: 'ມື້ວານ', pronunciation: 'mu van', meaning: 'Hôm qua', example: 'ມື້ວານ (Hôm qua)' },
      { word: 'ມື້ອື່ນ', pronunciation: 'mu un', meaning: 'Ngày mai', example: 'ມື້ອື່ນ (Ngày mai)' },
      { word: 'ອາທິດ', pronunciation: 'athit', meaning: 'Tuần', example: 'ອາທິດນີ້ (Tuần này)' },
      { word: 'ເດືອນ', pronunciation: 'duean', meaning: 'Tháng', example: 'ເດືອນນີ້ (Tháng này)' },
      { word: 'ປີ', pronunciation: 'pi', meaning: 'Năm', example: 'ປີນີ້ (Năm nay)' },
      { word: 'ວັນຈັນ', pronunciation: 'van jan', meaning: 'Thứ Hai', example: 'ວັນຈັນ (Thứ Hai)' },
      { word: 'ວັນອັງຄານ', pronunciation: 'van angkhan', meaning: 'Thứ Ba', example: 'ວັນອັງຄານ (Thứ Ba)' },
      { word: 'ວັນພຸດ', pronunciation: 'van phut', meaning: 'Thứ Tư', example: 'ວັນພຸດ (Thứ Tư)' },
      { word: 'ວັນພະຫັດ', pronunciation: 'van phahut', meaning: 'Thứ Năm', example: 'ວັນພະຫັດ (Thứ Năm)' },
      { word: 'ວັນສຸກ', pronunciation: 'van suk', meaning: 'Thứ Sáu', example: 'ວັນສຸກ (Thứ Sáu)' },
      { word: 'ວັນເສົາ', pronunciation: 'van sao', meaning: 'Thứ Bảy', example: 'ວັນເສົາ (Thứ Bảy)' },
      { word: 'ວັນອາທິດ', pronunciation: 'van athit', meaning: 'Chủ Nhật', example: 'ວັນອາທິດ (Chủ Nhật)' },
      { word: 'ຕອນ', pronunciation: 'ton', meaning: 'Lúc', example: 'ຕອນເທົ່າໃດ? (Lúc mấy giờ?)' },
      { word: 'ກ່ອນ', pronunciation: 'kon', meaning: 'Trước', example: 'ກ່ອນຫ້ານາທີ (Trước 5 phút)' },
      { word: 'ຫຼັງ', pronunciation: 'lang', meaning: 'Sau', example: 'ຫຼັງຫ້ານາທີ (Sau 5 phút)' },
      { word: 'ຕອນ', pronunciation: 'ton', meaning: 'Khi', example: 'ຕອນທີ່ (Khi đó)' },
      { word: 'ຕອນ', pronunciation: 'ton', meaning: 'Lúc', example: 'ຕອນນີ້ (Lúc này)' },
      { word: 'ຕອນ', pronunciation: 'ton', meaning: 'Khi', example: 'ຕອນທີ່ (Khi đó)' },
      { word: 'ຕອນ', pronunciation: 'ton', meaning: 'Lúc', example: 'ຕອນນີ້ (Lúc này)' },
    ],
    grammar: [
      {
        title: 'Cách hỏi giờ',
        explanation: 'Dùng "ຊົ່ວໂມງເທົ່າໃດ?" để hỏi giờ.',
        structure: 'ຊົ່ວໂມງເທົ່າໃດ?',
        examples: [
          'ຊົ່ວໂມງເທົ່າໃດ? (Mấy giờ rồi?)',
          'ຕອນນີ້ຊົ່ວໂມງເທົ່າໃດ? (Bây giờ mấy giờ?)'
        ]
      },
      {
        title: 'Cách nói về thời gian',
        explanation: 'Khi nói về thời gian, dùng "ຕອນ" trước thời điểm.',
        structure: 'ຕອນ + [thời điểm]',
        examples: [
          'ຕອນເຊົ້າ (Buổi sáng)',
          'ຕອນບ່າຍ (Buổi trưa)',
          'ຕອນແລງ (Buổi tối)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Thời gian"?', options: ['ເວລາ', 'ຊົ່ວໂມງ', 'ນາທີ'] },
      { question: 'Từ nào có nghĩa là "Giờ"?', options: ['ຊົ່ວໂມງ', 'ນາທີ', 'ວິນາທີ'] },
      { question: 'Từ nào có nghĩa là "Phút"?', options: ['ນາທີ', 'ວິນາທີ', 'ຊົ່ວໂມງ'] },
      { question: 'Từ nào có nghĩa là "Giây"?', options: ['ວິນາທີ', 'ນາທີ', 'ຊົ່ວໂມງ'] },
      { question: 'Từ nào có nghĩa là "Buổi sáng"?', options: ['ຕອນເຊົ້າ', 'ຕອນບ່າຍ', 'ຕອນແລງ'] },
      { question: 'Từ nào có nghĩa là "Buổi trưa"?', options: ['ຕອນບ່າຍ', 'ຕອນເຊົ້າ', 'ຕອນແລງ'] },
      { question: 'Từ nào có nghĩa là "Buổi tối"?', options: ['ຕອນແລງ', 'ຕອນເຊົ້າ', 'ຕອນບ່າຍ'] },
      { question: 'Từ nào có nghĩa là "Nửa đêm"?', options: ['ຕອນກາງຄືນ', 'ຕອນເຊົ້າ', 'ຕອນແລງ'] },
      { question: 'Từ nào có nghĩa là "Hôm nay"?', options: ['ມື້ນີ້', 'ມື້ວານ', 'ມື້ອື່ນ'] },
      { question: 'Từ nào có nghĩa là "Hôm qua"?', options: ['ມື້ວານ', 'ມື້ນີ້', 'ມື້ອື່ນ'] },
      { question: 'Từ nào có nghĩa là "Ngày mai"?', options: ['ມື້ອື່ນ', 'ມື້ນີ້', 'ມື້ວານ'] },
      { question: 'Từ nào có nghĩa là "Tuần"?', options: ['ອາທິດ', 'ເດືອນ', 'ປີ'] },
      { question: 'Từ nào có nghĩa là "Tháng"?', options: ['ເດືອນ', 'ອາທິດ', 'ປີ'] },
      { question: 'Từ nào có nghĩa là "Năm"?', options: ['ປີ', 'ເດືອນ', 'ອາທິດ'] },
      { question: 'Từ nào có nghĩa là "Thứ Hai"?', options: ['ວັນຈັນ', 'ວັນອັງຄານ', 'ວັນພຸດ'] },
      { question: 'Từ nào có nghĩa là "Thứ Ba"?', options: ['ວັນອັງຄານ', 'ວັນຈັນ', 'ວັນພຸດ'] },
      { question: 'Từ nào có nghĩa là "Thứ Tư"?', options: ['ວັນພຸດ', 'ວັນອັງຄານ', 'ວັນພະຫັດ'] },
      { question: 'Từ nào có nghĩa là "Thứ Năm"?', options: ['ວັນພະຫັດ', 'ວັນພຸດ', 'ວັນສຸກ'] },
      { question: 'Từ nào có nghĩa là "Thứ Sáu"?', options: ['ວັນສຸກ', 'ວັນພະຫັດ', 'ວັນເສົາ'] },
      { question: 'Từ nào có nghĩa là "Thứ Bảy"?', options: ['ວັນເສົາ', 'ວັນສຸກ', 'ວັນອາທິດ'] },
      { question: 'Từ nào có nghĩa là "Chủ Nhật"?', options: ['ວັນອາທິດ', 'ວັນເສົາ', 'ວັນຈັນ'] },
      { question: 'Từ nào có nghĩa là "Lúc"?', options: ['ຕອນ', 'ກ່ອນ', 'ຫຼັງ'] },
      { question: 'Từ nào có nghĩa là "Trước"?', options: ['ກ່ອນ', 'ຫຼັງ', 'ຕອນ'] },
      { question: 'Từ nào có nghĩa là "Sau"?', options: ['ຫຼັງ', 'ກ່ອນ', 'ຕອນ'] }
    ]
  },
};

export default time; 