'use client';
import React, { useState, useEffect } from 'react';
import { useFetchHousesQuery } from '@/redux/api/apiSlice';
import SearchForm from '../hero/page';
import HouseCard from '@/components/UI/cards/HouseCard';
import NavBar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SingleValue } from 'react-select';
// import { OptionType, House } from './types'; // Adjust the import path as needed

const Houses: React.FC = () => {
  const { data: houses, isLoading } = useFetchHousesQuery('houses');
  const [filteredHouses, setFilteredHouses] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 1;

  console.log("housesss", houses)
  // Filter states
  const [filterDistrict, setFilterDistrict] = useState<string>('');
  const [filterSector, setFilterSector] = useState<string>('');
  const [filterHouseType, setFilterHouseType] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<any>('');
  const [filterBedrooms, setFilterBedrooms] = useState<number>(0);

  // Apply filters whenever houses data or filter states change
  useEffect(() => {
    const priceRangeArray = filterPrice.split('-').map(Number);
    const filtered = (houses || []).filter(house => {
      const price = Number(house.price); // Assuming price is already a number or you convert it accordingly
      const withinPriceRange = filterPrice ? (price >= priceRangeArray[0] && price <= priceRangeArray[1]) : true;
      
      const matchesDistrict = filterDistrict ? house.district === filterDistrict : true;
      const matchesSector = filterSector ? house.sector === filterSector : true;
      const matchesHouseType = filterHouseType ? house.type === filterHouseType : true;
      const matchesBedrooms = filterBedrooms ? house.bedRooms === filterBedrooms : true;
  
      // Log to see if a house matches a specific criterion
      console.log(`Filtering house ${house.id}: Matches Price? ${withinPriceRange}`);
  
      return matchesDistrict || matchesSector || matchesHouseType || withinPriceRange || matchesBedrooms;
    });
  
    setFilteredHouses(filtered);
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [houses, filterDistrict, filterSector, filterHouseType, filterPrice, filterBedrooms]);
  
  // Pagination logic
  const lastHouseIndex = currentPage * housesPerPage;
  const firstHouseIndex = lastHouseIndex - housesPerPage;
  const currentHouses = filteredHouses.slice(firstHouseIndex, lastHouseIndex);

  const totalPages = Math.ceil(filteredHouses.length / housesPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="flex flex-col gap-10">
      <NavBar />
      <div className='w-full mt-[80px] py-20 bg-slate-100'>
        <div className="mx-auto max-w-[90rem] flex flex-col items-center">
          <SearchForm
            onDistrictChange={(selectedDistrict: SingleValue<any> | null) => setFilterDistrict(selectedDistrict ? selectedDistrict.value : '')}
            onSectorChange={(selectedSector: SingleValue<any> | null) => setFilterSector(selectedSector ? selectedSector.value : '')}
            onHouseTypeChange={(selectedHouseType: SingleValue<any> | null) => setFilterHouseType(selectedHouseType ? selectedHouseType.value : '')}
            onPriceRangeChange={setFilterPrice}
            onBedroomsChange={(bedrooms: string) => setFilterBedrooms(Number(bedrooms) || 0)}
          />
          <div className="flex mx-auto max-w-[80rem] flex-wrap justify-center py-20 gap-y-20 gap-x-8 gap-4 2xl:gap-8 w-full">
            {currentHouses.map((house: any) => (
              <HouseCard
                key={house.id}
                bedrooms={house.bedRooms}
                baths={house.baths}
                area={house.area}
                price={house.price}
                title={house.title}
                description={house.description}
                id={house.id}
                coverImage={house.coverImageUrl}
                date={house.updatedAt}
              />
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
              <button className='px-2' key={number} onClick={() => paginate(number)}>
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Houses;
