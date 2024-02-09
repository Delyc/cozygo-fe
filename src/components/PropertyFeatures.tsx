import React, { useState } from 'react';

// Define a type for the features state
type FeaturesState = {
  onsiteParking: boolean;
  fireAlarm: boolean;
  coolingSystem: boolean;
  diningRoom: boolean;
  elevator: boolean;
  emergencyExit: boolean;
  garden: boolean;
  familyRoom: boolean;
  firePlace: boolean;
};

const PropertyFeatures: React.FC = () => {
  // Initialize state for each feature
  const [features, setFeatures] = useState<FeaturesState>({
    onsiteParking: false,
    fireAlarm: false,
    coolingSystem: false,
    diningRoom: false,
    elevator: false,
    emergencyExit: false,
    garden: false,
    familyRoom: false,
    firePlace: false,
  });

  // Handler for changes to the checkbox inputs
  const handleFeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className='bg-white flex flex-col gap-2.5 p-5 rounded shadow'>
      <p className='text-start text-sm font-medium'>Other Features (optional)</p>
      <form className='flex flex-wrap gap-2.5'>
        {Object.entries(features).map(([feature, value]) => (
          <label key={feature} className="inline-flex items-center">
            <input
              type="checkbox"
              name={feature}
              checked={value}
              onChange={handleFeatureChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">{feature.split(/(?=[A-Z])/).join(" ")}</span>
          </label>
        ))}
      </form>
    </div>
  );
};

export default PropertyFeatures;
