
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

export default function Home({
  fromStart,
  currentPlan,
  changeTo,
  // isLoading,
}: {
  fromStart?: boolean;
  currentPlan?: string;
  changeTo?: (plan: string) => void;
  isLoading?: boolean;
}) {

  const { isLoading, data } = useFetchHousesQuery("iii");


  return (
    <section className="flex flex-col items-center ">
      <section className="hero w-full bg-cover flex flex-col items-center justify-center">
        <div className="relative bg-hero-pattern w-full    bg-center h-screen lg:h-[800px] flex flex-col items-center justify-between">
          <NavBar />
          <div className="text-center absolute  bottom-40 px-5 lg:bottom-64 w-full max-w-[80rem] flex flex-col  items-center">
            <AnimatedText text="Find The House of Your Dream Using Our Platform" />

            <SearchForm />
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

          <div className="w-full pb-20 px-5 lg:px-20 mx-auto grid  lg:grid-cols-3 gap-5 ">
          {
  data?.slice(-3).map((house) => (
    <PropertyCard 
      bedrooms={house.bedRooms}
      baths={2}
      area={0}
      price={0}
      title={house.title}           
      description={house.description}           
      id={house.id}
    />
  ))
}

          </div>
        </div>
      </div>
      <div className="flex flex-col py-20 gap-10 w-full max-w-[80rem]">

        <div className="flex flex-col gap-5 px-20" >
          <p className="uppercase text-sm text-indigo-600 font-regular">pricing plan</p>
          <p className="font-semibold text-2xl text-[#878C9F] ">Choose a plan that’s right for you</p>
        </div>
        <div
          className={`${fromStart ? "w-full" : "lg:w-full xl:w-full"
            } relative mr-auto`}
        >
          <div className="relative mx-auto max-w-4xl lg:flex">
            <motion.div
              initial={{ x: -30, scale: 1 }}
              whileInView={{ x: 0, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature featureThreeGradient bg-indigo-600/80 disable-mobile-animation relative mx-auto mb-3 w-full min-w-[250px] rounded-md px-4 py-8 text-white md:max-w-[300px] lg:my-2 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-4 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase `}
                >
                  Starter
                </h3>
                <span className="mb-5 text-center text-4xl font-bold">
                  $30<span className="text-sm">/mo</span>
                </span>
                <ul className="my-8 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    15 talent seats
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited courses
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Single Sign On
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom domain + SSL
                  </li>
                </ul>
              </div>

            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature bg-indigo-600 featureThreeGradient disable-mobile-animation mx-auto mb-3 w-full min-w-[300px] rounded-md px-8 py-8 text-white md:max-w-[300px] lg:relative lg:z-10 lg:-mx-3 lg:mb-0 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-10 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase `}
                >
                  Regular
                </h3>
                <span className="mb-5 text-center text-4xl font-bold lg:text-5xl">
                  $90<span className="text-sm">/mo</span>
                </span>
                <ul className="my-8 flex  flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    40 talent seats
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited courses
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Single Sign On
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom domain + SSL
                  </li>
                </ul>
              </div>

            </motion.div>
            <motion.div
              initial={{ x: 30, scale: 1 }}
              whileInView={{ x: 0, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature bg-indigo-600/80 featureThreeGradient disable-mobile-animation mx-auto mb-3 w-full min-w-[300px] rounded-md px-8 py-8 text-white md:max-w-[300px] lg:my-2 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-10 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase `}
                >
                  Pro
                </h3>
                <span className="mb-5 text-center text-4xl font-bold">
                  $200<span className="text-sm">/mo</span>
                </span>
                <ul className="my-8 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    250 talent seats
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited courses
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Single Sign On
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom domain + SSL
                  </li>
                </ul>
              </div>

            </motion.div>
          </div>


        </div>
      </div>
      <div>


        <FeaturesSection />
      </div>

      <Footer />
    </section>
  );
}
