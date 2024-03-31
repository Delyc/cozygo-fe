
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
import ShareHouseModal from "@/components/modals/ShareHouseModal";
import BookVisitModal from "@/components/modals/BookVisitModal";
export default function Home() {
  const [shareLink, setShareLink] = useState('');


  const notify = () =>{ toast("Hello coders it was easy!")};
  const [shareHouse, setShareHouse] = useState(false);
  const [agentId, setAgentId] = useState();
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
 
  const stopScrollingWhenShareHouse = (shareHouse: any) => {
    if (shareHouse) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };


  const onBookVisit = (id: any) => {
    setAgentId(id)
  }
  const stopScrollingWhenBookVisit = (bookTour: any) => {
    if (bookTour) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };
  useEffect(() => {
    stopScrollingWhenShareHouse(shareHouse);
  }, [shareHouse]);
  useEffect(() => {
    stopScrollingWhenBookVisit(bookTour);
  }, [bookTour]);
console.log("rtesss", bookTour)

const [ToVisitHouse, setToVisitHouse] = useState<any>();
  return (
    <section className="flex flex-col items-center ">
      <section className="hero w-full bg-cover flex flex-col items-center justify-center">
        <div className="relative bg-hero-pattern w-full    bg-center h-screen md:h-[800px] lg:h-screen flex flex-col items-center justify-between">
          <NavBar />
          <div className="text-center absolute  bottom-10  md:bottom-40 px-5 lg:bottom-64 w-full md:w-4/5 max-w-[80rem] flex flex-col  items-center">
            <div className="flex flex-col gap-3 mb-5 lg:w-2/3  px-5 py-5 rounded ">
              {/* <p className="text-white  text-xl text-center">Your new home is one conversation away</p> */}
              <h1 className="text-white xl:leading-[-40px] font-medium  text-3xl  md:text-5xl  md:leading-[70px] leading-[40px] xl:text-[40px] text-center xl:px-20">Explore Prime  Homes for Sale on Our Premier Website!</h1>
              {/* <h1 className="text-white text-4xl font-">Find Your Dream </h1>
              <h1 className="text-white text-3xl font-">Find Your </h1> */}
            {/* <AnimatedText text="Find The " />
            <AnimatedText text=" House of" />
            <AnimatedText text="Your Dream" /> */}
            </div>
          

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

          <div className="w-full pb-20 px-5 lg:px-20 mx-auto grid  lg:grid-cols-3 gap-28 xl:gap-5 ">
            {
              data?.slice(-3).map((house, index) => {

                console.log(house, "tetsiiiii")
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

                    onBookVisit={() => {
                      setToVisitHouse(house);
                      setBookTour(!bookTour)
                    }
                    }
              
                    lastUpdated={convertDateToReadableFormat(house.updatedAt)} setBookTour={setBookTour}  bookTour={bookTour}   setShareHouse={setShareHouse}   shareHouse={shareHouse}     
                    />
                )
              })
            }

            {bookTour && <BookVisitModal onCloseBookingModal={onCloseBookingModal} ToVisitHouse={ToVisitHouse} />}

            {shareHouse &&  <ShareHouseModal onCloseShareModal={onCloseShareModal} shareLink={shareLink} copyLinkAgain={copyLinkAgain} />}

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
