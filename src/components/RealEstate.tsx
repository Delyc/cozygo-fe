import React from 'react';
import house from '../../public/assets/hs.png'
import Image from 'next/image';
const RealEstateComponent: React.FC = () => {
  return (
    <div className="bg-white py-20 max-w-[80rem]">
      <div className="grid grid-cols-3 gap-4">
        {/* Statistic Cards */}
        <div className="stat-card">
          <h2 className="text-6xl font-bold text-blue-600">120k</h2>
          <p className="text-gray-500">People believe in our service</p>
        </div>
        <div className="stat-card">
          <h2 className="text-6xl font-bold text-blue-600">3200</h2>
          <p className="text-gray-500">Property and house ready for occupancy</p>
        </div>
        <div className="stat-card">
          <h2 className="text-6xl font-bold text-blue-600">45k</h2>
          <p className="text-gray-500">Partners who have worked with us</p>
        </div>
      </div>
      <div className="flex gap-28 px-20  justify-between items-center mt-10">

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
 
                <div className='absolute  flex flex-col gap-4 top-[55%] left-[50%]'>
                <div className='bg-white w-72 shadow-xl px-6 py-7  rounded-xl flex items-center gap-5 '>
                        <div className='bg-indigo-600/10 text-indigo-600 font-bold rounded-full min-w-12 min-h-12 grid place-content-center'>19</div>
                        <p className='text-primary_gray'> We have more than 10+ years of experience</p>
                    </div>
                    <div className='bg-white w-72 shadow-xl ml-10 px-6 py-7 rounded-xl flex items-center gap-5 '>
                        <div className='bg-indigo-600/10 text-indigo-600 font-bold rounded-full min-w-12 min-h-12 grid place-content-center'>19</div>
                        <p className='text-primary_gray'> We have more than 10+ years of experience</p>
                    </div>
                    {/* <div className='bg-white w-72 shadow-xl px-6 py-6 ml-20 rounded-xl flex items-center gap-5 '>
                        <div className='bg-indigo-600/10 text-indigo-600 font-bold rounded-full min-w-12 min-h-12 grid place-content-center'>19</div>
                        <p className='text-primary_gray'> We have more than 10+ years of experience</p>
                    </div> */}
                    {/* <div className='bg-white w-72 shadow-xl px-6 py-6 rounded-xl flex items-center gap-5 '>
                        <div className='bg-indigo-600/10 text-indigo-600 font-bold rounded-full min-w-12 min-h-12 grid place-content-center'>19</div>
                        <p className='text-primary_gray'> We have more than 10+ years of experience</p>
                    </div> */}
                </div>
        </div>

        <div className='w-2/5'>
        <h1 className="text-3xl font-bold  text-blue-800 mb-6">
          We are the best and most trusted real estate agent
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          We are a trusted real estate agent with more than a decade of experience. You can trust us.
        </p>
        <ul className="list-none">
          <li className="check-item">45k partners have worked with us</li>
          <li className="check-item">Professional and experienced human resources</li>
          <li className="check-item">Provide the best service for users</li>
        </ul>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded">Learn more</button>
      </div>
      </div>
    </div>
  );
};

export default RealEstateComponent;
