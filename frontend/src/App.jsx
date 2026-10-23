import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import TripForm from "./components/TripForm";
import AgentTrace from "./components/AgentTrace";
import ItineraryView from "./components/ItineraryView";
import BudgetSummary from "./components/BudgetSummary";
import ChatAssistant from "./components/ChatAssistant";
import { checkBackendHealth, planTripWithAgent } from "./services/api";
import { Sparkles, Bot, AlertCircle, RefreshCw } from "lucide-react";

export default function App() {
  const [backendStatus, setBackendStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);

  useEffect(() => {
    async function loadStatus() {
      const status = await checkBackendHealth();
      setBackendStatus(status);
    }
    loadStatus();
  }, []);

  const handlePlanSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await planTripWithAgent(formData);
      setTripPlan(plan);
      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById("results-dashboard");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to generate travel plan. Please check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanUpdate = (newPlan) => {
    setTripPlan(newPlan);
  };

  return (
    <div className="app-layout">
      <Navbar backendStatus={backendStatus} />

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-tagline">
            <Sparkles size={14} color="var(--primary)" />
            <span>Autonomous Multi-Tool Reasoning & Cost Optimization</span>
          </div>
          <h1 className="hero-title">
            Intelligent Travel Planning with{" "}
            <span className="gradient-text">Agentic AI</span>
          </h1>
          <p className="hero-subtitle">
            Not just a text generator. Our agent autonomously drafts itineraries, calculates realistic
            travel & stay expenses with Python tools, validates budget constraints, and self-corrects
            when budgets are exceeded.
          </p>
        </section>

        {/* Input Form */}
        <TripForm onSubmit={handlePlanSubmit} isLoading={isLoading} />

        {/* Loading Indicator */}
        {isLoading && (
          <div
            className="glass-card"
            style={{
              marginTop: "2rem",
              textAlign: "center",
              padding: "2.5rem",
              border: "1px solid rgba(99, 102, 241, 0.4)",
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(6, 182, 212, 0.08) 100%)",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--primary-gradient)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                marginBottom: "1rem",
                boxShadow: "var(--shadow-glow)",
                animation: "pulse 1.8s infinite ease-in-out",
              }}
            >
              <Bot size={30} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Agent Reasoning in Progress...
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.92rem", maxWidth: "540px", margin: "0 auto" }}>
              Invoking destination benchmark tools → Computing stay & travel breakdown → Evaluating budget constraint → Reflecting and revising if needed.
            </p>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div
            className="glass-card"
            style={{
              marginTop: "2rem",
              borderColor: "rgba(244, 63, 94, 0.4)",
              background: "rgba(244, 63, 94, 0.08)",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <AlertCircle size={24} color="var(--accent-rose)" />
            <div>
              <div style={{ fontWeight: 700, color: "#fff" }}>Agent Execution Alert</div>
              <div style={{ fontSize: "0.88rem", color: "#fca5a5" }}>{error}</div>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {tripPlan && (
          <div id="results-dashboard" style={{ marginTop: "3rem" }}>
            {/* Show Agent ReAct Trace */}
            <AgentTrace
              trace={tripPlan.agent_trace}
              wasRevised={tripPlan.was_revised_by_agent}
            />

            <div className="results-grid">
              {/* Left Column: Itinerary Day-by-Day */}
              <div>
                <ItineraryView plan={tripPlan} />
              </div>

              {/* Right Column: Budget Breakdown & Interactive Assistant */}
              <div>
                <BudgetSummary
                  budgetSummary={tripPlan.budget_summary}
                  currency={tripPlan.currency}
                  travelers={tripPlan.travelers}
                />

                <ChatAssistant
                  currentPlan={tripPlan}
                  onPlanUpdate={handlePlanUpdate}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          <strong>AI Travel Planner using Agentic AI</strong> • College Mini-Project Implementation
        </p>
        <p style={{ marginTop: "0.25rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
          Built with React (Vite) + Python (Flask) + Google Gemini SDK + ReAct Autonomous Tool Execution
        </p>
      </footer>
    </div>
  );
}
