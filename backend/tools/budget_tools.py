import math
from typing import Dict, Any, Optional, List

def estimate_trip_expenses(
    destination: str,
    duration_days: int,
    travelers: int = 2,
    travel_style: str = "Moderate",
    intercity_transport_mode: str = "Train",
    include_intercity_transit: bool = True,
    transit_research: Optional[Dict[str, Any]] = None,
    adults: int = 2,
    children: int = 0,
    seniors: int = 0,
    budget_inclusions: Optional[Dict[str, bool]] = None,
    currency: str = "INR"
) -> Dict[str, Any]:
    """
    Deterministically calculates realistic travel expenses based on real distances,
    traveler age demographics, and customizable budget inclusions.
    """
    duration_days = max(1, int(duration_days))
    travelers = max(1, int(travelers))
    nights = max(1, duration_days - 1)
    
    # Calculate room requirements: 2 adults per room
    effective_adults = max(1, adults + (1 if children > 1 else 0))
    rooms_needed = math.ceil(effective_adults / 2)

    inclusions = budget_inclusions or {
        "intercity_transit": include_intercity_transit,
        "accommodation": True,
        "meals": True,
        "local_transport": True,
        "activities": True,
        "contingency": True
    }

    # Base daily rates according to travel style
    style_key = travel_style.title()
    if style_key == "Budget":
        stay_per_night = 1300
        food_per_adult_day = 650
        local_transit_per_day = 400
        activities_per_adult_day = 350
    elif style_key == "Luxury":
        stay_per_night = 8500
        food_per_adult_day = 2800
        local_transit_per_day = 2000
        activities_per_adult_day = 2200
    else:  # Moderate
        stay_per_night = 3200
        food_per_adult_day = 1350
        local_transit_per_day = 850
        activities_per_adult_day = 950

    # 1. Lodging expense
    total_stay = (nights * stay_per_night * rooms_needed) if inclusions.get("accommodation", True) else 0

    # 2. Food expense (Children consume ~60% of adult meal budget)
    food_effective_count = adults + (children * 0.6) + (seniors * 0.9)
    total_food = round(duration_days * food_per_adult_day * food_effective_count) if inclusions.get("meals", True) else 0

    # 3. Local transit expense (with group cab sharing factor)
    sharing_factor = 0.70 if travelers > 1 else 1.0
    total_local_transit = round(duration_days * local_transit_per_day * travelers * sharing_factor) if inclusions.get("local_transport", True) else 0

    # 4. Activities & Sightseeing tickets
    act_effective_count = adults + (children * 0.5) + (seniors * 0.7)
    total_activities = round(duration_days * activities_per_adult_day * act_effective_count) if inclusions.get("activities", True) else 0

    # 5. Intercity Travel estimation
    total_intercity = 0
    intercity_unit_fare = 0
    chosen_mode = intercity_transport_mode
    dist_km = 0

    if transit_research and "options" in transit_research:
        dist_km = transit_research.get("road_distance_km", 0)
        mode_lower = intercity_transport_mode.lower()
        matched_opt = None
        for opt in transit_research["options"]:
            if any(w in opt["mode"].lower() for w in mode_lower.split()):
                matched_opt = opt
                break
        if not matched_opt and len(transit_research["options"]) > 0:
            matched_opt = transit_research["options"][0]

        if matched_opt:
            intercity_unit_fare = matched_opt.get("recommended_fare_per_person") or matched_opt.get("fare_per_person", 1200)
            chosen_mode = matched_opt["mode"]
            total_intercity = intercity_unit_fare * travelers
    else:
        # Fallback flat benchmark if origin = destination
        if "flight" in intercity_transport_mode.lower():
            intercity_unit_fare = 4500
        elif "train" in intercity_transport_mode.lower():
            intercity_unit_fare = 950
        elif "bus" in intercity_transport_mode.lower():
            intercity_unit_fare = 650
        else:
            intercity_unit_fare = 0
        total_intercity = intercity_unit_fare * travelers

    # Only include intercity transit in the budget ceiling if user opted in
    transit_counted_in_budget = total_intercity if inclusions.get("intercity_transit", True) else 0

    # Subtotal and 5% contingency reserve
    subtotal = total_stay + total_food + total_local_transit + total_activities + transit_counted_in_budget
    contingency = round(subtotal * 0.05) if inclusions.get("contingency", True) else 0
    total_budgeted_cost = subtotal + contingency

    # Assumptions breakdown
    assumptions: List[str] = [
        f"Accommodation: {rooms_needed} room(s) for {nights} night(s) at {currency} {stay_per_night:,}/room/night ({style_key} tier).",
        f"Dining: Estimated for {travelers} traveler(s) ({adults} adult(s), {children} child(ren)) across {duration_days} days.",
        f"Local transit: Auto-rickshaws, shared taxis, or day rentals with group sharing optimization applied."
    ]
    if inclusions.get("intercity_transit", True) and total_intercity > 0:
        assumptions.append(f"Intercity travel ({chosen_mode}): {currency} {intercity_unit_fare:,} per traveler (Counted in total budget).")
    elif total_intercity > 0:
        assumptions.append(f"Intercity travel ({chosen_mode}): {currency} {intercity_unit_fare:,} per traveler (Tracked separately; excluded from destination budget ceiling by user preference).")

    return {
        "status": "success",
        "destination": destination,
        "currency": currency,
        "travel_style": style_key,
        "duration_days": duration_days,
        "nights": nights,
        "travelers": travelers,
        "breakdown": {
            "stay": total_stay,
            "food": total_food,
            "local_transport": total_local_transit,
            "activities": total_activities,
            "intercity_transport": transit_counted_in_budget,
            "intercity_transport_total": total_intercity,
            "contingency_fund": contingency
        },
        "total_estimated_cost": total_budgeted_cost,
        "per_person_cost": round(total_budgeted_cost / travelers),
        "inclusions": inclusions,
        "assumptions": assumptions,
        "rates_basis": {
            "stay_per_night": stay_per_night,
            "rooms_count": rooms_needed,
            "food_per_adult_day": food_per_adult_day,
            "transit_distance_km": dist_km
        }
    }

