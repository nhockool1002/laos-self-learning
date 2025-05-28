import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Paper,
} from '@mui/material';
import { VolumeUp as VolumeUpIcon } from '@mui/icons-material';
import { lessons, Lesson } from '../data/lessons';

const Lessons: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return '#4caf50';
      case 'intermediate':
        return '#ff9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#757575';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bài học theo chủ đề
      </Typography>

      <Grid container spacing={3}>
        {lessons.map((lesson) => (
          <Grid item xs={12} sm={6} md={4} key={lesson.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {lesson.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {lesson.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={lesson.category} 
                    size="small" 
                    sx={{ mr: 1, mb: 1 }}
                  />
                  <Chip 
                    label={lesson.level} 
                    size="small"
                    sx={{ 
                      backgroundColor: getLevelColor(lesson.level),
                      color: 'white'
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleOpenDialog(lesson)}
                >
                  Học ngay
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedLesson && (
          <>
            <DialogTitle>
              <Typography variant="h5">
                {selectedLesson.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {selectedLesson.description}
              </Typography>
            </DialogTitle>
            <DialogContent dividers>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Từ vựng
                </Typography>
                <Grid container spacing={2}>
                  {selectedLesson.content.vocabulary.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box>
                          <Typography 
                            variant="h6" 
                            component="div"
                            sx={{ 
                              fontFamily: 'Noto Sans Lao',
                              color: '#2196f3'
                            }}
                          >
                            {item.word}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.pronunciation}
                          </Typography>
                          <Typography variant="body1">
                            {item.meaning}
                          </Typography>
                          {item.example && (
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {item.example}
                            </Typography>
                          )}
                        </Box>
                        <IconButton 
                          onClick={() => playSound(item.pronunciation)}
                          color="primary"
                          sx={{ 
                            '&:hover': {
                              backgroundColor: 'rgba(33, 150, 243, 0.1)'
                            }
                          }}
                        >
                          <VolumeUpIcon />
                        </IconButton>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {selectedLesson.content.grammar && selectedLesson.content.grammar.length > 0 && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Ngữ pháp
                  </Typography>
                  <List>
                    {selectedLesson.content.grammar.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" fontWeight="bold">
                                {item.title}
                              </Typography>
                            }
                            secondary={
                              <Box component="span" sx={{ display: 'block' }}>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                  sx={{ display: 'block', mb: 1 }}
                                >
                                  {item.explanation}
                                </Typography>
                                {item.examples.map((example, idx) => (
                                  <Typography
                                    key={idx}
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ 
                                      display: 'block',
                                      fontFamily: 'Noto Sans Lao'
                                    }}
                                  >
                                    {example}
                                  </Typography>
                                ))}
                              </Box>
                            }
                          />
                        </ListItem>
                        {selectedLesson.content.grammar && index < selectedLesson.content.grammar.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}

              {selectedLesson.content.practice && selectedLesson.content.practice.length > 0 && (
                <Box>
                  <Typography variant="h6" component="h3" gutterBottom>
                    Luyện tập
                  </Typography>
                  <List>
                    {selectedLesson.content.practice.map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1">
                                {item.question}
                              </Typography>
                            }
                            secondary={
                              <Box component="span" sx={{ display: 'block', mt: 1 }}>
                                {item.options.map((option, idx) => (
                                  <Typography
                                    key={idx}
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ 
                                      display: 'block',
                                      fontFamily: 'Noto Sans Lao',
                                      mb: 0.5
                                    }}
                                  >
                                    {String.fromCharCode(65 + idx)}. {option}
                                  </Typography>
                                ))}
                              </Box>
                            }
                          />
                        </ListItem>
                        {selectedLesson.content.practice && index < selectedLesson.content.practice.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Lessons; 