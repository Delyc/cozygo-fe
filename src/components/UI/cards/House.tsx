
'use client'
import React from 'react';
import { ArrowIcon, HeartIcon, LocationIcon, RoomIcon } from '../../svgs/Heart';
import Link from 'next/link';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import {
  useDeleteHouseMutation,
  useFetchHousesQuery,
  useGetHouseWishlistQuery,
  useToggleHouseInWishListMutation,
} from "@/redux/api/apiSlice";
import router from 'next/navigation';
import { useRouter } from "next/navigation";
import { decodeToken } from '@/helpers/decodeToken';

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  title: string;
  description: string;
  id: number
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  title,
  description,
  id,

}) => {
  const USER_ID = 2;
  const router = useRouter()

  console.log(id, "testig house id")
  const user = decodeToken(localStorage.getItem("token") || '')
  const [toggleHouseInWishlist] = useToggleHouseInWishListMutation();
  const { data: houseWishlist, refetch } = useGetHouseWishlistQuery(Number(user?.id));
  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");

  const houseExistInWishlist = houseWishlist?.find((hous) => hous.house.id === id);
  const handleToggleHouse = async (houseId: number, userId: number) => {
    console.log("hre is ", { houseId, userId });
    await toggleHouseInWishlist({ houseId, userId });
    refetch();
    refetchAllHouses();

  };
  return (
    <div className="w-[22rem]  h-[16rem] flex flex-col items-center  relative">
      <img className="w-full h-[200px] rounded-xl" src="./assets/house.jpeg" alt="House" />
      <div className='absolute py-4 bg-white shadow-2xl top-28 left-5 right-5 rounded-3xl'>
        <div className="flex flex-col px-5 gap-3">
          <div className="flex items-center justify-between text-xl font-bold">
            <p>${price.toFixed(2)}</p>
            <div className='flex gap-2.5'>
              <button onClick={() => handleToggleHouse(id, Number(user?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button>
              <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center' onClick={() => router.push(`/house/${id}`)}>
                <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} strokeWidth={1} />
              </div>
            </div>
          </div>
          <div className='flex flex-col pb-3 border-b border-gray-200 gap-1'>
            <p className="text-base text-primary_gray font-jost ">{title}</p>
            <p className="text-xs font-normal text-primary_gray ">{description?.length > 50 ? `${description.substring(0, 250)}...` : description}</p>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 gap-2">
          <div className='flex items-center  gap-1'>
            <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>{bedrooms} rooms</p>
          </div>

          <div className='flex items-center  gap-1'>
            <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>rooms</p>
          </div>

          <div className='flex items-center  gap-1'>
            <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>Location</p>
          </div>
        </div>
        <div className='flex px-5'>
          <button className='w-full px-6 py-3 text-xs text-white bg-indigo-600 rounded shadow-2xl'>Book A Visit</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
