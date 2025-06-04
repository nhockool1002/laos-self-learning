import { Lesson } from './types';

const occupations: Lesson = {
  id: 'occupations',
  title: 'Nghề nghiệp',
  description: 'Học từ vựng về các nghề nghiệp trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ອາຊີບ', pronunciation: 'asip', meaning: 'Nghề nghiệp', example: 'ອາຊີບຫຍັງ? (Nghề gì?)' },
      { word: 'ຄູ', pronunciation: 'khu', meaning: 'Giáo viên', example: 'ຄູ (Giáo viên)' },
      { word: 'ແພດ', pronunciation: 'phed', meaning: 'Bác sĩ', example: 'ແພດ (Bác sĩ)' },
      { word: 'ພະນັກງານ', pronunciation: 'phanak ngan', meaning: 'Nhân viên', example: 'ພະນັກງານ (Nhân viên)' },
      { word: 'ພະນັກງານຂາຍ', pronunciation: 'phanak ngan khai', meaning: 'Nhân viên bán hàng', example: 'ພະນັກງານຂາຍ (Nhân viên bán hàng)' },
      { word: 'ພະນັກງານບໍລິການ', pronunciation: 'phanak ngan bolikan', meaning: 'Nhân viên phục vụ', example: 'ພະນັກງານບໍລິການ (Nhân viên phục vụ)' },
      { word: 'ພະນັກງານບໍລິຫານ', pronunciation: 'phanak ngan bolihan', meaning: 'Nhân viên quản lý', example: 'ພະນັກງານບໍລິຫານ (Nhân viên quản lý)' },
      { word: 'ພະນັກງານບໍລິຫານສູງ', pronunciation: 'phanak ngan bolihan sung', meaning: 'Nhân viên quản lý cấp cao', example: 'ພະນັກງານບໍລິຫານສູງ (Nhân viên quản lý cấp cao)' },
      { word: 'ພະນັກງານບໍລິຫານຕ່ຳ', pronunciation: 'phanak ngan bolihan tam', meaning: 'Nhân viên quản lý cấp thấp', example: 'ພະນັກງານບໍລິຫານຕ່ຳ (Nhân viên quản lý cấp thấp)' },
      { word: 'ພະນັກງານບໍລິຫານກາງ', pronunciation: 'phanak ngan bolihan kang', meaning: 'Nhân viên quản lý cấp trung', example: 'ພະນັກງານບໍລິຫານກາງ (Nhân viên quản lý cấp trung)' },
      { word: 'ພະນັກງານບໍລິຫານສູງຫຼາຍ', pronunciation: 'phanak ngan bolihan sung lai', meaning: 'Nhân viên quản lý cấp rất cao', example: 'ພະນັກງານບໍລິຫານສູງຫຼາຍ (Nhân viên quản lý cấp rất cao)' },
      { word: 'ພະນັກງານບໍລິຫານຕ່ຳຫຼາຍ', pronunciation: 'phanak ngan bolihan tam lai', meaning: 'Nhân viên quản lý cấp rất thấp', example: 'ພະນັກງານບໍລິຫານຕ່ຳຫຼາຍ (Nhân viên quản lý cấp rất thấp)' },
      { word: 'ພະນັກງານບໍລິຫານກາງຫຼາຍ', pronunciation: 'phanak ngan bolihan kang lai', meaning: 'Nhân viên quản lý cấp rất trung', example: 'ພະນັກງານບໍລິຫານກາງຫຼາຍ (Nhân viên quản lý cấp rất trung)' },
      { word: 'ພະນັກງານບໍລິຫານສູງຫຼາຍຫຼາຍ', pronunciation: 'phanak ngan bolihan sung lai lai', meaning: 'Nhân viên quản lý cấp rất rất cao', example: 'ພະນັກງານບໍລິຫານສູງຫຼາຍຫຼາຍ (Nhân viên quản lý cấp rất rất cao)' }
    ],
    grammar: [
      {
        title: 'Cách hỏi về nghề nghiệp',
        explanation: 'Dùng "ອາຊີບຫຍັງ?" để hỏi về nghề nghiệp.',
        structure: 'ອາຊີບຫຍັງ?',
        examples: [
          'ອາຊີບຫຍັງ? (Nghề gì?)',
          'ທ່ານເຮັດວຽກຫຍັງ? (Bạn làm nghề gì?)'
        ]
      },
      {
        title: 'Cách nói về nghề nghiệp',
        explanation: 'Khi nói về nghề nghiệp, dùng "ຂ້ອຍເປັນ" trước tên nghề.',
        structure: 'ຂ້ອຍເປັນ + [tên nghề]',
        examples: [
          'ຂ້ອຍເປັນຄູ (Tôi là giáo viên)',
          'ຂ້ອຍເປັນແພດ (Tôi là bác sĩ)',
          'ຂ້ອຍເປັນພະນັກງານ (Tôi là nhân viên)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Nghề nghiệp"?', options: ['ອາຊີບ', 'ຄູ', 'ແພດ'] },
      { question: 'Từ nào có nghĩa là "Giáo viên"?', options: ['ຄູ', 'ແພດ', 'ພະນັກງານ'] },
      { question: 'Từ nào có nghĩa là "Bác sĩ"?', options: ['ແພດ', 'ຄູ', 'ພະນັກງານ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên"?', options: ['ພະນັກງານ', 'ຄູ', 'ແພດ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên bán hàng"?', options: ['ພະນັກງານຂາຍ', 'ພະນັກງານບໍລິການ', 'ພະນັກງານບໍລິຫານ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên phục vụ"?', options: ['ພະນັກງານບໍລິການ', 'ພະນັກງານຂາຍ', 'ພະນັກງານບໍລິຫານ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý"?', options: ['ພະນັກງານບໍລິຫານ', 'ພະນັກງານຂາຍ', 'ພະນັກງານບໍລິການ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp cao"?', options: ['ພະນັກງານບໍລິຫານສູງ', 'ພະນັກງານບໍລິຫານຕ່ຳ', 'ພະນັກງານບໍລິຫານກາງ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp thấp"?', options: ['ພະນັກງານບໍລິຫານຕ່ຳ', 'ພະນັກງານບໍລິຫານສູງ', 'ພະນັກງານບໍລິຫານກາງ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp trung"?', options: ['ພະນັກງານບໍລິຫານກາງ', 'ພະນັກງານບໍລິຫານສູງ', 'ພະນັກງານບໍລິຫານຕ່ຳ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp rất cao"?', options: ['ພະນັກງານບໍລິຫານສູງຫຼາຍ', 'ພະນັກງານບໍລິຫານຕ່ຳຫຼາຍ', 'ພະນັກງານບໍລິຫານກາງຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp rất thấp"?', options: ['ພະນັກງານບໍລິຫານຕ່ຳຫຼາຍ', 'ພະນັກງານບໍລິຫານສູງຫຼາຍ', 'ພະນັກງານບໍລິຫານກາງຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp rất trung"?', options: ['ພະນັກງານບໍລິຫານກາງຫຼາຍ', 'ພະນັກງານບໍລິຫານສູງຫຼາຍ', 'ພະນັກງານບໍລິຫານຕ່ຳຫຼາຍ'] },
      { question: 'Từ nào có nghĩa là "Nhân viên quản lý cấp rất rất cao"?', options: ['ພະນັກງານບໍລິຫານສູງຫຼາຍຫຼາຍ', 'ພະນັກງານບໍລິຫານຕ່ຳຫຼາຍຫຼາຍ', 'ພະນັກງານບໍລິຫານກາງຫຼາຍຫຼາຍ'] }
    ]
  },
};

export default occupations;
 