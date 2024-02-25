'use client'

import React, { useState } from 'react';
import FloatingLabelInput from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Footer from '@/components/layout/Footer';

const House: React.FC = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [zoomedIndex, setZoomedIndex] = useState(-1);
    const images = [
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
        '/assets/house.jpeg',
    ];
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

            <div className='flex  gap-10 justify-between mx-auto  max-w-[80rem]'>
                <div className=' w-1/2 h-[25rem]'>


                    <video controls className='w-full h-full object-cover'>
                        <source src="/assets/vid2.mp4" type="video/mp4" />

                    </video>

                </div>

                <div className='grid grid-cols-3 justify-end flex-wrap w-1/2  gap-3 '>
                    <div className='col-span-3  h-[15rem]'>
                        <img src='/assets/house.jpeg' className='w-full h-full' />
                    </div>

                    <div className="relative col-span-3">
                        <div className="overflow-hidden h-64 md:h-auto">
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
        </section>


    );
};

export default House;

