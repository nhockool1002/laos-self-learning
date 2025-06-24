import React, { useState, useEffect, useCallback, useRef } from 'react';
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
import { VolumeUp as VolumeUpIcon, EmojiEvents as EmojiEventsIcon, HourglassEmpty as HourglassEmptyIcon } from '@mui/icons-material';
import ReactConfetti from 'react-confetti';
import practiceConfig from '../practiceConfig.json';
import { practiceData } from '../data/practiceData';
import { useAuth } from '../contexts/AuthContext';
import { UserRankInline } from '../components/UserRank';
import { supabase, TABLES } from '../config/supabaseConfig';

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
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState<ScoreRecord[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [questionTimer, setQuestionTimer] = useState<number | null>(practiceConfig.questionTimeLimit);
  const [isSaving, setIsSaving] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handleNextRef = useRef<() => Promise<void>>();
  const [totalTimer, setTotalTimer] = useState(0);
  const totalTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(async () => {
    try {
      if (!currentQuestion) return;

      setIsSaving(true);

      // Tính kết quả tạm thời cho câu hiện tại
      const isCorrect = userAnswer === currentQuestion.correctAnswer;
      const nextScore = score + (isCorrect ? 1 : 0);
      const nextAnswerResults = [
        ...answerResults,
        {
          question: currentQuestion,
          userAnswer,
          isCorrect,
        },
      ];

      if (currentQuestionIndex === questions.length - 1) {
        // Lưu leaderboard với score mới nhất và date
        const finalScore = nextScore;
        const finalTime = totalTimer;
        const today = new Date().toISOString().slice(0, 10);

        if (currentUser) {
          const query = supabase
            .from(TABLES.LEADERBOARD)
            .select('*')
            .eq('username', currentUser.username)
            .single();
          const { data: existingRecord, error: leaderboardError } = await query;
          if (leaderboardError && leaderboardError.code !== 'PGRST116') {
            throw leaderboardError;
          }

          if (existingRecord) {
            if (finalScore > existingRecord.score || 
                (finalScore === existingRecord.score && finalTime < existingRecord.time)) {
              await supabase
                .from(TABLES.LEADERBOARD)
                .update({ score: finalScore, time: finalTime, date: today })
                .eq('username', currentUser.username);
            }
          } else {
            await supabase
              .from(TABLES.LEADERBOARD)
              .insert([{ username: currentUser.username, score: finalScore, time: finalTime, date: today }]);
          }

          // Check và trao badge_001 nếu đúng 25 câu
          if (finalScore === 25) {
            const { data: existingBadge } = await supabase
              .from(TABLES.USER_BADGES)
              .select('*')
              .eq('username', currentUser.username)
              .eq('badge_id', 'badge_001')
              .single();
            if (!existingBadge) {
              await supabase
                .from(TABLES.USER_BADGES)
                .insert([{
                  username: currentUser.username,
                  badge_id: 'badge_001',
                  achieved_date: new Date().toISOString()
                }]);
            }
          }
        }

        setAnswerResults(nextAnswerResults);
        setScore(finalScore);
        setShowResults(true);
      } else {
        setAnswerResults(nextAnswerResults);
        setScore(nextScore);
        setCurrentQuestionIndex(prev => {
          const nextIndex = prev + 1;
          setCurrentQuestion(questions[nextIndex] || null);
          return nextIndex;
        });
        setUserAnswer('');
      }
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving results:', error);
      setIsSaving(false);
    }
  }, [currentUser, currentQuestion, score, userAnswer, totalTimer, currentQuestionIndex, questions, answerResults]);

  // Update handleNextRef when handleNext changes
  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

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
    let lastQuestion: string | null = null;

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

    // Tạo danh sách câu hỏi ngẫu nhiên
    const allQuestions: Question[] = [];
    
    consonants.forEach(consonant => {
      const options = getOptions(consonant.letter, true);
      const key = `pronunciation-to-letter-${consonant.pronunciationVi}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        allQuestions.push({
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
        allQuestions.push({
          type: 'letter-to-pronunciation',
          question: consonant.letter,
          options,
          correctAnswer: consonant.pronunciationVi
        });
      }
    });

    // Xáo trộn và lọc để tránh lặp lại phiên âm liền kề
    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < shuffledQuestions.length && newQuestions.length < 25; i++) {
      const currentQuestion = shuffledQuestions[i];
      const currentPhonetic = currentQuestion.type === 'pronunciation-to-letter' 
        ? currentQuestion.question 
        : currentQuestion.correctAnswer;

      if (lastQuestion !== currentPhonetic) {
        newQuestions.push(currentQuestion);
        lastQuestion = currentPhonetic;
      } else {
        // Nếu bị trùng, tìm câu hỏi khác không trùng
        const remainingQuestions = shuffledQuestions.slice(i + 1);
        const nextQuestion: Question | undefined = remainingQuestions.find(q => {
          const phonetic = q.type === 'pronunciation-to-letter' ? q.question : q.correctAnswer;
          return phonetic !== currentPhonetic;
        });

        if (nextQuestion) {
          newQuestions.push(nextQuestion);
          lastQuestion = nextQuestion.type === 'pronunciation-to-letter' 
            ? nextQuestion.question 
            : nextQuestion.correctAnswer;
        }
      }
    }

    return newQuestions;
  }, []);

  // Quản lý timer chỉ bằng effect này:
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Không có timer cho câu đầu tiên hoặc khi đã xong
    if (showResults || currentQuestionIndex === 0) {
      setQuestionTimer(null);
      return;
    }

    setQuestionTimer(practiceConfig.questionTimeLimit);
    timerRef.current = setInterval(() => {
      setQuestionTimer(prev => {
        if (prev === 1) {
          handleNextRef.current?.();
          return practiceConfig.questionTimeLimit;
        }
        return (prev ?? practiceConfig.questionTimeLimit) - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, showResults]);

  const handleAnswer = useCallback((answer: string) => {
    if (!currentQuestion) return;
    setUserAnswer(answer);
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions[0]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswerResults([]);
    setShowResults(false);
    setTotalTimer(0);
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
        const query = supabase
          .from(TABLES.LEADERBOARD)
          .select('*')
          .order('score', { ascending: false })
          .order('time', { ascending: true });
        const { data, error }: { data: ScoreRecord[] | null, error: any } = await query;
        if (error) throw error;
        setLeaderboard(data || []);
      } catch (error) {
        console.error('Error loading leaderboard:', error);
      }
    };
    loadLeaderboard();
  }, []);

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

  // Generate questions
  useEffect(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions[0]);
  }, [value, generateQuestions]);

  // Quản lý totalTimer: chỉ đếm khi đang làm bài, dừng ngay khi showResults=true
  useEffect(() => {
    if (currentQuestionIndex >= 1 && !showResults) {
      if (!totalTimerRef.current) {
        totalTimerRef.current = setInterval(() => {
          setTotalTimer(prev => prev + 1);
        }, 1000);
      }
    } else {
      if (totalTimerRef.current) {
        clearInterval(totalTimerRef.current);
        totalTimerRef.current = null;
      }
    }
    return () => {
      if (totalTimerRef.current) {
        clearInterval(totalTimerRef.current);
        totalTimerRef.current = null;
      }
    };
  }, [currentQuestionIndex, showResults]);

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
                  sx={{ ml: 2, color: '#667eea' }}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
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
          {currentQuestionIndex > 0 && !showResults && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HourglassEmptyIcon sx={{ color: '#ff9800', animation: 'swing 1s infinite alternate' }} />
              <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.2rem' } }}>
                {formatTime(totalTimer)}
              </Typography>
            </Box>
          )}
          <Typography variant="h6" color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>
            Câu {currentQuestionIndex + 1}/{questions.length}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            onClick={handleNext}
            disabled={!userAnswer || isSaving}
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
              '&:disabled': {
                background: 'rgba(102, 126, 234, 0.3)',
              },
              minWidth: { xs: 90, sm: 120 }, 
              fontSize: { xs: '0.95rem', sm: '1rem' }, 
              py: { xs: 1, sm: 1.5 } 
            }}
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
      <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.2}
          />
        )}
        <Card sx={{ mb: 3, backgroundColor: '#1a1a1a', borderRadius: { xs: 2, sm: 3 }, boxShadow: { xs: 1, sm: 3 } }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#fff', textAlign: 'center' }}>
              Kết quả
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#4caf50', mb: 1 }}>
                  {score}/25
                </Typography>
                <Typography sx={{ color: '#aaa' }}>Câu đúng</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: '#667eea', mb: 1 }}>
                  {formatTime(totalTimer)}
                </Typography>
                <Typography sx={{ color: '#aaa' }}>Thời gian</Typography>
              </Box>
            </Box>

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
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              }
            }}
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
      <style>{swing}</style>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={(e, v) => setValue(v)} 
          aria-label="practice tabs"
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
          zIndex: 1300,
        }}
        closeAfterTransition
        BackdropProps={{
          sx: { background: 'rgba(30, 34, 60, 0.7)' }
        }}
      >
        <Box>
          <Box
            sx={{
              width: { xs: '95vw', sm: 500 },
              bgcolor: 'transparent',
              borderRadius: { xs: 3, sm: 5 },
              boxShadow: 24,
              p: 0,
              maxHeight: '80vh',
              overflow: 'auto',
              animation: 'fadeInScale 0.4s cubic-bezier(.4,2,.6,1)',
            }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderTopLeftRadius: { xs: 24, sm: 40 },
                borderTopRightRadius: { xs: 24, sm: 40 },
                px: { xs: 3, sm: 5 },
                py: { xs: 2, sm: 3 },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'center',
                boxShadow: '0 4px 24px 0 rgba(102,126,234,0.15)',
              }}
            >
              <EmojiEventsIcon sx={{ color: '#ffd700', fontSize: 32, mr: 1 }} />
              <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 1 }}>
                Bảng xếp hạng
              </Typography>
            </Box>
            <TableContainer component={Paper} sx={{
              bgcolor: 'rgba(30,34,60,0.98)',
              borderBottomLeftRadius: { xs: 24, sm: 40 },
              borderBottomRightRadius: { xs: 24, sm: 40 },
              boxShadow: 'none',
              px: { xs: 1, sm: 3 },
              pt: 2,
              pb: 1,
            }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>Hạng</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>Tên người dùng</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>Điểm</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>Thời gian</TableCell>
                    <TableCell sx={{ color: '#fff', fontWeight: 600, border: 0 }}>Ngày</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboard.map((record, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        background:
                          index === 0 ? 'linear-gradient(90deg,#ffd700 60%,#fffbe6 100%)'
                          : index === 1 ? 'linear-gradient(90deg,#b0c4de 60%,#e6f0ff 100%)'
                          : index === 2 ? 'linear-gradient(90deg,#ffb347 60%,#fff2e6 100%)'
                          : 'transparent',
                        color: index < 3 ? '#222' : '#fff',
                        fontWeight: index < 3 ? 700 : 500,
                        transition: 'background 0.2s',
                        '&:hover': {
                          background: index < 3 ? undefined : 'rgba(102,126,234,0.12)',
                          boxShadow: index < 3 ? undefined : '0 2px 8px 0 rgba(102,126,234,0.10)',
                        },
                      }}
                    >
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', fontWeight: 700, border: 0 }}>{index + 1}</TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>
                        <UserRankInline username={record.username} rank={index + 1} />
                      </TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>{record.score}/25</TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>{formatTime(record.time)}</TableCell>
                      <TableCell sx={{ color: index < 3 ? '#222' : '#fff', border: 0 }}>{record.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Modal>
      <style>{`
      @keyframes fadeInScale {
        0% { opacity: 0; transform: scale(0.85); }
        100% { opacity: 1; transform: scale(1); }
      }
      `}</style>
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

const swing = `@keyframes swing {
  0% { transform: rotate(-15deg); }
  100% { transform: rotate(15deg); }
}`;

export default Practice; 