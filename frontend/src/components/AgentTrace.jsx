import React, { useState } from "react";
import { Cpu, CheckCircle2, AlertTriangle, ArrowRight, Eye, EyeOff } from "lucide-react";

export default function AgentTrace({ trace, wasRevised }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!trace || trace.length === 0) return null;

  return (
    <div className="trace-container" id="agent-trace-section">
      <div className="trace-header">
        <div className="trace-title-group">
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "var(--radius-sm)",
              background: "rgba(99, 102, 241, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--primary)",
            }}
          >
            <Cpu size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Autonomous Agent Execution Trace (ReAct Loop)
            </h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Inspect how the AI reasoned, invoked tools, evaluated constraints, and self-corrected.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {wasRevised ? (
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(245, 158, 11, 0.15)",
                color: "#f59e0b",
                border: "1px solid rgba(245, 158, 11, 0.35)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <AlertTriangle size={13} />
              Auto-Revised to Fit Budget
            </span>
          ) : (
            <span
              style={{
                fontSize: "0.75rem",
                padding: "0.25rem 0.65rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
              }}
            >
              <CheckCircle2 size={13} />
              Approved on First Pass
            </span>
          )}

          <button
            type="button"
            className="pill-btn"
            onClick={() => setIsOpen(!isOpen)}
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
          >
            {isOpen ? <EyeOff size={14} /> : <Eye size={14} />}
            {isOpen ? "Collapse Trace" : "Expand Trace"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="trace-step-list">
          {trace.map((item, idx) => (
            <div key={idx} className="trace-step-item">
              <div className="trace-step-number">{item.step || idx + 1}</div>
              <div className="trace-step-content">
                <div className="trace-step-phase">
                  {item.phase || `PHASE ${idx + 1}`}
                </div>
                <div className="trace-step-action">
                  <strong>Action:</strong> {item.action}
                </div>
                {item.thought && (
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-secondary)",
                      fontStyle: "italic",
                      marginBottom: "0.35rem",
                    }}
                  >
                    💭 Agent Thought: "{item.thought}"
                  </div>
                )}
                {item.result && (
                  <div className="trace-step-result">
                    <strong>Observation:</strong> {item.result}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
