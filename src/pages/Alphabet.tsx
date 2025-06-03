import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import FlashCard from '../components/FlashCard';

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
    maxWidth: '160px',
    margin: '0 auto'
  }}>
    <CardContent sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      p: 1.5
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
            minHeight: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem'
          }}
        >
          {letter}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <Typography 
            variant="subtitle1" 
            align="center"
            sx={{ 
              fontFamily: 'Pacifico, cursive',
              color: '#e53935',
              fontWeight: 'medium',
              minHeight: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              mt: 1
            }}
          >
            {pronunciationVi}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const ConsonantGroup: React.FC<ConsonantGroupProps> = ({ title, consonants, type }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" sx={{ color: '#fff', mb: 1.5 }}>{title}</Typography>
    <Grid container spacing={1.5}>
      {consonants.map((consonant) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={consonant.letter}>
          <ConsonantCard {...consonant} type={type} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`alphabet-tabpanel-${index}`}
      aria-labelledby={`alphabet-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const getLetterColor = (type: 'consonant' | 'vowel' | 'tone') => {
  switch (type) {
    case 'consonant':
      return '#2196f3';
    case 'vowel':
      return '#f50057';
    case 'tone':
      return '#4caf50';
    default:
      return '#000000';
  }
};

const laoAlphabetOrder = [
  { letter: 'ກ', pronunciationVi: 'cò' },
  { letter: 'ຂ', pronunciationVi: 'khỏ' },
  { letter: 'ຄ', pronunciationVi: 'kho' },
  { letter: 'ງ', pronunciationVi: 'ngo' },
  { letter: 'ຈ', pronunciationVi: 'cho' },
  { letter: 'ສ', pronunciationVi: 'xỏ' },
  { letter: 'ຊ', pronunciationVi: 'xo' },
  { letter: 'ຍ', pronunciationVi: 'nho' },
  { letter: 'ດ', pronunciationVi: 'đo' },
  { letter: 'ຕ', pronunciationVi: 'tò' },
  { letter: 'ຖ', pronunciationVi: 'thỏ' },
  { letter: 'ທ', pronunciationVi: 'tho' },
  { letter: 'ນ', pronunciationVi: 'no' },
  { letter: 'ບ', pronunciationVi: 'bo' },
  { letter: 'ປ', pronunciationVi: 'po' },
  { letter: 'ຜ', pronunciationVi: 'phỏ' },
  { letter: 'ຝ', pronunciationVi: 'fỏ' },
  { letter: 'ພ', pronunciationVi: 'pho' },
  { letter: 'ຟ', pronunciationVi: 'fo' },
  { letter: 'ມ', pronunciationVi: 'mo' },
  { letter: 'ຢ', pronunciationVi: 'yo' },
  { letter: 'ຣ', pronunciationVi: 'ro' },
  { letter: 'ລ', pronunciationVi: 'lo' },
  { letter: 'ວ', pronunciationVi: 'vo' },
  { letter: 'ອ', pronunciationVi: 'o' },
  { letter: 'ຮ', pronunciationVi: 'hỏ' },
];

const vowelsFull = [
  { letter: 'ະ', pronunciationVi: 'a' },
  { letter: 'າ', pronunciationVi: 'aa' },
  { letter: 'ິ', pronunciationVi: 'i' },
  { letter: 'ີ', pronunciationVi: 'ii' },
  { letter: 'ຶ', pronunciationVi: 'ư' },
  { letter: 'ື', pronunciationVi: 'ưư' },
  { letter: 'ຸ', pronunciationVi: 'u' },
  { letter: 'ູ', pronunciationVi: 'uu' },
  { letter: 'ເ', pronunciationVi: 'e' },
  { letter: 'ແ', pronunciationVi: 'e' },
  { letter: 'ໂ', pronunciationVi: 'o' },
  { letter: 'ໃ', pronunciationVi: 'ai' },
  { letter: 'ໄ', pronunciationVi: 'ai' },
  { letter: 'ໍ', pronunciationVi: 'o' },
  { letter: 'ົ', pronunciationVi: 'o' },
  { letter: 'ັ', pronunciationVi: 'ă' },
  { letter: 'ົວ', pronunciationVi: 'ua' },
  { letter: 'ວ', pronunciationVi: 'ua' },
  { letter: 'ຽ', pronunciationVi: 'ia' },
  { letter: 'ືອ', pronunciationVi: 'ưa' },
  { letter: 'ເອ', pronunciationVi: 'ê' },
  { letter: 'ເວ', pronunciationVi: 'êu' },
  { letter: 'ເຍ', pronunciationVi: 'ia' },
  { letter: 'ເືອ', pronunciationVi: 'ưa' },
  { letter: 'ເັຍ', pronunciationVi: 'ia' },
  { letter: 'ເົາ', pronunciationVi: 'ao' },
  { letter: 'ເັຍະ', pronunciationVi: 'ia' },
  { letter: 'ເືອະ', pronunciationVi: 'ưa' },
];

const vowelsGroup = {
  truoc: [
    { letter: 'ເ', pronunciationVi: 'e' },
    { letter: 'ແ', pronunciationVi: 'e' },
    { letter: 'ໂ', pronunciationVi: 'o' },
    { letter: 'ໃ', pronunciationVi: 'ai' },
    { letter: 'ໄ', pronunciationVi: 'ai' },
    { letter: 'ເອ', pronunciationVi: 'ê' },
    { letter: 'ເວ', pronunciationVi: 'êu' },
    { letter: 'ເຍ', pronunciationVi: 'ia' },
    { letter: 'ເືອ', pronunciationVi: 'ưa' },
    { letter: 'ເັຍ', pronunciationVi: 'ia' },
    { letter: 'ເົາ', pronunciationVi: 'ao' },
    { letter: 'ເັຍະ', pronunciationVi: 'ia' },
    { letter: 'ເືອະ', pronunciationVi: 'ưa' },
  ],
  sau: [
    { letter: 'ະ', pronunciationVi: 'a' },
    { letter: 'າ', pronunciationVi: 'aa' },
    { letter: 'ົ', pronunciationVi: 'o' },
    { letter: 'ັ', pronunciationVi: 'ă' },
    { letter: 'ົວ', pronunciationVi: 'ua' },
    { letter: 'ວ', pronunciationVi: 'ua' },
    { letter: 'ຽ', pronunciationVi: 'ia' },
    { letter: 'ືອ', pronunciationVi: 'ưa' },
  ],
  tren: [
    { letter: 'ິ', pronunciationVi: 'i' },
    { letter: 'ີ', pronunciationVi: 'ii' },
    { letter: 'ຶ', pronunciationVi: 'ư' },
    { letter: 'ື', pronunciationVi: 'ưư' },
  ],
  duoi: [
    { letter: 'ຸ', pronunciationVi: 'u' },
    { letter: 'ູ', pronunciationVi: 'uu' },
    { letter: 'ໍ', pronunciationVi: 'o' },
  ]
};

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

  const tones = [
    { letter: '˧', pronunciationVi: 'ngang' },
    { letter: '˨˦', pronunciationVi: 'sắc' },
    { letter: '˧˩', pronunciationVi: 'huyền' },
    { letter: '˨˩˦', pronunciationVi: 'hỏi' },
    { letter: '˧˥', pronunciationVi: 'ngã' },
  ];

  const consonantClusters = [
    { letter: 'ກຣ', pronunciationVi: 'kro' },
    { letter: 'ຂຣ', pronunciationVi: 'khro' },
    { letter: 'ຄຣ', pronunciationVi: 'khro' },
    { letter: 'ພຣ', pronunciationVi: 'phro' },
  ];

  const diphthongs = [
    { letter: 'ເອະ', pronunciationVi: 'eo' },
    { letter: 'ແອະ', pronunciationVi: 'aeo' },
    { letter: 'ໂອະ', pronunciationVi: 'oo' },
  ];

  const finalConsonants = [
    { letter: 'ກ', pronunciationVi: 'k' },
    { letter: 'ງ', pronunciationVi: 'ng' },
    { letter: 'ຍ', pronunciationVi: 'nh' },
    { letter: 'ດ', pronunciationVi: 't' },
    { letter: 'ນ', pronunciationVi: 'n' },
    { letter: 'ບ', pronunciationVi: 'p' },
    { letter: 'ມ', pronunciationVi: 'm' },
  ];

  const irregularPronunciations = [
    {
      word: 'ຫຼື',
      pronunciation: 'lue',
      explanation: 'Đọc là "lue" thay vì "hue"'
    },
    {
      word: 'ເຫຼືອ',
      pronunciation: 'luea',
      explanation: 'Đọc là "luea" thay vì "huea"'
    },
    {
      word: 'ຫຼັງ',
      pronunciation: 'lang',
      explanation: 'Đọc là "lang" thay vì "hlang"'
    },
  ];

  const intonationExercises = [
    {
      sentence: 'ສະບາຍດີ',
      meaning: 'Xin chào',
      intonation: 'Thanh ngang'
    },
    {
      sentence: 'ຂໍອະນຸຍາດ',
      meaning: 'Xin phép',
      intonation: 'Thanh sắc'
    },
    {
      sentence: 'ຂໍຂອບໃຈ',
      meaning: 'Cảm ơn',
      intonation: 'Thanh huyền'
    },
  ];

  const handleNextFlashCard = () => {
    setShuffledList(shuffleArray(shuffledList));
    setCurrentFlashCardIndex(0);
  };

  const handlePrevFlashCard = () => {
    setShuffledList(shuffleArray(shuffledList));
    setCurrentFlashCardIndex(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="alphabet tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Phụ âm" />
          <Tab label="Nguyên âm" />
          <Tab label="Thanh" />
          <Tab label="Phụ âm kép" />
          <Tab label="Nguyên âm đôi" />
          <Tab label="Phụ âm cuối" />
          <Tab label="Bất quy tắc" />
          <Tab label="Ngữ điệu" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <ToggleButtonGroup
            value={groupMode}
            exclusive
            onChange={handleToggleMode}
            size="small"
            color="primary"
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
                    sx={{ backgroundColor: '#2196f3' }}
                  >
                    Trước
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleNextFlashCard}
                    sx={{ backgroundColor: '#2196f3' }}
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
            color="primary"
          >
            <ToggleButton value="group">Phân loại</ToggleButton>
            <ToggleButton value="all">Toàn bộ</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {vowelMode === 'group' ? (
          <>
            <ConsonantGroup
              title="Nguyên âm đứng trước"
              consonants={vowelsGroup.truoc.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
              type="vowel"
            />
            <ConsonantGroup
              title="Nguyên âm đứng sau"
              consonants={vowelsGroup.sau.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
              type="vowel"
            />
            <ConsonantGroup
              title="Nguyên âm đứng trên"
              consonants={vowelsGroup.tren.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
              type="vowel"
            />
            <ConsonantGroup
              title="Nguyên âm đứng dưới"
              consonants={vowelsGroup.duoi.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
              type="vowel"
            />
          </>
        ) : (
          <ConsonantGroup
            title="Bảng nguyên âm Lào"
            consonants={vowelsFull.map(vowel => ({ ...vowel, type: 'vowel' as const }))}
            type="vowel"
          />
        )}
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ConsonantGroup 
          title="Thanh" 
          consonants={tones.map(tone => ({
            ...tone,
            type: 'tone' as const
          }))} 
          type="tone" 
        />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <ConsonantGroup 
          title="Phụ âm kép" 
          consonants={consonantClusters.map(cluster => ({
            ...cluster,
            type: 'consonant' as const
          }))} 
          type="consonant" 
        />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <ConsonantGroup 
          title="Nguyên âm đôi" 
          consonants={diphthongs.map(diphthong => ({
            ...diphthong,
            type: 'vowel' as const
          }))} 
          type="vowel" 
        />
      </TabPanel>

      <TabPanel value={value} index={5}>
        <ConsonantGroup 
          title="Phụ âm cuối" 
          consonants={finalConsonants.map(final => ({
            ...final,
            type: 'consonant' as const
          }))} 
          type="consonant" 
        />
      </TabPanel>

      <TabPanel value={value} index={6}>
        <List sx={{ width: '100%', bgcolor: '#1a1a1a', borderRadius: 1 }}>
          {irregularPronunciations.map((item, index) => (
            <React.Fragment key={item.word}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {item.word}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#aaa', display: 'block' }}
                      >
                        Phát âm: {item.pronunciation}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#aaa', display: 'block' }}
                      >
                        {item.explanation}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < irregularPronunciations.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={value} index={7}>
        <List sx={{ width: '100%', bgcolor: '#1a1a1a', borderRadius: 1 }}>
          {intonationExercises.map((exercise, index) => (
            <React.Fragment key={exercise.sentence}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {exercise.sentence}
                    </Typography>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#aaa', display: 'block' }}
                      >
                        Nghĩa: {exercise.meaning}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: '#aaa', display: 'block' }}
                      >
                        Ngữ điệu: {exercise.intonation}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < intonationExercises.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </TabPanel>
    </Box>
  );
};

export default Alphabet; 