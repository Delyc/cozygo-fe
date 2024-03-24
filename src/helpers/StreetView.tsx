import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapPanoramaProps {
  lat: number;
  lng: number;
}

const GoogleMapPanorama: React.FC<GoogleMapPanoramaProps> = ({ lat, lng }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const panoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const initialize = () => {
      if (!window.google || !mapRef.current || !panoRef.current) {
        console.error("Google Maps API not loaded or DOM references are missing");
        return;
      }

      setIsVisible(false); // Hide before initialization
      const position = { lat, lng };

      const map = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 14,
      });

      const panorama = new window.google.maps.StreetViewPanorama(panoRef.current, {
        position: position,
        pov: { heading: 34, pitch: 10 },
      });

      map.setStreetView(panorama);
      setIsVisible(true); // Show after initialization
    };

    const loadGoogleMapsScript = (callbackName: string) => {
      if (!document.getElementById('googleMapsScript')) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_API_KEY}&callback=${callbackName}`;
        script.id = 'googleMapsScript';
        script.defer = true;
        document.body.appendChild(script);

        (window as any)[callbackName] = () => {
          initialize();
          delete (window as any)[callbackName];
        };
      } else {
        // If the script is already loaded, just initialize
        initialize();
      }
    };

    loadGoogleMapsScript('initializeGoogleMap');
  }, [lat, lng]);

  return (
    <>

    <div className='flex flex-col gap-20'>
    <div ref={mapRef} style={{ width: '400px', height: '300px', display: isVisible ? 'block' : 'none' }}></div>
      <div ref={panoRef} style={{ width: '400px', height: '300px', display: isVisible ? 'block' : 'none' }}></div>
    </div>
     
    </>
  );
};

export default GoogleMapPanorama;
