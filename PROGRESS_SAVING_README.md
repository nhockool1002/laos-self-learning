# Chức Năng Lưu Tiến Độ Học Tập

## Tổng Quan

Hệ thống lưu tiến độ học tập được thiết kế để tự động lưu tiến độ xem video của người dùng một cách thông minh, đảm bảo hiệu suất và trải nghiệm người dùng tốt nhất.

## Các Điều Kiện Lưu Tiến Độ

### 1. Lưu Khi Pause Video
- **Kích hoạt**: Khi người dùng nhấn nút pause trên video player
- **Hành động**: Lưu ngay lập tức tiến độ hiện tại
- **Thông báo**: Hiển thị "💾 Đã lưu tiến độ"

### 2. Lưu Khi Tắt Modal
- **Kích hoạt**: Khi người dùng đóng modal video
- **Hành động**: Lưu tiến độ cuối cùng trước khi đóng
- **Đảm bảo**: Không mất dữ liệu khi người dùng thoát

### 3. Khoảng Cách 1 Phút
- **Quy tắc**: Chỉ lưu tối đa 1 lần mỗi phút để tối ưu hiệu suất
- **Logic**: Nếu có thay đổi tiến độ trong vòng 1 phút, sẽ được queue lại
- **Xử lý**: Tự động xử lý queue mỗi 30 giây

## Kiến Trúc Hệ Thống

### 1. ProgressManager (Singleton)
```typescript
// src/services/progressManager.ts
- Quản lý queue lưu tiến độ
- Theo dõi thời gian lưu cuối
- Xử lý batch saving
- Ghi lại lịch sử events
```

### 2. useProgressSaver Hook
```typescript
// src/hooks/useProgressSaver.ts
- Hook React để quản lý trạng thái lưu
- Cung cấp các function lưu theo từng sự kiện
- Cập nhật UI real-time
```

### 3. ProgressStatus Component
```typescript
// src/components/ProgressStatus.tsx
- Hiển thị trạng thái lưu tiến độ
- Thông tin thời gian xem và tiến độ
- Icon trực quan cho từng trạng thái
```

### 4. ProgressAnalytics Component
```typescript
// src/components/ProgressAnalytics.tsx
- Thống kê chi tiết về việc lưu tiến độ
- Lịch sử các sự kiện lưu
- Chỉ hiển thị trong development mode
```

## Các Sự Kiện Lưu Tiến Độ

### 1. Pause Event
- **Type**: `'pause'`
- **Mô tả**: Người dùng tạm dừng video
- **Ưu tiên**: Cao - lưu ngay lập tức

### 2. Modal Close Event
- **Type**: `'modal_close'`
- **Mô tả**: Đóng modal video
- **Ưu tiên**: Cao - lưu ngay lập tức

### 3. Video End Event
- **Type**: `'video_end'`
- **Mô tả**: Video kết thúc
- **Ưu tiên**: Cao - lưu ngay lập tức

### 4. Auto Save Event
- **Type**: `'auto_save'`
- **Mô tả**: Lưu tự động theo khoảng thời gian
- **Ưu tiên**: Thấp - tuân theo quy tắc 1 phút

## Tính Năng Nâng Cao

### 1. Queue Management
- Tự động quản lý queue lưu tiến độ
- Loại bỏ duplicate entries
- Xử lý batch để tối ưu hiệu suất

### 2. Retry Logic
- Tự động thử lại khi lưu thất bại
- Queue lại các progress chưa lưu thành công

### 3. Analytics & Debugging
- Ghi lại tất cả events lưu tiến độ
- Thống kê chi tiết trong development mode
- Theo dõi hiệu suất hệ thống

### 4. Auto-Save on Page Unload
- Tự động lưu khi người dùng tắt trang
- Lưu khi chuyển tab (visibility change)
- Đảm bảo không mất dữ liệu

## Cách Sử Dụng

### 1. Trong VideoPlayer Component
```typescript
const { saveProgress, saveOnPause, saveOnModalClose, saveOnVideoEnd } = useProgressSaver({
  username,
  lessonId,
  courseId,
  onProgressUpdate: (progress) => {
    // Cập nhật UI
  }
});

// Lưu khi pause
const handlePause = async () => {
  const progress = calculateProgress();
  await saveOnPause(progress);
};

// Lưu khi kết thúc video
const handleEnded = async () => {
  const progress = calculateProgress(true);
  await saveOnVideoEnd(progress);
};
```

### 2. Hiển Thị Trạng Thái
```typescript
<ProgressStatus
  isSaving={isSaving}
  lastSaveTime={lastSaveTime}
  pendingProgress={pendingProgress}
  currentProgress={currentProgress}
  watchTime={watchTime}
  duration={duration}
/>
```

### 3. Debug & Analytics (Development)
```typescript
{process.env.NODE_ENV === 'development' && (
  <ProgressAnalytics />
)}
```

## Cấu Hình

### 1. Khoảng Thời Gian Lưu
```typescript
// Trong progressManager.ts
const SAVE_INTERVAL = 60000; // 1 phút
const QUEUE_PROCESS_INTERVAL = 30000; // 30 giây
```

### 2. Điều Kiện Hoàn Thành
```typescript
// Trong VideoPlayer
const isCompleted = isEnded || progressPercentage >= 90; // 90% trở lên
```

### 3. Event History Limit
```typescript
// Giữ lại 100 events gần nhất
if (this.eventHistory.length > 100) {
  this.eventHistory = this.eventHistory.slice(-100);
}
```

## Lợi Ích

### 1. Hiệu Suất
- Giảm số lượng request đến database
- Batch processing cho multiple saves
- Queue management thông minh

### 2. Trải Nghiệm Người Dùng
- Lưu tiến độ tự động, không cần can thiệp
- Thông báo trực quan về trạng thái lưu
- Khôi phục vị trí xem chính xác

### 3. Độ Tin Cậy
- Retry logic cho failed saves
- Auto-save khi tắt ứng dụng
- Backup data trong queue

### 4. Khả Năng Mở Rộng
- Kiến trúc modular, dễ mở rộng
- Analytics và monitoring
- Debug tools cho development

## Troubleshooting

### 1. Progress Không Lưu
- Kiểm tra console logs
- Xem ProgressAnalytics trong development mode
- Kiểm tra kết nối database

### 2. Performance Issues
- Giảm tần suất cập nhật UI
- Tăng khoảng thời gian lưu
- Kiểm tra queue size

### 3. Memory Leaks
- Cleanup event listeners
- Limit event history size
- Monitor queue processing 