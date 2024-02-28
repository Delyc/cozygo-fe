import React, { useState } from 'react';
import { FeaturesState } from '@/app/types/PropertyFeatures';

type PropertyFeaturesProps = {
  features: FeaturesState;
  setFeatures: (updatedFeatures: FeaturesState) => void;
};



const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features, setFeatures }) => {



  const handleFeatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeatures({
      ...features,
      [event.target.name]: event.target.checked,
    });
  };

  console.log("festutessss", features)
  // Handler for form submission

  return (
    <div className='bg-white flex flex-col gap-2.5 p-5 rounded shadow'>
      <p className='text-sm font-medium text-start'>Other Features (optional)</p>
        {Object.entries(features).map(([feature, value]) => (
          <label key={feature} className="inline-flex items-center">
            <input
              type="checkbox"
              name={feature}
              checked={value}
              onChange={handleFeatureChange}
              className="w-4 h-4 text-blue-600 form-checkbox"
            />
            <span className="ml-2 text-sm text-gray-700">{feature.split(/(?=[A-Z])/).join(" ")}</span>
          </label>
        ))}

    </div>
  );
};

export default PropertyFeatures;
