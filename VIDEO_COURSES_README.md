# Hướng dẫn sử dụng tính năng Bài học qua video

## Tổng quan

Tính năng "Bài học qua video" cho phép người dùng học tiếng Lào thông qua các video bài giảng được tổ chức theo khóa học.

## Cấu trúc thư mục

```
public/video/
├── GhepVan/
│   ├── L_1_GhepVan.mp4
│   └── L_2_GhepVan.mp4
└── GiaoTiep/
    ├── lesson1.mp4 (sẽ được thêm sau)
    └── lesson2.mp4 (sẽ được thêm sau)
```

## Database Setup

### 1. Tạo bảng trong Supabase

Chạy file `database_setup.sql` trong Supabase SQL Editor để tạo các bảng cần thiết:

```sql
-- Tạo bảng video_courses
CREATE TABLE IF NOT EXISTS video_courses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    thumbnail VARCHAR(500),
    level VARCHAR(20) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    category VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng video_lessons
CREATE TABLE IF NOT EXISTS video_lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id VARCHAR(50) REFERENCES video_courses(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_path VARCHAR(500) NOT NULL,
    duration INTEGER,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Thêm dữ liệu mẫu

Dữ liệu mẫu sẽ được tự động tạo khi ứng dụng chạy lần đầu, hoặc bạn có thể chạy các câu lệnh INSERT trong file `database_setup.sql`.

## Các khóa học hiện có

### 1. Khoá học Ghép Vần
- **ID**: `ghep-van`
- **Level**: Beginner
- **Category**: Phát âm
- **Mô tả**: Học cách ghép vần và phát âm trong tiếng Lào
- **Bài học**:
  - Bài 1: Giới thiệu về ghép vần
  - Bài 2: Thực hành ghép vần

### 2. Khoá học Giao Tiếp
- **ID**: `giao-tiep`
- **Level**: Intermediate
- **Category**: Giao tiếp
- **Mô tả**: Học giao tiếp cơ bản trong tiếng Lào
- **Bài học**:
  - Bài 1: Chào hỏi cơ bản
  - Bài 2: Giao tiếp hàng ngày

## Thêm khóa học mới

### 1. Tạo thư mục video

```bash
mkdir -p public/video/[TEN_KHOA_HOC]
```

### 2. Thêm video vào database

```sql
-- Thêm khóa học
INSERT INTO video_courses (id, title, description, level, category) VALUES
('ten-khoa-hoc', 'Tên khóa học', 'Mô tả khóa học', 'beginner', 'Danh mục');

-- Thêm bài học
INSERT INTO video_lessons (course_id, title, description, video_path, order_index) VALUES
('ten-khoa-hoc', 'Tên bài học', 'Mô tả bài học', '/video/ten-khoa-hoc/video.mp4', 1);
```

### 3. Cập nhật fallback data (nếu cần)

Nếu muốn ứng dụng hoạt động offline, cập nhật fallback data trong `src/services/videoCourseService.ts`.

## Tính năng

### 1. Giao diện
- **Responsive**: Hoạt động tốt trên desktop và mobile
- **Dark/Light mode**: Tự động thích ứng với theme
- **Loading states**: Hiển thị skeleton loading khi tải dữ liệu
- **Error handling**: Xử lý lỗi và hiển thị thông báo phù hợp

### 2. Chức năng
- **Xem danh sách khóa học**: Hiển thị tất cả khóa học với thông tin chi tiết
- **Xem bài học**: Danh sách bài học trong từng khóa học
- **Phát video**: Dialog phát video với controls đầy đủ
- **Fallback data**: Hoạt động ngay cả khi không có database

### 3. Database
- **Supabase integration**: Sử dụng Supabase làm backend
- **Real-time updates**: Có thể mở rộng để real-time
- **Optimized queries**: Index và foreign key constraints

## Cấu trúc code

### Components
- `VideoLessons.tsx`: Component chính cho tab video lessons
- `Lessons.tsx`: Trang lessons với 2 tab

### Services
- `videoCourseService.ts`: Service quản lý video courses

### Types
- `VideoCourse`: Interface cho khóa học
- `VideoLesson`: Interface cho bài học

## Mở rộng trong tương lai

1. **Progress tracking**: Theo dõi tiến độ học tập
2. **Comments**: Bình luận cho từng bài học
3. **Notes**: Ghi chú cá nhân
4. **Download**: Tải video để xem offline
5. **Subtitles**: Phụ đề cho video
6. **Quiz**: Bài kiểm tra sau mỗi bài học
7. **Certificates**: Chứng chỉ hoàn thành khóa học

## Troubleshooting

### Lỗi không tải được video
- Kiểm tra đường dẫn video trong database
- Đảm bảo file video tồn tại trong thư mục `public/video/`
- Kiểm tra quyền truy cập file

### Lỗi database
- Kiểm tra kết nối Supabase
- Chạy lại file `database_setup.sql`
- Kiểm tra environment variables

### Lỗi fallback data
- Kiểm tra cấu trúc fallback data trong service
- Đảm bảo video_path trỏ đến file thực tế 