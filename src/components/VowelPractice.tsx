import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  VolumeUp as VolumeUpIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { LeaderboardModalContext } from '../App';
import { vowelsFull } from '../data/VowelsData';
import { supabase, TABLES } from '../config/supabaseConfig';
import practiceConfig from '../practiceConfig.json';

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
  type: number;
}

const VowelPractice: React.FC = () => {
  const { currentUser } = useAuth();
  const leaderboardModalCtx = React.useContext(LeaderboardModalContext);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerResults, setAnswerResults] = useState<AnswerResult[]>([]);
  const [showResults, setShowResults] = useState(false);
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

  const TYPE_VOWEL = 2; // Nguyên âm
  const type = TYPE_VOWEL;

  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];
    const vowels = vowelsFull;
    const usedKeys = new Set<string>();
    let lastQuestion: string | null = null;

    function getOptions(correct: string, isLetter: boolean) {
      const pool = vowels
        .filter(v => (isLetter ? v.letter : v.pronunciationVi) !== correct)
        .map(v => isLetter ? v.letter : v.pronunciationVi);
      const uniquePool = Array.from(new Set(pool));
      const wrongOptions = uniquePool.sort(() => Math.random() - 0.5).slice(0, practiceConfig.numOptions - 1);
      const insertIdx = Math.floor(Math.random() * practiceConfig.numOptions);
      const options = [...wrongOptions];
      options.splice(insertIdx, 0, correct);
      return options;
    }

    // Tạo danh sách câu hỏi ngẫu nhiên
    const allQuestions: Question[] = [];
    
    vowels.forEach(vowel => {
      const options = getOptions(vowel.letter, true);
      const key = `pronunciation-to-letter-${vowel.pronunciationVi}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        allQuestions.push({
          type: 'pronunciation-to-letter',
          question: vowel.pronunciationVi,
          options,
          correctAnswer: vowel.letter
        });
      }
    });

    vowels.forEach(vowel => {
      const options = getOptions(vowel.pronunciationVi, false);
      const key = `letter-to-pronunciation-${vowel.letter}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        allQuestions.push({
          type: 'letter-to-pronunciation',
          question: vowel.letter,
          options,
          correctAnswer: vowel.pronunciationVi
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
            .eq('type', type)
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
                .update({ score: finalScore, time: finalTime, date: today, type })
                .eq('username', currentUser.username)
                .eq('type', type);
            }
          } else {
            await supabase
              .from(TABLES.LEADERBOARD)
              .insert([{ username: currentUser.username, score: finalScore, time: finalTime, date: today, type }]);
          }

          // Check và trao badge_002 nếu đúng 25 câu
          if (finalScore === 25) {
            const { data: existingBadge } = await supabase
              .from(TABLES.USER_BADGES)
              .select('*')
              .eq('username', currentUser.username)
              .eq('badge_id', 'badge_002')
              .single();
            if (!existingBadge) {
              await supabase
                .from(TABLES.USER_BADGES)
                .insert([{
                  username: currentUser.username,
                  badge_id: 'badge_002',
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
  }, [currentUser, currentQuestion, score, userAnswer, totalTimer, currentQuestionIndex, questions, answerResults, type]);

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

  // Timer tổng thời gian
  useEffect(() => {
    if (totalTimerRef.current) clearInterval(totalTimerRef.current);

    if (showResults || currentQuestionIndex === 0) {
      return;
    }

    totalTimerRef.current = setInterval(() => {
      setTotalTimer(prev => prev + 1);
    }, 1000);

    return () => {
      if (totalTimerRef.current) clearInterval(totalTimerRef.current);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadLeaderboard = useCallback(async () => {
    try {
      const query = supabase
        .from(TABLES.LEADERBOARD)
        .select('*')
        .eq('type', type)
        .order('score', { ascending: false })
        .order('time', { ascending: true });
      const { error }: { data: ScoreRecord[] | null, error: any } = await query;
      if (error) throw error;
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
  }, [type]);

  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

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
  }, [generateQuestions]);

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
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
            <ButtonGroup
              orientation={windowSize.width < 600 ? 'vertical' : 'horizontal'}
              variant="outlined"
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                '& .MuiButtonGroup-grouped': {
                  borderColor: '#444',
                  color: '#fff',
                  backgroundColor: '#2a2a2a',
                  '&:hover': {
                    backgroundColor: '#667eea',
                    borderColor: '#667eea',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#667eea',
                    borderColor: '#667eea',
                    color: '#fff',
                  },
                },
              }}
            >
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  sx={{
                    minWidth: { xs: '100%', sm: 120 },
                    height: { xs: 48, sm: 56 },
                    fontFamily: currentQuestion.type === 'letter-to-pronunciation' 
                      ? 'inherit' 
                      : 'Noto Serif Lao',
                    fontSize: currentQuestion.type === 'letter-to-pronunciation' 
                      ? { xs: '0.9rem', sm: '1rem' } 
                      : { xs: '1.2rem', sm: '1.5rem' },
                    backgroundColor: userAnswer === option ? '#667eea' : '#2a2a2a',
                    borderColor: userAnswer === option ? '#667eea' : '#444',
                    color: userAnswer === option ? '#fff' : '#fff',
                    '&:hover': {
                      backgroundColor: '#667eea',
                      borderColor: '#667eea',
                    },
                  }}
                >
                  {option}
                </Button>
              ))}
            </ButtonGroup>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            Câu {currentQuestionIndex + 1} / {questions.length}
          </Typography>
          <Typography variant="body2" sx={{ color: '#aaa' }}>
            Điểm: {score}
          </Typography>
        </Box>

        {questionTimer !== null && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ color: '#667eea', textAlign: 'center' }}>
              Thời gian: {questionTimer}s
            </Typography>
          </Box>
        )}

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
                background: '#444',
                color: '#666',
              },
            }}
          >
            {isSaving ? 'Đang lưu...' : 'Tiếp theo'}
          </Button>
        </Box>
      </Box>
    );
  };

  const renderResults = () => {
    const correctAnswers = answerResults.filter(result => result.isCorrect);
    const wrongAnswers = answerResults.filter(result => !result.isCorrect);
    const accuracy = (correctAnswers.length / answerResults.length) * 100;

    if (accuracy === 100) {
      triggerConfetti();
    }

    return (
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {showConfetti && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          >
            {/* Confetti animation would go here */}
          </Box>
        )}

        <Card sx={{ mb: 3, backgroundColor: '#1a1a1a', borderRadius: { xs: 2, sm: 3 }, boxShadow: { xs: 1, sm: 3 } }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 2, 
                color: accuracy === 100 ? '#4caf50' : '#ff9800',
                textAlign: 'center',
              }}
            >
              {accuracy === 100 ? '🎉 Hoàn hảo! 🎉' : 'Kết quả'}
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 2, color: '#fff', textAlign: 'center' }}>
              Điểm số: {score}/25
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 2, color: '#aaa', textAlign: 'center' }}>
              Thời gian: {formatTime(totalTimer)}
            </Typography>

            <Typography variant="body1" sx={{ mb: 2, color: '#aaa', textAlign: 'center' }}>
              Độ chính xác: {accuracy.toFixed(1)}%
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
            onClick={() => leaderboardModalCtx?.openLeaderboard()}
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
    <Box sx={{ position: 'relative' }}>
      {showResults ? renderResults() : renderQuestion()}
    </Box>
  );
};

export default VowelPractice; 