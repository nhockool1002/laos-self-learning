import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  keyframes,
} from '@mui/material';
import { VolumeUp as VolumeUpIcon, EmojiEvents as EmojiEventsIcon } from '@mui/icons-material';
import ReactConfetti from 'react-confetti';
import practiceConfig from '../practiceConfig.json';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Question {
  type: 'pronunciation-to-letter' | 'letter-to-pronunciation';
  question: string;
  options: string[];
  correctAnswer: string;
}

interface AnswerResult {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

interface ScoreRecord {
  score: number;
  time: number;
  date: string;
}

const practiceData = {
  consonants: [
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
  ]
};

const rainbowAnimation = keyframes`
  0% { color: #ff0000; }
  17% { color: #ff8000; }
  33% { color: #ffff00; }
  50% { color: #00ff00; }
  67% { color: #0000ff; }
  83% { color: #8000ff; }
  100% { color: #ff0000; }
`;

const Practice: React.FC = () => {
  const [value, setValue] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerResults, setAnswerResults] = useState<AnswerResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ScoreRecord[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [questionTimer, setQuestionTimer] = useState<number | null>(practiceConfig.questionTimeLimit);

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];
    const consonants = practiceData.consonants;
    const usedKeys = new Set<string>();

    // Helper để lấy 7 đáp án sai ngẫu nhiên, không trùng đáp án đúng
    function getOptions(correct: string, isLetter: boolean) {
      const pool = consonants
        .filter(c => (isLetter ? c.letter : c.pronunciationVi) !== correct)
        .map(c => isLetter ? c.letter : c.pronunciationVi);
      // Loại bỏ trùng lặp
      const uniquePool = Array.from(new Set(pool));
      const wrongOptions = uniquePool.sort(() => Math.random() - 0.5).slice(0, practiceConfig.numOptions - 1);
      // Chèn đáp án đúng vào vị trí ngẫu nhiên
      const insertIdx = Math.floor(Math.random() * practiceConfig.numOptions);
      const options = [...wrongOptions];
      options.splice(insertIdx, 0, correct);
      return options;
    }

