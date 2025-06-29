import { useCallback, useEffect, useState } from 'react';
import { progressManager, ProgressData } from '../services/progressManager';

interface UseProgressSaverProps {
  username: string;
  lessonId: string;
  courseId: string;
  onProgressUpdate?: (progress: ProgressData) => void;
}

export const useProgressSaver = ({ 
  username, 
  lessonId, 
  courseId, 
  onProgressUpdate 
}: UseProgressSaverProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const [pendingProgress, setPendingProgress] = useState<ProgressData | null>(null);

  // Cập nhật trạng thái từ ProgressManager
  const updateStatus = useCallback(() => {
    const status = progressManager.getStatus(username, lessonId);
    setLastSaveTime(status.lastSaveTime);
    setPendingProgress(status.pendingProgress);
  }, [username, lessonId]);

  // Lưu tiến độ với logic thông minh
  const saveProgress = useCallback(async (progress: ProgressData, forceSave = false) => {
    // Cập nhật UI ngay lập tức
    if (onProgressUpdate) {
      onProgressUpdate(progress);
    }

    setIsSaving(true);
    try {
      const eventType = forceSave ? 'auto_save' : 'auto_save';
      const success = await progressManager.queueProgress(
        username,
        lessonId,
        courseId,
        progress,
        eventType
      );
      
      updateStatus();
      return success;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [username, lessonId, courseId, onProgressUpdate, updateStatus]);

  // Lưu khi pause video
  const saveOnPause = useCallback(async (progress: ProgressData) => {
    console.log('⏸️ Saving progress on pause...');
    setIsSaving(true);
    try {
      const success = await progressManager.queueProgress(
        username,
        lessonId,
        courseId,
        progress,
        'pause'
      );
      
      updateStatus();
      return success;
    } catch (error) {
      console.error('Error saving progress on pause:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [username, lessonId, courseId, updateStatus]);

  // Lưu khi tắt modal
  const saveOnModalClose = useCallback(async () => {
    if (pendingProgress) {
      console.log('🚪 Saving progress on modal close...');
      setIsSaving(true);
      try {
        const success = await progressManager.queueProgress(
          username,
          lessonId,
          courseId,
          pendingProgress,
          'modal_close'
        );
        
        updateStatus();
        return success;
      } catch (error) {
        console.error('Error saving progress on modal close:', error);
        return false;
      } finally {
        setIsSaving(false);
      }
    }
    return false;
  }, [username, lessonId, courseId, pendingProgress, updateStatus]);

  // Lưu khi video kết thúc
  const saveOnVideoEnd = useCallback(async (progress: ProgressData) => {
    console.log('🎬 Saving progress on video end...');
    setIsSaving(true);
    try {
      const success = await progressManager.queueProgress(
        username,
        lessonId,
        courseId,
        progress,
        'video_end'
      );
      
      updateStatus();
      return success;
    } catch (error) {
      console.error('Error saving progress on video end:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [username, lessonId, courseId, updateStatus]);

  // Cập nhật trạng thái ban đầu
  useEffect(() => {
    updateStatus();
  }, [updateStatus]);

  // Cập nhật trạng thái định kỳ
  useEffect(() => {
    const interval = setInterval(updateStatus, 5000); // Cập nhật mỗi 5 giây
    return () => clearInterval(interval);
  }, [updateStatus]);

  // Lưu khi component unmount
  useEffect(() => {
    return () => {
      if (pendingProgress) {
        console.log('🔚 Saving progress on unmount...');
        progressManager.queueProgress(
          username,
          lessonId,
          courseId,
          pendingProgress,
          'modal_close'
        );
      }
    };
  }, [username, lessonId, courseId, pendingProgress]);

  return {
    saveProgress,
    saveOnPause,
    saveOnModalClose,
    saveOnVideoEnd,
    isSaving,
    lastSaveTime,
    pendingProgress,
    canSave: progressManager.canSave(username, lessonId)
  };
}; 