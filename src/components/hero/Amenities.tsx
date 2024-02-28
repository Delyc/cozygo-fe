// AmenitiesChecklist.tsx
import React from 'react';

const amenities = ['Onsite Parking', 'Dining Room', 'Elevator', 'Air Condition', 'Fire Place'];

const AmenitiesChecklist: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      {amenities.map((amenity, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input type="checkbox" className="checkbox" />
          <span>{amenity}</span>
        </label>
      ))}
    </div>
  );
};

export default AmenitiesChecklist;
