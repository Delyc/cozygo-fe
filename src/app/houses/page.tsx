'use client';
import { useState } from 'react';
import PropertyCard from '@/components/UI/cards/House';
import Footer from '@/components/layout/Footer';
import NavBar from '@/components/layout/Navbar';
import { useFetchHousesQuery } from '@/redux/api/apiSlice';
import { Search } from '@/components/svgs/Heart';
import SearchForm from '../hero/page';

const Houses = () => {
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 6;

  const { isLoading, data } = useFetchHousesQuery('iii');

  // Calculate the total number of pages
  const totalHouses = data?.length || 0;
  const totalPages = Math.ceil(totalHouses / housesPerPage);

  // Calculate the indexes for slicing the data array for current page
  const lastHouseIndex = currentPage * housesPerPage;
  const firstHouseIndex = lastHouseIndex - housesPerPage;
  const currentHouses = data?.slice(firstHouseIndex, lastHouseIndex) || [];

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);

  // Function to change page
  const paginate = (page: number | string) => {
    switch (page) {
      case 'First':
        setCurrentPage(1);
        break;
      case 'Last':
        setCurrentPage(totalPages);
        break;
      default:
        setCurrentPage(page as number);
    }
  };

  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1) items.push('First');
        else if (i === totalPages) items.push('Last');
        else items.push(i);
      }
    } else {
      items.push('First');
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage > 3) {
        items.push('...');
      }
      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }
      if (currentPage < totalPages - 2) {
        items.push('...');
      }
      items.push('Last');
    }
    return items;
  };

  const paginationItems = getPaginationItems();

  return (
    <section className="flex flex-col gap-10 ">
      <NavBar />
    <div className='w-full mt-[80px] py-20 bg-slate-100'>
      <div className="mx-auto max-w-[90rem] flex flex-col  items-center">
      <SearchForm />

        <div className="flex flex-wrap justify-center py-20 gap-y-20 gap-x-8 gap-4 2xl:gap-8 w-full">
          {currentHouses.map((house, index) => (
            <PropertyCard
              key={index}
              bedrooms={house.bedRooms}
              baths={2}
              area={0}
              price={0}
              title={house.title}
              description={house.description}
              id={house.id} coverImage={house.coverImageUrl}            />
          ))}
        </div>
        {/* Pagination controls */}
        <div className="flex justify-center space-x-2 mt-4">
          {paginationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => paginate(item)}
              className={`px-4 py-2 ${currentPage === item || (item === 'First' && currentPage === 1) || (item === 'Last' && currentPage === totalPages) ? 'bg-blue-500 text-white' : 'bg-white text-black'} border rounded`}
            >
              {item}
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
