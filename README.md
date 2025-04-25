# 🎂 AI Birthday Song Generator – Backend

This Node.js backend powers the **AI Birthday Song App**, allowing users to generate personalized birthday songs using **OpenAI (GPT-4)** for lyrics and **Uberduck** for singing voice.

## 🚀 Features
- 🎤 AI-generated birthday lyrics with GPT
- 🎶 AI-synthesized singing voice via Uberduck
- 🔗 Clean API endpoint for frontend integration
- 📦 Lightweight Express server structure

## 📁 Folder Structure
See /src for routes and services.

## ⚙️ Setup Instructions
1. Clone this repo and run `npm install`
2. Create `.env` with your API keys
3. Start with `npm run dev`

## 📡 POST /api/generate-song
Request:
```json
{ "name": "Elif", "relationship": "Partner", "traits": ["Caring", "Smart"], "tone": "Romantic", "style": "Ballad" }
```

Response:
```json
{ "lyrics": "...", "audioUrl": "https://..." }
```
