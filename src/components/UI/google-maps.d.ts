declare global {
    interface Window {
      google: {
        maps: {
          Map: typeof google.maps.Map;
          Marker: typeof google.maps.Marker;
        };
      };
    }
  }
  