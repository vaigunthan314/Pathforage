# PathForge AI

**Your Skills. Your Goal. Your Path.**

An AI-Powered Personalized Learning Path Recommender that analyzes a learner's goals, existing skills, experience, interests, available learning time, and assessment results to create and continuously adapt a personalized learning roadmap.

## Problem Statement

Online learning platforms contain thousands of resources, but students often don't know:
- What they should learn first
- What skills they are missing
- Which resources are suitable for their current level
- Which projects they should build
- How long their learning journey will take
- Whether they are progressing correctly

## Solution

PathForge AI solves this by creating a personalized learning path for every learner using AI-powered adaptive learning technology.

## Key Features

1. **Learning DNA** - Visual learner profile showing strengths, growth areas, and learning style
2. **Skill Gap Analysis** - Identifies missing skills with priority ranking
3. **Personalized Roadmap** - Phase-based learning journey
4. **Adaptive Learning Engine** - Roadmap updates based on assessment performance
5. **AI Learning Assistant** - Context-aware tutor
6. **AI Assessments** - Mastery checks after each topic
7. **Build-to-Learn Projects** - Practical project recommendations
8. **Career Readiness** - Shows alignment with target role
9. **Progress Intelligence** - Dashboard with charts and metrics

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│              Vite + Tailwind + Recharts                  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Backend (Spring Boot)                      │
│          REST API + Service Layer + AI Service           │
└─────────────────────────────────────────────────────────┘
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
┌─────────────────────┐    ┌─────────────────────┐
│     MySQL Database   │    │    Gemini AI API     │
└─────────────────────┘    └─────────────────────┘
```

## Technology Stack

### Frontend
- React 18 with Vite
- Tailwind CSS
- Recharts (charts)
- Lucide React (icons)
- React Router DOM

### Backend
- Java 17
- Spring Boot 3.2
- Spring Web
- Spring Data JPA
- Spring Validation
- MySQL

### AI
- Gemini API (with fallback)

## Project Structure

```
pathforge-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── data/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── src/main/java/com/pathforge/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── repository/
│   │   ├── model/
│   │   ├── dto/
│   │   ├── config/
│   │   └── exception/
│   ├── src/main/resources/
│   └── pom.xml
├── README.md
├── .gitignore
└── docker-compose.yml
```

## Installation

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8.0+
- Maven

### Environment Variables

Create `.env` file in backend directory:

```env
AI_API_KEY=your_api_key
DB_URL=jdbc:mysql://localhost:3306/pathforge
DB_USERNAME=root
DB_PASSWORD=your_password
```

The AI key is used against the endpoint configured by `ai.api.url` in `application.properties` (default: the OpenAI-compatible gateway `https://api.free.ai/v1/chat/completions`, model `qwen3-8b`). Works with any OpenAI-compatible chat-completions provider.

**Frontend (Firebase Auth):** Copy `frontend/.env.example` to `frontend/.env` and fill in your Firebase Web App config from the Firebase console (Project settings → Your apps):

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

To enable Google sign-in, enable the **Google** provider on the Authentication page. To enable email/password sign-up, enable **Email/Password** in Sign-in method. If Firebase is not configured, the app shows setup instructions instead of the sign-in form. See the "Demo Mode" section below to explore without auth.

### Running the Application

**Backend:**
```bash
cd backend
# Copy .env.example, add your AI key, or run:
AI_API_KEY=your_key mvn spring-boot:run
```

The backend loads a local `backend/.env` file (gitignored) containing `AI_API_KEY` automatically.

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Or one script:**
```bash
./start.sh
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:8080

The frontend talks to the backend through Vite's `/api` proxy. Signed-in users' learning profiles (career goal, preferences, roadmap, progress) are persisted server-side on the `Learner` record keyed by the Firebase UID, with transparent localStorage fallback if the backend is unreachable.

## Demo Mode

The application includes a demo mode that works without auth. Click "Explore Demo" on the landing page to try it out. Demo mode is available from the sign-in page and uses sample data explicitly labeled as demo content.

For authenticated users, demo data never appears: Dashboard, Profile, Roadmap, Progress, Learning DNA, Skills, Career Readiness, AI Tutor, and the other pages all read from the user's own profile. Sections without real data yet (e.g. assessments, skill gaps) show an empty state instead of mock content.

## API Documentation

### Learner Endpoints
- `POST /api/learners` - Create learner profile
- `GET /api/learners/{id}` - Get learner profile

### Analysis Endpoints
- `POST /api/analyze` - Analyze learner DNA
- `POST /api/roadmap/generate` - Generate roadmap
- `GET /api/roadmap/{learnerId}` - Get roadmap
- `POST /api/roadmap/recalculate` - Recalculate roadmap

### Recommendation Endpoints
- `GET /api/recommendations/{learnerId}` - Get recommendations
- `GET /api/projects/{learnerId}` - Get project recommendations

### Assessment Endpoints
- `POST /api/assessment/generate` - Generate assessment
- `POST /api/assessment/submit` - Submit assessment

### Progress Endpoints
- `GET /api/progress/{learnerId}` - Get progress
- `POST /api/progress/update` - Update progress

### Chat Endpoints
- `POST /api/chat` - Chat with AI tutor

### Data Endpoints
- `GET /api/skills` - Get all skills
- `GET /api/courses` - Get all courses

## AI Architecture

The AI service uses Gemini API with a structured prompt system:

1. **Learner Context** - Profile, skills, goals
2. **Skill Graph** - Dependencies and relationships
3. **Performance Data** - Assessment scores and progress
4. **Recommendation Engine** - Weighted scoring algorithm

### Recommendation Algorithm

```
recommendationScore = 
    skillMatch * 0.30 +
    goalMatch * 0.25 +
    prerequisiteMatch * 0.15 +
    difficultyMatch * 0.10 +
    preferenceMatch * 0.10 +
    timeFit * 0.10
```

## Adaptive Learning

The roadmap adapts based on:
- Assessment scores
- Progress tracking
- Skill mastery levels
- Time availability changes

### Adaptation Rules

- **Score >= 80%**: Mark as mastered, accelerate
- **Score 60-79%**: Recommend practice
- **Score < 60%**: Insert prerequisite modules

## Seed Data

The application includes comprehensive seed data:
- 50+ skills across multiple domains
- 100+ courses and resources
- 30+ project templates
- 10+ career roles with requirements

## Future Improvements

- User authentication and multi-user support
- Real-time collaboration
- Video content integration
- Peer learning features
- Gamification elements
- Mobile app
- More AI providers (OpenAI, Claude)
- Skill certifications
- Job matching

## Known Limitations

- AI chat and generation use the provider configured in `application.properties` (`ai.api.url` / `ai.api.model`) with the key from `backend/.env` (`AI_API_KEY`). If the key is missing or the provider is unreachable, the app falls back to built-in canned responses.
- The free `api.free.ai` gateway offers a limited set of self-hosted models (e.g. `qwen3-8b`, `qwen7b`) with daily token limits.
- Assessments, skill gap analysis, and career readiness show empty states until real learner data is available
- AI responses may vary
- Limited to English content

## License

MIT License

## Acknowledgments


