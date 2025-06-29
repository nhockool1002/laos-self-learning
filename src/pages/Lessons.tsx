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
  Paper,
  Tabs,
  Tab,
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
  VideoLibrary as VideoIcon,
} from '@mui/icons-material';
import { lessons, Lesson } from '../data/lessons';
import VideoLessons from '../components/VideoLessons';

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
      id={`lessons-tabpanel-${index}`}
      aria-labelledby={`lessons-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expanded, setExpanded] = useState<string | false>('vocabulary');
  const [tabValue, setTabValue] = useState(0);

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          mb: 3
        }}
      >
        Bài học
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="lessons tabs"
          sx={{
            '& .MuiTab-root': {
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&.Mui-selected': {
                color: '#667eea',
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              height: 3,
            },
          }}
        >
          <Tab 
            label="Bài học theo chủ đề" 
            icon={<MenuBookIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Bài học qua video" 
            icon={<VideoIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
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
                        {selectedLesson.content.vocabulary.map((item: VocabularyItem, index: number) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Paper
                              elevation={0}
                              sx={{
                                p: 2,
                                bgcolor: 'rgba(255,255,255,0.85)',
                                borderRadius: 2,
                                border: '1px solid #e3f2fd',
                              }}
                            >
                              <Typography variant="h6" gutterBottom sx={{ color: accordionStyles.vocabulary.textColor, fontWeight: 600 }}>
                                {item.word}
                              </Typography>
                              <Typography variant="body2" sx={{ color: accordionStyles.vocabulary.textColor, mb: 1 }}>
                                <strong>Phát âm:</strong> {item.pronunciation}
                              </Typography>
                              <Typography variant="body2" sx={{ color: accordionStyles.vocabulary.textColor, mb: 1 }}>
                                <strong>Nghĩa:</strong> {item.meaning}
                              </Typography>
                              {item.example && (
                                <Typography variant="body2" sx={{ color: accordionStyles.vocabulary.textColor, fontStyle: 'italic' }}>
                                  <strong>Ví dụ:</strong> {item.example}
                                </Typography>
                              )}
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
                          <Typography variant="subtitle2" sx={{ color: accordionStyles.grammar.textColor, fontWeight: 600, mb: 1 }}>
                            Ví dụ:
                          </Typography>
                          <List dense>
                            {point.examples.map((example: string, exampleIndex: number) => (
                              <ListItem key={exampleIndex} sx={{ py: 0.5 }}>
                                <ListItemText
                                  primary={example}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      color: accordionStyles.grammar.textColor,
                                      fontSize: '0.9rem',
                                    }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      ))}
                    </AccordionDetails>
                  </Accordion>

                  {/* Ví dụ thực hành */}
                  <Accordion
                    expanded={expanded === 'examples'}
                    onChange={handleAccordionChange('examples')}
                    sx={{
                      mb: 2,
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
                          <Typography variant="h6" gutterBottom sx={{ color: accordionStyles.examples.textColor, fontWeight: 600 }}>
                            {example.question}
                          </Typography>
                          <List dense>
                            {example.options.map((option: string, optionIndex: number) => (
                              <ListItem key={optionIndex} sx={{ py: 0.5 }}>
                                <ListItemText
                                  primary={`${String.fromCharCode(65 + optionIndex)}. ${option}`}
                                  sx={{
                                    '& .MuiListItemText-primary': {
                                      color: accordionStyles.examples.textColor,
                                      fontSize: '0.9rem',
                                    }
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      ))}
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
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <VideoLessons />
      </TabPanel>
    </Box>
  );
};

export default Lessons; 