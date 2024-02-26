// Add onSelect to your props interface
interface Props {
    location: Location;
    onSelect: (location: Location) => void;
  }
  
  const LocationCard: React.FC<any> = ({ location, onSelect }) => {
    const { name, lat, lng } = location;
  
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
          <button
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
  onClick={() => onSelect && onSelect(location)}
>
  Show on Map
</button>

        </div>
      </div>
    );
  };

  export default LocationCard
  