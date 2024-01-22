import PropertyCard from "@/components/cards/House";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto">
    <PropertyCard
      bedrooms={3}
      baths={3}
      area={340}
      price={25000.00}
      address="Meadowview Lane, Tranquil Springs"
    />
  </div>

  );
}
