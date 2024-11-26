// components/GoogleMap.js
"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 37.7749, // Example latitude
  lng: -122.4194, // Example longitude
};

const WorldMap = () => {
  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Add markers or other map features here */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default WorldMap;
