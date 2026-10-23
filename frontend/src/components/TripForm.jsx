import React, { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Sparkles,
  Compass,
  Train,
  Utensils,
  CheckSquare,
  Accessibility,
  Tag,
  Loader2,
  Plane,
  Bus,
  Car
} from "lucide-react";

const POPULAR_DESTINATIONS = [
  { name: "Udaipur, Rajasthan", defaultBudget: 16000 },
  { name: "Goa (North & South)", defaultBudget: 22000 },
  { name: "Jaipur, Rajasthan", defaultBudget: 15000 },
  { name: "Kerala (Kochi & Munnar)", defaultBudget: 25000 },
  { name: "Manali, Himachal Pradesh", defaultBudget: 20000 },
  { name: "Mumbai, Maharashtra", defaultBudget: 18000 },
  { name: "Delhi & Agra", defaultBudget: 16000 },
  { name: "Varanasi, Uttar Pradesh", defaultBudget: 14000 },
];

const POPULAR_ORIGINS = ["Mumbai", "Delhi", "Bengaluru", "Ahmedabad", "Pune", "Kolkata"];

const AVAILABLE_INTERESTS = [
  "Heritage & Forts",
  "Lakes & Waterfronts",
  "Authentic Local Food",
  "Street Bazaars & Shopping",
  "Temples & Spirituality",
  "Nature & Mountains",
  "Sunset Photography",
  "Adventure & Treks"
];

