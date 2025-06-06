import { BedDouble, ExternalLink, ShowerHead } from "lucide-react"
import Image from "next/image"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Heart } from "../atoms/svgs";
import Link from "next/link";

export default function HouseCard({ title, description, imgSrc, id, favorites }: {
  title: string;
  description: string;
  imgSrc: string;
  id: string;
  favorites: boolean
}) {

  return (
    <div className="bg-white w-full h-fit md:w-81 rounded-b">

      <div className="w-full relative">
        <div className="h-[210px] w-full">
          <PhotoProvider>
            <PhotoView key={id} src={imgSrc}>
              <Image src={`/assets${imgSrc}`} alt="house" width={300} height={200} className="w-full h-full object-cover" />
            </PhotoView>
          </PhotoProvider>
        </div>
        <div className="absolute top-3 left-3 bg-white/20 p-1 rounded">
          <Heart fill={`${favorites ? 'red' : 'white'}`} />
        </div>
      </div>
      <div className="px-3">
        <p className="text-black font-bold text-sm mt-2">{title}</p>
        <p className="text-gray-500 text-sm mt-3 mb-5">{description}</p>
        <div className="w-4/5 mx-auto h-[1px] bg-slate-200"></div>
        <div className="flex justify-between items-center mt-5 mb-3">
          <div className="flex gap-2 text-gray-500">
            <div className="flex items-center gap-1">
              <ShowerHead className="text-blue-900 w-4 h-4" />2bath
            </div>
            <div className="flex items-center gap-1">
              <BedDouble className="text-blue-900 w-4 h-4" />2bed
            </div>
          </div>
          <Link href={`/house/${id}`}>
            <ExternalLink className="text-blue-900 w-4 h-4 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  )
}
