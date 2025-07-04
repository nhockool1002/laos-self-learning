export interface SyllableData {
  consonant: string;
  vowel: string;
  syllable: string;
  pronunciation: string;
}

// Dữ liệu ghép vần cho tất cả phụ âm
export const syllableData: SyllableData[] = [
  // ກ (TRUNG) - nguyên âm ngắn = dấu sắc, nguyên âm dài = thanh ngang
  { consonant: 'ກ', vowel: 'ະ', syllable: 'ກະ', pronunciation: 'ká' },

  { consonant: 'ກ', vowel: 'ິ', syllable: 'ກິ', pronunciation: 'kí' },

  { consonant: 'ກ', vowel: 'ຶ', syllable: 'ກຶ', pronunciation: 'kứ' },

  { consonant: 'ກ', vowel: 'ຸ', syllable: 'ກຸ', pronunciation: 'kú' },

  { consonant: 'ກ', vowel: 'ເະ', syllable: 'ກເະ', pronunciation: 'kế' },

  { consonant: 'ກ', vowel: 'ແະ', syllable: 'ກແະ', pronunciation: 'ké' },

  { consonant: 'ກ', vowel: 'ໂະ', syllable: 'ກໂະ', pronunciation: 'kố' },

  { consonant: 'ກ', vowel: 'ເະ', syllable: 'ກເະ', pronunciation: 'kó' },

  { consonant: 'ກ', vowel: 'ເິ', syllable: 'ກເິ', pronunciation: 'kớ' },

  { consonant: 'ກ', vowel: 'ເັຍະ', syllable: 'ກເັຍະ', pronunciation: 'kía' },

  { consonant: 'ກ', vowel: 'ເືອະ', syllable: 'ກເືອະ', pronunciation: 'kứa' },

  { consonant: 'ກ', vowel: 'ົວະ', syllable: 'ກົວະ', pronunciation: 'kúa' },

  { consonant: 'ກ', vowel: 'າ', syllable: 'ກາ', pronunciation: 'ka' },

  { consonant: 'ກ', vowel: 'ີ', syllable: 'ກີ', pronunciation: 'ki' },

  { consonant: 'ກ', vowel: 'ື', syllable: 'ກື', pronunciation: 'kư' },

  { consonant: 'ກ', vowel: 'ູ', syllable: 'ກູ', pronunciation: 'ku' },

  { consonant: 'ກ', vowel: 'ເ', syllable: 'ກເ', pronunciation: 'kê' },

  { consonant: 'ກ', vowel: 'ແ', syllable: 'ກແ', pronunciation: 'ke' },

  { consonant: 'ກ', vowel: 'ໂ', syllable: 'ກໂ', pronunciation: 'kô' },

  { consonant: 'ກ', vowel: 'ໍ', syllable: 'ກໍ', pronunciation: 'ko' },

  { consonant: 'ກ', vowel: 'ເີ', syllable: 'ກເີ', pronunciation: 'kơ' },

  { consonant: 'ກ', vowel: 'ເຍ', syllable: 'ກເຍ', pronunciation: 'kia' },

  { consonant: 'ກ', vowel: 'ເືອ', syllable: 'ກເືອ', pronunciation: 'kưa' },

  { consonant: 'ກ', vowel: 'ົວະ', syllable: 'ກົວະ', pronunciation: 'kua' },

  { consonant: 'ກ', vowel: 'ໄ', syllable: 'ກໄ', pronunciation: 'kay' },

  { consonant: 'ກ', vowel: 'ໃ', syllable: 'ກໃ', pronunciation: 'kay' },

  { consonant: 'ກ', vowel: 'ເົາ', syllable: 'ກເົາ', pronunciation: 'kâu' },

  { consonant: 'ກ', vowel: 'ໍາ', syllable: 'ກໍາ', pronunciation: 'kăm' },



  { consonant: 'ຂ', vowel: 'ະ', syllable: 'ຂະ', pronunciation: 'khá' },

  { consonant: 'ຂ', vowel: 'ິ', syllable: 'ຂິ', pronunciation: 'khí' },

  { consonant: 'ຂ', vowel: 'ຶ', syllable: 'ຂຶ', pronunciation: 'khứ' },

  { consonant: 'ຂ', vowel: 'ຸ', syllable: 'ຂຸ', pronunciation: 'khú' },

  { consonant: 'ຂ', vowel: 'ເະ', syllable: 'ຂເະ', pronunciation: 'khế' },

  { consonant: 'ຂ', vowel: 'ແະ', syllable: 'ຂແະ', pronunciation: 'khé' },

  { consonant: 'ຂ', vowel: 'ໂະ', syllable: 'ຂໂະ', pronunciation: 'khố' },

  { consonant: 'ຂ', vowel: 'ເະ', syllable: 'ຂເະ', pronunciation: 'khó' },

  { consonant: 'ຂ', vowel: 'ເິ', syllable: 'ຂເິ', pronunciation: 'khớ' },

  { consonant: 'ຂ', vowel: 'ເັຍະ', syllable: 'ຂເັຍະ', pronunciation: 'khía' },

  { consonant: 'ຂ', vowel: 'ເືອະ', syllable: 'ຂເືອະ', pronunciation: 'khứa' },

  { consonant: 'ຂ', vowel: 'ົວະ', syllable: 'ຂົວະ', pronunciation: 'khúa' },

  { consonant: 'ຂ', vowel: 'າ', syllable: 'ຂາ', pronunciation: 'khả' },

  { consonant: 'ຂ', vowel: 'ີ', syllable: 'ຂີ', pronunciation: 'khỉ' },

  { consonant: 'ຂ', vowel: 'ື', syllable: 'ຂື', pronunciation: 'khử' },

  { consonant: 'ຂ', vowel: 'ູ', syllable: 'ຂູ', pronunciation: 'khủ' },

  { consonant: 'ຂ', vowel: 'ເ', syllable: 'ຂເ', pronunciation: 'khể' },

  { consonant: 'ຂ', vowel: 'ແ', syllable: 'ຂແ', pronunciation: 'khẻ' },

  { consonant: 'ຂ', vowel: 'ໂ', syllable: 'ຂໂ', pronunciation: 'khổ' },

  { consonant: 'ຂ', vowel: 'ໍ', syllable: 'ຂໍ', pronunciation: 'khỏ' },

  { consonant: 'ຂ', vowel: 'ເີ', syllable: 'ຂເີ', pronunciation: 'khở' },

  { consonant: 'ຂ', vowel: 'ເຍ', syllable: 'ຂເຍ', pronunciation: 'khỉa' },

  { consonant: 'ຂ', vowel: 'ເືອ', syllable: 'ຂເືອ', pronunciation: 'khửa' },

  { consonant: 'ຂ', vowel: 'ົວ', syllable: 'ຂົວ', pronunciation: 'khủa' },

  { consonant: 'ຂ', vowel: 'ໄ', syllable: 'ຂໄ', pronunciation: 'khảy' },

  { consonant: 'ຂ', vowel: 'ໃ', syllable: 'ຂໃ', pronunciation: 'khảy' },

  { consonant: 'ຂ', vowel: 'ເົາ', syllable: 'ຂເົາ', pronunciation: 'khẩu' },

  { consonant: 'ຂ', vowel: 'ໍາ', syllable: 'ຂໍາ', pronunciation: 'khẳm' },



  { consonant: 'ຄ', vowel: 'ະ', syllable: 'ຄະ', pronunciation: 'khạ' },

  { consonant: 'ຄ', vowel: 'ິ', syllable: 'ຄິ', pronunciation: 'khị' },

  { consonant: 'ຄ', vowel: 'ຶ', syllable: 'ຄຶ', pronunciation: 'khự' },

  { consonant: 'ຄ', vowel: 'ຸ', syllable: 'ຄຸ', pronunciation: 'khụ' },

  { consonant: 'ຄ', vowel: 'ເະ', syllable: 'ຄເະ', pronunciation: 'khệ' },

  { consonant: 'ຄ', vowel: 'ແະ', syllable: 'ຄແະ', pronunciation: 'khẹ' },

  { consonant: 'ຄ', vowel: 'ໂະ', syllable: 'ຄໂະ', pronunciation: 'khộ' },

  { consonant: 'ຄ', vowel: 'ເະ', syllable: 'ຄເະ', pronunciation: 'khọ' },

  { consonant: 'ຄ', vowel: 'ເິ', syllable: 'ຄເິ', pronunciation: 'khợ' },

  { consonant: 'ຄ', vowel: 'ເັຍະ', syllable: 'ຄເັຍະ', pronunciation: 'khịa' },

  { consonant: 'ຄ', vowel: 'ເືອະ', syllable: 'ຄເືອະ', pronunciation: 'khựa' },

  { consonant: 'ຄ', vowel: 'ົວະ', syllable: 'ຄົວະ', pronunciation: 'khụa' },

  { consonant: 'ຄ', vowel: 'າ', syllable: 'ຄາ', pronunciation: 'kha' },

  { consonant: 'ຄ', vowel: 'ີ', syllable: 'ຄີ', pronunciation: 'khi' },

  { consonant: 'ຄ', vowel: 'ື', syllable: 'ຄື', pronunciation: 'khư' },

  { consonant: 'ຄ', vowel: 'ູ', syllable: 'ຄູ', pronunciation: 'khu' },

  { consonant: 'ຄ', vowel: 'ເ', syllable: 'ຄເ', pronunciation: 'khê' },

  { consonant: 'ຄ', vowel: 'ແ', syllable: 'ຄແ', pronunciation: 'khe' },

  { consonant: 'ຄ', vowel: 'ໂ', syllable: 'ຄໂ', pronunciation: 'khô' },

  { consonant: 'ຄ', vowel: 'ໍ', syllable: 'ຄໍ', pronunciation: 'kho' },

  { consonant: 'ຄ', vowel: 'ເີ', syllable: 'ຄເີ', pronunciation: 'khơ' },

  { consonant: 'ຄ', vowel: 'ເຍ', syllable: 'ຄເຍ', pronunciation: 'khia' },

  { consonant: 'ຄ', vowel: 'ເືອ', syllable: 'ຄເືອ', pronunciation: 'khưa' },

  { consonant: 'ຄ', vowel: 'ົວ', syllable: 'ຄົວະ', pronunciation: 'khua' },

  { consonant: 'ຄ', vowel: 'ໄ', syllable: 'ຄໄ', pronunciation: 'khay' },

  { consonant: 'ຄ', vowel: 'ໃ', syllable: 'ຄໃ', pronunciation: 'khay' },

  { consonant: 'ຄ', vowel: 'ເົາ', syllable: 'ຄເົາ', pronunciation: 'khâu' },

  { consonant: 'ຄ', vowel: 'ໍາ', syllable: 'ຄໍາ', pronunciation: 'khăm' },



  { consonant: 'ງ', vowel: 'ະ', syllable: 'ງະ', pronunciation: 'ngạ' },

  { consonant: 'ງ', vowel: 'ິ', syllable: 'ງິ', pronunciation: 'ngị' },

  { consonant: 'ງ', vowel: 'ຶ', syllable: 'ງຶ', pronunciation: 'ngự' },

  { consonant: 'ງ', vowel: 'ຸ', syllable: 'ງຸ', pronunciation: 'ngụ' },

  { consonant: 'ງ', vowel: 'ເະ', syllable: 'ງເະ', pronunciation: 'ngệ' },

  { consonant: 'ງ', vowel: 'ແະ', syllable: 'ງແະ', pronunciation: 'ngẹ' },

  { consonant: 'ງ', vowel: 'ໂະ', syllable: 'ງໂະ', pronunciation: 'ngộ' },

  { consonant: 'ງ', vowel: 'ເະ', syllable: 'ງເະ', pronunciation: 'ngọ' },

  { consonant: 'ງ', vowel: 'ເິ', syllable: 'ງເິ', pronunciation: 'ngợ' },

  { consonant: 'ງ', vowel: 'ເັຍະ', syllable: 'ງເັຍະ', pronunciation: 'ngịa' },

  { consonant: 'ງ', vowel: 'ເືອະ', syllable: 'ງເືອະ', pronunciation: 'ngựa' },

  { consonant: 'ງ', vowel: 'ົວະ', syllable: 'ງົວະ', pronunciation: 'ngụa' },

  { consonant: 'ງ', vowel: 'າ', syllable: 'ງາ', pronunciation: 'nga' },

  { consonant: 'ງ', vowel: 'ີ', syllable: 'ງີ', pronunciation: 'ngi' },

  { consonant: 'ງ', vowel: 'ື', syllable: 'ງື', pronunciation: 'ngư' },

  { consonant: 'ງ', vowel: 'ູ', syllable: 'ງູ', pronunciation: 'ngu' },

  { consonant: 'ງ', vowel: 'ເ', syllable: 'ງເ', pronunciation: 'ngê' },

  { consonant: 'ງ', vowel: 'ແ', syllable: 'ງແ', pronunciation: 'nge' },

  { consonant: 'ງ', vowel: 'ໂ', syllable: 'ງໂ', pronunciation: 'ngô' },

  { consonant: 'ງ', vowel: 'ໍ', syllable: 'ງໍ', pronunciation: 'ngo' },

  { consonant: 'ງ', vowel: 'ເີ', syllable: 'ງເີ', pronunciation: 'ngơ' },

  { consonant: 'ງ', vowel: 'ເຍ', syllable: 'ງເຍ', pronunciation: 'ngia' },

  { consonant: 'ງ', vowel: 'ເືອ', syllable: 'ງເືອ', pronunciation: 'ngưa' },

  { consonant: 'ງ', vowel: 'ົວ', syllable: 'ງົວ', pronunciation: 'ngua' },

  { consonant: 'ງ', vowel: 'ໄ', syllable: 'ງໄ', pronunciation: 'ngay' },

  { consonant: 'ງ', vowel: 'ໃ', syllable: 'ງໃ', pronunciation: 'ngay' },

  { consonant: 'ງ', vowel: 'ເົາ', syllable: 'ງເົາ', pronunciation: 'ngâu' },

  { consonant: 'ງ', vowel: 'ໍາ', syllable: 'ງໍາ', pronunciation: 'ngăm' },



  { consonant: 'ຈ', vowel: 'ະ', syllable: 'ຈະ', pronunciation: 'chá' },

  { consonant: 'ຈ', vowel: 'ິ', syllable: 'ຈິ', pronunciation: 'chí' },

  { consonant: 'ຈ', vowel: 'ຶ', syllable: 'ຈຶ', pronunciation: 'chứ' },

  { consonant: 'ຈ', vowel: 'ຸ', syllable: 'ຈຸ', pronunciation: 'chú' },

  { consonant: 'ຈ', vowel: 'ເະ', syllable: 'ຈເະ', pronunciation: 'chế' },

  { consonant: 'ຈ', vowel: 'ແະ', syllable: 'ຈແະ', pronunciation: 'ché' },

  { consonant: 'ຈ', vowel: 'ໂະ', syllable: 'ຈໂະ', pronunciation: 'chố' },

  { consonant: 'ຈ', vowel: 'ເະ', syllable: 'ຈເະ', pronunciation: 'chó' },

  { consonant: 'ຈ', vowel: 'ເິ', syllable: 'ຈເິ', pronunciation: 'chớ' },

  { consonant: 'ຈ', vowel: 'ເັຍະ', syllable: 'ຈເັຍະ', pronunciation: 'chía' },

  { consonant: 'ຈ', vowel: 'ເືອະ', syllable: 'ຈເືອະ', pronunciation: 'chứa' },

  { consonant: 'ຈ', vowel: 'ົວະ', syllable: 'ຈົວະ', pronunciation: 'chúa' },

  { consonant: 'ຈ', vowel: 'າ', syllable: 'ຈາ', pronunciation: 'cha' },

  { consonant: 'ຈ', vowel: 'ີ', syllable: 'ຈີ', pronunciation: 'chi' },

  { consonant: 'ຈ', vowel: 'ື', syllable: 'ຈື', pronunciation: 'chư' },

  { consonant: 'ຈ', vowel: 'ູ', syllable: 'ຈູ', pronunciation: 'chu' },

  { consonant: 'ຈ', vowel: 'ເ', syllable: 'ຈເ', pronunciation: 'chê' },

  { consonant: 'ຈ', vowel: 'ແ', syllable: 'ຈແ', pronunciation: 'che' },

  { consonant: 'ຈ', vowel: 'ໂ', syllable: 'ຈໂ', pronunciation: 'chô' },

  { consonant: 'ຈ', vowel: 'ໍ', syllable: 'ຈໍ', pronunciation: 'cho' },

  { consonant: 'ຈ', vowel: 'ເີ', syllable: 'ຈເີ', pronunciation: 'chơ' },

  { consonant: 'ຈ', vowel: 'ເຍ', syllable: 'ຈເຍ', pronunciation: 'chia' },

  { consonant: 'ຈ', vowel: 'ເືອ', syllable: 'ຈເືອ', pronunciation: 'chưa' },

  { consonant: 'ຈ', vowel: 'ົວ', syllable: 'ຈົວ', pronunciation: 'chua' },

  { consonant: 'ຈ', vowel: 'ໄ', syllable: 'ຈໄ', pronunciation: 'chay' },

  { consonant: 'ຈ', vowel: 'ໃ', syllable: 'ຈໃ', pronunciation: 'chay' },

  { consonant: 'ຈ', vowel: 'ເົາ', syllable: 'ຈເົາ', pronunciation: 'châu' },

  { consonant: 'ຈ', vowel: 'ໍາ', syllable: 'ຈໍາ', pronunciation: 'chăm' },



  { consonant: 'ສ', vowel: 'ະ', syllable: 'ສະ', pronunciation: 'sá' },

  { consonant: 'ສ', vowel: 'ິ', syllable: 'ສິ', pronunciation: 'sí' },

  { consonant: 'ສ', vowel: 'ຶ', syllable: 'ສຶ', pronunciation: 'sứ' },

  { consonant: 'ສ', vowel: 'ຸ', syllable: 'ສຸ', pronunciation: 'sú' },

  { consonant: 'ສ', vowel: 'ເະ', syllable: 'ສເະ', pronunciation: 'sế' },

  { consonant: 'ສ', vowel: 'ແະ', syllable: 'ສແະ', pronunciation: 'sé' },

  { consonant: 'ສ', vowel: 'ໂະ', syllable: 'ສໂະ', pronunciation: 'số' },

  { consonant: 'ສ', vowel: 'ເະ', syllable: 'ສເະ', pronunciation: 'só' },

  { consonant: 'ສ', vowel: 'ເິ', syllable: 'ສເິ', pronunciation: 'sớ' },

  { consonant: 'ສ', vowel: 'ເັຍະ', syllable: 'ສເັຍະ', pronunciation: 'sía' },

  { consonant: 'ສ', vowel: 'ເືອະ', syllable: 'ສເືອະ', pronunciation: 'sứa' },

  { consonant: 'ສ', vowel: 'ົວະ', syllable: 'ສົວະ', pronunciation: 'súa' },

  { consonant: 'ສ', vowel: 'າ', syllable: 'ສາ', pronunciation: 'sả' },

  { consonant: 'ສ', vowel: 'ີ', syllable: 'ສີ', pronunciation: 'sỉ' },

  { consonant: 'ສ', vowel: 'ື', syllable: 'ສື', pronunciation: 'sử' },

  { consonant: 'ສ', vowel: 'ູ', syllable: 'ສູ', pronunciation: 'sủ' },

  { consonant: 'ສ', vowel: 'ເ', syllable: 'ສເ', pronunciation: 'sể' },

  { consonant: 'ສ', vowel: 'ແ', syllable: 'ສແ', pronunciation: 'sẻ' },

  { consonant: 'ສ', vowel: 'ໂ', syllable: 'ສໂ', pronunciation: 'sổ' },

  { consonant: 'ສ', vowel: 'ໍ', syllable: 'ສໍ', pronunciation: 'sỏ' },

  { consonant: 'ສ', vowel: 'ເີ', syllable: 'ສເີ', pronunciation: 'sở' },

  { consonant: 'ສ', vowel: 'ເຍ', syllable: 'ສເຍ', pronunciation: 'sỉa' },

  { consonant: 'ສ', vowel: 'ເືອ', syllable: 'ສເືອ', pronunciation: 'sửa' },

  { consonant: 'ສ', vowel: 'ົວ', syllable: 'ສົວ', pronunciation: 'sủa' },

  { consonant: 'ສ', vowel: 'ໄ', syllable: 'ສໄ', pronunciation: 'sảy' },

  { consonant: 'ສ', vowel: 'ໃ', syllable: 'ສໃ', pronunciation: 'sảy' },

  { consonant: 'ສ', vowel: 'ເົາ', syllable: 'ສເົາ', pronunciation: 'sẩu' },

  { consonant: 'ສ', vowel: 'ໍາ', syllable: 'ສໍາ', pronunciation: 'sẳm' },



  { consonant: 'ຊ', vowel: 'ະ', syllable: 'ຊະ', pronunciation: 'xạ' },

  { consonant: 'ຊ', vowel: 'ິ', syllable: 'ຊິ', pronunciation: 'xị' },

  { consonant: 'ຊ', vowel: 'ຶ', syllable: 'ຊຶ', pronunciation: 'xự' },

  { consonant: 'ຊ', vowel: 'ຸ', syllable: 'ຊຸ', pronunciation: 'xụ' },

  { consonant: 'ຊ', vowel: 'ເະ', syllable: 'ຊເະ', pronunciation: 'xệ' },

  { consonant: 'ຊ', vowel: 'ແະ', syllable: 'ຊແະ', pronunciation: 'xẹ' },

  { consonant: 'ຊ', vowel: 'ໂະ', syllable: 'ຊໂະ', pronunciation: 'xộ' },

  { consonant: 'ຊ', vowel: 'ເະ', syllable: 'ຊເະ', pronunciation: 'xọ' },

  { consonant: 'ຊ', vowel: 'ເິ', syllable: 'ຊເິ', pronunciation: 'xợ' },

  { consonant: 'ຊ', vowel: 'ເັຍະ', syllable: 'ຊເັຍະ', pronunciation: 'xịa' },

  { consonant: 'ຊ', vowel: 'ເືອະ', syllable: 'ຊເືອະ', pronunciation: 'xựa' },

  { consonant: 'ຊ', vowel: 'ົວະ', syllable: 'ຊົວະ', pronunciation: 'xụa' },

  { consonant: 'ຊ', vowel: 'າ', syllable: 'ຊາ', pronunciation: 'xa' },

  { consonant: 'ຊ', vowel: 'ີ', syllable: 'ຊີ', pronunciation: 'xi' },

  { consonant: 'ຊ', vowel: 'ື', syllable: 'ຊື', pronunciation: 'xư' },

  { consonant: 'ຊ', vowel: 'ູ', syllable: 'ຊູ', pronunciation: 'xu' },

  { consonant: 'ຊ', vowel: 'ເ', syllable: 'ຊເ', pronunciation: 'xê' },

  { consonant: 'ຊ', vowel: 'ແ', syllable: 'ຊແ', pronunciation: 'xe' },

  { consonant: 'ຊ', vowel: 'ໂ', syllable: 'ຊໂ', pronunciation: 'xô' },

  { consonant: 'ຊ', vowel: 'ໍ', syllable: 'ຊໍ', pronunciation: 'xo' },

  { consonant: 'ຊ', vowel: 'ເີ', syllable: 'ຊເີ', pronunciation: 'xơ' },

  { consonant: 'ຊ', vowel: 'ເຍ', syllable: 'ຊເຍ', pronunciation: 'xia' },

  { consonant: 'ຊ', vowel: 'ເືອ', syllable: 'ຊເືອ', pronunciation: 'xưa' },

  { consonant: 'ຊ', vowel: 'ົວ', syllable: 'ຊົວ', pronunciation: 'xua' },

  { consonant: 'ຊ', vowel: 'ໄ', syllable: 'ຊໄ', pronunciation: 'xay' },

  { consonant: 'ຊ', vowel: 'ໃ', syllable: 'ຊໃ', pronunciation: 'xay' },

  { consonant: 'ຊ', vowel: 'ເົາ', syllable: 'ຊເົາ', pronunciation: 'xâu' },

  { consonant: 'ຊ', vowel: 'ໍາ', syllable: 'ຊໍາ', pronunciation: 'xăm' },



  { consonant: 'ຍ', vowel: 'ະ', syllable: 'ຍະ', pronunciation: 'nhạ' },

  { consonant: 'ຍ', vowel: 'ິ', syllable: 'ຍິ', pronunciation: 'nhị' },

  { consonant: 'ຍ', vowel: 'ຶ', syllable: 'ຍຶ', pronunciation: 'nhự' },

  { consonant: 'ຍ', vowel: 'ຸ', syllable: 'ຍຸ', pronunciation: 'nhụ' },

  { consonant: 'ຍ', vowel: 'ເະ', syllable: 'ຍເະ', pronunciation: 'nhệ' },

  { consonant: 'ຍ', vowel: 'ແະ', syllable: 'ຍແະ', pronunciation: 'nhẹ' },

  { consonant: 'ຍ', vowel: 'ໂະ', syllable: 'ຍໂະ', pronunciation: 'nhộ' },

  { consonant: 'ຍ', vowel: 'ເະ', syllable: 'ຍເະ', pronunciation: 'nhọ' },

  { consonant: 'ຍ', vowel: 'ເິ', syllable: 'ຍເິ', pronunciation: 'nhợ' },

  { consonant: 'ຍ', vowel: 'ເັຍະ', syllable: 'ຍເັຍະ', pronunciation: 'nhịa' },

  { consonant: 'ຍ', vowel: 'ເືອະ', syllable: 'ຍເືອະ', pronunciation: 'nhựa' },

  { consonant: 'ຍ', vowel: 'ົວະ', syllable: 'ຍົວະ', pronunciation: 'nhụa' },

  { consonant: 'ຍ', vowel: 'າ', syllable: 'ຍາ', pronunciation: 'nha' },

  { consonant: 'ຍ', vowel: 'ີ', syllable: 'ຍີ', pronunciation: 'nhi' },

  { consonant: 'ຍ', vowel: 'ື', syllable: 'ຍື', pronunciation: 'như' },

  { consonant: 'ຍ', vowel: 'ູ', syllable: 'ຍູ', pronunciation: 'nhu' },

  { consonant: 'ຍ', vowel: 'ເ', syllable: 'ຍເ', pronunciation: 'nhê' },

  { consonant: 'ຍ', vowel: 'ແ', syllable: 'ຍແ', pronunciation: 'nhe' },

  { consonant: 'ຍ', vowel: 'ໂ', syllable: 'ຍໂ', pronunciation: 'nhô' },

  { consonant: 'ຍ', vowel: 'ໍ', syllable: 'ຍໍ', pronunciation: 'nho' },

  { consonant: 'ຍ', vowel: 'ເີ', syllable: 'ຍເີ', pronunciation: 'nhơ' },

  { consonant: 'ຍ', vowel: 'ເຍ', syllable: 'ຍເຍ', pronunciation: 'nhia' },

  { consonant: 'ຍ', vowel: 'ເືອ', syllable: 'ຍເືອ', pronunciation: 'nhưa' },

  { consonant: 'ຍ', vowel: 'ົວ', syllable: 'ຍົວ', pronunciation: 'nhua' },

  { consonant: 'ຍ', vowel: 'ໄ', syllable: 'ຍໄ', pronunciation: 'nhay' },

  { consonant: 'ຍ', vowel: 'ໃ', syllable: 'ຍໃ', pronunciation: 'nhay' },

  { consonant: 'ຍ', vowel: 'ເົາ', syllable: 'ຍເົາ', pronunciation: 'nhâu' },

  { consonant: 'ຍ', vowel: 'ໍາ', syllable: 'ຍໍາ', pronunciation: 'nhăm' },



  { consonant: 'ດ', vowel: 'ະ', syllable: 'ດະ', pronunciation: 'đá' },

  { consonant: 'ດ', vowel: 'ິ', syllable: 'ດິ', pronunciation: 'đí' },

  { consonant: 'ດ', vowel: 'ຶ', syllable: 'ດຶ', pronunciation: 'đứ' },

  { consonant: 'ດ', vowel: 'ຸ', syllable: 'ດຸ', pronunciation: 'đú' },

  { consonant: 'ດ', vowel: 'ເະ', syllable: 'ດເະ', pronunciation: 'đế' },

  { consonant: 'ດ', vowel: 'ແະ', syllable: 'ດແະ', pronunciation: 'đé' },

  { consonant: 'ດ', vowel: 'ໂະ', syllable: 'ດໂະ', pronunciation: 'đố' },

  { consonant: 'ດ', vowel: 'ເະ', syllable: 'ດເະ', pronunciation: 'đó' },

  { consonant: 'ດ', vowel: 'ເິ', syllable: 'ດເິ', pronunciation: 'đớ' },

  { consonant: 'ດ', vowel: 'ເັຍະ', syllable: 'ດເັຍະ', pronunciation: 'đía' },

  { consonant: 'ດ', vowel: 'ເືອະ', syllable: 'ດເືອະ', pronunciation: 'đứa' },

  { consonant: 'ດ', vowel: 'ົວະ', syllable: 'ດົວະ', pronunciation: 'đúa' },

  { consonant: 'ດ', vowel: 'າ', syllable: 'ດາ', pronunciation: 'đa' },

  { consonant: 'ດ', vowel: 'ີ', syllable: 'ດີ', pronunciation: 'đi' },

  { consonant: 'ດ', vowel: 'ື', syllable: 'ດື', pronunciation: 'đư' },

  { consonant: 'ດ', vowel: 'ູ', syllable: 'ດູ', pronunciation: 'đu' },

  { consonant: 'ດ', vowel: 'ເ', syllable: 'ດເ', pronunciation: 'đê' },

  { consonant: 'ດ', vowel: 'ແ', syllable: 'ດແ', pronunciation: 'đe' },

  { consonant: 'ດ', vowel: 'ໂ', syllable: 'ດໂ', pronunciation: 'đô' },

  { consonant: 'ດ', vowel: 'ໍ', syllable: 'ດໍ', pronunciation: 'đo' },

  { consonant: 'ດ', vowel: 'ເີ', syllable: 'ດເີ', pronunciation: 'đơ' },

  { consonant: 'ດ', vowel: 'ເຍ', syllable: 'ດເຍ', pronunciation: 'đia' },

  { consonant: 'ດ', vowel: 'ເືອ', syllable: 'ດເືອ', pronunciation: 'đưa' },

  { consonant: 'ດ', vowel: 'ົວ', syllable: 'ດົວ', pronunciation: 'đua' },

  { consonant: 'ດ', vowel: 'ໄ', syllable: 'ດໄ', pronunciation: 'đay' },

  { consonant: 'ດ', vowel: 'ໃ', syllable: 'ດໃ', pronunciation: 'đay' },

  { consonant: 'ດ', vowel: 'ເົາ', syllable: 'ດເົາ', pronunciation: 'đâu' },

  { consonant: 'ດ', vowel: 'ໍາ', syllable: 'ດໍາ', pronunciation: 'đăm' },



  { consonant: 'ຕ', vowel: 'ະ', syllable: 'ຕະ', pronunciation: 'tá' },

  { consonant: 'ຕ', vowel: 'ິ', syllable: 'ຕິ', pronunciation: 'tí' },

  { consonant: 'ຕ', vowel: 'ຶ', syllable: 'ຕຶ', pronunciation: 'tứ' },

  { consonant: 'ຕ', vowel: 'ຸ', syllable: 'ຕຸ', pronunciation: 'tú' },

  { consonant: 'ຕ', vowel: 'ເະ', syllable: 'ຕເະ', pronunciation: 'tế' },

  { consonant: 'ຕ', vowel: 'ແະ', syllable: 'ຕແະ', pronunciation: 'té' },

  { consonant: 'ຕ', vowel: 'ໂະ', syllable: 'ຕໂະ', pronunciation: 'tố' },

  { consonant: 'ຕ', vowel: 'ເະ', syllable: 'ຕເະ', pronunciation: 'tó' },

  { consonant: 'ຕ', vowel: 'ເິ', syllable: 'ຕເິ', pronunciation: 'tớ' },

  { consonant: 'ຕ', vowel: 'ເັຍະ', syllable: 'ຕເັຍະ', pronunciation: 'tía' },

  { consonant: 'ຕ', vowel: 'ເືອະ', syllable: 'ຕເືອະ', pronunciation: 'tứa' },

  { consonant: 'ຕ', vowel: 'ົວະ', syllable: 'ຕົວະ', pronunciation: 'túa' },

  { consonant: 'ຕ', vowel: 'າ', syllable: 'ຕາ', pronunciation: 'ta' },

  { consonant: 'ຕ', vowel: 'ີ', syllable: 'ຕີ', pronunciation: 'ti' },

  { consonant: 'ຕ', vowel: 'ື', syllable: 'ຕື', pronunciation: 'tư' },

  { consonant: 'ຕ', vowel: 'ູ', syllable: 'ຕູ', pronunciation: 'tu' },

  { consonant: 'ຕ', vowel: 'ເ', syllable: 'ຕເ', pronunciation: 'tê' },

  { consonant: 'ຕ', vowel: 'ແ', syllable: 'ຕແ', pronunciation: 'te' },

  { consonant: 'ຕ', vowel: 'ໂ', syllable: 'ຕໂ', pronunciation: 'tô' },

  { consonant: 'ຕ', vowel: 'ໍ', syllable: 'ຕໍ', pronunciation: 'to' },

  { consonant: 'ຕ', vowel: 'ເີ', syllable: 'ຕເີ', pronunciation: 'tơ' },

  { consonant: 'ຕ', vowel: 'ເຍ', syllable: 'ຕເຍ', pronunciation: 'tia' },

  { consonant: 'ຕ', vowel: 'ເືອ', syllable: 'ຕເືອ', pronunciation: 'tưa' },

  { consonant: 'ຕ', vowel: 'ົວ', syllable: 'ຕົວ', pronunciation: 'tua' },

  { consonant: 'ຕ', vowel: 'ໄ', syllable: 'ຕໄ', pronunciation: 'tay' },

  { consonant: 'ຕ', vowel: 'ໃ', syllable: 'ຕໃ', pronunciation: 'tay' },

  { consonant: 'ຕ', vowel: 'ເົາ', syllable: 'ຕເົາ', pronunciation: 'tâu' },

  { consonant: 'ຕ', vowel: 'ໍາ', syllable: 'ຕໍາ', pronunciation: 'tăm' },



  { consonant: 'ຖ', vowel: 'ະ', syllable: 'ຖະ', pronunciation: 'thá' },

  { consonant: 'ຖ', vowel: 'ິ', syllable: 'ຖິ', pronunciation: 'thí' },

  { consonant: 'ຖ', vowel: 'ຶ', syllable: 'ຖຶ', pronunciation: 'thứ' },

  { consonant: 'ຖ', vowel: 'ຸ', syllable: 'ຖຸ', pronunciation: 'thú' },

  { consonant: 'ຖ', vowel: 'ເະ', syllable: 'ຖເະ', pronunciation: 'thế' },

  { consonant: 'ຖ', vowel: 'ແະ', syllable: 'ຖແະ', pronunciation: 'thé' },

  { consonant: 'ຖ', vowel: 'ໂະ', syllable: 'ຖໂະ', pronunciation: 'thố' },

  { consonant: 'ຖ', vowel: 'ເະ', syllable: 'ຖເະ', pronunciation: 'thó' },

  { consonant: 'ຖ', vowel: 'ເິ', syllable: 'ຖເິ', pronunciation: 'thớ' },

  { consonant: 'ຖ', vowel: 'ເັຍະ', syllable: 'ຖເັຍະ', pronunciation: 'thía' },

  { consonant: 'ຖ', vowel: 'ເືອະ', syllable: 'ຖເືອະ', pronunciation: 'thứa' },

  { consonant: 'ຖ', vowel: 'ົວະ', syllable: 'ຖົວະ', pronunciation: 'thúa' },

  { consonant: 'ຖ', vowel: 'າ', syllable: 'ຖາ', pronunciation: 'thả' },

  { consonant: 'ຖ', vowel: 'ີ', syllable: 'ຖີ', pronunciation: 'thỉ' },

  { consonant: 'ຖ', vowel: 'ື', syllable: 'ຖື', pronunciation: 'thử' },

  { consonant: 'ຖ', vowel: 'ູ', syllable: 'ຖູ', pronunciation: 'thủ' },

  { consonant: 'ຖ', vowel: 'ເ', syllable: 'ຖເ', pronunciation: 'thể' },

  { consonant: 'ຖ', vowel: 'ແ', syllable: 'ຖແ', pronunciation: 'thẻ' },

  { consonant: 'ຖ', vowel: 'ໂ', syllable: 'ຖໂ', pronunciation: 'thổ' },

  { consonant: 'ຖ', vowel: 'ໍ', syllable: 'ຖໍ', pronunciation: 'thỏ' },

  { consonant: 'ຖ', vowel: 'ເີ', syllable: 'ຖເີ', pronunciation: 'thở' },

  { consonant: 'ຖ', vowel: 'ເຍ', syllable: 'ຖເຍ', pronunciation: 'thỉa' },

  { consonant: 'ຖ', vowel: 'ເືອ', syllable: 'ຖເືອ', pronunciation: 'thửa' },

  { consonant: 'ຖ', vowel: 'ົວ', syllable: 'ຖົວ', pronunciation: 'thủa' },

  { consonant: 'ຖ', vowel: 'ໄ', syllable: 'ຖໄ', pronunciation: 'thảy' },

  { consonant: 'ຖ', vowel: 'ໃ', syllable: 'ຖໃ', pronunciation: 'thảy' },

  { consonant: 'ຖ', vowel: 'ເົາ', syllable: 'ຖເົາ', pronunciation: 'thẩu' },

  { consonant: 'ຖ', vowel: 'ໍາ', syllable: 'ຖໍາ', pronunciation: 'thẳm' },



  { consonant: 'ທ', vowel: 'ະ', syllable: 'ທະ', pronunciation: 'thạ' },

  { consonant: 'ທ', vowel: 'ິ', syllable: 'ທິ', pronunciation: 'thị' },

  { consonant: 'ທ', vowel: 'ຶ', syllable: 'ທຶ', pronunciation: 'thự' },

  { consonant: 'ທ', vowel: 'ຸ', syllable: 'ທຸ', pronunciation: 'thụ' },

  { consonant: 'ທ', vowel: 'ເະ', syllable: 'ທເະ', pronunciation: 'thệ' },

  { consonant: 'ທ', vowel: 'ແະ', syllable: 'ທແະ', pronunciation: 'thẹ' },

  { consonant: 'ທ', vowel: 'ໂະ', syllable: 'ທໂະ', pronunciation: 'thộ' },

  { consonant: 'ທ', vowel: 'ເະ', syllable: 'ທເະ', pronunciation: 'thọ' },

  { consonant: 'ທ', vowel: 'ເິ', syllable: 'ທເິ', pronunciation: 'thợ' },

  { consonant: 'ທ', vowel: 'ເັຍະ', syllable: 'ທເັຍະ', pronunciation: 'thịa' },

  { consonant: 'ທ', vowel: 'ເືອະ', syllable: 'ທເືອະ', pronunciation: 'thựa' },

  { consonant: 'ທ', vowel: 'ົວະ', syllable: 'ທົວະ', pronunciation: 'thụa' },

  { consonant: 'ທ', vowel: 'າ', syllable: 'ທາ', pronunciation: 'tha' },

  { consonant: 'ທ', vowel: 'ີ', syllable: 'ທີ', pronunciation: 'thi' },

  { consonant: 'ທ', vowel: 'ື', syllable: 'ທື', pronunciation: 'thư' },

  { consonant: 'ທ', vowel: 'ູ', syllable: 'ທູ', pronunciation: 'thu' },

  { consonant: 'ທ', vowel: 'ເ', syllable: 'ທເ', pronunciation: 'thê' },

  { consonant: 'ທ', vowel: 'ແ', syllable: 'ທແ', pronunciation: 'the' },

  { consonant: 'ທ', vowel: 'ໂ', syllable: 'ທໂ', pronunciation: 'thô' },

  { consonant: 'ທ', vowel: 'ໍ', syllable: 'ທໍ', pronunciation: 'tho' },

  { consonant: 'ທ', vowel: 'ເີ', syllable: 'ທເີ', pronunciation: 'thơ' },

  { consonant: 'ທ', vowel: 'ເຍ', syllable: 'ທເຍ', pronunciation: 'thia' },

  { consonant: 'ທ', vowel: 'ເືອ', syllable: 'ທເືອ', pronunciation: 'thưa' },

  { consonant: 'ທ', vowel: 'ົວ', syllable: 'ທົວ', pronunciation: 'thua' },

  { consonant: 'ທ', vowel: 'ໄ', syllable: 'ທໄ', pronunciation: 'thay' },

  { consonant: 'ທ', vowel: 'ໃ', syllable: 'ທໃ', pronunciation: 'thay' },

  { consonant: 'ທ', vowel: 'ເົາ', syllable: 'ທເົາ', pronunciation: 'thâu' },

  { consonant: 'ທ', vowel: 'ໍາ', syllable: 'ທໍາ', pronunciation: 'thăm' },



  { consonant: 'ນ', vowel: 'ະ', syllable: 'ນະ', pronunciation: 'nạ' },

  { consonant: 'ນ', vowel: 'ິ', syllable: 'ນິ', pronunciation: 'nị' },

  { consonant: 'ນ', vowel: 'ຶ', syllable: 'ນຶ', pronunciation: 'nự' },

  { consonant: 'ນ', vowel: 'ຸ', syllable: 'ນຸ', pronunciation: 'nụ' },

  { consonant: 'ນ', vowel: 'ເະ', syllable: 'ນເະ', pronunciation: 'nệ' },

  { consonant: 'ນ', vowel: 'ແະ', syllable: 'ນແະ', pronunciation: 'nẹ' },

  { consonant: 'ນ', vowel: 'ໂະ', syllable: 'ນໂະ', pronunciation: 'nộ' },

  { consonant: 'ນ', vowel: 'ເະ', syllable: 'ນເະ', pronunciation: 'nọ' },

  { consonant: 'ນ', vowel: 'ເິ', syllable: 'ນເິ', pronunciation: 'nợ' },

  { consonant: 'ນ', vowel: 'ເັຍະ', syllable: 'ນເັຍະ', pronunciation: 'nịa' },

  { consonant: 'ນ', vowel: 'ເືອະ', syllable: 'ນເືອະ', pronunciation: 'nựa' },

  { consonant: 'ນ', vowel: 'ົວະ', syllable: 'ນົວະ', pronunciation: 'nụa' },

  { consonant: 'ນ', vowel: 'າ', syllable: 'ນາ', pronunciation: 'na' },

  { consonant: 'ນ', vowel: 'ີ', syllable: 'ນີ', pronunciation: 'ni' },

  { consonant: 'ນ', vowel: 'ື', syllable: 'ນື', pronunciation: 'nư' },

  { consonant: 'ນ', vowel: 'ູ', syllable: 'ນູ', pronunciation: 'nu' },

  { consonant: 'ນ', vowel: 'ເ', syllable: 'ນເ', pronunciation: 'nê' },

  { consonant: 'ນ', vowel: 'ແ', syllable: 'ນແ', pronunciation: 'ne' },

  { consonant: 'ນ', vowel: 'ໂ', syllable: 'ນໂ', pronunciation: 'nô' },

  { consonant: 'ນ', vowel: 'ໍ', syllable: 'ນໍ', pronunciation: 'no' },

  { consonant: 'ນ', vowel: 'ເີ', syllable: 'ນເີ', pronunciation: 'nơ' },

  { consonant: 'ນ', vowel: 'ເຍ', syllable: 'ນເຍ', pronunciation: 'nia' },

  { consonant: 'ນ', vowel: 'ເືອ', syllable: 'ນເືອ', pronunciation: 'nưa' },

  { consonant: 'ນ', vowel: 'ົວ', syllable: 'ນົວ', pronunciation: 'nua' },

  { consonant: 'ນ', vowel: 'ໄ', syllable: 'ນໄ', pronunciation: 'nay' },

  { consonant: 'ນ', vowel: 'ໃ', syllable: 'ນໃ', pronunciation: 'nay' },

  { consonant: 'ນ', vowel: 'ເົາ', syllable: 'ນເົາ', pronunciation: 'nâu' },

  { consonant: 'ນ', vowel: 'ໍາ', syllable: 'ນໍາ', pronunciation: 'năm' },



  { consonant: 'ບ', vowel: 'ະ', syllable: 'ບະ', pronunciation: 'bá' },

  { consonant: 'ບ', vowel: 'ິ', syllable: 'ບິ', pronunciation: 'bí' },

  { consonant: 'ບ', vowel: 'ຶ', syllable: 'ບຶ', pronunciation: 'bứ' },

  { consonant: 'ບ', vowel: 'ຸ', syllable: 'ບຸ', pronunciation: 'bú' },

  { consonant: 'ບ', vowel: 'ເະ', syllable: 'ບເະ', pronunciation: 'bế' },

  { consonant: 'ບ', vowel: 'ແະ', syllable: 'ບແະ', pronunciation: 'bé' },

  { consonant: 'ບ', vowel: 'ໂະ', syllable: 'ບໂະ', pronunciation: 'bố' },

  { consonant: 'ບ', vowel: 'ເະ', syllable: 'ບເະ', pronunciation: 'bó' },

  { consonant: 'ບ', vowel: 'ເິ', syllable: 'ບເິ', pronunciation: 'bớ' },

  { consonant: 'ບ', vowel: 'ເັຍະ', syllable: 'ບເັຍະ', pronunciation: 'bía' },

  { consonant: 'ບ', vowel: 'ເືອະ', syllable: 'ບເືອະ', pronunciation: 'bứa' },

  { consonant: 'ບ', vowel: 'ົວະ', syllable: 'ບົວະ', pronunciation: 'búa' },

  { consonant: 'ບ', vowel: 'າ', syllable: 'ບາ', pronunciation: 'ba' },

  { consonant: 'ບ', vowel: 'ີ', syllable: 'ບີ', pronunciation: 'bi' },

  { consonant: 'ບ', vowel: 'ື', syllable: 'ບື', pronunciation: 'bư' },

  { consonant: 'ບ', vowel: 'ູ', syllable: 'ບູ', pronunciation: 'bu' },

  { consonant: 'ບ', vowel: 'ເ', syllable: 'ບເ', pronunciation: 'bê' },

  { consonant: 'ບ', vowel: 'ແ', syllable: 'ບແ', pronunciation: 'be' },

  { consonant: 'ບ', vowel: 'ໂ', syllable: 'ບໂ', pronunciation: 'bô' },

  { consonant: 'ບ', vowel: 'ໍ', syllable: 'ບໍ', pronunciation: 'bo' },

  { consonant: 'ບ', vowel: 'ເີ', syllable: 'ບເີ', pronunciation: 'bơ' },

  { consonant: 'ບ', vowel: 'ເຍ', syllable: 'ບເຍ', pronunciation: 'bia' },

  { consonant: 'ບ', vowel: 'ເືອ', syllable: 'ບເືອ', pronunciation: 'bưa' },

  { consonant: 'ບ', vowel: 'ົວ', syllable: 'ບົວ', pronunciation: 'bua' },

  { consonant: 'ບ', vowel: 'ໄ', syllable: 'ບໄ', pronunciation: 'bay' },

  { consonant: 'ບ', vowel: 'ໃ', syllable: 'ບໃ', pronunciation: 'bay' },

  { consonant: 'ບ', vowel: 'ເົາ', syllable: 'ບເົາ', pronunciation: 'bâu' },

  { consonant: 'ບ', vowel: 'ໍາ', syllable: 'ບໍາ', pronunciation: 'băm' },



  { consonant: 'ປ', vowel: 'ະ', syllable: 'ປະ', pronunciation: 'pá' },

  { consonant: 'ປ', vowel: 'ິ', syllable: 'ປິ', pronunciation: 'pí' },

  { consonant: 'ປ', vowel: 'ຶ', syllable: 'ປຶ', pronunciation: 'pứ' },

  { consonant: 'ປ', vowel: 'ຸ', syllable: 'ປຸ', pronunciation: 'pú' },

  { consonant: 'ປ', vowel: 'ເະ', syllable: 'ປເະ', pronunciation: 'pế' },

  { consonant: 'ປ', vowel: 'ແະ', syllable: 'ປແະ', pronunciation: 'pé' },

  { consonant: 'ປ', vowel: 'ໂະ', syllable: 'ປໂະ', pronunciation: 'pố' },

  { consonant: 'ປ', vowel: 'ເະ', syllable: 'ປເະ', pronunciation: 'pó' },

  { consonant: 'ປ', vowel: 'ເິ', syllable: 'ປເິ', pronunciation: 'pớ' },

  { consonant: 'ປ', vowel: 'ເັຍະ', syllable: 'ປເັຍະ', pronunciation: 'pía' },

  { consonant: 'ປ', vowel: 'ເືອະ', syllable: 'ປເືອະ', pronunciation: 'pứa' },

  { consonant: 'ປ', vowel: 'ົວະ', syllable: 'ປົວະ', pronunciation: 'púa' },

  { consonant: 'ປ', vowel: 'າ', syllable: 'ປາ', pronunciation: 'pa' },

  { consonant: 'ປ', vowel: 'ີ', syllable: 'ປີ', pronunciation: 'pi' },

  { consonant: 'ປ', vowel: 'ື', syllable: 'ປື', pronunciation: 'pư' },

  { consonant: 'ປ', vowel: 'ູ', syllable: 'ປູ', pronunciation: 'pu' },

  { consonant: 'ປ', vowel: 'ເ', syllable: 'ປເ', pronunciation: 'pê' },

  { consonant: 'ປ', vowel: 'ແ', syllable: 'ປແ', pronunciation: 'pe' },

  { consonant: 'ປ', vowel: 'ໂ', syllable: 'ປໂ', pronunciation: 'pô' },

  { consonant: 'ປ', vowel: 'ໍ', syllable: 'ປໍ', pronunciation: 'po' },

  { consonant: 'ປ', vowel: 'ເີ', syllable: 'ປເີ', pronunciation: 'pơ' },

  { consonant: 'ປ', vowel: 'ເຍ', syllable: 'ປເຍ', pronunciation: 'pia' },

  { consonant: 'ປ', vowel: 'ເືອ', syllable: 'ປເືອ', pronunciation: 'pưa' },

  { consonant: 'ປ', vowel: 'ົວ', syllable: 'ປົວ', pronunciation: 'pua' },

  { consonant: 'ປ', vowel: 'ໄ', syllable: 'ປໄ', pronunciation: 'pay' },

  { consonant: 'ປ', vowel: 'ໃ', syllable: 'ປໃ', pronunciation: 'pay' },

  { consonant: 'ປ', vowel: 'ເົາ', syllable: 'ປເົາ', pronunciation: 'pâu' },

  { consonant: 'ປ', vowel: 'ໍາ', syllable: 'ປໍາ', pronunciation: 'păm' },



  { consonant: 'ຜ', vowel: 'ະ', syllable: 'ຜະ', pronunciation: 'phá' },

  { consonant: 'ຜ', vowel: 'ິ', syllable: 'ຜິ', pronunciation: 'phí' },

  { consonant: 'ຜ', vowel: 'ຶ', syllable: 'ຜຶ', pronunciation: 'phứ' },

  { consonant: 'ຜ', vowel: 'ຸ', syllable: 'ຜຸ', pronunciation: 'phú' },

  { consonant: 'ຜ', vowel: 'ເະ', syllable: 'ຜເະ', pronunciation: 'phế' },

  { consonant: 'ຜ', vowel: 'ແະ', syllable: 'ຜແະ', pronunciation: 'phé' },

  { consonant: 'ຜ', vowel: 'ໂະ', syllable: 'ຜໂະ', pronunciation: 'phố' },

  { consonant: 'ຜ', vowel: 'ເະ', syllable: 'ຜເະ', pronunciation: 'phó' },

  { consonant: 'ຜ', vowel: 'ເິ', syllable: 'ຜເິ', pronunciation: 'phớ' },

  { consonant: 'ຜ', vowel: 'ເັຍະ', syllable: 'ຜເັຍະ', pronunciation: 'phía' },

  { consonant: 'ຜ', vowel: 'ເືອະ', syllable: 'ຜເືອະ', pronunciation: 'phứa' },

  { consonant: 'ຜ', vowel: 'ົວະ', syllable: 'ຜົວະ', pronunciation: 'phúa' },

  { consonant: 'ຜ', vowel: 'າ', syllable: 'ຜາ', pronunciation: 'phả' },

  { consonant: 'ຜ', vowel: 'ີ', syllable: 'ຜີ', pronunciation: 'phỉ' },

  { consonant: 'ຜ', vowel: 'ື', syllable: 'ຜື', pronunciation: 'phử' },

  { consonant: 'ຜ', vowel: 'ູ', syllable: 'ຜູ', pronunciation: 'phủ' },

  { consonant: 'ຜ', vowel: 'ເ', syllable: 'ຜເ', pronunciation: 'phể' },

  { consonant: 'ຜ', vowel: 'ແ', syllable: 'ຜແ', pronunciation: 'phẻ' },

  { consonant: 'ຜ', vowel: 'ໂ', syllable: 'ຜໂ', pronunciation: 'phổ' },

  { consonant: 'ຜ', vowel: 'ໍ', syllable: 'ຜໍ', pronunciation: 'phỏ' },

  { consonant: 'ຜ', vowel: 'ເີ', syllable: 'ຜເີ', pronunciation: 'phở' },

  { consonant: 'ຜ', vowel: 'ເຍ', syllable: 'ຜເຍ', pronunciation: 'phỉa' },

  { consonant: 'ຜ', vowel: 'ເືອ', syllable: 'ຜເືອ', pronunciation: 'phửa' },

  { consonant: 'ຜ', vowel: 'ົວ', syllable: 'ຜົວ', pronunciation: 'phủa' },

  { consonant: 'ຜ', vowel: 'ໄ', syllable: 'ຜໄ', pronunciation: 'phảy' },

  { consonant: 'ຜ', vowel: 'ໃ', syllable: 'ຜໃ', pronunciation: 'phảy' },

  { consonant: 'ຜ', vowel: 'ເົາ', syllable: 'ຜເົາ', pronunciation: 'phẩu' },

  { consonant: 'ຜ', vowel: 'ໍາ', syllable: 'ຜໍາ', pronunciation: 'phẳm' },



  { consonant: 'ຝ', vowel: 'ະ', syllable: 'ຝະ', pronunciation: 'fá' },

  { consonant: 'ຝ', vowel: 'ິ', syllable: 'ຝິ', pronunciation: 'fí' },

  { consonant: 'ຝ', vowel: 'ຶ', syllable: 'ຝຶ', pronunciation: 'fứ' },

  { consonant: 'ຝ', vowel: 'ຸ', syllable: 'ຝຸ', pronunciation: 'fú' },

  { consonant: 'ຝ', vowel: 'ເະ', syllable: 'ຝເະ', pronunciation: 'fế' },

  { consonant: 'ຝ', vowel: 'ແະ', syllable: 'ຝແະ', pronunciation: 'fé' },

  { consonant: 'ຝ', vowel: 'ໂະ', syllable: 'ຝໂະ', pronunciation: 'fố' },

  { consonant: 'ຝ', vowel: 'ເະ', syllable: 'ຝເະ', pronunciation: 'fó' },

  { consonant: 'ຝ', vowel: 'ເິ', syllable: 'ຝເິ', pronunciation: 'fớ' },

  { consonant: 'ຝ', vowel: 'ເັຍະ', syllable: 'ຝເັຍະ', pronunciation: 'fía' },

  { consonant: 'ຝ', vowel: 'ເືອະ', syllable: 'ຝເືອະ', pronunciation: 'fứa' },

  { consonant: 'ຝ', vowel: 'ົວະ', syllable: 'ຝົວະ', pronunciation: 'fúa' },

  { consonant: 'ຝ', vowel: 'າ', syllable: 'ຝາ', pronunciation: 'fả' },

  { consonant: 'ຝ', vowel: 'ີ', syllable: 'ຝີ', pronunciation: 'fỉ' },

  { consonant: 'ຝ', vowel: 'ື', syllable: 'ຝື', pronunciation: 'fử' },

  { consonant: 'ຝ', vowel: 'ູ', syllable: 'ຝູ', pronunciation: 'fủ' },

  { consonant: 'ຝ', vowel: 'ເ', syllable: 'ຝເ', pronunciation: 'fể' },

  { consonant: 'ຝ', vowel: 'ແ', syllable: 'ຝແ', pronunciation: 'fẻ' },

  { consonant: 'ຝ', vowel: 'ໂ', syllable: 'ຝໂ', pronunciation: 'fổ' },

  { consonant: 'ຝ', vowel: 'ໍ', syllable: 'ຝໍ', pronunciation: 'fỏ' },

  { consonant: 'ຝ', vowel: 'ເີ', syllable: 'ຝເີ', pronunciation: 'fở' },

  { consonant: 'ຝ', vowel: 'ເຍ', syllable: 'ຝເຍ', pronunciation: 'fỉa' },

  { consonant: 'ຝ', vowel: 'ເືອ', syllable: 'ຝເືອ', pronunciation: 'fửa' },

  { consonant: 'ຝ', vowel: 'ົວ', syllable: 'ຝົວ', pronunciation: 'fủa' },

  { consonant: 'ຝ', vowel: 'ໄ', syllable: 'ຝໄ', pronunciation: 'fảy' },

  { consonant: 'ຝ', vowel: 'ໃ', syllable: 'ຝໃ', pronunciation: 'fảy' },

  { consonant: 'ຝ', vowel: 'ເົາ', syllable: 'ຝເົາ', pronunciation: 'fẩu' },

  { consonant: 'ຝ', vowel: 'ໍາ', syllable: 'ຝໍາ', pronunciation: 'fẳm' },



  { consonant: 'ພ', vowel: 'ະ', syllable: 'ພະ', pronunciation: 'phạ' },

  { consonant: 'ພ', vowel: 'ິ', syllable: 'ພິ', pronunciation: 'phị' },

  { consonant: 'ພ', vowel: 'ຶ', syllable: 'ພຶ', pronunciation: 'phự' },

  { consonant: 'ພ', vowel: 'ຸ', syllable: 'ພຸ', pronunciation: 'phụ' },

  { consonant: 'ພ', vowel: 'ເະ', syllable: 'ພເະ', pronunciation: 'phệ' },

  { consonant: 'ພ', vowel: 'ແະ', syllable: 'ພແະ', pronunciation: 'phẹ' },

  { consonant: 'ພ', vowel: 'ໂະ', syllable: 'ພໂະ', pronunciation: 'phộ' },

  { consonant: 'ພ', vowel: 'ເະ', syllable: 'ພເະ', pronunciation: 'phọ' },

  { consonant: 'ພ', vowel: 'ເິ', syllable: 'ພເິ', pronunciation: 'phợ' },

  { consonant: 'ພ', vowel: 'ເັຍະ', syllable: 'ພເັຍະ', pronunciation: 'phịa' },

  { consonant: 'ພ', vowel: 'ເືອະ', syllable: 'ພເືອະ', pronunciation: 'phựa' },

  { consonant: 'ພ', vowel: 'ົວະ', syllable: 'ພົວະ', pronunciation: 'phụa' },

  { consonant: 'ພ', vowel: 'າ', syllable: 'ພາ', pronunciation: 'pha' },

  { consonant: 'ພ', vowel: 'ີ', syllable: 'ພີ', pronunciation: 'phi' },

  { consonant: 'ພ', vowel: 'ື', syllable: 'ພື', pronunciation: 'phư' },

  { consonant: 'ພ', vowel: 'ູ', syllable: 'ພູ', pronunciation: 'phu' },

  { consonant: 'ພ', vowel: 'ເ', syllable: 'ພເ', pronunciation: 'phê' },

  { consonant: 'ພ', vowel: 'ແ', syllable: 'ພແ', pronunciation: 'phe' },

  { consonant: 'ພ', vowel: 'ໂ', syllable: 'ພໂ', pronunciation: 'phô' },

  { consonant: 'ພ', vowel: 'ໍ', syllable: 'ພໍ', pronunciation: 'pho' },

  { consonant: 'ພ', vowel: 'ເີ', syllable: 'ພເີ', pronunciation: 'phơ' },

  { consonant: 'ພ', vowel: 'ເຍ', syllable: 'ພເຍ', pronunciation: 'phia' },

  { consonant: 'ພ', vowel: 'ເືອ', syllable: 'ພເືອ', pronunciation: 'phưa' },

  { consonant: 'ພ', vowel: 'ົວ', syllable: 'ພົວ', pronunciation: 'phua' },

  { consonant: 'ພ', vowel: 'ໄ', syllable: 'ພໄ', pronunciation: 'phay' },

  { consonant: 'ພ', vowel: 'ໃ', syllable: 'ພໃ', pronunciation: 'phay' },

  { consonant: 'ພ', vowel: 'ເົາ', syllable: 'ພເົາ', pronunciation: 'phâu' },

  { consonant: 'ພ', vowel: 'ໍາ', syllable: 'ພໍາ', pronunciation: 'phăm' },



  { consonant: 'ຟ', vowel: 'ະ', syllable: 'ຟະ', pronunciation: 'fạ' },

  { consonant: 'ຟ', vowel: 'ິ', syllable: 'ຟິ', pronunciation: 'fị' },

  { consonant: 'ຟ', vowel: 'ຶ', syllable: 'ຟຶ', pronunciation: 'fự' },

  { consonant: 'ຟ', vowel: 'ຸ', syllable: 'ຟຸ', pronunciation: 'fụ' },

  { consonant: 'ຟ', vowel: 'ເະ', syllable: 'ຟເະ', pronunciation: 'fệ' },

  { consonant: 'ຟ', vowel: 'ແະ', syllable: 'ຟແະ', pronunciation: 'fẹ' },

  { consonant: 'ຟ', vowel: 'ໂະ', syllable: 'ຟໂະ', pronunciation: 'fộ' },

  { consonant: 'ຟ', vowel: 'ເະ', syllable: 'ຟເະ', pronunciation: 'fọ' },

  { consonant: 'ຟ', vowel: 'ເິ', syllable: 'ຟເິ', pronunciation: 'fợ' },

  { consonant: 'ຟ', vowel: 'ເັຍະ', syllable: 'ຟເັຍະ', pronunciation: 'fịa' },

  { consonant: 'ຟ', vowel: 'ເືອະ', syllable: 'ຟເືອະ', pronunciation: 'fựa' },

  { consonant: 'ຟ', vowel: 'ົວະ', syllable: 'ຟົວະ', pronunciation: 'fụa' },

  { consonant: 'ຟ', vowel: 'າ', syllable: 'ຟາ', pronunciation: 'fa' },

  { consonant: 'ຟ', vowel: 'ີ', syllable: 'ຟີ', pronunciation: 'fi' },

  { consonant: 'ຟ', vowel: 'ື', syllable: 'ຟື', pronunciation: 'fư' },

  { consonant: 'ຟ', vowel: 'ູ', syllable: 'ຟູ', pronunciation: 'fu' },

  { consonant: 'ຟ', vowel: 'ເ', syllable: 'ຟເ', pronunciation: 'fê' },

  { consonant: 'ຟ', vowel: 'ແ', syllable: 'ຟແ', pronunciation: 'fe' },

  { consonant: 'ຟ', vowel: 'ໂ', syllable: 'ຟໂ', pronunciation: 'fô' },

  { consonant: 'ຟ', vowel: 'ໍ', syllable: 'ຟໍ', pronunciation: 'fo' },

  { consonant: 'ຟ', vowel: 'ເີ', syllable: 'ຟເີ', pronunciation: 'fơ' },

  { consonant: 'ຟ', vowel: 'ເຍ', syllable: 'ຟເຍ', pronunciation: 'fia' },

  { consonant: 'ຟ', vowel: 'ເືອ', syllable: 'ຟເືອ', pronunciation: 'fưa' },

  { consonant: 'ຟ', vowel: 'ົວ', syllable: 'ຟົວ', pronunciation: 'fua' },

  { consonant: 'ຟ', vowel: 'ໄ', syllable: 'ຟໄ', pronunciation: 'fay' },

  { consonant: 'ຟ', vowel: 'ໃ', syllable: 'ຟໃ', pronunciation: 'fay' },

  { consonant: 'ຟ', vowel: 'ເົາ', syllable: 'ຟເົາ', pronunciation: 'fâu' },

  { consonant: 'ຟ', vowel: 'ໍາ', syllable: 'ຟໍາ', pronunciation: 'făm' },


  { consonant: 'ຟ', vowel: 'ເົາ', syllable: 'ຟເົາ', pronunciation: 'fâu' },

  { consonant: 'ຟ', vowel: 'ໍາ', syllable: 'ຟໍາ', pronunciation: 'făm' },



  { consonant: 'ມ', vowel: 'ະ', syllable: 'ມະ', pronunciation: 'mạ' },

  { consonant: 'ມ', vowel: 'ິ', syllable: 'ມິ', pronunciation: 'mị' },

  { consonant: 'ມ', vowel: 'ຶ', syllable: 'ມຶ', pronunciation: 'mự' },

  { consonant: 'ມ', vowel: 'ຸ', syllable: 'ມຸ', pronunciation: 'mụ' },

  { consonant: 'ມ', vowel: 'ເະ', syllable: 'ມເະ', pronunciation: 'mệ' },

  { consonant: 'ມ', vowel: 'ແະ', syllable: 'ມແະ', pronunciation: 'mẹ' },

  { consonant: 'ມ', vowel: 'ໂະ', syllable: 'ມໂະ', pronunciation: 'mộ' },

  { consonant: 'ມ', vowel: 'ເະ', syllable: 'ມເະ', pronunciation: 'mọ' },

  { consonant: 'ມ', vowel: 'ເິ', syllable: 'ມເິ', pronunciation: 'mợ' },

  { consonant: 'ມ', vowel: 'ເັຍະ', syllable: 'ມເັຍະ', pronunciation: 'mịa' },

  { consonant: 'ມ', vowel: 'ເືອະ', syllable: 'ມເືອະ', pronunciation: 'mựa' },

  { consonant: 'ມ', vowel: 'ົວະ', syllable: 'ມົວະ', pronunciation: 'mụa' },

  { consonant: 'ມ', vowel: 'າ', syllable: 'ມາ', pronunciation: 'ma' },

  { consonant: 'ມ', vowel: 'ີ', syllable: 'ມີ', pronunciation: 'mi' },

  { consonant: 'ມ', vowel: 'ື', syllable: 'ມື', pronunciation: 'mư' },

  { consonant: 'ມ', vowel: 'ູ', syllable: 'ມູ', pronunciation: 'mu' },

  { consonant: 'ມ', vowel: 'ເ', syllable: 'ມເ', pronunciation: 'mê' },

  { consonant: 'ມ', vowel: 'ແ', syllable: 'ມແ', pronunciation: 'me' },

  { consonant: 'ມ', vowel: 'ໂ', syllable: 'ມໂ', pronunciation: 'mô' },

  { consonant: 'ມ', vowel: 'ໍ', syllable: 'ມໍ', pronunciation: 'mo' },

  { consonant: 'ມ', vowel: 'ເີ', syllable: 'ມເີ', pronunciation: 'mơ' },

  { consonant: 'ມ', vowel: 'ເຍ', syllable: 'ມເຍ', pronunciation: 'mia' },

  { consonant: 'ມ', vowel: 'ເືອ', syllable: 'ມເືອ', pronunciation: 'mưa' },

  { consonant: 'ມ', vowel: 'ົວ', syllable: 'ມົວ', pronunciation: 'mua' },

  { consonant: 'ມ', vowel: 'ໄ', syllable: 'ມໄ', pronunciation: 'may' },

  { consonant: 'ມ', vowel: 'ໃ', syllable: 'ມໃ', pronunciation: 'may' },

  { consonant: 'ມ', vowel: 'ເົາ', syllable: 'ມເົາ', pronunciation: 'mâu' },

  { consonant: 'ມ', vowel: 'ໍາ', syllable: 'ມໍາ', pronunciation: 'măm' },



  { consonant: 'ຢ', vowel: 'ະ', syllable: 'ຢະ', pronunciation: 'yá' },

  { consonant: 'ຢ', vowel: 'ິ', syllable: 'ຢິ', pronunciation: 'yí' },

  { consonant: 'ຢ', vowel: 'ຶ', syllable: 'ຢຶ', pronunciation: 'yứ' },

  { consonant: 'ຢ', vowel: 'ຸ', syllable: 'ຢຸ', pronunciation: 'yú' },

  { consonant: 'ຢ', vowel: 'ເະ', syllable: 'ຢເະ', pronunciation: 'yế' },

  { consonant: 'ຢ', vowel: 'ແະ', syllable: 'ຢແະ', pronunciation: 'yé' },

  { consonant: 'ຢ', vowel: 'ໂະ', syllable: 'ຢໂະ', pronunciation: 'yố' },

  { consonant: 'ຢ', vowel: 'ເະ', syllable: 'ຢເະ', pronunciation: 'yó' },

  { consonant: 'ຢ', vowel: 'ເິ', syllable: 'ຢເິ', pronunciation: 'yớ' },

  { consonant: 'ຢ', vowel: 'ເັຍະ', syllable: 'ຢເັຍະ', pronunciation: 'yía' },

  { consonant: 'ຢ', vowel: 'ເືອະ', syllable: 'ຢເືອະ', pronunciation: 'yứa' },

  { consonant: 'ຢ', vowel: 'ົວະ', syllable: 'ຢົວະ', pronunciation: 'yúa' },

  { consonant: 'ຢ', vowel: 'າ', syllable: 'ຢາ', pronunciation: 'ya' },

  { consonant: 'ຢ', vowel: 'ີ', syllable: 'ຢີ', pronunciation: 'yi' },

  { consonant: 'ຢ', vowel: 'ື', syllable: 'ຢື', pronunciation: 'yư' },

  { consonant: 'ຢ', vowel: 'ູ', syllable: 'ຢູ', pronunciation: 'yu' },

  { consonant: 'ຢ', vowel: 'ເ', syllable: 'ຢເ', pronunciation: 'yê' },

  { consonant: 'ຢ', vowel: 'ແ', syllable: 'ຢແ', pronunciation: 'ye' },

  { consonant: 'ຢ', vowel: 'ໂ', syllable: 'ຢໂ', pronunciation: 'yô' },

  { consonant: 'ຢ', vowel: 'ໍ', syllable: 'ຢໍ', pronunciation: 'yo' },

  { consonant: 'ຢ', vowel: 'ເີ', syllable: 'ຢເີ', pronunciation: 'yơ' },

  { consonant: 'ຢ', vowel: 'ເຍ', syllable: 'ຢເຍ', pronunciation: 'yia' },

  { consonant: 'ຢ', vowel: 'ເືອ', syllable: 'ຢເືອ', pronunciation: 'yưa' },

  { consonant: 'ຢ', vowel: 'ົວ', syllable: 'ຢົວ', pronunciation: 'yua' },

  { consonant: 'ຢ', vowel: 'ໄ', syllable: 'ຢໄ', pronunciation: 'yay' },

  { consonant: 'ຢ', vowel: 'ໃ', syllable: 'ຢໃ', pronunciation: 'yay' },

  { consonant: 'ຢ', vowel: 'ເົາ', syllable: 'ຢເົາ', pronunciation: 'yâu' },

  { consonant: 'ຢ', vowel: 'ໍາ', syllable: 'ຢໍາ', pronunciation: 'yăm' },


  { consonant: 'ຢ', vowel: 'ເົາ', syllable: 'ຢເົາ', pronunciation: 'yâu' },

  { consonant: 'ຢ', vowel: 'ໍາ', syllable: 'ຢໍາ', pronunciation: 'yăm' },



  { consonant: 'ຣ', vowel: 'ະ', syllable: 'ຣະ', pronunciation: 'rạ' },

  { consonant: 'ຣ', vowel: 'ິ', syllable: 'ຣິ', pronunciation: 'rị' },

  { consonant: 'ຣ', vowel: 'ຶ', syllable: 'ຣຶ', pronunciation: 'rự' },

  { consonant: 'ຣ', vowel: 'ຸ', syllable: 'ຣຸ', pronunciation: 'rụ' },

  { consonant: 'ຣ', vowel: 'ເະ', syllable: 'ຣເະ', pronunciation: 'rệ' },

  { consonant: 'ຣ', vowel: 'ແະ', syllable: 'ຣແະ', pronunciation: 'rẹ' },

  { consonant: 'ຣ', vowel: 'ໂະ', syllable: 'ຣໂະ', pronunciation: 'rộ' },

  { consonant: 'ຣ', vowel: 'ເະ', syllable: 'ຣເະ', pronunciation: 'rọ' },

  { consonant: 'ຣ', vowel: 'ເິ', syllable: 'ຣເິ', pronunciation: 'rợ' },

  { consonant: 'ຣ', vowel: 'ເັຍະ', syllable: 'ຣເັຍະ', pronunciation: 'rịa' },

  { consonant: 'ຣ', vowel: 'ເືອະ', syllable: 'ຣເືອະ', pronunciation: 'rựa' },

  { consonant: 'ຣ', vowel: 'ົວະ', syllable: 'ຣົວະ', pronunciation: 'rụa' },

  { consonant: 'ຣ', vowel: 'າ', syllable: 'ຣາ', pronunciation: 'ra' },

  { consonant: 'ຣ', vowel: 'ີ', syllable: 'ຣີ', pronunciation: 'ri' },

  { consonant: 'ຣ', vowel: 'ື', syllable: 'ຣື', pronunciation: 'rư' },

  { consonant: 'ຣ', vowel: 'ູ', syllable: 'ຣູ', pronunciation: 'ru' },

  { consonant: 'ຣ', vowel: 'ເ', syllable: 'ຣເ', pronunciation: 'rê' },

  { consonant: 'ຣ', vowel: 'ແ', syllable: 'ຣແ', pronunciation: 're' },

  { consonant: 'ຣ', vowel: 'ໂ', syllable: 'ຣໂ', pronunciation: 'rô' },

  { consonant: 'ຣ', vowel: 'ໍ', syllable: 'ຣໍ', pronunciation: 'ro' },

  { consonant: 'ຣ', vowel: 'ເີ', syllable: 'ຣເີ', pronunciation: 'rơ' },

  { consonant: 'ຣ', vowel: 'ເຍ', syllable: 'ຣເຍ', pronunciation: 'ria' },

  { consonant: 'ຣ', vowel: 'ເືອ', syllable: 'ຣເືອ', pronunciation: 'rưa' },

  { consonant: 'ຣ', vowel: 'ົວ', syllable: 'ຣົວ', pronunciation: 'rua' },

  { consonant: 'ຣ', vowel: 'ໄ', syllable: 'ຣໄ', pronunciation: 'ray' },

  { consonant: 'ຣ', vowel: 'ໃ', syllable: 'ຣໃ', pronunciation: 'ray' },

  { consonant: 'ຣ', vowel: 'ເົາ', syllable: 'ຣເົາ', pronunciation: 'râu' },

  { consonant: 'ຣ', vowel: 'ໍາ', syllable: 'ຣໍາ', pronunciation: 'răm' },



  { consonant: 'ລ', vowel: 'ະ', syllable: 'ລະ', pronunciation: 'lạ' },

  { consonant: 'ລ', vowel: 'ິ', syllable: 'ລິ', pronunciation: 'lị' },

  { consonant: 'ລ', vowel: 'ຶ', syllable: 'ລຶ', pronunciation: 'lự' },

  { consonant: 'ລ', vowel: 'ຸ', syllable: 'ລຸ', pronunciation: 'lụ' },

  { consonant: 'ລ', vowel: 'ເະ', syllable: 'ລເະ', pronunciation: 'lệ' },

  { consonant: 'ລ', vowel: 'ແະ', syllable: 'ລແະ', pronunciation: 'lẹ' },

  { consonant: 'ລ', vowel: 'ໂະ', syllable: 'ລໂະ', pronunciation: 'lộ' },

  { consonant: 'ລ', vowel: 'ເະ', syllable: 'ລເະ', pronunciation: 'lọ' },

  { consonant: 'ລ', vowel: 'ເິ', syllable: 'ລເິ', pronunciation: 'lợ' },

  { consonant: 'ລ', vowel: 'ເັຍະ', syllable: 'ລເັຍະ', pronunciation: 'lịa' },

  { consonant: 'ລ', vowel: 'ເືອະ', syllable: 'ລເືອະ', pronunciation: 'lựa' },

  { consonant: 'ລ', vowel: 'ົວະ', syllable: 'ລົວະ', pronunciation: 'lụa' },

  { consonant: 'ລ', vowel: 'າ', syllable: 'ລາ', pronunciation: 'la' },

  { consonant: 'ລ', vowel: 'ີ', syllable: 'ລີ', pronunciation: 'li' },

  { consonant: 'ລ', vowel: 'ື', syllable: 'ລື', pronunciation: 'lư' },

  { consonant: 'ລ', vowel: 'ູ', syllable: 'ລູ', pronunciation: 'lu' },

  { consonant: 'ລ', vowel: 'ເ', syllable: 'ລເ', pronunciation: 'lê' },

  { consonant: 'ລ', vowel: 'ແ', syllable: 'ລແ', pronunciation: 'le' },

  { consonant: 'ລ', vowel: 'ໂ', syllable: 'ລໂ', pronunciation: 'lô' },

  { consonant: 'ລ', vowel: 'ໍ', syllable: 'ລໍ', pronunciation: 'lo' },

  { consonant: 'ລ', vowel: 'ເີ', syllable: 'ລເີ', pronunciation: 'lơ' },

  { consonant: 'ລ', vowel: 'ເຍ', syllable: 'ລເຍ', pronunciation: 'lia' },

  { consonant: 'ລ', vowel: 'ເືອ', syllable: 'ລເືອ', pronunciation: 'lưa' },

  { consonant: 'ລ', vowel: 'ົວ', syllable: 'ລົວ', pronunciation: 'lua' },

  { consonant: 'ລ', vowel: 'ໄ', syllable: 'ລໄ', pronunciation: 'lay' },

  { consonant: 'ລ', vowel: 'ໃ', syllable: 'ລໃ', pronunciation: 'lay' },

  { consonant: 'ລ', vowel: 'ເົາ', syllable: 'ລເົາ', pronunciation: 'lâu' },

  { consonant: 'ລ', vowel: 'ໍາ', syllable: 'ລໍາ', pronunciation: 'lăm' },



  { consonant: 'ວ', vowel: 'ະ', syllable: 'ວະ', pronunciation: 'wạ' },

  { consonant: 'ວ', vowel: 'ິ', syllable: 'ວິ', pronunciation: 'wị' },

  { consonant: 'ວ', vowel: 'ຶ', syllable: 'ວຶ', pronunciation: 'wự' },

  { consonant: 'ວ', vowel: 'ຸ', syllable: 'ວຸ', pronunciation: 'wụ' },

  { consonant: 'ວ', vowel: 'ເະ', syllable: 'ວເະ', pronunciation: 'wệ' },

  { consonant: 'ວ', vowel: 'ແະ', syllable: 'ວແະ', pronunciation: 'wẹ' },

  { consonant: 'ວ', vowel: 'ໂະ', syllable: 'ວໂະ', pronunciation: 'wộ' },

  { consonant: 'ວ', vowel: 'ເະ', syllable: 'ວເະ', pronunciation: 'wọ' },

  { consonant: 'ວ', vowel: 'ເິ', syllable: 'ວເິ', pronunciation: 'wợ' },

  { consonant: 'ວ', vowel: 'ເັຍະ', syllable: 'ວເັຍະ', pronunciation: 'wịa' },

  { consonant: 'ວ', vowel: 'ເືອະ', syllable: 'ວເືອະ', pronunciation: 'wựa' },

  { consonant: 'ວ', vowel: 'ົວະ', syllable: 'ວົວະ', pronunciation: 'wụa' },

  { consonant: 'ວ', vowel: 'າ', syllable: 'ວາ', pronunciation: 'wa' },

  { consonant: 'ວ', vowel: 'ີ', syllable: 'ວີ', pronunciation: 'wi' },

  { consonant: 'ວ', vowel: 'ື', syllable: 'ວື', pronunciation: 'wư' },

  { consonant: 'ວ', vowel: 'ູ', syllable: 'ວູ', pronunciation: 'wu' },

  { consonant: 'ວ', vowel: 'ເ', syllable: 'ວເ', pronunciation: 'wê' },

  { consonant: 'ວ', vowel: 'ແ', syllable: 'ວແ', pronunciation: 'we' },

  { consonant: 'ວ', vowel: 'ໂ', syllable: 'ວໂ', pronunciation: 'wô' },

  { consonant: 'ວ', vowel: 'ໍ', syllable: 'ວໍ', pronunciation: 'wo' },

  { consonant: 'ວ', vowel: 'ເີ', syllable: 'ວເີ', pronunciation: 'wơ' },

  { consonant: 'ວ', vowel: 'ເຍ', syllable: 'ວເຍ', pronunciation: 'wia' },

  { consonant: 'ວ', vowel: 'ເືອ', syllable: 'ວເືອ', pronunciation: 'wưa' },

  { consonant: 'ວ', vowel: 'ົວ', syllable: 'ວົວ', pronunciation: 'wua' },

  { consonant: 'ວ', vowel: 'ໄ', syllable: 'ວໄ', pronunciation: 'way' },

  { consonant: 'ວ', vowel: 'ໃ', syllable: 'ວໃ', pronunciation: 'way' },

  { consonant: 'ວ', vowel: 'ເົາ', syllable: 'ວເົາ', pronunciation: 'wâu' },

  { consonant: 'ວ', vowel: 'ໍາ', syllable: 'ວໍາ', pronunciation: 'wăm' },



  { consonant: 'ຫ', vowel: 'ະ', syllable: 'ຫະ', pronunciation: 'há' },

  { consonant: 'ຫ', vowel: 'ິ', syllable: 'ຫິ', pronunciation: 'hí' },

  { consonant: 'ຫ', vowel: 'ຶ', syllable: 'ຫຶ', pronunciation: 'hứ' },

  { consonant: 'ຫ', vowel: 'ຸ', syllable: 'ຫຸ', pronunciation: 'hú' },

  { consonant: 'ຫ', vowel: 'ເະ', syllable: 'ຫເະ', pronunciation: 'hế' },

  { consonant: 'ຫ', vowel: 'ແະ', syllable: 'ຫແະ', pronunciation: 'hé' },

  { consonant: 'ຫ', vowel: 'ໂະ', syllable: 'ຫໂະ', pronunciation: 'hố' },

  { consonant: 'ຫ', vowel: 'ເະ', syllable: 'ຫເະ', pronunciation: 'hó' },

  { consonant: 'ຫ', vowel: 'ເິ', syllable: 'ຫເິ', pronunciation: 'hớ' },

  { consonant: 'ຫ', vowel: 'ເັຍະ', syllable: 'ຫເັຍະ', pronunciation: 'hía' },

  { consonant: 'ຫ', vowel: 'ເືອະ', syllable: 'ຫເືອະ', pronunciation: 'hứa' },

  { consonant: 'ຫ', vowel: 'ົວະ', syllable: 'ຫົວະ', pronunciation: 'húa' },

  { consonant: 'ຫ', vowel: 'າ', syllable: 'ຫາ', pronunciation: 'hả' },

  { consonant: 'ຫ', vowel: 'ີ', syllable: 'ຫີ', pronunciation: 'hỉ' },

  { consonant: 'ຫ', vowel: 'ື', syllable: 'ຫື', pronunciation: 'hử' },

  { consonant: 'ຫ', vowel: 'ູ', syllable: 'ຫູ', pronunciation: 'hủ' },

  { consonant: 'ຫ', vowel: 'ເ', syllable: 'ຫເ', pronunciation: 'hể' },

  { consonant: 'ຫ', vowel: 'ແ', syllable: 'ຫແ', pronunciation: 'hẻ' },

  { consonant: 'ຫ', vowel: 'ໂ', syllable: 'ຫໂ', pronunciation: 'hổ' },

  { consonant: 'ຫ', vowel: 'ໍ', syllable: 'ຫໍ', pronunciation: 'hỏ' },

  { consonant: 'ຫ', vowel: 'ເີ', syllable: 'ຫເີ', pronunciation: 'hở' },

  { consonant: 'ຫ', vowel: 'ເຍ', syllable: 'ຫເຍ', pronunciation: 'hỉa' },

  { consonant: 'ຫ', vowel: 'ເືອ', syllable: 'ຫເືອ', pronunciation: 'hửa' },

  { consonant: 'ຫ', vowel: 'ົວ', syllable: 'ຫົວ', pronunciation: 'hủa' },

  { consonant: 'ຫ', vowel: 'ໄ', syllable: 'ຫໄ', pronunciation: 'hảy' },

  { consonant: 'ຫ', vowel: 'ໃ', syllable: 'ຫໃ', pronunciation: 'hảy' },

  { consonant: 'ຫ', vowel: 'ເົາ', syllable: 'ຫເົາ', pronunciation: 'hẩu' },

  { consonant: 'ຫ', vowel: 'ໍາ', syllable: 'ຫໍາ', pronunciation: 'hẳm' },



  { consonant: 'ອ', vowel: 'ະ', syllable: 'ອະ', pronunciation: 'á' },

  { consonant: 'ອ', vowel: 'ິ', syllable: 'ອິ', pronunciation: 'í' },

  { consonant: 'ອ', vowel: 'ຶ', syllable: 'ອຶ', pronunciation: 'ứ' },

  { consonant: 'ອ', vowel: 'ຸ', syllable: 'ອຸ', pronunciation: 'ú' },

  { consonant: 'ອ', vowel: 'ເະ', syllable: 'ອເະ', pronunciation: 'ế' },

  { consonant: 'ອ', vowel: 'ແະ', syllable: 'ອແະ', pronunciation: 'é' },

  { consonant: 'ອ', vowel: 'ໂະ', syllable: 'ອໂະ', pronunciation: 'ố' },

  { consonant: 'ອ', vowel: 'ເະ', syllable: 'ອເະ', pronunciation: 'ó' },

  { consonant: 'ອ', vowel: 'ເິ', syllable: 'ອເິ', pronunciation: 'ớ' },

  { consonant: 'ອ', vowel: 'ເັຍະ', syllable: 'ອເັຍະ', pronunciation: 'ía' },

  { consonant: 'ອ', vowel: 'ເືອະ', syllable: 'ອເືອະ', pronunciation: 'ứa' },

  { consonant: 'ອ', vowel: 'ົວະ', syllable: 'ອົວະ', pronunciation: 'úa' },

  { consonant: 'ອ', vowel: 'າ', syllable: 'ອາ', pronunciation: 'a' },

  { consonant: 'ອ', vowel: 'ີ', syllable: 'ອີ', pronunciation: 'i' },

  { consonant: 'ອ', vowel: 'ື', syllable: 'ອື', pronunciation: 'ư' },

  { consonant: 'ອ', vowel: 'ູ', syllable: 'ອູ', pronunciation: 'u' },

  { consonant: 'ອ', vowel: 'ເ', syllable: 'ອເ', pronunciation: 'ê' },

  { consonant: 'ອ', vowel: 'ແ', syllable: 'ອແ', pronunciation: 'e' },

  { consonant: 'ອ', vowel: 'ໂ', syllable: 'ອໂ', pronunciation: 'ô' },

  { consonant: 'ອ', vowel: 'ໍ', syllable: 'ອໍ', pronunciation: 'o' },

  { consonant: 'ອ', vowel: 'ເີ', syllable: 'ອເີ', pronunciation: 'ơ' },

  { consonant: 'ອ', vowel: 'ເຍ', syllable: 'ອເຍ', pronunciation: 'ia' },

  { consonant: 'ອ', vowel: 'ເືອ', syllable: 'ອເືອ', pronunciation: 'ưa' },

  { consonant: 'ອ', vowel: 'ົວ', syllable: 'ອົວ', pronunciation: 'ua' },

  { consonant: 'ອ', vowel: 'ໄ', syllable: 'ອໄ', pronunciation: 'ay' },

  { consonant: 'ອ', vowel: 'ໃ', syllable: 'ອໃ', pronunciation: 'ay' },

  { consonant: 'ອ', vowel: 'ເົາ', syllable: 'ອເົາ', pronunciation: 'âu' },

  { consonant: 'ອ', vowel: 'ໍາ', syllable: 'ອໍາ', pronunciation: 'ăm' },



  { consonant: 'ຮ', vowel: 'ະ', syllable: 'ຮະ', pronunciation: 'hạ' },

  { consonant: 'ຮ', vowel: 'ິ', syllable: 'ຮິ', pronunciation: 'hị' },

  { consonant: 'ຮ', vowel: 'ຶ', syllable: 'ຮຶ', pronunciation: 'hự' },

  { consonant: 'ຮ', vowel: 'ຸ', syllable: 'ຮຸ', pronunciation: 'hụ' },

  { consonant: 'ຮ', vowel: 'ເະ', syllable: 'ຮເະ', pronunciation: 'hệ' },

  { consonant: 'ຮ', vowel: 'ແະ', syllable: 'ຮແະ', pronunciation: 'hẹ' },

  { consonant: 'ຮ', vowel: 'ໂະ', syllable: 'ຮໂະ', pronunciation: 'hộ' },

  { consonant: 'ຮ', vowel: 'ເະ', syllable: 'ຮເະ', pronunciation: 'họ' },

  { consonant: 'ຮ', vowel: 'ເິ', syllable: 'ຮເິ', pronunciation: 'hợ' },

  { consonant: 'ຮ', vowel: 'ເັຍະ', syllable: 'ຮເັຍະ', pronunciation: 'hịa' },

  { consonant: 'ຮ', vowel: 'ເືອະ', syllable: 'ຮເືອະ', pronunciation: 'hựa' },

  { consonant: 'ຮ', vowel: 'ົວະ', syllable: 'ຮົວະ', pronunciation: 'hụa' },

  { consonant: 'ຮ', vowel: 'າ', syllable: 'ຮາ', pronunciation: 'ha' },

  { consonant: 'ຮ', vowel: 'ີ', syllable: 'ຮີ', pronunciation: 'hi' },

  { consonant: 'ຮ', vowel: 'ື', syllable: 'ຮື', pronunciation: 'hư' },

  { consonant: 'ຮ', vowel: 'ູ', syllable: 'ຮູ', pronunciation: 'hu' },

  { consonant: 'ຮ', vowel: 'ເ', syllable: 'ຮເ', pronunciation: 'hê' },

  { consonant: 'ຮ', vowel: 'ແ', syllable: 'ຮແ', pronunciation: 'he' },

  { consonant: 'ຮ', vowel: 'ໂ', syllable: 'ຮໂ', pronunciation: 'hô' },

  { consonant: 'ຮ', vowel: 'ໍ', syllable: 'ຮໍ', pronunciation: 'ho' },

  { consonant: 'ຮ', vowel: 'ເີ', syllable: 'ຮເີ', pronunciation: 'hơ' },

  { consonant: 'ຮ', vowel: 'ເຍ', syllable: 'ຮເຍ', pronunciation: 'hia' },

  { consonant: 'ຮ', vowel: 'ເືອ', syllable: 'ຮເືອ', pronunciation: 'hưa' },

  { consonant: 'ຮ', vowel: 'ົວ', syllable: 'ຮົວ', pronunciation: 'hua' },

  { consonant: 'ຮ', vowel: 'ໄ', syllable: 'ຮໄ', pronunciation: 'hay' },

  { consonant: 'ຮ', vowel: 'ໃ', syllable: 'ຮໃ', pronunciation: 'hay' },

  { consonant: 'ຮ', vowel: 'ເົາ', syllable: 'ຮເົາ', pronunciation: 'hâu' },

  { consonant: 'ຮ', vowel: 'ໍາ', syllable: 'ຮໍາ', pronunciation: 'hăm' },


  { consonant: 'ຮ', vowel: 'ເົາ', syllable: 'ຮເົາ', pronunciation: 'hâu' },

  { consonant: 'ຮ', vowel: 'ໍາ', syllable: 'ຮໍາ', pronunciation: 'hăm' },



  { consonant: 'ຫງ', vowel: 'ະ', syllable: 'ຫງະ', pronunciation: 'ngá' },

  { consonant: 'ຫງ', vowel: 'ິ', syllable: 'ຫງິ', pronunciation: 'ngí' },

  { consonant: 'ຫງ', vowel: 'ຶ', syllable: 'ຫງຶ', pronunciation: 'ngứ' },

  { consonant: 'ຫງ', vowel: 'ຸ', syllable: 'ຫງຸ', pronunciation: 'ngú' },

  { consonant: 'ຫງ', vowel: 'ເະ', syllable: 'ຫງເະ', pronunciation: 'ngế' },

  { consonant: 'ຫງ', vowel: 'ແະ', syllable: 'ຫງແະ', pronunciation: 'ngé' },

  { consonant: 'ຫງ', vowel: 'ໂະ', syllable: 'ຫງໂະ', pronunciation: 'ngố' },

  { consonant: 'ຫງ', vowel: 'ເະ', syllable: 'ຫງເະ', pronunciation: 'ngó' },

  { consonant: 'ຫງ', vowel: 'ເິ', syllable: 'ຫງເິ', pronunciation: 'ngớ' },

  { consonant: 'ຫງ', vowel: 'ເັຍະ', syllable: 'ຫງເັຍະ', pronunciation: 'ngía' },

  { consonant: 'ຫງ', vowel: 'ເືອະ', syllable: 'ຫງເືອະ', pronunciation: 'ngứa' },

  { consonant: 'ຫງ', vowel: 'ົວະ', syllable: 'ຫງົວະ', pronunciation: 'ngúa' },

  { consonant: 'ຫງ', vowel: 'າ', syllable: 'ຫງາ', pronunciation: 'ngả' },

  { consonant: 'ຫງ', vowel: 'ີ', syllable: 'ຫງີ', pronunciation: 'ngỉ' },

  { consonant: 'ຫງ', vowel: 'ື', syllable: 'ຫງື', pronunciation: 'ngử' },

  { consonant: 'ຫງ', vowel: 'ູ', syllable: 'ຫງູ', pronunciation: 'ngủ' },

  { consonant: 'ຫງ', vowel: 'ເ', syllable: 'ຫງເ', pronunciation: 'ngể' },

  { consonant: 'ຫງ', vowel: 'ແ', syllable: 'ຫງແ', pronunciation: 'ngẻ' },

  { consonant: 'ຫງ', vowel: 'ໂ', syllable: 'ຫງໂ', pronunciation: 'ngổ' },

  { consonant: 'ຫງ', vowel: 'ໍ', syllable: 'ຫງໍ', pronunciation: 'ngỏ' },

  { consonant: 'ຫງ', vowel: 'ເີ', syllable: 'ຫງເີ', pronunciation: 'ngở' },

  { consonant: 'ຫງ', vowel: 'ເຍ', syllable: 'ຫງເຍ', pronunciation: 'ngỉa' },

  { consonant: 'ຫງ', vowel: 'ເືອ', syllable: 'ຫງເືອ', pronunciation: 'ngửa' },

  { consonant: 'ຫງ', vowel: 'ົວ', syllable: 'ຫງົວ', pronunciation: 'ngủa' },

  { consonant: 'ຫງ', vowel: 'ໄ', syllable: 'ຫງໄ', pronunciation: 'ngảy' },

  { consonant: 'ຫງ', vowel: 'ໃ', syllable: 'ຫງໃ', pronunciation: 'ngảy' },

  { consonant: 'ຫງ', vowel: 'ເົາ', syllable: 'ຫງເົາ', pronunciation: 'ngẩu' },

  { consonant: 'ຫງ', vowel: 'ໍາ', syllable: 'ຫງໍາ', pronunciation: 'ngẳm' },



  { consonant: 'ຫຍ', vowel: 'ະ', syllable: 'ຫຍະ', pronunciation: 'nhá' },

  { consonant: 'ຫຍ', vowel: 'ິ', syllable: 'ຫຍິ', pronunciation: 'nhí' },

  { consonant: 'ຫຍ', vowel: 'ຶ', syllable: 'ຫຍຶ', pronunciation: 'nhứ' },

  { consonant: 'ຫຍ', vowel: 'ຸ', syllable: 'ຫຍຸ', pronunciation: 'nhú' },

  { consonant: 'ຫຍ', vowel: 'ເະ', syllable: 'ຫຍເະ', pronunciation: 'nhế' },

  { consonant: 'ຫຍ', vowel: 'ແະ', syllable: 'ຫຍແະ', pronunciation: 'nhé' },

  { consonant: 'ຫຍ', vowel: 'ໂະ', syllable: 'ຫຍໂະ', pronunciation: 'nhố' },

  { consonant: 'ຫຍ', vowel: 'ເະ', syllable: 'ຫຍເະ', pronunciation: 'nhó' },

  { consonant: 'ຫຍ', vowel: 'ເິ', syllable: 'ຫຍເິ', pronunciation: 'nhớ' },

  { consonant: 'ຫຍ', vowel: 'ເັຍະ', syllable: 'ຫຍເັຍະ', pronunciation: 'nhía' },

  { consonant: 'ຫຍ', vowel: 'ເືອະ', syllable: 'ຫຍເືອະ', pronunciation: 'nhứa' },

  { consonant: 'ຫຍ', vowel: 'ົວະ', syllable: 'ຫຍົວະ', pronunciation: 'nhúa' },

  { consonant: 'ຫຍ', vowel: 'າ', syllable: 'ຫຍາ', pronunciation: 'nhả' },

  { consonant: 'ຫຍ', vowel: 'ີ', syllable: 'ຫຍີ', pronunciation: 'nhỉ' },

  { consonant: 'ຫຍ', vowel: 'ື', syllable: 'ຫຍື', pronunciation: 'nhử' },

  { consonant: 'ຫຍ', vowel: 'ູ', syllable: 'ຫຍູ', pronunciation: 'nhủ' },

  { consonant: 'ຫຍ', vowel: 'ເ', syllable: 'ຫຍເ', pronunciation: 'nhể' },

  { consonant: 'ຫຍ', vowel: 'ແ', syllable: 'ຫຍແ', pronunciation: 'nhẻ' },

  { consonant: 'ຫຍ', vowel: 'ໂ', syllable: 'ຫຍໂ', pronunciation: 'nhổ' },

  { consonant: 'ຫຍ', vowel: 'ໍ', syllable: 'ຫຍໍ', pronunciation: 'nhỏ' },

  { consonant: 'ຫຍ', vowel: 'ເີ', syllable: 'ຫຍເີ', pronunciation: 'nhở' },

  { consonant: 'ຫຍ', vowel: 'ເຍ', syllable: 'ຫຍເຍ', pronunciation: 'nhỉa' },

  { consonant: 'ຫຍ', vowel: 'ເືອ', syllable: 'ຫຍເືອ', pronunciation: 'nhửa' },

  { consonant: 'ຫຍ', vowel: 'ົວ', syllable: 'ຫຍົວ', pronunciation: 'nhủa' },

  { consonant: 'ຫຍ', vowel: 'ໄ', syllable: 'ຫຍໄ', pronunciation: 'nhảy' },

  { consonant: 'ຫຍ', vowel: 'ໃ', syllable: 'ຫຍໃ', pronunciation: 'nhảy' },

  { consonant: 'ຫຍ', vowel: 'ເົາ', syllable: 'ຫຍເົາ', pronunciation: 'nhẩu' },

  { consonant: 'ຫຍ', vowel: 'ໍາ', syllable: 'ຫຍໍາ', pronunciation: 'nhẳm' },



  { consonant: 'ຫມ', vowel: 'ະ', syllable: 'ຫມະ', pronunciation: 'má' },

  { consonant: 'ຫມ', vowel: 'ິ', syllable: 'ຫມິ', pronunciation: 'mí' },

  { consonant: 'ຫມ', vowel: 'ຶ', syllable: 'ຫມຶ', pronunciation: 'mứ' },

  { consonant: 'ຫມ', vowel: 'ຸ', syllable: 'ຫມຸ', pronunciation: 'mú' },

  { consonant: 'ຫມ', vowel: 'ເະ', syllable: 'ຫມເະ', pronunciation: 'mế' },

  { consonant: 'ຫມ', vowel: 'ແະ', syllable: 'ຫມແະ', pronunciation: 'mé' },

  { consonant: 'ຫມ', vowel: 'ໂະ', syllable: 'ຫມໂະ', pronunciation: 'mố' },

  { consonant: 'ຫມ', vowel: 'ເະ', syllable: 'ຫມເະ', pronunciation: 'mó' },

  { consonant: 'ຫມ', vowel: 'ເິ', syllable: 'ຫມເິ', pronunciation: 'mớ' },

  { consonant: 'ຫມ', vowel: 'ເັຍະ', syllable: 'ຫມເັຍະ', pronunciation: 'mía' },

  { consonant: 'ຫມ', vowel: 'ເືອະ', syllable: 'ຫມເືອະ', pronunciation: 'mứa' },

  { consonant: 'ຫມ', vowel: 'ົວະ', syllable: 'ຫມົວະ', pronunciation: 'múa' },

  { consonant: 'ຫມ', vowel: 'າ', syllable: 'ຫມາ', pronunciation: 'mả' },

  { consonant: 'ຫມ', vowel: 'ີ', syllable: 'ຫມີ', pronunciation: 'mỉ' },

  { consonant: 'ຫມ', vowel: 'ື', syllable: 'ຫມື', pronunciation: 'mử' },

  { consonant: 'ຫມ', vowel: 'ູ', syllable: 'ຫມູ', pronunciation: 'mủ' },

  { consonant: 'ຫມ', vowel: 'ເ', syllable: 'ຫມເ', pronunciation: 'mể' },

  { consonant: 'ຫມ', vowel: 'ແ', syllable: 'ຫມແ', pronunciation: 'mẻ' },

  { consonant: 'ຫມ', vowel: 'ໂ', syllable: 'ຫມໂ', pronunciation: 'mổ' },

  { consonant: 'ຫມ', vowel: 'ໍ', syllable: 'ຫມໍ', pronunciation: 'mỏ' },

  { consonant: 'ຫມ', vowel: 'ເີ', syllable: 'ຫມເີ', pronunciation: 'mở' },

  { consonant: 'ຫມ', vowel: 'ເຍ', syllable: 'ຫມເຍ', pronunciation: 'mỉa' },

  { consonant: 'ຫມ', vowel: 'ເືອ', syllable: 'ຫມເືອ', pronunciation: 'mửa' },

  { consonant: 'ຫມ', vowel: 'ົວ', syllable: 'ຫມົວ', pronunciation: 'mủa' },

  { consonant: 'ຫມ', vowel: 'ໄ', syllable: 'ຫມໄ', pronunciation: 'mảy' },

  { consonant: 'ຫມ', vowel: 'ໃ', syllable: 'ຫມໃ', pronunciation: 'mảy' },

  { consonant: 'ຫມ', vowel: 'ເົາ', syllable: 'ຫມເົາ', pronunciation: 'mẩu' },

  { consonant: 'ຫມ', vowel: 'ໍາ', syllable: 'ຫມໍາ', pronunciation: 'mẳm' },



  { consonant: 'ຫນ', vowel: 'ະ', syllable: 'ຫນະ', pronunciation: 'ná' },

  { consonant: 'ຫນ', vowel: 'ິ', syllable: 'ຫນິ', pronunciation: 'ní' },

  { consonant: 'ຫນ', vowel: 'ຶ', syllable: 'ຫນຶ', pronunciation: 'nứ' },

  { consonant: 'ຫນ', vowel: 'ຸ', syllable: 'ຫນຸ', pronunciation: 'nú' },

  { consonant: 'ຫນ', vowel: 'ເະ', syllable: 'ຫນເະ', pronunciation: 'nế' },

  { consonant: 'ຫນ', vowel: 'ແະ', syllable: 'ຫນແະ', pronunciation: 'né' },

  { consonant: 'ຫນ', vowel: 'ໂະ', syllable: 'ຫນໂະ', pronunciation: 'nố' },

  { consonant: 'ຫນ', vowel: 'ເະ', syllable: 'ຫນເະ', pronunciation: 'nó' },

  { consonant: 'ຫນ', vowel: 'ເິ', syllable: 'ຫນເິ', pronunciation: 'nớ' },

  { consonant: 'ຫນ', vowel: 'ເັຍະ', syllable: 'ຫນເັຍະ', pronunciation: 'nía' },

  { consonant: 'ຫນ', vowel: 'ເືອະ', syllable: 'ຫນເືອະ', pronunciation: 'nứa' },

  { consonant: 'ຫນ', vowel: 'ົວະ', syllable: 'ຫນົວະ', pronunciation: 'núa' },

  { consonant: 'ຫນ', vowel: 'າ', syllable: 'ຫນາ', pronunciation: 'nả' },

  { consonant: 'ຫນ', vowel: 'ີ', syllable: 'ຫນີ', pronunciation: 'nỉ' },

  { consonant: 'ຫນ', vowel: 'ື', syllable: 'ຫນື', pronunciation: 'nử' },

  { consonant: 'ຫນ', vowel: 'ູ', syllable: 'ຫນູ', pronunciation: 'nủ' },

  { consonant: 'ຫນ', vowel: 'ເ', syllable: 'ຫນເ', pronunciation: 'nể' },

  { consonant: 'ຫນ', vowel: 'ແ', syllable: 'ຫນແ', pronunciation: 'nẻ' },

  { consonant: 'ຫນ', vowel: 'ໂ', syllable: 'ຫນໂ', pronunciation: 'nổ' },

  { consonant: 'ຫນ', vowel: 'ໍ', syllable: 'ຫນໍ', pronunciation: 'nỏ' },

  { consonant: 'ຫນ', vowel: 'ເີ', syllable: 'ຫນເີ', pronunciation: 'nở' },

  { consonant: 'ຫນ', vowel: 'ເຍ', syllable: 'ຫນເຍ', pronunciation: 'nỉa' },

  { consonant: 'ຫນ', vowel: 'ເືອ', syllable: 'ຫນເືອ', pronunciation: 'nửa' },

  { consonant: 'ຫນ', vowel: 'ົວ', syllable: 'ຫນົວ', pronunciation: 'nủa' },

  { consonant: 'ຫນ', vowel: 'ໄ', syllable: 'ຫນໄ', pronunciation: 'nảy' },

  { consonant: 'ຫນ', vowel: 'ໃ', syllable: 'ຫນໃ', pronunciation: 'nảy' },

  { consonant: 'ຫນ', vowel: 'ເົາ', syllable: 'ຫນເົາ', pronunciation: 'nẩu' },

  { consonant: 'ຫນ', vowel: 'ໍາ', syllable: 'ຫນໍາ', pronunciation: 'nẳm' },



  { consonant: 'ຫລ', vowel: 'ະ', syllable: 'ຫລະ', pronunciation: 'lá' },

  { consonant: 'ຫລ', vowel: 'ິ', syllable: 'ຫລິ', pronunciation: 'lí' },

  { consonant: 'ຫລ', vowel: 'ຶ', syllable: 'ຫລຶ', pronunciation: 'lứ' },

  { consonant: 'ຫລ', vowel: 'ຸ', syllable: 'ຫລຸ', pronunciation: 'lú' },

  { consonant: 'ຫລ', vowel: 'ເະ', syllable: 'ຫລເະ', pronunciation: 'lế' },

  { consonant: 'ຫລ', vowel: 'ແະ', syllable: 'ຫລແະ', pronunciation: 'lé' },

  { consonant: 'ຫລ', vowel: 'ໂະ', syllable: 'ຫລໂະ', pronunciation: 'lố' },

  { consonant: 'ຫລ', vowel: 'ເະ', syllable: 'ຫລເະ', pronunciation: 'ló' },

  { consonant: 'ຫລ', vowel: 'ເິ', syllable: 'ຫລເິ', pronunciation: 'lớ' },

  { consonant: 'ຫລ', vowel: 'ເັຍະ', syllable: 'ຫລເັຍະ', pronunciation: 'lía' },

  { consonant: 'ຫລ', vowel: 'ເືອະ', syllable: 'ຫລເືອະ', pronunciation: 'lứa' },

  { consonant: 'ຫລ', vowel: 'ົວະ', syllable: 'ຫລົວະ', pronunciation: 'lúa' },

  { consonant: 'ຫລ', vowel: 'າ', syllable: 'ຫລາ', pronunciation: 'lả' },

  { consonant: 'ຫລ', vowel: 'ີ', syllable: 'ຫລີ', pronunciation: 'lỉ' },

  { consonant: 'ຫລ', vowel: 'ື', syllable: 'ຫລື', pronunciation: 'lử' },

  { consonant: 'ຫລ', vowel: 'ູ', syllable: 'ຫລູ', pronunciation: 'lủ' },

  { consonant: 'ຫລ', vowel: 'ເ', syllable: 'ຫລເ', pronunciation: 'lể' },

  { consonant: 'ຫລ', vowel: 'ແ', syllable: 'ຫລແ', pronunciation: 'lẻ' },

  { consonant: 'ຫລ', vowel: 'ໂ', syllable: 'ຫລໂ', pronunciation: 'lổ' },

  { consonant: 'ຫລ', vowel: 'ໍ', syllable: 'ຫລໍ', pronunciation: 'lỏ' },

  { consonant: 'ຫລ', vowel: 'ເີ', syllable: 'ຫລເີ', pronunciation: 'lở' },

  { consonant: 'ຫລ', vowel: 'ເຍ', syllable: 'ຫລເຍ', pronunciation: 'lỉa' },

  { consonant: 'ຫລ', vowel: 'ເືອ', syllable: 'ຫລເືອ', pronunciation: 'lửa' },

  { consonant: 'ຫລ', vowel: 'ົວ', syllable: 'ຫລົວ', pronunciation: 'lủa' },

  { consonant: 'ຫລ', vowel: 'ໄ', syllable: 'ຫລໄ', pronunciation: 'lảy' },

  { consonant: 'ຫລ', vowel: 'ໃ', syllable: 'ຫລໃ', pronunciation: 'lảy' },

  { consonant: 'ຫລ', vowel: 'ເົາ', syllable: 'ຫລເົາ', pronunciation: 'lẩu' },

  { consonant: 'ຫລ', vowel: 'ໍາ', syllable: 'ຫລໍາ', pronunciation: 'lẳm' },



  { consonant: 'ຫວ', vowel: 'ະ', syllable: 'ຫວະ', pronunciation: 'wá' },

  { consonant: 'ຫວ', vowel: 'ິ', syllable: 'ຫວິ', pronunciation: 'wí' },

  { consonant: 'ຫວ', vowel: 'ຶ', syllable: 'ຫວຶ', pronunciation: 'wứ' },

  { consonant: 'ຫວ', vowel: 'ຸ', syllable: 'ຫວຸ', pronunciation: 'wú' },

  { consonant: 'ຫວ', vowel: 'ເະ', syllable: 'ຫວເະ', pronunciation: 'wế' },

  { consonant: 'ຫວ', vowel: 'ແະ', syllable: 'ຫວແະ', pronunciation: 'wé' },

  { consonant: 'ຫວ', vowel: 'ໂະ', syllable: 'ຫວໂະ', pronunciation: 'wố' },

  { consonant: 'ຫວ', vowel: 'ເະ', syllable: 'ຫວເະ', pronunciation: 'wó' },

  { consonant: 'ຫວ', vowel: 'ເິ', syllable: 'ຫວເິ', pronunciation: 'wớ' },

  { consonant: 'ຫວ', vowel: 'ເັຍະ', syllable: 'ຫວເັຍະ', pronunciation: 'wía' },

  { consonant: 'ຫວ', vowel: 'ເືອະ', syllable: 'ຫວເືອະ', pronunciation: 'wứa' },

  { consonant: 'ຫວ', vowel: 'ົວະ', syllable: 'ຫວົວະ', pronunciation: 'wúa' },

  { consonant: 'ຫວ', vowel: 'າ', syllable: 'ຫວາ', pronunciation: 'wả' },

  { consonant: 'ຫວ', vowel: 'ີ', syllable: 'ຫວີ', pronunciation: 'wỉ' },

  { consonant: 'ຫວ', vowel: 'ື', syllable: 'ຫວື', pronunciation: 'wử' },

  { consonant: 'ຫວ', vowel: 'ູ', syllable: 'ຫວູ', pronunciation: 'wủ' },

  { consonant: 'ຫວ', vowel: 'ເ', syllable: 'ຫວເ', pronunciation: 'wể' },

  { consonant: 'ຫວ', vowel: 'ແ', syllable: 'ຫວແ', pronunciation: 'wẻ' },

  { consonant: 'ຫວ', vowel: 'ໂ', syllable: 'ຫວໂ', pronunciation: 'wổ' },

  { consonant: 'ຫວ', vowel: 'ໍ', syllable: 'ຫວໍ', pronunciation: 'wỏ' },

  { consonant: 'ຫວ', vowel: 'ເີ', syllable: 'ຫວເີ', pronunciation: 'wở' },

  { consonant: 'ຫວ', vowel: 'ເຍ', syllable: 'ຫວເຍ', pronunciation: 'wỉa' },

  { consonant: 'ຫວ', vowel: 'ເືອ', syllable: 'ຫວເືອ', pronunciation: 'wửa' },

  { consonant: 'ຫວ', vowel: 'ົວ', syllable: 'ຫວົວ', pronunciation: 'wủa' },

  { consonant: 'ຫວ', vowel: 'ໄ', syllable: 'ຫວໄ', pronunciation: 'wảy' },

  { consonant: 'ຫວ', vowel: 'ໃ', syllable: 'ຫວໃ', pronunciation: 'wảy' },

  { consonant: 'ຫວ', vowel: 'ເົາ', syllable: 'ຫວເົາ', pronunciation: 'wẩu' },

  { consonant: 'ຫວ', vowel: 'ໍາ', syllable: 'ຫວໍາ', pronunciation: 'wẳm' },
]; 