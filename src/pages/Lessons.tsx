import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  MenuBook as MenuBookIcon,
  Translate as TranslateIcon,
  Lightbulb as LightbulbIcon,
  People as PeopleIcon,
  AccessTime as TimeIcon,
  Palette as ColorIcon,
  Cloud as WeatherIcon,
  DirectionsCar as TransportIcon,
  Work as WorkIcon,
  LocationOn as PlaceIcon,
  EmojiEmotions as EmotionIcon,
  Restaurant as FoodIcon,
  Numbers as NumbersIcon,
  WavingHand as GreetingIcon,
} from '@mui/icons-material';
import { lessons, Lesson } from '../data/lessons';

interface VocabularyItem {
  word: string;
  pronunciation: string;
  meaning: string;
  example?: string;
}

interface GrammarPoint {
  title: string;
  explanation: string;
  structure: string;
  examples: string[];
}

interface PracticeExample {
  question: string;
  options: string[];
}

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expanded, setExpanded] = useState<string | false>('vocabulary');

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionStyles = {
    vocabulary: {
      bgcolor: '#f0f4ff',
      icon: <MenuBookIcon sx={{ color: '#1565c0' }} />,
      title: 'Từ vựng',
      textColor: '#0d223a',
    },
    grammar: {
      bgcolor: '#eafaf1',
      icon: <TranslateIcon sx={{ color: '#388e3c' }} />,
      title: 'Ngữ pháp',
      textColor: '#1b5e20',
    },
    examples: {
      bgcolor: '#fff7ed',
      icon: <LightbulbIcon sx={{ color: '#f57c00' }} />,
      title: 'Ví dụ',
      textColor: '#a84300',
    },
  };

  const getLessonIcon = (id: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      greetings: <GreetingIcon sx={{ color: '#e91e63' }} />,
      numbers: <NumbersIcon sx={{ color: '#9c27b0' }} />,
      food: <FoodIcon sx={{ color: '#ff9800' }} />,
      family: <PeopleIcon sx={{ color: '#2196f3' }} />,
      time: <TimeIcon sx={{ color: '#4caf50' }} />,
      colors: <ColorIcon sx={{ color: '#f44336' }} />,
      weather: <WeatherIcon sx={{ color: '#00bcd4' }} />,
      transportation: <TransportIcon sx={{ color: '#795548' }} />,
      occupations: <WorkIcon sx={{ color: '#607d8b' }} />,
      places: <PlaceIcon sx={{ color: '#ff5722' }} />,
      emotions: <EmotionIcon sx={{ color: '#ffeb3b' }} />,
    };
    return iconMap[id] || <SchoolIcon sx={{ color: '#1976d2' }} />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bài học theo chủ đề
      </Typography>

      <Grid container spacing={3}>
        {/* Danh sách bài học */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Danh sách bài học
              </Typography>
              <List>
                {lessons.map((lesson: Lesson) => (
                  <ListItem
                    button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLesson(lesson);
                      setExpanded('vocabulary');
                    }}
                    selected={selectedLesson?.id === lesson.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgb(198, 226, 255)',
                      },
                      '&.Mui-selected': {
                        backgroundColor: 'rgba(25, 118, 210, 0.12)',
                      }
                    }}
                  >
                    <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                      {getLessonIcon(lesson.id)}
                    </Box>
                    <ListItemText
                      primary={lesson.title}
                      secondary={lesson.description}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: 'bold',
                          fontSize: '1.1rem',
                          color: '#bcd4f5',
                          '&:hover': {
                            color: '#0d47a1'
                          }
                        },
                        '& .MuiListItemText-secondary': {
                          color: '#6a7b91'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết bài học */}
        <Grid item xs={12} md={8}>
          {selectedLesson ? (
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {selectedLesson.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {selectedLesson.description}
                </Typography>

                {/* Từ vựng */}
                <Accordion
                  expanded={expanded === 'vocabulary'}
                  onChange={handleAccordionChange('vocabulary')}
                  sx={{
                    mb: 2,
                    '&:before': { display: 'none' },
                    bgcolor: accordionStyles.vocabulary.bgcolor,
                    boxShadow: 2,
                    borderRadius: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                        gap: 1,
                      },
                    }}
                  >
                    {accordionStyles.vocabulary.icon}
                    <Typography variant="h6" sx={{ color: accordionStyles.vocabulary.textColor, fontWeight: 700 }}>{accordionStyles.vocabulary.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {selectedLesson.content.vocabulary.map((word: VocabularyItem, index: number) => (
                        <Grid item xs={6} md={3} key={index}>
                          <Paper elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
                            <ListItem disableGutters>
                              <ListItemText
                                primary={
                                  <Typography variant="h6" sx={{ color: accordionStyles.vocabulary.textColor, fontWeight: 600 }}>
                                    {word.word}
                                  </Typography>
                                }
                                secondary={
                                  <>
                                    <Typography component="span" variant="body2" sx={{ color: accordionStyles.vocabulary.textColor }}>
                                      {word.meaning}
                                    </Typography>
                                    <br />
                                    <Typography component="span" variant="body2" sx={{ color: '#1976d2', fontStyle: 'italic', fontWeight: 500 }}>
                                      [{word.pronunciation}]
                                    </Typography>
                                    <br />
                                    <Typography component="span" variant="body2" sx={{ color: '#374151', fontStyle: 'italic', fontSize: '0.97em' }}>
                                      {word.example}
                                    </Typography>
                                  </>
                                }
                              />
                            </ListItem>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Ngữ pháp */}
                <Accordion
                  expanded={expanded === 'grammar'}
                  onChange={handleAccordionChange('grammar')}
                  sx={{
                    mb: 2,
                    '&:before': { display: 'none' },
                    bgcolor: accordionStyles.grammar.bgcolor,
                    boxShadow: 2,
                    borderRadius: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                        gap: 1,
                      },
                    }}
                  >
                    {accordionStyles.grammar.icon}
                    <Typography variant="h6" sx={{ color: accordionStyles.grammar.textColor, fontWeight: 700 }}>{accordionStyles.grammar.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {selectedLesson.content.grammar?.map((point: GrammarPoint, index: number) => (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          p: 2,
                          mb: 2,
                          bgcolor: 'rgba(255,255,255,0.85)',
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="h6" gutterBottom sx={{ color: accordionStyles.grammar.textColor, fontWeight: 600 }}>
                          {point.title}
                        </Typography>
                        <Typography paragraph sx={{ color: accordionStyles.grammar.textColor }}>{point.explanation}</Typography>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: '#d0f5e2',
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ color: '#1b5e20', fontWeight: 'bold' }}>
                            Cấu trúc: {point.structure}
                          </Typography>
                        </Paper>
                        <List>
                          {point.examples.map((example: string, idx: number) => (
                            <ListItem key={idx}>
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      fontFamily: 'Noto Sans Lao',
                                      color: '#388e3c',
                                      fontWeight: 500,
                                    }}
                                  >
                                    {example}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          ))}
                        </List>
                        {index < (selectedLesson.content.grammar?.length ?? 0) - 1 && (
                          <Divider sx={{ my: 2 }} />
                        )}
                      </Paper>
                    ))}
                  </AccordionDetails>
                </Accordion>

                {/* Ví dụ */}
                <Accordion
                  expanded={expanded === 'examples'}
                  onChange={handleAccordionChange('examples')}
                  sx={{
                    '&:before': { display: 'none' },
                    bgcolor: accordionStyles.examples.bgcolor,
                    boxShadow: 2,
                    borderRadius: 2,
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                        gap: 1,
                      },
                    }}
                  >
                    {accordionStyles.examples.icon}
                    <Typography variant="h6" sx={{ color: accordionStyles.examples.textColor, fontWeight: 700 }}>{accordionStyles.examples.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {selectedLesson.content.practice?.map((example: PracticeExample, index: number) => (
                        <Paper
                          key={index}
                          elevation={0}
                          sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: 'rgba(255,255,255,0.85)',
                            borderRadius: 2,
                          }}
                        >
                          <ListItem>
                            <ListItemText
                              primary={
                                <Typography variant="body1" sx={{ mb: 1, color: accordionStyles.examples.textColor, fontWeight: 600 }}>
                                  {example.question}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ mt: 1 }}>
                                  {example.options.map((option: string, idx: number) => (
                                    <Typography
                                      key={idx}
                                      component="div"
                                      variant="body2"
                                      sx={{
                                        color: accordionStyles.examples.textColor,
                                        mb: 0.5,
                                        fontFamily: 'Noto Sans Lao',
                                        fontWeight: 500,
                                      }}
                                    >
                                      {String.fromCharCode(65 + idx)}. {option}
                                    </Typography>
                                  ))}
                                </Box>
                              }
                            />
                          </ListItem>
                        </Paper>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 4,
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Vui lòng chọn một bài học để xem chi tiết
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lessons; 