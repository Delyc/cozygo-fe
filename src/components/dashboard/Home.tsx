import React, { useState, ReactNode } from 'react';
// import { House } from '../svgs/Heart';
// import PropertyCard from '../UI/cards/House';
import HouseAgent from '../UI/cards/HouseAgent';
import RequestTable from '../UI/table/RequestTable';
// import MessageList from './Message';
const HomeDash: React.FC = () => {


  return (

    <div className='flex xl:gap-5 2xl:gap-16 py-10 w-[96%]'>

    <div className="flex flex-col  lg:w-4/5 gap-10">
             {/* <div className='grid grid-cols-3 gap-2 2xl:gap-5'>
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
             </div> */}

             <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 2xl:gap-5">
    <HouseAgent
            bedrooms={3}
            baths={3}
            area={340}
            price={25000.00}
            address="Meadowview Lane, Tranquil Springs" id={0} fullHouseData={{
              id: 0,
              title: '',
              price: '',
              coverImageUrl: '',
              agentPicture:'',
              baths: undefined,
              area: undefined,
              description: '',
              lat: null,
              longi: null,
              streetNumber: null,
              wishlists: [],
              agentId: 0,
              agentName: '',
              agentEmail: '',
              agentPhoneNumber: '',
              bedRooms: 0,
              typeOfHouse: null,
              pictureUrls: [],
              videoUrls: [],
              address: '',
              features: [],
              country: ''
            }} wishlist={0}    />

<HouseAgent
            bedrooms={3}
            baths={3}
            area={340}
            price={25000.00}
            address="Meadowview Lane, Tranquil Springs" id={0} fullHouseData={{
              id: 0,
              title: '',
              price: '',
              agentPicture:'',

              coverImageUrl: '',
              baths: undefined,
              area: undefined,
              description: '',
              lat: null,
              longi: null,
              streetNumber: null,
              wishlists: [],
              agentId: 0,
              agentName: '',
              agentEmail: '',
              agentPhoneNumber: '',
              bedRooms: 0,
              typeOfHouse: null,
              pictureUrls: [],
              videoUrls: [],
              address: '',
              features: [],
              country: ''
            }} wishlist={0}    />

<HouseAgent
            bedrooms={3}
            baths={3}
            area={340}
            price={25000.00}
            address="Meadowview Lane, Tranquil Springs" id={0} fullHouseData={{
              id: 0,
              title: '',
              price: '',
              agentPicture:'',

              coverImageUrl: '',
              baths: undefined,
              area: undefined,
              description: '',
              lat: null,
              longi: null,
              streetNumber: null,
              wishlists: [],
              agentId: 0,
              agentName: '',
              agentEmail: '',
              agentPhoneNumber: '',
              bedRooms: 0,
              typeOfHouse: null,
              pictureUrls: [],
              videoUrls: [],
              address: '',
              features: [],
              country: ''
            }} wishlist={0}    />
  </div>

<p>Upcoming appointments</p>
<div className='flex flex-col gap-1'>
                <h3  className='text-sm font-medium text-indigo-600 uppercase'>Requests</h3>
                <p className='text-sm leading-5 text-primary_gray'> See below all the booking visits requests</p>
            </div>
  <div className=' overflow-x-scroll w-[300px] md:w-[700px]'>
    <RequestTable />
  </div>
    </div>

    {/* <MessageList onSelectMessage={handleSelectMessage} /> */}
    
    </div>
  );
};

export default HomeDash;
