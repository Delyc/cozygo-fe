import Search from "@/components/organisms/Search"

const HeroSection = () => {
    return (
        <div className="text-center  px-5  h-full pt-40 w-full md:w-4/5 max-w-[80rem] flex flex-col  items-center">
            <div className="flex flex-col gap-3 mb-5 lg:w-2/3  px-5 pt-20 rounded ">
              <h1 className="text-white font-bold xl:leading-[-40px]   text-3xl  md:text-5xl  md:leading-[70px] leading-[40px] xl:text-[40px] text-center xl:px-20">Find the future house of your dreams</h1>
            </div>
            <Search />
          </div>
    )
}

export default HeroSection