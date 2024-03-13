import React from 'react';

interface LocationCardProps {
  lat: number;
  lng: number;
  onShowMap: (lat: number, lng: number) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ lat, lng, onShowMap }) => {
  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <div>Latitude: {lat}</div>
      <div>Longitude: {lng}</div>
      <button onClick={() => onShowMap(lat, lng)}>Show Map</button>
    </div>
  );
};

export default LocationCard;
