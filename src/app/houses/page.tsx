"use client";
import PropertyCard from "@/components/UI/cards/House";
import HouseAgent from "@/components/UI/cards/HouseAgent";
import HouseForm from "@/components/forms/HouseForm";
import AddHouse from "@/components/modals/AddHouse";
import { useFetchHousesQuery } from "@/redux/api/apiSlice";
import { useState } from "react";


const Houses = () => {
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const { isLoading, data } = useFetchHousesQuery("iii");
  console.log(data);

  console.log("housaess");

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);

  return (
    <div className="flex flex-wrap justify-center py-20  gap-4 2xl:gap-8">
      {data?.map((house) => (
        <PropertyCard 
          bedrooms={house.bedRooms}
          baths={2}
          area={0}
          price={0}
          title={house.title}           
          description={house.description}           
          id={house.id}
          />
    
      ))}

      <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
        <HouseForm />
      </AddHouse>
    </div>
  );
};

export default Houses;
