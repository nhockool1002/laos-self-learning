import React, { useState } from 'react';
import { practiceData } from '../data/practiceData';
import {
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
import { Shuffle as ShuffleIcon } from '@mui/icons-material';

const PaperPractice: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [pronunciations, setPronunciations] = useState<string[]>([]);
  const [flipped, setFlipped] = useState<{ [index: number]: boolean }>({});
  const [countClick, setCountClick] = useState<number>(0);
  const [cellBgColors, setCellBgColors] = useState<string[]>([]);
  const theme = useTheme();

  const generatePronunciations = () => {
    const allPronunciations = practiceData.consonants.map(c => c.pronunciationVi);
    if (allPronunciations.length === 0 || count <= 0) {
      setPronunciations([]);
      setCellBgColors([]);
      setFlipped({});
      setCountClick(0);
      return;
    }
    let result: string[] = [];
    let attempts = 0;
    const maxAttempts = 1000;
    while (attempts < maxAttempts) {
      // Bước 1: Đảm bảo mỗi chữ xuất hiện ít nhất 1 lần
      result = [...allPronunciations];
      // Bước 2: Thêm các chữ random nếu cần
      while (result.length < count) {
        const next = allPronunciations[Math.floor(Math.random() * allPronunciations.length)];
        result.push(next);
      }
      // Bước 3: Xáo trộn nhiều lần để tăng tính ngẫu nhiên
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      // Kiểm tra không có hai chữ liền kề giống nhau
      let hasAdjacentDuplicates = false;
      for (let i = 0; i < result.length - 1; i++) {
        if (result[i] === result[i + 1]) {
          hasAdjacentDuplicates = true;
          break;
        }
      }
      if (!hasAdjacentDuplicates) break;
      attempts++;
    }
    // Nếu thử nhiều lần vẫn không được, dùng thuật toán greedy
    if (attempts === maxAttempts) {
      result = [];
      let last: string | null = null;
      for (let i = 0; i < count; i++) {
        // eslint-disable-next-line no-loop-func
        const candidates = allPronunciations.filter(p => p !== last && (!result.includes(p) || result.length >= allPronunciations.length));
        if (candidates.length === 0) {
          // fallback: cho phép trùng nếu không còn lựa chọn
          result.push(allPronunciations[Math.floor(Math.random() * allPronunciations.length)]);
        } else {
          const next = candidates[Math.floor(Math.random() * candidates.length)];
          result.push(next);
          last = next;
        }
      }
    }
    setPronunciations(result);
    setCellBgColors(generateCellBgColors(result.length));
    setFlipped({});
    setCountClick(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePronunciations();
  };

  const handleRandomize = () => {
    if (pronunciations.length === 0) return;

    let attempts = 0;
    const maxAttempts = 100;
    let newPronunciations = [...pronunciations];

    while (attempts < maxAttempts) {
      let hasAdjacentDuplicates = false;
      
      // Xáo trộn mảng
      for (let i = newPronunciations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPronunciations[i], newPronunciations[j]] = [newPronunciations[j], newPronunciations[i]];
      }

      // Kiểm tra xem có phiên âm liền kề trùng nhau không
      for (let i = 0; i < newPronunciations.length - 1; i++) {
        if (newPronunciations[i] === newPronunciations[i + 1]) {
          hasAdjacentDuplicates = true;
          break;
        }
      }

      if (!hasAdjacentDuplicates) {
        break;
      }

      attempts++;
    }

    setPronunciations(newPronunciations);
    setCellBgColors(generateCellBgColors(newPronunciations.length));
    setFlipped({});
    setCountClick(0);
  };

  // Lấy mapping pronunciationVi -> letter
  const pronunciationToLetter: Record<string, string> = React.useMemo(() => {
    const map: Record<string, string> = {};
    practiceData.consonants.forEach(c => {
      map[c.pronunciationVi] = c.letter;
    });
    return map;
  }, []);

  // Chia pronunciations thành các hàng 8 cột
  const rows = [];
  for (let i = 0; i < pronunciations.length; i += 8) {
    rows.push(pronunciations.slice(i, i + 8));
  }

  // Màu nền cho dark mode (nhạt hơn)
  const darkModeColors = [
    '#2c3e50',
    '#34495e',
    '#2ecc71',
    '#e74c3c',
    '#9b59b6',
    '#3498db',
    '#f1c40f',
    '#1abc9c',
  ].map(color => {
    // Tăng độ sáng cho dark mode
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Tăng độ sáng lên 20%
    const brighterR = Math.min(255, r + (255 - r) * 0.2);
    const brighterG = Math.min(255, g + (255 - g) * 0.2);
    const brighterB = Math.min(255, b + (255 - b) * 0.2);
    
    return `rgb(${brighterR}, ${brighterG}, ${brighterB})`;
  });

  // Màu nền cho light mode
  const lightModeColors = [
    '#e8eaf6',
    '#ede7f6',
    '#e8f5e9',
    '#ffebee',
    '#f3e5f5',
    '#e3f2fd',
    '#fff3e0',
    '#e0f7fa',
  ];

  // Hàm random màu nền cho từng ô
  const generateCellBgColors = (length: number) => {
    const colors = theme.palette.mode === 'dark' ? darkModeColors : lightModeColors;
    const arr: string[] = [];
    for (let i = 0; i < length; i++) {
      arr.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return arr;
  };

  // Hàm xử lý khi nhấn vào ô
  const handleFlip = (cellIndex: number) => {
    setFlipped(prev => ({ ...prev, [cellIndex]: true }));
    setCountClick(prev => prev + 1);
    setTimeout(() => {
      setFlipped(prev => ({ ...prev, [cellIndex]: false }));
    }, 10000); // 10 giây
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
            <TextField
              type="number"
              label="Số lượng phiên âm"
              variant="outlined"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 0)}
              inputProps={{ min: 1, max: 100 }}
              sx={{ flexGrow: 1 }}
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ minWidth: 120 }}
            >
              Tạo bài tập
            </Button>
          </Box>
        </form>

        {pronunciations.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Tổng số phiên âm: {pronunciations.length}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ShuffleIcon />}
                onClick={handleRandomize}
                disabled={pronunciations.length === 0}
              >
                Ngẫu nhiên
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              <b>Số lần lật ô: {countClick}</b>
            </Typography>
            <TableContainer 
              component={Paper} 
              elevation={2}
              sx={{
                '& .MuiTableCell-root': {
                  border: `1px solid ${theme.palette.divider}`,
                  cursor: 'pointer',
                  perspective: 600,
                  p: 0,
                },
              }}
            >
              <Table>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(8)].map((_, colIndex) => {
                        const cellIndex = rowIndex * 8 + colIndex;
                        const pronunciation = row[colIndex];
                        const isFlipped = flipped[cellIndex];
                        return (
                          <TableCell
                            key={colIndex}
                            align="center"
                            sx={{
                              height: 80,
                              fontSize: '1.2rem',
                              fontWeight: 'bold',
                              bgcolor: cellBgColors[cellIndex] || (theme.palette.mode === 'dark' ? darkModeColors[0] : lightModeColors[0]),
                              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                              '&:hover': {
                                filter: 'brightness(1.1)',
                                transition: 'filter 0.2s ease-in-out',
                              },
                              p: 0,
                            }}
                            onClick={() => pronunciation && handleFlip(cellIndex)}
                          >
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: isFlipped ? { xs: '2rem', sm: '2.5rem' } : '1.2rem',
                                fontFamily: isFlipped ? 'Noto Serif Lao' : 'inherit',
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                position: 'relative',
                                perspective: 600,
                                transform: isFlipped ? 'rotateY(180deg)' : 'none',
                                cursor: pronunciation ? 'pointer' : 'default',
                                minHeight: 80,
                              }}
                            >
                              {/* Mặt trước */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backfaceVisibility: 'hidden',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '1.2rem',
                                  fontWeight: 'bold',
                                  opacity: isFlipped ? 0 : 1,
                                  transition: 'opacity 0.3s',
                                }}
                              >
                                {pronunciation || ''}
                              </Box>
                              {/* Mặt sau */}
                              <Box
                                sx={{
                                  position: 'absolute',
                                  width: '100%',
                                  height: '100%',
                                  backfaceVisibility: 'hidden',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: { xs: '2rem', sm: '2.5rem' },
                                  fontFamily: 'Noto Serif Lao',
                                  transform: 'rotateY(180deg)',
                                  opacity: isFlipped ? 1 : 0,
                                  transition: 'opacity 0.3s',
                                }}
                              >
                                {pronunciation ? pronunciationToLetter[pronunciation] : ''}
                              </Box>
                            </Box>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default PaperPractice; 