export default function TripForm({ onSubmit, isLoading }) {
  const [destination, setDestination] = useState("Udaipur, Rajasthan");
  const [startingLocation, setStartingLocation] = useState("Mumbai");
  
  // Date handling
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const [departureDate, setDepartureDate] = useState(today);
  const [returnDate, setReturnDate] = useState(nextWeek);
  const [durationDays, setDurationDays] = useState(4);

  // Traveler demographics
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [seniors, setSeniors] = useState(0);

  // Financials & Style
  const [budget, setBudget] = useState(16000);
  const [currency, setCurrency] = useState("INR");
  const [travelStyle, setTravelStyle] = useState("Moderate");
  const [transportMode, setTransportMode] = useState("Train");
  
  // Food & Accessibility
  const [foodPreference, setFoodPreference] = useState("Pure Vegetarian (Jain Available)");
  const [accessibility, setAccessibility] = useState("Standard");
  const [selectedInterests, setSelectedInterests] = useState([
    "Heritage & Forts",
    "Lakes & Waterfronts",
    "Authentic Local Food"
  ]);

  // Budget Inclusions
  const [includeIntercity, setIncludeIntercity] = useState(true);
  const [includeStay, setIncludeStay] = useState(true);
  const [includeMeals, setIncludeMeals] = useState(true);
  const [includeActivities, setIncludeActivities] = useState(true);

  // Auto-update duration when dates change
  useEffect(() => {
    if (departureDate && returnDate) {
      const d1 = new Date(departureDate);
      const d2 = new Date(returnDate);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      setDurationDays(diffDays);
    }
  }, [departureDate, returnDate]);

  const totalTravelers = adults + children + seniors;

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      destination,
      starting_location: startingLocation,
      departure_date: departureDate,
      return_date: returnDate,
      duration_days: durationDays,
      travelers: totalTravelers,
      adults,
      children,
      seniors,
      total_budget: Number(budget),
      currency,
      travel_style: travelStyle,
      transport_mode: transportMode,
      food_preference: foodPreference,
      interests: selectedInterests,
      accessibility,
      include_intercity_transit: includeIntercity,
      budget_inclusions: {
        intercity_transit: includeIntercity,
        accommodation: includeStay,
        meals: includeMeals,
        activities: includeActivities,
        local_transport: true,
        contingency: true
      }
    });
  };

  return (
    <div className="glass-card" id="trip-planner-form-card">
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.3rem" }}>
          Configure Your Indian Journey
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Ground your travel in real research data: verified attractions, live OSRM routing, live weather, and realistic Indian Railways/transit fares.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Starting Location */}
          <div className="form-group">
            <label className="form-label" htmlFor="origin-input">
              <Compass size={15} color="var(--primary)" /> Starting City / Origin
            </label>
            <input
              id="origin-input"
              className="input-box"
              type="text"
              value={startingLocation}
              onChange={(e) => setStartingLocation(e.target.value)}
              placeholder="e.g. Mumbai, Delhi, Bengaluru"
              required
            />
            <div className="quick-pills">
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", alignSelf: "center" }}>Popular:</span>
              {POPULAR_ORIGINS.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={`pill-btn ${startingLocation === city ? "active" : ""}`}
                  onClick={() => setStartingLocation(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Destination */}
          <div className="form-group">
            <label className="form-label" htmlFor="destination-input">
              <MapPin size={15} color="var(--accent-cyan)" /> Destination City / Region
            </label>
            <input
              id="destination-input"
              className="input-box"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Udaipur, Goa, Jaipur, Kerala, Manali"
              required
            />
            <div className="quick-pills">
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", alignSelf: "center" }}>Top:</span>
              {POPULAR_DESTINATIONS.map((dest) => (
                <button
                  key={dest.name}
                  type="button"
                  className={`pill-btn ${destination === dest.name ? "active" : ""}`}
                  onClick={() => {
                    setDestination(dest.name);
                    setBudget(dest.defaultBudget);
                  }}
                >
                  {dest.name.split(",")[0].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Dates */}
          <div className="form-group">
            <label className="form-label" htmlFor="departure-date">
              <Calendar size={15} color="var(--accent-amber)" /> Departure Date
            </label>
            <input
              id="departure-date"
              className="input-box"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="return-date">
              <Calendar size={15} color="var(--accent-amber)" /> Return Date ({durationDays} Days)
            </label>
            <input
              id="return-date"
              className="input-box"
              type="date"
              min={departureDate}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </div>

          {/* Traveler Demographics */}
          <div className="form-group" style={{ gridColumn: "span 2" }}>
            <label className="form-label">
              <Users size={15} color="var(--accent-cyan)" /> Traveler Breakdown ({totalTravelers} Total)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              <div style={{ background: "rgba(15, 22, 36, 0.8)", padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Adults (12+ yrs)</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
                  <button type="button" className="pill-btn" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>{adults}</span>
                  <button type="button" className="pill-btn" onClick={() => setAdults(adults + 1)}>+</button>
                </div>
              </div>

              <div style={{ background: "rgba(15, 22, 36, 0.8)", padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Children (2-11 yrs)</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
                  <button type="button" className="pill-btn" onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>{children}</span>
                  <button type="button" className="pill-btn" onClick={() => setChildren(children + 1)}>+</button>
                </div>
              </div>

              <div style={{ background: "rgba(15, 22, 36, 0.8)", padding: "0.6rem 0.85rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Seniors (60+ yrs)</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
                  <button type="button" className="pill-btn" onClick={() => setSeniors(Math.max(0, seniors - 1))}>-</button>
                  <span style={{ fontWeight: 700, fontSize: "1rem" }}>{seniors}</span>
                  <button type="button" className="pill-btn" onClick={() => setSeniors(seniors + 1)}>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Total Budget & Preferred Transit */}
          <div className="form-group">
            <label className="form-label" htmlFor="budget-input">
              <Wallet size={15} color="var(--accent-emerald)" /> Total Trip Budget Ceiling
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <select
                className="input-box"
                style={{ width: "95px", flexShrink: 0 }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
              <input
                id="budget-input"
                className="input-box"
                type="number"
                min="1000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Budget limit for all travelers"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="transport-select">
              <Train size={15} color="var(--accent-cyan)" /> Preferred Intercity Mode
            </label>
            <select
              id="transport-select"
              className="input-box"
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
            >
              <option value="Train">Train (Indian Railways - Sleeper / 3AC / 2AC)</option>
              <option value="Flight">Flight (Fastest Domestic Air)</option>
              <option value="Bus">Intercity AC Sleeper Bus (Volvo / BharatBenz)</option>
              <option value="Self-Drive">Self-Drive / Outstation Cab</option>
            </select>
          </div>

          {/* Food Preferences & Accessibility */}
          <div className="form-group">
            <label className="form-label">
              <Utensils size={15} color="#ec4899" /> Food & Dietary Preference
            </label>
            <select
              className="input-box"
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
            >
              <option value="Pure Vegetarian (Jain Available)">Pure Vegetarian (Jain Options Available)</option>
              <option value="Authentic Regional Cuisine & Thalis">Authentic Regional Specialities & Thalis</option>
              <option value="Non-Vegetarian & Seafood">Non-Vegetarian & Coastal / Meat Specialities</option>
              <option value="Multi-Cuisine / Flexible">Multi-Cuisine / Flexible</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Accessibility size={15} color="#a855f7" /> Accessibility Requirements
            </label>
            <select
              className="input-box"
              value={accessibility}
              onChange={(e) => setAccessibility(e.target.value)}
            >
              <option value="Standard">Standard Pace (Walking & Ghat Stairs)</option>
              <option value="Senior-Friendly">Senior-Friendly (Minimal Stairs & Easy Drops)</option>
              <option value="Wheelchair Accessible">Wheelchair / Elevator Accessible Priority</option>
            </select>
          </div>
        </div>

        {/* Budget Inclusions Checkboxes */}
        <div style={{ background: "rgba(15, 22, 36, 0.6)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.6rem", textTransform: "uppercase" }}>
            Budget Inclusions (What should count against your total budget ceiling?)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0.6rem", fontSize: "0.85rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={includeIntercity}
                onChange={(e) => setIncludeIntercity(e.target.checked)}
                style={{ accentColor: "var(--primary)" }}
              />
              <span>Include intercity travel from {startingLocation || "origin"}</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={includeStay}
                onChange={(e) => setIncludeStay(e.target.checked)}
                style={{ accentColor: "var(--primary)" }}
              />
              <span>Include accommodation / hotels</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={includeMeals}
                onChange={(e) => setIncludeMeals(e.target.checked)}
                style={{ accentColor: "var(--primary)" }}
              />
              <span>Include daily dining & meals</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.45rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={includeActivities}
                onChange={(e) => setIncludeActivities(e.target.checked)}
                style={{ accentColor: "var(--primary)" }}
              />
              <span>Include sightseeing & entrance tickets</span>
            </label>
          </div>
        </div>

        {/* Travel Style Selector */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label className="form-label" style={{ marginBottom: "0.75rem" }}>
            Travel Style Tier
          </label>
          <div className="style-selector">
            {[
              {
                id: "Budget",
                name: "Budget Backpacker",
                desc: "Zostel/hostels, Sleeper/3AC train, thali halls, free sights",
              },
              {
                id: "Moderate",
                name: "Comfort & Heritage",
                desc: "Boutique havelis, 3AC train/flight, authentic lakeside dining",
              },
              {
                id: "Luxury",
                name: "Royal Palace Luxury",
                desc: "Palace resorts, private cabs/flights, fine dining, VIP boat tours",
              },
            ].map((style) => (
              <div
                key={style.id}
                className={`style-card ${travelStyle === style.id ? "selected" : ""}`}
                onClick={() => setTravelStyle(style.id)}
              >
                <div className="style-name">{style.name}</div>
                <div className="style-desc">{style.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div style={{ marginBottom: "1.75rem" }}>
          <label className="form-label" style={{ marginBottom: "0.6rem" }}>
            <Tag size={15} /> Travel Interests
          </label>
          <div className="quick-pills">
            {AVAILABLE_INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                className={`pill-btn ${selectedInterests.includes(interest) ? "active" : ""}`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary"
          id="generate-plan-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="spin" style={{ animation: "spin 1s linear infinite" }} />
              Agent Researching Real Data & Calculating...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Deploy Research-Based AI Travel Agent
            </>
          )}
        </button>
      </form>
    </div>
  );
}
