import React, { useState, useMemo, useCallback } from 'react';
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import TableChartIcon from '@mui/icons-material/TableChart';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Hằng số cho màu sắc
const CONSONANT_COLORS = {
  high: '#e74c3c',
  mid: '#3498db',
  low: '#27ae60',
  default: '#95a5a6'
} as const;

const VOWEL_COLORS = {
  short: '#f39c12',
  long: '#9b59b6',
  special: '#2ecc71',
  default: '#95a5a6'
} as const;

// Hằng số cho phụ âm theo cấp độ
const CONSONANT_LEVELS = {
  high: ['ຂ', 'ສ', 'ຖ', 'ຜ', 'ຝ', 'ຫ', 'ຫງ', 'ຫຍ', 'ຫມ', 'ຫນ', 'ຫລ', 'ຫວ'],
  mid: ['ກ', 'ຈ', 'ດ', 'ຕ', 'ບ', 'ປ', 'ຢ', 'ອ'],
  low: ['ຄ', 'ງ', 'ຊ', 'ຍ', 'ນ', 'ທ', 'ພ', 'ຟ', 'ມ', 'ຣ', 'ລ', 'ວ', 'ຮ']
} as const;

// Cấu hình cho các button filter
const VOWEL_FILTER_CONFIG = [
  { key: 'all', label: 'TẤT CẢ', color: 'default' },
  { key: 'short', label: 'NGUYÊN ÂM NGẮN', color: VOWEL_COLORS.short },
  { key: 'long', label: 'NGUYÊN ÂM DÀI', color: VOWEL_COLORS.long },
  { key: 'special', label: 'NGUYÊN ÂM ĐẶC BIỆT', color: VOWEL_COLORS.special }
] as const;

const CONSONANT_FILTER_CONFIG = [
  { key: 'all', label: 'TẤT CẢ', color: 'default' },
  { key: 'high', label: 'PHỤ ÂM CAO', color: CONSONANT_COLORS.high },
  { key: 'mid', label: 'PHỤ ÂM TRUNG', color: CONSONANT_COLORS.mid },
  { key: 'low', label: 'PHỤ ÂM THẤP', color: CONSONANT_COLORS.low }
] as const;

interface SyllableTableProps {}

