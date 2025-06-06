'use client'

import React, { useState, useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import AmenitiesChecklist from './AmenitiesChecklist';
import { OptionType } from '@/types/types';



interface SearchProps {
  onDistrictChange: (option: SingleValue<OptionType> | null) => void;
  onSectorChange: (option: SingleValue<OptionType> | null) => void;
  onHouseTypeChange: (option: SingleValue<OptionType> | null) => void;
  onPriceRangeChange: (value: string) => void;
  onBedroomsChange: (value: string) => void;
  onBathroomsChange: (value: string) => void;
  onFavoritesChange: (checked: boolean) => void;
  houses?: boolean;
  selectedDistrict?: SingleValue<OptionType> | null;
  selectedSector?: SingleValue<OptionType> | null;
  selectedHouseType?: SingleValue<OptionType> | null;
  priceRange?: string;
  bedrooms?: string;
  bathrooms?: string;
  isFavorites?: boolean;
  isHomePage?: boolean
}

const districts: OptionType[] = [
  { value: "gasabo", label: "Gasabo" },
  { value: "nyarugenge", label: "Nyarugenge" },
  { value: "kicukiro", label: "Kicukiro" },
];

const houseTypes: OptionType[] = [
  { value: "", label: "All Types" },
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

const districtSectorsMap: Record<string, OptionType[]> = {
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

const Search: React.FC<SearchProps> = ({
  onDistrictChange,
  onSectorChange,
  onHouseTypeChange,
  onPriceRangeChange,
  onBedroomsChange,
  onBathroomsChange,
  onFavoritesChange,
  houses = false,
  selectedDistrict = null,
  selectedSector = null,
  selectedHouseType = null,
  priceRange = '',
  bedrooms = '',
  bathrooms = '',
  isFavorites = false,
}) => {

  const [localSelectedDistrict, setLocalSelectedDistrict] = useState<SingleValue<OptionType> | null>(selectedDistrict);
  const [localSelectedSector, setLocalSelectedSector] = useState<SingleValue<OptionType> | null>(selectedSector);
  const [localSelectedHouseType, setLocalSelectedHouseType] = useState<SingleValue<OptionType> | null>(selectedHouseType);
  const [localPriceRange, setLocalPriceRange] = useState<string>(priceRange);
  const [localBedrooms, setLocalBedrooms] = useState<string>(bedrooms);
  const [localBathrooms, setLocalBathrooms] = useState<string>(bathrooms);
  const [localFavoritesOnly, setLocalFavoritesOnly] = useState<boolean>(isFavorites);

  // Sync with parent props when they change
  useEffect(() => {
    setLocalSelectedDistrict(selectedDistrict);
  }, [selectedDistrict]);

  useEffect(() => {
    setLocalSelectedSector(selectedSector);
  }, [selectedSector]);

  useEffect(() => {
    setLocalSelectedHouseType(selectedHouseType);
  }, [selectedHouseType]);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  useEffect(() => {
    setLocalBedrooms(bedrooms);
  }, [bedrooms]);

  useEffect(() => {
    setLocalBathrooms(bathrooms);
  }, [bathrooms]);

  useEffect(() => {
    setLocalFavoritesOnly(isFavorites);
  }, [isFavorites]);

  const handleSelectDistrict = (option: SingleValue<OptionType> | null) => {
    setLocalSelectedDistrict(option);
    onDistrictChange(option);
    // Clear sector when district changes
    setLocalSelectedSector(null);
    onSectorChange(null);
  };

  const handleSelectSector = (option: SingleValue<OptionType> | null) => {
    setLocalSelectedSector(option);
    onSectorChange(option);
  };

  const handleSelectHouseType = (option: SingleValue<OptionType> | null) => {
    setLocalSelectedHouseType(option);
    onHouseTypeChange(option);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalPriceRange(value);
    onPriceRangeChange(value);
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalBedrooms(value);
    onBedroomsChange(value);
  };

  const handleBathroomsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalBathrooms(value);
    onBathroomsChange(value);
  };

  const handleFavoritesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setLocalFavoritesOnly(checked);
    onFavoritesChange(checked);
  };

  const filteredSectors = localSelectedDistrict
    ? districtSectorsMap[localSelectedDistrict.value]
    : [];

  return (
    <section className={`${houses ? 'flex w-[20rem] h-screen overflow-scroll' : 'w-full lg:w-2/3'}`}>
      <div className='z-30 bg-white shadow-2xl rounded w-full px-6 py-10 flex flex-col gap-5'>
        {houses && (
          <label className="flex items-center text-gray-500 space-x-2">
            <input 
              type="checkbox" 
              className="checkbox" 
              checked={localFavoritesOnly}
              onChange={handleFavoritesChange}
            />
            <span>Favorites</span>
          </label>
        )}

        <div className={`${houses ? 'grid gap-3' : 'grid grid-cols-2 lg:grid-cols-3 gap-x-4 h-fit gap-y-2'}`}>
          <Select
            className='border border-slate-200 rounded text-gray-500'
            value={localSelectedHouseType}
            onChange={handleSelectHouseType}
            options={houseTypes}
            placeholder="Select house type..."
            isClearable
          />

          <Select
            className='border border-slate-200 text-gray-500 rounded'
            value={localSelectedDistrict}
            onChange={handleSelectDistrict}
            options={districts}
            placeholder="Select District"
            isClearable
          />

          <Select
            key={localSelectedDistrict?.value || 'no-district'}
            className='border border-slate-200 text-gray-500 rounded'
            value={localSelectedSector}
            onChange={handleSelectSector}
            options={filteredSectors}
            isDisabled={!localSelectedDistrict}
            placeholder="Select Sector"
            isClearable
          />

          <input
            className='border border-slate-200 h-10 rounded px-5 text-gray-500 outline-none text-xs'
            value={localPriceRange}
            onChange={handlePriceRangeChange}
            placeholder='Price Range'
          />

          <input
            className='border border-slate-200 h-10 rounded text-gray-500 px-5 outline-none text-xs'
            value={localBedrooms}
            onChange={handleBedroomsChange}
            placeholder='Bedrooms'
          />

          <input
            className='border border-slate-200 h-10 rounded text-gray-500 px-5 outline-none text-xs'
            value={localBathrooms}
            onChange={handleBathroomsChange}
            placeholder='Bathrooms'
          />
        </div>

        <AmenitiesChecklist isHomePage={houses} />
      </div>
    </section>
  );
};

export default Search;