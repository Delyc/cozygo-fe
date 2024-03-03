'use client'

import { useState } from 'react';
import axios from 'axios';

const WishlistShare = () => {
  const [email, setEmail] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleShareClick = () => {
    setShowInput(true);
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(`https://capstoneapi-production-b1ec.up.railway.app/api/v1/wishlist/share?user_id=1&recipientEmail=${email}`);
      console.log('Request successful', response.data);
      // Handle response here
    } catch (error) {
      console.error('Request failed', error);
      // Handle error here
    }
  };

  return (
    <div  className='w-full  h-screen bg-gray-100 mt-10'> 

    <div className="flex flex-col gap-2 items-center w-full">
          <div className="w-1/2 flex flex-col gap-2 items-center">
            <h3 className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></h3>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-64"></p>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md  h-40 w-96"></p>

          </div>
          <div className="flex flex-col items-center">

            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-64"></p>
            <ul className="grid grid-cols-2 gap-y-2 mt-3 gap-x-10">
              <li className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32"></li>
              <li className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32"></li>
              <li className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32"></li>
              <li className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32"></li>
              

            </ul>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-64 mt-2"></p>
          </div>
          <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32"></p>
          <div className="w-full pb-20 px-5 lg:px-20 mx-auto grid  lg:grid-cols-3 gap-5 mt-10 ">
          <div className="w-[22rem]  h-[10rem] flex flex-col items-center  relative">
      <div className='font-medium bg-gray-300 animate-pulse rounded-md h-[16rem] w-full'></div>
      <div className='absolute py-4  animate-pulse  top-28 left-5 right-5 rounded-3xl'>
        <div className="flex flex-col px-5 gap-3">
          <div className="flex items-center justify-between text-xl font-bold">
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32'></p>
            <div className='flex gap-2.5'>
              {/* <button onClick={() => handleToggleHouse(id, Number(user?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button> */}
              {/* <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center' onClick={() => router.push(`/house/${id}`)}> */}
                {/* <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} strokeWidth={1} /> */}
              {/* </div> */}
            </div>
          </div>
          <div className='flex flex-col pb-3 border-b border-gray-200 gap-1'>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></p>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></p>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 gap-2">
          <div className='flex items-center  gap-1'>
            {/* <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'> </p>
          </div>

          <div className='flex items-center  gap-1'>
            {/* <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'></p>
          </div>

          <div className='flex items-center  gap-1'>
            {/* <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'></p>
          </div>
        </div>
        <div className='flex px-5'>
          <button className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32'></button>
        </div>
      </div>
    </div>

    <div className="w-[22rem]  h-[10rem] flex flex-col items-center  relative">
      <div className='font-medium bg-gray-300 animate-pulse rounded-md h-[16rem] w-full'></div>
      <div className='absolute py-4  animate-pulse  top-28 left-5 right-5 rounded-3xl'>
        <div className="flex flex-col px-5 gap-3">
          <div className="flex items-center justify-between text-xl font-bold">
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32'></p>
            <div className='flex gap-2.5'>
              {/* <button onClick={() => handleToggleHouse(id, Number(user?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button> */}
              {/* <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center' onClick={() => router.push(`/house/${id}`)}> */}
                {/* <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} strokeWidth={1} /> */}
              {/* </div> */}
            </div>
          </div>
          <div className='flex flex-col pb-3 border-b border-gray-200 gap-1'>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></p>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></p>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 gap-2">
          <div className='flex items-center  gap-1'>
            {/* <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'> </p>
          </div>

          <div className='flex items-center  gap-1'>
            {/* <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'></p>
          </div>

          <div className='flex items-center  gap-1'>
            {/* <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'></p>
          </div>
        </div>
        <div className='flex px-5'>
          <button className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32'></button>
        </div>
      </div>
    </div>

    <div className="w-[22rem]  h-[10rem] flex flex-col items-center  relative">
      <div className='font-medium bg-gray-300 animate-pulse rounded-md h-[16rem] w-full'></div>
      <div className='absolute py-4  animate-pulse  top-28 left-5 right-5 rounded-3xl'>
        <div className="flex flex-col px-5 gap-3">
          <div className="flex items-center justify-between text-xl font-bold">
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32'></p>
            <div className='flex gap-2.5'>
              {/* <button onClick={() => handleToggleHouse(id, Number(user?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}
              </button> */}
              {/* <div className='w-8 h-8 bg-indigo-600 rounded-full grid place-content-center' onClick={() => router.push(`/house/${id}`)}> */}
                {/* <ArrowIcon fill={"#fff"} height={"20px"} width={"18px"} stroke={"#fff"} strokeWidth={1} /> */}
              {/* </div> */}
            </div>
          </div>
          <div className='flex flex-col pb-3 border-b border-gray-200 gap-1'>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></p>
            <p className="font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32 "></p>
          </div>
        </div>
        <div className="flex items-center px-5 py-2 gap-2">
          <div className='flex items-center  gap-1'>
            {/* <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'> </p>
          </div>

          <div className='flex items-center  gap-1'>
            {/* <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'></p>
          </div>

          <div className='flex items-center  gap-1'>
            {/* <LocationIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> */}
            <p className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-16'></p>
          </div>
        </div>
        <div className='flex px-5'>
          <button className='font-medium bg-gray-300 animate-pulse rounded-md h-4 w-32'></button>
        </div>
      </div>
    </div>
          </div>
          <button className='font-medium bg-gray-300 animate-pulse rounded-md h-10 mt-10 w-32'></button>
        </div>
     </div>
  );
};

export default WishlistShare;
