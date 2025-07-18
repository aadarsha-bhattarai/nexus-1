import React, { useState } from 'react';
import { User, Course, Page, Video } from './types';
import Header from './components/Header';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import CoursesPage from './components/CoursesPage';
import CourseViewer from './components/CourseViewer';
import ProfilePage from './components/ProfilePage';
import PlaylistLoader from './components/PlaylistLoader';
import DistractionFreePlayer from './components/DistractionFreePlayer';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [playlistVideos, setPlaylistVideos] = useState<Video[]>([]);
  const [playlistTitle, setPlaylistTitle] = useState<string>('');

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    setSelectedCourse(null);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course');
  };

  const handlePlaylistLoad = (videos: Video[], title: string) => {
    setPlaylistVideos(videos);
    setPlaylistTitle(title);
    setCurrentPage('player');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'login':
        return <LoginPage onPageChange={setCurrentPage} onLogin={handleLogin} />;
      case 'dashboard':
        return user ? (
          <DashboardPage 
            user={user} 
            onPageChange={setCurrentPage} 
            onCourseSelect={handleCourseSelect} 
          />
        ) : (
          <LoginPage onPageChange={setCurrentPage} onLogin={handleLogin} />
        );
      case 'courses':
        return <CoursesPage onPageChange={setCurrentPage} onCourseSelect={handleCourseSelect} />;
      case 'course':
        return selectedCourse ? (
          <CourseViewer course={selectedCourse} onPageChange={setCurrentPage} />
        ) : (
          user ? (
            <DashboardPage 
              user={user} 
              onPageChange={setCurrentPage} 
              onCourseSelect={handleCourseSelect} 
            />
          ) : (
            <LoginPage onPageChange={setCurrentPage} onLogin={handleLogin} />
          )
        );
      case 'profile':
        return user ? (
          <ProfilePage 
            user={user} 
            onPageChange={setCurrentPage} 
            onUpdateUser={handleUpdateUser} 
          />
        ) : (
          <LoginPage onPageChange={setCurrentPage} onLogin={handleLogin} />
        );
      case 'playlist':
        return <PlaylistLoader onPlaylistLoad={handlePlaylistLoad} onPageChange={setCurrentPage} />;
      case 'player':
        return <DistractionFreePlayer videos={playlistVideos} playlistTitle={playlistTitle} onPageChange={setCurrentPage} />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {currentPage !== 'login' && (
        <Header
          currentPage={currentPage}
          user={user}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
        />
      )}
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;