import React, { useState, useEffect } from 'react';
import { Video, Page } from '../types';

interface DistractionFreePlayerProps {
  videos: Video[];
  playlistTitle: string;
  onPageChange: (page: Page) => void;
}

const DistractionFreePlayer: React.FC<DistractionFreePlayerProps> = ({ 
  videos, 
  playlistTitle, 
  onPageChange 
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [notes, setNotes] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    // Load saved notes for current video
    setNotes(currentVideo.notes || '');
  }, [currentVideo]);

  const handleVideoChange = (index: number) => {
    // Save current notes
    if (currentVideo) {
      currentVideo.notes = notes;
    }
    
    setCurrentVideoIndex(index);
    setCurrentVideoIndex(index);
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      handleVideoChange(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      handleVideoChange(currentVideoIndex - 1);
    }
  };

  const handleNoteChange = (newNotes: string) => {
    setNotes(newNotes);
    if (currentVideo) {
      currentVideo.notes = newNotes;
    }
  };

  const markAsWatched = () => {
    if (currentVideo) {
      currentVideo.watched = true;
    }
  };

  const completedVideos = videos.filter(v => v.watched).length;
  const progressPercentage = (completedVideos / videos.length) * 100;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onPageChange('home')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-semibold text-white">{playlistTitle}</h1>
              <p className="text-sm text-gray-400">
                Video {currentVideoIndex + 1} of {videos.length}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-3 py-1 rounded text-sm ${
                autoPlay ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {autoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
            </button>
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Main Video Area */}
        <div className={`flex-1 flex flex-col ${showPlaylist ? 'mr-80' : ''}`}>
          {/* Video Player */}
          <div className="flex-1 bg-black relative">
            <div className="w-full h-full flex items-center justify-center">
              <iframe
                src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&disablekb=1&fs=1&iv_load_policy=3&cc_load_policy=0&playsinline=1`}
                title={currentVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Info and Controls */}
          <div className="bg-gray-900 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {currentVideo.title}
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  {currentVideo.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{currentVideo.duration}</span>
                  <span>•</span>
                  <span>Position {currentVideo.position}</span>
                  {currentVideo.watched && (
                    <>
                      <span>•</span>
                      <span className="text-green-400">✓ Watched</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousVideo}
                  disabled={currentVideoIndex === 0}
                  className="p-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={markAsWatched}
                  className={`px-3 py-1 rounded text-sm ${
                    currentVideo.watched 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {currentVideo.watched ? 'Watched' : 'Mark Watched'}
                </button>
                <button
                  onClick={handleNextVideo}
                  disabled={currentVideoIndex === videos.length - 1}
                  className="p-2 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                <span>Progress: {completedVideos} of {videos.length} completed</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="bg-gray-800 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white">Your Notes</h3>
              <span className="text-sm text-gray-400">
                {notes.length} characters
              </span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => handleNoteChange(e.target.value)}
              placeholder="Take notes while watching this video..."
              className="w-full h-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Playlist Sidebar */}
        {showPlaylist && (
          <div className="w-80 bg-gray-900 border-l border-gray-800 overflow-y-auto">
            <div className="p-4 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Playlist</h3>
              <p className="text-sm text-gray-400">{videos.length} videos</p>
            </div>
            
            <div className="divide-y divide-gray-800">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => handleVideoChange(index)}
                  className={`p-4 cursor-pointer transition-colors ${
                    index === currentVideoIndex 
                      ? 'bg-blue-600 bg-opacity-20 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {video.watched ? (
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-300">{index + 1}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate">
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">{video.duration}</p>
                      {video.notes && (
                        <p className="text-xs text-blue-400 mt-1">Has notes</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistractionFreePlayer; 