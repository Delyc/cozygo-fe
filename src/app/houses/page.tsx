'use client';
import React, { useState, useEffect } from 'react';
import { useFetchHousesQuery } from '@/redux/api/apiSlice';
import SearchForm from '../hero/page';
import HouseCard from '@/components/UI/cards/HouseCard';
import NavBar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SingleValue } from 'react-select';
import BookVisitModal from '@/components/modals/BookVisitModal';
import ShareHouseModal from '@/components/modals/ShareHouseModal';
import extractTime from '@/helpers/ConvertToTime';
import { convertDateToReadableFormat } from '@/helpers/convertDate';

const Houses: React.FC = () => {
  const { data: houses, isLoading } = useFetchHousesQuery('houses');
  const [filteredHouses, setFilteredHouses] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 9;

  console.log("housesss", houses)
  // Filter states
  const [filterDistrict, setFilterDistrict] = useState<string>('');
  const [filterSector, setFilterSector] = useState<string>('');
  const [filterHouseType, setFilterHouseType] = useState<string>('');
  const [filterPrice, setFilterPrice] = useState<any>('');
  const [filterBedrooms, setFilterBedrooms] = useState<number>(0);

  useEffect(() => {
    const priceRangeArray = filterPrice.split('-').map(Number);
    const filtered = (houses || []).filter(house => {
      const price = Number(house.price); 
      const withinPriceRange = filterPrice ? (price >= priceRangeArray[0] && price <= priceRangeArray[1]) : true;
      
      const matchesDistrict = filterDistrict ? house.district === filterDistrict : true;
      const matchesSector = filterSector ? house.sector === filterSector : true;
      const matchesHouseType = filterHouseType ? house.type === filterHouseType : true;
      const matchesBedrooms = filterBedrooms ? house.bedRooms === filterBedrooms : true;
  
 
  
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
  const [shareLink, setShareLink] = useState('');


  const [shareHouse, setShareHouse] = useState(false);
  const [agentId, setAgentId] = useState();
  const generateShareLink = async (id: any) => { 
    try {
      const response = await fetch(`http://localhost:8080/public/share/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const link = data.shareLink;
      setShareLink(link);
      navigator.clipboard.writeText(link)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };
  const { isLoading: loader, data } = useFetchHousesQuery("iii");
  const [bookTour, setBookTour] = useState(false);

  const onCloseBookingModal = () =>{
    setBookTour(false)
  }

  const onCloseShareModal = () =>{
    setShareHouse(false)
  }
 
  const stopScrollingWhenShareHouse = (shareHouse: any) => {
    if (shareHouse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };


  const onBookVisit = (id: any) => {
    setAgentId(id)
  }
  const stopScrollingWhenBookVisit = (bookTour: any) => {
    if (bookTour) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  useEffect(() => {
    stopScrollingWhenShareHouse(shareHouse);
  }, [shareHouse]);
  useEffect(() => {
    stopScrollingWhenBookVisit(bookTour);
  }, [bookTour]);
console.log("rtesss", bookTour)

const [ToVisitHouse, setToVisitHouse] = useState<any>();
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
                onShare={() => {
                  generateShareLink(house.id);
                  setShareHouse(!shareHouse)

                } }

                onBookVisit={() => {
                  setToVisitHouse(house);
                  setBookTour(!bookTour)
                }
                }
                coverImage={house.coverImageUrl} lastUpdated={convertDateToReadableFormat(house.updatedAt)} 
                setBookTour={setBookTour}  bookTour={bookTour}   setShareHouse={setShareHouse}   shareHouse={shareHouse} 
                               // date={house.updatedAt} // Add the 'date' property
              />
            ))}

{bookTour && <BookVisitModal onCloseBookingModal={onCloseBookingModal} ToVisitHouse={ToVisitHouse} />}

{shareHouse &&  <ShareHouseModal onCloseShareModal={onCloseShareModal} shareLink={shareLink} copyLinkAgain={copyLinkAgain} />}
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
