import React from 'react';
import house from '../../public/assets/hs.png'
import Image from 'next/image';
import StatsGrid from './UI/cards/Statistics';
const RealEstateComponent: React.FC = () => {
  return (
    <div className="bg-white py-10  md:py-20 max-w-[80rem] flex flex-col items-center">

      <StatsGrid />

      <div className="flex flex-col xl:flex-row gap-28 gap-5 xl:px-20 px-5 justify-between items-center mt-10">

        <div className='relative'>
          <Image
            src={house}
            alt="Beautiful House"
            width={540}
            height={360}
            layout="intrinsic"
            quality={100}
            className='rounded-xl'
          />

          <div className='absolute  flex flex-col gap-4 top-[55%] left-[10%] xl:left-[50%]'>
            <div className='bg-white w-72 shadow-xl px-6 py-3 xl:py-7  rounded-xl flex items-center gap-5 '>
              <div className='bg-indigo-600/10 text-indigo-600 font-bold rounded-full min-w-8 min-h-8 xl:min-w-12 xl:min-h-12 grid place-content-center text-xs'>19</div>
              <p className='text-primary_gray text-xs xl:text-sm'> We have more than 10+ years of experience</p>
            </div>
            <div className='bg-white w-72 shadow-xl px-6 py-3 xl:py-7  rounded-xl flex items-center gap-5 '>
              <div className='bg-indigo-600/10 text-indigo-600 font-bold rounded-full min-w-8 min-h-8 xl:min-w-12 xl:min-h-12 grid place-content-center text-xs'>19</div>
              <p className='text-primary_gray text-xs xl:text-sm'> We have more than 10+ years of experience</p>
            </div>
         
          
          </div>
        </div>

        <div className='w-full mt-10 xl:mt-0 xl:w-2/5'>
          <h1 className="text-xl xl:text-3xl font-bold text-center xl:text-start  text-blue-800 mb-6">
            We are the best and most trusted real estate agent
          </h1>
          <p className=" text-sm xl:text-lg text-gray-600 mb-4 px-10">
            We are a trusted real estate agent with more than a decade of experience. You can trust us.
          </p>
          <ul className="list-none px-10">
            <li className="check-item text-sm">45k partners have worked with us</li>
            <li className="check-item text-sm">Professional and experienced human resources</li>
            <li className="check-item text-sm">Provide the best service for users</li>
          </ul>
          <button className="bg-indigo-600 ml-10 xl:ml-0 mt-3 xl:mt-0 text-white px-6 py-2 text-sm xl:text-base xl:py-3 rounded">Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateComponent;
