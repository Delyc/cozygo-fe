'use client'

import React, { useState, useEffect } from 'react';
import LocationCard from '@/components/google/LocationCard';
import GoogleMapDisplay from '@/components/google/GoogleMapDisplay';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  streeNumber: string; 
}

const Home: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [embedUrl, setEmbedUrl] = useState('');
  const locations: Location[] = [
    { id: 1, name: 'Location 1', lat: -1.9511169, lng: 30.1007935, streeNumber: '28 KG 566 Street' },
    { id: 2, name: 'Location 2', lat: 34.052235, lng: -118.243683, streeNumber:'29 KG 567 Street' },
  ];
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_API_KEY;  

  useEffect(() => {
    if (selectedLocation) {
      const encodedAddress = encodeURIComponent(selectedLocation.streeNumber);
      const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;
      setEmbedUrl(url);
    }
  }, [selectedLocation]); 

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="container flex mx-auto">
      <div className="flex flex-wrap justify-start w-1/2">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} onSelect={handleLocationSelect} />
        ))}
      </div>
      <div className="w-1/2">
        {selectedLocation && (
          <GoogleMapDisplay lat={selectedLocation.lat} lng={selectedLocation.lng} />
        )}
        <h1>Street Number</h1>
        {embedUrl && (
          <iframe
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={embedUrl}>
          </iframe>
        )}
      </div>
    </div>
  );
};

export default Home;
