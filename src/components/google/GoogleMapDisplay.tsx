import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface Props {
    lat: any;
    lng: any;
}

const containerStyle = {
    width: '100%',
    height: '100%',
};

const GoogleMapDisplay: React.FC<Props> = ({ lat, lng }) => {

    console.log(typeof lat, "long")
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
