import React, { useEffect, useRef } from 'react';

const GoogleMap = ({ location }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the Google Map
    const map = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 15, // You can adjust the initial zoom level
    });

    // Add a marker to the map
    new window.google.maps.Marker({
      position: location,
      map: map,
      title: 'Property Location',
    });
  }, [location]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '300px' }}></div>
  );
};

export default GoogleMap;
