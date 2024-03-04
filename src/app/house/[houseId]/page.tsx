"use client";

import SearchForm from "@/app/hero/page";
import PropertyActions from "@/components/UI/cards/PropertyAction";
import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/Navbar";
import FromSameAgentSameArea from "@/components/sections/MoreFromSameAgentSameArea";
import { Call, Mail, Message, RoomIcon } from "@/components/svgs/Heart";
import { useFetchSingleHouseQuery } from "@/redux/api/apiSlice";
import { useParams } from "next/navigation";
import { hostname } from "os";
import React, { useState } from "react";
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
  const videos = house?.videoUrls || [];
  const images = house?.pictureUrls || [];
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

// Display filtered properties



  console.log(videos[0], "videosssss")
  return (
    <section className="flex flex-col items-center justify-center bg-white">
      <NavBar />
      <div className="w-full  mt-[80px] bg-slate-100 py-20">
        <div className="mx-auto px-5  max-w-[80rem] flex flex-col gap-10 items-center">
          <SearchForm />
          <div className="flex flex-col gap-10 justify-between ">
            <div className="flex justify-between w-full gap-10">
              <div className=" w-3/5 h-[25rem]">
                <video controls className="object-cover w-full h-full">
                  <source src={videos[0]} type="video/mp4" />
                </video>
                <button>Click here to watch more videos</button>
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
                      {images.map((src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Slide ${index}`}
                          className={`w-full h-auto md:h-full cursor-pointer ${zoomedIndex === index ? "z-10 absolute inset-0 object-contain" : ""
                            }`}
                          onClick={() => toggleZoom(index)}
                        />
                      ))}
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

      <div className="max-w-[80rem] mx-auto py-20">
        <div className="w-full flex justify-center  gap-10 px-20">
          <div className="w-3/5 ">
            <h3>Adreesss</h3>
            <div className="flex gap-5">
              <button className="px-6 py-2 text-xs font-medium border border-indigo-600 rounded-2xl text-primary_gray">
                Take a virtual tour around neighborhood
              </button>
              <button className="px-6 py-2 text-xs font-medium border border-indigo-600 rounded-2xl text-primary_gray">
                view Location
              </button>
            </div>

            <div>
              <p className="text-xs text-primary_gray">
                {" "}
                1123 Fictional St, San Francisco, CA 94103
              </p>
              <p className="text-lg font-bold text-black">
                {" "}
                1123 Fictional St, San Francisco, CA 94103
              </p>
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
                <p className="text-xs  text-primary_gray">2 rooms</p>
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
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="text-xl font-bold">About the property</h3>

              <p className="text-xs text-primary_gray leading-5 w-4/5">
                {" "}
                1123 Fictional St, San Francisco, 1123 Fictional St, San Francisco, 1123 Fictional
                St, San Francisco, 1123 Fictional St, San Francisco, 1123 Fictional St, San
                Francisco, 1123 Fictional St, San Francisco, CA 94103123 Fictional St, San
                Francisco, CA 94103123 Fictional St, San Francisco, CA 94103123 Fictional St, San
                Francisco, CA 94103 123 Fictional St, San Francisco, CA 94103 123 Fictional St, San
                Francisco, CA 94103
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
          </div>

          <PropertyActions price={house?.price} />


        </div>
        <div className="px-20 mt-20 flex flex-col gap-5" >
          <h1 className="font-bold text-2xl ">React The Agent</h1>
          <div className="flex items-center gap-4">
            <div className="border border-indigo-600 w-36 h-36 grid place-content-center rounded-full">
              <img src={house?.agentPicture} className="w-32 h-32 rounded-full" />

            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p className="font-semibold">{house?.agentName}</p>
                <p className="text-primary_gray text-xs">Property Owner</p>
              </div>

              <div className="flex flex-col gap-1">
                <button className="flex items-center gap-1 text-xs text-primary_gray"><Message fill={"#757B8D"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} /> Chat With Agent</button>
                <a href={`tel:${house?.agentPhoneNumber}`} className="flex items-center gap-1 text-xs text-primary_gray"><Call fill={"#757B8D"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} />{house?.agentPhoneNumber}</a>
                <a href={`mailto:${house?.agentEmail}`} className="text-xs text-primary_gray flex items-center gap-1"><Mail fill={"#757B8D"} height={"20px"} width={"20px"} stroke={"none"} strokeWidth={0} />{house?.agentEmail}</a>
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
