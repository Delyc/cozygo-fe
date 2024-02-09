import React, { useState } from 'react';
import FloatingLabelInput from '../UI/Input'; // Replace with your actual import path

interface Option {
  value: string;
  label: string;
}

type PositionState = {
  latitude: number | null;
  longitude: number | null;
};

const googleMapLocation: Option[] = [
  { value: '', label: '' }, // Placeholder option
  { value: 'sn', label: 'Street Number' },
  { value: 'll', label: 'Use Live Location' },
  { value: 'pl', label: 'Paste Link of House Location' },
];

const LocationForm: React.FC = () => {
  const [position, setPosition] = useState<PositionState>({ latitude: null, longitude: null });
  const [locationRequested, setLocationRequested] = useState<boolean>(false);
  const [googleLocation, setGoogleLocation] = useState<string>('');

  const handleSuccess = (pos: GeolocationPosition) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error('Error getting location:', error.message);
  };

  const handleGoogleLocationChange = (e: any) => {
    const value = e.target.value;
    setGoogleLocation(value);

    if (value === 'll') {
      setLocationRequested(true); // Indicate that user has requested the location
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    } else {
      setLocationRequested(false);
      setPosition({ latitude: null, longitude: null }); // Reset position if not 'll'
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <FloatingLabelInput
        className='w-full'
        id="googleMapLocation"
        label="Select Location Type"
        value={googleLocation}
        onChange={handleGoogleLocationChange}
        options={googleMapLocation.map(option => ({ value: option.value, label: option.label }))}
      />
      {locationRequested && !position.latitude && <p>Loading...</p>}
      {position.latitude && position.longitude && (
        <p>Latitude: {position.latitude}, Longitude: {position.longitude}</p>
      )}
    </div>
  );
};

export default LocationForm;
