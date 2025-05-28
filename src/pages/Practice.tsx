import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import {
  Mic as MicIcon,
  VolumeUp as VolumeUpIcon,
} from '@mui/icons-material';

interface Exercise {
  id: number;
  type: 'multiple-choice' | 'listening' | 'speaking' | 'writing';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Chọn từ đúng nghĩa với "ສະບາຍດີ"',
    options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'],
    correctAnswer: 'Xin chào',
  },
  {
    id: 2,
    type: 'listening',
    question: 'Nghe và chọn từ đúng',
    options: ['ກາ', 'ຂາ', 'ຄາ', 'ງາ'],
    correctAnswer: 'ກາ',
    audioUrl: '/audio/ka.mp3',
  },
  // Thêm các bài tập khác
];

const Practice: React.FC = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = () => {
    if (userAnswer === exercises[currentExercise].correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserAnswer('');
      setShowResult(false);
    }
  };

  const playSound = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const renderExercise = () => {
    const exercise = exercises[currentExercise];

    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{exercise.question}</FormLabel>
            <RadioGroup
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            >
              {exercise.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );

      case 'listening':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {exercise.question}
            </Typography>
            <IconButton
              onClick={() => playSound(exercise.audioUrl || '')}
              size="large"
            >
              <VolumeUpIcon />
            </IconButton>
            <RadioGroup
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            >
              {exercise.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>
        );

      case 'speaking':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {exercise.question}
            </Typography>
            <IconButton
              onClick={() => {
                // TODO: Implement speech recognition
                console.log('Start recording');
              }}
              size="large"
            >
              <MicIcon />
            </IconButton>
          </Box>
        );

      case 'writing':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              {exercise.question}
            </Typography>
            <TextField
              fullWidth
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Nhập câu trả lời của bạn"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Luyện tập
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bài tập {currentExercise + 1}/{exercises.length}
              </Typography>
              {renderExercise()}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleAnswer}
                  disabled={!userAnswer || showResult}
                >
                  Kiểm tra
                </Button>
                {showResult && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ ml: 2 }}
                  >
                    Tiếp theo
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Kết quả
            </Typography>
            <Typography>
              Điểm số: {score}/{currentExercise + 1}
            </Typography>
            <Typography>
              Tiến độ: {Math.round(((currentExercise + 1) / exercises.length) * 100)}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Practice; 