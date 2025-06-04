import { BedDouble, ShowerHead } from "lucide-react"
import Image from "next/image"
import { Heart } from "../atoms/svgs";

export default function HouseCard({ title, description, imgSrc }: {
  title: string;
  description: string;
  imgSrc: string;
}) {
  return (
    <div className="bg-white w-full h-fit md:w-81 rounded-b">

      <div className="w-full relative">
        <Image src={imgSrc} alt="house" width={300} height={200} className="w-full object-cover" />
        <div className="absolute top-3 left-3 bg-white/20 p-1 rounded">
        <Heart fill={"red"}/>
        </div>
      </div>
      <div className="px-3">
        <p className="text-black font-bold text-sm mt-2">{title}</p>
        <p className="text-gray-500 text-sm mt-3 mb-5">{description}</p>
        <div className="w-4/5 mx-auto h-[1px] bg-slate-200"></div>
        <div className="flex gap-2 text-gray-500 mt-5 mb-3">
          <div className="flex items-center gap-1">
            <ShowerHead className="text-blue-800 w-4 h-4" />2bath
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="text-blue-800 w-4 h-4" />2bed
          </div>
        </div>
      </div>
    </div>
  )
}
