import PropertyCard from "@/components/UI/cards/House";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex flex-col gap-28">
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
