import { useGetHouseWishlistQuery } from "@/redux/api/apiSlice";
import { useState, useEffect } from "react";
import WishlistHouse from "../UI/cards/WishlistHouse";
import GoogleMapDisplay from "../google/GoogleMapDisplay";
import LocationCard from "../google/LocationCard";

const UserWishlist = () => {
  const USER_ID = 1;
  const { isLoading, data } = useGetHouseWishlistQuery(USER_ID);
  const [content, setContent] = useState<string | null>(null);
  // const handleButtonClick = (newContent: string, cardIndex: number) => {
  //   setContent(newContent);
  //   setSelectedCard(cardIndex);
  // };
  const [selectedLocation, setSelectedLocation] =useState<any | null>(); // To store location data
  const [embedUrl, setEmbedUrl] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  // const handleButtonClick = (locationData: string, cardIndex: number) => {
  //   // Assuming locationData is an address for simplicity; adjust as needed for lat/lng
  //   const encodedAddress = encodeURIComponent(locationData);
  //   const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;
  //   setEmbedUrl(url);
  //   setSelectedCard(cardIndex);
  // };

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    if (selectedLocation) {
    console.log(selectedLocation, "inside use effect")

      const encodedAddress = encodeURIComponent(selectedLocation.streetNumber);
      const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;
      setEmbedUrl(url);
    }
  }, [selectedLocation]); 
 

  return (
    <div className="flex py-10  w-full h-screen fixed  gap-5">
      <div className="flex flex-col px-4 gap-4  h-full py-10 overflow-y-scroll w-2/5 ">
        {data?.length === 0 ? (
          <span>Your wishlist is empty</span>
        ) : (
          data?.map((hous, index) => {
            console.log(hous, "housee")
            const property = hous.house;
            return (
              <div className="flex gap-10  w-full justify-between">
                {/* <WishlistHouse location={property} onSelect={handleLocationSelect}/> */}
              <LocationCard  key={property.id} location={property} onSelect={handleLocationSelect}/>
            
              </div>
       
            );
          })
        )}
      </div>

      <div className="w-1/2  h-screen">
        
      {selectedLocation?.lat && selectedLocation?.longi ?  <div className="w-full h-screen">{selectedLocation && (
          <GoogleMapDisplay lat={Number(selectedLocation.lat)} lng={Number(selectedLocation.longi)} />
        )}</div> :  <div className="w-full h-screen"> {embedUrl && (
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={embedUrl}>
          </iframe>
        

        )}
        </div>
        }
      </div>
    </div>
  );
};

export default UserWishlist;
