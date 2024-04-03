'use client'

interface SearchFormProps {
  onDistrictChange: (selectedDistrict: SingleValue<OptionType> | null) => void;
  onSectorChange: (selectedSector: SingleValue<OptionType> | null) => void;
  onHouseTypeChange: (selectedHouseType: SingleValue<OptionType> | null) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onBedroomsChange: (bedrooms: string) => void;
}

import React, { useState } from 'react';
import InputField from '@/components/hero/InputField';
import SelectField from '@/components/hero/SelectField';
import AmenitiesChecklist from '@/components/hero/Amenities';
import FeatureDevelopment from '@/components/modals/FeatureDevelopment';
import Select, { SingleValue } from 'react-select'


interface OptionType {
  value: string;
  label: string;
}


const SearchForm = ({
  onSearch,
  onDistrictChange,
  onSectorChange,
  onHouseTypeChange,
  onPriceRangeChange,
  onBedroomsChange,
}: any) => {
  const [ftDevelopment, setFtDevelopment] = useState(false)
  const comingSoon = () => {
    
  }
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const districts: OptionType[] = [
    { value: "gasabo", label: "Gasabo" },
    { value: "nyarugenge", label: "Nyarugenge" },
    { value: "kicukiro", label: "Kicukiro" },
  ];

  const houseTypes = [
    { value: "", label: "" },
    { value: "STUDIO", label: "Studio Apartments" },
    { value: "APARTMENTS", label: "2-Bedroom Apartments" },
    { value: "TOWNHOUSE", label: "Townhouses" },
    { value: "DETACHED", label: "Detached Houses" },
    { value: "SEMI_DETACHED", label: "Semi-Detached Houses" },
    { value: "BUNGALOW", label: "Bungalows" },
    { value: "PENTHOUSE", label: "Penthouse Suites" },
    { value: "VILLA", label: "Villas" },
    { value: "SERVICE_APT", label: "Service Apartments" },
  ];

  const districtSectorsMap: { [key: string]: OptionType[] } = {
    gasabo: [
      { value: "bumbogo", label: "Bumbogo" },
      { value: "gatsata", label: "Gatsata" },
      { value: "gikomero", label: "Gikomero" },
      { value: "gisozi", label: "Gisozi" },
      { value: "jabana", label: "Jabana" },
      { value: "jali", label: "Jali" },
      { value: "kacyiru", label: "Kacyiru" },
      { value: "kimihurura", label: "Kimihurura" },
      { value: "kimironko", label: "Kimironko" },
      { value: "kinyinya", label: "Kinyinya" },
      { value: "ndera", label: "Ndera" },
      { value: "nduba", label: "Nduba" },
      { value: "remera", label: "Remera" },
      { value: "rusororo", label: "Rusororo" },
      { value: "rutunga", label: "Rutunga" },
    ],
    nyarugenge: [
      { value: "gitega", label: "Gitega" },
      { value: "kanyinya", label: "Kanyinya" },
      { value: "kigali", label: "Kigali" },
      { value: "kimisagara", label: "Kimisagara" },
      { value: "mageragere", label: "Mageragere" },
      { value: "muhima", label: "Muhima" },
      { value: "nyakabanda", label: "Nyakabanda" },
      { value: "nyamirambo", label: "Nyamirambo" },
      { value: "nyarugenge", label: "Nyarugenge" },
      { value: "rwezamenyo", label: "Rwezamenyo" },
    ],
    kicukiro: [
      { value: "kagarama", label: "Kagarama" },
      { value: "niboye", label: "Niboye" },
      { value: "gatenga", label: "Gatenga" },
      { value: "gikondo", label: "Gikondo" },
      { value: "gahanga", label: "Gahanga" },
      { value: "kanombe", label: "Kanombe" },
      { value: "nyarugunga", label: "Nyarugunga" },
      { value: "kigarama", label: "Kigarama" },
      { value: "masaka", label: "Masaka" },
    ],
  };


  const [selectedDistrict, setSelectedDistrict] = useState<SingleValue<OptionType> | null>(null);
  const [selectedSector, setSelectedSector] = useState<SingleValue<OptionType> | null>(null);
  const [selectedHouseType, setSelectedHouseType] = useState<SingleValue<OptionType> | null>(null);
  const [priceRange, setPriceRange] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('');


  const handleSelectDistrict = (option: SingleValue<OptionType> | null) => {
    setSelectedDistrict(option);
    onDistrictChange(option);
    setSelectedSector(null); // Reset sectors when district changes
  };

  const handleSelectSector = (option: SingleValue<OptionType> | null) => {
    setSelectedSector(option);
    onSectorChange(option);
  };

  const handleSelectHouseType = (option: SingleValue<OptionType> | null) => {
    setSelectedHouseType(option);
    onHouseTypeChange(option);
  };
  const filteredSectors = selectedDistrict ? districtSectorsMap[selectedDistrict.value] : Object.values(districtSectorsMap).flat();



  return (
    <section className='w-full lg:w-2/3 relative'>
      <div className="bg-white/50 p-4 shadow-md rounded-lg  w-full">
        <div className="flex items-center w-full flex-col lg:flex-row md:items-end space-y-4 md:gap-4 md:space-y-0 md:space-x-4">
          <div className='bg-white py-5 px-6 md:py-3 rounded  w-full items-center grid md:grid-cols-3 gap-2 xl:gap-5 lg:w-[80%] '>
            <InputField onChange={onSearch} placeholder="Enter keywords..." />
            <Select
              className=' text-sm'
              value={selectedDistrict}
              onChange={handleSelectDistrict}
              options={districts}
              placeholder="District..."
            />
            <Select
              className=' text-sm'
              value={selectedSector}
              onChange={handleSelectSector}
              options={filteredSectors}
              placeholder="Sector..."
            />






          </div>
          <div className='w-full lg:w-fit flex gap-5 justify-center'>
            <button className="py-4 px-9 bg-indigo-600 text-xs text-white rounded h-[50px]" >Search</button>
            {ftDevelopment && <FeatureDevelopment isOpen={ftDevelopment} onClose={() => setFtDevelopment(false)}>
              <p className="text-xs text-primary_gray">Exciting things are brewing behind the scenes! Stay tuned for the upcoming release of this amazing feature, currently in the works.</p>
            </FeatureDevelopment>}
            <button className=" border border-indigo-600 bg-white text-xs text-indigo-600 h-[50px] rounded px-5 w-36 text-center grid place-content-center py-4" onClick={() => setAdvancedSearch(!advancedSearch)}>
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


      </div>
      {advancedSearch && (
        <>
          <div className='absolute z-30 top-40 lg:top-24 bg-white shadow-2xl rounded w-full px-6 py-10 flex flex-col gap-5'>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2'>
              <Select
                value={selectedHouseType}
                onChange={handleSelectHouseType}
                options={houseTypes}
                placeholder="Select house type..."
              />

              <input
                className='border px-5 outline-none text-xs'
                value={priceRange}
                onChange={(e) => { setPriceRange(e.target.value); onPriceRangeChange(e.target.value); }}
                placeholder='Price Range'
              />
              <input
                className='border px-5 outline-none text-xs'
                value={bedrooms}
                onChange={(e) => { setBedrooms(e.target.value); onBedroomsChange(e.target.value); }}
                placeholder='Bed Rooms'
              />



            </div>

            <AmenitiesChecklist />

          </div>
        </>
      )}
    </section>
  );
};

export default SearchForm;
