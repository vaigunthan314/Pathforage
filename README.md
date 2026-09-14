PathForge 🚀
AI-Powered Personalized Career Learning Platform

Stop guessing what to learn next. Let your progress decide.

🎯 Problem Statement

Students have access to thousands of learning resources, but they struggle to decide:

What to learn next
In what order to learn
Which skills they are missing
Whether they are actually career-ready
Which projects they should build

Existing platforms often provide content or static roadmaps, but lack continuous personalization and skill-gap tracking.

💡 Our Solution

PathForge brings learning, assessment, skill analysis, projects and AI guidance into one platform.

It creates a personalized learning journey based on the learner's:

Career goal
Current level
Learning preferences
Progress
Assessment results
Skill gaps
Core Approach

Career Goal → Personalized Roadmap → Learn → Practice → Assess → Track Skills → Identify Gaps → Build Projects → Career Ready

✨ Key Features
🧭 Personalized Roadmap

Creates a structured learning path based on the learner's target career and current level.

📚 Interactive Learning

Provides topic content, practical examples, YouTube resources and quizzes.

📊 Skill Gap Analysis

Identifies the difference between current skills and skills required for the target career.

🤖 AI Tutor

Provides personalized explanations, examples and quizzes using learner context.

💻 Project-Based Learning

Recommends career-relevant projects to apply technical knowledge.

📈 Progress Dashboard

Tracks learning activity, completed topics, assessments, skills and career readiness.

🔄 Workflow
Login
 ↓
Career Goal
 ↓
Personalized Roadmap
 ↓
Learn + Video
 ↓
Practice + Quiz
 ↓
Track Progress
 ↓
Identify Skill Gaps
 ↓
Build Projects
 ↓
Career Ready
🤖 AI / ML

PathForge uses context-aware AI prompting to make the AI Tutor more relevant.

The system combines:

Career Goal + Level + Current Topic + Skill Gaps + Progress + Assessment

to generate personalized guidance.

AI Tutor can:
Explain concepts simply
Give practical examples
Quiz the learner
Explain why a topic matters
Answer learning-related questions
🏗️ System Architecture
            User
              ↓
       React + Vite
          Frontend
              ↓
       Spring Boot API
          Backend
        ↙     ↓      ↘
 Firebase   Database   Groq
   Auth                 AI
Technology Stack

Frontend: React, Vite, Tailwind CSS
Backend: Java, Spring Boot, REST API
Database: H2
Authentication: Firebase
AI: Groq API
Deployment: GitHub + Render

🏆 Innovation

PathForge uses a closed-loop learning model:

Learn → Assess → Measure → Identify Gap → Adapt → Learn Next

Unlike a static roadmap, the platform connects learner progress with skills, assessments, projects and AI guidance.

USP

PathForge connects what students want to become, what they currently know, what they need to learn, and what they should build next.

⚠️ Challenges Faced
SPA deployment: React routes initially failed on refresh.
Solution: Configured Render SPA routing.
AI integration: AI provider/model compatibility caused failures.
Solution: Diagnosed production API errors and updated the AI configuration.
Learner identification: AI requests needed the correct learner context.
Solution: Integrated Firebase UID-based learner identification.
Multi-user consistency: User data needed to remain isolated.
Solution: Used learner-specific data handling instead of shared global state.
🚀 Future Scope
AI-powered resume analysis
Job and skill matching
Browser-based coding environment
AI mock interviews
Industry skill benchmarking
Advanced career recommendations
🎯 Impact

PathForge helps students:

Reduce learning confusion → Identify skill gaps → Learn effectively → Build projects → Track progress → Become career-ready

🔗 Project

GitHub: https://github.com/vaigunthan314/Pathforage
Live Demo: https://pathforage.onrender.com

PathForge turns fragmented learning into an intelligent career journey.
