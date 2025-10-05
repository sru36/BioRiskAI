# 🧬 BioRiskAI

**BioRiskAI** is an AI-powered system designed to predict and visualize DNA damage risk in astronauts caused by various space environmental factors such as radiation exposure, microgravity, and mission duration.  
It provides scientific insights through automated data-driven predictions using NASA and international space agency datasets.

---

## 🚀 Project Overview

**BioRiskAI** is divided into two main components:

1. **Frontend (React + TypeScript + TailwindCSS)**
   - Provides an interactive and visually engaging dashboard.
   - Displays risk prediction results, visual graphs, and space health metrics.
   - Built with **Vite**, **React**, **Tailwind**, and **shadcn/ui** for a modern design.
   - Currently **not connected to the backend** (demo visualization mode only).

2. **Backend (Python + FastAPI)**
   - Handles AI model inference and dataset processing.
   - Uses MongoDB for data management and API-based endpoints for prediction and literature integration.
   - Built with **FastAPI**, **pymongo**, and **pandas**.

---


## 🧠 Tech Stack

**Frontend**
- React + TypeScript  
- TailwindCSS + shadcn/ui  
- Vite for fast builds  
- Deployed via **Netlify**

**Backend**
- Python 3.10+  
- FastAPI  
- MongoDB (pymongo)  
- Pandas, NumPy  
- AI/ML Model (deployed separately, integrated via API)

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/BioRiskAI.git
cd BioRiskAI-main
```


### 2. Backend Setup
```cd Backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The backend runs at http://127.0.0.1:8000

### 3. Frontend Setup
```cd Frontend
npm install
npm run dev
The frontend runs at http://localhost:5173
```
(Currently operates in demo mode as backend integration is pending.)


## 🧬 Future Enhancements

- 🔗 Connect frontend and backend APIs

- 🧠 Real-time AI inference integration

- 📊 Advanced data visualizations (SHAP, interactive graphs)

- ☁️ Cloud-based database (MongoDB Atlas)

- 🧾 Expanded dataset integration (NASA, ESA, JAXA)

## 🧰 AI Tools Usage Disclosure

The BioRiskAI team used AI tools (OpenAI GPT models) to:

Generate descriptive text, documentation, and structure for the project.

Refine frontend design suggestions and color layouts.

Assist in Python debugging and API structuring (non-branded code only).

All AI-generated images, if used, contain appropriate visible AI-generated watermarks as per NASA Space Apps guidelines.
No NASA logos, flags, or mission identifiers were used or modified.

## 👨‍💻 Contributors

Developed for the NASA Space Apps Challenge 2025
Team: BioRiskAI

## 📄 License

This project is licensed under the MIT License free for research and educational use.

#### ✅ Status: Prototype version - Frontend and Backend not yet connected.


