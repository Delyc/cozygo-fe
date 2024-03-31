import { decodeToken } from '@/helpers/decodeToken';
import getToken from '@/helpers/getToken';
import { useGetHouseWishlistQuery, useToggleHouseInWishListMutation , useFetchHousesQuery, useUserProfileQuery} from '@/redux/api/apiSlice';
import React, { useEffect, useState } from 'react';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { BathRoom, LocationIcon, RoomIcon, SurfaceArea } from './svgs/Heart';

interface LocationCardProps {
  lat: number;
  lng: number;
  coverImage: string;
  id: number;
  onShowMap: (lat: number, lng: number) => void;
}

const LocationCard: React.FC<LocationCardProps> = ({ lat,id, lng, coverImage, onShowMap }) => {

  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
}, [])

  // console.log(id, "testig house id")
  const user = decodeToken(token || '')
  const {data: authenticatedUserProfile, isLoading: fetchingUserProfile} = useUserProfileQuery<any>(user?.sub!);
  

  const [toggleHouseInWishlist] = useToggleHouseInWishListMutation();
  const { data: houseWishlist, refetch } = useGetHouseWishlistQuery(Number(user?.id));
  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");
  const houseExistInWishlist = houseWishlist?.find((hous) => hous?.house?.id === id);
  const handleToggleHouse = async (houseId: number, userId: number) => {
    console.log("hre is ", { houseId, userId });
    await toggleHouseInWishlist({ houseId, userId });
    refetch();
    refetchAllHouses();

  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
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
  
  console.log("houseWishlist", houseWishlist)
  
  return (
    <div  className='bg-white h-[12rem]'>
        {houseWishlist?.map((house) => {
          return (
            <div key={house?.id} className='flex gap-5 h-fit ' >
              <div className='w-2/5 relative'>
              <img src={house?.house?.coverImageUrl} className='h-[12rem] w-full object-cover'/>
              <button onClick={() => handleToggleHouse(id, Number(authenticatedUserProfile?.id))} className='w-8 h-8  bg-white/80 grid place-content-center absolute top-3 left-3'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button>

              </div>
              <div className='py-2'>
              <p className='text-primary_gray '>{house?.house?.title}</p>
              <p className='text-indigo-600 mt-3 font-medium'>{house?.house?.price} RWF</p>
              <p className='flex items-center gap-1 text-primary_gray text-sm'><LocationIcon fill={'#1C274C'} height={'20px'} width={'20px'} stroke={'black'} strokeWidth={0} /> Gasabo</p>

              <div className='flex gap-5  border-b   py-3'>
                <div className='flex items-center gap-2 text-primary_gray'><RoomIcon fill={'#1C274C'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /> <p className='text-sm'>{house?.house?.bedRooms} rooms</p> </div>
                <div className='flex items-center gap-2 text-primary_gray' ><BathRoom fill={'#1C274C'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /> <p className='text-sm'>{house?.house?.bathRooms} baths</p></div>
                <div className='flex items-center gap-2 text-primary_gray' ><SurfaceArea fill={'#1C274C'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /> <p className='text-sm'>{house?.house?.area} sqm</p></div>
                </div>

                <div className='flex gap-4 mt-3'>
                  <button className='bg-indigo-600 px-6 py-2 text-white rounded shadow text-sm'  onClick={() => onShowMap(lat, lng)}>Show Map</button>
                  {/* <button className='bg-indigo-600 px-6 py-2 text-white rounded shadow'>View More</button> */}
                  </div>
              </div>
            </div>
          );

        }
        )}

    </div>
  );
};

export default LocationCard;


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