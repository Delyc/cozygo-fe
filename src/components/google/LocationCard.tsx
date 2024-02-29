// Add onSelect to your props interface
interface Props {
    location: Location;
    onSelect: (location: Location) => void;
  }
  
  const LocationCard: React.FC<any> = ({ location, onSelect, showMap }: any) => {
    console.log(location, "locationnn")
    const { name, lat, longi } = location;
  
    return (
      <div className="max-w-sm w-[30rem] p-4 m-2 overflow-hidden rounded shadow-lg">
        <div className="px-6 py-4">
          <div className="mb-2 text-xl font-bold">{name}</div>
          <p>Latitude: {lat}</p>
          <p>Longitude: {longi}</p>
          <button
  className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
  onClick={() => onSelect && onSelect(location)}
>
  Show on Map
</button>

        </div>
      </div>
    );
  };

  export default LocationCard
  