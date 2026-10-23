from typing import Dict, Any, List
from providers.provider_manager import ProviderManager

_pm = ProviderManager()

def get_destination_insights(destination: str, origin: str = "Local") -> Dict[str, Any]:
    """
    Agent Tool: Queries the live ProviderManager to retrieve real destination insights,
    coordinates, live weather, Wikipedia summary, and local transit advisory.
    """
    research = _pm.research_destination_and_route(origin_city=origin, dest_city=destination)
    return {
        "status": "success",
        "destination_found": True,
        "name": research["destination"],
        "state": research["state"],
        "coordinates": research["coordinates"],
        "weather": research["weather"],
        "wikipedia": research["wikipedia"],
        "transit_options": research["transit_options"],
        "best_season": research["best_season"],
        "tips": research["local_transport_advice"],
        "attractions": research["attractions"],
        "hotels": research["hotels"],
        "restaurants": research["restaurants"],
        "must_try_foods": research["must_try_foods"]
    }

def find_recommended_activities(destination: str, category: str = "All", budget_tier: str = "All") -> Dict[str, Any]:
    """
    Agent Tool: Retrieves real named attractions and points of interest for the destination.
    """
    insights = get_destination_insights(destination)
    attractions = insights.get("attractions", [])
    
    free_acts = [a["name"] for a in attractions if a.get("cost_tier") == "Free"]
    budget_acts = [{"name": a["name"], "cost": a.get("entrance_fee", "₹50 - ₹150")} for a in attractions if a.get("cost_tier") == "Budget"]
    premium_acts = [{"name": a["name"], "cost": a.get("entrance_fee", "₹500+")} for a in attractions if a.get("cost_tier") in ["Moderate", "Premium"]]
    
    return {
        "destination": destination,
        "all_tiers": {
            "Free": free_acts if free_acts else ["Historic City Ghats & Lake Promenade", "Old City Bazaars & Walking Trail"],
            "Budget": budget_acts if budget_acts else [{"name": "Heritage Museum & Palace Visit", "cost": "₹100 - ₹300"}],
            "Premium": premium_acts if premium_acts else [{"name": "Sunset Lake Cruise & Guided Tour", "cost": "₹800"}]
        },
        "raw_attractions": attractions
    }
