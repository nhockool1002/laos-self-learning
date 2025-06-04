import React from 'react';
import { Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  School as SchoolIcon,
  Book as BookIcon,
  Mic as MicIcon,
  Assignment as AssignmentIcon,
  Games as GamesIcon,
} from '@mui/icons-material';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Bảng chữ cái',
      description: 'Học cách đọc và viết bảng chữ cái tiếng Lào',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      path: '/alphabet',
    },
    {
      title: 'Bài học',
      description: 'Các bài học theo chủ đề từ cơ bản đến nâng cao',
      icon: <BookIcon sx={{ fontSize: 40 }} />,
      path: '/lessons',
    },
    {
      title: 'Luyện tập',
      description: 'Thực hành giao tiếp và phát âm',
      icon: <MicIcon sx={{ fontSize: 40 }} />,
      path: '/practice',
    },
    {
      title: 'Kiểm tra',
      description: 'Đánh giá kiến thức qua các bài kiểm tra',
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      path: '/tests',
    },
    {
      title: 'Trò chơi',
      description: 'Học tiếng Lào thông qua các trò chơi tương tác',
      icon: <GamesIcon sx={{ fontSize: 40 }} />,
      path: '/game',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          Học Tiếng Lào với Nhựt
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Học tiếng Lào một cách dễ dàng và hiệu quả thông qua các bài học
          tương tác, bài tập thực hành và kiểm tra kiến thức.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature) => (
          <Grid item key={feature.title} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                bgcolor: feature.title === 'Bảng chữ cái' ? '#E3F2FD' :
                         feature.title === 'Bài học' ? '#E8F5E9' :
                         feature.title === 'Luyện tập' ? '#FFF3E0' :
                         feature.title === 'Kiểm tra' ? '#FCE4EC' :
                         '#F3E5F5',
                '&:hover': {
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease-in-out',
                  boxShadow: 3,
                },
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: feature.title === 'Bảng chữ cái' ? '#1976D2' :
                                        feature.title === 'Bài học' ? '#2E7D32' :
                                        feature.title === 'Luyện tập' ? '#ED6C02' :
                                        feature.title === 'Kiểm tra' ? '#C2185B' :
                                        '#7B1FA2' }}>{feature.icon}</Box>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h2"
                  sx={{
                    color: feature.title === 'Bảng chữ cái' ? '#1565C0' :
                           feature.title === 'Bài học' ? '#1B5E20' :
                           feature.title === 'Luyện tập' ? '#E65100' :
                           feature.title === 'Kiểm tra' ? '#AD1457' :
                           '#6A1B9A',
                    fontWeight: 'bold'
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  sx={{
                    color: feature.title === 'Bảng chữ cái' ? '#0D47A1' :
                           feature.title === 'Bài học' ? '#1B5E20' :
                           feature.title === 'Luyện tập' ? '#BF360C' :
                           feature.title === 'Kiểm tra' ? '#880E4F' :
                           '#4A148C',
                    opacity: 0.8
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 