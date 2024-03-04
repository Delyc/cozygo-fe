// Use client
'use client'
import { useState } from "react";
import PropertyCard from "@/components/UI/cards/House";
import HouseAgent from "@/components/UI/cards/HouseAgent";
import HouseForm from "@/components/forms/HouseForm";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import AddHouse from "@/components/modals/AddHouse";
import { useFetchHousesQuery } from "@/redux/api/apiSlice";

const Houses = () => {
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const housesPerPage = 5;

  const { isLoading, data } = useFetchHousesQuery("iii");

  // Calculate the total number of pages
  const totalHouses = data?.length || 0;
  const totalPages = Math.ceil(totalHouses / housesPerPage);

  // Calculate the indexes for slicing the data array
  const lastHouseIndex = currentPage * housesPerPage;
  const firstHouseIndex = lastHouseIndex - housesPerPage;
  const currentHouses = data?.slice(firstHouseIndex, lastHouseIndex) || [];

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);

  // Function to change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="">
      <NavBar />
      <div className="mx-auto max-w-[90rem]">
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
              id={house.id}
            />
          ))}
        </div>
        {/* Pagination controls */}
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'} border rounded`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Houses;
