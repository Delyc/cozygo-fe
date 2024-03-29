
'use client'
import React, {useState, useEffect} from 'react';
import { ArrowIcon, BathRoom, HeartIcon, LocationIcon, RoomIcon , ShareIcon, SurfaceArea} from '../../svgs/Heart';
import Link from 'next/link';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import {
  useDeleteHouseMutation,
  useFetchHousesQuery,
  useGetHouseWishlistQuery,
  useToggleHouseInWishListMutation,
  useUserProfileQuery,
} from "@/redux/api/apiSlice";
import router from 'next/navigation';
import { useRouter } from "next/navigation";
import { decodeToken } from '@/helpers/decodeToken';
import getToken from '@/helpers/getToken';
import { Share } from 'next/font/google';

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  title: string;
  description: string;
  coverImage: string;
  id: number,
  lastUpdated : any
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  title,
  description,
  id,
  coverImage,
  lastUpdated 


}) => {
  const USER_ID = 2;
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
}, [])

  console.log(id, "testig house id")
  const user = decodeToken(token || '')
  const {data: authenticatedUserProfile, isLoading: fetchingUserProfile} = useUserProfileQuery<any>(user?.sub!);
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [toggleHouseInWishlist] = useToggleHouseInWishListMutation();
  const { data: houseWishlist, refetch } = useGetHouseWishlistQuery(Number(authenticatedUserProfile?.id));
  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");

  const houseExistInWishlist = houseWishlist?.find((hous) => hous.house.id === id);
  const handleToggleHouse = async (houseId: number, userId: number) => {
    console.log("hre is ", { houseId, userId });
    await toggleHouseInWishlist({ houseId, userId });
    refetch();
    refetchAllHouses();

  };

  const generateShareLink = async () => {
    try {
      const response = await fetch(`http://localhost:8080/public/share/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const link = data.shareLink; 
      console.log("link copioeddd", link)
      setShareLink(link);
      navigator.clipboard.writeText(link).then(() => {
        console.log('Link copied to clipboard!');
        setIsModalOpen(true); // Show the modal after copying
      });
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  return (
    <div className="w-[22rem]  h-[16rem] flex flex-col items-center  relative">
      <div className='relative'>
      <img className="w-full h-[200px] rounded-xl" src={coverImage} alt="House" />
      <div className='absolute top-5 left-5 py-1 text-indigo-600 px-3 bg-white/80 rounded '> 
      <p>Free</p></div>

      </div>
      <div className='absolute py-4 bg-white shadow-2xl top-28 left-5 right-5 rounded-3xl'>
        <div className="flex flex-col px-5 gap-3">
<div>

<div className="flex items-center justify-between text-xl font-bold">
  <div>
            <p>{price} RWF</p>
<p className='text-primary_gray text-xs font-light '>Last updated {lastUpdated}</p>

  </div>
            <div className='flex gap-2.5'>
              <button onClick={() => handleToggleHouse(id, Number(authenticatedUserProfile?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button>
              <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center' onClick={() => router.push(`/house/${id}`)}>
                <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} strokeWidth={1} />
              </div>
            </div>
          </div>
</div>
        
          <div className='flex flex-col pb-3 border-b border-gray-200 gap-1'>
            <p className="text-base text-primary_gray font-jost ">{title}</p>
            <p className="text-xs font-normal text-primary_gray ">{description?.length > 50 ? `${description.substring(0, 47)} ...` : description}</p>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 gap-2 justify-between">
          <div className='flex items-center gap-3 '>
          <div className='flex items-center  gap-1'>
            <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>{bedrooms} Bd </p>
          </div>

          <div className='flex items-center  gap-1'>
            <BathRoom fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>{baths} Ba</p>
          </div>
          <div className='flex items-center  gap-1'>
            <SurfaceArea fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>{area} sqm</p>
          </div>
          </div>
<div className='flex items-center gap-2'>
<div className='flex items-center  gap-1'>
            <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'></p>
          </div>

          <div className='flex items-center cursor-pointer  gap-1' onClick={generateShareLink}>
            <ShareIcon fill={''} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} link={shareLink} />
          </div>
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

const Modal = ({ isOpen, onClose, link }: any) => {
  if (!isOpen) return null;

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <p>Share Link: {link}</p>
      <button onClick={copyLinkAgain}>Copy</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};