# Cognify - Learning Platform

A modern, distraction-free learning platform built with React and TypeScript. Cognify helps students focus on learning by providing a clean interface for watching educational videos, taking notes, and tracking progress.

## 🚀 Features

- **Distraction-Free Learning**: Clean, focused interface for optimal learning
- **Smart Note-Taking**: Take notes directly while watching videos
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Course Management**: Browse and organize your learning materials
- **Focus Mode**: Eliminate distractions during study sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

The application has been modularized into smaller, manageable components for easy customization:

```
src/
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation and user menu
│   ├── HomePage.tsx     # Landing page with hero section
│   ├── LoginPage.tsx    # Authentication forms
│   ├── DashboardPage.tsx # Main dashboard with stats
│   ├── CoursesPage.tsx  # Course browsing and filtering
│   ├── CourseViewer.tsx # Video player and note-taking
│   ├── ProfilePage.tsx  # User profile and settings
│   └── index.ts         # Component exports
├── types/               # TypeScript type definitions
│   └── index.ts         # All app interfaces and types
├── App.tsx              # Main app component and routing
├── main.tsx             # App entry point
└── globals.css          # Global styles and Tailwind CSS
```

## 🎨 Customization Guide

### Styling
- **Colors**: Modify the color scheme in `globals.css` and component files
- **Typography**: Update font families and sizes in Tailwind classes
- **Layout**: Adjust spacing, padding, and grid layouts in component files
- **Components**: Each component is self-contained and can be customized independently

### Adding New Features
1. **New Pages**: Create a new component in `src/components/` and add it to the routing in `App.tsx`
2. **New Components**: Add reusable components to `src/components/` and export them in `index.ts`
3. **Types**: Extend the type definitions in `src/types/index.ts` for new data structures

### Component Customization Examples

#### Changing the Color Scheme
```tsx
// In any component, replace color classes:
// From: bg-blue-600
// To: bg-purple-600

// Or update the gradient:
// From: bg-gradient-to-r from-blue-600 to-purple-600
// To: bg-gradient-to-r from-green-600 to-blue-600
```

#### Modifying Layout
```tsx
// Change grid layouts:
// From: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
// To: grid-cols-1 md:grid-cols-3 lg:grid-cols-4

// Adjust spacing:
// From: gap-6
// To: gap-8
```

#### Adding New Sections
```tsx
// Add new sections to any page component:
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-8">
      Your New Section
    </h2>
    {/* Your content here */}
  </div>
</section>
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## 📱 Pages Overview

### Home Page (`HomePage.tsx`)
- Hero section with call-to-action
- Feature highlights
- Clean, modern design

### Login Page (`LoginPage.tsx`)
- User authentication forms
- Sign up/sign in toggle
- Demo user option

### Dashboard (`DashboardPage.tsx`)
- Learning statistics
- Recent courses
- Quick actions

### Courses (`CoursesPage.tsx`)
- Course browsing with filters
- Category and difficulty filtering
- Course cards with details

### Course Viewer (`CourseViewer.tsx`)
- Video player interface
- Note-taking functionality
- Progress tracking
- Focus mode toggle

### Profile (`ProfilePage.tsx`)
- User information management
- Password changes
- Learning statistics
- Account settings

## 🎯 Key Components

### Header Component
- Responsive navigation
- User menu with dropdown
- Mobile-friendly hamburger menu

### Course Cards
- Thumbnail images
- Course metadata (duration, lessons, rating)
- Hover effects and interactions

### Video Player
- Placeholder for video content
- Note-taking interface
- Progress indicators

### Stats Cards
- Visual learning metrics
- Color-coded categories
- Responsive grid layout

## 🔧 Technical Details

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React hooks (useState, useEffect)
- **Routing**: Custom page-based routing system
- **Type Safety**: Full TypeScript implementation
- **Responsive**: Mobile-first design approach

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## 📄 License

This project is open source and available under the MIT License.

---

**Cognify** - Transform your learning experience with focus and clarity.
