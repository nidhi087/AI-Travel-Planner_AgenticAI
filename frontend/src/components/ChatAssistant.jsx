import React, { useState } from "react";
import { MessageSquare, Send, Sparkles, Loader2 } from "lucide-react";
import { askAssistant } from "../services/api";

const PRESET_PROMPTS = [
  "Reduce cost by switching to budget activities",
  "Adjust duration to 3 days",
  "Recommend evening sunset spots",
  "Are there free museums or parks here?",
];

export default function ChatAssistant({ currentPlan, onPlanUpdate }) {
  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: `Hello! I'm your AI Travel Concierge. I've designed and validated your ${currentPlan?.destination} plan. Need to adjust costs, change activities, or alter durations? Ask me anytime!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (messageToSend) => {
    const text = messageToSend || input;
    if (!text.trim() || isSending) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const response = await askAssistant(currentPlan, text);
      const agentMsg = { sender: "agent", text: response.reply };
      setMessages((prev) => [...prev, agentMsg]);

      // If agent revised the itinerary, update parent state!
      if (response.updated_plan && onPlanUpdate) {
        onPlanUpdate(response.updated_plan);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: `Apologies, I encountered an issue updating the plan: ${err.message}`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-widget" id="chat-assistant-widget">
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.85rem" }}>
        <MessageSquare size={18} color="var(--primary)" />
        <h4 style={{ fontSize: "1.05rem", fontWeight: 700 }}>AI Travel Assistant</h4>
      </div>

      <div
        style={{
          maxHeight: "260px",
          overflowY: "auto",
          paddingRight: "0.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`chat-bubble ${
              m.sender === "agent" ? "chat-bubble-agent" : "chat-bubble-user"
            }`}
          >
            {m.sender === "agent" && (
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--accent-cyan)",
                  fontWeight: 700,
                  marginBottom: "0.2rem",
                }}
              >
                TRAVEL AGENT
              </div>
            )}
            <div>{m.text}</div>
          </div>
        ))}
      </div>

      {/* Preset Chips */}
      <div className="quick-pills" style={{ marginTop: "0.75rem" }}>
        {PRESET_PROMPTS.map((p, idx) => (
          <button
            key={idx}
            type="button"
            className="pill-btn"
            style={{ fontSize: "0.72rem" }}
            onClick={() => handleSend(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="chat-input-bar"
      >
        <input
          id="chat-input-box"
          className="input-box"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask to adjust budget, swap days, or tweak activities..."
          disabled={isSending}
        />
        <button
          type="submit"
          className="pill-btn active"
          id="chat-send-btn"
          disabled={isSending || !input.trim()}
          style={{ padding: "0 1.25rem", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.3rem" }}
        >
          {isSending ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
        </button>
      </form>
    </div>
  );
}
