import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Refresh as RefreshIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { progressManager, ProgressEvent } from '../services/progressManager';

export const ProgressAnalytics: React.FC = () => {
  const [eventHistory, setEventHistory] = useState<ProgressEvent[]>([]);
  const [expanded, setExpanded] = useState(false);

  const loadEventHistory = () => {
    setEventHistory(progressManager.getEventHistory());
  };

  useEffect(() => {
    loadEventHistory();
    const interval = setInterval(loadEventHistory, 5000);
    return () => clearInterval(interval);
  }, []);

  const clearHistory = () => {
    progressManager.cleanupEventHistory();
    loadEventHistory();
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'pause': return '#2196f3';
      case 'modal_close': return '#ff9800';
      case 'video_end': return '#4caf50';
      case 'auto_save': return '#9c27b0';
      default: return '#757575';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'pause': return 'Tạm dừng';
      case 'modal_close': return 'Đóng modal';
      case 'video_end': return 'Kết thúc video';
      case 'auto_save': return 'Tự động lưu';
      default: return type;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN');
  };

  const getStats = () => {
    const total = eventHistory.length;
    const byType = eventHistory.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recent = eventHistory.slice(-10);
    const avgProgress = recent.length > 0 
      ? recent.reduce((sum, event) => sum + event.progress.progress_percentage, 0) / recent.length
      : 0;

    return { total, byType, recent, avgProgress };
  };

  const stats = getStats();

  return (
    <Accordion 
      expanded={expanded} 
      onChange={() => setExpanded(!expanded)}
      sx={{ mt: 2 }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="body2" color="warning.main" sx={{ fontWeight: 500 }}>
          📊 Progress Analytics (Development)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Button
              size="small"
              startIcon={<RefreshIcon />}
              onClick={loadEventHistory}
              variant="outlined"
            >
              Làm mới
            </Button>
            <Button
              size="small"
              startIcon={<ClearIcon />}
              onClick={clearHistory}
              variant="outlined"
              color="error"
            >
              Xóa lịch sử
            </Button>
          </Box>

          {/* Thống kê tổng quan */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={`Tổng: ${stats.total} events`} 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              label={`TB tiến độ: ${Math.round(stats.avgProgress)}%`} 
              color="secondary" 
              variant="outlined"
            />
            {Object.entries(stats.byType).map(([type, count]) => (
              <Chip
                key={type}
                label={`${getEventTypeText(type)}: ${count}`}
                sx={{ 
                  bgcolor: `${getEventTypeColor(type)}20`,
                  color: getEventTypeColor(type),
                  borderColor: getEventTypeColor(type)
                }}
                variant="outlined"
              />
            ))}
          </Box>

          {/* Bảng lịch sử events */}
          <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Loại</TableCell>
                  <TableCell>Tiến độ</TableCell>
                  <TableCell>Thời gian xem</TableCell>
                  <TableCell>Hoàn thành</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.recent.reverse().map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="caption">
                        {formatTime(event.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getEventTypeText(event.type)}
                        size="small"
                        sx={{ 
                          bgcolor: `${getEventTypeColor(event.type)}20`,
                          color: getEventTypeColor(event.type),
                          fontSize: '0.7rem'
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {Math.round(event.progress.progress_percentage)}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="caption">
                        {Math.floor(event.progress.watch_time / 60)}:
                        {(event.progress.watch_time % 60).toString().padStart(2, '0')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={event.progress.is_completed ? 'Có' : 'Không'}
                        size="small"
                        color={event.progress.is_completed ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}; 