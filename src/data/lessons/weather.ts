import { Lesson } from './types';

const weather: Lesson = {
  id: 'weather',
  title: 'Thời tiết',
  description: 'Học từ vựng về thời tiết trong tiếng Lào',
  category: 'Từ vựng cơ bản',
  level: 'beginner',
  content: {
    vocabulary: [
      { word: 'ອາກາດ', pronunciation: 'aakat', meaning: 'Thời tiết', example: 'ອາກາດເປັນແນວໃດ? (Thời tiết thế nào?)' },
      { word: 'ອາກາດຮ້ອນ', pronunciation: 'aakat hon', meaning: 'Thời tiết nóng', example: 'ອາກາດຮ້ອນ (Thời tiết nóng)' },
      { word: 'ອາກາດເຢັນ', pronunciation: 'aakat yen', meaning: 'Thời tiết lạnh', example: 'ອາກາດເຢັນ (Thời tiết lạnh)' },
      { word: 'ອາກາດອົບອຸ່ນ', pronunciation: 'aakat obun', meaning: 'Thời tiết ấm', example: 'ອາກາດອົບອຸ່ນ (Thời tiết ấm)' },
      { word: 'ຝົນ', pronunciation: 'fon', meaning: 'Mưa', example: 'ຝົນຕົກ (Trời mưa)' },
      { word: 'ຝົນຕົກ', pronunciation: 'fon tok', meaning: 'Mưa rơi', example: 'ຝົນຕົກ (Mưa rơi)' },
      { word: 'ຝົນຕົກໜັກ', pronunciation: 'fon tok nak', meaning: 'Mưa to', example: 'ຝົນຕົກໜັກ (Mưa to)' },
      { word: 'ຝົນຕົກເບົາ', pronunciation: 'fon tok bao', meaning: 'Mưa nhẹ', example: 'ຝົນຕົກເບົາ (Mưa nhẹ)' },
      { word: 'ຝົນພະຍຸ', pronunciation: 'fon phayu', meaning: 'Bão', example: 'ຝົນພະຍຸ (Bão)' },
      { word: 'ລົມ', pronunciation: 'lom', meaning: 'Gió', example: 'ລົມພັດ (Gió thổi)' },
      { word: 'ລົມພັດ', pronunciation: 'lom phat', meaning: 'Gió thổi', example: 'ລົມພັດ (Gió thổi)' },
      { word: 'ລົມພັດແຮງ', pronunciation: 'lom phat haeng', meaning: 'Gió mạnh', example: 'ລົມພັດແຮງ (Gió mạnh)' },
      { word: 'ລົມພັດເບົາ', pronunciation: 'lom phat bao', meaning: 'Gió nhẹ', example: 'ລົມພັດເບົາ (Gió nhẹ)' },
      { word: 'ຟ້າ', pronunciation: 'fa', meaning: 'Trời', example: 'ຟ້າເປັນແນວໃດ? (Trời thế nào?)' },
      { word: 'ຟ້າແຈ້ງ', pronunciation: 'fa chaeng', meaning: 'Trời nắng', example: 'ຟ້າແຈ້ງ (Trời nắng)' },
      { word: 'ຟ້າມືດ', pronunciation: 'fa mued', meaning: 'Trời tối', example: 'ຟ້າມືດ (Trời tối)' },
      { word: 'ຟ້າຄຳຄູນ', pronunciation: 'fa kham khun', meaning: 'Trời âm u', example: 'ຟ້າຄຳຄູນ (Trời âm u)' },
      { word: 'ຟ້າຮ້ອນ', pronunciation: 'fa hon', meaning: 'Trời nóng', example: 'ຟ້າຮ້ອນ (Trời nóng)' },
      { word: 'ຟ້າເຢັນ', pronunciation: 'fa yen', meaning: 'Trời lạnh', example: 'ຟ້າເຢັນ (Trời lạnh)' },
      { word: 'ຟ້າອົບອຸ່ນ', pronunciation: 'fa obun', meaning: 'Trời ấm', example: 'ຟ້າອົບອຸ່ນ (Trời ấm)' },
      { word: 'ຟ້າຮ້ອນແລະຊຸ່ມ', pronunciation: 'fa hon lae sum', meaning: 'Trời nóng và ẩm', example: 'ຟ້າຮ້ອນແລະຊຸ່ມ (Trời nóng và ẩm)' },
      { word: 'ຟ້າເຢັນແລະແຫ້ງ', pronunciation: 'fa yen lae haeng', meaning: 'Trời lạnh và khô', example: 'ຟ້າເຢັນແລະແຫ້ງ (Trời lạnh và khô)' },
      { word: 'ຟ້າຝົນ', pronunciation: 'fa fon', meaning: 'Trời mưa', example: 'ຟ້າຝົນ (Trời mưa)' },
      { word: 'ຟ້າລົມ', pronunciation: 'fa lom', meaning: 'Trời gió', example: 'ຟ້າລົມ (Trời gió)' },
      { word: 'ຟ້າພະຍຸ', pronunciation: 'fa phayu', meaning: 'Trời bão', example: 'ຟ້າພະຍຸ (Trời bão)' },
      { word: 'ຟ້າຟ້າຜັດ', pronunciation: 'fa fa phat', meaning: 'Trời sấm sét', example: 'ຟ້າຟ້າຜັດ (Trời sấm sét)' },
      { word: 'ຟ້າຟ້າຜັດແລະຝົນ', pronunciation: 'fa fa phat lae fon', meaning: 'Trời sấm sét và mưa', example: 'ຟ້າຟ້າຜັດແລະຝົນ (Trời sấm sét và mưa)' },
      { word: 'ຟ້າຟ້າຜັດແລະລົມ', pronunciation: 'fa fa phat lae lom', meaning: 'Trời sấm sét và gió', example: 'ຟ້າຟ້າຜັດແລະລົມ (Trời sấm sét và gió)' },
      { word: 'ຟ້າຟ້າຜັດແລະພະຍຸ', pronunciation: 'fa fa phat lae phayu', meaning: 'Trời sấm sét và bão', example: 'ຟ້າຟ້າຜັດແລະພະຍຸ (Trời sấm sét và bão)' }
    ],
    grammar: [
      {
        title: 'Cách hỏi về thời tiết',
        explanation: 'Dùng "ອາກາດເປັນແນວໃດ?" hoặc "ຟ້າເປັນແນວໃດ?" để hỏi về thời tiết.',
        structure: 'ອາກາດເປັນແນວໃດ? / ຟ້າເປັນແນວໃດ?',
        examples: [
          'ອາກາດເປັນແນວໃດ? (Thời tiết thế nào?)',
          'ຟ້າເປັນແນວໃດ? (Trời thế nào?)'
        ]
      },
      {
        title: 'Cách nói về thời tiết',
        explanation: 'Khi nói về thời tiết, dùng "ອາກາດ" hoặc "ຟ້າ" trước tính từ.',
        structure: 'ອາກາດ/ຟ້າ + [tính từ]',
        examples: [
          'ອາກາດຮ້ອນ (Thời tiết nóng)',
          'ຟ້າແຈ້ງ (Trời nắng)',
          'ຝົນຕົກ (Trời mưa)'
        ]
      }
    ],
    practice: [
      { question: 'Từ nào có nghĩa là "Thời tiết"?', options: ['ອາກາດ', 'ອາກາດຮ້ອນ', 'ອາກາດເຢັນ'] },
      { question: 'Từ nào có nghĩa là "Thời tiết nóng"?', options: ['ອາກາດຮ້ອນ', 'ອາກາດເຢັນ', 'ອາກາດອົບອຸ່ນ'] },
      { question: 'Từ nào có nghĩa là "Thời tiết lạnh"?', options: ['ອາກາດເຢັນ', 'ອາກາດຮ້ອນ', 'ອາກາດອົບອຸ່ນ'] },
      { question: 'Từ nào có nghĩa là "Thời tiết ấm"?', options: ['ອາກາດອົບອຸ່ນ', 'ອາກາດຮ້ອນ', 'ອາກາດເຢັນ'] },
      { question: 'Từ nào có nghĩa là "Mưa"?', options: ['ຝົນ', 'ຝົນຕົກ', 'ຝົນພະຍຸ'] },
      { question: 'Từ nào có nghĩa là "Mưa rơi"?', options: ['ຝົນຕົກ', 'ຝົນ', 'ຝົນພະຍຸ'] },
      { question: 'Từ nào có nghĩa là "Mưa to"?', options: ['ຝົນຕົກໜັກ', 'ຝົນຕົກເບົາ', 'ຝົນພະຍຸ'] },
      { question: 'Từ nào có nghĩa là "Mưa nhẹ"?', options: ['ຝົນຕົກເບົາ', 'ຝົນຕົກໜັກ', 'ຝົນພະຍຸ'] },
      { question: 'Từ nào có nghĩa là "Bão"?', options: ['ຝົນພະຍຸ', 'ຝົນຕົກ', 'ຝົນຕົກໜັກ'] },
      { question: 'Từ nào có nghĩa là "Gió"?', options: ['ລົມ', 'ລົມພັດ', 'ລົມພັດແຮງ'] },
      { question: 'Từ nào có nghĩa là "Gió thổi"?', options: ['ລົມພັດ', 'ລົມ', 'ລົມພັດແຮງ'] },
      { question: 'Từ nào có nghĩa là "Gió mạnh"?', options: ['ລົມພັດແຮງ', 'ລົມພັດເບົາ', 'ລົມ'] },
      { question: 'Từ nào có nghĩa là "Gió nhẹ"?', options: ['ລົມພັດເບົາ', 'ລົມພັດແຮງ', 'ລົມ'] },
      { question: 'Từ nào có nghĩa là "Trời"?', options: ['ຟ້າ', 'ຟ້າແຈ້ງ', 'ຟ້າມືດ'] },
      { question: 'Từ nào có nghĩa là "Trời nắng"?', options: ['ຟ້າແຈ້ງ', 'ຟ້າມືດ', 'ຟ້າຄຳຄູນ'] },
      { question: 'Từ nào có nghĩa là "Trời tối"?', options: ['ຟ້າມືດ', 'ຟ້າແຈ້ງ', 'ຟ້າຄຳຄູນ'] },
      { question: 'Từ nào có nghĩa là "Trời âm u"?', options: ['ຟ້າຄຳຄູນ', 'ຟ້າແຈ້ງ', 'ຟ້າມືດ'] },
      { question: 'Từ nào có nghĩa là "Trời nóng"?', options: ['ຟ້າຮ້ອນ', 'ຟ້າເຢັນ', 'ຟ້າອົບອຸ່ນ'] },
      { question: 'Từ nào có nghĩa là "Trời lạnh"?', options: ['ຟ້າເຢັນ', 'ຟ້າຮ້ອນ', 'ຟ້າອົບອຸ່ນ'] },
      { question: 'Từ nào có nghĩa là "Trời ấm"?', options: ['ຟ້າອົບອຸ່ນ', 'ຟ້າຮ້ອນ', 'ຟ້າເຢັນ'] },
      { question: 'Từ nào có nghĩa là "Trời nóng và ẩm"?', options: ['ຟ້າຮ້ອນແລະຊຸ່ມ', 'ຟ້າເຢັນແລະແຫ້ງ', 'ຟ້າຝົນ'] },
      { question: 'Từ nào có nghĩa là "Trời lạnh và khô"?', options: ['ຟ້າເຢັນແລະແຫ້ງ', 'ຟ້າຮ້ອນແລະຊຸ່ມ', 'ຟ້າຝົນ'] },
      { question: 'Từ nào có nghĩa là "Trời mưa"?', options: ['ຟ້າຝົນ', 'ຟ້າລົມ', 'ຟ້າພະຍຸ'] },
      { question: 'Từ nào có nghĩa là "Trời gió"?', options: ['ຟ້າລົມ', 'ຟ້າຝົນ', 'ຟ້າພະຍຸ'] },
      { question: 'Từ nào có nghĩa là "Trời bão"?', options: ['ຟ້າພະຍຸ', 'ຟ້າຝົນ', 'ຟ້າລົມ'] },
      { question: 'Từ nào có nghĩa là "Trời sấm sét"?', options: ['ຟ້າຟ້າຜັດ', 'ຟ້າຟ້າຜັດແລະຝົນ', 'ຟ້າຟ້າຜັດແລະລົມ'] },
      { question: 'Từ nào có nghĩa là "Trời sấm sét và mưa"?', options: ['ຟ້າຟ້າຜັດແລະຝົນ', 'ຟ້າຟ້າຜັດ', 'ຟ້າຟ້າຜັດແລະລົມ'] },
      { question: 'Từ nào có nghĩa là "Trời sấm sét và gió"?', options: ['ຟ້າຟ້າຜັດແລະລົມ', 'ຟ້າຟ້າຜັດ', 'ຟ້າຟ້າຜັດແລະຝົນ'] },
      { question: 'Từ nào có nghĩa là "Trời sấm sét và bão"?', options: ['ຟ້າຟ້າຜັດແລະພະຍຸ', 'ຟ້າຟ້າຜັດ', 'ຟ້າຟ້າຜັດແລະຝົນ'] }
    ]
  },
};

export default weather; 