import Navbar from "@/components/organisms/Navbar";
import HeroSection from "@/screens/home/HeroSection";
import PropertiesStats from "@/screens/home/PropertiesStats";
import LatestProperties from '@/screens/home/LatestProperties'
import Footer from "@/components/organisms/Footer";
import PricingPlans from "@/screens/home/PricingPlans";
import Testimonials from "@/screens/home/Testimonials";

export default function Home() {
  return (
    <section className="flex flex-col items-center ">
      <section className="hero w-full bg-cover flex flex-col items-center justify-center">
        <div className="relative bg-hero-pattern w-full    bg-center h-screen md:h-[800px] lg:h-screen flex flex-col items-center justify-between">
          <Navbar />
          <HeroSection />
        </div>
      </section>
      <PropertiesStats />
      <LatestProperties />
      <PricingPlans />
      <Testimonials />
      <Footer />
    </section>
  );
}
