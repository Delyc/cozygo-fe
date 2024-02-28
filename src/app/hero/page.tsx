// SearchForm.tsx
'use client'

import React, { useState } from 'react';
import InputField from '@/components/hero/InputField';
import SelectField from '@/components/hero/SelectField';
import AmenitiesChecklist from '@/components/hero/Amenities';
const SearchForm: React.FC = () => {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const districts = [
    { value: "gs", label: "Gasabo" },
    { value: "ny", label: "Nyarugenge" },
    { value: "kc", label: "Kicukiro" },
  ];

  return ( 
    <section className='w-2/3 relative'>
    <div className="bg-white/50 p-4 shadow-md rounded-lg  w-full">
      <div className="flex items-center flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
        <div className='bg-white px-6 rounded h-[50px] items-center grid grid-cols-3 gap-10 w-[67%] '>
        <InputField placeholder="Enter keywords..." />
        <SelectField options={districts} placeholder={'Select district'} />
        <SelectField options={districts} placeholder={'Select district'} />
        </div>
        <button className="py-4 px-9 bg-indigo-600 text-xs text-white rounded h-[50px]">Search</button>
        <button className=" border border-indigo-600 bg-white text-xs text-indigo-600 h-[50px] rounded px-6 py-4" onClick={() => setAdvancedSearch(!advancedSearch)}>
          {!advancedSearch ? <div className='flex items-center gap-2'>   <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#4f46e5" />
            <g clip-path="url(#clip0_120_1483)">
              <path d="M9.5625 6.82495C9.61719 6.82495 9.66211 6.84253 9.69727 6.87769C9.73242 6.91284 9.75 6.95776 9.75 7.01245V7.38745C9.75 7.44214 9.73242 7.48706 9.69727 7.52222C9.66211 7.55737 9.61719 7.57495 9.5625 7.57495H7.875V9.26245C7.875 9.31714 7.85742 9.36206 7.82227 9.39722C7.78711 9.43237 7.74219 9.44995 7.6875 9.44995H7.3125C7.25781 9.44995 7.21289 9.43237 7.17773 9.39722C7.14258 9.36206 7.125 9.31714 7.125 9.26245V7.57495H5.4375C5.38281 7.57495 5.33789 7.55737 5.30273 7.52222C5.26758 7.48706 5.25 7.44214 5.25 7.38745V7.01245C5.25 6.95776 5.26758 6.91284 5.30273 6.87769C5.33789 6.84253 5.38281 6.82495 5.4375 6.82495H7.125V5.13745C7.125 5.08276 7.14258 5.03784 7.17773 5.00269C7.21289 4.96753 7.25781 4.94995 7.3125 4.94995H7.6875C7.74219 4.94995 7.78711 4.96753 7.82227 5.00269C7.85742 5.03784 7.875 5.08276 7.875 5.13745V6.82495H9.5625Z" fill="#4f46e5" />
            </g>
            <defs>
              <clipPath id="clip0_120_1483">
                <rect width="4.5" height="6" fill="white" transform="matrix(1 0 0 -1 5.25 10.2)" />
              </clipPath>
            </defs>
          </svg> <p>More Search</p> </div> : <div className='flex items-center gap-2'><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="14" height="14" rx="7" stroke="#4f46e5" />
            <rect x="4" y="7" width="7" height="0.8" fill="#4f46e5" />
          </svg>
            <p>Less Search</p></div>}
        </button>

      </div>
    
 
    </div>
    {advancedSearch && (
        <>
         <div className='absolute top-24 bg-white shadow-2xl rounded w-full px-6 py-10 flex flex-col gap-5'>
          <div className='grid grid-cols-3 gap-x-4 gap-y-2'>
        <SelectField options={districts} placeholder={'Select district'} className='border border-gray-100 py-4 rounded px-3' />
        <SelectField options={districts} placeholder={'Select district'} className='border border-gray-100 py-4 rounded px-3' />
        <SelectField options={districts} placeholder={'Select district'} className='border border-gray-100 py-4 rounded px-3' />
        <SelectField options={districts} placeholder={'Select district'} className='border border-gray-100 py-4 rounded px-3' />
        <SelectField options={districts} placeholder={'Select district'} className='border border-gray-100 py-4 rounded px-3' />
        <SelectField options={districts} placeholder={'Select district'} className='border border-gray-100 py-4 rounded px-3' />
     

          </div>

         <AmenitiesChecklist />

         </div>
        </>
      )}
    </section>
  );
};

export default SearchForm;
