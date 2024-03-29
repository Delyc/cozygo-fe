"use client";

import SearchForm from "@/app/hero/page";
// import Modal from "@/app/modal/page";
import PropertyActions from "@/components/UI/cards/PropertyAction";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import FromSameAgentSameArea from "@/components/sections/MoreFromSameAgentSameArea";
import { BathRoom, Call, Copy, HeartIcon, Instagram, LocationIcon, Mail, Message, RoomIcon, ShareIcon, Snapchat, SurfaceArea, Whatsapp } from "@/components/svgs/Heart";
import GoogleMapPanorama from "@/helpers/StreetView";
import { decodeToken } from "@/helpers/decodeToken";
import getToken from "@/helpers/getToken";
import { useFetchHousesQuery, useFetchSingleHouseQuery, useGetHouseWishlistQuery, useToggleHouseInWishListMutation, useUserProfileQuery } from "@/redux/api/apiSlice";
import { useParams } from "next/navigation";
import { hostname } from "os";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
interface PropertyMap {
  [key: string]: boolean;
}
// const house: House = {
//   features: {
//     coolingSystem: false,
//     emergencyExit: false,
//     familyRoom: false,
//     firePlace: false,
//     diningRoom: false,
//     // Add more properties as needed
//   }
// };

const House: React.FC = () => {
  const { houseId } = useParams();
  const { data: house } = useFetchSingleHouseQuery(String(houseId));
  const [startIndex, setStartIndex] = useState(0);
  const [videosView, setVideosView] = useState(0);
  const [zoomedIndex, setZoomedIndex] = useState(-1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const videos = house?.videoUrls || [];
  const images = house?.pictureUrls || [];
  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
  }, [])

  const user = decodeToken(token || '')
  const { data: authenticatedUserProfile, isLoading: fetchingUserProfile } = useUserProfileQuery<any>(user?.sub!);

  const { data: houseWishlist, refetch } = useGetHouseWishlistQuery(Number(authenticatedUserProfile?.id));
  const [toggleHouseInWishlist] = useToggleHouseInWishListMutation();
  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");
  const houseExistInWishlist = houseWishlist?.find((hous) => hous.house.id === house?.id);
  const nextVid = () => {
    setVideosView((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
  };

  const prevVid = () => {
    setVideosView((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    const nextIndex = startIndex + 1;
    setStartIndex(nextIndex >= images.length - 2 ? images.length - 3 : nextIndex);
    setZoomedIndex(-1);
  };

  const prevSlide = () => {
    const prevIndex = startIndex - 1;
    setStartIndex(prevIndex < 0 ? 0 : prevIndex);
    setZoomedIndex(-1);
  };

  const toggleZoom = (index: number) => {
    setZoomedIndex(zoomedIndex === index ? -1 : index);
  };
  console.log("housesssss", house)
  console.log(house?.features, "houses")
  // Filter properties with value true
  const features: PropertyMap = house?.features ?
    Object.entries(house.features)
      .filter(([_, value]) => value === true)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {} as PropertyMap)
    : {};

    const generateShareLink = async () => {
      try {
        const response = await fetch(`http://localhost:8080/public/share/${house?.id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const link = data.shareLink;
        console.log("link copioeddd", link)
        setShareLink(link);
        navigator.clipboard.writeText(link).then(() => {
          console.log('Link copied to clipboard!');
          setIsModalOpen(true); 
        });
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    const handleToggleHouse = async (houseId: number, userId: number) => {
      console.log("hre is ", { houseId, userId });
      await toggleHouseInWishlist({ houseId, userId });
      refetch();
      refetchAllHouses();
  
    };
  
  // Display filtered properties



  console.log(videos[0], "videosssss")
  { console.log("houseeeeeee", house) }

  { console.log("longitudeeee", house?.longi) }
  { console.log("latitudeeeeeee", house?.lat) }

  return (
    <section className="flex flex-col items-center justify-center bg-white">
      <NavBar />
      <div className="w-full  mt-[80px] bg-slate-100 py-20">
        <div className="mx-auto px-5  max-w-[80rem] flex flex-col gap-2 items-center">
          {/* <SearchForm /> */}
          <div className="w-full flex justify-between">
          <div className="w-full flex  flex-col  gap-41">
          <p className="text-indigo-600 bg-indigo-600/20 w-fit px-4 py-1 rounded-xl">Avail</p>

            <p className="text-xl font-medium">{house?.title}</p>
            {/* <p>{house?title}</p> */}
          </div>
          <div className='flex items-center gap-5'>
           
            <div className='flex items-center cursor-pointer text-primary_gray gap-1' onClick={generateShareLink}>
              <ShareIcon fill={''} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} /> Share
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} link={shareLink} />
            </div>
            <div className="flex items-center gap-1 text-primary_gray text-sm">
            <button onClick={() => handleToggleHouse(Number(house?.id), Number(authenticatedUserProfile?.id))} className='w-8 h-8 rounded-full bg-indigo-600/20 grid place-content-center'>
                  {houseExistInWishlist ? <RiHeart3Fill fill="red" /> : <RiHeart3Line fill="red" />} 
                </button>
                Wishlist
                </div>

          </div>
          </div>
          <div className="flex flex-col gap-10 justify-between ">
            <div className="flex justify-between w-full gap-10">
              <div className=" w-3/5 h-[25rem]">
              <img src={house?.coverImageUrl} className="object-cover w-full h-full" alt="house" />

                {/* <video controls className="object-cover w-full h-full">
                  <source src={videos[0]} type="video/mp4" />
                </video> */}
                {/* <button>Click here to watch more videos</button> */}
              </div>

              <div className="flex-wrap justify-end w-2/5 grid grid-cols-3  gap-3">
                <div className="col-span-3  h-[15rem]">
                  <img src={house?.coverImageUrl} className="object-cover w-full h-full" alt="house" />
                </div>

                <div className="relative  col-span-3">
                  <div className="overflow-hidden  h-[10rem]">
                    <div
                      className="flex gap-5 transition-transform duration-300 ease-in-out"
                      style={{ transform: `translateX(-${startIndex * (100 / 3)}%)` }}
                    >
                  <img src={house?.coverImageUrl} className="object-cover w-full h-full" alt="house" />

                  <img src={house?.coverImageUrl} className="object-cover w-full h-full" alt="house" />

                  <img src={house?.coverImageUrl} className="object-cover w-full h-full" alt="house" />

                      {/* {images.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Slide ${index}`}
                          className={`w-full h-auto md:h-full cursor-pointer ${zoomedIndex === index ? "z-10 absolute inset-0 object-contain" : ""
                            }`}
                          onClick={() => toggleZoom(index)}
                        />
                      ))} */}
                    </div>
                  </div>
                  <button
                    className={`absolute top-1/2 left-0 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-full ${startIndex === 0 && "opacity-50 cursor-not-allowed"
                      }`}
                    onClick={prevSlide}
                    disabled={startIndex === 0}
                  >
                    Prev
                  </button>
                  <button
                    className={`absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-full ${startIndex === images.length - 3 && "opacity-50 cursor-not-allowed"
                      }`}
                    onClick={nextSlide}
                    disabled={startIndex === images.length - 3}
                  >
                    Next
                  </button>
                  {zoomedIndex !== -1 && (
                    <div
                      className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
                      onClick={() => toggleZoom(-1)}
                    >
                      <img
                        src={images[zoomedIndex]}
                        alt={`Zoomed Image`}
                        className="max-w-full max-h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="max-w-[80rem] w-full  mx-auto py-5">
        <div className="w-full  flex justify-center  gap-10 ">
          <div className="w-1/2  ">
          <div className="flex items-center gap-2 text-primary_gray text-sm"> <LocationIcon    fill={"#757B8D"}
                  height={"20px"}
                  width={"20px"}
                  stroke={"#757B8D"}
                  strokeWidth={0}/>
            <p>Kicukiro</p>
          </div>
          <div className="flex items-center px-5 py-2 gap-2 justify-between">
          <div className='flex items-center gap-3 '>
            <div className='flex items-center  gap-1'>
              <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
              <p className='text-xs  text-primary_gray'>{house?.bedRooms} bedrooms </p>
            </div>

            <div className='flex items-center  gap-1'>
              <BathRoom fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
              <p className='text-xs  text-primary_gray'>{house?.bathRooms} bathrooms</p>
            </div>
            <div className='flex items-center  gap-1'>
              <SurfaceArea fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} strokeWidth={0} />
              <p className='text-xs  text-primary_gray'>{house?.area} sqm</p>
            </div>
          </div>
        

        </div>
          

            <div className="flex flex-col gap-3 mt-5">
              <h3 className="text-xl font-bold">About the property</h3>

              <p className="text-base leading-6 text-primary_gray leading-5 w-4/5">
                {house?.description}

              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              <h3 className="text-2xl font-semibold">Amenities Available</h3>

              <ul className="grid grid-cols-3">
                {Object.entries(features).map(([key, value]) => (
                  <li key={key} className="check-item text-primary_gray">
                    {key}
                  </li>
                ))}
              </ul>

            </div>
            <div className=" py-5 flex flex-col gap-3">
              <h1 className="font-bold text-xl ">Schedule Appointment </h1>
              <PropertyActions price={house?.price} />
            </div>

          </div>
          <div className=" w-1/2">
            <GoogleMapPanorama key={`${house?.lat}-${house?.longi}`} lat={Number(house?.lat)} lng={Number(house?.longi)} />

          </div>
          {/* <PropertyActions price={house?.price} /> */}


        </div>
        <div className="px-20 mt-20 flex flex-col gap-5" >
          <h1 className="font-bold text-2xl ">React The Agent</h1>
          <div className="flex items-center gap-4">
            <div className="border border-indigo-600 w-36 h-36 grid place-content-center rounded-full">
              <img src={house?.user?.profilePictureUrl} className="w-32 h-32 rounded-full" />

            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-semibold">{house?.user?.fullname}</p>
                <p className="text-primary_gray text-xs">Property Owner</p>
              </div>

              <div className="flex flex-col gap-1">
                <a href={`tel:${house?.agentPhoneNumber}`} className="flex items-center gap-1 text-xs text-primary_gray"><Call fill={"#757B8D"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} />{house?.user?.phone}</a>
                <a href={`mailto:${house?.agentEmail}`} className="text-xs text-primary_gray flex items-center gap-1"><Mail fill={"#757B8D"} height={"20px"} width={"20px"} stroke={"none"} strokeWidth={0} />{house?.user?.email}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FromSameAgentSameArea agentId={house?.agentId} />
      <Footer />
    </section>
  );
};

export default House;
const Modal = ({ isOpen, onClose, link }: any) => {
  if (!isOpen) return null;

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 flex flex-col items-center gap-5 rounded-lg shadow-lg">
           <button onClick={onClose} className='w-full text-xl'>X</button>
        <div className='flex items-center gap-10'>
          {link}
          <button onClick={copyLinkAgain}>
            <Copy fill={"#757B8D"} height={"30px"} width={"30px"} stroke={"#757B8D"} strokeWidth={0} />
          </button>
        </div>
        <p className='text-primary_gray font-bold'>OR</p>
        <div className='flex gap-5'>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Instagram />
          </a>
          <a href=" https://twitter.com/" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <img src='./assets/twiiter.jpeg' className="w-[30px] h-[30px]" />
          </a>

          <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Snapchat />
          </a>
          <a href={`https://wa.me?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Whatsapp />
          </a>
        </div>
     
      </div>
    </div>
  );
};