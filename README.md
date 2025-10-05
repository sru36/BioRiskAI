# BioRiskAI
**Deep Space Health Risk Predictor**

> Estimate astronaut DNA damage risk based on radiation, microgravity, circadian disruption, and biomarker data.

---

## 🚀 Project Overview
**BioRiskAI** is a responsive React + Tailwind frontend (with example backend integration) built for the **NASA Space Apps Challenge 2025**.  
It collects spaceflight stressor inputs, calls a prediction API, and visualizes the predicted DNA-damage risk and feature contributions (SHAP-style).

---

## 🧭 Key Features
- Centered main title: **BioRiskAI** with subtitle *Deep Space Health Risk Predictor*  
- Interactive input form for:
  - Radiation dose (Gy or Sv)
  - Microgravity duration (days)
  - Circadian disruption (hours/day)
  - DNA damage marker (0–1 normalized, e.g., γ-H2AX)
- Prediction result card with:
  - Risk label (Low / Moderate / High)
  - Confidence score
  - Color-coded indicator
- SHAP-style feature contribution bar chart (Recharts)
- Smooth animations (Framer Motion)
- Responsive layout and NASA-inspired aesthetic

---

## 🧩 Tech Stack
- Frontend: **React** (hooks, functional components)  
- Styling: **TailwindCSS**  
- Charts: **Recharts** (SHAP feature chart)  
- Routing: **React Router**  
- HTTP: **Axios**  
- Animations: **Framer Motion** (optional)
- Fonts: Orbitron or Exo 2 (Google Fonts)

---

## 📁 Folder Structure
