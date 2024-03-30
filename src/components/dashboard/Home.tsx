import React, { useState, ReactNode } from 'react';
// import { House } from '../svgs/Heart';
// import PropertyCard from '../UI/cards/House';
import HouseAgent from '../UI/cards/HouseAgent';
import RequestTable from '../UI/table/RequestTable';
// import MessageList from './Message';

type HouseDTO = {
  updatedAt: string;
  district: string;
  sector: string;
  type: string;
  // Add other missing properties here
};

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
  id: number;
  fullHouseData: HouseDTO;
  wishlist: number;
};

const HomeDash: React.FC = () => {
  return (
    <div className='flex xl:gap-5 2xl:gap-16 py-10 w-[96%]'>
      <div className="flex flex-col  lg:w-full gap-10">
        {/* Rest of the code */}
      </div>
    </div>
  );
};

export default HomeDash;
