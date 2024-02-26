'use client'
import React, { useEffect, useState } from 'react';
import { Approved, ArrowIcon, Declined, Expand, Home, House, Message, Open, Request } from '../svgs/Heart';
import HomeDash from '../dashboard/Home';
import MessageList from '../dashboard/Message';
// import ChatLayout from '../dashboard/ChatLayout';
import RequestTable from '../UI/table/RequestTable';
import AgentHouse from '../dashboard/AgentHouse';
import UserWishlist from '../dashboard/UserWishlist';
import HouseForm from '../forms/HouseForm';

type SidebarProps = {
    setSelectedContent: (content: React.ReactNode) => void;
    setIsSidebarExpanded: (content: React.ReactNode) => void;
    isSidebarExpanded: any

};

const Sidebar: React.FC<SidebarProps> = ({ setSelectedContent, setIsSidebarExpanded, isSidebarExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSidebarExpanded(false);
            } else {
                setIsSidebarExpanded(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };
    const handleExpandableItemClick = () => {
        setIsExpanded(!isExpanded);
        setSelectedContent(<RequestTable />);
    };

    const handleExpandableHouse = () => {
        setIsExpanded(!isExpanded)
        setSelectedContent(<AgentHouse />)
    }

    const userType = 'agent'
    return (
        <aside className={`${isSidebarExpanded ? 'w-64' : 'w-16'} fixed lg:relative h-screen transition-width duration-300 ease-in-out z-30 bg-indigo-600`} aria-label="Sidebar">
            <div className="overflow-y-auto pt-10  rounded  h-full">
                <div className=' flex flex-col justify-between h-full'>
                    <div>
                        <div className="p-5">
                            <button onClick={toggleSidebar} className="text-white xl:hidden">
                                {isSidebarExpanded ? (
                                    <ArrowIcon fill="white" height="20px" width="20px" stroke={''} stroke_width={0} />
                                ) : (
                                    <Expand fill="white" height="20px" width="20px" stroke={''} stroke_width={0} />
                                )}
                            </button>
                        </div>
                        <div className={`border-white/20 pb-6 border-b-2 ${isSidebarExpanded ? 'px-5' : 'px-2'}`}>
                            <h1 className={`text-white text-2xl leading-8 ${isSidebarExpanded ? '' : 'hidden'}`}>CozyGo</h1>
                        </div>
                        <div className={` mt-5 ${isSidebarExpanded ? 'px-5' : 'px-2'}`}>
                            <button onClick={() => setSelectedContent('')} className={` ${isSidebarExpanded ? 'flex flex-row  text-start' : 'flex flex-col text-xs text-center items-center px-2.5'} gap-2 p-2 w-full text-white/80  rounded hover:bg-black/20`}>
                                <Home fill={'white'} height={'20px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>Dashboard overview</p>
                            </button>
                            <button onClick={() => setSelectedContent(userType === 'agent' ? < AgentHouse /> : <UserWishlist />)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
                                <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}> {userType === "agent" ? ' My houses' : 'My Wishlist'}</p>

                            </button>
                            <div className="mt-2">
                                <button onClick={handleExpandableHouse} className="block p-2 flex justify-between items-center rounded text-white/80 w-full text-start hover:bg-black/20">
                                    <div className='flex gap-2 items-center'>
                                        <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                        <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>Houses</p>
                                    </div>

                                    <Open fill={'none'} height={'20px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                </button>
                                {isExpanded && (
                                    <div className="mt-1">
                                        <button onClick={() => setSelectedContent(<div className='w-[98%] lg:w-1/2'><HouseForm /></div>)} className="flex items-center gap-2 p-2 w-full rounded hover:bg-black/20 text-start text-sm text-white/80 ml-4">
                                            <Declined fill={'white'} height={'15px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                            <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>
                                                Add house
                                            </p>
                                        </button>
                                        
                                        <button onClick={() => setSelectedContent(<AgentHouse />)} className="flex items-center gap-2 p-2 w-full rounded hover:bg-black/20 text-start text-sm text-white/80 ml-4">
                                            <House fill={'white'} height={'15px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                            <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>
                                                View all houses
                                            </p>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* <button onClick={() => setSelectedContent(<ChatLayout />)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
                                <Message fill={'white'} height={'20px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>Chat</p>
                            </button> */}
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='px-5 '>
                            <p className={`text-white ${isSidebarExpanded ? '' : 'hidden'}`}>Account</p>
                            <div className='ml-5'>
                                <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start text-sm rounded hover:bg-black/20">
                                    <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                    <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>Notifications</p>
                                </button>
                                <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start text-sm rounded hover:bg-black/20">
                                    <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                    <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>Profile settings</p>
                                </button>
                            </div>
                        </div>

                        <div className={` items-center gap-2.5 bg-black/20  rounded-md shadow-2xl py-5 ${isSidebarExpanded ? 'flex-row px-5 ' : 'flex-col px-2'}`}>
                            <img src='/assets/person.jpeg' className='rounded-full w-12 h-12' />
                            <div className='flex flex-col gap-1'>
                                <p className='text-primary_gray  text-xs'>Ange Teta</p>
                                <p className='text-primary_gray  text-xs'>Student</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
