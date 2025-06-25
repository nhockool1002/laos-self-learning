import React, { useState, useMemo } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Typography,
} from '@mui/material';
import { practiceData } from '../data/practiceData';
import { vowelsFull, vowelsGroup } from '../data/VowelsData';
import { syllableData } from '../data/SyllableData';

interface SyllableTableProps {}

const SyllableTable: React.FC<SyllableTableProps> = () => {
  const [showShortVowels, setShowShortVowels] = useState(true);
  const [showLongVowels, setShowLongVowels] = useState(true);
  const [showSpecialVowels, setShowSpecialVowels] = useState(true);
  const [showHighConsonants, setShowHighConsonants] = useState(true);
  const [showMidConsonants, setShowMidConsonants] = useState(true);
  const [showLowConsonants, setShowLowConsonants] = useState(true);

  // Hàm xác định loại phụ âm theo bảng chuẩn (bao gồm cả phụ âm ghép)
  const getConsonantLevel = (letter: string): 'high' | 'mid' | 'low' | undefined => {
    // Phụ âm CAO
    if ([
      'ຂ', 'ສ', 'ຖ', 'ຜ', 'ຝ', 'ຫ', 'ຫງ', 'ຫຍ', 'ຫມ', 'ຫນ', 'ຫລ', 'ຫວ'
    ].includes(letter)) return 'high';
    // Phụ âm TRUNG
    if ([
      'ກ', 'ຈ', 'ດ', 'ຕ', 'ບ', 'ປ', 'ຢ', 'ອ'
    ].includes(letter)) return 'mid';
    // Phụ âm THẤP
    if ([
      'ຄ', 'ງ', 'ຊ', 'ຍ', 'ນ', 'ທ', 'ພ', 'ຟ', 'ມ', 'ຣ', 'ລ', 'ວ', 'ຮ'
    ].includes(letter)) return 'low';
    return undefined;
  };

  // Tạo danh sách phụ âm bao gồm cả phụ âm ghép
  const allConsonants = useMemo(() => {
    const singleConsonants = practiceData.consonants;
    const compoundConsonants = [
      { letter: 'ຫງ', pronunciationVi: 'ng' },
      { letter: 'ຫຍ', pronunciationVi: 'nh' },
      { letter: 'ຫມ', pronunciationVi: 'm' },
      { letter: 'ຫນ', pronunciationVi: 'n' },
      { letter: 'ຫລ', pronunciationVi: 'l' },
      { letter: 'ຫວ', pronunciationVi: 'w' },
    ];
    return [...singleConsonants, ...compoundConsonants];
  }, []);

  // Lọc phụ âm theo loại
  const filteredConsonants = useMemo(() => {
    return allConsonants.filter(consonant => {
      const level = getConsonantLevel(consonant.letter);
      if (level === 'high' && !showHighConsonants) return false;
      if (level === 'mid' && !showMidConsonants) return false;
      if (level === 'low' && !showLowConsonants) return false;
      return true;
    });
  }, [allConsonants, showHighConsonants, showMidConsonants, showLowConsonants]);

  // Lọc nguyên âm theo loại
  const filteredVowels = useMemo(() => {
    return vowelsFull.filter(vowel => {
      if (vowelsGroup.ngan.includes(vowel) && !showShortVowels) return false;
      if (vowelsGroup.dai.includes(vowel) && !showLongVowels) return false;
      if (vowelsGroup.dacbiet.includes(vowel) && !showSpecialVowels) return false;
      return true;
    });
  }, [showShortVowels, showLongVowels, showSpecialVowels]);

  // Tạo map để tìm chữ ghép vần
  const syllableMap = useMemo(() => {
    const map = new Map<string, { syllable: string; pronunciation: string }>();
    syllableData.forEach(item => {
      const key = `${item.consonant}-${item.vowel}`;
      map.set(key, { syllable: item.syllable, pronunciation: item.pronunciation });
    });
    return map;
  }, []);

  // Hàm lấy màu cho phụ âm
  const getConsonantColor = (level: 'high' | 'mid' | 'low' | undefined) => {
    switch (level) {
      case 'high':
        return '#e74c3c';
      case 'mid':
        return '#3498db';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  // Hàm lấy màu cho nguyên âm
  const getVowelColor = (vowel: typeof vowelsFull[0]) => {
    if (vowelsGroup.ngan.includes(vowel)) return '#f39c12';
    if (vowelsGroup.dai.includes(vowel)) return '#9b59b6';
    if (vowelsGroup.dacbiet.includes(vowel)) return '#e67e22';
    return '#95a5a6';
  };

  // Hàm lấy màu nền cho ô chữ ghép
  const getSyllableBgColor = (consonantLevel: 'high' | 'mid' | 'low' | undefined, vowel: typeof vowelsFull[0]) => {
    const consonantColor = getConsonantColor(consonantLevel);
    const vowelColor = getVowelColor(vowel);
    
    // Tạo màu nền kết hợp tinh tế
    return `linear-gradient(135deg, ${consonantColor}15 0%, ${vowelColor}15 100%)`;
  };

  const handleReset = () => {
    setShowShortVowels(true);
    setShowLongVowels(true);
    setShowSpecialVowels(true);
    setShowHighConsonants(true);
    setShowMidConsonants(true);
    setShowLowConsonants(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3, color: '#2c3e50' }}>
        BẢNG GHÉP VẦN
      </Typography>

      {/* Các button chức năng */}
      <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
        <ButtonGroup variant="outlined" size="small">
          <Button
            onClick={() => setShowShortVowels(!showShortVowels)}
            variant={showShortVowels ? 'contained' : 'outlined'}
            sx={{ 
              backgroundColor: showShortVowels ? '#f39c12' : 'transparent',
              color: showShortVowels ? 'white' : '#f39c12',
              '&:hover': {
                backgroundColor: showShortVowels ? '#e67e22' : '#f39c1210',
              }
            }}
          >
            Nguyên âm ngắn
          </Button>
          <Button
            onClick={() => setShowLongVowels(!showLongVowels)}
            variant={showLongVowels ? 'contained' : 'outlined'}
            sx={{ 
              backgroundColor: showLongVowels ? '#9b59b6' : 'transparent',
              color: showLongVowels ? 'white' : '#9b59b6',
              '&:hover': {
                backgroundColor: showLongVowels ? '#8e44ad' : '#9b59b610',
              }
            }}
          >
            Nguyên âm dài
          </Button>
          <Button
            onClick={() => setShowSpecialVowels(!showSpecialVowels)}
            variant={showSpecialVowels ? 'contained' : 'outlined'}
            sx={{ 
              backgroundColor: showSpecialVowels ? '#e67e22' : 'transparent',
              color: showSpecialVowels ? 'white' : '#e67e22',
              '&:hover': {
                backgroundColor: showSpecialVowels ? '#d35400' : '#e67e2210',
              }
            }}
          >
            Nguyên âm đặc biệt
          </Button>
        </ButtonGroup>

        <ButtonGroup variant="outlined" size="small">
          <Button
            onClick={() => setShowHighConsonants(!showHighConsonants)}
            variant={showHighConsonants ? 'contained' : 'outlined'}
            sx={{ 
              backgroundColor: showHighConsonants ? '#e74c3c' : 'transparent',
              color: showHighConsonants ? 'white' : '#e74c3c',
              '&:hover': {
                backgroundColor: showHighConsonants ? '#c0392b' : '#e74c3c10',
              }
            }}
          >
            Phụ âm cao
          </Button>
          <Button
            onClick={() => setShowMidConsonants(!showMidConsonants)}
            variant={showMidConsonants ? 'contained' : 'outlined'}
            sx={{ 
              backgroundColor: showMidConsonants ? '#3498db' : 'transparent',
              color: showMidConsonants ? 'white' : '#3498db',
              '&:hover': {
                backgroundColor: showMidConsonants ? '#2980b9' : '#3498db10',
              }
            }}
          >
            Phụ âm trung
          </Button>
          <Button
            onClick={() => setShowLowConsonants(!showLowConsonants)}
            variant={showLowConsonants ? 'contained' : 'outlined'}
            sx={{ 
              backgroundColor: showLowConsonants ? '#27ae60' : 'transparent',
              color: showLowConsonants ? 'white' : '#27ae60',
              '&:hover': {
                backgroundColor: showLowConsonants ? '#229954' : '#27ae6010',
              }
            }}
          >
            Phụ âm thấp
          </Button>
        </ButtonGroup>

        <Button
          onClick={handleReset}
          variant="outlined"
          size="small"
          sx={{ 
            borderColor: '#95a5a6',
            color: '#95a5a6',
            '&:hover': {
              borderColor: '#7f8c8d',
              backgroundColor: '#95a5a610',
            }
          }}
        >
          Huỷ
        </Button>
      </Box>

      {/* Bảng ghép vần - NGUYÊN ÂM theo hàng dọc, PHỤ ÂM theo hàng ngang */}
      <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflow: 'auto' }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell 
                sx={{ 
                  backgroundColor: '#34495e', 
                  color: 'white', 
                  fontWeight: 'bold',
                  minWidth: 80,
                  textAlign: 'center'
                }}
              >
                Nguyên âm
              </TableCell>
              {filteredConsonants.map((consonant) => {
                const consonantLevel = getConsonantLevel(consonant.letter);
                return (
                  <TableCell
                    key={consonant.letter}
                    sx={{
                      backgroundColor: getConsonantColor(consonantLevel),
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      minWidth: 60,
                      fontSize: '0.875rem'
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                        {consonant.letter}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                        {consonant.pronunciationVi}
                      </Typography>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVowels.map((vowel) => (
              <TableRow key={vowel.letter}>
                <TableCell
                  sx={{
                    backgroundColor: getVowelColor(vowel),
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    position: 'sticky',
                    left: 0,
                    zIndex: 1
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>
                      {vowel.letter}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.7rem' }}>
                      {vowel.pronunciationVi}
                    </Typography>
                  </Box>
                </TableCell>
                {filteredConsonants.map((consonant) => {
                  const consonantLevel = getConsonantLevel(consonant.letter);
                  const key = `${consonant.letter}-${vowel.letter}`;
                  const syllableInfo = syllableMap.get(key);
                  return (
                    <TableCell
                      key={consonant.letter}
                      sx={{
                        background: getSyllableBgColor(consonantLevel, vowel),
                        textAlign: 'center',
                        minWidth: 60,
                        border: '1px solid #e0e0e0'
                      }}
                    >
                      {syllableInfo ? (
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontSize: '1.1rem',
                              color: getConsonantColor(consonantLevel),
                              fontWeight: 'bold'
                            }}
                          >
                            {syllableInfo.syllable}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              fontSize: '0.65rem',
                              color: getVowelColor(vowel),
                              fontWeight: 'bold'
                            }}
                          >
                            {syllableInfo.pronunciation}
                          </Typography>
                        </Box>
                      ) : (
                        <Typography variant="caption" sx={{ color: '#bdc3c7' }}>
                          -
                        </Typography>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SyllableTable; 