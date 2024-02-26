'use client'

import React, { useState } from 'react';

const MapPage = () => {
  const [address, setAddress] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const GOOGLE_MAPS_API_KEY = 'AIzaSyDQIisXRhKV-5K8KWsuMfRjLVGMMperE58'; // Replace with your actual Google Maps API key

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedAddress = encodeURIComponent(address);
    const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;
    setEmbedUrl(url);
  };

  return (
    <div>
      <form onSubmit={handleAddressSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter address"
          required
        />
        <button type="submit">Show on Map</button>
      </form>

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
  );
};

export default MapPage;
