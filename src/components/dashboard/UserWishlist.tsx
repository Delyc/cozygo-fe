import { useFetchHousesQuery, useGetHouseWishlistQuery } from "@/redux/api/apiSlice";
import { useState, useEffect } from "react";
import WishlistHouse from "../UI/cards/WishlistHouse";
import GoogleMapDisplay from "../google/GoogleMapDisplay";
// import LocationCard from "../google/LocationCard";
import LocationCard from "../LocationCard";
import { decodeToken } from "@/helpers/decodeToken";
import HouseWishlist from "../UI/cards/HouseWishlist";
import EmailInput from "../EmailInput";
import Button from "../UI/Button";
import PropertyCard from "../UI/cards/House";
import { HouseDTO } from "@/types/houses";
import { LocationIcon } from "../svgs/Heart";
import { useRouter } from "next/navigation";
import WishlistShare from "../Skeletons/Wishlist";
import getToken from "@/helpers/getToken";
import GoogleMapPanorama from "@/helpers/StreetView";

const UserWishlist = () => {
  const router = useRouter()
  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
}, [])


const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);

const handleShowMap = (lat: number, lng: number) => {
  setLocation({ lat, lng });
};

console.log("tokeeeeee", token)

  const user = decodeToken(token || '')
  console.log("userrrrrrrrr", user?.id)
  const { isLoading, data } = useGetHouseWishlistQuery(Number(user?.id), {skip:!user?.id});
  const { isLoading: loadingHouses, data: houses } = useFetchHousesQuery("iii");

  const [content, setContent] = useState<string | null>(null);
  // const handleButtonClick = (newContent: string, cardIndex: number) => {
  //   setContent(newContent);
  //   setSelectedCard(cardIndex);
  // };
  const [selectedLocation, setSelectedLocation] = useState<any | null>(); // To store location data
  const [embedUrl, setEmbedUrl] = useState('');
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [showInput, setShowInput] = useState(false);
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

  const exploreMore = () => {
    router.push("/houses")
  }

  useEffect(() => {
    if (selectedLocation) {
      console.log(selectedLocation, "inside use effect")

      const encodedAddress = encodeURIComponent(selectedLocation.streetNumber);
      const url = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`;
      setEmbedUrl(url);
    }
  }, [selectedLocation]);


  return (
    <div className="flex py-10  w-[90%] h-screen fixed  gap-5">
      {isLoading &&  <div className={`w-full absolute left-0 top-0 bottom-0 right-0 h-screen`}><WishlistShare /> </div>}

      <div className={`${data?.length === 0 ? 'w-full h-full' : 'w-2/5'}`}>
        {/* <div className="container mx-auto p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={() => setShowInput(!showInput)}
      >
        Share Your Wishlist
      </button>

      {showInput && <EmailInput userId={Number(user?.id)} />}
    </div> */}
        <div className={`flex flex-col px-4 gap-4  h-full py-10 overflow-y-scroll w-full lg:-ml-8 `}>
          {data?.length === 0 ? (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <div className="w-1/2 flex flex-col gap-2 items-center">
                <h3 className="font-medium ">Hello {user?.firstName}</h3>
                <p className="text-primary_gray text-3xl">Your Wishlist is currently empty!!!</p>
                <p className="text-primary_gray text-sm text-center">We{"'"}re thrilled to offer you a seamless way to explore properties and curate your dream home wishlist. Whether you{"'"}re searching for a cozy apartment, a spacious family home, we{"'"}ve got you covered.</p>

              </div>
              <div className="flex flex-col items-center">

                <p className="text-primary_gray">Browse through our extensive collection of properties. Filter by</p>
                <ul className="grid grid-cols-2 gap-x-10">
                  <li className="check-item">Location</li>
                  <li className="check-item">Price range</li>
                  <li className="check-item">Property type</li>
                  <li className="check-item">etc....</li>

                </ul>
                <p className="text-primary_gray">and more to narrow down your options</p>
              </div>
              <p className="uppercase text-sm mt-5 font-bold">Recently added</p>
              <div className="w-full pb-20 px-5 lg:px-20 mx-auto grid  lg:grid-cols-3 gap-5 ">
                {
                  houses?.slice(-3).map((house: HouseDTO, index) => (
                    <PropertyCard
                      key={index}
                      bedrooms={house.bedRooms}
                      baths={2}
                      area={0}
                      price={0}
                      title={house.title}
                      description={house.description}
                      id={house.id} coverImage={house.coverImageUrl}                    />
                  ))
                }
              </div>
              <Button className="text-white px-6" label={"Explore Properties"} onClick={exploreMore} />
            </div>
          ) : (
            data?.map((hous, index) => {
              const property = hous.house;
              return (
                <div key={index} className="flex gap-10  w-full justify-between">
                  <LocationCard lat={Number(property?.lat)} lng={Number(property?.longi)} onShowMap={handleShowMap} />
                  {/* <HouseWishlist CoverImage={property.coverImageUrl}  id={property.id} key={property.id} location={property} lat={property.lat} lng={property.longi} onSelect={handleLocationSelect} onShowMap={handleShowMap}/> */}
                </div>

              );
            })
          )}
        </div>
      </div>


      <div className={` h-screen ${data?.length === 0 ? 'w-0' : 'w-1/2'}`}>

      {location && <GoogleMapPanorama key={`${location.lat}-${location.lng}`} lat={location.lat} lng={location.lng} />}


        {/* {selectedLocation?.lat && selectedLocation?.longi ? <div className="w-full h-screen">{selectedLocation && (
          <GoogleMapDisplay lat={Number(selectedLocation.lat)} lng={Number(selectedLocation.longi)} />
        )}</div> : <div className="w-full h-screen"> {embedUrl && (
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
        } */}
      </div>
    </div>
  );
};

export default UserWishlist;
