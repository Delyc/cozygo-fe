
'use client'
import PropertyCard from "@/components/UI/cards/House";
import PlanCard from "@/components/UI/cards/Plan";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import NavBar from "@/components/layout/Navbar";
import SearchForm from "./hero/page";
import AnimatedText from "@/components/animations/AnimatedText";
import FeaturesSection from "@/components/sections/home/Platform";
import { motion } from "framer-motion";
import houseImage from '../../public/assets/hs.png'; //
import RealEstateComponent from "@/components/RealEstate";
import { useFetchHousesQuery } from "@/redux/api/apiSlice";
import Plans from "@/components/sections/home/Plans";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SingleValue } from "react-select";
import { convertDateToReadableFormat } from "@/helpers/convertDate";
import { useState, useEffect } from "react";
import { Copy, Instagram, Snapchat, Whatsapp } from "@/components/svgs/Heart";
export default function Home() {
  const [shareLink, setShareLink] = useState('');


  const notify = () =>{ toast("Hello coders it was easy!")};
  const [shareHouse, setShareHouse] = useState(false);
  const generateShareLink = async (id: any) => { 
    try {
      const response = await fetch(`http://localhost:8080/public/share/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const link = data.shareLink;
      setShareLink(link);
      navigator.clipboard.writeText(link)
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };

  const copyLinkAgain = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Link copied to clipboard!');
  };
  const { isLoading, data } = useFetchHousesQuery("iii");
  const [bookTour, setBookTour] = useState(false);

  const onCloseBookingModal = () =>{
    setBookTour(false)
  }

  const onCloseShareModal = () =>{
    setShareHouse(false)
  }
 

console.log("rtesss", bookTour)
  return (
    <section className="flex flex-col items-center ">
      <section className="hero w-full bg-cover flex flex-col items-center justify-center">
        <div className="relative bg-hero-pattern w-full    bg-center h-screen h-screen flex flex-col items-center justify-between">
          <NavBar />
          <div className="text-center absolute  bottom-40 px-5 lg:bottom-64 w-full max-w-[80rem] flex flex-col  items-center">
            <AnimatedText text="Find The House of Your Dream" />

            <SearchForm onDistrictChange={function (selectedDistrict: SingleValue<any>): void {
              throw new Error("Function not implemented.");
            } } onSectorChange={function (selectedSector: SingleValue<any>): void {
              throw new Error("Function not implemented.");
            } } onHouseTypeChange={function (selectedHouseType: SingleValue<any>): void {
              throw new Error("Function not implemented.");
            } } onPriceRangeChange={function (priceRange: string): void {
              throw new Error("Function not implemented.");
            } } onBedroomsChange={function (bedrooms: string): void {
              throw new Error("Function not implemented.");
            } } />
          </div>
        </div>


      </section>

      <RealEstateComponent />

      <div className="w-full bg-[#F5F7FB] py-10 lg:py-20 flex justify-center">

        <div className="flex flex-col gap-10 w-full max-w-[80rem]">
          <div className="flex flex-col gap-5 px-5 lg:px-20" >
            <p className="uppercase text-sm text-indigo-600 font-regular">BROWSE HOT OFFER</p>
            <p className="font-semibold text-2xl text-[#878C9F] ">Latest Properties</p>
          </div>

          <div className="w-full pb-20 px-5 lg:px-20 mx-auto grid  lg:grid-cols-3 gap-20 xl:gap-5 ">
            {
              data?.slice(-3).map((house, index) => {

                console.log(house?.id, "tetsiiiii")
                return(
                  <PropertyCard
                    key={index}
                    bedrooms={house.bedRooms}
                    baths={Number(house.bathRooms)}
                    area={Number(house.area)}
                    price={Number(house.price)}
                    title={house.title}
                    description={house.description}
                    id={house.id} coverImage={house.coverImageUrl}
                    onShare={() => {
                      generateShareLink(house.id);
                      setShareHouse(!shareHouse)

                    } }
              
                    lastUpdated={convertDateToReadableFormat(house.updatedAt)} setBookTour={setBookTour}  bookTour={bookTour}   setShareHouse={setShareHouse}   shareHouse={shareHouse}     />
                )
              })
            }

            {bookTour  && <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
              <div className="w-[30rem] h-[30rem] bg-white flex flex-col items-center justify-center rounded-xl">
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Image src={houseImage} alt="House" />
                  </div>

                  <button onClick={onCloseBookingModal}>close</button>
                  </div>
                  </div>
            }

            {shareHouse &&  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-40">
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 flex flex-col items-center gap-5 rounded-lg shadow-lg">
           <button onClick={onCloseShareModal} className='w-full text-xl'>X</button>
        <div className='flex items-center gap-10'>
          {shareLink}
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
          <a href={`https://wa.me?text=${encodeURIComponent(shareLink)}`} target="_blank" rel="noopener noreferrer" className="w-[30px] h-[30px]">
            <Whatsapp />
          </a>
        </div>
     
      </div>
    </div>}

          </div>
        </div>
      </div>

      <Plans />
     
      <div>


        <FeaturesSection />
      </div>
      <Footer />
    </section>
  );
}
