"use client";
import { useFetchHousesQuery } from "@/redux/api/apiSlice";
import { useState } from "react";
import HouseAgent from "../UI/cards/HouseAgent";
import HouseForm from "../forms/HouseForm";
import AddHouse from "../modals/AddHouse";

const AgentHouse = () => {
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const { isLoading, data } = useFetchHousesQuery("iii");


  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);

  return (
    <div className="flex flex-wrap justify-center  gap-4 2xl:gap-8">
      {data?.map((house) => (
        <HouseAgent
          key={house.id}
          id={house.id}
          bedrooms={house.bedRooms}
          baths={2}
          area={500}
          price={Number(house.price)}
          address={"Meadowview Lane, Tranquil ddsds Springs"}
          fullHouseData = {house}
          wishlist={(house.wishlists).length}
        />
      ))}

      <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
        <HouseForm />
      </AddHouse>
    </div>
  );
};

export default AgentHouse;
