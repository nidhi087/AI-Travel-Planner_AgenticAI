import urllib.parse
from typing import Dict, Any, List, Optional

def _make_map_link(name: str, city: str) -> str:
    query = urllib.parse.quote(f"{name}, {city}, India")
    return f"https://www.google.com/maps/search/?api=1&query={query}"

def _make_hotel_booking_link(name: str, city: str) -> str:
    query = urllib.parse.quote(f"{name} {city}")
    return f"https://www.google.com/travel/hotels?q={query}"

def _make_makemytrip_hotel_link(city: str) -> str:
    query = urllib.parse.quote(city)
    return f"https://www.makemytrip.com/hotels/hotel-listing/?city={query}"

# Verified research repository for top Indian destinations
INDIA_RESEARCH_DATABASE: Dict[str, Dict[str, Any]] = {
    "udaipur": {
        "name": "Udaipur, Rajasthan",
        "state": "Rajasthan",
        "tagline": "The City of Lakes & Venice of the East",
        "tier": "Tier-2",
        "currency": "INR",
        "best_season": "October to March (Winter) or July to September (Monsoon lush hills)",
        "transit_hub": {
            "railway_station": "Udaipur City Railway Station (UDZ)",
            "airport": "Maharana Pratap Airport (UDR), Dabok",
            "bus_stand": "Udaipur Central Bus Stand (Udiapole)"
        },
        "local_transport": "Autorickshaws (₹100-₹200 per intra-city trip; negotiate or use Uber Auto), scooter rentals (₹400-₹500/day near Lal Ghat), or walking around the car-free Old City ghats.",
        "daily_cost_benchmarks": {
            "Budget": {"stay_per_night": 1300, "food_per_day": 700, "local_transport": 450, "activities": 500},
            "Moderate": {"stay_per_night": 3200, "food_per_day": 1400, "local_transport": 900, "activities": 1100},
            "Luxury": {"stay_per_night": 9500, "food_per_day": 3200, "local_transport": 2200, "activities": 2500}
        },
        "attractions": [
            {
                "name": "City Palace of Udaipur",
                "address": "Old City, Udaipur, Rajasthan 313001",
                "why_visit": "Rajasthan's largest royal palace complex with grand courtyards, mirror-work (Sheesh Mahal), and breathtaking balconies overlooking Lake Pichola.",
                "visit_duration": "2.5 - 3 hours",
                "entrance_fee": "₹300 (Adults) / ₹100 (Children)",
                "opening_hours": "09:30 AM - 05:30 PM (Daily)",
                "best_time": "09:30 AM sharp to beat midday tourist crowds",
                "map_url": _make_map_link("City Palace", "Udaipur"),
                "cost_tier": "Budget"
            },
            {
                "name": "Lake Pichola & Jag Mandir Island Boat Cruise",
                "address": "Rameshwar Ghat / City Palace Jetty, Udaipur",
                "why_visit": "Iconic boat ride past the floating Lake Palace, Jag Mandir island palace, and lakeside bathing ghats.",
                "visit_duration": "1 - 1.5 hours",
                "entrance_fee": "₹550 (Day boat ride) / ₹850 (Sunset cruise)",
                "opening_hours": "10:00 AM - 06:00 PM (Daily)",
                "best_time": "05:00 PM for golden hour lighting and lake breeze",
                "map_url": _make_map_link("Lake Pichola Boat Ride", "Udaipur"),
                "cost_tier": "Moderate"
            },
            {
                "name": "Jagdish Temple",
                "address": "Near City Palace Complex Entrance, Udaipur",
                "why_visit": "A 1651 AD architectural marvel dedicated to Lord Vishnu featuring 32 intricately hand-carved marble pillars and pyramidical shikharas.",
                "visit_duration": "30 - 45 minutes",
                "entrance_fee": "Free entry",
                "opening_hours": "05:00 AM - 02:30 PM, 04:00 PM - 10:00 PM",
                "best_time": "Morning during morning prayer (Aarti)",
                "map_url": _make_map_link("Jagdish Temple", "Udaipur"),
                "cost_tier": "Free"
            },
            {
                "name": "Saheliyon Ki Bari (Garden of the Maids)",
                "address": "Saheli Marg, New Fatehpura, Udaipur 313001",
                "why_visit": "Lush historic gardens built for royal princesses featuring marble elephant fountains operating on gravity, lotus pools, and rose beds.",
                "visit_duration": "1 hour",
                "entrance_fee": "₹50 (Indian) / ₹100 (Foreigners)",
                "opening_hours": "09:00 AM - 07:00 PM (Daily)",
                "best_time": "Late morning for pleasant garden walks",
                "map_url": _make_map_link("Saheliyon Ki Bari", "Udaipur"),
                "cost_tier": "Budget"
            },
            {
                "name": "Bagore Ki Haveli & Dharohar Folk Dance Show",
                "address": "Gangaur Ghat Marg, Old City, Udaipur",
                "why_visit": "An 18th-century waterfront mansion showcasing royal turbans and the famous evening Dharohar Rajasthani puppet and pot-balancing dance.",
                "visit_duration": "1.5 hours (Show: 07:00 PM - 08:00 PM)",
                "entrance_fee": "₹100 (Indians) / ₹150 (Foreigners) + ₹100 Camera",
                "opening_hours": "Haveli Museum: 09:30 AM - 05:30 PM; Dance: 07:00 PM",
                "best_time": "Buy evening dance tickets by 05:30 PM as seats fill up fast",
                "map_url": _make_map_link("Bagore Ki Haveli", "Udaipur"),
                "cost_tier": "Budget"
            },
            {
                "name": "Fateh Sagar Lake & Nehru Park Promenade",
                "address": "Fateh Sagar Lake Promenade, Udaipur",
                "why_visit": "A picturesque pear-shaped artificial lake with an island park, open-air cafes, speed boating, and sunset views over the Aravalli hills.",
                "visit_duration": "1 - 2 hours",
                "entrance_fee": "Free promenade stroll / ₹150 for motorboat to Nehru Park",
                "opening_hours": "Open 24 hours (Boating: 08:00 AM - 06:30 PM)",
                "best_time": "05:00 PM - 07:30 PM for street food and evening breeze",
                "map_url": _make_map_link("Fateh Sagar Lake", "Udaipur"),
                "cost_tier": "Free"
            },
            {
                "name": "Sajjangarh Monsoon Palace",
                "address": "Bansdara Peak, Sajjangarh Wildlife Sanctuary, Udaipur",
                "why_visit": "Clifftop palatial fortress perched 944 meters above sea level offering unmatched 360-degree panoramic sunset views over all Udaipur lakes.",
                "visit_duration": "2 hours",
                "entrance_fee": "₹70 (Indian) / ₹300 (Foreigner) + sanctuary vehicle fee",
                "opening_hours": "09:00 AM - 06:30 PM",
                "best_time": "05:00 PM - 06:30 PM for golden hour sunset",
                "map_url": _make_map_link("Sajjangarh Palace", "Udaipur"),
                "cost_tier": "Budget"
            }
        ],
        "hotels": [
            {
                "name": "Moustache Udaipur",
                "type": "Heritage Backpacker Hostel & Private Rooms",
                "neighborhood": "Gadiya Devra, Near Jagdish Temple, Old City",
                "distance_to_center": "0.3 km from City Palace / Lake Pichola",
                "rating": "4.6 / 5",
                "review_count": "1,420+ reviews",
                "price_per_night": "₹1,200 / night (Dorm ₹500, Private ₹1,600)",
                "amenities": ["Rooftop Cafe with Pichola View", "Free Wi-Fi", "Air Conditioning", "Walking Tours Desk"],
                "why_recommended": "Perfect for budget travelers; walking distance to all Old City sights with iconic lake sunset views from the terrace.",
                "booking_url": _make_hotel_booking_link("Moustache Udaipur", "Udaipur")
            },
            {
                "name": "Jagat Niwas Palace Hotel",
                "type": "Heritage Haveli / 3-Star Lakeside Luxury",
                "neighborhood": "23-25 Lal Ghat, Lake Pichola",
                "distance_to_center": "0.2 km from City Palace",
                "rating": "4.7 / 5",
                "review_count": "2,150+ reviews",
                "price_per_night": "₹4,200 - ₹5,800 / night",
                "amenities": ["Direct Lake Pichola Balcony (Jharokha)", "Lakeside Restaurant", "Heritage Courtyard", "Free Breakfast"],
                "why_recommended": "Renowned 17th-century haveli with jharokha bay seating looking right over Lake Pichola and the Taj Lake Palace.",
                "booking_url": _make_hotel_booking_link("Jagat Niwas Palace Hotel", "Udaipur")
            },
            {
                "name": "Amet Haveli",
                "type": "4-Star Heritage Boutique Hotel",
                "neighborhood": "Hanuman Ghat, Outside Chandpole, Udaipur",
                "distance_to_center": "0.8 km from City Palace (Across footbridge)",
                "rating": "4.8 / 5",
                "review_count": "1,880+ reviews",
                "price_per_night": "₹8,500 - ₹12,000 / night",
                "amenities": ["Waterfront Pool", "Home of Ambrai Restaurant", "Lush Courtyard", "Valet Parking"],
                "why_recommended": "Premier heritage property with the most celebrated waterfront dining views in Rajasthan.",
                "booking_url": _make_hotel_booking_link("Amet Haveli", "Udaipur")
            }
        ],
        "restaurants": [
            {
                "name": "Natraj Dining Hall & Restaurant",
                "address": "Near Railway Station / Bapu Bazaar, Udaipur",
                "cuisine": "Traditional Rajasthani & Gujarati Thali",
                "dietary": "Pure Vegetarian (Jain Options Available)",
                "rating": "4.6 / 5 (7,800+ reviews)",
                "approx_price_per_person": "₹280 - ₹350 (Unlimited Thali)",
                "signature_dishes": "Unlimited Rajasthani Thali with Dal Baati Churma, Gatte Ki Sabzi, Kadi, hot Phulkas, and Gulab Jamun",
                "map_url": _make_map_link("Natraj Dining Hall", "Udaipur")
            },
            {
                "name": "Ambrai Restaurant at Amet Haveli",
                "address": "Hanuman Ghat, Waterfront Lake Pichola, Udaipur",
                "cuisine": "North Indian, Rajasthani & Mughlai Fine Dining",
                "dietary": "Vegetarian & Non-Vegetarian",
                "rating": "4.7 / 5 (8,900+ reviews)",
                "approx_price_per_person": "₹900 - ₹1,500",
                "signature_dishes": "Mewari Mutton Laal Maas, Ker Sangri, Paneer Lababdar, and Garlic Butter Naan by water's edge",
                "map_url": _make_map_link("Ambrai Restaurant", "Udaipur")
            },
            {
                "name": "Jheel's Ginger Coffee Bar & Bakery",
                "address": "55 Gangaur Ghat Marg, Waterfront, Udaipur",
                "cuisine": "Lakeside Cafe, Breakfast & Italian",
                "dietary": "Pure Vegetarian / Vegan Friendly",
                "rating": "4.5 / 5 (3,400+ reviews)",
                "approx_price_per_person": "₹250 - ₹450",
                "signature_dishes": "Woodfired Thin Crust Pizza, Walnut Brownie, and Iced Caramel Macchiato on a lakeside deck",
                "map_url": _make_map_link("Jheel's Ginger Coffee Bar", "Udaipur")
            },
            {
                "name": "Traditional Khana Restaurant",
                "address": "Panchwati, Near Chetak Circle, Udaipur",
                "cuisine": "Authentic Royal Rajasthani Cuisine",
                "dietary": "Pure Vegetarian",
                "rating": "4.7 / 5 (2,600+ reviews)",
                "approx_price_per_person": "₹450 - ₹650",
                "signature_dishes": "Authentic Baati with 4 types of Churma (Rose, Besan, Wheat, Dry Fruit) and Bajra Roti with white butter",
                "map_url": _make_map_link("Traditional Khana Restaurant", "Udaipur")
            }
        ],
        "must_try_foods": [
            {"dish": "Dal Baati Churma with Ghee", "description": "Wheat dough dumplings baked in charcoal, crushed in pure desi ghee, served with panchmel dal and sweet churma.", "recommended_spot": "Natraj Dining Hall or Traditional Khana"},
            {"dish": "Ker Sangri with Bajra Roti", "description": "Indigenous desert beans and wild berries cooked with dry mango and aromatic spices.", "recommended_spot": "Tribute Restaurant or 1559 AD"},
            {"dish": "Kulhad Cold Coffee & Bun Maska", "description": "Thick creamy chilled coffee served in earthen clay pots.", "recommended_spot": "Fateh Sagar Bombay Market Stall #12"}
        ]
    },
    "goa": {
        "name": "Goa (North & South)",
        "state": "Goa",
        "tagline": "Sun, Sand, Heritage & Spice",
        "tier": "Tier-2",
        "currency": "INR",
        "best_season": "November to February (Pleasant coastal winter) or July-August (Lush green monsoon)",
        "transit_hub": {
            "railway_station": "Madgaon (MAO) / Thivim (THVM)",
            "airport": "Dabolim Airport (GOI) / Mopa International (GOX)",
            "bus_stand": "Panaji KTC Bus Stand / Mapusa"
        },
        "local_transport": "Self-driven scooters (₹350-₹500/day) are the most economical. For taxis, use GoaMiles official app or pre-book hotel cabs.",
        "daily_cost_benchmarks": {
            "Budget": {"stay_per_night": 1200, "food_per_day": 800, "local_transport": 500, "activities": 400},
            "Moderate": {"stay_per_night": 3200, "food_per_day": 1600, "local_transport": 1000, "activities": 1000},
            "Luxury": {"stay_per_night": 8500, "food_per_day": 3500, "local_transport": 2500, "activities": 2500}
        },
        "attractions": [
            {
                "name": "Aguada Fort & Portuguese Lighthouse",
                "address": "Sinquerim, Candolim, Goa 403515",
                "why_visit": "17th-century Portuguese coastal fortress with intact freshwater cistern and sweeping views of the Arabian Sea.",
                "visit_duration": "1.5 hours",
                "entrance_fee": "₹50 (Indian) / ₹300 (Foreigner)",
                "opening_hours": "09:00 AM - 05:30 PM",
                "best_time": "09:30 AM before afternoon sun",
                "map_url": _make_map_link("Aguada Fort", "Goa"),
                "cost_tier": "Budget"
            },
            {
                "name": "Fontainhas Latin Quarter",
                "address": "Altinho, Panaji, Goa 403001",
                "why_visit": "UNESCO Heritage precinct lined with vivid yellow, red, and blue Portuguese villas, tiled nameplates, and heritage bakeries.",
                "visit_duration": "2 hours",
                "entrance_fee": "Free walking trail",
                "opening_hours": "Open 24 hours (Best daylight)",
                "best_time": "08:30 AM or 04:30 PM for quiet photography",
                "map_url": _make_map_link("Fontainhas Latin Quarter", "Panaji Goa"),
                "cost_tier": "Free"
            },
            {
                "name": "Basilica of Bom Jesus",
                "address": "Old Goa Road, Bainguinim, Goa 403402",
                "why_visit": "World Heritage baroque church constructed in 1605, enshrining the sacred mortal remains of St. Francis Xavier.",
                "visit_duration": "1 hour",
                "entrance_fee": "Free entry",
                "opening_hours": "09:00 AM - 06:30 PM (Sunday 10:30 AM - 06:30 PM)",
                "best_time": "Morning hours",
                "map_url": _make_map_link("Basilica of Bom Jesus", "Old Goa"),
                "cost_tier": "Free"
            },
            {
                "name": "Chapora Fort & Vagator Beach Sunset",
                "address": "Chapora, North Goa 403509",
                "why_visit": "Famous hilltop fort ramparts overlooking Vagator and Morjim beaches; acclaimed as the 'Dil Chahta Hai' sunset point.",
                "visit_duration": "1.5 hours",
                "entrance_fee": "Free entry",
                "opening_hours": "Open 24 hours",
                "best_time": "05:00 PM for the sunset over Arabian Sea",
                "map_url": _make_map_link("Chapora Fort", "Goa"),
                "cost_tier": "Free"
            }
        ],
        "hotels": [
            {
                "name": "Old Quarter by the Hostelcrowd",
                "type": "Heritage Boutique Hostel & Private Rooms",
                "neighborhood": "Fontainhas Latin Quarter, Panaji",
                "distance_to_center": "Located in Old Panjim",
                "rating": "4.5 / 5",
                "review_count": "1,200+ reviews",
                "price_per_night": "₹1,400 / night (Dorm ₹600, Private ₹1,800)",
                "amenities": ["Free Wi-Fi", "In-house Bakery Cafe", "Bicycle Rental", "Air Conditioning"],
                "why_recommended": "Stay inside Goa's heritage quarter with easy access to Mandovi River and South/North transit.",
                "booking_url": _make_hotel_booking_link("Old Quarter by the Hostelcrowd", "Panaji Goa")
            },
            {
                "name": "Fairfield by Marriott Goa Anjuna",
                "type": "4-Star Modern Resort",
                "neighborhood": "Anjuna, North Goa",
                "distance_to_center": "1.5 km to Anjuna Beach",
                "rating": "4.5 / 5",
                "review_count": "2,400+ reviews",
                "price_per_night": "₹3,800 - ₹5,200 / night",
                "amenities": ["Outdoor Swimming Pool", "Fitness Center", "Complimentary Breakfast", "Restaurant"],
                "why_recommended": "Excellent comfort, modern amenities, close to flea markets and famous beach shacks.",
                "booking_url": _make_hotel_booking_link("Fairfield by Marriott Goa Anjuna", "Goa")
            }
        ],
        "restaurants": [
            {
                "name": "Vinayak Family Restaurant",
                "address": "Assagao, North Goa 403507",
                "cuisine": "Authentic Goan Seafood & Thalis",
                "dietary": "Seafood & Vegetarian options",
                "rating": "4.6 / 5 (8,500+ reviews)",
                "approx_price_per_person": "₹350 - ₹550",
                "signature_dishes": "Famous Goan Special Fish Thali with fried Chonak or Kingfish, Prawn Sukka, and Sol Kadhi",
                "map_url": _make_map_link("Vinayak Family Restaurant", "Assagao Goa")
            },
            {
                "name": "Viva Panjim",
                "address": "178, 31st January Road, Fontainhas, Panaji",
                "cuisine": "Portuguese Goan Home Cooking",
                "dietary": "Meat, Seafood & Veg",
                "rating": "4.5 / 5 (4,200+ reviews)",
                "approx_price_per_person": "₹400 - ₹650",
                "signature_dishes": "Prawn Balchão, Pork/Chicken Vindaloo with Goan Poi Bread, and Bebinca",
                "map_url": _make_map_link("Viva Panjim", "Panaji Goa")
            }
        ],
        "must_try_foods": [
            {"dish": "Goan Fish Curry Thali", "description": "Fragrant coconut-kokum fish curry served with steamed rice, fried rawa fish, and kismoor.", "recommended_spot": "Vinayak Family Restaurant or Ritz Classic"},
            {"dish": "Traditional Goan Poi with Vindaloo", "description": "Warm fermented wheat bread served with tangy red wine and garlic curry.", "recommended_spot": "Viva Panjim"},
            {"dish": "Bebinca with Vanilla Ice Cream", "description": "Layered Indo-Portuguese baked dessert made from coconut milk, jaggery, and ghee.", "recommended_spot": "Infantaria Bakery, Calangute"}
        ]
    },
    "jaipur": {
        "name": "Jaipur, Rajasthan",
        "state": "Rajasthan",
        "tagline": "The Historic Pink City & Royal Gateway",
        "tier": "Tier-2",
        "currency": "INR",
        "best_season": "October to March",
        "transit_hub": {
            "railway_station": "Jaipur Junction (JP)",
            "airport": "Jaipur International Airport (JAI), Sanganer",
            "bus_stand": "Sindhi Camp Central Bus Station"
        },
        "local_transport": "Jaipur Metro for Railway Station to Old City; Uber Auto or full-day tuk-tuk (₹600 - ₹900) for monument touring.",
        "daily_cost_benchmarks": {
            "Budget": {"stay_per_night": 1000, "food_per_day": 600, "local_transport": 400, "activities": 500},
            "Moderate": {"stay_per_night": 2800, "food_per_day": 1400, "local_transport": 900, "activities": 1200},
            "Luxury": {"stay_per_night": 9000, "food_per_day": 3200, "local_transport": 2200, "activities": 3000}
        },
        "attractions": [
            {
                "name": "Amber (Amer) Fort & Palace",
                "address": "Devisinghpura, Amer, Jaipur 302001",
                "why_visit": "UNESCO World Heritage fortress overlooking Maota Lake, famous for Sheesh Mahal (Mirror Palace) and ornate Rajput ramparts.",
                "visit_duration": "3 hours",
                "entrance_fee": "₹100 (Indians) / ₹550 (Foreigners)",
                "opening_hours": "08:00 AM - 05:30 PM (Night tour: 06:30 PM - 09:15 PM)",
                "best_time": "08:30 AM to explore before the heat",
                "map_url": _make_map_link("Amber Fort", "Jaipur"),
                "cost_tier": "Budget"
            },
            {
                "name": "Hawa Mahal (Palace of Winds)",
                "address": "Hawa Mahal Rd, Badi Choupad, Pink City, Jaipur",
                "why_visit": "Five-story pink sandstone palace with 953 honeycombed jharokhas built for royal women to observe street processions unseen.",
                "visit_duration": "1 hour",
                "entrance_fee": "₹50 (Indian) / ₹200 (Foreigner)",
                "opening_hours": "09:00 AM - 05:00 PM",
                "best_time": "Morning sunrise from the opposite rooftop cafes",
                "map_url": _make_map_link("Hawa Mahal", "Jaipur"),
                "cost_tier": "Budget"
            },
            {
                "name": "Jantar Mantar UNESCO Observatory",
                "address": "Gangori Bazaar, J.D.A. Market, Pink City, Jaipur",
                "why_visit": "Collection of nineteen stone architectural astronomical instruments built in 1734, featuring the world's largest stone sundial.",
                "visit_duration": "1.5 hours",
                "entrance_fee": "₹50 (Indians) / ₹200 (Foreigners)",
                "opening_hours": "09:00 AM - 05:00 PM",
                "best_time": "Mid-day when the sun is highest for sundial shadows",
                "map_url": _make_map_link("Jantar Mantar", "Jaipur"),
                "cost_tier": "Budget"
            }
        ],
        "hotels": [
            {
                "name": "Moustache Hostel Jaipur",
                "type": "Heritage Hostel & Private Rooms",
                "neighborhood": "Park Street, Near MI Road",
                "distance_to_center": "1 km from Railway Station",
                "rating": "4.6 / 5",
                "review_count": "1,600+ reviews",
                "price_per_night": "₹1,100 / night (Dorm ₹450, Private ₹1,500)",
                "amenities": ["Rooftop Pool & Cafe", "Free Wi-Fi", "Folk Music Nights", "Air Conditioning"],
                "why_recommended": "Top-rated social stay with vibrant Rajasthani decor close to transit.",
                "booking_url": _make_hotel_booking_link("Moustache Hostel Jaipur", "Jaipur")
            },
            {
                "name": "Shahpura House",
                "type": "Heritage Haveli Palace Hotel",
                "neighborhood": "Devi Marg, Bani Park, Jaipur",
                "distance_to_center": "2.5 km from Old City",
                "rating": "4.7 / 5",
                "review_count": "2,200+ reviews",
                "price_per_night": "₹4,500 - ₹6,500 / night",
                "amenities": ["Swimming Pool", "Royal Frescoes", "Spa", "Multi-Cuisine Restaurant"],
                "why_recommended": "Authentic living royal palace haveli with intricate Rajput hand-paintings.",
                "booking_url": _make_hotel_booking_link("Shahpura House", "Jaipur")
            }
        ],
        "restaurants": [
            {
                "name": "Rawat Mishthan Bhandar",
                "address": "Station Road, Near Polovictory Cinema, Jaipur",
                "cuisine": "Traditional Rajasthani Snacks & Sweets",
                "dietary": "Pure Vegetarian",
                "rating": "4.5 / 5 (18,000+ reviews)",
                "approx_price_per_person": "₹150 - ₹250",
                "signature_dishes": "Famous Pyaaz Ki Kachori (crispy onion pastry) & hot sweet Masala Chai",
                "map_url": _make_map_link("Rawat Mishthan Bhandar", "Jaipur")
            },
            {
                "name": "Laxmi Mishthan Bhandar (LMB)",
                "address": "Johari Bazaar, Pink City, Jaipur",
                "cuisine": "Rajasthani Royal Thali & Sweets",
                "dietary": "Pure Vegetarian",
                "rating": "4.4 / 5 (9,200+ reviews)",
                "approx_price_per_person": "₹450 - ₹750",
                "signature_dishes": "Special Royal Rajasthani Thali & authentic Paneer Ghewar",
                "map_url": _make_map_link("LMB Johari Bazaar", "Jaipur")
            }
        ],
        "must_try_foods": [
            {"dish": "Pyaaz Kachori with Mint Chutney", "description": "Flaky deep-fried pastry stuffed with spicy sautéed onions and spices.", "recommended_spot": "Rawat Mishthan Bhandar"},
            {"dish": "Dal Baati Churma", "description": "Authentic wheat baatis dipped in hot ghee served with dal and sweet churma.", "recommended_spot": "Chokhi Dhani or LMB"}
        ]
    }
}

def get_destination_knowledge(destination_query: str) -> Optional[Dict[str, Any]]:
    """
    Looks up destination research from verified knowledge base.
    """
    clean_q = destination_query.strip().lower()
    for key, data in INDIA_RESEARCH_DATABASE.items():
        if key in clean_q or clean_q in key:
            return data
    return None
