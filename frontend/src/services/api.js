const API_BASE = "http://127.0.0.1:5000/api";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return await res.json();
  } catch (err) {
    console.warn("Backend not responding:", err.message);
    return { status: "offline", error: err.message };
  }
}

export async function getPopularDestinations() {
  try {
    const res = await fetch(`${API_BASE}/destinations`);
    if (!res.ok) throw new Error("Failed to load destinations");
    return await res.json();
  } catch (err) {
    return { popular: [] };
  }
}

export async function searchDestinations(query) {
  try {
    const res = await fetch(`${API_BASE}/destinations/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    return [];
  }
}

export async function getTransitOptions(origin, destination, travelers = 2) {
  try {
    const res = await fetch(`${API_BASE}/transit-options`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin, destination, travelers }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.transit || null;
  } catch (err) {
    return null;
  }
}

export async function planTripWithAgent(tripData) {
  const res = await fetch(`${API_BASE}/plan-trip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tripData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to generate plan");
  }
  return data;
}

export async function askAssistant(currentPlan, message) {
  const res = await fetch(`${API_BASE}/chat-assistant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ current_plan: currentPlan, message }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Failed to process chat message");
  }
  return data;
}
