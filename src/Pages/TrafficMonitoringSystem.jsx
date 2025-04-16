import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icons
const startIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});
const endIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
  iconSize: [30, 30],
});

// Calculate distance using the Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
  const dLon = (lon2 - lon1) * (Math.PI / 180); // Convert degrees to radians
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Return distance in kilometers
};

// Click handler for adding markers
const MapClickHandler = ({ setMarkers }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkers((prev) =>
        prev.length < 2 ? [...prev, { lat, lng }] : [{ lat, lng }]
      );
    },
  });
  return null;
};

const TrafficMonitoringSystem = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);

  const trafficData = [
    {
      latitude: 28.6139,
      longitude: 77.209,
      congestionLevel: 'High',
      description: 'Heavy traffic in Delhi due to construction.',
    },
    {
      latitude: 19.076,
      longitude: 72.8777,
      congestionLevel: 'Moderate',
      description: 'Steady pace in Mumbai.',
    },
    {
      latitude: 12.9716,
      longitude: 77.5946,
      congestionLevel: 'Low',
      description: 'Clear roads in Bangalore.',
    },
  ];

  // Calculate eco-friendly routes dynamically based on distance
  const getEcoRoutes = (distance) => {
    if (distance < 10) {
      return [
        { name: 'Route A', distance: 10, ecoFriendliness: 'High', travelTime: 15 },
        { name: 'Route B', distance: 12, ecoFriendliness: 'Medium', travelTime: 18 },
      ];
    } else if (distance < 20) {
      return [
        { name: 'Route C', distance: 15, ecoFriendliness: 'Medium', travelTime: 20 },
        { name: 'Route D', distance: 18, ecoFriendliness: 'Low', travelTime: 25 },
      ];
    } else {
      return [
        { name: 'Route E', distance: 20, ecoFriendliness: 'Low', travelTime: 30 },
        { name: 'Route F', distance: 25, ecoFriendliness: 'Very Low', travelTime: 35 },
      ];
    }
  };

  const handleRouteSelection = () => {
    if (markers.length === 2) {
      const distance = calculateDistance(
        markers[0].lat,
        markers[0].lng,
        markers[1].lat,
        markers[1].lng
      );
      const routes = getEcoRoutes(distance);
      setSelectedRoute({ ...routes[0], realDistance: distance.toFixed(2) });
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(168,213,226)] p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-extrabold text-gray-800">
            Traffic Monitoring
          </h1>
          <p className="text-lg text-gray-700">
            Monitor traffic & plan eco-friendly travel routes across India.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mt-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-[500px]"
          >
            <MapContainer
              center={[20.5937, 78.9629]}
              zoom={5}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {/* Traffic Markers */}
              {trafficData.map((loc, i) => (
                <Marker
                  key={i}
                  position={[loc.latitude, loc.longitude]}
                  icon={L.divIcon({
                    className: 'traffic-marker',
                    html: `<div class="traffic-marker-${loc.congestionLevel}">${loc.congestionLevel}</div>`,
                  })}
                >
                  <Popup>
                    <h3>Traffic: {loc.congestionLevel}</h3>
                    <p>{loc.description}</p>
                  </Popup>
                </Marker>
              ))}

              {/* Start Marker */}
              {markers[0] && (
                <Marker position={[markers[0].lat, markers[0].lng]} icon={startIcon}>
                  <Popup>Start Point</Popup>
                </Marker>
              )}
              {/* End Marker */}
              {markers[1] && (
                <Marker position={[markers[1].lat, markers[1].lng]} icon={endIcon}>
                  <Popup>End Point</Popup>
                </Marker>
              )}

              {/* Route Polyline */}
              {markers.length === 2 && (
                <Polyline
                  positions={[ 
                    [markers[0].lat, markers[0].lng],
                    [markers[1].lat, markers[1].lng],
                  ]}
                  color="blue"
                />
              )}

              {/* Add pin on click */}
              <MapClickHandler setMarkers={setMarkers} />
            </MapContainer>
          </motion.div>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-gray-800">Eco Routes</h2>
            {markers.length === 2 && (
              <>
                {getEcoRoutes(
                  calculateDistance(
                    markers[0].lat,
                    markers[0].lng,
                    markers[1].lat,
                    markers[1].lng
                  )
                ).map((route, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-blue-700">{route.name}</h3>
                    <p className="text-gray-600">Distance: {route.distance} km</p>
                    <p className="text-gray-600">Eco-friendliness: {route.ecoFriendliness}</p>
                    <p className="text-gray-600">Travel Time: {route.travelTime} mins</p>
                  </div>
                ))}
              </>
            )}

            {/* Route calculation */}
            {markers.length === 2 && (
              <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-blue-700">Route Distance</h3>
                <p className="text-gray-600">
                  Between points:{" "}
                  {calculateDistance(
                    markers[0].lat,
                    markers[0].lng,
                    markers[1].lat,
                    markers[1].lng
                  ).toFixed(2)}{" "}
                  km
                </p>
                <button
                  onClick={handleRouteSelection}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Get Best Route
                </button>

                {selectedRoute && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-blue-700">Best Suggested Route</h4>
                    <p>Route: {selectedRoute.name}</p>
                    <p>Eco Rating: {selectedRoute.ecoFriendliness}</p>
                    <p>Time: {selectedRoute.travelTime} mins</p>
                    <p>Distance: {selectedRoute.realDistance} km</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMonitoringSystem;
