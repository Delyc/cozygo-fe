import { decodeToken } from '@/helpers/decodeToken';
import getToken from '@/helpers/getToken';
import { useGetHouseWishlistQuery, useToggleHouseInWishListMutation , useFetchHousesQuery, useUserProfileQuery} from '@/redux/api/apiSlice';
import React, { useEffect, useState } from 'react';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { LocationIcon } from './svgs/Heart';

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
  
  
  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <img src={coverImage}/>
      <div>Latitude: {lat}</div>
      <div>Longitude: {lng}</div>
      <button onClick={() => handleToggleHouse(id, Number(authenticatedUserProfile?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button>

              <div className='flex items-center bg-red-500  gap-1' onClick={generateShareLink}>
            <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
            <p className='text-xs  text-primary_gray'>Share</p>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} link={shareLink} />
          </div>
      <button onClick={() => onShowMap(lat, lng)}>Show Map</button>
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