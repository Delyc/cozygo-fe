import HouseCard from "@/components/organisms/House"
import Navbar from "@/components/organisms/Navbar"
import Search from "@/components/organisms/Search"


const houses = () => {
    return (
        <section className="">
            <Navbar />
            <div className="pt-24 flex h-screen ">
                <div className="overflow-y-auto">
                    <Search houses={true} />
                </div>
                <div className="grid bg-slate-100 md:grid-cols-2 lg:grid-cols-3 px-5 md:px-10 gap-8 py-10 flex-1 overflow-y-auto">

                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />
                    <HouseCard title={"hello new house posted"} description={"hello new house postedhello new house postedhello new house postedhello new house postedhello "} imgSrc={"/assets/hs.png"} />

                </div>
            </div>
        </section>
    )
}

export default houses