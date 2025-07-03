import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const SLIDE_EMBED = 'https://docs.google.com/presentation/d/e/2PACX-1vRl7GT8FG9vTED5csGoKQqo0LHB16GUX4E9pYIl63Bb2wszrFMurAa_4nduCMpcpvhlTW0bR9ZMy0OJ/pubembed?start=true&loop=true&delayms=60000';

const PracticeVocab: React.FC = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: '#667eea' }}>
        Luyện từ vựng tiếng Lào
      </Typography>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          borderRadius: 2,
          backgroundColor: 'background.paper'
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '600px',
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <iframe 
            src={SLIDE_EMBED}
            frameBorder="0" 
            width="100%" 
            height="600"
            style={{
              maxWidth: '1200px',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
            allowFullScreen={true} 
            title="Luyện từ vựng tiếng Lào"
          />
        </Box>
      </Paper>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          mt: 2, 
          textAlign: 'center',
          fontStyle: 'italic'
        }}
      >
        Presentation sẽ tự động chuyển slide mỗi 60 giây. Bạn có thể tương tác trực tiếp với slides để luyện tập từ vựng.
      </Typography>
    </Box>
  );
};

export default PracticeVocab; 