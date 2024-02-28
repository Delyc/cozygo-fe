// SearchForm.tsx
'use client'

import React, { useState } from 'react';
import InputField from '@/components/hero/InputField';
import SelectField from '@/components/hero/SelectField';
import AmenitiesChecklist from '@/components/hero/Amenities';
const SearchForm: React.FC = () => {
  const [advancedSearch, setAdvancedSearch] = useState(false);

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
        <InputField placeholder="Enter keywords..." />
        <SelectField options={['Select Area', 'Area 1', 'Area 2']} />
        <SelectField options={['Select City', 'City 1', 'City 2']} />
        <button className="btn-blue" onClick={() => setAdvancedSearch(!advancedSearch)}>
          {advancedSearch ? 'Less Search' : 'More Search'}
        </button>
      </div>
      {advancedSearch && (
        <>
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4 my-4">
            {/* Add more select fields here as per the second image */}
          </div>
          <AmenitiesChecklist />
        </>
      )}
      <div className="flex justify-end mt-4">
        <button className="btn-blue">Search</button>
      </div>
    </div>
  );
};

export default SearchForm;
