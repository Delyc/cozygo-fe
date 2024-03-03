import { ArrowIcon, LocationIcon, RoomIcon } from "@/components/svgs/Heart";
import { decodeToken } from "@/helpers/decodeToken";
import { useToggleHouseInWishListMutation, useGetHouseWishlistQuery } from "@/redux/api/apiSlice";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";

interface Props {
    location: Location;
    onSelect: (location: Location) => void;
    bedrooms: number;
  baths: number;
  area: number;
  price: number;
  address: string;
  googleMapLocation: string;
  onButtonClick: (newContent: string) => void;
  isSelected: boolean;
  cardIndex?: number;
  id: number;
  }
  
  const HouseWishlist: React.FC<any> = ({ id, location, onSelect, showMap, isSelected, address, bedrooms,cardIndex }: any) => {
    console.log(location, "locationnn")
const user = decodeToken(localStorage.getItem("token") || '')

    const { name, lat, longi } = location;
    const [toggleHouseInWishlist] = useToggleHouseInWishListMutation();
    const { data: houseWishlist, refetch } = useGetHouseWishlistQuery(Number(user?.id));
    const houseExistInWishlist = houseWishlist?.find((hous) => hous.house.id === id);

    const handleToggleHouse = async (houseId: number, userId: number) => {
        await toggleHouseInWishlist({ houseId, userId });
        refetch();
      };

      console.log("idddddddddddd", id)
    
    return (

        <div
        className={`${
          isSelected ? "bg-red-500" : " bg-white"
        } w-[30rem] h-[12rem] flex  gap-2 items-center relative`}
      >
        <img className="w-[10rem] min-h-full" src="./assets/house.jpeg" alt="House" />
        <div className="w-full h-full pt-2 bg-white ">
          <div className="flex flex-col px-2 gap-3">
            <div className="flex items-center justify-between text-xl font-bold">
              {/* <p>${price.toFixed(2)}</p> */}
              <p>{cardIndex}</p>
              <div className="flex gap-2.5 items-center">
                <button
                  onClick={() => handleToggleHouse(id, Number(user?.id))}
                  className="relative w-8 h-8 rounded-full  grid place-content-center"
                >
                                {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />}

                </button>
                <div className="w-6 h-6 bg-indigo-600 rounded-full grid place-content-center">
                  <ArrowIcon
                    fill={"#fff"}
                    height={"20px"}
                    width={"18px"}
                    stroke={"#fff"}
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-5 border-b border-gray-200 gap-1">
              <p className="text-base text-primary_gray font-jost ">{address}</p>
              <p className="text-xs font-normal text-primary_gray ">{address}</p>
            </div>
          </div>
          <div className="flex items-center px-5 py-2 gap-2">
            <div className="flex items-center  gap-1">
              <RoomIcon
                fill={"#757B8D"}
                height={"20px"}
                width={"20px"}
                stroke={"#757B8D"}
                strokeWidth={0}
              />
              <p className="text-xs  text-primary_gray">{bedrooms} rooms</p>
            </div>
  
            <div className="flex items-center  gap-1">
              <RoomIcon
                fill={"#757B8D"}
                height={"20px"}
                width={"20px"}
                stroke={"#757B8D"}
                strokeWidth={0}
              />
              <p className="text-xs  text-primary_gray">rooms</p>
            </div>
  
            <div className="flex items-center  gap-1">
              <LocationIcon
                fill={"#757B8D"}
                height={"20px"}
                width={"20px"}
                stroke={"#757B8D"}
                strokeWidth={0}
              />
              <p className="text-xs  text-primary_gray">Location</p>
            </div>
          </div>
          <div>
  
          <button
  className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
  onClick={() => onSelect && onSelect(location)}
>
  Show on Map
</button>
            {/* <button onClick={handleView360Click}>View 360</button> */}
            {/* <button onClick={handleGoogleMapClick}>Google map location</button> */}
            {/* {isSelected && <GoogleMap location={{ lat: 37.7749, lng: -122.4194 }} />
   } */}
  
            {/* <button onClick={handleContactAgentClick}>Contact agent</button> */}
          </div>
        </div>
      </div>
//       <div className="max-w-sm w-[30rem] p-4 m-2 overflow-hidden rounded shadow-lg">
//         <div className="px-6 py-4">
//           <div className="mb-2 text-xl font-bold">{name}</div>
//           <p>Latitude: {lat}</p>
//           <p>Longitude: {longi}</p>
//           <button
//   className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
//   onClick={() => onSelect && onSelect(location)}
// >
//   Show on Map
// </button>

//         </div>
//       </div>
    );
  };

  export default HouseWishlist
  