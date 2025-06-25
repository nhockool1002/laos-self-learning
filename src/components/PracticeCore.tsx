import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
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
  keyframes,
  CircularProgress,
} from '@mui/material';
import { VolumeUp as VolumeUpIcon, EmojiEvents as EmojiEventsIcon, HourglassEmpty as HourglassEmptyIcon } from '@mui/icons-material';
import ReactConfetti from 'react-confetti';
import practiceConfig from '../practiceConfig.json';
import { useAuth } from '../contexts/AuthContext';
import { supabase, TABLES } from '../config/supabaseConfig';
import { LeaderboardModalContext } from '../App';

interface PracticeWord {
  letter: string;
  pronunciationVi: string;
}

interface PracticeCoreProps {
  data: PracticeWord[];
  type: number; // 1: phụ âm, 2: nguyên âm
  badgeId: string;
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

const rainbowAnimation = keyframes`
  0% { color: #ff0000; }
  17% { color: #ff8000; }
  33% { color: #ffff00; }
  50% { color: #00ff00; }
  67% { color: #0000ff; }
  83% { color: #8000ff; }
  100% { color: #ff0000; }
`;

const swingAnimation = keyframes`
  0% { transform: rotate(-15deg); }
  100% { transform: rotate(15deg); }
`;

const PracticeCore: React.FC<PracticeCoreProps> = ({ data, type, badgeId }) => {
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

  // Sinh câu hỏi
  const generateQuestions = useCallback(() => {
    const newQuestions: Question[] = [];
    const usedKeys = new Set<string>();
    let lastQuestion: string | null = null;

    function getOptions(correct: string, isLetter: boolean) {
      const pool = data
        .filter(item => (isLetter ? item.letter : item.pronunciationVi) !== correct)
        .map(item => isLetter ? item.letter : item.pronunciationVi);
      const uniquePool = Array.from(new Set(pool));
      const wrongOptions = uniquePool.sort(() => Math.random() - 0.5).slice(0, practiceConfig.numOptions - 1);
      const insertIdx = Math.floor(Math.random() * practiceConfig.numOptions);
      const options = [...wrongOptions];
      options.splice(insertIdx, 0, correct);
      return options;
    }

    // Tạo danh sách câu hỏi ngẫu nhiên
    const allQuestions: Question[] = [];
    data.forEach(item => {
      const options = getOptions(item.letter, true);
      const key = `pronunciation-to-letter-${item.pronunciationVi}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        allQuestions.push({
          type: 'pronunciation-to-letter',
          question: item.pronunciationVi,
          options,
          correctAnswer: item.letter
        });
      }
    });
    data.forEach(item => {
      const options = getOptions(item.pronunciationVi, false);
      const key = `letter-to-pronunciation-${item.letter}`;
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        allQuestions.push({
          type: 'letter-to-pronunciation',
          question: item.letter,
          options,
          correctAnswer: item.pronunciationVi
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
  }, [data]);

  // ... Toàn bộ logic giống Practice (timer, handleNext, renderQuestion, renderResults, confetti, ...)

  const handleNext = useCallback(async () => {
    try {
      if (!currentQuestion) return;
      setIsSaving(true);
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
          // Trao badge nếu đạt đủ điểm
          if (finalScore === 25) {
            const { data: existingBadge } = await supabase
              .from(TABLES.USER_BADGES)
              .select('*')
              .eq('username', currentUser.username)
              .eq('badge_id', badgeId)
              .single();
            if (!existingBadge) {
              await supabase
                .from(TABLES.USER_BADGES)
                .insert([{
                  username: currentUser.username,
                  badge_id: badgeId,
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
  }, [currentUser, currentQuestion, score, userAnswer, totalTimer, currentQuestionIndex, questions, answerResults, type, badgeId]);

  useEffect(() => { handleNextRef.current = handleNext; }, [handleNext]);
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
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
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
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQuestionIndex, showResults]);
  useEffect(() => {
    if (totalTimerRef.current) clearInterval(totalTimerRef.current);
    if (showResults || currentQuestionIndex === 0) { return; }
    totalTimerRef.current = setInterval(() => {
      setTotalTimer(prev => prev + 1);
    }, 1000);
    return () => { if (totalTimerRef.current) clearInterval(totalTimerRef.current); };
  }, [currentQuestionIndex, showResults]);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(newQuestions[0]);
  }, [generateQuestions]);

  // --- renderQuestion giống Practice ---
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
              <HourglassEmptyIcon sx={{ 
                color: '#ff9800', 
                animation: `${swingAnimation} 1s infinite alternate` 
              }} />
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

  // --- renderResults giống Practice ---
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

  return (
    <Box sx={{ width: '100%' }}>
      {showResults ? renderResults() : renderQuestion()}
    </Box>
  );
};

export default PracticeCore; 