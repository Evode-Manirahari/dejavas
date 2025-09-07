# Dejavas Frontend - AI Marketing Intelligence Dashboard

A modern, voice-enabled React frontend for the Dejavas AI marketing intelligence platform. This application provides a comprehensive dashboard for managing AI agents, running simulations, and integrating with email and calendar systems.

## 🚀 Features

### Core Features
- **Voice Interface**: Hands-free voice commands for all major functions
- **Simulation Management**: Upload briefs, configure agents, and run AI simulations
- **Agent Management**: Create, configure, and monitor AI agents with deep persona DNA
- **Email Integration**: Read, summarize, and respond to emails using voice commands
- **Calendar Management**: View schedule, add events, and get voice reminders
- **Real-time Metrics**: Live monitoring of simulation performance and system health

### Voice Commands
- "Start simulation" - Run AI simulation
- "Analyze content" - Analyze current content
- "Read emails" - Summarize unread emails
- "Read schedule" - Read today's schedule
- "Add event" - Create calendar event
- "Stop listening" - Turn off voice recognition

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **Web Speech API** for voice recognition and synthesis
- **Axios** for API communication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on port 8000

### Installation

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── Dashboard.tsx    # Main dashboard
│   │   ├── VoiceInterface.tsx # Voice controls
│   │   ├── SimulationPanel.tsx # Simulation management
│   │   ├── AgentManagement.tsx # Agent configuration
│   │   ├── EmailIntegration.tsx # Email features
│   │   ├── CalendarIntegration.tsx # Calendar features
│   │   └── RealTimeMetrics.tsx # Metrics dashboard
│   ├── hooks/              # Custom React hooks
│   │   └── useVoice.ts     # Voice recognition hook
│   ├── services/           # API services
│   │   └── api.ts          # Backend API integration
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## 🎯 Key Components

### Dashboard
The main interface with tabbed navigation for different features:
- Simulation controls and results
- Agent management
- Email integration
- Calendar management
- Real-time metrics

### Voice Interface
Advanced voice recognition with:
- Wake word detection
- Natural language command processing
- Text-to-speech responses
- Command confirmation

### Simulation Panel
Complete simulation workflow:
- Product brief upload
- Agent configuration
- Simulation execution
- Results visualization
- Content analysis

### Agent Management
Deep persona DNA system:
- Agent creation and editing
- Demographics configuration
- Psychographics profiling
- Personality trait assignment
- Influence scoring

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the frontend directory:

```bash
VITE_API_BASE_URL=http://localhost:8000
VITE_VOICE_ENABLED=true
VITE_ANALYTICS_ENABLED=false
```

### API Integration
The frontend connects to the FastAPI backend through:
- `/api/simulation/*` - Simulation endpoints
- `/api/analyze-content` - Content analysis
- `/api/extension/*` - Browser extension APIs

## 🎨 Styling

The application uses Tailwind CSS with a custom design system:
- **Primary Colors**: Blue gradient theme
- **Secondary Colors**: Purple accent colors
- **Components**: Reusable button, card, and input styles
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

The interface is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for different screen sizes
- Touch-friendly controls
- Optimized voice interface for mobile

## 🔒 Security

- API calls are proxied through Vite dev server
- Voice data is processed locally (no external services)
- Secure authentication with backend
- Input validation and sanitization

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Open an issue on GitHub
- Contact the development team

---

**Dejavas Frontend** - Where AI meets intuitive design 🚀
