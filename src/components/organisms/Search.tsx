'use client'

import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select'
import AmenitiesChecklist from './AmenitiesChecklist';

interface OptionType {
    value: string;
    label: string;
}

const Search = ({
    onDistrictChange,
    onSectorChange,
    onHouseTypeChange,
    onPriceRangeChange,
    onBedroomsChange,
    houses
}: any) => {
    const [selectedDistrict, setSelectedDistrict] = useState<SingleValue<OptionType> | null>(null);
    const [selectedSector, setSelectedSector] = useState<SingleValue<OptionType> | null>(null);
    const [selectedHouseType, setSelectedHouseType] = useState<SingleValue<OptionType> | null>(null);
    const [priceRange, setPriceRange] = useState<string>('');
    const [bedrooms, setBedrooms] = useState<string>('');

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

    const handleSelectDistrict = (option: SingleValue<OptionType> | null) => {
        setSelectedDistrict(option);
        onDistrictChange(option);
        setSelectedSector(null); // reset sector input
        onSectorChange(null); // notify parent it's cleared
    };

    const handleSelectSector = (option: SingleValue<OptionType> | null) => {
        setSelectedSector(option);
        onSectorChange(option);
    };

    const handleSelectHouseType = (option: SingleValue<OptionType> | null) => {
        setSelectedHouseType(option);
        onHouseTypeChange(option);
    };

    const filteredSectors = selectedDistrict
        ? districtSectorsMap[selectedDistrict.value]
        : [];

    return (
        <section className={`${houses ? 'w-[20rem] h-screen overflow-scroll' :'w-full lg:w-2/3'}`}>
            <div className='z-30 bg-white shadow-2xl rounded w-full px-6 py-10 flex flex-col gap-5'>
                {houses && <label className="flex items-center text-gray-500 space-x-2">
            <input type="checkbox" className="checkbox" />
            <span >Favorites</span>
          </label>
          }
                <div className={`${houses ? 'grid gap-3' : 'grid grid-cols-2 lg:grid-cols-3 gap-x-4 h-fit gap-y-2'}`}>
                    <Select
                        className='border border-slate-200 rounded text-gray-500'
                        value={selectedHouseType}
                        onChange={handleSelectHouseType}
                        options={houseTypes}
                        placeholder="Select house type..."
                    />

                    <Select
                        className='border border-slate-200 text-gray-500 rounded'
                        value={selectedDistrict}
                        onChange={handleSelectDistrict}
                        options={districts}
                        placeholder="Select District"
                    />

                    <Select
                        key={selectedDistrict?.value || 'no-district'}
                        className='border border-slate-200 text-gray-500 rounded'
                        value={selectedSector}
                        onChange={handleSelectSector}
                        options={filteredSectors}
                        isDisabled={!selectedDistrict}
                        placeholder="Select Sector"
                    />

                    <input
                        className='border border-slate-200 h-10 rounded px-5 text-gray-500 outline-none text-xs'
                        value={priceRange}
                        onChange={(e) => {
                            setPriceRange(e.target.value);
                            onPriceRangeChange(e.target.value);
                        }}
                        placeholder='Price Range'
                    />

                    <input
                        className='border border-slate-200 h-10 rounded text-gray-500 px-5 outline-none text-xs'
                        value={bedrooms}
                        onChange={(e) => {
                            setBedrooms(e.target.value);
                            onBedroomsChange(e.target.value);
                        }}
                        placeholder='Bedrooms'
                    />

                    <input
                        className='border border-slate-200 h-10 rounded text-gray-500 px-5 outline-none text-xs'
                        value={bedrooms}
                        onChange={(e) => {
                            setBedrooms(e.target.value);
                            onBedroomsChange(e.target.value);
                        }}
                        placeholder='Bathrooms'
                    />
                </div>

                <AmenitiesChecklist  houses={houses}/>
            </div>
        </section>
    );
};

export default Search;
