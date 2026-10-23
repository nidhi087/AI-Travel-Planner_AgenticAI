import React from "react";
import { Compass, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function Navbar({ backendStatus }) {
  const isOnline = backendStatus?.status === "healthy";

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand-wrapper">
          <div className="brand-icon-box">
            <Compass size={24} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span className="brand-title">WanderAgent AI</span>
              <span className="brand-badge">Agentic AI</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              College Mini-Project • Intelligent Travel Planner
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
          <div className="status-pill" id="backend-status-pill">
            <span
              className="status-dot"
              style={{
                backgroundColor: isOnline ? "var(--accent-emerald)" : "var(--accent-amber)",
                boxShadow: isOnline
                  ? "0 0 8px var(--accent-emerald)"
                  : "0 0 8px var(--accent-amber)",
              }}
            />
            <span>
              {isOnline
                ? backendStatus.llm_key_configured
                  ? "Gemini API Active"
                  : "Agentic Engine Active"
                : "Backend Offline"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
