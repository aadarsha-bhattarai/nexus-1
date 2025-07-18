import React, { useState } from 'react';
import { Course, Video, Page } from '../types';

interface CourseViewerProps {
  course: Course;
  onPageChange: (page: Page) => void;
}

const CourseViewer: React.FC<CourseViewerProps> = ({ course, onPageChange }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Mock videos for the course
  const videos: Video[] = [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn the basics of React and its core concepts',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+1',
      position: 1,
      duration: '15:30',
      watched: true,
      notes: 'React is a JavaScript library for building user interfaces',
    },
    {
      id: '2',
      title: 'Components and Props',
      description: 'Understanding React components and how to pass data',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+2',
      position: 2,
      duration: '22:15',
      watched: false,
      notes: '',
    },
    {
      id: '3',
      title: 'State and Lifecycle',
      description: 'Managing component state and lifecycle methods',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+3',
      position: 3,
      duration: '18:45',
      watched: false,
      notes: '',
    },
    {
      id: '4',
      title: 'Hooks in React',
      description: 'Using modern React hooks for state management',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+4',
      position: 4,
      duration: '25:10',
      watched: false,
      notes: '',
    },
  ];

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setNotes(video.notes || '');
  };

  const handleNoteChange = (newNotes: string) => {
    setNotes(newNotes);
    if (selectedVideo) {
      selectedVideo.notes = newNotes;
    }
  };

  const completedVideos = videos.filter(v => v.watched).length;
  const progressPercentage = (completedVideos / videos.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => onPageChange('dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isFocusMode
                  ? 'bg-red-100 text-red-700 hover:bg-red-200'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              {isFocusMode ? 'Exit Focus Mode' : 'Focus Mode'}
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Instructor: {course.instructor}</span>
              <span>{course.duration}</span>
              <span>{course.lessons} lessons</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Progress</div>
              <div className="text-lg font-bold text-gray-900">
                {completedVideos} of {videos.length} completed
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {selectedVideo ? (
                <div>
                  <div className="relative bg-black aspect-video">
                    <img
                      src={selectedVideo.thumbnail}
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all">
                        <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedVideo.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                    
                    {/* Notes Section */}
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Notes
                      </label>
                      <textarea
                        value={notes}
                        onChange={(e) => handleNoteChange(e.target.value)}
                        placeholder="Take notes while watching..."
                        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">Select a video to start learning</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Video List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">Course Content</h3>
                <p className="text-sm text-gray-600 mt-1">{videos.length} lessons</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoSelect(video)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                      selectedVideo?.id === video.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {video.watched ? (
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">{video.position}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{video.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{video.duration}</p>
                        {video.notes && (
                          <p className="text-xs text-blue-600 mt-1">Has notes</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer; 