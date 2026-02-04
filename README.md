# Face Recognition Attendance System

A modern, professional web application for managing attendance using facial recognition technology. Built with React, TypeScript, and face-api.js, this system provides a seamless and secure way to track attendance with real-time face detection and recognition.

## 🚀 Features

- **Face Recognition**: Advanced facial recognition using face-api.js with real-time detection
- **Attendance Tracking**: Automated attendance marking with timestamp logging
- **User Registration**: Easy face enrollment system for new users
- **Dashboard Analytics**: Comprehensive attendance statistics and insights
- **Modern UI**: Professional dark theme with glassmorphism effects and green/black color scheme
- **Responsive Design**: Fully responsive interface that works across all devices
- **Real-time Updates**: Live attendance status updates
- **Webcam Integration**: Seamless webcam access for face capture

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router DOM 6.23.0** - Client-side routing
- **Tailwind CSS 3.4.1** - Utility-first CSS framework

### Face Recognition
- **face-api.js 0.22.2** - Face detection and recognition
- **react-webcam 7.2.0** - Webcam integration

### UI/UX
- **Lucide React** - Modern icon library
- **date-fns 3.6.0** - Date formatting and manipulation
- **Glassmorphism Effects** - Modern UI design patterns

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
ecom/
├── project/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AttendanceSystem/
│   │   │   │   ├── FaceScanner.tsx          # Face detection and recognition component
│   │   │   │   └── AttendanceRecorder.tsx   # Attendance logging component
│   │   │   ├── Dashboard/
│   │   │   │   └── AttendanceStats.tsx      # Statistics and analytics
│   │   │   ├── FaceRegistration/
│   │   │   │   ├── CameraCapture.tsx        # Camera capture for registration
│   │   │   │   └── UserForm.tsx             # User information form
│   │   │   ├── Layout/
│   │   │   │   ├── Layout.tsx               # Main layout wrapper
│   │   │   │   └── Navbar.tsx               # Navigation bar
│   │   │   └── UI/
│   │   │       ├── Button.tsx               # Reusable button component
│   │   │       ├── Card.tsx                 # Card component
│   │   │       └── StatusBadge.tsx          # Status indicator
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx                # Dashboard page
│   │   │   ├── AttendancePage.tsx           # Attendance marking page
│   │   │   └── RegisterPage.tsx             # User registration page
│   │   ├── services/                        # API and service integrations
│   │   ├── types/                           # TypeScript type definitions
│   │   ├── utils/                           # Utility functions
│   │   ├── App.tsx                          # Main application component
│   │   └── main.tsx                         # Application entry point
│   ├── public/                              # Static assets
│   ├── package.json                         # Dependencies and scripts
│   ├── tsconfig.json                        # TypeScript configuration
│   ├── tailwind.config.js                   # Tailwind CSS configuration
│   ├── vite.config.ts                       # Vite configuration
│   └── index.html                           # HTML entry point
└── README.md                                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Webcam** (for face capture)
- **Modern browser** with webcam support (Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harshithgreek/ecom.git
   cd ecom
   ```

2. **Navigate to the project directory**
   ```bash
   cd project
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

3. **Grant camera permissions**
   
   Allow the browser to access your webcam when prompted

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 Usage Guide

### 1. Register a New User

- Navigate to the **Register** page from the navigation menu
- Fill in the user details (Name, ID, etc.)
- Position your face in the camera frame
- Click **Capture** to take multiple photos
- Submit the registration form

### 2. Mark Attendance

- Navigate to the **Attendance** page
- Position your face in front of the camera
- The system will automatically detect and recognize your face
- Attendance will be marked automatically upon successful recognition
- View confirmation of attendance marking

### 3. View Dashboard

- Navigate to the **Dashboard** from the navigation menu
- View attendance statistics and analytics
- Check recent attendance records
- Monitor attendance trends

## 🎨 UI Design

The application features a modern, professional design with:

- **Dark Theme**: Eye-friendly dark background
- **Green & Black Color Scheme**: Professional and sleek appearance
- **Glassmorphism**: Modern frosted glass effects
- **Smooth Animations**: Micro-interactions for enhanced UX
- **Responsive Layout**: Adapts to all screen sizes
- **Clean Typography**: Professional font choices

## 🔒 Privacy & Security

- All face recognition processing happens **locally** in the browser
- No face data is sent to external servers (depending on your backend implementation)
- User data is stored securely
- Camera access is only requested when needed
- Users can revoke camera permissions at any time

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting
- **Consistent code formatting**
- **Component-based architecture**

## 🐛 Known Issues

- Face recognition requires good lighting conditions
- Camera quality affects recognition accuracy
- Models are downloaded from CDN on first use

## 🔄 Updates & Maintenance

This project is actively maintained. Check the [conversation history](https://github.com/Harshithgreek/ecom) for recent updates and fixes.

## 👨‍💻 Author

**Harshith**
- GitHub: [@Harshithgreek](https://github.com/Harshithgreek)

## Acknowledgments

- **face-api.js** - Face recognition technology
- **React Team** - React framework
- **Tailwind CSS** - Styling framework
- **Vite** - Build tool
