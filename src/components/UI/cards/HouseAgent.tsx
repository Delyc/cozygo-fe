"use client"
import HouseForm from "@/components/forms/HouseForm";
import AddHouse from "@/components/modals/AddHouse";
import {
  useDeleteHouseMutation,
  useFetchHousesQuery,
  useGetHouseWishlistQuery,
  useToggleHouseInWishListMutation,
} from "@/redux/api/apiSlice";
import { HouseDTO } from "@/types/houses";
import React, { useState } from "react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { ArrowIcon, LocationIcon, RoomIcon } from "../../svgs/Heart";
import { useRouter } from "next/navigation";
import CoverImage from "../CoverImageUpload";

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
  id: number;
  fullHouseData: HouseDTO;
  wishlist: number;

};

const HouseAgent: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  address,
  id,
  fullHouseData,
  wishlist,
  
}) => {
  console.log(id)
  const USER_ID = 1;

  const router  = useRouter()
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [toggleHouseInWishlist] = useToggleHouseInWishListMutation();
  const [deleteHouse] = useDeleteHouseMutation();
  const { data: houseWishlist, refetch } = useGetHouseWishlistQuery(USER_ID);
  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");

  const houseExistInWishlist = houseWishlist?.find((hous) => hous.house.id === id);

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);

  const handleToggleHouse = async (houseId: number, userId: number) => {
    console.log("hre is ", { houseId, userId });
    await toggleHouseInWishlist({ houseId, userId });
    refetch();
    refetchAllHouses();

  };

  const handleDelete = async () => {
    await deleteHouse(id);
    refetchAllHouses();
  };

  console.log("wishlist", wishlist)


  return (
    <div className=" w-full md:w-[23rem] bg-white flex rounded-xl flex-col items-center justify-center relative" >
      <img className="w-full h-[200px] rounded-lg" src={fullHouseData.coverImageUrl} alt="House" />
      <div className="w-full pt-2 bg-white shadow-2xl  rounded-b-xl">
        <div className="flex flex-col px-5 gap-3">
          <div className="flex items-center justify-between text-xl font-bold">
            <p>
              ${price.toFixed(2)} {id}
            </p>
            <div className="flex gap-2.5 items-center">
              <button
                className="relative w-8 h-8 rounded-full  grid place-content-center"
              >{wishlist>0 ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" /> }
                {/* {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />} */}
                <p className="absolute text-xs text-red-500 top-1 left-6">{wishlist}</p>
              </button>
              <div className="w-6 h-6 bg-indigo-600 rounded-full grid place-content-center" onClick={()=> router.push(`/house/${id}`)}>
                <ArrowIcon 
                  fill={"#fff"}
                  height={"20px"}
                  width={"18px"}
                  stroke={"#fff"}
                  strokeWidth={1}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-5 border-b border-gray-200 gap-1">
            <p className="text-base text-primary_gray font-jost ">{address}</p>
            <p className="text-xs font-normal text-primary_gray ">{address}</p>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 gap-2">
          <div className="flex items-center  gap-1">
            <RoomIcon
              fill={"#757B8D"}
              height={"20px"}
              width={"20px"}
              stroke={"#757B8D"}
              strokeWidth={0}
            />
            <p className="text-xs  text-primary_gray">{bedrooms} rooms</p>
          </div>

          <div className="flex items-center  gap-1">
            <RoomIcon
              fill={"#757B8D"}
              height={"20px"}
              width={"20px"}
              stroke={"#757B8D"}
              strokeWidth={0}
            />
            <p className="text-xs  text-primary_gray">rooms</p>
          </div>

          <div className="flex items-center  gap-1">
            <LocationIcon
              fill={"#757B8D"}
              height={"20px"}
              width={"20px"}
              stroke={"#757B8D"}
              strokeWidth={0}
            />
            <p className="text-xs  text-primary_gray">Location</p>
          </div>
          <button onClick={handleOpenAddHouseModal}>edit</button>
          <button onClick={handleDelete}>delete</button>
        </div>
        <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
          <HouseForm isEditing={true} houseData={fullHouseData} />
        </AddHouse>
      </div>
    </div>
  );
};

export default HouseAgent;
