'use client'
import Search from "@/components/organisms/Search"

const HeroSection = () => {


  return (
    <div className="w-full bg-black/20 h-full flex justify-center">
      <div className="text-center px-5 h-full pt-40 w-full md:w-4/5 max-w-[80rem] flex flex-col items-center">
        <div className="flex flex-col h-40 gap-3 mb-5 lg:w-2/3 px-5 pt-20 rounded bg-white/20">
        </div>
        <Search isHomePage={true} />
      </div>
    </div>
  )
}

export default HeroSection
