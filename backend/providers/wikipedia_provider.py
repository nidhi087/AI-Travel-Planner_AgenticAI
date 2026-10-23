import requests
from typing import Dict, Any, Optional
from .base_provider import BaseTravelProvider

class WikipediaProvider(BaseTravelProvider):
    """
    Retrieves verified factual summaries, historical importance, and official encyclopedia
    links for Indian destinations and major monuments.
    """
    def __init__(self):
        super().__init__(name="Wikipedia-API", timeout=6)
        self.base_url = "https://en.wikipedia.org/api/rest_v1/page/summary"
        self._cache: Dict[str, Dict[str, Any]] = {}

    def health_check(self) -> bool:
        try:
            r = requests.get(f"{self.base_url}/India", headers=self.headers, timeout=self.timeout)
            return r.status_code == 200
        except Exception:
            return False

    def get_summary(self, title: str) -> Optional[Dict[str, Any]]:
        """
        Retrieves verified summary and official page URL for a place/attraction.
        """
        clean_title = title.strip().replace(" ", "_")
        if clean_title in self._cache:
            return self._cache[clean_title]

        url = f"{self.base_url}/{clean_title}"
        try:
            res = requests.get(url, headers=self.headers, timeout=self.timeout)
            if res.status_code == 200:
                data = res.json()
                result = {
                    "title": data.get("title", title),
                    "summary": data.get("extract", ""),
                    "description": data.get("description", ""),
                    "wikipedia_url": data.get("content_urls", {}).get("desktop", {}).get("page", f"https://en.wikipedia.org/wiki/{clean_title}"),
                    "thumbnail_url": data.get("thumbnail", {}).get("source") if "thumbnail" in data else None
                }
                self._cache[clean_title] = result
                return result
        except Exception as e:
            print(f"[WikipediaProvider] Error fetching '{title}': {e}")

        return None
