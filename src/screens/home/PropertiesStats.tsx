import React from 'react';
import Image from 'next/image';
import { MoveUpRight, Star } from 'lucide-react';

const PropertiesStats: React.FC = () => {
    return (
        <div className="bg-white py-10 md:py-20 max-w-[80rem] flex flex-col items-center">

            <div className='flex flex-col lg:flex-row gap-8 px-5 py-10'>

                <div className='w-full md:w-52 lg:w-56 flex flex-col gap-4'>
                    <p className='text-2xl text-blue-800 font-bold md:text-3xl'>We Are Ready To Help You</p>
                    <p className='text-sm text-gray-500 md:text-lg'>Your next home is one conversation away with our experts and amazing platform</p>
                    <button className='bg-blue-900 text-white rounded shadow px-6 py-3 text-sm'>Explore All</button>
                </div>
                <div className='flex flex-col md:flex-row gap-3'>
                    <div className='relative flex flex-col items-center h-64  w-full md:w-64 lg:w-48'>
                        <Image alt='house' src="/assets/house.jpeg" className='h-48 rounded-2xl w-full lg:w-44 md:w-full object-cover' width={100} height={100} />
                        <div className='bg-white flex flex-col items-center shadow-xl rounded-2xl absolute w-5/6 top-40 md:top-36 px-3 py-3'>
                            <div className='flex gap-1  justify-center'>
                                <Star fill={'#1e3a8a'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />
                                <Star fill={'#1e3a8a'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />
                                <Star fill={'#1e3a8a'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />

                            </div>
                            <p className='text-sm text-gray-500 mt-1'>Our Best Services</p>

                            <div className='border-t pt-2 mt-2 w-full flex items-center  justify-between'>
                                <Star fill={'#fcd34d'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />
                                <p className='text-xs text-gray-500'>5 Star Rating</p>
                            </div>
                        </div>
                    </div>

                    <div className='relative w-full md:w-52 lg:w-44 h-64'>
                        <Image alt='house' src="/assets/house.jpeg" className='h-64 rounded-2xl w-full lg:w-44  object-cover' width={100} height={100} />
                        <div className='h-64 bg-black/50 w-full absolute top-0 rounded-2xl px-3 flex flex-col justify-end py-8 '>
                            <div className=''>
                                <p className='text-white text-2xl  font-bold'>100 +</p>
                                <p className='text-white text-xl font-medium lg:text-lg'> Properties in Kigali</p>
                                <p className='text-white text-xs md:text-lg lg:text-xs'>All properties we have in kigali city</p>
                            </div>

                        </div>
                        <div className='bg-blue-900 py-1 px-4 absolute right-0 bottom-0 rounded-br-2xl'><MoveUpRight fill={'white'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /></div>
                    </div>

                    <div className='relative w-full md:w-52 lg:w-44  h-64'>
                        <Image alt='house' src="/assets/house.jpeg" className='h-64 rounded-2xl w-full object-cover' width={100} height={100} />
                        <div className='h-64 bg-black/50 w-full absolute top-0 rounded-2xl px-3 flex flex-col justify-end py-8 '>
                            <div className=''>
                                <p className='text-white text-2xl  font-bold'>100 +</p>
                                <p className='text-white text-xl font-medium lg:text-lg'> Properties in Kigali</p>
                                <p className='text-white text-xs md:text-lg lg:text-xs'>All properties we have in kigali city</p>
                            </div>

                        </div>
                        <div className='bg-blue-900 py-1 px-4 absolute right-0 bottom-0 rounded-br-2xl'><MoveUpRight fill={'white'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-28 gap-5 xl:px-20 px-5 md:px-8 justify-between items-center mt-10">

                <div className='relative'>
                    <Image
                        src={'/assets/hs.png'}
                        alt="Beautiful House"
                        width={540}
                        height={360}
                        layout="intrinsic"
                        quality={100}
                        className='rounded-xl'
                    />

                    <div className='absolute  flex flex-col gap-4 top-[55%] left-[10%] xl:left-[50%]'>
                        <div className='bg-white md:w-72 shadow-xl px-6 py-3 xl:py-7  rounded-xl flex items-center gap-5 '>
                            <div className='bg-blue-900/10 text-blue-800 font-bold rounded-full min-w-8 min-h-8 xl:min-w-12 xl:min-h-12 grid place-content-center text-xs'>19</div>
                            <p className='text-gray-500 text-xs xl:text-sm'> We have more than 10+ years of experience</p>
                        </div>
                        <div className='bg-white md:w-72 shadow-xl px-6 py-3 xl:py-7  rounded-xl flex items-center gap-5 '>
                            <div className='bg-blue-900/10 text-blue-800 font-bold rounded-full min-w-8 min-h-8 xl:min-w-12 xl:min-h-12 grid place-content-center text-xs'>19</div>
                            <p className='text-gray-500 text-xs xl:text-sm'> We have more than 10+ years of experience</p>
                        </div>


                    </div>
                </div>

                <div className='w-full mt-10 xl:mt-0 xl:w-2/5'>
                    <h1 className="text-xl xl:text-3xl font-bold text-center xl:text-start  text-blue-800 mb-6">
                        We are the best and most trusted real estate agent
                    </h1>
                    <p className=" text-sm xl:text-lg text-gray-500 mb-4 ">
                        We are a trusted real estate agent with more than a decade of experience. You can trust us.
                    </p>
                    <ul className="list-none  text-gray-500 mb-4">
                        <li className="check-item text-sm">45k partners have worked with us</li>
                        <li className="check-item text-sm">Professional and experienced human resources</li>
                        <li className="check-item text-sm">Provide the best service for users</li>
                    </ul>
                    <button className="bg-blue-900 ml-10 xl:ml-0 mt-3 xl:mt-0 text-white px-6 py-2 text-sm xl:text-base xl:py-3 rounded">Learn more</button>
                </div>
            </div>
        </div>
    );
};

export default PropertiesStats;
