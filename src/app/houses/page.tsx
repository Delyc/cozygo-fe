'use client'

import { useEffect, useState } from "react";
import { SingleValue } from 'react-select';
import HouseCard from "@/components/organisms/House";
import Navbar from "@/components/organisms/Navbar";
import Search from "@/components/organisms/Search";
import { useFetchHouses } from "@/services/hooks/house";
import { decodeToken } from "@/helpers/decodeToken";
import { House } from "@/types/types";
import Loader from "@/components/molecules/Loader";

interface OptionType {
  value: string;
  label: string;
}

type Filters = {
  category?: string;
  district?: string;
  sector?: string;
  priceRange?: string;
  bedrooms?: string;
  bathrooms?: string;
  favoritesOnly?: boolean;
  userId?: string;
};

const Houses = () => {
  const [token, setToken] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({});
  
  // State for Search component props
  const [selectedDistrict, setSelectedDistrict] = useState<SingleValue<OptionType> | null>(null);
  const [selectedSector, setSelectedSector] = useState<SingleValue<OptionType> | null>(null);
  const [selectedHouseType, setSelectedHouseType] = useState<SingleValue<OptionType> | null>(null);
  const [priceRange, setPriceRange] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');
  const [isFavorites, setIsFavorites] = useState<boolean>(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);

  const user = token ? decodeToken(token) : null;
  const userId = user?.userId || '';

  // Combine filters with userId
  const combinedFilters = { 
    userId, 
    ...filters
  };

  const { data: houses, isLoading, error } = useFetchHouses(combinedFilters);

  // Individual filter handlers
  const handleDistrictChange = (option: SingleValue<OptionType> | null) => {
    setSelectedDistrict(option);
    setFilters(prev => ({
      ...prev,
      district: option?.value || undefined,
      sector: undefined // Clear sector when district changes
    }));
  };

  const handleSectorChange = (option: SingleValue<OptionType> | null) => {
    setSelectedSector(option);
    setFilters(prev => ({
      ...prev,
      sector: option?.value || undefined
    }));
  };

  const handleHouseTypeChange = (option: SingleValue<OptionType> | null) => {
    setSelectedHouseType(option);
    setFilters(prev => ({
      ...prev,
      category: option?.value || undefined 
    }));
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    setFilters(prev => ({
      ...prev,
      priceRange: value || undefined
    }));
  };

  const handleBedroomsChange = (value: string) => {
    setBedrooms(value);
    setFilters(prev => ({
      ...prev,
      bedrooms: value || undefined
    }));
  };

  const handleBathroomsChange = (value: string) => {
    setBathrooms(value);
    setFilters(prev => ({
      ...prev,
      bathrooms: value || undefined
    }));
  };

  const handleFavoritesChange = (checked: boolean) => {
    setIsFavorites(checked);
    setFilters(prev => ({
      ...prev,
      isFavorited: checked
    }));
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading houses: {error.message}</p>;

  return (
    <section>
      <Navbar />
      <div className="pt-24 flex h-screen">
        <div className="overflow-y-auto">
          <Search 
            onDistrictChange={handleDistrictChange}
            onSectorChange={handleSectorChange}
            onHouseTypeChange={handleHouseTypeChange}
            onPriceRangeChange={handlePriceRangeChange}
            onBedroomsChange={handleBedroomsChange}
            onBathroomsChange={handleBathroomsChange}
            onFavoritesChange={handleFavoritesChange}
            houses={true}
            selectedDistrict={selectedDistrict}
            selectedSector={selectedSector}
            selectedHouseType={selectedHouseType}
            priceRange={priceRange}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            isFavorites={isFavorites}
          />
        </div>
        <div className="grid bg-slate-100 md:grid-cols-2 lg:grid-cols-3 px-5 md:px-10 gap-8 py-10 flex-1 overflow-y-auto">
          {houses?.map((house: House, index) => (
            <HouseCard
              key={house.id || index} 
              title={house.title}
              description={house.description}
              favorites={house.isFavorited ?? false}
              imgSrc={house.coverImageUrl || "/assets/hs.png"}
              id={house.id || ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Houses;