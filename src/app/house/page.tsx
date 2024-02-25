// pages/index.tsx

import React from 'react';
import FloatingLabelInput from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Footer from '@/components/layout/Footer';

const House: React.FC = () => {
    return (
        <section className='flex flex-col bg-white justify-center items-center'>
         
      <div className='flex  gap-10 justify-between mx-auto  max-w-[80rem]'>
        <div className=' w-1/2 h-[25rem]'>

        
        <video  controls className='w-full h-full object-cover'>
        <source src="/assets/vid2.mp4" type="video/mp4" />
 
</video>

        </div>

        <div className='grid grid-cols-3  justify-end flex-wrap w-1/2  gap-3 '>
            <div className='col-span-3  h-[15rem]'>
            <img src='/assets/house.jpeg'  className='w-full h-full' />
            </div>
            <img src='/assets/house.jpeg' />
            <img src='/assets/house.jpeg' />
            <img src='/assets/house.jpeg' />
        </div>

        
      </div>
        </section>


    );
};

export default House;
