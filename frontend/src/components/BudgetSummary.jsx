import React from "react";
import {
  Wallet,
  Home,
  Utensils,
  Car,
  Compass,
  ShieldAlert,
  Info,
  DollarSign,
} from "lucide-react";

export default function BudgetSummary({ budgetSummary, currency, travelers }) {
  if (!budgetSummary) return null;

  const {
    user_budget,
    total_estimated,
    is_within_budget,
    variance,
    breakdown = {},
    per_person_cost,
    budget_status_message,
  } = budgetSummary;

  const percentUsed =
    user_budget > 0 ? Math.min(100, Math.round((total_estimated / user_budget) * 100)) : 100;

  const categories = [
    { label: "Lodging / Stay", value: breakdown.stay, icon: Home, color: "#6366f1" },
    { label: "Food & Dining", value: breakdown.food, icon: Utensils, color: "#ec4899" },
    { label: "Local Transit", value: breakdown.local_transport, icon: Car, color: "#06b6d4" },
    { label: "Intercity Travel", value: breakdown.intercity_transport, icon: Compass, color: "#8b5cf6" },
    { label: "Activities & Entry", value: breakdown.activities, icon: Wallet, color: "#f59e0b" },
    { label: "Contingency Fund (5%)", value: breakdown.contingency_fund, icon: ShieldAlert, color: "#10b981" },
  ];

  return (
    <div className="budget-summary-panel">
      <div className="glass-card">
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Budget & Financial Analysis
        </h3>

        {/* Progress Tracker */}
        <div className="budget-meter-box">
          <div className="meter-header">
            <div>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Total Estimated Cost
              </span>
              <div style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                {total_estimated?.toLocaleString()} {currency}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase" }}>
                Allocated Budget
              </span>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--text-secondary)" }}>
                {user_budget?.toLocaleString()} {currency}
              </div>
            </div>
          </div>

          <div className="progress-track">
            <div
              className={`progress-fill ${is_within_budget ? "progress-valid" : "progress-invalid"}`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            <span>{percentUsed}% of budget utilized</span>
            <span>
              {is_within_budget
                ? `Surplus: +${variance?.toLocaleString()} ${currency}`
                : `Deficit: -${Math.abs(variance)?.toLocaleString()} ${currency}`}
            </span>
          </div>
        </div>

        {/* Status Message */}
        <div
          style={{
            margin: "1rem 0",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-md)",
            background: is_within_budget ? "rgba(16, 185, 129, 0.1)" : "rgba(244, 63, 94, 0.1)",
            border: `1px solid ${is_within_budget ? "rgba(16, 185, 129, 0.3)" : "rgba(244, 63, 94, 0.3)"}`,
            color: is_within_budget ? "#34d399" : "#fb7185",
            fontSize: "0.85rem",
            fontWeight: 500,
          }}
        >
          {budget_status_message}
        </div>

        {/* Per person note */}
        {per_person_cost && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.75rem 1rem",
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "var(--radius-md)",
              marginBottom: "1rem",
              fontSize: "0.88rem",
            }}
          >
            <span style={{ color: "var(--text-secondary)" }}>Estimated Cost Per Person ({travelers} travelers):</span>
            <span style={{ fontWeight: 700, color: "#fff" }}>
              {per_person_cost.toLocaleString()} {currency} / person
            </span>
          </div>
        )}

        {/* Category Grid */}
        <div className="category-grid">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="category-card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.35rem" }}>
                  <Icon size={14} color={cat.color} />
                  <span className="category-name">{cat.label}</span>
                </div>
                <div className="category-val">
                  {cat.value ? `${cat.value.toLocaleString()} ${currency}` : `0 ${currency}`}
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "1.25rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
          }}
        >
          <Info size={14} style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>
            Benchmark cost estimates are computed deterministically by backend Python tools based on city tiers, travel duration, and travel style.
          </span>
        </div>
      </div>
    </div>
  );
}
