
import { BedDouble, ShowerHead } from "lucide-react";
import Image from "next/image";
const LatestProperties = () => {
  return (
    <div className="w-full bg-[#F5F7FB] py-10 lg:py-20 flex justify-center ">
      <div className="flex flex-col gap-10 w-full  max-w-[70rem]">
        <div className="flex flex-col gap-5 px-5 md:px-8 lg:px-20">
          <p className="uppercase text-sm text-blue-800 font-regular">
            BROWSE HOT OFFER
          </p>
          <p className="font-semibold text-2xl text-[#878C9F] ">
            Latest Properties
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 px-5 gap-8">

          <div className="bg-white w-full md:w-81 rounded-b" >
            <div className="w-full">

            <Image src='/assets/hs.png' alt="house" width={300} height={200} className="w-full object-cover" />
            </div>
            <div className="px-3">
              <p className="text-black font-bold text-sm mt-2">Hello new house listing</p>
              <p className="text-gray-500 text-sm mt-3 mb-5">Hello new house listingHello new house listingHello new house listingHello new house ...</p>
              <div className="w-4/5 mx-auto h-[1px] bg-slate-200"></div>
              <div className="flex gap-2 text-gray-500 mt-5 mb-3">
                <div className="flex items-center gap-1"> <ShowerHead className="text-blue-800 w-4 h-4"/>2bath </div>
                <div className="flex items-center gap-1"><BedDouble className="text-blue-800 w-4 h-4" />2bed </div>
              </div>
            </div>
          </div>


          <div className="bg-white md:w-81 rounded-b" >
            <div className="w-fill">

            <Image src='/assets/hs.png' alt="house" width={300} height={200} className="w-full" />
            </div>
            <div className="px-3">
              <p className="text-black font-bold text-sm mt-2">Hello new house listing</p>
              <p className="text-gray-500 text-sm mt-3 mb-5">Hello new house listingHello new house listingHello new house listingHello new house ...</p>
              <div className="w-4/5 mx-auto h-[1px] bg-slate-200"></div>
              <div className="flex gap-2 text-gray-500 mt-5 mb-3">
                <div className="flex items-center gap-1"> <ShowerHead className="text-blue-800 w-4 h-4"/>2bath </div>
                <div className="flex items-center gap-1"><BedDouble className="text-blue-800 w-4 h-4" />2bed </div>
              </div>
            </div>
          </div>


          <div className="bg-white md:w-81 rounded-b" >
            <div className="w-fill">

            <Image src='/assets/hs.png' alt="house" width={300} height={200} className="w-full" />
            </div>
            <div className="px-3">
              <p className="text-black font-bold text-sm mt-2">Hello new house listing</p>
              <p className="text-gray-500 text-sm mt-3 mb-5">Hello new house listingHello new house listingHello new house listingHello new house ...</p>
              <div className="w-4/5 mx-auto h-[1px] bg-slate-200"></div>
              <div className="flex gap-2 text-gray-500 mt-5 mb-3">
                <div className="flex items-center gap-1"> <ShowerHead className="text-blue-800 w-4 h-4"/>2bath </div>
                <div className="flex items-center gap-1"><BedDouble className="text-blue-800 w-4 h-4" />2bed </div>
              </div>
            </div>
          </div>


        </div>


      </div>
    </div>
  );
};

export default LatestProperties;
