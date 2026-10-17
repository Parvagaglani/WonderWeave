# 🪄 WonderWeave

> **An interactive edutainment platform blending storytelling, science quizzes, and curiosity for young minds.**  
> *Originally conceived and built in 2024 as a 2nd Runner-Up Hackathon Winner!*

---

## ✨ Features

- **📖 Multi-Topic Story Generator**: Weaves educational tales across 5 engaging categories:
  - 🦁 **Animal Kingdom**: Wildlife adventures featuring fascinating animal facts.
  - 🚀 **Space & Universe**: Cosmic voyages exploring rovers, planets, and galaxies.
  - 🌍 **Our World**: Journeys across ancient monuments, nature wonders, and cultures.
  - 🍎 **Health & Hygiene**: Superhero habits, nutrition, and body superpowers.
  - 🤖 **Technology & Innovation**: Friendly robots, coding adventures, and future gadgets.
- **🎨 Story Customization**:
  - Target age group picker (`Preschool 3-5`, `Early Reader 6-8`, `Explorer 9-12`).
  - Tone selection (`Camping & Adventure 🏕️`, `Bedtime & Calm 🌙`, `Fun & Silly 🤪`).
- **🔊 Enhanced Speech Narrator (TTS)**:
  - Browser-native Web Speech API narration with voice selector.
  - Pitch & playback speed sliders.
  - Animated soundwave reading indicator with full playback controls (`Play`, `Pause`, `Resume`, `Stop`).
- **🔬 Gamified Science Quiz**:
  - Interactive multiple-choice trivia with immediate green/red feedback and explanations.
  - Achievement badges awarded at the finish (`🌟 Master Scientist Badge`).
- **🛡️ Child Safety & API Guardrails**:
  - Strict Google AI safety filters (`BLOCK_LOW_AND_ABOVE`).
  - In-memory rate limiting and cooldowns to prevent accidental quota exhaustion.
  - Kid-friendly, playful error and boundary messages.

---

## 🛠️ Tech Stack

- **Frontend**: React 18
- **UI Components**: Material-UI (MUI v5) & Emotion
- **Routing**: React Router DOM v6
- **AI Engine**: Google Generative AI REST API via Axios
- **Audio**: Web Speech API (`SpeechSynthesis`)

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Parvagaglani/WonderWeave.git
cd wonderweave
npm install
```

### 2. Configure Environment Variables
Copy the example environment file and add your Google Gemini API key:
```bash
cp .env.example .env
```
In `.env`:
```env
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can obtain a free API key at [Google AI Studio](https://aistudio.google.com/)).*

### 3. Run Locally
```bash
npm start
# or
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📜 License
MIT License
