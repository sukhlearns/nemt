"use client";

import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 37.7749, // Default latitude
  lng: -122.4194, // Default longitude
};

const WorldMap = ({ patient, driver }) => {
  const center = patient ? patient.location : defaultCenter;

  // Define custom icons for patient and driver
  const patientIcon = {
    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Blue marker icon
  };

  const driverIcon = {
    url: "https://cdn-icons-png.flaticon.com/512/3485/3485938.png", // Red marker icon
    scaledSize: {
      width: 40, // Adjust the width
      height: 40, // Adjust the height
    },
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {patient && (
          <Marker
            position={patient.location}
            label="Patient"
            icon={patientIcon} // Custom blue icon
          />
        )}
        {driver && (
          <Marker
            position={driver.location}
            label="Driver"
            icon={driverIcon} // Custom red icon
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default WorldMap;
