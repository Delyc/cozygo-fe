import React, { useState } from 'react';
import FloatingLabelInput from '../UI/Input';

interface Option {
  value: string;
  label: string;
}

type PositionState = {
  latitude: number | null;
  longitude: number | null;
};

type LocationProps = {
  setLong: (long: string) => void;
  setLat: (long: string) => void;
  setStreetNbr: (long: string) => void;
};


const googleMapLocation: Option[] = [
  { value: '', label: '' },
  { value: 'sn', label: 'Street Number' },
  { value: 'll', label: 'Use Live Location' },
];

const LocationForm: React.FC<LocationProps> = ({setLong, setLat, setStreetNbr, setFormError}: any) => {
  const [position, setPosition] = useState<PositionState>({ latitude: null, longitude: null });
  const [locationRequested, setLocationRequested] = useState<boolean>(false);
  const [googleLocation, setGoogleLocation] = useState<string>('');
  const [showStreetNumberInput, setShowStreetNumberInput] = useState<boolean>(false);
  const [streetNumber, setStreetNumber] = useState<string>('');

  const handleSuccess = (pos: GeolocationPosition) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
  };
  setLong(position.longitude)
  setLat(position.latitude)
  

  const handleError = (error: GeolocationPositionError) => {
    console.error('Error getting location:', error.message);
  };

  const handleGoogleLocationChange = (e: any) => {
    const value = e.target.value;
    setGoogleLocation(value);

    // Show input for street number if 'sn' is selected, otherwise hide
    setShowStreetNumberInput(value === 'sn');

    if (value === 'll') {
      setLocationRequested(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    } else {
      setLocationRequested(false);
      setPosition({ latitude: null, longitude: null });
    }
  };

  const onChangeStreet = (street: any) => {
    setStreetNumber(street)
  setStreetNbr(street)

  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        <FloatingLabelInput
          className='w-full'
          id="googleMapLocation"
          label="Select Location Type"
          value={googleLocation}
          onChange={handleGoogleLocationChange}
          setFormError={setFormError}
          options={googleMapLocation.map(option => ({ value: option.value, label: option.label }))}
        />
        {showStreetNumberInput && (
          <FloatingLabelInput
            className='px-3 py-2 border border-gray-300 form-input'
            type="text"
            value={streetNumber}
            onChange={(e) => onChangeStreet(e.target.value)}
            label="Street Number" id={'streetNumber'}          />
        )}
      </div>
      {locationRequested && !position.latitude && <p>Loading...</p>}
      {position.latitude && position.longitude && (
        <p>Latitude: {position.latitude}, Longitude: {position.longitude}</p>
      )}
    </div>
  );
};

export default LocationForm;
