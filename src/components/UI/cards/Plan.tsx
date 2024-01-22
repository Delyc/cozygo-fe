import { ArrowIcon, Cross, HeartIcon, LocationIcon, RoomIcon, Tick } from '../../svgs/Heart';
import Button from '../Button';

type PlanCardProps = {
    price: number;
    title: string;
    description: string;
};

const PlanCard: React.FC<PlanCardProps> = ({
    price,
    title,
    description
}) => {
    return (
        <div className={`${title === "professional" ? "bg-indigo-600" : ""} py-10 px-5 rounded-2xl shadow-2xl flex flex-col gap-5 `}>
            <div className='flex flex-col gap-2.5'>
                <p className={`${title === "professional" ? "text-white" : "text-[#191D23]"}  font-semibold text-sm leading-6 capitalize`}>{title}</p>
                <p className={`${title === "professional" ? "text-white" : "text-[#64748B]"}  text-xs `}>{description}</p>

            </div>

            <div className='flex items-center gap-1'>
                <p className={`${title === "professional" ? "text-white" : "text-[#64748B]"}  text-3xl font-semibold leading-5`}>${price}</p>
                <p className={`${title === "professional" ? "text-white" : "text-[#64748B]"}  text-xs`}>
                    /Month
                </p>
            </div>

            <Button label={'Get Started Now'} className={`${title==="professional"?"":" border border-indigo-600 bg-white"  } bg-white text-indigo-600`} />

            <div className={`${title === "professional" ? "text-white" : "text-[#191D23]"} flex flex-col gap-2.5 text-white`}>
                <div className='flex items-center gap-2.5'>
                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white" : "bg-indigo-600/20"}  w-5 h-5 grid place-content-center rounded-full`}>

                        <Tick fill={''} height={'14px'} width={'14px'} stroke={''} stroke_width={0} />
                    </div>
                    <p className=' text-xs'>Access to all listed properties</p>
                </div>
                <div className='flex items-center gap-2.5'>
                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white" : "bg-indigo-600/20"}  w-5 h-5 grid place-content-center rounded-full`}>

                        <Tick fill={''} height={'14px'} width={'14px'} stroke={''} stroke_width={0} />
                    </div>
                    <p className=' text-xs'>Schedule Property Visits</p>
                </div>

                <div className='flex items-center gap-2.5'>
                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white" : "bg-indigo-600/20"}  w-5 h-5 grid place-content-center rounded-full`}>

                        <Tick fill={''} height={'14px'} width={'14px'} stroke={''} stroke_width={0} />
                    </div>
                    <p className=' text-xs'>Create a Wishlist of Favorite Properties
                    </p>
                </div>






                <div className='flex items-center gap-2.5'>

                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white" : "bg-indigo-600/20"}  w-5 h-5 grid place-content-center rounded-full`}>

                        {title === "free" ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} /> : <Tick fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />}

                    </div>
                    <p className={`${title === "free" ? "text-[#A0ABBB]" : title === "professional" ? "text-white text-white" : "text-[#191D23]"} text-xs `}

                    >

                        Share Your Wishlist


                    </p>
                </div>


                <div className='flex items-center gap-2.5'>

                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white" : "bg-indigo-600/20"}  w-8 h-5 grid place-content-center rounded-full`}>

                        {title === "free" ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} /> : <Tick fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />}

                    </div>
                    <p className={`${title === "free" ? "text-[#A0ABBB]" : title === "professional" ? "text-white text-white" : "text-[#191D23]"} text-xs `}

                    >

                        Receive Personalized Property Recommendations with Machine Learning



                    </p>
                </div>


                <div className='flex items-center gap-2.5'>

                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white" : "bg-indigo-600/20"}  w-8 h-5 grid place-content-center rounded-full`}>

                        {title === "free" ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} /> : <Tick fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />}

                    </div>
                    <p className={`${title === "free" ? "text-[#A0ABBB]" : title === "professional" ? "text-white text-white" : "text-[#191D23]"} text-xs `}

                    >

                        AI-Enhanced Filtering and Prediction for Neighborhood Affordability

                    </p>
                </div>


                <div className='flex items-center gap-2.5'>

                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white/40" : "bg-indigo-600/20"}  w-5 h-5 grid place-content-center rounded-full`}>

                        {
                            title === "professional"
                                ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />
                                : title === "free"
                                    ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />
                                    : <Tick fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />
                        }


                    </div>
                    <p className={`${title === "free" ? "text-[#A0ABBB]" : title === "professional" ? "text-white/40" : "text-[#191D23]"} text-xs `}

                    >

                        Multilingual Chat Support


                    </p>
                </div>

                <div className='flex items-center gap-2.5'>

                    <div className={`${title === "free" ? "bg-gray-300/50" : title === "professional" ? "bg-white/30" : "bg-indigo-600/20"}  w-5 h-5 grid place-content-center rounded-full`}>

                        {
                            title === "professional"
                                ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />
                                : title === "free"
                                    ? <Cross fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />
                                    : <Tick fill={''} height={'10px'} width={'10px'} stroke={''} stroke_width={0} />
                        }


                    </div>
                    <p className={`${title === "free" ? "text-[#A0ABBB]" : title === "professional" ? "text-white/40" : "text-[#191D23]"} text-xs `}

                    >

                        Explore Neighborhoods with 360° Views



                    </p>
                </div>



            </div>
        </div>
    );
};

export default PlanCard;
