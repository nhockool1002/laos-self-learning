import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Skeleton,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  VideoLibrary as VideoIcon,
  AccessTime as TimeIcon,
  Close as CloseIcon,
  PlayCircle as PlayCircleIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  FiberManualRecord as InProgressIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { VideoCourse, VideoLesson, UserProgress, videoCourseService } from '../services/videoCourseService';
import { useAuth } from '../contexts/AuthContext';
import { useProgressSaver } from '../hooks/useProgressSaver';
import { ProgressStatus } from './ProgressStatus';
import { LoginModal } from './LoginModal';

const VideoLessons: React.FC = () => {
  const [courses, setCourses] = useState<VideoCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<VideoCourse | null>(null);
  const [lessons, setLessons] = useState<VideoLesson[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<VideoLesson | null>(null);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<{ [lessonId: string]: UserProgress }>({});
  const [courseProgress, setCourseProgress] = useState<{ [courseId: string]: any }>({});
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      loadCourses();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const loadCourseProgress = useCallback(async (courseId: string) => {
    if (!currentUser) return;

    try {
      const lessonsData = await videoCourseService.getLessonsByCourseId(courseId);
      setLessons(lessonsData);

      // Load progress cho từng bài học
      const progressMap: { [lessonId: string]: UserProgress } = {};
      for (const lesson of lessonsData) {
        const progress = await videoCourseService.getUserProgress(currentUser.username, lesson.id);
        if (progress) {
          progressMap[lesson.id] = progress;
        }
      }
      setUserProgress(progressMap);

      // Load tổng tiến độ khóa học
      const courseProgressData = await videoCourseService.getCourseProgress(currentUser.username, courseId);
      setCourseProgress(prev => ({
        ...prev,
        [courseId]: courseProgressData
      }));
    } catch (err) {
      console.error('Error loading course progress:', err);
    }
  }, [currentUser]);

  useEffect(() => {
    if (selectedCourse && currentUser) {
      loadCourseProgress(selectedCourse.id);
    }
  }, [selectedCourse, currentUser, loadCourseProgress]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const coursesData = await videoCourseService.getAllCourses();
      setCourses(coursesData);
      
      // Khởi tạo dữ liệu mẫu nếu chưa có
      if (coursesData.length === 0) {
        await videoCourseService.initializeSampleData();
        const updatedCourses = await videoCourseService.getAllCourses();
        setCourses(updatedCourses);
      }
    } catch (err) {
      setError('Không thể tải danh sách khóa học');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSelect = async (course: VideoCourse) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
  };

  const handleLessonSelect = (lesson: VideoLesson) => {
    setSelectedLesson(lesson);
    setIsVideoDialogOpen(true);
  };

  // Xử lý đóng modal với lưu tiến độ
  const handleCloseModal = () => {
    setIsVideoDialogOpen(false);
  };

  // Kiểm tra xem bài học có thể học được không
  const canAccessLesson = (lesson: VideoLesson, lessonIndex: number) => {
    if (lessonIndex === 0) return true; // Bài đầu tiên luôn có thể học
    
    // Kiểm tra bài học trước đó đã hoàn thành chưa
    const previousLesson = lessons[lessonIndex - 1];
    if (!previousLesson) return true;
    
    const previousProgress = userProgress[previousLesson.id];
    return previousProgress && previousProgress.is_completed;
  };

  // Chỉ giữ lại cập nhật UI progress nếu muốn (không bắt buộc)
  const handleVideoProgress = useCallback((progressPercentage: number, watchTime: number) => {
    if (!selectedLesson) return;
    setUserProgress(prev => ({
      ...prev,
      [selectedLesson.id]: {
        ...prev[selectedLesson.id],
        progress_percentage: progressPercentage,
        watch_time: watchTime,
      }
    }));
  }, [selectedLesson]);

  // Callback cập nhật tiến độ tổng khoá học khi hoàn thành bài học
  const handleLessonCompleted = useCallback(() => {
    if (selectedCourse && currentUser) {
      loadCourseProgress(selectedCourse.id);
    }
  }, [selectedCourse, currentUser, loadCourseProgress]);

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

  const getLevelText = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'Cơ bản';
      case 'intermediate':
        return 'Trung cấp';
      case 'advanced':
        return 'Nâng cao';
      default:
        return level;
    }
  };

  const getLessonStatusIcon = (lessonId: string) => {
    const progress = userProgress[lessonId];
    if (!progress) {
      return <PlayIcon color="primary" />;
    }
    
    if (progress.is_completed) {
      return <CheckCircleIcon sx={{ color: '#4caf50' }} />;
    } else if (progress.progress_percentage > 0) {
      return <InProgressIcon sx={{ color: '#ff9800' }} />;
    }
    
    return <PlayIcon color="primary" />;
  };

  // Hàm getLessonStatusText đã bị xóa vì không được sử dụng

  // Hiển thị Alert yêu cầu đăng nhập nếu chưa đăng nhập
  if (!currentUser) {
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
          Bài học qua video
        </Typography>

        <Card 
          sx={{ 
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
            boxShadow: theme.palette.mode === 'dark' 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box sx={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                mb: 3,
                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)'
              }}>
                <VideoIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                🔐 Yêu cầu đăng nhập
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                Tính năng "Bài học qua video" chỉ dành cho người dùng đã đăng nhập. 
                Vui lòng đăng nhập để truy cập các khóa học video và theo dõi tiến độ học tập của bạn.
              </Typography>
            </Box>

            <Alert 
              severity="info" 
              sx={{ 
                mb: 4, 
                maxWidth: 600, 
                mx: 'auto',
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: '100%'
                }
              }}
              icon={<LoginIcon sx={{ fontSize: 24 }} />}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'info.main' }}>
                Lợi ích khi đăng nhập:
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50', mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Xem video bài học
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50', mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Theo dõi tiến độ học tập
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50', mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Lưu lịch sử học tập
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CheckCircleIcon sx={{ color: '#4caf50', mr: 1.5, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Đánh dấu bài học hoàn thành
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Alert>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                    boxShadow: '0 6px 25px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setIsLoginModalOpen(true)}
              >
                Đăng nhập ngay
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                Chưa có tài khoản? Bạn có thể đăng ký miễn phí trong modal đăng nhập
              </Typography>
            </Box>
          </CardContent>
        </Card>
        
        <LoginModal
          open={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bài học qua video
        </Typography>
        <Grid container spacing={3}>
          {[1, 2].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={32} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="80%" height={20} />
                  <Box sx={{ mt: 2 }}>
                    <Skeleton variant="rectangular" width="100%" height={120} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="contained" onClick={loadCourses}>
          Thử lại
        </Button>
      </Box>
    );
  }

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
        Bài học qua video
      </Typography>

      <Grid container spacing={3}>
        {/* Danh sách khóa học */}
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: 'fit-content',
              background: theme.palette.mode === 'dark' 
                ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
                : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
              boxShadow: theme.palette.mode === 'dark' 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                <VideoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Danh sách khóa học
              </Typography>
              
              {courses.map((course) => {
                const progress = courseProgress[course.id];
                return (
                  <Card
                    key={course.id}
                    sx={{
                      mb: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: selectedCourse?.id === course.id
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.02)',
                      border: selectedCourse?.id === course.id
                        ? '2px solid #667eea'
                        : `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`,
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                      }
                    }}
                    onClick={() => handleCourseSelect(course)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <SchoolIcon 
                          sx={{ 
                            mr: 1, 
                            color: selectedCourse?.id === course.id ? 'white' : '#667eea' 
                          }} 
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            color: selectedCourse?.id === course.id ? 'white' : 'text.primary'
                          }}
                        >
                          {course.title}
                        </Typography>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          mb: 1,
                          color: selectedCourse?.id === course.id ? 'rgba(255,255,255,0.8)' : 'text.secondary'
                        }}
                      >
                        {course.description}
                      </Typography>
                      
                      {/* Progress bar cho khóa học */}
                      {currentUser && progress && (
                        <Box sx={{ mb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: selectedCourse?.id === course.id ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                                fontSize: '0.75rem'
                              }}
                            >
                              Tiến độ: {Math.round(progress.progressPercentage)}%
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: selectedCourse?.id === course.id ? 'rgba(255,255,255,0.8)' : 'text.secondary',
                                fontSize: '0.75rem'
                              }}
                            >
                              {progress.completedLessons}/{progress.totalLessons} bài học
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={progress.progressPercentage}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: selectedCourse?.id === course.id ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: selectedCourse?.id === course.id ? 'white' : '#667eea',
                              }
                            }}
                          />
                        </Box>
                      )}
                      
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={getLevelText(course.level)}
                          size="small"
                          sx={{
                            backgroundColor: getLevelColor(course.level),
                            color: 'white',
                            fontWeight: 500
                          }}
                        />
                        <Chip
                          label={course.category}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: selectedCourse?.id === course.id ? 'white' : '#667eea',
                            color: selectedCourse?.id === course.id ? 'white' : '#667eea'
                          }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        {/* Chi tiết khóa học và bài học */}
        <Grid item xs={12} md={8}>
          {selectedCourse ? (
            <Card 
              sx={{ 
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`
              }}
            >
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  {selectedCourse.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  color="text.secondary" 
                  paragraph
                  sx={{ mb: 3 }}
                >
                  {selectedCourse.description}
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  <PlayCircleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Danh sách bài học
                </Typography>

                {/* Thanh tiến độ tổng khoá học */}
                {selectedCourse && courseProgress[selectedCourse.id] && (
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        Tiến độ khoá học: {Math.round(courseProgress[selectedCourse.id].progressPercentage)}%
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                        {courseProgress[selectedCourse.id].completedLessons}/{courseProgress[selectedCourse.id].totalLessons} bài học
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={courseProgress[selectedCourse.id].progressPercentage}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#667eea',
                        }
                      }}
                    />
                  </Box>
                )}

                {lessons.length > 0 ? (
                  <List>
                    {lessons.map((lesson, index) => {
                      const progress = userProgress[lesson.id];
                      const isLastWatched = courseProgress[selectedCourse.id]?.lastWatchedLesson === lesson.id;
                      const canAccess = canAccessLesson(lesson, index);
                      
                      return (
                        <React.Fragment key={lesson.id}>
                          <ListItem
                            button
                            onClick={() => canAccess ? handleLessonSelect(lesson) : null}
                            disabled={!canAccess}
                            sx={{
                              borderRadius: 2,
                              mb: 1,
                              transition: 'all 0.3s ease',
                              background: theme.palette.mode === 'dark' 
                                ? 'rgba(255, 255, 255, 0.05)'
                                : 'rgba(0, 0, 0, 0.02)',
                              border: isLastWatched ? '2px solid #ff9800' : '1px solid transparent',
                              opacity: canAccess ? 1 : 0.6,
                              filter: canAccess ? 'none' : 'grayscale(50%)',
                              '&:hover': canAccess ? {
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                transform: 'translateX(4px)',
                                '& .MuiListItemIcon-root': {
                                  color: 'white'
                                },
                                '& .MuiListItemText-primary': {
                                  color: 'white'
                                },
                                '& .MuiListItemText-secondary': {
                                  color: 'rgba(255,255,255,0.8)'
                                }
                              } : {},
                              '&.Mui-disabled': {
                                opacity: 0.6,
                                filter: 'grayscale(50%)'
                              }
                            }}
                          >
                            <ListItemIcon>
                              {canAccess ? getLessonStatusIcon(lesson.id) : <LockIcon sx={{ color: 'text.disabled' }} />}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography 
                                    variant="subtitle1" 
                                    sx={{ 
                                      fontWeight: 500,
                                      color: canAccess ? 'text.primary' : 'text.disabled'
                                    }}
                                  >
                                    {lesson.title}
                                  </Typography>
                                  {isLastWatched && canAccess && (
                                    <Chip
                                      label="Tiếp tục"
                                      size="small"
                                      sx={{
                                        backgroundColor: '#ff9800',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        height: 20
                                      }}
                                    />
                                  )}
                                  {!canAccess && (
                                    <Chip
                                      label="Khóa"
                                      size="small"
                                      sx={{
                                        backgroundColor: 'text.disabled',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        height: 20
                                      }}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box>
                                  <Typography 
                                    variant="body2" 
                                    color={canAccess ? 'text.secondary' : 'text.disabled'}
                                  >
                                    {lesson.description}
                                  </Typography>
                                  {/* Thanh tiến độ từng bài học */}
                                  {progress && (
                                    <Box sx={{ mt: 1, mb: 0.5 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.2 }}>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                          Tiến độ: {Math.round(progress.progress_percentage)}%
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                                          {progress.is_completed ? 'Đã hoàn thành' : ''}
                                        </Typography>
                                      </Box>
                                      <LinearProgress
                                        variant="determinate"
                                        value={progress.progress_percentage}
                                        sx={{
                                          height: 4,
                                          borderRadius: 2,
                                          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                                          '& .MuiLinearProgress-bar': {
                                            backgroundColor: progress.is_completed ? '#4caf50' : '#ff9800',
                                          }
                                        }}
                                      />
                                    </Box>
                                  )}
                                  {!canAccess && (
                                    <Typography 
                                      variant="caption" 
                                      color="warning.main" 
                                      sx={{ display: 'block', mt: 0.5, fontWeight: 500 }}
                                    >
                                      Hoàn thành bài học trước để mở khóa
                                    </Typography>
                                  )}
                                </Box>
                              }
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {lesson.duration && (
                                <Chip
                                  icon={<TimeIcon />}
                                  label={`${Math.floor(lesson.duration / 60)}:${(lesson.duration % 60).toString().padStart(2, '0')}`}
                                  size="small"
                                  variant="outlined"
                                  sx={{
                                    opacity: canAccess ? 1 : 0.6
                                  }}
                                />
                              )}
                            </Box>
                          </ListItem>
                          {index < lessons.length - 1 && <Divider />}
                        </React.Fragment>
                      );
                    })}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <VideoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Chưa có bài học nào trong khóa học này
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card 
              sx={{ 
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`
              }}
            >
              <CardContent>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <VideoIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Vui lòng chọn một khóa học để xem chi tiết
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Dialog xem video */}
      <Dialog
        open={isVideoDialogOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {selectedLesson?.title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedLesson && (
            <Box sx={{ width: '100%' }}>
              <VideoPlayer
                videoPath={selectedLesson.video_path}
                onProgress={handleVideoProgress}
                lessonId={selectedLesson.id}
                userProgress={userProgress[selectedLesson.id]}
                courseId={selectedCourse?.id || ''}
                username={currentUser?.username || ''}
                onLessonCompleted={handleLessonCompleted}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedLesson.description}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Component VideoPlayer để theo dõi tiến độ (HTML5 thuần)
interface VideoPlayerProps {
  videoPath: string;
  onProgress: (progressPercentage: number, watchTime: number) => void;
  lessonId: string;
  userProgress?: UserProgress;
  courseId: string;
  username: string;
  onLessonCompleted?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoPath, 
  onProgress, 
  lessonId, 
  userProgress, 
  courseId, 
  username, 
  onLessonCompleted 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [hasResumed, setHasResumed] = useState(false);
  const [progressInfo, setProgressInfo] = useState<string>('');
  const [currentProgress, setCurrentProgress] = useState(0);
  const [watchTime, setWatchTime] = useState(0);

  // Sử dụng hook progress saver
  const { saveOnPause, saveOnModalClose, saveOnVideoEnd, isSaving, lastSaveTime, pendingProgress } = useProgressSaver({
    username,
    lessonId,
    courseId,
    onProgressUpdate: (progress) => {
      // Cập nhật UI progress
      setCurrentProgress(progress.progress_percentage);
      setWatchTime(progress.watch_time);
      if (onProgress) {
        onProgress(progress.progress_percentage, progress.watch_time);
      }
    }
  });

  // Resume từ vị trí đã xem trước đó (chỉ 1 lần)
  useEffect(() => {
    setHasResumed(false);
  }, [videoPath, lessonId]);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      if (
        userProgress &&
        userProgress.watch_time > 0 &&
        !hasResumed &&
        Math.abs(videoRef.current.currentTime - userProgress.watch_time) > 2
      ) {
        videoRef.current.currentTime = userProgress.watch_time;
        setWatchTime(userProgress.watch_time);
        setHasResumed(true);
        setProgressInfo('🔄 Đã khôi phục vị trí xem trước đó');
        setTimeout(() => setProgressInfo(''), 3000);
      }
    }
  };

  // Tính toán tiến độ
  const calculateProgress = useCallback((isEnded = false) => {
    if (!videoRef.current) return { progress_percentage: 0, watch_time: 0, is_completed: false };
    
    const time = videoRef.current.currentTime;
    const dur = videoRef.current.duration || duration;
    const progressPercentage = dur > 0 ? (time / dur) * 100 : 0;
    const watchTime = Math.floor(time);
    const isCompleted = isEnded || progressPercentage >= 90; // Hoàn thành khi xem 90% trở lên
    
    return {
      progress_percentage: isEnded ? 100 : progressPercentage,
      watch_time: isEnded ? Math.floor(dur) : watchTime,
      is_completed: isCompleted
    };
  }, [duration]);

  // Event handlers
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    
    // Chỉ cập nhật UI, không lưu database
    const progress = calculateProgress();
    setCurrentProgress(progress.progress_percentage);
    setWatchTime(progress.watch_time);
    if (onProgress) {
      onProgress(progress.progress_percentage, progress.watch_time);
    }
  };

  const handlePause = async () => {
    const progress = calculateProgress();
    await saveOnPause(progress);
    setProgressInfo('💾 Đã lưu tiến độ');
    setTimeout(() => setProgressInfo(''), 2000);
  };

  const handlePlay = () => {
    setProgressInfo('');
  };

  const handleEnded = async () => {
    const progress = calculateProgress(true);
    await saveOnVideoEnd(progress);
    setProgressInfo('🎉 Hoàn thành bài học!');
    if (onLessonCompleted) onLessonCompleted();
  };

  // Lưu khi component unmount
  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (videoEl) {
        saveOnModalClose();
      }
    };
  }, [saveOnModalClose]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ position: 'relative', width: '100%', borderRadius: 2, overflow: 'hidden', bgcolor: 'black' }}>
        <video
          ref={videoRef}
          src={videoPath}
          width="100%"
          style={{ width: '100%', aspectRatio: '16/9', borderRadius: 8 }}
          controls
          onTimeUpdate={handleTimeUpdate}
          onPause={handlePause}
          onPlay={handlePlay}
          onEnded={handleEnded}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </Box>
      
      {/* Progress status */}
      {progressInfo && (
        <Box sx={{ 
          mt: 1, 
          p: 1, 
          bgcolor: 'rgba(76, 175, 80, 0.1)', 
          borderRadius: 1, 
          border: '1px solid rgba(76, 175, 80, 0.3)',
          textAlign: 'center'
        }}>
          <Typography variant="caption" color="success.main" sx={{ fontWeight: 500 }}>
            {progressInfo}
          </Typography>
        </Box>
      )}

      {/* Progress Status Component */}
      <ProgressStatus
        isSaving={isSaving}
        lastSaveTime={lastSaveTime}
        pendingProgress={pendingProgress}
        currentProgress={currentProgress}
        watchTime={watchTime}
        duration={duration}
      />

      {/* Video controls info */}
      <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(102, 126, 234, 0.05)', borderRadius: 2, border: '1px solid rgba(102, 126, 234, 0.1)' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
          💡 Mẹo học tập:
        </Typography>
        <Typography variant="caption" color="text.secondary">
          • Tiến độ học tập sẽ được tự động lưu khi bạn tạm dừng video
          • Bạn có thể tiếp tục từ vị trí đã dừng khi quay lại
          • Video sẽ được đánh dấu hoàn thành khi xem 90% trở lên
          • Tiến độ được lưu tối đa 1 lần mỗi phút để tối ưu hiệu suất
        </Typography>
      </Box>
    </Box>
  );
};

export default VideoLessons; 