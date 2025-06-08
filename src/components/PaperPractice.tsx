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
  const theme = useTheme();

  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getNextPronunciation = (availablePronunciations: string[], lastAdded: string | null): string => {
    const filteredPronunciations = availablePronunciations.filter(p => p !== lastAdded);
    const randomIndex = Math.floor(Math.random() * filteredPronunciations.length);
    return filteredPronunciations[randomIndex];
  };

  const generatePronunciations = () => {
    const allPronunciations = practiceData.consonants.map(c => c.pronunciationVi);
    const selected: string[] = [];
    let lastAdded: string | null = null;

    while (selected.length < count) {
      const newPronunciation = getNextPronunciation(allPronunciations, lastAdded);
      selected.push(newPronunciation);
      lastAdded = newPronunciation;
    }

    setPronunciations(shuffleArray(selected));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePronunciations();
  };

  const handleRandomize = () => {
    if (pronunciations.length === 0) return;

    const newPronunciations = [...pronunciations];
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      let hasAdjacentDuplicates = false;
      
      for (let i = newPronunciations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newPronunciations[i], newPronunciations[j]] = [newPronunciations[j], newPronunciations[i]];
      }

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
  };

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

  // Hàm lấy màu ngẫu nhiên
  const getRandomColor = (index: number) => {
    const colors = theme.palette.mode === 'dark' ? darkModeColors : lightModeColors;
    // Tạo một số ngẫu nhiên thực sự dựa trên index và thời gian
    const seed = index + Date.now();
    const randomIndex = Math.floor(Math.sin(seed) * colors.length);
    return colors[Math.abs(randomIndex) % colors.length];
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
            <TableContainer 
              component={Paper} 
              elevation={2}
              sx={{
                '& .MuiTableCell-root': {
                  border: `1px solid ${theme.palette.divider}`,
                },
              }}
            >
              <Table>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {[...Array(8)].map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          align="center"
                          sx={{
                            height: 80,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            bgcolor: getRandomColor(rowIndex * 8 + colIndex),
                            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                            '&:hover': {
                              filter: 'brightness(1.1)',
                              transition: 'filter 0.2s ease-in-out',
                            },
                          }}
                        >
                          {row[colIndex] || ''}
                        </TableCell>
                      ))}
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