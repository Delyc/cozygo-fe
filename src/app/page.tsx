import PropertyCard from "@/components/UI/cards/House";
import PlanCard from "@/components/UI/cards/Plan";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import NavBar from "@/components/layout/Navbar";
import SearchForm from "./hero/page";
import AnimatedText from "@/components/animations/AnimatedText";
import FeaturesSection from "@/components/sections/home/Platform";
export default function Home() {


  return (
    <section className="flex flex-col items-center ">
<section className="hero w-full bg-cover flex flex-col items-center justify-center">
<div className="relative bg-hero-pattern w-full    bg-center h-[800px] flex flex-col items-center justify-between">
      <NavBar />
      <div className="text-center absolute bottom-64 w-full max-w-[80rem] flex flex-col  items-center">
      <AnimatedText text="Find The House of Your Dream Using Our Platform" />

        <SearchForm />
      </div>
      </div>

   
    </section>

    <div className="w-full bg-[#F5F7FB] py-20 flex justify-center">

<div className="flex flex-col gap-10 w-full max-w-[80rem]">
  <div className="flex flex-col gap-5 px-20" >
    <p className="uppercase text-sm text-indigo-600 font-regular">BROWSE HOT OFFER</p>
    <p className="font-semibold text-2xl text-[#878C9F] ">Latest Properties</p>
  </div>

    <div className="w-full bg--red-500 px-20 mx-auto grid grid-cols-3 gap-5 ">
    <PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />

<PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />

<PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />
    {/* <PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />
    <PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />
    <PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    /> */}
  </div>
  </div>
    </div>
  <div className="flex flex-col py-20 gap-10 w-full max-w-[80rem]">

  <div className="flex flex-col gap-5 px-20" >
    <p className="uppercase text-sm text-indigo-600 font-regular">pricing plan</p>
    <p className="font-semibold text-2xl text-[#878C9F] ">Choose a plan that’s right for you</p>
  </div>
      <div className="grid grid-cols-3 gap-10 px-20 ">
      <PlanCard price={0} title={"free"} description={"Ideal for individuals who need quick access to basic features"} />
      <PlanCard price={0} title={"professional"} description={"Ideal for individuals who need quick access to basic features"} />
      <PlanCard price={0} title={"entprise"} description={"Ideal for individuals who need quick access to basic features"} />
      </div>
      </div>

      <div>


        <FeaturesSection />
      </div>

 <Footer />
  </section>
  );
}
