# AI Travel Planner using Agentic AI

An intelligent travel planning application built for college mini-projects, demonstrating **Agentic AI** concepts including autonomous planning, multi-tool function invocation, constraint validation, and reflection-based self-correction.

---

## 🌟 Key Agentic AI Highlights

Unlike typical LLM chatbots that simply hallucinate travel recommendations without verifying constraints, **WanderAgent AI** executes a **ReAct (Reason + Act + Reflect) Loop**:

1. **Perception & Benchmark Grounding**: Looks up realistic city cost benchmarks, tier classifications, and seasonal travel advisories (`get_destination_insights`).
2. **Deterministic Expense Estimation**: Calculates accurate lodging, food, local transit, intercity travel, activities, and contingency reserve using Python arithmetic (`estimate_trip_expenses`).
3. **Budget Constraint Validation**: Checks whether the trip complies with the user's budget ceiling (`validate_budget_constraint`).
4. **Autonomous Self-Correction (Reflection)**: If the trip is over budget, the agent catches the violation, dynamically downgrades accommodation tiers, substitutes premium tours with top-rated free public attractions, re-calculates, and re-validates before presenting the final plan.
5. **Execution Trace Visibility**: The React interface reveals the step-by-step agent trace so students and examiners can inspect every thought, tool call, and decision.

---

## 🛠️ Technology Stack

* **Frontend**: React.js (Vite)
* **Frontend Styling**: Vanilla CSS (Modern dark glassmorphic design system)
* **Backend**: Python 3.12 with Flask & Flask-CORS
* **LLM Engine**: Google Gemini API (`google-genai` SDK) with resilient agentic fallback
* **Agent Tools**: Pure Python functions (`tools/budget_tools.py`, `tools/travel_tools.py`)

---

## 📂 Project Architecture

```text
AgenticAI mini-project/
├── backend/
│   ├── .env                     # Your Gemini API key & port config
│   ├── .env.example             # Template for environment variables
│   ├── app.py                   # Flask REST API server (CORS enabled)
│   ├── config.py                # App configuration loader
│   ├── requirements.txt         # Python dependencies
│   ├── agent/
│   │   ├── __init__.py
│   │   ├── orchestrator.py      # Core ReAct agent orchestrator & fallback
│   │   └── prompts.py           # System prompts & schema instructions
│   ├── tools/
│   │   ├── __init__.py
│   │   ├── budget_tools.py      # Expense estimator & budget validation tools
│   │   └── travel_tools.py      # Destination insights & activity finder
│   └── data/
│       └── travel_benchmarks.json # Realistic destination rates and tiers
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx              # Main dashboard container
│       ├── index.css            # Glassmorphism design system
│       ├── services/
│       │   └── api.js           # API communication client
│       └── components/
│           ├── Navbar.jsx       # Header & live system status
│           ├── TripForm.jsx     # Preferences & constraints input form
│           ├── AgentTrace.jsx   # Visual ReAct execution trace
│           ├── ItineraryView.jsx# Day-by-day morning/afternoon/evening plan
│           ├── BudgetSummary.jsx# Financial progress & category breakdown
│           └── ChatAssistant.jsx# Interactive follow-up travel concierge
│
└── README.md
```

---

## 🚀 Quickstart Guide

### 1. Run the Flask Backend

Open a terminal in the project directory:

```bash
# Navigate to backend
cd backend

# Activate virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# (Optional) Add your Gemini API key in backend/.env:
# GEMINI_API_KEY=your_actual_key_here

# Start the Flask API
python app.py
```
> The backend server will run on `http://127.0.0.1:5000`.
> *Note: If no API key is provided, the backend automatically runs in **Resilient Agentic Engine Mode**, demonstrating the exact same tool-calling loop, budget validation, and auto-revision without external blockers.*

---

### 2. Run the React Frontend

Open a second terminal:

```bash
# Navigate to frontend
cd frontend

# Start the Vite development server
npm run dev
```
> The frontend application will run on `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Checks server health & Gemini API configuration status |
| `GET` | `/api/destinations` | Returns popular destination presets & tiers |
| `POST` | `/api/plan-trip` | Triggers the agentic ReAct loop and returns the itinerary |
| `POST` | `/api/chat-assistant` | Handles follow-up adjustments (cost reduction, duration changes) |

---

## 🎓 Demonstrating for College Viva / Evaluation

1. **Test Standard Planning**: Enter **Goa**, 4 Days, 2 Travelers, Budget ₹45,000, Moderate style. Show how the agent computes realistic expenses within budget.
2. **Test Autonomous Self-Correction**: Enter **Goa**, 4 Days, 2 Travelers, with an intentionally low budget of **₹15,000**, Moderate style.
   * Observe the **Agent Trace** badge turn to `Auto-Revised to Fit Budget`.
   * Open the trace to show examiners how the agent calculated an initial cost of ~₹40,000, caught the budget rejection, autonomously downgraded to Budget tier, swapped premium tours with free sights, and produced a feasible plan!
3. **Test Follow-Up Assistant**: Click *"Reduce cost by switching to budget activities"* in the chat widget to show dynamic plan recalculation.
