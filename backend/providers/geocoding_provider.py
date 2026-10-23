import requests
from typing import Dict, Any, Optional
from .base_provider import BaseTravelProvider

class GeocodingProvider(BaseTravelProvider):
    """
    Resolves Indian cities and regions to exact coordinates, administrative boundary,
    and formatted address using OpenStreetMap Nominatim API.
    """
    def __init__(self):
        super().__init__(name="OSM-Nominatim", timeout=6)
        self.base_url = "https://nominatim.openstreetmap.org/search"
        self._cache: Dict[str, Dict[str, Any]] = {}

    def health_check(self) -> bool:
        try:
            r = requests.get(f"{self.base_url}?q=Delhi,India&format=json&limit=1", headers=self.headers, timeout=self.timeout)
            return r.status_code == 200 and len(r.json()) > 0
        except Exception:
            return False

    def geocode(self, place_name: str) -> Optional[Dict[str, Any]]:
        """
        Geocodes an Indian destination or origin city.
        Returns dict with lat, lon, display_name, city, state.
        """
        query_key = place_name.strip().lower()
        if query_key in self._cache:
            return self._cache[query_key]

        # Ensure Indian context
        search_query = place_name.strip()
        if "india" not in search_query.lower():
            search_query += ", India"

        params = {
            "q": search_query,
            "format": "json",
            "addressdetails": 1,
            "limit": 1
        }

        try:
            res = requests.get(self.base_url, params=params, headers=self.headers, timeout=self.timeout)
            if res.status_code == 200:
                data = res.json()
                if data and len(data) > 0:
                    item = data[0]
                    addr = item.get("address", {})
                    state = addr.get("state", "India")
                    city = addr.get("city") or addr.get("town") or addr.get("village") or addr.get("county") or place_name.title()
                    
                    result = {
                        "query": place_name,
                        "display_name": item.get("display_name"),
                        "city": city,
                        "state": state,
                        "lat": float(item["lat"]),
                        "lon": float(item["lon"]),
                        "boundingbox": item.get("boundingbox", []),
                        "osm_id": item.get("osm_id")
                    }
                    self._cache[query_key] = result
                    return result
        except Exception as e:
            print(f"[GeocodingProvider] Error geocoding '{place_name}': {e}")

        # Fallback coordinates for major Indian hubs in case of temporary network glitch
        known_hubs = {
            "udaipur": {"city": "Udaipur", "state": "Rajasthan", "lat": 24.5854, "lon": 73.7125, "display_name": "Udaipur, Rajasthan, India"},
            "mumbai": {"city": "Mumbai", "state": "Maharashtra", "lat": 19.0760, "lon": 72.8777, "display_name": "Mumbai, Maharashtra, India"},
            "jaipur": {"city": "Jaipur", "state": "Rajasthan", "lat": 26.9124, "lon": 75.7873, "display_name": "Jaipur, Rajasthan, India"},
            "goa": {"city": "Goa", "state": "Goa", "lat": 15.2993, "lon": 74.1240, "display_name": "Goa, India"},
            "delhi": {"city": "Delhi", "state": "Delhi", "lat": 28.6139, "lon": 77.2090, "display_name": "New Delhi, Delhi, India"},
            "agra": {"city": "Agra", "state": "Uttar Pradesh", "lat": 27.1767, "lon": 78.0081, "display_name": "Agra, Uttar Pradesh, India"},
            "kerala": {"city": "Kochi", "state": "Kerala", "lat": 9.9312, "lon": 76.2673, "display_name": "Kochi, Kerala, India"},
            "manali": {"city": "Manali", "state": "Himachal Pradesh", "lat": 32.2432, "lon": 77.1892, "display_name": "Manali, Himachal Pradesh, India"},
            "varanasi": {"city": "Varanasi", "state": "Uttar Pradesh", "lat": 25.3176, "lon": 82.9739, "display_name": "Varanasi, Uttar Pradesh, India"},
            "bangalore": {"city": "Bangalore", "state": "Karnataka", "lat": 12.9716, "lon": 77.5946, "display_name": "Bengaluru, Karnataka, India"}
        }
        for k, v in known_hubs.items():
            if k in query_key:
                v["query"] = place_name
                return v

        return None
