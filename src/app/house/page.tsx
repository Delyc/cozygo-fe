// pages/index.tsx

import React from 'react';
import FloatingLabelInput from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Footer from '@/components/layout/Footer';

const House: React.FC = () => {
    return (
        <section className='flex flex-col bg-white items-center'>

            <div className='flex gap-20 max-w-[1300px]  w-full'>
                <div className='w-[20rem] flex flex-col gap-10'>

                    <div className='flex flex-col gap-5'>
                        <h1 className='text-primary_gray leading-8 text-3xl'>City center house apartment</h1>


                        <div>
                            <p>150 000 rwf</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>

                        <div className='flex items-center gap-2.5'>
                            <img src='/assets/person.jpeg' className='rounded-full w-12 h-11' />
                            <div className='flex flex-col gap-1'>
                                <p className='text-primary_gray  text-xs'>Ange Teta</p>
                                <p className='text-primary_gray  text-xs'>Student</p>
                            </div>
                        </div>
                        <Button label={'Request information'} className={'rounded-3xl text-white px-10'} />

                    </div>

                </div>

                <div className='w-4/5 flex flex-col gap-5'>
                    <img src='/assets/apartment.jpeg' className='
                    w-full h-96'  />
                    <div className='flex  gap-5'>
                    <img src='/assets/apartment.jpeg' className='w-64 h-32'/> 
                    <img src='/assets/apartment.jpeg' className='w-64 h-32'/> 
                    <img src='/assets/apartment.jpeg' className='w-64 h-32'/> 
                    <img src='/assets/apartment.jpeg' className='w-64 h-32'/> 
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </section>


    );
};

export default House;
