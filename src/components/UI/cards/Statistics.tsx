import { ArrowIcon, Star } from '@/components/svgs/Heart';
import { useEffect, useState } from 'react';

interface StatCardProps {
  target: number;
  caption: string;
}

const StatCard: React.FC<StatCardProps> = ({ target, caption }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount < target ? prevCount + 1 : prevCount));
    }, 50); 

    return () => clearInterval(interval); 
  }, [target]);

  return (
    <div className="flex flex-col bg-[#F4F4F4]  px-5  py-5 lg:no-wrap  gap-3">
      <div className='bg-white w-16 h-16 rounded grid place-content-center'>
      <img  className="" src="data:image/svg+xml,%3csvg%20width='28'%20height='28'%20viewBox='0%200%2032%2032'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.66669%2029.3334H29.3334'%20stroke='%23292D32'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M3.93329%2029.3334L3.99996%2013.2934C3.99996%2012.48%204.38662%2011.7068%205.02662%2011.2001L14.36%203.93341C15.32%203.18675%2016.6667%203.18675%2017.64%203.93341L26.9734%2011.1867C27.6267%2011.6934%2028%2012.4667%2028%2013.2934V29.3334'%20stroke='%23292D32'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linejoin='round'/%3e%3cpath%20d='M20.6666%2014.6666H11.3333C10.2266%2014.6666%209.33331%2015.56%209.33331%2016.6666V29.3333H22.6666V16.6666C22.6666%2015.56%2021.7733%2014.6666%2020.6666%2014.6666Z'%20stroke='%23292D32'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M13.3333%2021.6666V23.6666'%20stroke='%23292D32'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14%2010H18'%20stroke='%23292D32'%20stroke-width='1.5'%20stroke-miterlimit='10'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e" />

      </div>
      <h2 className=" text-2xl lg:text-5xl ">{count}</h2>
      <p className="text-gray-500">{caption}</p>
    </div>
  );
};

const StatsGrid: React.FC = () => {
  return (

    <div className='xl:py-10 grid grid-cols-2 xl:grid-cols-4 w-full px-5 md:w-4/5 lg:max-w-[55rem] ld:flex-row  gap-x-3 md:gap-x-5 gap-y-10 md:gap-10'>

      <div className='w-40 md:w-52 lg:w-44 flex flex-col gap-4'>
        <p className='text-2xl font-bold md:text-3xl'>We Are Ready To Help You</p>
        <p className='text-sm text-primary_gray md:text-lg'>Your next home is one conversation away with our experts and amazing platform</p>
        <button className='bg-indigo-600 text-white rounded shadow px-6 py-3 text-sm'>Explore All</button>
      </div>
      <div className='relative flex flex-col items-center h-64 w-42 md:w-64 lg:w-48'>
        <img src="/assets/house.jpeg" className='h-48 rounded-2xl w-44 md:w-full object-cover'/>
        <div className='bg-white flex flex-col items-center shadow-xl rounded-2xl absolute w-5/6 top-40 md:top-36 px-3 py-3'>
          <div className='flex gap-1 flex justify-center'>
          <Star fill={'#4f46e5'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />
          <Star fill={'#4f46e5'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />
          <Star fill={'#4f46e5'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />

          </div>
          <p className='text-sm text-primary_gray mt-1'>Our Best Services</p>

          <div className='border-t pt-2 mt-2 w-full flex items-center  justify-between'>
            <Star fill={'#fcd34d'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} />
            <p className='text-xs text-primary_gray'>5 Star Rating</p>
          </div>
        </div>
      </div>

      <div className='relative w-42 md:w-52 lg:w-44 h-64'>
        <img src="/assets/house.jpeg" className='h-64 rounded-2xl w-44 md:w-full lg:w-44 bg-red-500 object-cover'/>
        <div className='h-64 bg-black/50 w-full absolute top-0 rounded-2xl px-3 flex flex-col justify-end py-8 '>
          <div className=''>
          <p className='text-white text-2xl  font-bold'>100 +</p>
          <p className='text-white text-xl font-medium lg:text-lg'> Properties in Kigali</p>
          <p className='text-white text-xs md:text-lg lg:text-xs'>All properties we have in kigali city</p>
          </div>
         
        </div>
        <div className='bg-indigo-600 py-1 px-4 absolute right-0 bottom-0 rounded-br-2xl'><ArrowIcon fill={'white'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /></div>
      </div>

      <div className='relative w-42 md:w-52 lg:w-44  h-64'>
        <img src="/assets/house.jpeg" className='h-64 rounded-2xl w-44 md:w-full object-cover'/>
        <div className='h-64 bg-black/50 w-full absolute top-0 rounded-2xl px-3 flex flex-col justify-end py-8 '>
          <div className=''>
          <p className='text-white text-2xl  font-bold'>100 +</p>
          <p className='text-white text-xl font-medium lg:text-lg'> Properties in Kigali</p>
          <p className='text-white text-xs md:text-lg lg:text-xs'>All properties we have in kigali city</p>
          </div>
         
        </div>
        <div className='bg-indigo-600 py-1 px-4 absolute right-0 bottom-0 rounded-br-2xl'><ArrowIcon fill={'white'} height={'20px'} width={'20px'} stroke={''} strokeWidth={0} /></div>
      </div>
    </div>
    // <div className=" flex flex-wrap justify-center xl:grid  xl:grid-cols-5  w-full  gap-6 px-5  lg:py-10   rounded-md max-w-[90rem]">
    //   <StatCard target={90} caption="Houses" />
    //   <StatCard target={90} caption="Villa" />
    //   <StatCard target={90} caption="Penthouse" />
    //   <StatCard target={90} caption="Studio Aprt" />
    //   <StatCard target={90} caption="Apartments" />
    
    //   {/* <StatCard target={40} caption="Partners who have worked with us" /> */}
    // </div>
  );
};

export default StatsGrid;
