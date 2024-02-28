import PropertyCard from "@/components/UI/cards/House";
import PlanCard from "@/components/UI/cards/Plan";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import NavBar from "@/components/layout/Navbar";
import SearchForm from "./hero/page";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-28">
<section className="hero w-full bg-cover flex flex-col items-center justify-center">
<div className="relative bg-hero-pattern w-full max-w-[80rem]  bg-center h-screen flex flex-col justify-between">
      <NavBar />
      <div className="text-center pb-40 flex flex-col items-center">
        <h1 className="text-4xl text-white font-bold mb-6">Find The House of Your Dream Using Our Platform</h1>
        <SearchForm />
      </div>
    </div>
    </section>
      <div className="grid grid-cols-3 gap-10 max-w-[1300px] px-40">
      <PlanCard price={0} title={"free"} description={"Ideal for individuals who need quick access to basic features"} />
      <PlanCard price={0} title={"professional"} description={"Ideal for individuals who need quick access to basic features"} />
      <PlanCard price={0} title={"entprise"} description={"Ideal for individuals who need quick access to basic features"} />
      </div>
    <div className="container px-20 py-20 mx-auto grid grid-cols-3 gap-5 ">
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
  </div>
 <Footer />
  </section>
  );
}
