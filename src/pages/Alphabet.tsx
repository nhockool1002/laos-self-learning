import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import FlashCard from '../components/FlashCard';
import { practiceData } from '../data/practiceData';
import { vowelsFull, vowelsGroup } from '../data/VowelsData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface ConsonantCardProps {
  letter: string;
  pronunciationVi: string;
  type: 'consonant' | 'vowel' | 'tone';
}

interface ConsonantGroupProps {
  title: string;
  consonants: ConsonantCardProps[];
  type: 'consonant' | 'vowel' | 'tone';
  gridColumns?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const ConsonantCard: React.FC<ConsonantCardProps & { bgColor?: string; opacity?: number }> = ({ letter, pronunciationVi, type, bgColor, opacity }) => (
  <Card sx={{ 
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 3
    },
    backgroundColor: bgColor || '#1a1a1a',
    opacity: opacity ?? 1,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    margin: 0,
    minHeight: { xs: 70, sm: 120 },
    boxShadow: { xs: 1, sm: 3 },
    borderRadius: { xs: 1, sm: 3 },
  }}>
    <CardContent sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: { xs: 0.5, sm: 1.5 }
    }}>
      <Box>
        <Typography 
          variant="h3" 
          align="center" 
          sx={{ 
            fontFamily: 'Noto Serif Lao',
            color: getLetterColor(type),
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            minHeight: { xs: 24, sm: 60 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: { xs: '1.2rem', sm: '2.5rem' },
            width: '100%',
            minWidth: 0
          }}
        >
          {letter}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          minWidth: 0
        }}>
          <Typography 
            variant="subtitle1" 
            align="center"
            sx={{ 
              fontFamily: 'Pacifico, cursive',
              color: '#e53935',
              fontWeight: 'medium',
              minHeight: { xs: 14, sm: 24 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: '0.8rem', sm: '1.2rem' },
              mt: { xs: 0.5, sm: 1 },
              width: '100%',
              minWidth: 0
            }}
          >
            {pronunciationVi}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ConsonantGroup: React.FC<ConsonantGroupProps> = ({ title, consonants, type, gridColumns }) => {
  const finalGridColumns = {
    xs: 6, sm: 4, md: 3, lg: 2, ...gridColumns,
  };

  return (
    <Box sx={{ mb: 2, width: '100%', maxWidth: '100%', overflowX: 'hidden', px: { xs: 0, sm: 2 } }}>
      <Typography variant="h6" sx={{ color: '#fff', mb: 1.5, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>{title}</Typography>
      <Grid container spacing={{ xs: 0, sm: 1.5 }} sx={{ width: '100%', maxWidth: '100%', margin: 0, padding: 0, overflowX: 'hidden' }}>
        {consonants.map((consonant) => (
          <Grid
            item
            xs={finalGridColumns.xs}
            sm={finalGridColumns.sm}
            md={finalGridColumns.md}
            lg={finalGridColumns.lg}
            key={consonant.letter}
            sx={{ p: 0, minWidth: 0 }}
          >
            <ConsonantCard {...consonant} type={type} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`alphabet-tabpanel-${index}`}
      aria-labelledby={`alphabet-tab-${index}`}
      {...other}
      style={{ overflowX: 'hidden', width: '100%' }}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const getLetterColor = (type: 'consonant' | 'vowel' | 'tone') => {
  switch (type) {
    case 'consonant':
      return '#667eea';
    case 'vowel':
      return '#667eea';
    case 'tone':
      return '#4caf50';
    default:
      return '#000000';
  }
};

const laoAlphabetOrder = practiceData.consonants;

// Hàm xác định loại phụ âm theo bảng chuẩn
const getConsonantLevel = (letter: string): 'high' | 'mid' | 'low' | undefined => {
  if ([
    'ຂ', 'ສ', 'ຖ', 'ຜ', 'ຝ', 'ຫ'
  ].includes(letter)) return 'high';
  if ([
    'ກ', 'ຈ', 'ດ', 'ຕ', 'ບ', 'ປ', 'ຢ', 'ອ'
  ].includes(letter)) return 'mid';
  if ([
    'ຄ', 'ງ', 'ຊ', 'ຍ', 'ທ', 'ນ', 'ພ', 'ຟ', 'ມ', 'ຣ', 'ລ', 'ວ', 'ຮ'
  ].includes(letter)) return 'low';
  return undefined;
};

const Alphabet: React.FC = () => {
  const [value, setValue] = useState(0);
  const [groupMode, setGroupMode] = useState<'group' | 'all' | 'flashcard'>('group');
  const [vowelMode, setVowelMode] = useState<'group' | 'all'>('group');
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = useState(0);
  const [shuffledList, setShuffledList] = useState<typeof laoAlphabetOrder>([]);
  const [consonantFilter, setConsonantFilter] = useState<'all' | 'high' | 'mid' | 'low'>('all');

  // Hàm xáo trộn mảng
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleToggleMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'group' | 'all' | 'flashcard' | null
  ) => {
    if (newMode) {
      setGroupMode(newMode);
      if (newMode === 'flashcard') {
        const currentList = groupMode === 'group' 
          ? [...consonants.high, ...consonants.mid, ...consonants.low]
          : laoAlphabetOrder;
        setShuffledList(shuffleArray(currentList));
        setCurrentFlashCardIndex(0);
      }
    }
  };

  const handleToggleVowelMode = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'group' | 'all' | null
  ) => {
    if (newMode) setVowelMode(newMode);
  };

  const consonants = {
    high: [
      { letter: 'ຂ', pronunciationVi: 'khỏ' },
      { letter: 'ສ', pronunciationVi: 'xỏ' },
      { letter: 'ຖ', pronunciationVi: 'thỏ' },
      { letter: 'ຜ', pronunciationVi: "phỏ" },
      { letter: 'ຝ', pronunciationVi: 'fo' },
      { letter: 'ຫ', pronunciationVi: 'hỏ' },
    ],
    mid: [
      { letter: 'ກ', pronunciationVi: 'cò' },
      { letter: 'ຈ', pronunciationVi: 'cho' },
      { letter: 'ດ', pronunciationVi: 'đo' },
      { letter: 'ຕ', pronunciationVi: 'tò' },
      { letter: 'ບ', pronunciationVi: 'bo' },
      { letter: 'ປ', pronunciationVi: 'po' },
      { letter: 'ຢ', pronunciationVi: 'yo' },
      { letter: 'ອ', pronunciationVi: 'o' },
    ],
    low: [
      { letter: 'ຄ', pronunciationVi: 'kho' },
      { letter: 'ງ', pronunciationVi: 'ngo' },
      { letter: 'ຊ', pronunciationVi: 'xo' },
      { letter: 'ຍ', pronunciationVi: 'nho' },
      { letter: 'ທ', pronunciationVi: 'tho' },
      { letter: 'ນ', pronunciationVi: 'no' },
      { letter: 'ພ', pronunciationVi: "pho" },
      { letter: 'ຟ', pronunciationVi: 'fo' },
      { letter: 'ມ', pronunciationVi: 'mo' },
      { letter: 'ຣ', pronunciationVi: 'ro' },
      { letter: 'ລ', pronunciationVi: 'lo' },
      { letter: 'ວ', pronunciationVi: 'vo' },
      { letter: 'ຮ', pronunciationVi: 'hỏ' },
    ]
  };

  const handleNextFlashCard = () => {
    setShuffledList(shuffleArray(shuffledList));
    setCurrentFlashCardIndex(0);
  };

  const handlePrevFlashCard = () => {
    setShuffledList(shuffleArray(shuffledList));
    setCurrentFlashCardIndex(0);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%', overflowX: 'hidden', px: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="alphabet tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            width: '100%', 
            minWidth: 0, 
            maxWidth: '100%',
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontWeight: 500,
              '&.Mui-selected': {
                color: '#667eea',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            },
          }}
        >
          <Tab label="Phụ âm" />
          <Tab label="Nguyên âm" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <ToggleButtonGroup
            value={groupMode}
            exclusive
            onChange={handleToggleMode}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: 'text.secondary',
                borderColor: 'divider',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderColor: 'transparent',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                },
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)',
                },
              },
            }}
          >
            <ToggleButton value="group">Phân nhóm</ToggleButton>
            <ToggleButton value="all">Toàn bộ</ToggleButton>
            <ToggleButton value="flashcard">Flash Card</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {groupMode === 'flashcard' ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            gap: 2
          }}>
            {shuffledList.length > 0 && (
              <>
                <FlashCard
                  letter={shuffledList[currentFlashCardIndex].letter}
                  pronunciationVi={shuffledList[currentFlashCardIndex].pronunciationVi}
                  type="consonant"
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    onClick={handlePrevFlashCard}
                    sx={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      }
                    }}
                  >
                    Trước
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleNextFlashCard}
                    sx={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                      }
                    }}
                  >
                    Tiếp
                  </Button>
                </Box>
              </>
            )}
          </Box>
        ) : groupMode === 'group' ? (
          <>
            <ConsonantGroup 
              title="Phụ âm cao" 
              consonants={consonants.high.map(consonant => ({
                ...consonant,
                type: 'consonant' as const
              }))} 
              type="consonant" 
            />
            <ConsonantGroup 
              title="Phụ âm trung" 
              consonants={consonants.mid.map(consonant => ({
                ...consonant,
                type: 'consonant' as const
              }))} 
              type="consonant" 
            />
            <ConsonantGroup 
              title="Phụ âm thấp" 
              consonants={consonants.low.map(consonant => ({
                ...consonant,
                type: 'consonant' as const
              }))} 
              type="consonant" 
            />
          </>
        ) : (
          <>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant={consonantFilter === 'high' ? 'contained' : 'outlined'}
                color="warning"
                onClick={() => setConsonantFilter('high')}
              >
                Cao
              </Button>
              <Button
                variant={consonantFilter === 'mid' ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => setConsonantFilter('mid')}
              >
                Trung
              </Button>
              <Button
                variant={consonantFilter === 'low' ? 'contained' : 'outlined'}
                color="secondary"
                onClick={() => setConsonantFilter('low')}
              >
                Thấp
              </Button>
              <Button
                variant={consonantFilter === 'all' ? 'contained' : 'outlined'}
                onClick={() => setConsonantFilter('all')}
              >
                Huỷ
              </Button>
            </Box>
            <ConsonantGroup
              title="Bảng chữ cái Lào"
              consonants={laoAlphabetOrder.map(consonant => {
                const level = getConsonantLevel(consonant.letter);
                let bgColor = '#1a1a1a';
                if (level === 'high') bgColor = '#FFF9C4';
                if (level === 'mid') bgColor = '#BBDEFB';
                if (level === 'low') bgColor = '#F8BBD0';
                let opacity = 1;
                if (consonantFilter !== 'all' && level !== consonantFilter) opacity = 0;
                return {
                  ...consonant,
                  type: 'consonant' as const,
                  bgColor,
                  opacity
                };
              })}
              type="consonant"
            />
          </>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <ToggleButtonGroup
            value={vowelMode}
            exclusive
            onChange={handleToggleVowelMode}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: 'text.secondary',
                borderColor: 'divider',
                '&.Mui-selected': {
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  borderColor: 'transparent',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                },
                '&:hover': {
                  background: 'rgba(102, 126, 234, 0.1)',
                },
              },
            }}
          >
            <ToggleButton value="group">Phân loại</ToggleButton>
            <ToggleButton value="all">Toàn bộ</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {vowelMode === 'group' ? (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <ConsonantGroup
                title="Nguyên âm ngắn"
                consonants={vowelsGroup.ngan.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
                type="vowel"
                gridColumns={{ sm: 6, md: 6, lg: 6 }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <ConsonantGroup
                title="Nguyên âm dài"
                consonants={vowelsGroup.dai.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
                type="vowel"
                gridColumns={{ sm: 6, md: 6, lg: 6 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <ConsonantGroup
                title="Nguyên âm đặc biệt"
                consonants={vowelsGroup.dacbiet.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
                type="vowel"
                gridColumns={{ sm: 6, md: 6, lg: 6 }}
              />
            </Grid>
          </Grid>
        ) : (
          <ConsonantGroup
            title="Bảng nguyên âm Lào"
            consonants={vowelsFull.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
            type="vowel"
          />
        )}
      </TabPanel>
    </Box>
  );
};

export default Alphabet; 