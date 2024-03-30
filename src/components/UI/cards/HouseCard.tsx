'use client'
import React, {useState, useEffect} from 'react';
import { ArrowIcon, BathRoom, Copy, Eye, HeartIcon, Instagram, LocationIcon, RoomIcon, ShareIcon, Snapchat, SurfaceArea, Whatsapp } from '@/components/svgs/Heart';
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
  const [shareLink, setShareLink] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true); 
      });
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
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
        </div>
       
        <div className='flex px-2.5'>
          <button className='w-full px-6 py-2.5 text-xs text-white bg-indigo-600 rounded flex items-center gap-2 justify-center shadow-2xl'><Eye fill={'white'} height={'15px'} width={'15px'} stroke={''} strokeWidth={0} />View Details</button>
        </div>

      </div>
    </div>
   
  );
};

export default HouseCard;



const Modal = ({ isOpen, onClose, link }: any) => {
  if (!isOpen) return null;

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 flex flex-col items-center gap-5 rounded-lg shadow-lg">
           <button onClick={onClose} className='w-full text-xl'>X</button>
        <div className='flex items-center gap-10'>
          {link}
          <button onClick={copyLinkAgain}>
            <Copy fill={"#757B8D"} height={"30px"} width={"30px"} stroke={"#757B8D"} strokeWidth={0} />
          </button>
        </div>
        <p className='text-primary_gray font-bold'>OR</p>
        <div className='flex gap-5'>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Instagram />
          </a>
          <a href=" https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <img src='./assets/twiiter.jpeg' className="w-[30px] h-[30px]" />
          </a>

          <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Snapchat />
          </a>
          <a href={`https://wa.me?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Whatsapp />
          </a>
        </div>
     
      </div>
    </div>
  );
};