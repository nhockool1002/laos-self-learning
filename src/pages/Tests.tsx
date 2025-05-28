import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  VolumeUp as VolumeUpIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

interface Test {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  questions: {
    id: number;
    type: 'multiple-choice' | 'listening' | 'writing';
    question: string;
    options?: string[];
    correctAnswer: string;
    audioUrl?: string;
  }[];
}

const tests: Test[] = [
  {
    id: 1,
    title: 'Kiểm tra cơ bản',
    description: 'Kiểm tra kiến thức cơ bản về tiếng Lào',
    level: 'beginner',
    questions: [
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
      // Thêm các câu hỏi khác
    ],
  },
  // Thêm các bài kiểm tra khác
];

const Tests: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setUserAnswers(new Array(test.questions.length).fill(''));
    setShowResults(false);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < (selectedTest?.questions.length || 0) - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    return userAnswers.reduce((score, answer, index) => {
      return (
        score +
        (answer === selectedTest.questions[index].correctAnswer ? 1 : 0)
      );
    }, 0);
  };

  const playSound = (text: string) => {
    // TODO: Implement text-to-speech functionality
    console.log('Playing sound for:', text);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Bài kiểm tra
      </Typography>

      <Grid container spacing={3}>
        {tests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {test.title}
                </Typography>
                <Typography color="text.secondary" paragraph>
                  {test.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Cấp độ: {test.level}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleStartTest(test)}
                  sx={{ mt: 2 }}
                >
                  Bắt đầu kiểm tra
                </Button>
              </CardContent>
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
        {selectedTest && (
          <>
            <DialogTitle>
              {showResults ? 'Kết quả kiểm tra' : selectedTest.title}
            </DialogTitle>
            <DialogContent>
              {!showResults ? (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Câu hỏi {currentQuestion + 1}/{selectedTest.questions.length}
                  </Typography>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      {selectedTest.questions[currentQuestion].question}
                    </FormLabel>
                    {selectedTest.questions[currentQuestion].type ===
                      'listening' && (
                      <IconButton
                        onClick={() =>
                          playSound(
                            selectedTest.questions[currentQuestion].audioUrl || ''
                          )
                        }
                        size="large"
                      >
                        <VolumeUpIcon />
                      </IconButton>
                    )}
                    <RadioGroup
                      value={userAnswers[currentQuestion]}
                      onChange={(e) => handleAnswer(e.target.value)}
                    >
                      {selectedTest.questions[currentQuestion].options?.map(
                        (option) => (
                          <FormControlLabel
                            key={option}
                            value={option}
                            control={<Radio />}
                            label={option}
                          />
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Điểm số: {calculateScore()}/{selectedTest.questions.length}
                  </Typography>
                  {selectedTest.questions.map((question, index) => (
                    <Paper key={index} sx={{ p: 2, mb: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Câu {index + 1}: {question.question}
                      </Typography>
                      <Typography>
                        Đáp án của bạn: {userAnswers[index]}
                      </Typography>
                      <Typography>
                        Đáp án đúng: {question.correctAnswer}
                      </Typography>
                      <IconButton
                        color={
                          userAnswers[index] === question.correctAnswer
                            ? 'success'
                            : 'error'
                        }
                      >
                        {userAnswers[index] === question.correctAnswer ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </IconButton>
                    </Paper>
                  ))}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              {!showResults && (
                <>
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    Câu trước
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!userAnswers[currentQuestion]}
                  >
                    {currentQuestion === selectedTest.questions.length - 1
                      ? 'Kết thúc'
                      : 'Câu tiếp'}
                  </Button>
                </>
              )}
              <Button onClick={handleCloseDialog}>
                {showResults ? 'Đóng' : 'Hủy'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Tests; 