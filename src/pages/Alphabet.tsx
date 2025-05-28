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

const Alphabet: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const consonants = [
    { letter: 'ກ', pronunciation: 'k', example: 'ກາ (kaa)' },
    { letter: 'ຂ', pronunciation: 'kh', example: 'ຂາ (khaa)' },
    { letter: 'ຄ', pronunciation: 'kh', example: 'ຄາ (khaa)' },
    { letter: 'ງ', pronunciation: 'ng', example: 'ງາ (ngaa)' },
    { letter: 'ຈ', pronunciation: 'ch', example: 'ຈາ (chaa)' },
    { letter: 'ສ', pronunciation: 's', example: 'ສາ (saa)' },
    { letter: 'ຊ', pronunciation: 's', example: 'ຊາ (saa)' },
    { letter: 'ຍ', pronunciation: 'ny', example: 'ຍາ (nyaa)' },
    { letter: 'ດ', pronunciation: 'd', example: 'ດາ (daa)' },
    { letter: 'ຕ', pronunciation: 't', example: 'ຕາ (taa)' },
    { letter: 'ຖ', pronunciation: 'th', example: 'ຖາ (thaa)' },
    { letter: 'ທ', pronunciation: 'th', example: 'ທາ (thaa)' },
    { letter: 'ນ', pronunciation: 'n', example: 'ນາ (naa)' },
    { letter: 'ບ', pronunciation: 'b', example: 'ບາ (baa)' },
    { letter: 'ປ', pronunciation: 'p', example: 'ປາ (paa)' },
    { letter: 'ຜ', pronunciation: 'ph', example: 'ຜາ (phaa)' },
    { letter: 'ຝ', pronunciation: 'f', example: 'ຝາ (faa)' },
    { letter: 'ພ', pronunciation: 'ph', example: 'ພາ (phaa)' },
    { letter: 'ຟ', pronunciation: 'f', example: 'ຟາ (faa)' },
    { letter: 'ມ', pronunciation: 'm', example: 'ມາ (maa)' },
    { letter: 'ຢ', pronunciation: 'y', example: 'ຢາ (yaa)' },
    { letter: 'ຣ', pronunciation: 'r', example: 'ຣາ (raa)' },
    { letter: 'ລ', pronunciation: 'l', example: 'ລາ (laa)' },
    { letter: 'ວ', pronunciation: 'w', example: 'ວາ (waa)' },
    { letter: 'ຫ', pronunciation: 'h', example: 'ຫາ (haa)' },
    { letter: 'ອ', pronunciation: '', example: 'ອາ (aa)' },
    { letter: 'ຮ', pronunciation: 'h', example: 'ຮາ (haa)' },
  ];

  const vowels = [
    { letter: 'ະ', pronunciation: 'a', example: 'ກະ (ka)' },
    { letter: 'າ', pronunciation: 'aa', example: 'ກາ (kaa)' },
    { letter: 'ິ', pronunciation: 'i', example: 'ກິ (ki)' },
    { letter: 'ີ', pronunciation: 'ii', example: 'ກີ (kii)' },
    { letter: 'ຶ', pronunciation: 'ue', example: 'ກຶ (kue)' },
    { letter: 'ື', pronunciation: 'uee', example: 'ກື (kuee)' },
    { letter: 'ຸ', pronunciation: 'u', example: 'ກຸ (ku)' },
    { letter: 'ູ', pronunciation: 'uu', example: 'ກູ (kuu)' },
    { letter: 'ເ', pronunciation: 'e', example: 'ເກ (ke)' },
    { letter: 'ແ', pronunciation: 'ae', example: 'ແກ (kae)' },
    { letter: 'ໂ', pronunciation: 'o', example: 'ໂກ (ko)' },
    { letter: 'ໃ', pronunciation: 'ai', example: 'ໃກ (kai)' },
    { letter: 'ໄ', pronunciation: 'ai', example: 'ໄກ (kai)' },
    { letter: 'ໍ', pronunciation: 'o', example: 'ກໍ (ko)' },
  ];

  const tones = [
    { name: 'Thanh ngang', symbol: '˧', example: 'ກາ (kaa)' },
    { name: 'Thanh sắc', symbol: '˨˦', example: 'ກ່າ (kaa)' },
    { name: 'Thanh huyền', symbol: '˧˩', example: 'ກ້າ (kaa)' },
    { name: 'Thanh hỏi', symbol: '˨˩˦', example: 'ກ່າະ (kaa)' },
    { name: 'Thanh ngã', symbol: '˧˥', example: 'ກ່າະ (kaa)' },
  ];

  const consonantClusters = [
    {
      cluster: 'ກຣ',
      pronunciation: 'kr',
      example: 'ກຣະ (kra)',
      explanation: 'Phụ âm kép với r'
    },
    {
      cluster: 'ຂຣ',
      pronunciation: 'khr',
      example: 'ຂຣະ (khra)',
      explanation: 'Phụ âm kép với r'
    },
    {
      cluster: 'ຄຣ',
      pronunciation: 'khr',
      example: 'ຄຣະ (khra)',
      explanation: 'Phụ âm kép với r'
    },
    {
      cluster: 'ພຣ',
      pronunciation: 'phr',
      example: 'ພຣະ (phra)',
      explanation: 'Phụ âm kép với r'
    },
  ];

  const diphthongs = [
    {
      vowel: 'ເອະ',
      pronunciation: 'eo',
      example: 'ເອະ (eo)',
      explanation: 'Nguyên âm đôi eo'
    },
    {
      vowel: 'ແອະ',
      pronunciation: 'aeo',
      example: 'ແອະ (aeo)',
      explanation: 'Nguyên âm đôi aeo'
    },
    {
      vowel: 'ໂອະ',
      pronunciation: 'oo',
      example: 'ໂອະ (oo)',
      explanation: 'Nguyên âm đôi oo'
    },
  ];

  const finalConsonants = [
    {
      consonant: 'ກ',
      pronunciation: 'k',
      example: 'ສັກ (sak)',
      explanation: 'Phụ âm cuối k'
    },
    {
      consonant: 'ງ',
      pronunciation: 'ng',
      example: 'ສັງ (sang)',
      explanation: 'Phụ âm cuối ng'
    },
    {
      consonant: 'ຍ',
      pronunciation: 'ny',
      example: 'ສັຍ (sany)',
      explanation: 'Phụ âm cuối ny'
    },
    {
      consonant: 'ດ',
      pronunciation: 't',
      example: 'ສັດ (sat)',
      explanation: 'Phụ âm cuối t'
    },
    {
      consonant: 'ນ',
      pronunciation: 'n',
      example: 'ສັນ (san)',
      explanation: 'Phụ âm cuối n'
    },
    {
      consonant: 'ບ',
      pronunciation: 'p',
      example: 'ສັບ (sap)',
      explanation: 'Phụ âm cuối p'
    },
    {
      consonant: 'ມ',
      pronunciation: 'm',
      example: 'ສັມ (sam)',
      explanation: 'Phụ âm cuối m'
    },
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

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'lo-LA';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const getLetterColor = (type: 'consonant' | 'vowel' | 'tone') => {
    switch (type) {
      case 'consonant':
        return '#2196f3'; // Màu xanh dương
      case 'vowel':
        return '#f50057'; // Màu hồng
      case 'tone':
        return '#4caf50'; // Màu xanh lá
      default:
        return '#000000';
    }
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
        <Grid container spacing={2}>
          {consonants.map((consonant) => (
            <Grid item xs={12} sm={6} md={4} key={consonant.letter}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                },
                backgroundColor: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h2" 
                      align="center" 
                      sx={{ 
                        fontFamily: 'Noto Sans Lao',
                        color: getLetterColor('consonant'),
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {consonant.letter}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center"
                      sx={{ 
                        color: '#fff',
                        fontWeight: 'medium',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {consonant.pronunciation}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mt: 2
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mr: 1, 
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        '& span': {
                          color: getLetterColor('consonant'),
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <span>{consonant.example.split(' ')[0]}</span> {consonant.example.split(' ')[1]}
                    </Typography>
                    <IconButton 
                      onClick={() => playSound(consonant.example)}
                      sx={{
                        color: getLetterColor('consonant'),
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.1)'
                        }
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          {vowels.map((vowel) => (
            <Grid item xs={12} sm={6} md={4} key={vowel.letter}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                },
                backgroundColor: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h2" 
                      align="center" 
                      sx={{ 
                        fontFamily: 'Noto Sans Lao',
                        color: getLetterColor('vowel'),
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {vowel.letter}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center"
                      sx={{ 
                        color: '#fff',
                        fontWeight: 'medium',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {vowel.pronunciation}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mt: 2
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mr: 1, 
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        '& span': {
                          color: getLetterColor('vowel'),
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <span>{vowel.example.split(' ')[0]}</span> {vowel.example.split(' ')[1]}
                    </Typography>
                    <IconButton 
                      onClick={() => playSound(vowel.example)}
                      sx={{
                        color: getLetterColor('vowel'),
                        '&:hover': {
                          backgroundColor: 'rgba(245, 0, 87, 0.1)'
                        }
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {tones.map((tone) => (
            <Grid item xs={12} sm={6} md={4} key={tone.name}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                },
                backgroundColor: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h6" 
                      align="center"
                      sx={{ 
                        color: getLetterColor('tone'),
                        fontWeight: 'bold',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {tone.name}
                    </Typography>
                    <Typography 
                      variant="h4" 
                      align="center"
                      sx={{ 
                        color: getLetterColor('tone'),
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {tone.symbol}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mt: 2
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mr: 1, 
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        '& span': {
                          color: getLetterColor('tone'),
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <span>{tone.example.split(' ')[0]}</span> {tone.example.split(' ')[1]}
                    </Typography>
                    <IconButton 
                      onClick={() => playSound(tone.example)}
                      sx={{
                        color: getLetterColor('tone'),
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)'
                        }
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid container spacing={2}>
          {consonantClusters.map((cluster) => (
            <Grid item xs={12} sm={6} md={4} key={cluster.cluster}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                },
                backgroundColor: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h2" 
                      align="center" 
                      sx={{ 
                        fontFamily: 'Noto Sans Lao',
                        color: '#2196f3',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {cluster.cluster}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center"
                      sx={{ 
                        color: '#fff',
                        fontWeight: 'medium',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {cluster.pronunciation}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      align="center"
                      sx={{ 
                        color: '#aaa',
                        mt: 1
                      }}
                    >
                      {cluster.explanation}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mt: 2
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mr: 1, 
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        '& span': {
                          color: '#2196f3',
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <span>{cluster.example.split(' ')[0]}</span> {cluster.example.split(' ')[1]}
                    </Typography>
                    <IconButton 
                      onClick={() => playSound(cluster.example)}
                      sx={{
                        color: '#2196f3',
                        '&:hover': {
                          backgroundColor: 'rgba(33, 150, 243, 0.1)'
                        }
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Grid container spacing={2}>
          {diphthongs.map((diphthong) => (
            <Grid item xs={12} sm={6} md={4} key={diphthong.vowel}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                },
                backgroundColor: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h2" 
                      align="center" 
                      sx={{ 
                        fontFamily: 'Noto Sans Lao',
                        color: '#f50057',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {diphthong.vowel}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center"
                      sx={{ 
                        color: '#fff',
                        fontWeight: 'medium',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {diphthong.pronunciation}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      align="center"
                      sx={{ 
                        color: '#aaa',
                        mt: 1
                      }}
                    >
                      {diphthong.explanation}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mt: 2
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mr: 1, 
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        '& span': {
                          color: '#f50057',
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <span>{diphthong.example.split(' ')[0]}</span> {diphthong.example.split(' ')[1]}
                    </Typography>
                    <IconButton 
                      onClick={() => playSound(diphthong.example)}
                      sx={{
                        color: '#f50057',
                        '&:hover': {
                          backgroundColor: 'rgba(245, 0, 87, 0.1)'
                        }
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={5}>
        <Grid container spacing={2}>
          {finalConsonants.map((final) => (
            <Grid item xs={12} sm={6} md={4} key={final.consonant}>
              <Card sx={{ 
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 3
                },
                backgroundColor: '#1a1a1a',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <CardContent sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  p: 2
                }}>
                  <Box>
                    <Typography 
                      variant="h2" 
                      align="center" 
                      sx={{ 
                        fontFamily: 'Noto Sans Lao',
                        color: '#4caf50',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        minHeight: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {final.consonant}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      align="center"
                      sx={{ 
                        color: '#fff',
                        fontWeight: 'medium',
                        minHeight: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {final.pronunciation}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      align="center"
                      sx={{ 
                        color: '#aaa',
                        mt: 1
                      }}
                    >
                      {final.explanation}
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    mt: 2
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mr: 1, 
                        fontFamily: 'Noto Sans Lao',
                        color: '#fff',
                        '& span': {
                          color: '#4caf50',
                          fontWeight: 'bold'
                        }
                      }}
                    >
                      <span>{final.example.split(' ')[0]}</span> {final.example.split(' ')[1]}
                    </Typography>
                    <IconButton 
                      onClick={() => playSound(final.example)}
                      sx={{
                        color: '#4caf50',
                        '&:hover': {
                          backgroundColor: 'rgba(76, 175, 80, 0.1)'
                        }
                      }}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
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
                <IconButton 
                  onClick={() => playSound(item.word)}
                  sx={{
                    color: '#4caf50',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.1)'
                    }
                  }}
                >
                  <VolumeUpIcon />
                </IconButton>
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
                <IconButton 
                  onClick={() => playSound(exercise.sentence)}
                  sx={{
                    color: '#4caf50',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.1)'
                    }
                  }}
                >
                  <VolumeUpIcon />
                </IconButton>
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