
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
export default function Home() {


  const notify = () =>{ toast("Hello coders it was easy!")};

  const { isLoading, data } = useFetchHousesQuery("iii");


  return (
    <section className="flex flex-col items-center ">
      <section className="hero w-full bg-cover flex flex-col items-center justify-center">
        <div className="relative bg-hero-pattern w-full    bg-center h-screen lg:h-[800px] flex flex-col items-center justify-between">
          <NavBar />
          <div className="text-center absolute  bottom-40 px-5 lg:bottom-64 w-full max-w-[80rem] flex flex-col  items-center">
            <AnimatedText text="Find The House of Your Dream Using Our Platform" />

            {/* <SearchForm /> */}
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
              data?.slice(-3).map((house, index) => (
                <PropertyCard
                  key={index}
                  bedrooms={house.bedRooms}
                  baths={Number(house.bathRooms)}
                  area={Number(house.area)}
                  price={Number(house.price)}
                  title={house.title}
                  description={house.description}
                  id={house.id} coverImage={house.coverImageUrl}                />
              ))
            }

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
