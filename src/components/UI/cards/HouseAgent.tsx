import React, {useState} from 'react';
import { ArrowIcon, HeartIcon, LocationIcon, RoomIcon } from '../../svgs/Heart';
import HouseForm from '@/components/forms/HouseForm';
import AddHouse from '@/components/modals/AddHouse';

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
};

const HouseAgent: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  address,
}) => {

  const [showAddHouseModal, setShowAddHouseModal] = useState(false);

  const handleOpenAddHouseModal = () => setShowAddHouseModal(true);
  const handleCloseAddHouseModal = () => setShowAddHouseModal(false);
  return (
    <div className=" w-full md:w-[23rem] bg-white flex rounded-xl flex-col items-center justify-center relative">
      <img className="w-full h-[150px] rounded-lg" src="./assets/house.jpeg" alt="House" />
      <div className=' bg-white pt-2 rounded-b-xl w-full shadow-2xl'>
      <div className="px-5 flex flex-col gap-3">
        <div className="font-bold text-xl flex items-center justify-between">
          <p>${price.toFixed(2)}</p>
          <div className='flex gap-2.5 items-center'>
            <div className='  grid place-content-center w-8 h-8 rounded-full relative'>
              <HeartIcon fill={"white"} height={"18px"} width={"18px"} stroke={"red"} stroke_width={2}/>
              <p className='absolute top-1 left-6 text-red-500 text-xs'>50</p>
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
        <button  
        onClick={handleOpenAddHouseModal}

        >edit</button>
      </div>
      <AddHouse show={showAddHouseModal} onClose={handleCloseAddHouseModal}>
                <HouseForm  price={price} address={address}/>
            </AddHouse>
  
      </div>
    </div>
  );
};

export default HouseAgent;
