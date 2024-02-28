import React from 'react';
import { ArrowIcon, HeartIcon, LocationIcon, RoomIcon } from '../../svgs/Heart';
import Link from 'next/link';

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
    <div className="max-w-[30rem]  h-[23rem]  flex flex-col items-center  relative">
      <img className="w-full h-[200px] rounded-xl" src="./assets/house.jpeg" alt="House" />
      <div className='absolute py-4 bg-white shadow-2xl top-36 left-5 right-5 rounded-3xl'>
      <div className="flex flex-col px-5 gap-3">
        <div className="flex items-center justify-between text-xl font-bold">
          <p>${price.toFixed(2)}</p>
          <div className='flex gap-2.5'>
            <div className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
              <HeartIcon fill={"#4f46e5"} height={"18px"} width={"18px"} stroke={"#4f46e5"} stroke_width={2}/>
            </div>
            <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center'>
              <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} stroke_width={1}/>
            </div>
          </div>
          </div>
          <div className='flex flex-col pb-5 border-b border-gray-200 gap-1'>

        <p className="text-base text-primary_gray font-jost ">{address}</p>
        <p className="text-xs font-normal text-primary_gray ">{address}</p>

          </div>
      </div>
      <div className="flex items-center px-5 py-2 gap-2">
        <div className='flex items-center  gap-1'>
          <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className='text-xs  text-primary_gray'>{bedrooms} rooms</p>
        </div>

        <div className='flex items-center  gap-1'>
          <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className='text-xs  text-primary_gray'>rooms</p>
        </div>

        <div className='flex items-center  gap-1'>
          <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
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
