import React from 'react';
import Heart from '../svgs/Heart';

type PropertyCardProps = {
  bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
};

const PropertyCard: React.FC<PropertyCardProps> = ({
  bedrooms,
  baths,
  area,
  price,
  address,
}) => {
  return (
    <div className="max-w-sm    flex flex-col items-center justify-center relative">
      <img className="w-full h-60 rounded-3xl" src="./assets/house.jpeg" alt="House" />
      <div className='absolute top-48 bg-white rounded-3xl shadow-2xl'>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          <p>${price.toFixed(2)}</p>
          <div>
            <div className='bg-indigo-600 w-4 h-4 rounded-full'>
              <Heart fill={"#4f46e5"} height={"20px"} width={"20px"} />
            </div>
          </div>
          </div>
        <p className="text-gray-700 text-base">{address}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{bedrooms} Bed</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{baths} Bath</span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{area} sq.ft</span>
      </div>
      </div>
    </div>
  );
};

export default PropertyCard;
