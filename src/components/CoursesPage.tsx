import React, { useState } from 'react';
import { Course, Page } from '../types';

interface CoursesPageProps {
  onPageChange: (page: Page) => void;
  onCourseSelect: (course: Course) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ onPageChange, onCourseSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = ['all', 'Programming', 'Design', 'Business', 'Marketing', 'Data Science'];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  const courses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Learn the basics of React development with hands-on projects',
      category: 'Programming',
      instructor: 'Sarah Johnson',
      duration: '8 hours',
      lessons: 24,
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=React',
      videos: [],
      difficulty: 'beginner',
      rating: 4.8,
      students: 1240,
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Master modern JavaScript concepts and ES6+ features',
      category: 'Programming',
      instructor: 'Mike Chen',
      duration: '12 hours',
      lessons: 36,
      thumbnail: 'https://via.placeholder.com/300x200/F59E0B/FFFFFF?text=JavaScript',
      videos: [],
      difficulty: 'intermediate',
      rating: 4.9,
      students: 890,
    },
    {
      id: '3',
      title: 'UI/UX Design Principles',
      description: 'Create beautiful and functional user interfaces',
      category: 'Design',
      instructor: 'Emma Davis',
      duration: '6 hours',
      lessons: 18,
      thumbnail: 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Design',
      videos: [],
      difficulty: 'beginner',
      rating: 4.7,
      students: 2100,
    },
    {
      id: '4',
      title: 'Digital Marketing Strategy',
      description: 'Develop comprehensive digital marketing campaigns',
      category: 'Marketing',
      instructor: 'Alex Rodriguez',
      duration: '10 hours',
      lessons: 30,
      thumbnail: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Marketing',
      videos: [],
      difficulty: 'intermediate',
      rating: 4.6,
      students: 1560,
    },
    {
      id: '5',
      title: 'Data Science Fundamentals',
      description: 'Introduction to data analysis and machine learning',
      category: 'Data Science',
      instructor: 'Dr. Lisa Wang',
      duration: '15 hours',
      lessons: 42,
      thumbnail: 'https://via.placeholder.com/300x200/EF4444/FFFFFF?text=Data',
      videos: [],
      difficulty: 'advanced',
      rating: 4.9,
      students: 720,
    },
    {
      id: '6',
      title: 'Business Strategy & Growth',
      description: 'Strategic planning and business development techniques',
      category: 'Business',
      instructor: 'James Wilson',
      duration: '9 hours',
      lessons: 27,
      thumbnail: 'https://via.placeholder.com/300x200/6366F1/FFFFFF?text=Business',
      videos: [],
      difficulty: 'intermediate',
      rating: 4.5,
      students: 980,
    },
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Courses</h1>
          <p className="text-gray-600">Discover courses to advance your skills and knowledge</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onCourseSelect(course)}
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                  {course.difficulty}
                </div>
                <div className="absolute top-3 left-3 bg-blue-600 text-white rounded-full px-2 py-1 text-xs font-medium">
                  {course.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{course.duration}</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-600">{course.students} students</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    by {course.instructor}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters to find more courses</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage; 