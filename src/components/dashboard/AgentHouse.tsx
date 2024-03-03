"use client";
import { useFetchHousesQuery } from "@/redux/api/apiSlice";
import { useState, useEffect } from "react";
import HouseAgent from "../UI/cards/HouseAgent";
import HouseForm from "../forms/HouseForm";
import AddHouse from "../modals/AddHouse";
import getToken from "@/helpers/getToken";
import { decodeToken } from "@/helpers/decodeToken";
import Button from "../UI/Button";

const AgentHouse = () => {
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const { isLoading, data } = useFetchHousesQuery("iii");
  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
}, [])


  const user = decodeToken(token || '')

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);
  return (
    <div className="flex flex-wrap justify-center w-full gap-4 2xl:gap-8">
      <div className="mt-10">
        {data && data?.filter((house) => house.agentId === Number(user?.id)).length > 0 ? (
    data
      .filter((house) => house.agentId === Number(user?.id)) 
      .map((house) => (
        <HouseAgent
          key={house.id}
          id={house.id}
          bedrooms={house.bedRooms}
          baths={2}
          area={500}
          price={Number(house.price)}
          address={"Meadowview Lane, Tranquil ddsds Springs"}
          fullHouseData={house}
          wishlist={house.wishlists.length}
        />
      ))
  ) : (
    <div className="flex flex-col gap-2 items-center justify-center w-full mt-10">
    <div className="w-1/2 flex flex-col gap-2 items-center">
      <h3 className="font-medium ">Hello {user?.firstName}</h3>
      <p className="text-primary_gray text-3xl">You haven't added any property yet!!!</p>
      <p className="text-primary_gray text-sm text-center">We{"'"}It seems you haven{"'"}t added any properties to the platform yet! No worries, let{"'"}s get started on listing your available properties to help potential clients find their dream homes.</p>

    </div>
  
  
  </div>
  )}
      </div>
     

      <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
        <HouseForm />
      </AddHouse>
    </div>
  );
};

export default AgentHouse;
