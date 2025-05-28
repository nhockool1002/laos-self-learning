export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  content: {
    vocabulary: Array<{
      word: string;
      pronunciation: string;
      meaning: string;
      example?: string;
    }>;
    grammar?: Array<{
      title: string;
      explanation: string;
      examples: string[];
    }>;
    practice?: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
}

export const lessons: Lesson[] = [
  {
    id: 'greetings',
    title: 'Chào hỏi cơ bản',
    description: 'Học cách chào hỏi và giới thiệu bản thân trong tiếng Lào',
    category: 'Giao tiếp cơ bản',
    level: 'beginner',
    content: {
      vocabulary: [
        {
          word: 'ສະບາຍດີ',
          pronunciation: 'sabaidee',
          meaning: 'Xin chào',
          example: 'ສະບາຍດີ, ຂ້ອຍຊື່ວ່າ... (Xin chào, tôi tên là...)'
        },
        {
          word: 'ຂໍອະນຸຍາດ',
          pronunciation: 'kho anu nyat',
          meaning: 'Xin phép',
          example: 'ຂໍອະນຸຍາດ, ຂ້ອຍຈະອອກໄປ (Xin phép, tôi sẽ đi ra ngoài)'
        },
        {
          word: 'ຂໍຂອບໃຈ',
          pronunciation: 'kho khob chai',
          meaning: 'Cảm ơn',
          example: 'ຂໍຂອບໃຈຫຼາຍໆ (Cảm ơn rất nhiều)'
        },
        {
          word: 'ຂໍໂທດ',
          pronunciation: 'kho thot',
          meaning: 'Xin lỗi',
          example: 'ຂໍໂທດ, ຂ້ອຍບໍ່ເຂົ້າໃຈ (Xin lỗi, tôi không hiểu)'
        },
        {
          word: 'ຂ້ອຍຊື່ວ່າ',
          pronunciation: 'khoi seu vaa',
          meaning: 'Tôi tên là',
          example: 'ຂ້ອຍຊື່ວ່າຈັນ (Tôi tên là Chăn)'
        },
        {
          word: 'ຂ້ອຍມາຈາກ',
          pronunciation: 'khoi maa jaak',
          meaning: 'Tôi đến từ',
          example: 'ຂ້ອຍມາຈາກຫວຽດນາມ (Tôi đến từ Việt Nam)'
        },
        {
          word: 'ຂ້ອຍມີຄວາມສຸກ',
          pronunciation: 'khoi mee khuaam suk',
          meaning: 'Tôi rất vui',
          example: 'ຂ້ອຍມີຄວາມສຸກທີ່ໄດ້ພົບທ່ານ (Tôi rất vui được gặp bạn)'
        },
        {
          word: 'ຂ້ອຍບໍ່ເຂົ້າໃຈ',
          pronunciation: 'khoi bo khao jai',
          meaning: 'Tôi không hiểu',
          example: 'ຂໍໂທດ, ຂ້ອຍບໍ່ເຂົ້າໃຈ (Xin lỗi, tôi không hiểu)'
        },
        {
          word: 'ຂ້ອຍຈະພະຍາຍາມ',
          pronunciation: 'khoi ja pha nyaa nyaam',
          meaning: 'Tôi sẽ cố gắng',
          example: 'ຂ້ອຍຈະພະຍາຍາມຮຽນພາສາລາວ (Tôi sẽ cố gắng học tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການ',
          pronunciation: 'khoi tong gaan',
          meaning: 'Tôi muốn',
          example: 'ຂ້ອຍຕ້ອການຮຽນພາສາລາວ (Tôi muốn học tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍສາມາດ',
          pronunciation: 'khoi saa maat',
          meaning: 'Tôi có thể',
          example: 'ຂ້ອຍສາມາດເວົ້າພາສາລາວໄດ້ (Tôi có thể nói tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍບໍ່ສາມາດ',
          pronunciation: 'khoi bo saa maat',
          meaning: 'Tôi không thể',
          example: 'ຂ້ອຍບໍ່ສາມາດເວົ້າພາສາລາວໄດ້ (Tôi không thể nói tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຮູ້',
          pronunciation: 'khoi huu',
          meaning: 'Tôi biết',
          example: 'ຂ້ອຍຮູ້ພາສາລາວ (Tôi biết tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍບໍ່ຮູ້',
          pronunciation: 'khoi bo huu',
          meaning: 'Tôi không biết',
          example: 'ຂ້ອຍບໍ່ຮູ້ພາສາລາວ (Tôi không biết tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການຮູ້',
          pronunciation: 'khoi tong gaan huu',
          meaning: 'Tôi muốn biết',
          example: 'ຂ້ອຍຕ້ອງການຮູ້ພາສາລາວ (Tôi muốn biết tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການຮຽນ',
          pronunciation: 'khoi tong gaan hian',
          meaning: 'Tôi muốn học',
          example: 'ຂ້ອຍຕ້ອງການຮຽນພາສາລາວ (Tôi muốn học tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການເວົ້າ',
          pronunciation: 'khoi tong gaan vao',
          meaning: 'Tôi muốn nói',
          example: 'ຂ້ອຍຕ້ອງການເວົ້າພາສາລາວ (Tôi muốn nói tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການຟັງ',
          pronunciation: 'khoi tong gaan fang',
          meaning: 'Tôi muốn nghe',
          example: 'ຂ້ອຍຕ້ອງການຟັງພາສາລາວ (Tôi muốn nghe tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການອ່ານ',
          pronunciation: 'khoi tong gaan aan',
          meaning: 'Tôi muốn đọc',
          example: 'ຂ້ອຍຕ້ອງການອ່ານພາສາລາວ (Tôi muốn đọc tiếng Lào)'
        },
        {
          word: 'ຂ້ອຍຕ້ອງການຂຽນ',
          pronunciation: 'khoi tong gaan khian',
          meaning: 'Tôi muốn viết',
          example: 'ຂ້ອຍຕ້ອງການຂຽນພາສາລາວ (Tôi muốn viết tiếng Lào)'
        }
      ],
      grammar: [
        {
          title: 'Cách giới thiệu bản thân',
          explanation: 'Trong tiếng Lào, để giới thiệu bản thân, chúng ta sử dụng cấu trúc: ຂ້ອຍຊື່ວ່າ... (Tôi tên là...)',
          examples: [
            'ຂ້ອຍຊື່ວ່າຈັນ (Tôi tên là Chăn)',
            'ຂ້ອຍມາຈາກຫວຽດນາມ (Tôi đến từ Việt Nam)',
            'ຂ້ອຍມີຄວາມສຸກທີ່ໄດ້ພົບທ່ານ (Tôi rất vui được gặp bạn)'
          ]
        }
      ],
      practice: [
        {
          question: 'Cách nói "Xin chào" trong tiếng Lào là gì?',
          options: ['ຂໍຂອບໃຈ', 'ສະບາຍດີ', 'ຂໍໂທດ', 'ຂໍອະນຸຍາດ'],
          correctAnswer: 1
        },
        {
          question: 'Cách nói "Cảm ơn" trong tiếng Lào là gì?',
          options: ['ຂໍຂອບໃຈ', 'ສະບາຍດີ', 'ຂໍໂທດ', 'ຂໍອະນຸຍາດ'],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 'numbers',
    title: 'Số đếm',
    description: 'Học cách đếm số và sử dụng số trong tiếng Lào',
    category: 'Từ vựng cơ bản',
    level: 'beginner',
    content: {
      vocabulary: [
        {
          word: 'ໜຶ່ງ',
          pronunciation: 'nueng',
          meaning: 'Một',
          example: 'ໜຶ່ງຄົນ (Một người)'
        },
        {
          word: 'ສອງ',
          pronunciation: 'song',
          meaning: 'Hai',
          example: 'ສອງຄົນ (Hai người)'
        },
        {
          word: 'ສາມ',
          pronunciation: 'sam',
          meaning: 'Ba',
          example: 'ສາມຄົນ (Ba người)'
        },
        {
          word: 'ສີ່',
          pronunciation: 'si',
          meaning: 'Bốn',
          example: 'ສີ່ຄົນ (Bốn người)'
        },
        {
          word: 'ຫ້າ',
          pronunciation: 'ha',
          meaning: 'Năm',
          example: 'ຫ້າຄົນ (Năm người)'
        },
        {
          word: 'ຫົກ',
          pronunciation: 'hok',
          meaning: 'Sáu',
          example: 'ຫົກຄົນ (Sáu người)'
        },
        {
          word: 'ເຈັດ',
          pronunciation: 'jet',
          meaning: 'Bảy',
          example: 'ເຈັດຄົນ (Bảy người)'
        },
        {
          word: 'ແປດ',
          pronunciation: 'paet',
          meaning: 'Tám',
          example: 'ແປດຄົນ (Tám người)'
        },
        {
          word: 'ເກົ້າ',
          pronunciation: 'kao',
          meaning: 'Chín',
          example: 'ເກົ້າຄົນ (Chín người)'
        },
        {
          word: 'ສິບ',
          pronunciation: 'sip',
          meaning: 'Mười',
          example: 'ສິບຄົນ (Mười người)'
        },
        {
          word: 'ສິບເອັດ',
          pronunciation: 'sip et',
          meaning: 'Mười một',
          example: 'ສິບເອັດຄົນ (Mười một người)'
        },
        {
          word: 'ສິບສອງ',
          pronunciation: 'sip song',
          meaning: 'Mười hai',
          example: 'ສິບສອງຄົນ (Mười hai người)'
        },
        {
          word: 'ສິບສາມ',
          pronunciation: 'sip sam',
          meaning: 'Mười ba',
          example: 'ສິບສາມຄົນ (Mười ba người)'
        },
        {
          word: 'ສິບສີ່',
          pronunciation: 'sip si',
          meaning: 'Mười bốn',
          example: 'ສິບສີ່ຄົນ (Mười bốn người)'
        },
        {
          word: 'ສິບຫ້າ',
          pronunciation: 'sip ha',
          meaning: 'Mười lăm',
          example: 'ສິບຫ້າຄົນ (Mười lăm người)'
        },
        {
          word: 'ສິບຫົກ',
          pronunciation: 'sip hok',
          meaning: 'Mười sáu',
          example: 'ສິບຫົກຄົນ (Mười sáu người)'
        },
        {
          word: 'ສິບເຈັດ',
          pronunciation: 'sip jet',
          meaning: 'Mười bảy',
          example: 'ສິບເຈັດຄົນ (Mười bảy người)'
        },
        {
          word: 'ສິບແປດ',
          pronunciation: 'sip paet',
          meaning: 'Mười tám',
          example: 'ສິບແປດຄົນ (Mười tám người)'
        },
        {
          word: 'ສິບເກົ້າ',
          pronunciation: 'sip kao',
          meaning: 'Mười chín',
          example: 'ສິບເກົ້າຄົນ (Mười chín người)'
        },
        {
          word: 'ຊາວ',
          pronunciation: 'sao',
          meaning: 'Hai mươi',
          example: 'ຊາວຄົນ (Hai mươi người)'
        }
      ],
      grammar: [
        {
          title: 'Cách đếm số',
          explanation: 'Trong tiếng Lào, số đếm thường đứng trước danh từ và không cần từ nối',
          examples: [
            'ໜຶ່ງຄົນ (Một người)',
            'ສອງຄົນ (Hai người)',
            'ສາມຄົນ (Ba người)'
          ]
        }
      ],
      practice: [
        {
          question: 'Số 1 trong tiếng Lào là gì?',
          options: ['ສອງ', 'ໜຶ່ງ', 'ສາມ', 'ສີ່'],
          correctAnswer: 1
        },
        {
          question: 'Số 2 trong tiếng Lào là gì?',
          options: ['ສອງ', 'ໜຶ່ງ', 'ສາມ', 'ສີ່'],
          correctAnswer: 0
        }
      ]
    }
  },
  {
    id: 'food',
    title: 'Ẩm thực',
    description: 'Học từ vựng về đồ ăn và cách gọi món trong tiếng Lào',
    category: 'Văn hóa',
    level: 'intermediate',
    content: {
      vocabulary: [
        {
          word: 'ເຂົ້າ',
          pronunciation: 'khao',
          meaning: 'Cơm',
          example: 'ເຂົ້າປຽກ (Cơm nấu)'
        },
        {
          word: 'ຕຳ',
          pronunciation: 'tam',
          meaning: 'Gỏi',
          example: 'ຕຳຫມາກຫຸ່ງ (Gỏi đu đủ)'
        },
        {
          word: 'ລາບ',
          pronunciation: 'laap',
          meaning: 'Lạp',
          example: 'ລາບໝູ (Lạp thịt lợn)'
        },
        {
          word: 'ສົ້ມ',
          pronunciation: 'som',
          meaning: 'Canh chua',
          example: 'ສົ້ມປາ (Canh chua cá)'
        },
        {
          word: 'ໝູ',
          pronunciation: 'muu',
          meaning: 'Thịt lợn',
          example: 'ລາບໝູ (Lạp thịt lợn)'
        },
        {
          word: 'ປາ',
          pronunciation: 'paa',
          meaning: 'Cá',
          example: 'ສົ້ມປາ (Canh chua cá)'
        },
        {
          word: 'ໄກ່',
          pronunciation: 'kai',
          meaning: 'Gà',
          example: 'ລາບໄກ່ (Lạp gà)'
        },
        {
          word: 'ປູ',
          pronunciation: 'puu',
          meaning: 'Cua',
          example: 'ຕຳປູ (Gỏi cua)'
        },
        {
          word: 'ກຸງ',
          pronunciation: 'kung',
          meaning: 'Tôm',
          example: 'ຕຳກຸງ (Gỏi tôm)'
        },
        {
          word: 'ຫມາກຫຸ່ງ',
          pronunciation: 'maak huung',
          meaning: 'Đu đủ',
          example: 'ຕຳຫມາກຫຸ່ງ (Gỏi đu đủ)'
        },
        {
          word: 'ຫມາກພ້າວ',
          pronunciation: 'maak phao',
          meaning: 'Dừa',
          example: 'ຕຳຫມາກພ້າວ (Gỏi dừa)'
        },
        {
          word: 'ຫມາກພູ',
          pronunciation: 'maak phu',
          meaning: 'Bí đỏ',
          example: 'ຕຳຫມາກພູ (Gỏi bí đỏ)'
        },
        {
          word: 'ຫມາກຖົ່ວ',
          pronunciation: 'maak thua',
          meaning: 'Đậu',
          example: 'ຕຳຫມາກຖົ່ວ (Gỏi đậu)'
        },
        {
          word: 'ຫມາກຖົ່ວດິນ',
          pronunciation: 'maak thua din',
          meaning: 'Lạc',
          example: 'ຕຳຫມາກຖົ່ວດິນ (Gỏi lạc)'
        },
        {
          word: 'ຫມາກຖົ່ວລຽນ',
          pronunciation: 'maak thua lian',
          meaning: 'Đậu xanh',
          example: 'ຕຳຫມາກຖົ່ວລຽນ (Gỏi đậu xanh)'
        },
        {
          word: 'ຫມາກຖົ່ວດຳ',
          pronunciation: 'maak thua dam',
          meaning: 'Đậu đen',
          example: 'ຕຳຫມາກຖົ່ວດຳ (Gỏi đậu đen)'
        },
        {
          word: 'ຫມາກຖົ່ວຂາວ',
          pronunciation: 'maak thua khao',
          meaning: 'Đậu trắng',
          example: 'ຕຳຫມາກຖົ່ວຂາວ (Gỏi đậu trắng)'
        },
        {
          word: 'ຫມາກຖົ່ວເຫລືອງ',
          pronunciation: 'maak thua lueang',
          meaning: 'Đậu vàng',
          example: 'ຕຳຫມາກຖົ່ວເຫລືອງ (Gỏi đậu vàng)'
        },
        {
          word: 'ຫມາກຖົ່ວແດງ',
          pronunciation: 'maak thua daeng',
          meaning: 'Đậu đỏ',
          example: 'ຕຳຫມາກຖົ່ວແດງ (Gỏi đậu đỏ)'
        },
        {
          word: 'ຫມາກຖົ່ວຂຽວ',
          pronunciation: 'maak thua khiao',
          meaning: 'Đậu xanh',
          example: 'ຕຳຫມາກຖົ່ວຂຽວ (Gỏi đậu xanh)'
        }
      ],
      grammar: [
        {
          title: 'Cách gọi món ăn',
          explanation: 'Khi gọi món ăn trong tiếng Lào, chúng ta thường nói: ຂ້ອຍຕ້ອງການ... (Tôi muốn...)',
          examples: [
            'ຂ້ອຍຕ້ອງການເຂົ້າປຽກ (Tôi muốn cơm nấu)',
            'ຂ້ອຍຕ້ອງການຕຳຫມາກຫຸ່ງ (Tôi muốn gỏi đu đủ)',
            'ຂ້ອຍຕ້ອງການລາບໝູ (Tôi muốn lạp thịt lợn)'
          ]
        }
      ],
      practice: [
        {
          question: 'Món "Gỏi đu đủ" trong tiếng Lào là gì?',
          options: ['ເຂົ້າປຽກ', 'ຕຳຫມາກຫຸ່ງ', 'ລາບໝູ', 'ສົ້ມປາ'],
          correctAnswer: 1
        },
        {
          question: 'Món "Lạp thịt lợn" trong tiếng Lào là gì?',
          options: ['ເຂົ້າປຽກ', 'ຕຳຫມາກຫຸ່ງ', 'ລາບໝູ', 'ສົ້ມປາ'],
          correctAnswer: 2
        }
      ]
    }
  }
]; 