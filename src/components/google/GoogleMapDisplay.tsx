import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Props {
    lat: number;
    lng: number;
}

const containerStyle = {
    width: '400px',
    height: '400px',
};

const GoogleMapDisplay: React.FC<Props> = ({ lat, lng }) => {
    const center = {
        lat,
        lng,
    };

    const API_KEY = process.env.NEXT_PUBLIC_API_KEY

    return (
        <LoadScript googleMapsApiKey={`${API_KEY}`}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapDisplay;
