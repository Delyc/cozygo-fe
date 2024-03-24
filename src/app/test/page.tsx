
'use client'
import React, {useState, useEffect} from 'react';
import { ArrowIcon, Eye, HeartIcon, LocationIcon, RoomIcon } from '@/components/svgs/Heart';
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
import getToken from '@/helpers/getToken';
import { convertDateToReadableFormat } from '@/helpers/convertDate';

type PropertyCardProps = {
  bedrooms: number;
  baths: any;
  area: number;
  price: number;
  title: string;
  description: string;
  coverImage: string;
  id: number,
  date: any
};

const HouseCard: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  title,
  description,
  id,
  date,
  coverImage

}) => {
  const USER_ID = 2;
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
}, [])

  console.log(id, "testig house id")
  const user = decodeToken(token || '')
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
       <div className="w-[20rem]  flex flex-col items-center  relative">
      <img onClick={() => router.push(`/house/${id}`)} className="w-full h-[180px]  object-cover rounded-t-lg" src={'./assets/house.jpeg'} alt="House" />
      <div className=' pt-3  pb-3 bg-white rounded-b-lg w-full shadow'>
        <div className="flex flex-col px-2.5 gap-">
        <p className="text-xs text-primary_gray font-jost ">Updated  {convertDateToReadableFormat(date)}</p>

          <div className="flex items-center justify-between ">
            <p className='text-xl font-semibold'>{price} RWF</p>

            {/* {price.toFixed(2)} */}
            <div className='flex absolute top-2.5 left-2.5  gap-2.5'>
              {/* <ArrowIcon fill={'#525252'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /> */}
              <button onClick={() => handleToggleHouse(id, Number(user?.id))} className=' w-8 h-8 bg-white/80 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button>
              {/* <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center' onClick={() => router.push(`/house/${id}`)}>
                <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} strokeWidth={1} />
              </div> */}
            </div>
          </div>
          <div className='flex flex-col  border-b border-gray-200 pb-2 gap-1'>
            <p className="text-sm text-primary_gray font-jost ">{title}</p>
            {/* <p className="text-xs font-normal text-primary_gray ">Family House for Rent Family House for Rent {description?.length > 50 ? `${description.substring(0, 250)}...` : description}</p> */}
          </div>
          <div className="flex items-center py-2  gap-2">
          <div className='flex items-center  gap-1'>
            <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>{bedrooms} beds</p>
          </div>

          <div className='flex items-center  gap-1'>
            <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>{baths} baths</p>
          </div>

          <div className='flex items-center  gap-1'>
            <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>kk 135 N</p>
          </div>
        </div>
        </div>
       
        <div className='flex px-2.5'>
          <button className='w-full px-6 py-2.5 text-xs text-white bg-indigo-600 rounded flex items-center gap-2 justify-center shadow-2xl'><Eye fill={'white'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} />View Details</button>
        </div>

      </div>
    </div>
   
  );
};

export default HouseCard;
