import { supabase, TABLES } from '../config/supabaseConfig';

export interface VideoCourse {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  created_at: string;
  updated_at: string;
}

export interface VideoLesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_path: string;
  duration?: number;
  order_index: number;
  created_at: string;
}

export interface UserProgress {
  id: string;
  username: string;
  lesson_id: string;
  course_id: string;
  progress_percentage: number;
  watch_time: number;
  is_completed: boolean;
  last_watched_at: string;
  created_at: string;
  updated_at: string;
}

// Fallback data khi không có database
const fallbackCourses: VideoCourse[] = [
  {
    id: 'ghep-van',
    title: 'Khoá học Ghép Vần',
    description: 'Học cách ghép vần và phát âm trong tiếng Lào',
    level: 'beginner',
    category: 'Phát âm',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'giao-tiep',
    title: 'Khoá học Giao Tiếp',
    description: 'Học giao tiếp cơ bản trong tiếng Lào',
    level: 'intermediate',
    category: 'Giao tiếp',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const fallbackLessons: VideoLesson[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    course_id: 'ghep-van',
    title: 'Bài 1: Giới thiệu về ghép vần',
    description: 'Tìm hiểu cơ bản về cách ghép vần trong tiếng Lào',
    video_path: '/video/GhepVan/L_1_GhepVan.mp4',
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    course_id: 'ghep-van',
    title: 'Bài 2: Thực hành ghép vần',
    description: 'Thực hành ghép vần với các ví dụ cụ thể',
    video_path: '/video/GhepVan/L_2_GhepVan.mp4',
    order_index: 2,
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    course_id: 'giao-tiep',
    title: 'Bài 1: Chào hỏi cơ bản',
    description: 'Học cách chào hỏi và giới thiệu bản thân',
    video_path: '/video/GiaoTiep/lesson1.mp4',
    order_index: 1,
    created_at: new Date().toISOString()
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    course_id: 'giao-tiep',
    title: 'Bài 2: Giao tiếp hàng ngày',
    description: 'Các câu giao tiếp thường dùng trong cuộc sống',
    video_path: '/video/GiaoTiep/lesson2.mp4',
    order_index: 2,
    created_at: new Date().toISOString()
  }
];

class VideoCourseService {
  async getAllCourses(): Promise<VideoCourse[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEO_COURSES)
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || fallbackCourses;
    } catch (error) {
      console.error('Error getting video courses, using fallback data:', error);
      return fallbackCourses;
    }
  }

  async getCourseById(courseId: string): Promise<VideoCourse | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.VIDEO_COURSES)
        .select('*')
        .eq('id', courseId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting video course, using fallback data:', error);
      return fallbackCourses.find(course => course.id === courseId) || null;
    }
  }

  async getLessonsByCourseId(courseId: string): Promise<VideoLesson[]> {
    try {
      const { data, error } = await supabase
        .from('video_lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data || fallbackLessons.filter(lesson => lesson.course_id === courseId);
    } catch (error) {
      console.error('Error getting video lessons, using fallback data:', error);
      return fallbackLessons.filter(lesson => lesson.course_id === courseId);
    }
  }

  async getLessonById(lessonId: string): Promise<VideoLesson | null> {
    try {
      const { data, error } = await supabase
        .from('video_lessons')
        .select('*')
        .eq('id', lessonId)
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting video lesson, using fallback data:', error);
      return fallbackLessons.find(lesson => lesson.id === lessonId) || null;
    }
  }

  // Quản lý tiến độ học tập
  async getUserProgress(username: string, lessonId: string): Promise<UserProgress | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_PROGRESS)
        .select('*')
        .eq('username', username)
        .eq('lesson_id', lessonId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error getting user progress:', error);
      return null;
    }
  }

  async getUserProgressByCourse(username: string, courseId: string): Promise<UserProgress[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.USER_PROGRESS)
        .select('*')
        .eq('username', username)
        .eq('course_id', courseId);
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting user progress by course:', error);
      return [];
    }
  }

  async updateUserProgress(
    username: string, 
    lessonId: string, 
    courseId: string, 
    progressData: {
      progress_percentage?: number;
      watch_time?: number;
      is_completed?: boolean;
    }
  ): Promise<boolean> {
    try {
      console.log('updateUserProgress called with:', { username, lessonId, courseId, progressData });
      
      // Kiểm tra xem đã có progress chưa
      const existingProgress = await this.getUserProgress(username, lessonId);
      console.log('Existing progress:', existingProgress);
      
      if (existingProgress) {
        // Cập nhật progress hiện có
        console.log('Updating existing progress...');
        const { error } = await supabase
          .from(TABLES.USER_PROGRESS)
          .update({
            ...progressData,
            updated_at: new Date().toISOString(),
            last_watched_at: new Date().toISOString()
          })
          .eq('username', username)
          .eq('lesson_id', lessonId);
        
        if (error) {
          console.error('Error updating progress:', error);
          throw error;
        }
        console.log('Progress updated successfully');
      } else {
        // Tạo progress mới
        console.log('Creating new progress...');
        const { error } = await supabase
          .from(TABLES.USER_PROGRESS)
          .insert([{
            username,
            lesson_id: lessonId,
            course_id: courseId,
            progress_percentage: progressData.progress_percentage || 0,
            watch_time: progressData.watch_time || 0,
            is_completed: progressData.is_completed || false,
            last_watched_at: new Date().toISOString()
          }]);
        
        if (error) {
          console.error('Error creating progress:', error);
          throw error;
        }
        console.log('Progress created successfully');
      }
      
      return true;
    } catch (error) {
      console.error('Error updating user progress:', error);
      return false;
    }
  }

  async markLessonAsCompleted(username: string, lessonId: string, courseId: string): Promise<boolean> {
    return this.updateUserProgress(username, lessonId, courseId, {
      progress_percentage: 100,
      is_completed: true
    });
  }

  async getCourseProgress(username: string, courseId: string): Promise<{
    totalLessons: number;
    completedLessons: number;
    progressPercentage: number;
    lastWatchedLesson?: string;
  }> {
    try {
      const lessons = await this.getLessonsByCourseId(courseId);
      const userProgress = await this.getUserProgressByCourse(username, courseId);
      
      const totalLessons = lessons.length;
      const completedLessons = userProgress.filter(p => p.is_completed).length;
      const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
      
      // Tìm bài học cuối cùng được xem
      const lastWatched = userProgress
        .sort((a, b) => new Date(b.last_watched_at).getTime() - new Date(a.last_watched_at).getTime())[0];
      
      return {
        totalLessons,
        completedLessons,
        progressPercentage,
        lastWatchedLesson: lastWatched?.lesson_id
      };
    } catch (error) {
      console.error('Error getting course progress:', error);
      return {
        totalLessons: 0,
        completedLessons: 0,
        progressPercentage: 0
      };
    }
  }

  // Phương thức để tạo dữ liệu mẫu (sẽ được gọi một lần để khởi tạo)
  async initializeSampleData(): Promise<void> {
    try {
      // Kiểm tra xem đã có dữ liệu chưa
      const { data: existingCourses } = await supabase
        .from(TABLES.VIDEO_COURSES)
        .select('id')
        .limit(1);

      if (existingCourses && existingCourses.length > 0) {
        console.log('Sample data already exists');
        return;
      }

      // Tạo khóa học Ghép Vần
      const { data: ghepVanCourse, error: courseError } = await supabase
        .from(TABLES.VIDEO_COURSES)
        .insert([{
          id: 'ghep-van',
          title: 'Khoá học Ghép Vần',
          description: 'Học cách ghép vần và phát âm trong tiếng Lào',
          level: 'beginner',
          category: 'Phát âm',
          thumbnail: '/video/GhepVan/thumbnail.jpg'
        }])
        .select()
        .single();

      if (courseError) throw courseError;

      // Tạo các bài học cho khóa Ghép Vần
      const ghepVanLessons = [
        {
          course_id: ghepVanCourse.id,
          title: 'Bài 1: Giới thiệu về ghép vần',
          description: 'Tìm hiểu cơ bản về cách ghép vần trong tiếng Lào',
          video_path: '/video/GhepVan/L_1_GhepVan.mp4',
          order_index: 1
        },
        {
          course_id: ghepVanCourse.id,
          title: 'Bài 2: Thực hành ghép vần',
          description: 'Thực hành ghép vần với các ví dụ cụ thể',
          video_path: '/video/GhepVan/L_2_GhepVan.mp4',
          order_index: 2
        }
      ];

      await supabase
        .from('video_lessons')
        .insert(ghepVanLessons);

      // Tạo khóa học Giao Tiếp
      const { error: giaoTiepError } = await supabase
        .from(TABLES.VIDEO_COURSES)
        .insert([{
          id: 'giao-tiep',
          title: 'Khoá học Giao Tiếp',
          description: 'Học giao tiếp cơ bản trong tiếng Lào',
          level: 'intermediate',
          category: 'Giao tiếp',
          thumbnail: '/video/GiaoTiep/thumbnail.jpg'
        }]);

      if (giaoTiepError) throw giaoTiepError;

      console.log('Sample data initialized successfully');
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }
}

export const videoCourseService = new VideoCourseService();
export default videoCourseService; 