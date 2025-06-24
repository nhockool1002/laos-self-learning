import React from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  useTheme,
  Container,
  Button,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School as SchoolIcon,
  Book as BookIcon,
  Mic as MicIcon,
  Assignment as AssignmentIcon,
  SportsEsports as GamesIcon,
  Draw as DrawIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useTranslation } from '../hooks/useI18n';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useTranslation();

  const features = [
    {
      key: 'alphabet',
      icon: <SchoolIcon sx={{ fontSize: 32 }} />,
      path: '/alphabet',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      key: 'lessons',
      icon: <BookIcon sx={{ fontSize: 32 }} />,
      path: '/lessons',
      color: '#764ba2',
      gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    },
    {
      key: 'practice',
      icon: <MicIcon sx={{ fontSize: 32 }} />,
      path: '/practice',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      key: 'tests',
      icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
      path: '/tests',
      color: '#764ba2',
      gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    },
    {
      key: 'game',
      icon: <GamesIcon sx={{ fontSize: 32 }} />,
      path: '/game',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      key: 'writing_board',
      icon: <DrawIcon sx={{ fontSize: 32 }} />,
      path: '/writing-board',
      color: '#764ba2',
      gradient: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
    },
    {
      key: 'paper_practice',
      icon: <EditIcon sx={{ fontSize: 32 }} />,
      path: '/paper-practice',
      color: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
            : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          pt: { xs: 2, md: 4 },
          pb: { xs: 3, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)'
              : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {/* Logo */}
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(102, 126, 234, 0.4)'
                  : '0 8px 32px rgba(102, 126, 234, 0.3)',
              }}
            >
              <img
                src="/laos.png"
                alt="Laos Flag"
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Main Title */}
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.8rem' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              {t('home.main_title', 'Học Tiếng Lào với Nhựt')}
            </Typography>

            {/* Description */}
            <Typography 
              variant="h6" 
              sx={{
                color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.secondary',
                maxWidth: '700px',
                margin: '0 auto',
                mb: 3,
                lineHeight: 1.5,
                fontSize: { xs: '1rem', md: '1.1rem' },
                opacity: theme.palette.mode === 'dark' ? 0.9 : 0.8,
              }}
            >
              {t('home.description', 'Học tiếng Lào một cách dễ dàng và hiệu quả thông qua các bài học tương tác, bài tập thực hành và kiểm tra kiến thức.')}
            </Typography>

            {/* Stats */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Chip
                  icon={<TrendingUpIcon />}
                  label="7 Chủ đề"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 12px rgba(102, 126, 234, 0.4)'
                      : '0 4px 12px rgba(102, 126, 234, 0.3)',
                  }}
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Chip
                  icon={<StarIcon />}
                  label="Tương tác"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 12px rgba(118, 75, 162, 0.4)'
                      : '0 4px 12px rgba(118, 75, 162, 0.3)',
                  }}
                />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Chip
                  icon={<PlayArrowIcon />}
                  label="Thực hành"
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 4px 12px rgba(102, 126, 234, 0.4)'
                      : '0 4px 12px rgba(102, 126, 234, 0.3)',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            mb: 4,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {t('common.features', 'Tính năng chính')}
        </Typography>

        <Grid container spacing={2.5}>
          {features.map((feature, index) => (
            <Grid item key={feature.key} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.1)' 
                    : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: '12px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: feature.gradient,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: 0,
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 12px 24px rgba(102, 126, 234, 0.25)'
                      : '0 12px 24px rgba(102, 126, 234, 0.15)',
                    borderColor: 'transparent',
                    '&::before': {
                      opacity: theme.palette.mode === 'dark' ? 0.08 : 0.05,
                    },
                    '& .feature-icon': {
                      transform: 'scale(1.05) rotate(3deg)',
                    },
                    '& .feature-title': {
                      background: feature.gradient,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    },
                  },
                }}
                onClick={() => navigate(feature.path)}
              >
                <CardContent 
                  sx={{ 
                    p: 2.5, 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="feature-icon"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: feature.gradient,
                      mb: 1.5,
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: theme.palette.mode === 'dark'
                        ? '0 6px 16px rgba(102, 126, 234, 0.3)'
                        : '0 6px 16px rgba(102, 126, 234, 0.2)',
                    }}
                  >
                    <Box sx={{ color: 'white' }}>
                      {React.cloneElement(feature.icon, { sx: { fontSize: 24 } })}
                    </Box>
                  </Box>

                  {/* Title */}
                  <Typography
                    className="feature-title"
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      fontSize: '1rem',
                      color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {t(`home.features.${feature.key}.title`, 'Tính năng')}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.mode === 'dark' ? 'text.secondary' : 'text.secondary',
                      lineHeight: 1.5,
                      flex: 1,
                      fontSize: '0.875rem',
                      opacity: theme.palette.mode === 'dark' ? 0.8 : 0.7,
                    }}
                  >
                    {t(`home.features.${feature.key}.description`, 'Mô tả tính năng')}
                  </Typography>

                  {/* Action Button */}
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      mt: 1.5,
                      alignSelf: 'flex-start',
                      color: feature.color,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.8rem',
                      p: 0,
                      minWidth: 'auto',
                      '&:hover': {
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(102, 126, 234, 0.15)'
                          : 'rgba(102, 126, 234, 0.1)',
                      },
                    }}
                  >
                    {t('common.explore', 'Khám phá')} →
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 