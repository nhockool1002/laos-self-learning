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

interface SyllableTableProps {}

const SyllableTable: React.FC<SyllableTableProps> = () => {
  const [selectedVowelType, setSelectedVowelType] = useState<'short' | 'long' | 'special' | 'all'>('all');
  const [selectedConsonantType, setSelectedConsonantType] = useState<'high' | 'mid' | 'low' | 'all'>('all');
  const [showPronunciation, setShowPronunciation] = useState(true);

  const theme = useTheme();

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

  // Lọc nguyên âm theo loại được chọn
  const filteredVowels = useMemo(() => {
    if (selectedVowelType === 'all') {
      return vowelsFull;
    }
    
    switch (selectedVowelType) {
      case 'short':
        return vowelsFull.filter(vowel => 
          vowelsGroup.ngan.some(v => v.letter === vowel.letter)
        );
      case 'long':
        return vowelsFull.filter(vowel => 
          vowelsGroup.dai.some(v => v.letter === vowel.letter)
        );
      case 'special':
        return vowelsFull.filter(vowel => 
          vowelsGroup.dacbiet.some(v => v.letter === vowel.letter)
        );
      default:
        return vowelsFull;
    }
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
    if (vowelsGroup.ngan.some(v => v.letter === vowel.letter)) return '#f39c12';
    if (vowelsGroup.dai.some(v => v.letter === vowel.letter)) return '#9b59b6';
    if (vowelsGroup.dacbiet.some(v => v.letter === vowel.letter)) return '#2ecc71';
    return '#95a5a6';
  };

  // Hàm lấy màu nền cho ô chữ ghép
  const getSyllableBgColor = (consonantLevel: 'high' | 'mid' | 'low' | undefined, vowel: typeof vowelsFull[0]) => {
    const consonantColor = getConsonantColor(consonantLevel);
    const vowelColor = getVowelColor(vowel);
    
    // Tạo màu nền kết hợp tinh tế
    return `linear-gradient(135deg, ${consonantColor}15 0%, ${vowelColor}15 100%)`;
  };

  // Thêm biến này để render header chỉ với phụ âm đơn
  const filteredHeaderConsonants = useMemo(() => {
    if (selectedConsonantType === 'all') return practiceData.consonants;
    return practiceData.consonants.filter(consonant => getConsonantLevel(consonant.letter) === selectedConsonantType);
  }, [selectedConsonantType]);

  const handleReset = () => {
    setSelectedVowelType('all');
    setSelectedConsonantType('all');
  };

  const tableRef = React.useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'landscape' });
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('bang-ghep-van.pdf');
  };

  const handleExportImage = async () => {
    if (!tableRef.current) return;
    const canvas = await html2canvas(tableRef.current);
    canvas.toBlob(blob => {
      if (blob) saveAs(blob, 'bang-ghep-van.png');
    });
  };

  const handleExportCSV = () => {
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
  };

  const handleExportJSON = () => {
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
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Noto Serif Lao, serif' }}>

      {/* Các button chức năng */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'nowrap', overflowX: 'auto', justifyContent: 'flex-start' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={showPronunciation ? <VisibilityOffIcon /> : <VisibilityIcon />}
          onClick={() => setShowPronunciation(v => !v)}
          sx={{ borderRadius: 2, minWidth: 120, fontWeight: 600 }}
        >
          {showPronunciation ? 'Ẩn phiên âm' : 'Hiện phiên âm'}
        </Button>
        <ButtonGroup variant="contained" size="small" sx={{ borderRadius: 2, boxShadow: theme.palette.mode === 'dark' ? 2 : 1 }}>
          <Button color="error" startIcon={<PictureAsPdfIcon />} onClick={handleExportPDF} sx={{ fontWeight: 600 }}>PDF</Button>
          <Button color="info" startIcon={<ImageIcon />} onClick={handleExportImage} sx={{ fontWeight: 600 }}>Ảnh</Button>
          <Button color="success" startIcon={<TableChartIcon />} onClick={handleExportCSV} sx={{ fontWeight: 600 }}>CSV</Button>
          <Button color="secondary" startIcon={<CodeIcon />} onClick={handleExportJSON} sx={{ fontWeight: 600 }}>JSON</Button>
        </ButtonGroup>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto' }}>
          <ButtonGroup variant="outlined" size="small" sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: theme.palette.mode === 'dark' ? 2 : 1 }}>
            <Button
              onClick={() => setSelectedVowelType('all')}
              variant={selectedVowelType === 'all' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedVowelType === 'all' ? theme.palette.mode === 'dark' ? '#34495e' : '#e0e0e0' : 'transparent',
                color: selectedVowelType === 'all' ? 'white' : theme.palette.text.primary,
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 80
              }}
            >
              TẤT CẢ
            </Button>
            <Button
              onClick={() => setSelectedVowelType('short')}
              variant={selectedVowelType === 'short' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedVowelType === 'short' ? '#f39c12' : 'transparent',
                color: selectedVowelType === 'short' ? 'white' : '#f39c12',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 120,
                '&:hover': { backgroundColor: '#f39c12', color: 'white' }
              }}
            >
              NGUYÊN ÂM NGẮN
            </Button>
            <Button
              onClick={() => setSelectedVowelType('long')}
              variant={selectedVowelType === 'long' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedVowelType === 'long' ? '#9b59b6' : 'transparent',
                color: selectedVowelType === 'long' ? 'white' : '#9b59b6',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 120,
                '&:hover': { backgroundColor: '#9b59b6', color: 'white' }
              }}
            >
              NGUYÊN ÂM DÀI
            </Button>
            <Button
              onClick={() => setSelectedVowelType('special')}
              variant={selectedVowelType === 'special' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedVowelType === 'special' ? '#2ecc71' : 'transparent',
                color: selectedVowelType === 'special' ? 'white' : '#2ecc71',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 150,
                '&:hover': { backgroundColor: '#2ecc71', color: 'white' }
              }}
            >
              NGUYÊN ÂM ĐẶC BIỆT
            </Button>
          </ButtonGroup>
          <ButtonGroup variant="outlined" size="small" sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: theme.palette.mode === 'dark' ? 2 : 1 }}>
            <Button
              onClick={() => setSelectedConsonantType('all')}
              variant={selectedConsonantType === 'all' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedConsonantType === 'all' ? theme.palette.mode === 'dark' ? '#34495e' : '#e0e0e0' : 'transparent',
                color: selectedConsonantType === 'all' ? 'white' : theme.palette.text.primary,
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 80
              }}
            >
              TẤT CẢ
            </Button>
            <Button
              onClick={() => setSelectedConsonantType('high')}
              variant={selectedConsonantType === 'high' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedConsonantType === 'high' ? '#e74c3c' : 'transparent',
                color: selectedConsonantType === 'high' ? 'white' : '#e74c3c',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 120,
                '&:hover': { backgroundColor: '#e74c3c', color: 'white' }
              }}
            >
              PHỤ ÂM CAO
            </Button>
            <Button
              onClick={() => setSelectedConsonantType('mid')}
              variant={selectedConsonantType === 'mid' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedConsonantType === 'mid' ? '#3498db' : 'transparent',
                color: selectedConsonantType === 'mid' ? 'white' : '#3498db',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 120,
                '&:hover': { backgroundColor: '#3498db', color: 'white' }
              }}
            >
              PHỤ ÂM TRUNG
            </Button>
            <Button
              onClick={() => setSelectedConsonantType('low')}
              variant={selectedConsonantType === 'low' ? 'contained' : 'outlined'}
              sx={{
                backgroundColor: selectedConsonantType === 'low' ? '#27ae60' : 'transparent',
                color: selectedConsonantType === 'low' ? 'white' : '#27ae60',
                fontWeight: 700,
                borderRadius: 0,
                minWidth: 120,
                '&:hover': { backgroundColor: '#27ae60', color: 'white' }
              }}
            >
              PHỤ ÂM THẤP
            </Button>
          </ButtonGroup>
          <Button
            onClick={handleReset}
            variant="outlined"
            size="small"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#95a5a6' : '#888',
              color: theme.palette.mode === 'dark' ? '#95a5a6' : '#888',
              fontWeight: 700,
              borderRadius: 2,
              minWidth: 80,
              ml: 2
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
                        <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Noto Serif Lao, serif' }}>
                          {consonant.letter}
                        </Typography>
                        {showPronunciation && (
                          <Typography 
                            variant="body2" 
                            sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', textShadow: '0 1px 4px #0008', fontFamily: 'Noto Serif Lao, serif', minHeight: '1.2em', opacity: showPronunciation ? 1 : 0, transition: 'opacity 0.2s' }}
                          >
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
                      <Typography variant="h5" sx={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Noto Serif Lao, serif' }}>
                        {vowel.letter}
                      </Typography>
                      {showPronunciation && (
                        <Typography 
                          variant="body2" 
                          sx={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', textShadow: '0 1px 4px #0008', fontFamily: 'Noto Serif Lao, serif', minHeight: '1.2em', opacity: showPronunciation ? 1 : 0, transition: 'opacity 0.2s' }}
                        >
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
                                fontSize: '1.4rem',
                                color: getConsonantColor(consonantLevel),
                                fontWeight: 'bold',
                                fontFamily: 'Noto Serif Lao, serif'
                              }}
                            >
                              {syllableInfo.syllable}
                            </Typography>
                            {showPronunciation && (
                              <Typography 
                                variant="body2" 
                                sx={{ fontSize: '0.85rem', color: '#fff', fontWeight: 'bold', textShadow: '0 1px 4px #0008', fontFamily: 'Noto Serif Lao, serif', minHeight: '1.2em', opacity: showPronunciation ? 1 : 0, transition: 'opacity 0.2s' }}
                              >
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