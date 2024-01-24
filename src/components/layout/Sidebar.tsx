'use client'
import React, { useState } from 'react';
import { Approved, ArrowIcon, Declined, Expand, Home, House, Message, Open, Request } from '../svgs/Heart';
import HomeDash from '../dashboard/Home';

type SidebarProps = {
    setSelectedContent: (content: React.ReactNode) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setSelectedContent }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Function to handle clicking on the expandable item
    const handleExpandableItemClick = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            // When not already expanded, clicking will expand and set content for the expandable item
            setSelectedContent(<h1>Expandable Item Content</h1>);
        }
    };

    return (
        <aside className="w-64 " aria-label="Sidebar">
            <div className="overflow-y-auto pt-10 bg-gray-50 rounded dark:bg-indigo-600 h-full">




                <div className=' flex flex-col justify-between h-full'>

                    <div>
                        <div className='px-5 border-white/20 pb-6 border-b-2'>
                            <h1 className='text-white text-2xl leading-8'>CozyGo</h1>
                        </div>
                        <div className='px-5 mt-5'>
                            <button onClick={() => setSelectedContent(<HomeDash />)} className=" flex items-center gap-2 p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
                                <Home fill={'white'} height={'20px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                <p className='mt-1'>Home</p>
                            </button>
                            <button onClick={() => setSelectedContent(<h1>Dashboard Content one</h1>)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
                                <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                <p className='mt-1'>My Houses</p>

                            </button>
                            <div className="mt-2">
                                <button onClick={handleExpandableItemClick} className="block p-2 flex justify-between items-center rounded text-white/80 w-full text-start hover:bg-black/20">
                                    <div className='flex gap-2 items-center'>
                                        <Request fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                        Request

                                    </div>

                                    <Open fill={'none'} height={'20px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                </button>
                                {isExpanded && (
                                    <div className="mt-1">
                                        <button onClick={() => setSelectedContent(<h1>Subitem 1 Content</h1>)} className="flex items-center gap-2 p-2 w-full rounded hover:bg-black/20 text-start text-sm text-white/80 ml-4">
                                            <Approved fill={'white'} height={'15px'} width={'20px'} stroke={'white'} stroke_width={0} />

                                            Accepted
                                        </button>

                                        <button onClick={() => setSelectedContent(<h1>Subitem 1 Content</h1>)} className="flex items-center gap-2 p-2 w-full rounded hover:bg-black/20 text-start text-sm text-white/80 ml-4">
                                            <Declined fill={'white'} height={'15px'} width={'20px'} stroke={'white'} stroke_width={0} />

                                            Rejected
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
                                <Message fill={'white'} height={'20px'} width={'20px'} stroke={'white'} stroke_width={0} />
                                <p className='mt-1'>Chat</p>

                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>


                        <div className='px-5 '>
                            <p className='text-white'>Account</p>
                            <div className='ml-5'>
                                <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start text-sm rounded hover:bg-black/20">
                                    <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                    <p className='mt-1'>Notifications</p>

                                </button>
                                <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="flex items-center gap-2 p-2 w-full text-white/80 text-start text-sm rounded hover:bg-black/20">
                                    <House fill={'white'} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
                                    <p className='mt-1'>Profile settings</p>

                                </button>
                            </div>
                        </div>

                        <div className='flex items-center gap-2.5 bg-black/20 px-5 py-5 rounded-md shadow-2xl'>
                            <img src='/assets/person.jpeg' className='rounded-full w-12 h-11' />
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
