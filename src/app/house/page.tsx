'use client'

import React, { useState } from 'react';
import FloatingLabelInput from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Footer from '@/components/layout/Footer';
import next from 'next';
import { RoomIcon } from '@/components/svgs/Heart';

const House: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [videosView, setVideosView] = useState(0)
    const [zoomedIndex, setZoomedIndex] = useState(-1);
    const videos = [
        '/assets/vid2.mp4',
        '/assets/vid2.mp4',
        '/assets/vid2.mp4',
        '/assets/vid2.mp4',
        '/assets/vid2.mp4'
    ]
    const images = [
        '/assets/house.jpeg',
        '/assets/apartment.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
    ];

    const nextVid = () => {
        setVideosView((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
    };

    const prevVid = () => {
        setVideosView((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        const nextIndex = startIndex + 1;
        setStartIndex(nextIndex >= images.length - 2 ? images.length - 3 : nextIndex);
        setZoomedIndex(-1);
    };

    const prevSlide = () => {
        const prevIndex = startIndex - 1;
        setStartIndex(prevIndex < 0 ? 0 : prevIndex);
        setZoomedIndex(-1);
    };

    const toggleZoom = (index: number) => {
        setZoomedIndex(zoomedIndex === index ? -1 : index);
    };
    return (
        <section className='flex flex-col bg-white justify-center items-center'>

            <div className='flex flex-col  gap-10 justify-between mx-auto  max-w-[80rem]'>

                <div className='w-full flex justify-between gap-10'>

                <div className=' w-3/5 h-[25rem]'>

                <video controls className='w-full h-full object-cover'>
                                        <source src='/assets/vid2.mp4' type="video/mp4" />

                                    </video>
                                    <button>Click here to watch more videos</button>




                </div>

                <div className='grid grid-cols-3 justify-end flex-wrap w-2/5  gap-3 '>
                    <div className='col-span-3  h-[15rem]'>
                        <img src='/assets/house.jpeg' className='w-full h-full object-cover' />
                    </div>

                    <div className="relative  col-span-3">
                        <div className="overflow-hidden  h-[10rem]">
                            <div className="flex gap-5 transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${startIndex * (100 / 3)}%)` }}>
                                {images.map((src, index) => (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Slide ${index}`}
                                        className={`w-full h-auto md:h-full cursor-pointer ${zoomedIndex === index ? 'z-10 absolute inset-0 object-contain' : ''}`}
                                        onClick={() => toggleZoom(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className={`absolute top-1/2 left-0 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-full ${startIndex === 0 && 'opacity-50 cursor-not-allowed'}`}
                            onClick={prevSlide}
                            disabled={startIndex === 0}
                        >
                            Prev
                        </button>
                        <button
                            className={`absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1 bg-gray-800 text-white rounded-full ${startIndex === images.length - 3 && 'opacity-50 cursor-not-allowed'}`}
                            onClick={nextSlide}
                            disabled={startIndex === images.length - 3}
                        >
                            Next
                        </button>
                        {zoomedIndex !== -1 && (
                            <div
                                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-20"
                                onClick={() => toggleZoom(-1)}
                            >
                                <img
                                    src={images[zoomedIndex]}
                                    alt={`Zoomed Image`}
                                    className="max-w-full max-h-full"
                                />
                            </div>
                        )}
                    </div>
                </div>
                </div>
                <div className='w-full'>
                    <div className='w-3/5'>
<h3>Adreesss</h3>
<div className='flex gap-5'>
    <button className='border border-indigo-600 px-6 py-2 rounded-2xl text-xs text-primary_gray font-medium'>Take a virtual tour around neighborhood</button>
    <button className='border border-indigo-600 px-6 py-2 rounded-2xl text-xs text-primary_gray font-medium'>view Location</button>
</div>

<div>
    <p className='text-xs text-primary_gray'> 1123 Fictional St, San Francisco, CA 94103</p>
    <p className='text-lg text-black font-bold'> 1123 Fictional St, San Francisco, CA 94103</p>
</div>
<div className="px-5 flex items-center gap-2 py-2">
        <div className='flex items-center  gap-1'>
          <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className=' text-primary_gray text-xs'>2 rooms</p>
        </div>

        <div className='flex items-center  gap-1'>
          <RoomIcon fill={'#757B8D'} height={'20px'} width={'20px'} stroke={'#757B8D'} stroke_width={0} />
          <p className=' text-primary_gray text-xs'>rooms</p>
        </div>

       
      </div>

      <div className='flex flex-col gap-5'>
      <h3 className='font-bold text-xl'>About the property</h3>

<p className='text-xs text-primary_gray leading-5'>  1123 Fictional St, San Francisco, 1123 Fictional St, San Francisco, 1123 Fictional St, San Francisco, 1123 Fictional St, San Francisco, 1123 Fictional St, San Francisco, 1123 Fictional St, San Francisco, CA 94103123 Fictional St, San Francisco, CA 94103123 Fictional St, San Francisco, CA 94103123 Fictional St, San Francisco, CA 94103 123 Fictional St, San Francisco, CA 94103 123 Fictional St, San Francisco, CA 94103</p>

      </div>

      <div>
        <h3>Amenities Available</h3>
        <div>
            <p className='text-xs text-primary_gray leading-5'> Security Camera</p>
            <p className='text-xs text-primary_gray leading-5'> Security Camera</p>
            <p className='text-xs text-primary_gray leading-5'> Security Camera</p>
            <p className='text-xs text-primary_gray leading-5'> Security Camera</p>
            <p className='text-xs text-primary_gray leading-5'> Security Camera</p>
        </div>
      </div>

      
                    </div>

                    <div>
                        
                    </div>
                    
                </div>


            </div>
        </section>


    );
};

export default House;

