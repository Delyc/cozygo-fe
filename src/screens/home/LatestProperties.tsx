
'use client'

import Loader from "@/components/molecules/Loader";
import HouseCard from "@/components/organisms/House";
import { decodeToken } from "@/helpers/decodeToken";
import { useFetchHouses } from "@/services/hooks/house";
import { House } from "@/types/types";
import { useEffect, useState } from "react";

const LatestProperties = () => {

  const [token, setToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);
  }, []);
  const user = token ? decodeToken(token) : null;
  const userId = user?.userId || '';

  const combinedFilters = {
    userId,
  };

  const { data: houses, isLoading, error } = useFetchHouses(combinedFilters);
  if (isLoading) return <Loader />;
  if (error) return <p>Error loading houses</p>;


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
          {houses?.slice(0, 3).map((house: House, index) => (
            <HouseCard
              key={index}
              id={house.id}
              favorites={house.isFavorited ?? false}
              title={house.title}
              description={house.description}
              imgSrc={house.coverImageUrl || "/assets/hs.png"} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default LatestProperties;
