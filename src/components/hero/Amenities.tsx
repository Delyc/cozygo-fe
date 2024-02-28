// AmenitiesChecklist.tsx
import React from 'react';

const amenities = ['Onsite Parking', 'Dining Room', 'Elevator', 'Air Condition', 'Fire Place', 'Onsite Parking', 'Dining Room', 'Elevator', 'Air Condition', 'Fire Place'];

const AmenitiesChecklist: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className='uppercase text-sm rounded text-white font-semibold py-3 text-center bg-indigo-600'>AMENITIES</div>
      <div className='grid grid-cols-4 gap-3 text-sm text-primary_gray'>
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
