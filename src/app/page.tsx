import PropertyCard from "@/components/UI/cards/House";
import PlanCard from "@/components/UI/cards/Plan";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col gap-28 items-center">
      <div className="grid grid-cols-3 gap-10 max-w-[1300px] px-40">
      <PlanCard price={0} title={"free"} description={"Ideal for individuals who need quick access to basic features"} />
      <PlanCard price={0} title={"professional"} description={"Ideal for individuals who need quick access to basic features"} />
      <PlanCard price={0} title={"entprise"} description={"Ideal for individuals who need quick access to basic features"} />
      </div>
    <div className="container mx-auto grid grid-cols-3 gap-5 px-20 py-20 ">
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
