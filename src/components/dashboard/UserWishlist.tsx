import { useFetchHousesQuery, useFetchSingleHouseQuery, useGetHouseWishlistQuery } from "@/redux/api/apiSlice";
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
import { useUserProfileQuery } from "@/redux/api/apiSlice";


const UserWishlist = () => {
  const router = useRouter()
  const [token, setToken] = useState("")
  const [user, setUser] = useState<any>(decodeToken(getToken()));



const [isMapModal, setIsMapModal] = useState(false);

const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [shareLink, setShareLink] = useState('');
const handleShowMap = (lat: number, lng: number) => {
  setLocation({ lat, lng });
  setIsMapModal(true);

};



// const user = decodeToken(token || '')

console.log("testingggggg", user)
const {data: authenticatedUserProfile, isLoading: fetchingProfile} = useUserProfileQuery<any>(user, {skip: !user?.sub});
console.log(authenticatedUserProfile, "authenticatedUserProfile userr")

const { isLoading, data } = useGetHouseWishlistQuery<any>(authenticatedUserProfile?.id, {
  skip: !authenticatedUserProfile?.id
});

console.log("data wishlits", data)
data?.map((hous: any) => {
  console.log(hous.house.id, "hous.house")
})
// console.log("wishlitssssssss", data.map((hous: any) => hous.house))
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

  console.log("selected authenticatedUserProfile?.id", authenticatedUserProfile?.id)
const userShare = authenticatedUserProfile?.id
  const generateShareLink = async () => {
    try {
      const response = await fetch(`http://localhost:8080/public/wishlist/get/${authenticatedUserProfile?.id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      console.log("linkkkkkkkk", data)
      const link = data.shareLink; 
      console.log("link copioeddd", link)
      setShareLink(link);
      navigator.clipboard.writeText(link).then(() => {
        console.log('Link copied to clipboard!');
        setIsModalOpen(true); // Show the modal after copying
      });
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row py-10  w-full h-screen fixed pl-16 lg:px-16  gap-5">

{/* <button onClick={generateShareLink}>Share wishlist</button> */}
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} link={shareLink} />


      {/* {isLoading &&  <div className={`w-full absolute left-0 top-0 bottom-0 right-0 h-screen`}><WishlistShare /> </div>} */}

      <div className={`${data?.length === 0 ? 'w-full h-full' : 'md:w-5/6 '} overflow-y-scroll h-[90vh] `}>
        {/* <div className="container mx-auto p-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
        onClick={() => setShowInput(!showInput)}
      >
        Share Your Wishlist
      </button>

      {showInput && <EmailInput userId={Number(user?.id)} />}
    </div> */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 lg:gap-10 px-4 gap-4   h-full py-10 overflow-y-scroll w-full ml-5 md:ml-20 lg:-ml-8 `}>
          {data?.length === 0 ? (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <div className="w-1/2 flex flex-col gap-2 items-center">
                <h3 className="font-medium ">Hello {authenticatedUserProfile?.fullname}</h3>
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
                      id={house.id} coverImage={house.coverImageUrl} lastUpdated={undefined} setBookTour={undefined} bookTour={undefined} shareHouse={undefined} setShareHouse={undefined} onShare={undefined} onBookVisit={undefined}                    />
                  ))
                }
              </div>
              <Button className="text-white px-6" label={"Explore Properties"} onClick={exploreMore} />
            </div>
          ) : (

            data?.map((hous: any, index: number) => {
              console.log(hous.house.id, "hous.house")
       
              // const houseId = hous.houseId
              console.log(index, "hous")

              const property = hous?.house;
              console.log(property, "property")
              return (
                <div key={index} className="flex gap-10  w-full  justify-between">
                    <LocationCard lat={Number(property?.lat)} lng={Number(property?.longi)} onShowMap={handleShowMap} coverImage={property?.coverImageUrl} id={property?.id} userId={authenticatedUserProfile?.id} setIsMapModal={setIsMapModal} />
                  {/* <HouseWishlist CoverImage={property.coverImageUrl}  id={property.id} key={property.id} location={property} lat={property.lat} lng={property.longi} onSelect={handleLocationSelect} onShowMap={handleShowMap}/> */}
                </div>

              );
            })
          )}
        </div>
      </div>
{isMapModal && 
 <div className={` absolute top-0 z-50 h-screen left-0 flex items-center  w-full bg-black/50 ${data?.length === 0 ? 'w-0' : ''}`}>

  <div className="bg-white w-full xl:w-1/2 h-4/5 px-3 md:px-10 xl:px-20 ml-24 xl:ml-28">
  <button className="text-black mt-20 bg-white w-full z-50" onClick={() => setIsMapModal(false)}>X</button>

  <div className="mt-5  h-4/5 overflow-y-scroll">
 {location && <GoogleMapPanorama key={`${location.lat}-${location.lng}`} lat={location.lat} lng={location.lng} />}
 </div>
 </div>
 </div>

}

      {/* <div className={` h-screen hidden lg:block overflow-y-scroll ${data?.length === 0 ? 'w-0' : 'lg:w-2/5'}`}>
      {location && <GoogleMapPanorama key={`${location.lat}-${location.lng}`} lat={location.lat} lng={location.lng} />}
      </div> */}
    </div>
  );
};

export default UserWishlist;



const Modal = ({ isOpen, onClose, link }: any) => {
  if (!isOpen) return null;

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
      <p>Share Link: {link}</p>
      <button onClick={copyLinkAgain}>Copy</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};