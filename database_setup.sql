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
    duration INTEGER, -- Thời lượng video tính bằng giây
    order_index INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo bảng user_progress để lưu tiến độ học tập
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    lesson_id UUID REFERENCES video_lessons(id) ON DELETE CASCADE,
    course_id VARCHAR(50) REFERENCES video_courses(id) ON DELETE CASCADE,
    progress_percentage DECIMAL(5,2) DEFAULT 0, -- Phần trăm hoàn thành (0-100)
    watch_time INTEGER DEFAULT 0, -- Thời gian đã xem (giây)
    is_completed BOOLEAN DEFAULT FALSE, -- Đã hoàn thành chưa
    last_watched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(username, lesson_id)
);

-- Tạo index để tối ưu hiệu suất
CREATE INDEX IF NOT EXISTS idx_video_lessons_course_id ON video_lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_video_lessons_order ON video_lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_user_progress_username ON user_progress(username);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course ON user_progress(course_id);

-- Thêm dữ liệu mẫu cho khóa học Ghép Vần
INSERT INTO video_courses (id, title, description, level, category) VALUES
('ghep-van', 'Khoá học Ghép Vần', 'Học cách ghép vần và phát âm trong tiếng Lào', 'beginner', 'Phát âm')
ON CONFLICT (id) DO NOTHING;

-- Thêm dữ liệu mẫu cho khóa học Giao Tiếp
INSERT INTO video_courses (id, title, description, level, category) VALUES
('giao-tiep', 'Khoá học Giao Tiếp', 'Học giao tiếp cơ bản trong tiếng Lào', 'intermediate', 'Giao tiếp')
ON CONFLICT (id) DO NOTHING;

-- Thêm bài học cho khóa Ghép Vần
INSERT INTO video_lessons (course_id, title, description, video_path, order_index) VALUES
('ghep-van', 'Bài 1: Giới thiệu về ghép vần', 'Tìm hiểu cơ bản về cách ghép vần trong tiếng Lào', '/video/GhepVan/L_1_GhepVan.mp4', 1),
('ghep-van', 'Bài 2: Thực hành ghép vần', 'Thực hành ghép vần với các ví dụ cụ thể', '/video/GhepVan/L_2_GhepVan.mp4', 2)
ON CONFLICT DO NOTHING;

-- Thêm bài học cho khóa Giao Tiếp (placeholder - sẽ được cập nhật sau)
INSERT INTO video_lessons (course_id, title, description, video_path, order_index) VALUES
('giao-tiep', 'Bài 1: Chào hỏi cơ bản', 'Học cách chào hỏi và giới thiệu bản thân', '/video/GiaoTiep/lesson1.mp4', 1),
('giao-tiep', 'Bài 2: Giao tiếp hàng ngày', 'Các câu giao tiếp thường dùng trong cuộc sống', '/video/GiaoTiep/lesson2.mp4', 2)
ON CONFLICT DO NOTHING; 