const SyllableTable: React.FC<SyllableTableProps> = () => {
  const [selectedVowelType, setSelectedVowelType] = useState<'short' | 'long' | 'special' | 'all'>('all');
  const [selectedConsonantType, setSelectedConsonantType] = useState<'high' | 'mid' | 'low' | 'all'>('all');
  const [showPronunciation, setShowPronunciation] = useState(true);

  const theme = useTheme();
  const tableRef = React.useRef<HTMLDivElement>(null);

  // Hàm xác định loại phụ âm theo bảng chuẩn (bao gồm cả phụ âm ghép)
  const getConsonantLevel = useCallback((letter: string): 'high' | 'mid' | 'low' | undefined => {
    if (CONSONANT_LEVELS.high.includes(letter as any)) return 'high';
    if (CONSONANT_LEVELS.mid.includes(letter as any)) return 'mid';
    if (CONSONANT_LEVELS.low.includes(letter as any)) return 'low';
    return undefined;
  }, []);

  // Lọc nguyên âm theo loại được chọn
  const filteredVowels = useMemo(() => {
    if (selectedVowelType === 'all') return vowelsFull;
    
    const vowelGroupMap = {
      short: vowelsGroup.ngan,
      long: vowelsGroup.dai,
      special: vowelsGroup.dacbiet
    };
    
    const targetGroup = vowelGroupMap[selectedVowelType];
    return vowelsFull.filter(vowel => 
      targetGroup.some(v => v.letter === vowel.letter)
    );
  }, [selectedVowelType]);

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
  const getConsonantColor = useCallback((level: 'high' | 'mid' | 'low' | undefined) => {
    return level ? CONSONANT_COLORS[level] : CONSONANT_COLORS.default;
  }, []);

  // Hàm lấy màu cho nguyên âm
  const getVowelColor = useCallback((vowel: typeof vowelsFull[0]) => {
    if (vowelsGroup.ngan.some(v => v.letter === vowel.letter)) return VOWEL_COLORS.short;
    if (vowelsGroup.dai.some(v => v.letter === vowel.letter)) return VOWEL_COLORS.long;
    if (vowelsGroup.dacbiet.some(v => v.letter === vowel.letter)) return VOWEL_COLORS.special;
    return VOWEL_COLORS.default;
  }, []);

  // Hàm lấy màu nền cho ô chữ ghép
  const getSyllableBgColor = useCallback((consonantLevel: 'high' | 'mid' | 'low' | undefined, vowel: typeof vowelsFull[0]) => {
    const consonantColor = getConsonantColor(consonantLevel);
    const vowelColor = getVowelColor(vowel);
    return `linear-gradient(135deg, ${consonantColor}15 0%, ${vowelColor}15 100%)`;
  }, [getConsonantColor, getVowelColor]);

  // Lọc phụ âm header theo loại được chọn
  const filteredHeaderConsonants = useMemo(() => {
    if (selectedConsonantType === 'all') return practiceData.consonants;
    return practiceData.consonants.filter(consonant => 
      getConsonantLevel(consonant.letter) === selectedConsonantType
    );
  }, [selectedConsonantType, getConsonantLevel]);

  // Handlers
  const handleReset = useCallback(() => {
    setSelectedVowelType('all');
    setSelectedConsonantType('all');
  }, []);

  const handleExportPDF = useCallback(async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('bang-ghep-van.pdf');
  }, []);

  const handleExportImage = useCallback(async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    canvas.toBlob(blob => {
      if (blob) saveAs(blob, 'bang-ghep-van.png');
    });
  }, []);

  const handleExportCSV = useCallback(() => {
    let csv = 'Nguyên âm/Phụ âm';
    filteredHeaderConsonants.forEach(c => {
      csv += ',' + c.letter;
    });
    csv += '\n';
    filteredVowels.forEach(vowel => {
      let row = vowel.letter;
      filteredHeaderConsonants.forEach(consonant => {
        const key = `${consonant.letter}-${vowel.letter}`;
        const syllableInfo = syllableMap.get(key);
        row += ',' + (syllableInfo ? syllableInfo.syllable : '');
      });
      csv += row + '\n';
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'bang-ghep-van.csv');
  }, [filteredHeaderConsonants, filteredVowels, syllableMap]);

  const handleExportJSON = useCallback(() => {
    const data = filteredVowels.map(vowel => {
      const row: { [key: string]: string } = { vowel: vowel.letter };
      filteredHeaderConsonants.forEach(consonant => {
        const key = `${consonant.letter}-${vowel.letter}`;
        const syllableInfo = syllableMap.get(key);
        row[consonant.letter] = syllableInfo ? syllableInfo.syllable : '';
      });
      return row;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'bang-ghep-van.json');
  }, [filteredHeaderConsonants, filteredVowels, syllableMap]);

  // Styles được tối ưu
  const commonTypographyStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Noto Serif Lao, serif'
  };

  const pronunciationTypographyStyle = {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '0 1px 4px #0008',
    fontFamily: 'Noto Serif Lao, serif',
    minHeight: '1.2em',
    opacity: showPronunciation ? 1 : 0,
    transition: 'opacity 0.2s'
  };

  const syllableTypographyStyle = {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    fontFamily: 'Noto Serif Lao, serif'
  };

  const syllablePronunciationStyle = {
    fontSize: '0.85rem',
    color: '#fff',
    fontWeight: 'bold',
    textShadow: '0 1px 4px #0008',
    fontFamily: 'Noto Serif Lao, serif',
    minHeight: '1.2em',
    opacity: showPronunciation ? 1 : 0,
    transition: 'opacity 0.2s'
  };

  // Render button filter
  const renderVowelFilterButton = useCallback((
    config: typeof VOWEL_FILTER_CONFIG[number],
    isSelected: boolean,
    onClick: () => void
  ) => (
    <Button
      onClick={onClick}
      variant={isSelected ? 'contained' : 'outlined'}
      sx={{
        backgroundColor: isSelected ? (config.color === 'default' ? 
          (theme.palette.mode === 'dark' ? '#34495e' : '#e0e0e0') : config.color) : 'transparent',
        color: isSelected ? 'white' : (config.color === 'default' ? 
          theme.palette.text.primary : config.color),
        fontWeight: 700,
        borderRadius: 0,
        width: 110,
        flexShrink: 0,
        '&:hover': { 
          backgroundColor: config.color === 'default' ? undefined : config.color, 
          color: config.color === 'default' ? undefined : 'white' 
        }
      }}
    >
      {config.label}
    </Button>
  ), [theme.palette.mode, theme.palette.text.primary]);

  const renderConsonantFilterButton = useCallback((
    config: typeof CONSONANT_FILTER_CONFIG[number],
    isSelected: boolean,
    onClick: () => void
  ) => (
    <Button
      onClick={onClick}
      variant={isSelected ? 'contained' : 'outlined'}
      sx={{
        backgroundColor: isSelected ? (config.color === 'default' ? 
          (theme.palette.mode === 'dark' ? '#34495e' : '#e0e0e0') : config.color) : 'transparent',
        color: isSelected ? 'white' : (config.color === 'default' ? 
          theme.palette.text.primary : config.color),
        fontWeight: 700,
        borderRadius: 0,
        width: 110,
        flexShrink: 0,
        '&:hover': { 
          backgroundColor: config.color === 'default' ? undefined : config.color, 
          color: config.color === 'default' ? undefined : 'white' 
        }
      }}
    >
      {config.label}
    </Button>
  ), [theme.palette.mode, theme.palette.text.primary]);

  return (
    <Box sx={{ p: 3, fontFamily: 'Noto Serif Lao, serif' }}>
      {/* Các button chức năng */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
        {/* Hàng 1: các nút chức năng */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={showPronunciation ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setShowPronunciation(v => !v)}
            sx={{
              borderRadius: 2,
              minWidth: 90,
              maxWidth: 140,
              flexShrink: 0,
              fontWeight: 600,
              background: 'linear-gradient(90deg, #7c3aed 0%, #8b5cf6 100%)',
              color: '#fff',
              boxShadow: theme.palette.mode === 'dark' ? 2 : 1,
              '&:hover': {
                background: 'linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%)',
                color: '#fff',
              },
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {showPronunciation ? 'Ẩn phiên âm' : 'Hiện phiên âm'}
          </Button>
          <ButtonGroup variant="contained" size="small" sx={{ borderRadius: 2, boxShadow: theme.palette.mode === 'dark' ? 2 : 1 }}>
            <Button color="error" startIcon={<PictureAsPdfIcon />} onClick={handleExportPDF} sx={{ fontWeight: 600 }}>PDF</Button>
            <Button color="info" startIcon={<ImageIcon />} onClick={handleExportImage} sx={{ fontWeight: 600 }}>Ảnh</Button>
            <Button color="success" startIcon={<TableChartIcon />} onClick={handleExportCSV} sx={{ fontWeight: 600 }}>CSV</Button>
            <Button color="secondary" startIcon={<CodeIcon />} onClick={handleExportJSON} sx={{ fontWeight: 600 }}>JSON</Button>
          </ButtonGroup>
        </Box>
        {/* Hàng 2: các filter */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ButtonGroup variant="outlined" size="small" sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: theme.palette.mode === 'dark' ? 2 : 1 }}>
            {VOWEL_FILTER_CONFIG.map(config => 
              renderVowelFilterButton(
                config,
                selectedVowelType === config.key,
                () => setSelectedVowelType(config.key as any)
              )
            )}
          </ButtonGroup>
          <ButtonGroup variant="outlined" size="small" sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: theme.palette.mode === 'dark' ? 2 : 1 }}>
            {CONSONANT_FILTER_CONFIG.map(config => 
              renderConsonantFilterButton(
                config,
                selectedConsonantType === config.key,
                () => setSelectedConsonantType(config.key as any)
              )
            )}
          </ButtonGroup>
          <Button
            onClick={handleReset}
            variant="outlined"
            size="small"
            sx={{
              borderColor: '#7c3aed',
              color: '#7c3aed',
              fontWeight: 700,
              borderRadius: 2,
              minWidth: 80,
              ml: 2,
              background: 'transparent',
              '&:hover': {
                background: '#ede9fe', // tím nhạt
                borderColor: '#7c3aed',
                color: '#7c3aed',
              }
            }}
          >
            HUỶ
          </Button>
        </Box>
      </Box>

      {/* Bảng ghép vần - NGUYÊN ÂM theo hàng dọc, PHỤ ÂM theo hàng ngang */}
      <div ref={tableRef}>
        <TableContainer component={Paper} sx={{ maxHeight: '70vh', overflow: 'auto', fontFamily: 'Noto Serif Lao, serif' }}>
          <Table stickyHeader size="medium">
            <TableHead>
              <TableRow>
                <TableCell 
                  sx={{ 
                    backgroundColor: '#34495e', 
                    color: 'white', 
                    fontWeight: 'bold',
                    minWidth: 100,
                    textAlign: 'center',
                    padding: '16px 8px'
                  }}
                >
                  {' '}
                </TableCell>
                {filteredHeaderConsonants.map((consonant) => {
                  const consonantLevel = getConsonantLevel(consonant.letter);
                  return (
                    <TableCell
                      key={consonant.letter}
                      sx={{
                        backgroundColor: getConsonantColor(consonantLevel),
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        minWidth: 80,
                        fontSize: '1rem',
                        padding: '16px 8px'
                      }}
                    >
                      <Box>
                        <Typography variant="h5" sx={commonTypographyStyle}>
                          {consonant.letter}
                        </Typography>
                        {showPronunciation && (
                          <Typography variant="body2" sx={pronunciationTypographyStyle}>
                            {consonant.pronunciationVi}
                          </Typography>
                        )}
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
                      zIndex: 1,
                      minWidth: 100,
                      padding: '16px 8px'
                    }}
                  >
                    <Box>
                      <Typography variant="h5" sx={commonTypographyStyle}>
                        {vowel.letter}
                      </Typography>
                      {showPronunciation && (
                        <Typography variant="body2" sx={pronunciationTypographyStyle}>
                          {vowel.pronunciationVi}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  {filteredHeaderConsonants.map((consonant) => {
                    const consonantLevel = getConsonantLevel(consonant.letter);
                    const key = `${consonant.letter}-${vowel.letter}`;
                    const syllableInfo = syllableMap.get(key);
                    return (
                      <TableCell
                        key={consonant.letter}
                        sx={{
                          background: getSyllableBgColor(consonantLevel, vowel),
                          textAlign: 'center',
                          minWidth: 80,
                          border: '1px solid #e0e0e0',
                          padding: '16px 8px'
                        }}
                      >
                        {syllableInfo ? (
                          <Box>
                            <Typography 
                              variant="h5" 
                              sx={{ 
                                ...syllableTypographyStyle,
                                color: getConsonantColor(consonantLevel)
                              }}
                            >
                              {syllableInfo.syllable}
                            </Typography>
                            {showPronunciation && (
                              <Typography variant="body2" sx={syllablePronunciationStyle}>
                                {syllableInfo.pronunciation}
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="body2" sx={{ color: '#bdc3c7', fontFamily: 'Noto Serif Lao, serif' }}>
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
      </div>
    </Box>
  );
};

export default SyllableTable; 