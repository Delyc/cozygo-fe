import Navbar from "@/components/organisms/Navbar";
import Image from "next/image";
import Footer from "@/components/organisms/Footer";
import { Bed, CircleDollarSign, HouseIcon, Scaling, ShowerHead } from "lucide-react";
import { Chat } from "@/components/atoms/svgs";

export default function House() {
    return (
        <section className="flex flex-col items-center bg-gray-100 ">
            <Navbar />
            <div className="pt-24 pb-10 w-full max-w-[80rem] mx-auto  flex flex-col gap-10">
                <div className="pt-10 flex gap-5 w-full">

                    <div className="w-3/5 flex  flex-col gap-5">
                        <p className="text-black font-bold">Modern 3-Bedroom House in Kigali</p>
                        {/* <PhotoProvider>
                        <PhotoView key={1} src={'/assets/house/inside1.jpg'}> */}

                        <Image
                            src={'/assets/house/inside1.jpg'}
                            alt={`attachment`}
                            width={400}
                            height={300}
                            className="w-full h-[390px]"

                        />

                        <div className="flex gap-5">
                            <div className="flex gap-1 items-center text-black/40"> <CircleDollarSign /> 120, 000 RWF</div>
                            <div className="flex gap-1 items-center text-black/40"> <Bed /> 2beds</div>
                            <div className="flex gap-1 items-center text-black/40"> <ShowerHead /> 2baths</div>
                            <div className="flex gap-1 items-center text-black/40"> <Scaling /> 120 sqm</div>
                        </div>


                        {/* </PhotoView>
                    </PhotoProvider> */}

                    </div>

                    <div className="grid grid-cols-2 gap-5 h-fit mt-10">
                        <Image
                            src={'/assets/house/inside2.jpg'}
                            alt={`attachment`}
                            width={200}
                            height={100}
                            className="w-full bg-red-500"
                        />
                        <Image
                            src={'/assets/house/inside3.jpg'}
                            alt={`attachment`}
                            width={200}
                            height={100}
                            className="w-full"
                        />
                        <Image
                            src={'/assets/house/outside1.jpg'}
                            alt={`attachment`}
                            width={200}
                            height={100}
                            className="w-full"
                        />
                        <Image
                            src={'/assets/house/inside1.jpg'}
                            alt={`attachment`}
                            width={200}
                            height={100}
                            className="w-full"
                        />
                    </div>
                </div>


                <div className="flex flex-col gap-5">
                    <p className="text-gray-500 w-1/2">A spacious, modern home located in the heart of Kigali, perfect for families.A spacious, modern home located in the heart of Kigali, perfect for families. A spacious, modern home located in the heart of Kigali, perfect for families.A spacious, modern home located in the heart of Kigali, perfect for families.

                    </p>

                    <div>
                        <ul className="list-none  text-gray-500 mb-4">
                            <li className="check-item text-sm">Parking</li>
                            <li className="check-item text-sm">Dish washer</li>
                            <li className="check-item text-sm">Dish washer</li>
                            <li className="check-item text-sm">Dish washer</li>
                            <li className="check-item text-sm">Dish washer</li>
                        </ul>
                    </div>
                </div>


                <p className="text-2xl text-blue-900 font-bold">Owner details</p>
                <div className="flex gap-5">

                    <Image
                        src={'/assets/house/inside1.jpg'}
                        alt={`attachment`}
                        width={300}
                        height={200}
                        className=" w-48 h-48 rounded-full object-cover"

                    />

                    <div className="flex flex-col items-center mt-3">
                        <p className="text-black">Better</p>
                        <p className="text-gray-500 text-xs">Member since 2025</p>
                        <div className="mt-2">
                            <div className="flex gap-1 items-center text-gray-500">
                                <Chat fill="#1e3a8a" />

                                Chat with agent

                            </div>
                            <div className="flex gap-1 items-center text-gray-500">
                                <HouseIcon className="text-[#1e3a8a]" />
                                50 houses in total

                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <Footer />

        </section>
    );
}