def validate_budget_constraint(
    estimated_total: float,
    user_budget: float,
    currency: str = "INR"
) -> Dict[str, Any]:
    """
    Evaluates whether estimated trip costs comply with the user's budget.
    """
    estimated_total = float(estimated_total)
    user_budget = float(user_budget)
    variance = user_budget - estimated_total
    
    is_valid = variance >= 0
    
    if is_valid:
        surplus_pct = round((variance / user_budget) * 100, 1) if user_budget > 0 else 0
        return {
            "is_valid": True,
            "status": "APPROVED",
            "message": f"Trip plan fits within budget. Remaining surplus: {currency} {round(variance, 2):,} ({surplus_pct}%).",
            "variance": round(variance, 2),
            "surplus_amount": round(variance, 2),
            "excess_amount": 0.0,
            "action_required": "None. Plan is financially feasible."
        }
    else:
        excess = abs(variance)
        excess_pct = round((excess / user_budget) * 100, 1) if user_budget > 0 else 100
        severity = "Mild" if excess_pct <= 15 else ("Moderate" if excess_pct <= 40 else "Severe")
        
        recommendations = []
        if severity == "Mild":
            recommendations.append("Choose free public walking tours and lake ghats over paid private boat rentals.")
            recommendations.append("Opt for local autorickshaws or scooter rentals instead of private cabs.")
        elif severity == "Moderate":
            recommendations.append("Downgrade accommodation tier (e.g., choose a boutique heritage hostel like Moustache/Zostel with private rooms).")
            recommendations.append("Choose Indian Railways 3AC/Sleeper instead of flights for intercity travel.")
        else:  # Severe
            recommendations.append("Shift accommodation strictly to verified Budget tier hostels/guesthouses.")
            recommendations.append("Opt for Sleeper class train tickets or overnight sleeper buses.")
            recommendations.append("Consider reducing trip duration by 1 day or adjusting the budget ceiling.")
            
        return {
            "is_valid": False,
            "status": "REJECTED_OVER_BUDGET",
            "message": f"Estimated cost exceeds budget by {currency} {round(excess, 2):,} ({excess_pct}% over budget). Revision required.",
            "variance": round(variance, 2),
            "excess_amount": round(excess, 2),
            "severity": severity,
            "action_required": "Agent must re-plan or adjust parameters to lower costs.",
            "recommended_adjustments": recommendations
        }
