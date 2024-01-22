import React from 'react';
import { ArrowIcon, HeartIcon, LocationIcon, RoomIcon } from '../svgs/Heart';

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  address,
}) => {
  return (
    <div className="max-w-[30rem]  flex flex-col items-center justify-center relative">
      <img className="w-full h-[250px] rounded-3xl" src="./assets/house.jpeg" alt="House" />
      <div className='absolute top-36 left-5 right-5 bg-white py-4 rounded-3xl shadow-2xl'>
      <div className="px-5 flex flex-col gap-3">
        <div className="font-bold text-xl flex items-center justify-between">
          <p>${price.toFixed(2)}</p>
          <div className='flex gap-2.5'>
            <div className='bg-indigo-600/20 grid place-content-center w-8 h-8 rounded-full'>
              <HeartIcon fill={"#4f46e5"} height={"18px"} width={"18px"} stroke={"#4f46e5"} stroke_width={2}/>
            </div>
            <div className='bg-indigo-600 grid place-content-center w-8 h-8 rounded-full'>
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

      <div className='flex px-5'>
        <button className='bg-indigo-600 text-white text-xs rounded w-full px-6 py-3 shadow-2xl'>Book A Visit</button>
      </div>
      </div>
    </div>
  );
};

export default PropertyCard;
