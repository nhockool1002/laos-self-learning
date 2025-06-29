import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import {
  Save as SaveIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

interface ProgressStatusProps {
  isSaving: boolean;
  lastSaveTime: number;
  pendingProgress: any;
  currentProgress: number;
  watchTime: number;
  duration: number;
}

export const ProgressStatus: React.FC<ProgressStatusProps> = ({
  isSaving,
  lastSaveTime,
  pendingProgress,
  currentProgress,
  watchTime,
  duration
}) => {
  const getTimeSinceLastSave = () => {
    if (lastSaveTime === 0) return 'Chưa lưu';
    const now = Date.now();
    const diff = now - lastSaveTime;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes} phút ${seconds} giây trước`;
    }
    return `${seconds} giây trước`;
  };

  const getProgressStatus = () => {
    if (isSaving) {
      return {
        icon: <SaveIcon sx={{ fontSize: 16, color: '#2196f3' }} />,
        text: 'Đang lưu...',
        color: '#2196f3',
        bgColor: 'rgba(33, 150, 243, 0.1)'
      };
    }
    
    if (pendingProgress && lastSaveTime > 0) {
      return {
        icon: <ScheduleIcon sx={{ fontSize: 16, color: '#ff9800' }} />,
        text: 'Chờ lưu',
        color: '#ff9800',
        bgColor: 'rgba(255, 152, 0, 0.1)'
      };
    }
    
    if (lastSaveTime > 0) {
      return {
        icon: <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />,
        text: 'Đã lưu',
        color: '#4caf50',
        bgColor: 'rgba(76, 175, 80, 0.1)'
      };
    }
    
    return {
      icon: <ErrorIcon sx={{ fontSize: 16, color: '#f44336' }} />,
      text: 'Chưa lưu',
      color: '#f44336',
      bgColor: 'rgba(244, 67, 54, 0.1)'
    };
  };

  const status = getProgressStatus();

  return (
    <Box sx={{ 
      mt: 1, 
      p: 1.5, 
      bgcolor: status.bgColor, 
      borderRadius: 1.5, 
      border: `1px solid ${status.color}40`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 1
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {status.icon}
        <Typography variant="caption" sx={{ color: status.color, fontWeight: 500 }}>
          {status.text}
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Thời gian xem hiện tại">
          <Chip
            icon={<TimeIcon sx={{ fontSize: 14 }} />}
            label={`${Math.floor(watchTime / 60)}:${(watchTime % 60).toString().padStart(2, '0')}`}
            size="small"
            variant="outlined"
            sx={{ 
              fontSize: '0.7rem',
              height: 24,
              '& .MuiChip-label': { px: 1 }
            }}
          />
        </Tooltip>
        
        <Tooltip title="Tiến độ xem">
          <Chip
            label={`${Math.round(currentProgress)}%`}
            size="small"
            variant="outlined"
            sx={{ 
              fontSize: '0.7rem',
              height: 24,
              '& .MuiChip-label': { px: 1 }
            }}
          />
        </Tooltip>
      </Box>
      
      {lastSaveTime > 0 && (
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
          Lưu cuối: {getTimeSinceLastSave()}
        </Typography>
      )}
    </Box>
  );
}; 