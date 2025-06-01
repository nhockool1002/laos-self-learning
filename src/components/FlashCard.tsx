import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import { VolumeUp as VolumeUpIcon, FlipCameraAndroid as FlipIcon } from '@mui/icons-material';

interface FlashCardProps {
  letter: string;
  pronunciationVi: string;
  type: 'consonant' | 'vowel' | 'tone';
}

const FlashCard: React.FC<FlashCardProps> = ({ letter, pronunciationVi, type }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const playSound = () => {
    const utterance = new SpeechSynthesisUtterance(pronunciationVi);
    utterance.lang = 'th-TH';
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        maxWidth: 300,
        height: 200,
        perspective: '1000px',
        cursor: 'pointer',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        backgroundColor: '#1a1a1a',
        margin: '0 auto'
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <CardContent 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s'
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontFamily: 'Noto Serif Lao',
            color: '#fff',
            fontSize: '4rem',
            textAlign: 'center'
          }}
        >
          {letter}
        </Typography>
      </CardContent>

      <CardContent 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backfaceVisibility: 'hidden',
          position: 'absolute',
          width: '100%',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          transition: 'transform 0.6s'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            color: '#e53935',
            textAlign: 'center',
            mb: 2
          }}
        >
          {pronunciationVi}
        </Typography>
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            playSound();
          }}
          sx={{ color: '#2196f3' }}
        >
          <VolumeUpIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default FlashCard; 