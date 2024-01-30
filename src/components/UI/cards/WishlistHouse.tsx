import React, {useState} from 'react';
import { ArrowIcon, HeartIcon, LocationIcon, RoomIcon } from '../../svgs/Heart';
import HouseForm from '@/components/forms/HouseForm';
import AddHouse from '@/components/modals/AddHouse';
import GoogleMap from '../GoogleMap';

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
  googleMapLocation: string;
  onButtonClick: (newContent: string) => void;
  isSelected: boolean;
  cardIndex?: number;


};

const WishlistHouse: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  address,
  onButtonClick,
  googleMapLocation,
  isSelected,
  cardIndex
}) => {

    const handleView360Click = () => {
        // Set different content for "View 360" button click
        onButtonClick('Content for View 360 button clicked.');
      };
    
      const handleGoogleMapClick = () => {
        // Set different content for "Google map location" button click
        onButtonClick('Content for Google map location button clicked.');
      };
    
      const handleContactAgentClick = () => {
        // Set different content for "Contact agent" button click
        onButtonClick('Content for Contact agent button clicked.');
      };

  const [showAddHouseModal, setShowAddHouseModal] = useState(false);

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);
  return (
    <div className={`${isSelected ? 'bg-red-500' : ' bg-white'} w-[30rem] h-[12rem] flex  gap-2 items-center relative`}>
      <img className="w-[10rem] min-h-full" src="./assets/house.jpeg" alt="House" />
      <div className=' bg-white pt-2  w-full h-full'>
      <div className="px-2 flex flex-col gap-3">
        <div className="font-bold text-xl flex items-center justify-between">
          <p>${price.toFixed(2)}</p>
          <p>{cardIndex}</p>
          <div className='flex gap-2.5 items-center'>
            <div className='  grid place-content-center w-8 h-8 rounded-full relative'>
              <HeartIcon fill={"white"} height={"18px"} width={"18px"} stroke={"red"} stroke_width={2}/>
            </div>
            <div className='bg-indigo-600 grid place-content-center w-6 h-6 rounded-full'>
              <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} stroke_width={1}/>
            </div>
          </div>
          </div>
          <div className='flex flex-col gap-1 border-gray-200 pb-5 border-b'>

        <p className="text-primary_gray font-jost  text-base">{address}</p>
        <p className="text-primary_gray  text-xs font-normal">{address}</p>

          </div>
      </div>
      <div className="px-5 flex items-center gap-2 py-2">
        <div className='flex items-center  gap-1'>
          <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className=' text-primary_gray text-xs'>{bedrooms} rooms</p>
        </div>

        <div className='flex items-center  gap-1'>
          <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className=' text-primary_gray text-xs'>rooms</p>
        </div>

        <div className='flex items-center  gap-1'>
          <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className=' text-primary_gray text-xs'>Location</p>
        </div>
  
      </div>
  <div>
    <button onClick={handleView360Click}>View 360</button>
    <button onClick={handleGoogleMapClick}>Google map location</button>
         {/* {isSelected && <GoogleMap location={{ lat: 37.7749, lng: -122.4194 }} />
 } */}

    <button onClick={handleContactAgentClick}>Contact agent</button>
  </div>
  
      </div>
    </div>
  );
};

export default WishlistHouse;
