import "./App.css";
import { useMemo, useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  // Sample location data (replace with your actual data)
  const locations = [
    { lat: 44.123, lng: -80.456 },
    { lat: 45.678, lng: -79.123 },
    // Add more locations as needed
  ];

  return <Map locations={locations} />;
}

function Map({ locations }) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  const center = useMemo(
    () => (currentLocation ? currentLocation : { lat: 44, lng: -80 }),
    [currentLocation]
  );

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      {currentLocation && <Marker position={currentLocation} />}
      {locations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
    </GoogleMap>
  );
}

export default App;
