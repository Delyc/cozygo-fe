import React, { useState, ReactNode } from 'react';
import { House } from '../svgs/Heart';
import PropertyCard from '../UI/cards/House';
import HouseAgent from '../UI/cards/HouseAgent';
import RequestTable from '../UI/table/RequestTable';
import MessageList from './Message';
const HomeDash: React.FC = () => {


  return (

    <div className='flex gap-16 py-10 w-5/6'>

    <div className="flex flex-col  w-4/5 gap-10">
             <div className='grid grid-cols-3 gap-5'>
              <div className='bg-white rounded-md shadow-xl px-5 py-3 w-[15rem]'>
                  <h3>Total Houses</h3>
                  <div className='flex items-center gap-2'>
                    <House fill={''} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                    <p>5000</p>
                  </div>
              </div>

              <div className='bg-white rounded-md shadow-xl px-5 py-3 w-[15rem]'>
                  <h3>Total Houses</h3>
                  <div className='flex items-center gap-2'>
                    <House fill={''} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                    <p>5000</p>
                  </div>
              </div>

              <div className='bg-white rounded-md shadow-xl px-5 py-3 w-[15rem]'>
                  <h3>Total Houses</h3>
                  <div className='flex items-center gap-2'>
                    <House fill={''} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                    <p>5000</p>
                  </div>
              </div>
             </div>

             <div className="container mx-auto grid grid-cols-3 gap-5">
    <HouseAgent
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />

<HouseAgent
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />

<HouseAgent
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />
  </div>

  <div>
    <RequestTable />
  </div>
    </div>

<MessageList />
    
    </div>
  );
};

export default HomeDash;
