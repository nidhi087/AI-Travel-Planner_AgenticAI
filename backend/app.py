import os
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from agent.orchestrator import TravelAgentOrchestrator
import traceback

app = Flask(__name__)
# Enable CORS for all routes so React can communicate seamlessly
CORS(app, resources={r"/api/*": {"origins": "*"}})

orchestrator = TravelAgentOrchestrator()

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint to verify backend status and LLM availability."""
    return jsonify({
        "status": "healthy",
        "service": "Research-Based AI Travel Agent for India",
        "llm_key_configured": orchestrator.has_api_key,
        "mode": "Live Gemini 3.8 Flash + Live Research Data Providers" if orchestrator.has_api_key else "Resilient Agentic Engine (No API key needed)"
    }), 200

@app.route("/api/destinations", methods=["GET"])
def get_destinations():
    """Provides premier Indian destination presets with state and taglines."""
    return jsonify({
        "popular": [
            {"name": "Udaipur, Rajasthan", "state": "Rajasthan", "currency": "INR", "tag": "City of Lakes & Royal Palaces"},
            {"name": "Goa (North & South)", "state": "Goa", "currency": "INR", "tag": "Beaches, Portuguese Heritage & Shacks"},
            {"name": "Jaipur, Rajasthan", "state": "Rajasthan", "currency": "INR", "tag": "Historic Pink City, Forts & Bazaars"},
            {"name": "Mumbai, Maharashtra", "state": "Maharashtra", "currency": "INR", "tag": "Coastal Gateway, Art Deco & Cuisine"},
            {"name": "Kerala (Kochi & Munnar)", "state": "Kerala", "currency": "INR", "tag": "Tea Hills, Backwaters & Heritage"},
            {"name": "Manali, Himachal Pradesh", "state": "Himachal Pradesh", "currency": "INR", "tag": "Snow Peaks, Valleys & Adventure"},
            {"name": "Delhi & Agra", "state": "NCR & UP", "currency": "INR", "tag": "Mughal Architecture, Taj Mahal & Street Food"},
            {"name": "Varanasi, Uttar Pradesh", "state": "Uttar Pradesh", "currency": "INR", "tag": "Ancient Ghats, Ganga Aarti & Spirituality"}
        ]
    }), 200

@app.route("/api/destinations/search", methods=["GET"])
def search_destinations():
    """Live search for any Indian city or region using Nominatim geocoding."""
    q = request.args.get("q", "").strip()
    if not q or len(q) < 2:
        return jsonify({"results": []}), 200
    try:
        geo = orchestrator.pm.geocoding.geocode(q)
        if geo:
            return jsonify({
                "results": [{
                    "name": geo["display_name"].split(",")[0],
                    "display_name": geo["display_name"],
                    "city": geo["city"],
                    "state": geo["state"],
                    "lat": geo["lat"],
                    "lon": geo["lon"]
                }]
            }), 200
        return jsonify({"results": []}), 200
    except Exception as e:
        return jsonify({"results": [], "error": str(e)}), 500

@app.route("/api/transit-options", methods=["POST"])
def get_transit_options():
    """Evaluates intercity travel options between origin and destination."""
    try:
        data = request.get_json() or {}
        origin = data.get("origin", "Mumbai").strip()
        destination = data.get("destination", "Udaipur").strip()
        travelers = int(data.get("travelers", 2))

        origin_geo = orchestrator.pm.geocoding.geocode(origin)
        dest_geo = orchestrator.pm.geocoding.geocode(destination)

        if not origin_geo or not dest_geo:
            return jsonify({"status": "error", "message": "Unable to resolve coordinates for origin or destination."}), 400

        result = orchestrator.pm.transit.calculate_intercity_options(
            origin_city=origin_geo["city"],
            dest_city=dest_geo["city"],
            origin_lat=origin_geo["lat"],
            origin_lon=origin_geo["lon"],
            dest_lat=dest_geo["lat"],
            dest_lon=dest_geo["lon"],
            travelers=travelers
        )
        return jsonify({"status": "success", "transit": result}), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/api/plan-trip", methods=["POST"])
def plan_trip():
    """
    Main endpoint for the Research-Based AI Travel Agent for India.
    Triggers the ReAct workflow with real research data, budget validation, and auto-revision.
    """
    try:
        data = request.get_json() or {}
        
        destination = data.get("destination", "").strip()
        if not destination:
            return jsonify({"status": "error", "message": "Destination is required."}), 400

        try:
            duration = int(data.get("duration_days", 4))
            if duration < 1 or duration > 30:
                return jsonify({"status": "error", "message": "Duration must be between 1 and 30 days."}), 400
        except ValueError:
            return jsonify({"status": "error", "message": "Invalid duration format."}), 400

        try:
            budget = float(data.get("total_budget", 20000))
            if budget <= 0:
                return jsonify({"status": "error", "message": "Budget must be greater than zero."}), 400
        except ValueError:
            return jsonify({"status": "error", "message": "Invalid budget format."}), 400

        # Execute agent workflow with live research retrieval
        result = orchestrator.plan_trip(data)
        return jsonify(result), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": f"Agent encountered an error while planning trip: {str(e)}"
        }), 500

@app.route("/api/chat-assistant", methods=["POST"])
def chat_assistant():
    """
    Follow-up assistant endpoint to modify or refine an existing plan.
    """
    try:
        data = request.get_json() or {}
        user_message = data.get("message", "").strip()
        current_plan = data.get("current_plan", {})
        
        if not user_message:
            return jsonify({"status": "error", "message": "Message cannot be empty."}), 400

        response = orchestrator.chat_assistant(current_plan=current_plan, user_message=user_message)
        return jsonify(response), 200

    except Exception as e:
        traceback.print_exc()
        return jsonify({
            "status": "error",
            "message": f"Assistant error: {str(e)}"
        }), 500

if __name__ == "__main__":
    print(f"[*] Starting Research-Based AI Travel Agent Backend on port {Config.PORT}...")
    print(f"[*] Gemini API Configured: {orchestrator.has_api_key}")
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
