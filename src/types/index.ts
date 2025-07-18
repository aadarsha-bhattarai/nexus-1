export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan?: 'free' | 'pro' | 'enterprise';
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  position: number;
  duration?: string;
  watched?: boolean;
  notes?: string;
  videoId?: string; // YouTube video ID for embedding
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  lessons: number;
  thumbnail: string;
  videos: Video[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  students: number;
}

export interface LearningSession {
  id: string;
  courseId: string;
  startTime: Date;
  totalVideos: number;
  completedVideos: number;
  notes: { [videoId: string]: string };
}

export type Page = 'home' | 'login' | 'dashboard' | 'course' | 'profile' | 'courses' | 'playlist' | 'player'; 