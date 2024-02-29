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
    <div className="flex flex-wrap justify-center  gap-4 2xl:gap-8">
      {data?.map((house) => (
        <PropertyCard 
          bedrooms={house.bedRooms}
          baths={2}
          area={0}
          price={0}
          address={""}           id={house.id}
          />
        // <HouseAgent
        //   key={house.id}
        //   id={house.id}
        //   bedrooms={house.bedRooms}
        //   baths={2}
        //   area={500}
        //   price={Number(house.price)}
        //   address={"Meadowview Lane, Tranquil ddsds Springs"}
        //   fullHouseData = {house}
        //   wishlist={(house.wishlists).length}
        // />
      ))}

      <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
        <HouseForm />
      </AddHouse>
    </div>
  );
};

export default Houses;
