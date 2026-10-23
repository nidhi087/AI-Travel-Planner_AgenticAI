import requests
import math
from typing import Dict, Any, Optional
from .base_provider import BaseTravelProvider

class RoutingProvider(BaseTravelProvider):
    """
    Computes exact road distances and estimated travel times between Indian cities
    using the Open Source Routing Machine (OSRM) driving API.
    """
    def __init__(self):
        super().__init__(name="OSRM-Routing", timeout=8)
        self.base_url = "https://router.project-osrm.org/route/v1/driving"
        self._cache: Dict[str, Dict[str, Any]] = {}

    def health_check(self) -> bool:
        try:
            # Short test route between Mumbai and Pune
            r = requests.get(f"{self.base_url}/72.8777,19.0760;73.8567,18.5204?overview=false", timeout=self.timeout)
            return r.status_code == 200
        except Exception:
            return False

    def get_route(self, origin_lat: float, origin_lon: float, dest_lat: float, dest_lon: float) -> Dict[str, Any]:
        """
        Calculates road distance (km) and driving duration (hours).
        """
        cache_key = f"{round(origin_lat,3)},{round(origin_lon,3)}_{round(dest_lat,3)},{round(dest_lon,3)}"
        if cache_key in self._cache:
            return self._cache[cache_key]

        url = f"{self.base_url}/{origin_lon},{origin_lat};{dest_lon},{dest_lat}?overview=false"
        try:
            res = requests.get(url, headers=self.headers, timeout=self.timeout)
            if res.status_code == 200:
                data = res.json()
                if "routes" in data and len(data["routes"]) > 0:
                    route = data["routes"][0]
                    dist_km = round(route["distance"] / 1000, 1)
                    duration_hrs = round(route["duration"] / 3600, 1)
                    
                    result = {
                        "status": "success",
                        "distance_km": dist_km,
                        "duration_hours": duration_hrs,
                        "provider": "OSRM Live Real-World Routing",
                        "is_live": True
                    }
                    self._cache[cache_key] = result
                    return result
        except Exception as e:
            print(f"[RoutingProvider] OSRM live routing error: {e}. Falling back to geodesic distance.")

        # Geodesic / Haversine fallback with realistic Indian road tortuosity factor (1.28x)
        dist_direct = self._haversine(origin_lat, origin_lon, dest_lat, dest_lon)
        dist_road = round(dist_direct * 1.28, 1)
        # Average highway speed across India ~ 65 km/h
        est_hours = round(dist_road / 62, 1)

        result = {
            "status": "success",
            "distance_km": dist_road,
            "duration_hours": est_hours,
            "provider": "Haversine Indian Road Geodesic (1.28x factor)",
            "is_live": False
        }
        self._cache[cache_key] = result
        return result

    def _haversine(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        """Great-circle distance in kilometers."""
        r = 6371.0  # Earth's radius in km
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
             math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return r * c
