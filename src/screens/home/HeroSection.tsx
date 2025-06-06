'use client'
import React, { useState } from "react";
import Search from "@/components/organisms/Search";
import { OptionType } from "@/types/types";

const HeroSection = () => {
  const [district, setDistrict] = useState<OptionType | null>(null);
  const [sector, setSector] = useState<OptionType | null>(null);
  const [houseType, setHouseType] = useState<OptionType | null>(null);
  const [priceRange, setPriceRange] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [favorites, setFavorites] = useState(false);

  return (
    <div className="w-full bg-black/20 h-full flex justify-center">
      <div className="text-center px-5 h-full pt-40 w-full md:w-4/5 max-w-[80rem] flex flex-col items-center">
      <div className="flex flex-col h-40 gap-3 mb-5 lg:w-2/3 px-5 pt-20 rounded bg-white/20">
      </div>
        <Search
          onDistrictChange={setDistrict}
          onSectorChange={setSector}
          onHouseTypeChange={setHouseType}
          onPriceRangeChange={setPriceRange}
          onBedroomsChange={setBedrooms}
          onBathroomsChange={setBathrooms}
          onFavoritesChange={setFavorites}
          selectedDistrict={district}
          selectedSector={sector}
          selectedHouseType={houseType}
          priceRange={priceRange}
          bedrooms={bedrooms}
          bathrooms={bathrooms}
          isFavorites={favorites}
          isHomePage={true}
        />
      </div>
    </div>
  );
};

export default HeroSection;
