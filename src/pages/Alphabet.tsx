import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { VolumeUp as VolumeUpIcon } from '@mui/icons-material';

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

const ConsonantCard: React.FC<ConsonantCardProps> = ({ letter, pronunciationVi, type }) => (
  <Card sx={{ 
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 3
    },
    backgroundColor: '#1a1a1a',
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

const Alphabet: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const consonants = {
    high: [
      { letter: 'ຂ', pronunciationVi: 'khó' },
      { letter: 'ສ', pronunciationVi: 'xó' },
      { letter: 'ຖ', pronunciationVi: 'thó' },
      { letter: 'ຜ', pronunciationVi: "phó" },
      { letter: 'ຝ', pronunciationVi: 'fó' },
      { letter: 'ຫ', pronunciationVi: 'hó' },
    ],
    mid: [
      { letter: 'ກ', pronunciationVi: 'co' },
      { letter: 'ຈ', pronunciationVi: 'cho' },
      { letter: 'ດ', pronunciationVi: 'do' },
      { letter: 'ຕ', pronunciationVi: 'to' },
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
      { letter: 'ຮ', pronunciationVi: 'hó' },
    ]
  };

  const vowels = [
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
  ];

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
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ConsonantGroup 
          title="Nguyên âm" 
          consonants={vowels.map(vowel => ({
            ...vowel,
            type: 'vowel' as const
          }))} 
          type="vowel" 
        />
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