import React from 'react';

const amenities = [
  'Onsite Parking',
  'Dining Room',
  'Elevator',
  'Air Condition',
  'Fire Place',
  'Onsite Parking',
  'Dining Room',
  'Elevator',
  'Air Condition',
  'Fire Place',
];

interface AmenitiesChecklistProps {
  isHomePage?: boolean;
}

const AmenitiesChecklist: React.FC<AmenitiesChecklistProps> = ({ isHomePage = true }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="uppercase text-sm rounded text-white font-semibold py-3 text-center bg-blue-900">
        AMENITIES
      </div>
      <div
        className={`${
          isHomePage ? 'grid gap-2' : 'grid grid-cols-2 md:grid-cols-4 gap-3 text-sm '
        } text-gray-500`}
      >
        {amenities.map((amenity, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input type="checkbox" className="checkbox" />
            <span>{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesChecklist;
