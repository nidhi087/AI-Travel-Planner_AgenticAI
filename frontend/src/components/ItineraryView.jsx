import React, { useState } from "react";
import {
  Sun,
  CloudSun,
  Moon,
  Lightbulb,
  Compass,
  Calendar,
  Share2,
  Check,
  Building,
  Utensils,
  MapPin,
  ExternalLink,
  Train,
  Plane,
  Bus,
  Car,
  CloudRain,
  Star,
  Info,
  ShieldCheck,
  Clock
} from "lucide-react";

export default function ItineraryView({ plan }) {
  const [copied, setCopied] = useState(false);

  if (!plan || !plan.itinerary) return null;

  const {
    destination,
    starting_location,
    duration_days,
    departure_date,
    return_date,
    travelers,
    adults,
    children,
    seniors,
    travel_style,
    food_preference,
    summary,
    best_season,
    travel_tips,
    transit_advice,
    weather,
    transit_options,
    accommodations = [],
    must_try_foods = [],
    itinerary = [],
  } = plan;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `AI Travel Plan: ${starting_location} to ${destination} (${duration_days} Days, ${travel_style} tier):\n${summary}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierClass = (tier) => {
    const t = (tier || "").toLowerCase();
    if (t.includes("free")) return "tier-free";
    if (t.includes("premium")) return "tier-premium";
    return "tier-budget";
  };

  return (
    <div id="itinerary-display-container">
      {/* Destination Header Banner */}
      <div
        className="glass-card"
        style={{
          marginBottom: "1.75rem",
          background: "linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)",
          border: "1px solid rgba(99, 102, 241, 0.3)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
              <span className="brand-badge">{travel_style} Tier</span>
              {departureDate && returnDate && (
                <span className="brand-badge" style={{ background: "rgba(245, 158, 11, 0.15)", borderColor: "rgba(245, 158, 11, 0.3)", color: "#f59e0b" }}>
                  📅 {departure_date} to {return_date}
                </span>
              )}
              <span className="brand-badge" style={{ background: "rgba(6, 182, 212, 0.15)", borderColor: "rgba(6, 182, 212, 0.3)", color: "#38bdf8" }}>
                {best_season ? `Best Season: ${best_season}` : "All Year"}
              </span>
            </div>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              {starting_location} → {destination} ({duration_days} Days)
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "750px" }}>
              {summary}
            </p>
          </div>

          <button
            type="button"
            className="pill-btn"
            onClick={handleShare}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem" }}
          >
            {copied ? <Check size={16} color="var(--accent-emerald)" /> : <Share2 size={16} />}
            {copied ? "Copied Link!" : "Share Itinerary"}
          </button>
        </div>

        {/* Live Weather & Local Advisory Bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.75rem", marginTop: "1.25rem" }}>
          {weather && (
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "rgba(0, 0, 0, 0.35)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
                fontSize: "0.85rem",
                color: "#7dd3fc",
                border: "1px solid rgba(56, 189, 248, 0.25)",
              }}
            >
              <CloudSun size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ color: "#fff" }}>Live Destination Climate:</strong> {weather.current_temperature_c}°C ({weather.condition})
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                  {weather.advisory}
                </div>
              </div>
            </div>
          )}

          {transit_advice && (
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "rgba(0, 0, 0, 0.35)",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.6rem",
                fontSize: "0.85rem",
                color: "#a5b4fc",
                border: "1px solid rgba(99, 102, 241, 0.25)",
              }}
            >
              <Compass size={18} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <strong style={{ color: "#fff" }}>Local Transit & Drops:</strong>
                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                  {transit_advice}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Intercity Transportation & Booking Options Card */}
      {transit_options && transit_options.options && transit_options.options.length > 0 && (
        <div className="glass-card" style={{ marginBottom: "1.75rem" }} id="intercity-transit-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Train size={20} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Intercity Travel Options ({starting_location} ➔ {destination})
              </h3>
            </div>
            {transit_options.road_distance_km > 0 && (
              <span className="brand-badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", borderColor: "rgba(16, 185, 129, 0.3)" }}>
                Route Distance: {transit_options.road_distance_km} km
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Calculated distance-based fares, journey durations, and direct links to official booking portals.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {transit_options.options.map((opt, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(15, 22, 36, 0.8)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "#fff" }}>{opt.mode}</div>
                    <span className="tier-badge tier-budget">{opt.tier}</span>
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--accent-cyan)", marginBottom: "0.4rem" }}>
                    ⏱️ {opt.duration_formatted}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
                    {opt.advisory}
                  </div>

                  {opt.classes && (
                    <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                      {opt.classes.map((cls, cIdx) => (
                        <span key={cIdx} className="amenity-tag" style={{ fontSize: "0.72rem" }}>
                          {cls.class}: ₹{cls.fare_per_person.toLocaleString()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border-subtle)" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Total for {travelers} traveler(s):</span>
                    <div style={{ fontWeight: 800, color: "var(--accent-emerald)", fontSize: "1.05rem" }}>
                      ₹{opt.total_estimated_fare?.toLocaleString()}
                    </div>
                  </div>
                  <a
                    href={opt.booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-btn active"
                    style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.78rem" }}
                  >
                    <span>{opt.booking_portal.split("/")[0]}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accommodations & Hotel Recommendations Card */}
      {accommodations && accommodations.length > 0 && (
        <div className="glass-card" style={{ marginBottom: "1.75rem" }} id="hotel-recommendations-card">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <Building size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              Verified Stays & Hotel Comparison ({accommodations.length} Options)
            </h3>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Curated verified stays matched to your {travel_style} travel tier, with address, ratings, and booking links.
          </p>

          <div className="hotels-grid">
            {accommodations.map((hotel, idx) => (
              <div key={idx} className="hotel-card">
                <div>
                  <div className="hotel-header">
                    <div>
                      <div className="hotel-name">{hotel.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--accent-cyan)", fontWeight: 600 }}>
                        {hotel.type}
                      </div>
                    </div>
                    <div className="hotel-price">{hotel.price_per_night}</div>
                  </div>

                  <div className="hotel-meta">
                    <MapPin size={13} color="var(--accent-amber)" />
                    <span>{hotel.neighborhood || hotel.address}</span>
                  </div>

                  {hotel.distance_to_center && (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
                      📍 {hotel.distance_to_center}
                    </div>
                  )}

                  {hotel.rating && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.78rem", color: "#fcd34d", marginBottom: "0.5rem" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontWeight: 700 }}>
                        <Star size={13} fill="#fcd34d" /> {hotel.rating}
                      </span>
                      {hotel.review_count && (
                        <span style={{ color: "var(--text-muted)", fontSize: "0.72rem" }}>({hotel.review_count})</span>
                      )}
                    </div>
                  )}

                  {hotel.amenities && (
                    <div className="hotel-amenities">
                      {hotel.amenities.map((a, aIdx) => (
                        <span key={aIdx} className="amenity-tag">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}

                  {hotel.why_recommended && (
                    <div className="hotel-reason" style={{ marginBottom: "0.75rem" }}>
                      <strong>💡 Why this stay:</strong> {hotel.why_recommended}
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  {hotel.booking_url && (
                    <a
                      href={hotel.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-btn active"
                      style={{ flex: 1, textDecoration: "none", textAlign: "center", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "0.3rem" }}
                    >
                      <span>Check Rates</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {hotel.makemytrip_url && (
                    <a
                      href={hotel.makemytrip_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pill-btn"
                      style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}
                    >
                      <span>MakeMyTrip</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regional Must-Try Foods Section */}
      {must_try_foods && must_try_foods.length > 0 && (
        <div className="glass-card" style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <Utensils size={20} color="var(--accent-amber)" />
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              Regional Culinary Highlights & Must-Try Specialties
            </h3>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            Iconic regional food dishes, flavors, and famous spots in {destination}.
          </p>

          <div className="must-try-grid">
            {must_try_foods.map((food, fIdx) => (
              <div key={fIdx} className="food-item-card">
                <div className="food-name">🍴 {food.dish}</div>
                <div className="food-desc">{food.description}</div>
                {food.recommended_spot && (
                  <div className="food-spot">
                    <strong>Recommended Spot:</strong> {food.recommended_spot}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Day by Day Schedule with Verified Sights & Dining Guide */}
      <div>
        <h3 style={{ fontSize: "1.35rem", fontWeight: 800, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Calendar size={22} color="var(--primary)" /> Day-by-Day Comprehensive Research Itinerary
        </h3>

        {itinerary.map((day) => (
          <div key={day.day} className="day-card" id={`itinerary-day-${day.day}`}>
            <div className="day-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                <span className="day-badge">Day {day.day}</span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700 }}>{day.title}</h3>
              </div>
            </div>

            {/* Where to Go (Morning, Afternoon, Evening) */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
                📍 Where to Go & Sightseeing Schedule
              </div>
              <div className="time-slots">
                {/* Morning */}
                <div className="slot-box">
                  <div className="slot-title">
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <Sun size={14} color="#f59e0b" /> Morning {day.morning?.time ? `(${day.morning.time})` : ""}
                    </span>
                    <span className={`tier-badge ${getTierClass(day.morning?.cost_tier)}`}>
                      {day.morning?.ticket_cost || "Free"}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem", display: "flex", justifyContent: "space-between" }}>
                    <span>{day.morning?.place_to_visit || day.morning?.activity}</span>
                    {day.morning?.map_url && (
                      <a href={day.morning.map_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)" }}>
                        <MapPin size={15} />
                      </a>
                    )}
                  </div>
                  {day.morning?.place_to_visit && (
                    <div className="slot-activity" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {day.morning?.activity}
                    </div>
                  )}
                  {day.morning?.how_to_reach && (
                    <div style={{ fontSize: "0.75rem", color: "#38bdf8", marginTop: "auto", paddingTop: "0.3rem" }}>
                      🚗 <strong>Transit:</strong> {day.morning.how_to_reach}
                    </div>
                  )}
                </div>

                {/* Afternoon */}
                <div className="slot-box">
                  <div className="slot-title">
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <CloudSun size={14} color="#06b6d4" /> Afternoon {day.afternoon?.time ? `(${day.afternoon.time})` : ""}
                    </span>
                    <span className={`tier-badge ${getTierClass(day.afternoon?.cost_tier)}`}>
                      {day.afternoon?.ticket_cost || "Free"}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem", display: "flex", justifyContent: "space-between" }}>
                    <span>{day.afternoon?.place_to_visit || day.afternoon?.activity}</span>
                    {day.afternoon?.map_url && (
                      <a href={day.afternoon.map_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)" }}>
                        <MapPin size={15} />
                      </a>
                    )}
                  </div>
                  {day.afternoon?.place_to_visit && (
                    <div className="slot-activity" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {day.afternoon?.activity}
                    </div>
                  )}
                  {day.afternoon?.how_to_reach && (
                    <div style={{ fontSize: "0.75rem", color: "#38bdf8", marginTop: "auto", paddingTop: "0.3rem" }}>
                      🚗 <strong>Transit:</strong> {day.afternoon.how_to_reach}
                    </div>
                  )}
                </div>

                {/* Evening */}
                <div className="slot-box">
                  <div className="slot-title">
                    <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                      <Moon size={14} color="#a855f7" /> Evening {day.evening?.time ? `(${day.evening.time})` : ""}
                    </span>
                    <span className={`tier-badge ${getTierClass(day.evening?.cost_tier)}`}>
                      {day.evening?.ticket_cost || "Free"}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem", display: "flex", justifyContent: "space-between" }}>
                    <span>{day.evening?.place_to_visit || day.evening?.activity}</span>
                    {day.evening?.map_url && (
                      <a href={day.evening.map_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-cyan)" }}>
                        <MapPin size={15} />
                      </a>
                    )}
                  </div>
                  {day.evening?.place_to_visit && (
                    <div className="slot-activity" style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {day.evening?.activity}
                    </div>
                  )}
                  {day.evening?.how_to_reach && (
                    <div style={{ fontSize: "0.75rem", color: "#38bdf8", marginTop: "auto", paddingTop: "0.3rem" }}>
                      🚗 <strong>Transit:</strong> {day.evening.how_to_reach}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dining Guide (Breakfast, Lunch, Dinner) */}
            {day.meals && (
              <div className="dining-section">
                <div className="dining-header">
                  <Utensils size={15} /> Dining Guide (Where to Eat on Day {day.day})
                </div>
                <div className="meals-grid">
                  {day.meals.breakfast && (
                    <div className="meal-box">
                      <div className="meal-type">☕ Breakfast Spot</div>
                      <div className="meal-restaurant">{day.meals.breakfast.restaurant}</div>
                      <div className="meal-dish"><strong>Must-Try:</strong> {day.meals.breakfast.must_try}</div>
                      <div className="meal-cost">💵 Est. Cost: {day.meals.breakfast.approx_cost}</div>
                    </div>
                  )}

                  {day.meals.lunch && (
                    <div className="meal-box">
                      <div className="meal-type">🍲 Lunch Spot</div>
                      <div className="meal-restaurant">{day.meals.lunch.restaurant}</div>
                      <div className="meal-dish"><strong>Must-Try:</strong> {day.meals.lunch.must_try}</div>
                      <div className="meal-cost">💵 Est. Cost: {day.meals.lunch.approx_cost}</div>
                    </div>
                  )}

                  {day.meals.dinner && (
                    <div className="meal-box">
                      <div className="meal-type">🍽️ Dinner Spot</div>
                      <div className="meal-restaurant">{day.meals.dinner.restaurant}</div>
                      <div className="meal-dish"><strong>Must-Try:</strong> {day.meals.dinner.must_try}</div>
                      <div className="meal-cost">💵 Est. Cost: {day.meals.dinner.approx_cost}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Insider Tip */}
            {day.insider_tip && (
              <div className="insider-tip">
                <Lightbulb size={18} style={{ flexShrink: 0, marginTop: "1px" }} />
                <span>
                  <strong>Insider Recommendation:</strong> {day.insider_tip}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
