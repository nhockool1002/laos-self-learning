import { videoCourseService } from './videoCourseService';

export interface ProgressData {
  progress_percentage: number;
  watch_time: number;
  is_completed?: boolean;
}

export interface ProgressEvent {
  type: 'pause' | 'modal_close' | 'video_end' | 'auto_save';
  timestamp: number;
  progress: ProgressData;
}

class ProgressManager {
  private saveQueue: Array<{
    username: string;
    lessonId: string;
    courseId: string;
    progress: ProgressData;
    timestamp: number;
  }> = [];
  
  private isProcessing = false;
  private lastSaveTimes: Map<string, number> = new Map();
  private eventHistory: ProgressEvent[] = [];

  // Tạo key cho việc theo dõi thời gian lưu
  private getSaveKey(username: string, lessonId: string): string {
    return `${username}-${lessonId}`;
  }

  // Kiểm tra xem có thể lưu không (khoảng cách 1 phút)
  canSave(username: string, lessonId: string): boolean {
    const key = this.getSaveKey(username, lessonId);
    const lastSaveTime = this.lastSaveTimes.get(key) || 0;
    const now = Date.now();
    return (now - lastSaveTime) >= 60000; // 1 phút
  }

  // Thêm vào queue để lưu
  async queueProgress(
    username: string,
    lessonId: string,
    courseId: string,
    progress: ProgressData,
    eventType: ProgressEvent['type'] = 'auto_save'
  ): Promise<boolean> {
    // Ghi lại event
    this.eventHistory.push({
      type: eventType,
      timestamp: Date.now(),
      progress
    });

    // Kiểm tra xem có cần lưu ngay không
    if (eventType === 'pause' || eventType === 'modal_close' || eventType === 'video_end') {
      return await this.saveProgressImmediately(username, lessonId, courseId, progress);
    }

    // Kiểm tra khoảng cách thời gian
    if (!this.canSave(username, lessonId)) {
      console.log('⏳ Progress queued, waiting for save interval...');
      this.addToQueue(username, lessonId, courseId, progress);
      return false;
    }

    return await this.saveProgressImmediately(username, lessonId, courseId, progress);
  }

  // Thêm vào queue
  private addToQueue(
    username: string,
    lessonId: string,
    courseId: string,
    progress: ProgressData
  ) {
    // Loại bỏ progress cũ cho cùng lesson
    this.saveQueue = this.saveQueue.filter(
      item => !(item.username === username && item.lessonId === lessonId)
    );

    // Thêm progress mới
    this.saveQueue.push({
      username,
      lessonId,
      courseId,
      progress,
      timestamp: Date.now()
    });
  }

  // Lưu ngay lập tức
  private async saveProgressImmediately(
    username: string,
    lessonId: string,
    courseId: string,
    progress: ProgressData
  ): Promise<boolean> {
    try {
      console.log('💾 Saving progress immediately...');
      const success = await videoCourseService.updateUserProgress(
        username,
        lessonId,
        courseId,
        progress
      );

      if (success) {
        const key = this.getSaveKey(username, lessonId);
        this.lastSaveTimes.set(key, Date.now());
        console.log('✅ Progress saved successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.error('❌ Error saving progress:', error);
      return false;
    }
  }

  // Xử lý queue
  async processQueue(): Promise<void> {
    if (this.isProcessing || this.saveQueue.length === 0) return;

    this.isProcessing = true;
    console.log(`🔄 Processing ${this.saveQueue.length} queued progress items...`);

    try {
      const itemsToProcess = [...this.saveQueue];
      this.saveQueue = [];

      for (const item of itemsToProcess) {
        if (this.canSave(item.username, item.lessonId)) {
          await this.saveProgressImmediately(
            item.username,
            item.lessonId,
            item.courseId,
            item.progress
          );
        } else {
          // Đưa lại vào queue nếu chưa đủ thời gian
          this.addToQueue(item.username, item.lessonId, item.courseId, item.progress);
        }
      }
    } catch (error) {
      console.error('❌ Error processing queue:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  // Lưu tất cả progress đang chờ khi tắt ứng dụng
  async saveAllPending(): Promise<void> {
    if (this.saveQueue.length > 0) {
      console.log(`🚪 Saving ${this.saveQueue.length} pending progress items...`);
      await this.processQueue();
    }
  }

  // Lấy thông tin trạng thái
  getStatus(username: string, lessonId: string) {
    const key = this.getSaveKey(username, lessonId);
    const lastSaveTime = this.lastSaveTimes.get(key) || 0;
    const pendingItem = this.saveQueue.find(
      item => item.username === username && item.lessonId === lessonId
    );

    return {
      lastSaveTime,
      hasPending: !!pendingItem,
      pendingProgress: pendingItem?.progress || null,
      queueLength: this.saveQueue.length
    };
  }

  // Lấy lịch sử events (cho debug)
  getEventHistory(): ProgressEvent[] {
    return [...this.eventHistory];
  }

  // Xóa lịch sử cũ (giữ lại 100 events gần nhất)
  cleanupEventHistory(): void {
    if (this.eventHistory.length > 100) {
      this.eventHistory = this.eventHistory.slice(-100);
    }
  }
}

// Tạo instance singleton
export const progressManager = new ProgressManager();

// Tự động xử lý queue mỗi 30 giây
setInterval(() => {
  progressManager.processQueue();
}, 30000);

// Lưu tất cả khi tắt trang
window.addEventListener('beforeunload', () => {
  progressManager.saveAllPending();
});

// Lưu khi chuyển tab
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    progressManager.saveAllPending();
  }
}); 