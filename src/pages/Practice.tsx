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
  CircularProgress,
} from '@mui/material';
import { VolumeUp as VolumeUpIcon, EmojiEvents as EmojiEventsIcon } from '@mui/icons-material';
import ReactConfetti from 'react-confetti';
import practiceConfig from '../practiceConfig.json';
import { practiceData } from '../data/practiceData';
import { sheetService } from '../services/sheetService';
import { useAuth } from '../contexts/AuthContext';
import { UserRankInline } from '../components/UserRank';

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
  username: string;
  score: number;
  time: number;
  date: string;
}

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
  const { currentUser } = useAuth();
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
  const [isSaving, setIsSaving] = useState(false);

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

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];
    const consonants = practiceData.consonants;
    const usedKeys = new Set<string>();

    function getOptions(correct: string, isLetter: boolean) {
      const pool = consonants
        .filter(c => (isLetter ? c.letter : c.pronunciationVi) !== correct)
        .map(c => isLetter ? c.letter : c.pronunciationVi);
      const uniquePool = Array.from(new Set(pool));
      const wrongOptions = uniquePool.sort(() => Math.random() - 0.5).slice(0, practiceConfig.numOptions - 1);
      const insertIdx = Math.floor(Math.random() * practiceConfig.numOptions);
      const options = [...wrongOptions];
      options.splice(insertIdx, 0, correct);
      return options;
    }

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

    return newQuestions.sort(() => Math.random() - 0.5).slice(0, 25);
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

  const handleNext = useCallback(async () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setUserAnswer('');
    } else {
      setIsSaving(true);
      const finalTime = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      
      if (currentUser) {
        const newScore = {
          username: currentUser.username,
          score,
          time: finalTime,
          date: new Date().toLocaleDateString()
        };

        try {
          const currentLeaderboard = await sheetService.getLeaderboard();
          
          const existingUserScore = currentLeaderboard.find(record => record.username === currentUser.username);
          
          let shouldUpdate = false;
          
          if (!existingUserScore) {
            shouldUpdate = true;
          } else {
            if (score > existingUserScore.score) {
              shouldUpdate = true;
            } else if (score === existingUserScore.score && finalTime < existingUserScore.time) {
              shouldUpdate = true;
            }
          }
          
          if (shouldUpdate) {
            await sheetService.addScore(newScore);
            const updatedLeaderboard = await sheetService.getLeaderboard();
            setLeaderboard(updatedLeaderboard);
          }
        } catch (error) {
          console.error('Error saving score:', error);
        }
      }
      
      setIsSaving(false);
      setShowResults(true);
    }
  }, [currentQuestionIndex, questions, score, startTime, currentUser]);

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

  // Load leaderboard data
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const records = await sheetService.getLeaderboard();
        setLeaderboard(records);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      }
    };
    loadLeaderboard();
  }, []); // Chỉ load một lần khi component mount

  // Handle window resize
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

  // Handle question timer
  useEffect(() => {
    if (showResults) return;
    if (currentQuestionIndex === 0) {
      setQuestionTimer(null);
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
  }, [currentQuestionIndex, showResults, handleNext]);

  // Handle elapsed time
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

  // Generate questions
  useEffect(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions[0]);
  }, [value, generateQuestions]);

  const renderQuestion = () => {
    if (!currentQuestion) return null;
    return (
      <Box sx={{ maxWidth: { xs: '100%', sm: 600 }, mx: 'auto', mt: { xs: 1, sm: 4 }, px: { xs: 1, sm: 0 } }}>
        <Card sx={{ mb: 3, backgroundColor: '#1a1a1a', borderRadius: { xs: 2, sm: 3 }, boxShadow: { xs: 1, sm: 3 } }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" sx={{ mb: 2, color: '#fff', fontSize: { xs: '1.1rem', sm: '1.5rem' } }}>
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
                    ? { xs: '1.3rem', sm: '2rem' } 
                    : { xs: '2.2rem', sm: '4rem' }
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
            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <RadioGroup
                value={userAnswer}
                onChange={(e) => handleAnswer(e.target.value)}
              >
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' }, 
                  width: '100%',
                  gap: { xs: 1, sm: 2 }
                }}>
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
                              ? { xs: '1rem', sm: '1.2rem' } 
                              : { xs: '1.3rem', sm: '2rem' },
                            color: '#fff',
                            width: '100%',
                            textAlign: 'center'
                          }}
                        >
                          {option}
                        </Typography>
                      }
                      sx={{ width: '100%', justifyContent: 'center', m: 0, py: { xs: 0.5, sm: 1 } }}
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
              fontWeight: 'bold',
              fontSize: { xs: '1rem', sm: '1.2rem' }
            }}
          >
            {currentQuestionIndex === 0
              ? 'Không giới hạn thời gian'
              : `Thời gian: ${questionTimer}s`}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            Câu {currentQuestionIndex + 1}/{questions.length}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={!userAnswer || isSaving}
            sx={{ backgroundColor: '#2196f3', minWidth: { xs: 90, sm: 120 }, fontSize: { xs: '0.95rem', sm: '1rem' }, py: { xs: 1, sm: 1.5 } }}
          >
            {isSaving && currentQuestionIndex === questions.length - 1 ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Tiếp theo'
            )}
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
            {!currentUser && (
              <Typography variant="body1" sx={{ mb: 2, color: '#aaa', textAlign: 'center' }}>
                Đăng nhập để lưu kết quả và xem bảng xếp hạng
              </Typography>
            )}
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
          {currentUser && (
            <Button
              variant="contained"
              onClick={() => setShowLeaderboard(true)}
              startIcon={<EmojiEventsIcon />}
              sx={{ backgroundColor: '#ffd700' }}
            >
              Bảng xếp hạng
            </Button>
          )}
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
          width: 500,
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
                  <TableCell sx={{ color: '#fff' }}>Tên người dùng</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Điểm</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Thời gian</TableCell>
                  <TableCell sx={{ color: '#fff' }}>Ngày</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: '#fff' }}>{index + 1}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>
                      <UserRankInline username={record.username} rank={index + 1} />
                    </TableCell>
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