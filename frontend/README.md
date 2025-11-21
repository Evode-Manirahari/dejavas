# Dejava Frontend – Reality-Anchored AI Tutor

A Claude/GPT-inspired interface for Dejava, the AI tutor that “shows instead of tells.” The UI focuses on clarity: a single conversation column, persistent reality anchors, and a humane-rubric sidebar to keep every interaction grounded and accountable.

## ✨ What’s Inside

- **Conversation-first layout** – Minimal bubbles, timestamps, and no visual clutter.
- **Reality anchor rail** – Decision briefs, query tallies, and reflection prompts stay visible as you type.
- **Humane rubric snapshot** – Seven-dimension scores (spatial intelligence, cognitive autonomy, etc.) update per interaction.
- **Visualization controls** – Dedicated card for Manim scenes, practice queues, and when to “show instead of tell.”
- **Neutral aesthetic** – Accessible typography, generous whitespace, no gradients, emojis, or gamified widgets.

## 🛠️ Stack

- React 18 + TypeScript
- Vite dev server
- Tailwind CSS (utility-first styling)
- react-hot-toast (optional notifications)
- lucide-react icons (used sparingly for clarity)

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
│   ├── components/
│   │   └── Dashboard.tsx   # Chat-style tutor interface
│   ├── App.tsx             # Mounts dashboard + toaster
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles + utilities
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
└── tsconfig.json           # TypeScript config
```

## 💡 Design Principles

1. **Clarity over spectacle** – Just text, whitespace, and the data learners need.
2. **Transparency by default** – Decision briefs, query tallies, and reminders about AI limits are never hidden.
3. **Human-first** – Reflection prompts and “connect with a human” cues keep autonomy intact.
4. **Opt-in visualization** – Spatial scenes launch only when they add value.

## 🧪 Testing & Deployment

```bash
# Type check + build
npm run build

# Optional preview
npm run preview
```

Deploy the contents of `dist/` to any static host (Vercel, Netlify, S3 + CloudFront, etc.). README updates will stay in sync as we expand the tutor experience.
