'use client'

import React, { useState } from 'react';
import GoogleMapPanorama from '@/helpers/StreetView';
import LocationCard from '@/components/LocationCard';

const App: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

  const handleShowMap = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  return (
    <div>
      <LocationCard lat={-1.9511642} lng={30.1008481} onShowMap={handleShowMap} />
      <LocationCard lat={40.689247} lng={-74.044502} onShowMap={handleShowMap} />
      {/* Add more LocationCards as needed */}
      {location && <GoogleMapPanorama key={`${location.lat}-${location.lng}`} lat={location.lat} lng={location.lng} />}

    </div>
  );
};

export default App;