    // Tạo câu hỏi nhìn phiên âm chọn chữ Lào
    consonants.forEach(consonant => {
      const options = getOptions(consonant.letter, true);
      const key = `pronunciation-to-letter-${consonant.pronunciationVi}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        newQuestions.push({
          type: 'pronunciation-to-letter',
          question: consonant.pronunciationVi,
          options,
          correctAnswer: consonant.letter
        });
      }
    });

    // Tạo câu hỏi nhìn chữ Lào đoán phiên âm
    consonants.forEach(consonant => {
      const options = getOptions(consonant.pronunciationVi, false);
      const key = `letter-to-pronunciation-${consonant.letter}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        newQuestions.push({
          type: 'letter-to-pronunciation',
          question: consonant.letter,
          options,
          correctAnswer: consonant.pronunciationVi
        });
      }
    });

    // Xáo trộn và lấy 25 câu không lặp lại
    return newQuestions.sort(() => Math.random() - 0.5).slice(0, 25);
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const playSound = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'th-TH';
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    if (!currentQuestion) return;
    
    setUserAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setScore(prev => prev + (isCorrect ? 1 : 0));
    setAnswerResults(prev => [...prev, {
      question: currentQuestion,
      userAnswer: answer,
      isCorrect
    }]);

    if (currentQuestionIndex === 0 && !startTime) {
      setStartTime(Date.now());
    }
  }, [currentQuestion, currentQuestionIndex, startTime]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setUserAnswer('');
    } else {
      const finalTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      const newScore: ScoreRecord = {
        score,
        time: finalTime,
        date: new Date().toLocaleDateString()
      };

      setLeaderboard(prev => {
        const updated = [...prev, newScore]
          .sort((a, b) => b.score - a.score || a.time - b.time)
          .slice(0, 10);
        localStorage.setItem('consonantLeaderboard', JSON.stringify(updated));
        return updated;
      });
      setShowResults(true);
    }
  }, [currentQuestionIndex, questions, score, startTime]);

  const handleRestart = useCallback(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions[0]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerResults([]);
    setShowResults(false);
    setStartTime(null);
    setElapsedTime(0);
    setUserAnswer('');
  }, [generateQuestions]);

  const triggerConfetti = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions[0]);
  }, [value, generateQuestions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime && !showResults) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [startTime, showResults]);

  useEffect(() => {
    try {
      const savedLeaderboard = localStorage.getItem('consonantLeaderboard');
      if (savedLeaderboard) {
        setLeaderboard(JSON.parse(savedLeaderboard));
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showResults) return;
    if (currentQuestionIndex === 0) {
      setQuestionTimer(null); // Không đếm thời gian câu 1
      return;
    }
    setQuestionTimer(practiceConfig.questionTimeLimit);
    const timer = setInterval(() => {
      setQuestionTimer(prev => {
        if (prev === 1) {
          handleNext();
          return practiceConfig.questionTimeLimit;
        }
        return (prev ?? practiceConfig.questionTimeLimit) - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  // eslint-disable-next-line
  }, [currentQuestionIndex, showResults]);

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Card sx={{ mb: 3, backgroundColor: '#1a1a1a' }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, color: '#fff' }}>
              {currentQuestion.type === 'pronunciation-to-letter' 
                ? 'Chọn chữ cái Lào tương ứng với phiên âm:'
                : 'Chọn phiên âm tương ứng với chữ cái Lào:'}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mb: 3
            }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontFamily: currentQuestion.type === 'pronunciation-to-letter' 
                    ? 'inherit' 
                    : 'Noto Serif Lao',
                  color: '#fff',
                  fontSize: currentQuestion.type === 'pronunciation-to-letter' 
                    ? '2rem' 
                    : '4rem'
                }}
              >
                {currentQuestion.question}
              </Typography>
              {currentQuestion.type === 'pronunciation-to-letter' && (
                <IconButton 
                  onClick={() => playSound(currentQuestion.question)}
                  sx={{ ml: 2, color: '#2196f3' }}
                >
                  <VolumeUpIcon />
                </IconButton>
              )}
            </Box>
            <FormControl component="fieldset">
              <RadioGroup
                value={userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                <Box sx={{ display: 'grid', gridTemplateColumns: '50% 50%', width: '100%' }}>
                  {currentQuestion.options.slice(0, practiceConfig.numOptions).map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={
                        <Typography 
                          sx={{ 
                            fontFamily: currentQuestion.type === 'letter-to-pronunciation' 
                              ? 'inherit' 
                              : 'Noto Serif Lao',
                            fontSize: currentQuestion.type === 'letter-to-pronunciation' 
                              ? '1.2rem' 
                              : '2rem',
                            color: '#fff',
                            width: '100%',
                            textAlign: 'center'
                          }}
                        >
                          {option}
                        </Typography>
                      }
                      sx={{ width: '100%', justifyContent: 'center', m: 0 }}
                    />
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              animation: `${rainbowAnimation} 2s linear infinite`,
              fontWeight: 'bold'
            }}
          >
            {currentQuestionIndex === 0
              ? 'Không giới hạn thời gian'
              : `Thời gian: ${questionTimer}s`}
          </Typography>
          <Typography variant="h6" color="primary">
            Câu {currentQuestionIndex + 1}/{questions.length}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={!userAnswer}
            sx={{ backgroundColor: '#2196f3' }}
          >
            Tiếp theo
          </Button>
        </Box>
      </Box>
    );
  };

  const renderResults = () => {
    const wrongAnswers = answerResults.filter(result => !result.isCorrect);
    const hasEnoughCorrect = score >= practiceConfig.confettiThreshold;
    if (hasEnoughCorrect && !showConfetti) {
      triggerConfetti();
    }
    
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
        )}
        <Card sx={{ mb: 3, backgroundColor: '#1a1a1a' }}>
          <CardContent>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2, 
                color: hasEnoughCorrect ? '#ffd700' : '#fff', 
                textAlign: 'center',
                animation: hasEnoughCorrect ? `${rainbowAnimation} 2s linear infinite` : 'none',
                fontWeight: 'bold'
              }}
            >
              Kết quả: {score}/{questions.length} câu đúng
              {hasEnoughCorrect && ' 🎉'}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, color: '#fff', textAlign: 'center' }}>
              Thời gian: {formatTime(elapsedTime)}
            </Typography>
            {wrongAnswers.length > 0 && (
              <>
                <Typography variant="h6" sx={{ mb: 2, color: '#fff' }}>
                  Các câu trả lời sai:
                </Typography>
                <List>
                  {wrongAnswers.map((result, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography sx={{ color: '#fff' }}>
                              {result.question.type === 'pronunciation-to-letter' 
                                ? `Phiên âm: ${result.question.question}`
                                : `Chữ Lào: ${result.question.question}`}
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ color: '#aaa' }}>
                              Đáp án của bạn: {result.userAnswer}
                              <br />
                              Đáp án đúng: {result.question.correctAnswer}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < wrongAnswers.length - 1 && <Divider sx={{ borderColor: '#333' }} />}
                    </React.Fragment>
                  ))}
                </List>
              </>
            )}
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleRestart}
            sx={{ backgroundColor: '#2196f3' }}
          >
            Làm lại
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowLeaderboard(true)}
            startIcon={<EmojiEventsIcon />}
            sx={{ backgroundColor: '#ffd700' }}
          >
            Bảng xếp hạng
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="practice tabs">
          <Tab label="Luyện tập phụ âm" />
          <Tab label="Luyện tập từ vựng" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setShowLeaderboard(true)}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: '#ffd700',
              '&:hover': {
                backgroundColor: 'rgba(255, 215, 0, 0.1)'
              }
            }}
          >
            <EmojiEventsIcon />
          </IconButton>

          {showResults ? renderResults() : renderQuestion()}
        </Box>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6" sx={{ textAlign: 'center', mt: 4 }}>
          Tính năng đang được phát triển
        </Typography>
      </TabPanel>

      <Modal
        open={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: 400,
          bgcolor: '#1a1a1a',
          borderRadius: 2,
          p: 3,
          maxHeight: '80vh',
          overflow: 'auto'
        }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#fff', textAlign: 'center' }}>
            Bảng xếp hạng
          </Typography>
          <TableContainer component={Paper} sx={{ bgcolor: '#1a1a1a' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#fff' }}>Hạng</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Điểm</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Thời gian</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Ngày</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#fff' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{record.score}/25</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{formatTime(record.time)}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{record.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`practice-tabpanel-${index}`}
      aria-labelledby={`practice-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default Practice; 