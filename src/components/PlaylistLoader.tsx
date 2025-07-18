import React, { useState } from 'react';
import { Video, Page } from '../types';

interface PlaylistLoaderProps {
  onPlaylistLoad: (videos: Video[], playlistTitle: string) => void;
  onPageChange: (page: Page) => void;
}

const PlaylistLoader: React.FC<PlaylistLoaderProps> = ({ onPlaylistLoad, onPageChange }) => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistUrl.trim()) {
      setError('Please enter a YouTube playlist URL');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Extract playlist ID from URL
      const playlistId = extractPlaylistId(playlistUrl);
      if (!playlistId) {
        throw new Error('Invalid YouTube playlist URL');
      }

      // For demo purposes, create mock videos
      // In a real app, you'd fetch from YouTube API
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Introduction to React Hooks',
          description: 'Learn the basics of React Hooks and how to use them effectively',
          thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+1',
          position: 1,
          duration: '15:30',
          watched: false,
          notes: '',
          videoId: 'dQw4w9WgXcQ', // YouTube video ID
        },
        {
          id: '2',
          title: 'useState Hook Deep Dive',
          description: 'Understanding useState hook with practical examples',
          thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+2',
          position: 2,
          duration: '22:15',
          watched: false,
          notes: '',
          videoId: 'dQw4w9WgXcQ',
        },
        {
          id: '3',
          title: 'useEffect Hook Explained',
          description: 'Master the useEffect hook for side effects',
          thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+3',
          position: 3,
          duration: '18:45',
          watched: false,
          notes: '',
          videoId: 'dQw4w9WgXcQ',
        },
        {
          id: '4',
          title: 'Custom Hooks Creation',
          description: 'Learn how to create your own custom hooks',
          thumbnail: 'https://via.placeholder.com/300x200/3B82F6/FFFFFF?text=Video+4',
          position: 4,
          duration: '25:10',
          watched: false,
          notes: '',
          videoId: 'dQw4w9WgXcQ',
        },
      ];

      const playlistTitle = 'React Hooks Tutorial Series';
      onPlaylistLoad(mockVideos, playlistTitle);
      onPageChange('player');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load playlist');
    } finally {
      setIsLoading(false);
    }
  };

  const extractPlaylistId = (url: string): string | null => {
    const patterns = [
      /youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)/,
      /youtube\.com\/watch\?.*list=([a-zA-Z0-9_-]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Load Your Playlist
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Paste a YouTube playlist URL to start learning distraction-free
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="playlist-url" className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Playlist URL
            </label>
            <input
              id="playlist-url"
              type="url"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              placeholder="https://www.youtube.com/playlist?list=..."
              className="w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading Playlist...
                </div>
              ) : (
                'Load Playlist'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => onPageChange('home')}
              className="text-gray-600 hover:text-gray-500 text-sm"
            >
              ← Back to home
            </button>
          </div>
        </form>

        {/* Example URLs */}
        <div className="mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Example URLs:</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <p>• https://www.youtube.com/playlist?list=PL0vfts4VzfNiI1BsIK5u7LpNYIDxeWmUu</p>
              <p>• https://www.youtube.com/watch?v=...&list=PL0vfts4VzfNiI1BsIK5u7LpNYIDxeWmUu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistLoader; 