import React, { useState } from 'react';
import FloatingLabelInput from '../UI/Input';
import { z } from 'zod';
import ImageUpload from '../UI/ImagesUpload';
import LocationForm from './LocationForm';
import PropertyFeatures from '../PropertyFeatures';
import Button from '../UI/Button';

const HouseForm = ({ price, address }: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [country, setCountry] = useState('');
    const [googleLocation, setGoogleLocation] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [showInput, setShowInput] = useState(false);

    const districts = [
        { value: '', label: '' },
        { value: 'gs', label: 'Gasabo' },
        { value: 'ny', label: 'Nyarugenge' },
        { value: 'kc', label: 'Kicukiro' },
    ];
    const googleMapLocation = [
        { value: '', label: '' },
        { value: 'gs', label: 'street number' },
        { value: 'll', label: 'Use Live Location' },
        { value: 'kc', label: 'Paste link of house location' },
    ];
    const houseTypes = [
        { value: '', label: '' },
        { value: 'studio', label: 'Studio Apartments' },
        { value: '1bed', label: '1-Bedroom Apartments' },
        { value: '2bed', label: '2-Bedroom Apartments' },
        { value: 'townhouse', label: 'Townhouses' },
        { value: 'detached', label: 'Detached Houses' },
        { value: 'semiDetached', label: 'Semi-Detached Houses' },
        { value: 'bungalow', label: 'Bungalows' },
        { value: 'penthouse', label: 'Penthouse Suites' },
        { value: 'villa', label: 'Villas' },
        { value: 'serviceApt', label: 'Service Apartments' },
    ];


    const emailSchema = z.string().email({ message: "Invalid email address" });
    const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });
    const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

    // Inputs grouped by slides
    const slides = [
        [
            <div className='flex flex-col gap-10'>
                <div className='bg-white flex flex-col gap-2.5 p-5 rounded shadow'>
                    <p className='text-start text-sm font-medium'>Property Basic Information</p>
                    <div className='flex flex-col gap-2.5'>
                        <FloatingLabelInput key="title" id="title" label="Property Title" schema={emailSchema} type="email" />

                        <div className='flex justify-between'>


                            <FloatingLabelInput
                                className='w-[18rem]'

                                id="country"
                                label="Select house type"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={houseTypes}
                            />
                            <FloatingLabelInput className=' w-[18rem] flex flex-col gap-2.5' key="phone" id="phone" label="House number" schema={numberSchema} type="text" value={price} />


                        </div>

                        <div className='flex  justify-between gap-5'>
                            <FloatingLabelInput className=' w-[11rem] flex flex-col gap-2.5' key="phone" id="phone" label="Price" schema={numberSchema} type="text" value={price} />
                            <FloatingLabelInput className=' w-[11rem] flex flex-col gap-2.5' key="address1" id="address1" label="Bed Rooms" value={address} />
                            <FloatingLabelInput className=' w-[11rem] flex flex-col gap-2.5' key="password" id="password" label="Bath Rooms" schema={passwordSchema} type="password" />
                        </div>
                        <div>
                            <p className='text-start'>Upload cover image</p>
                            <ImageUpload />

                        </div>
                    </div>
                </div>

                <div className='bg-white p-5 rounded shadow-xl'>
                    <p className='text-start text-xs'>Property Location</p>
                    <div className='flex flex-col gap-2.5'>

                        <div className='flex justify-between'>

                            <FloatingLabelInput
                                className='w-[18rem]'
                                id="country"
                                label="Select district"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />
                            <FloatingLabelInput
                                className='w-[18rem]'

                                id="country"
                                label="Select sector"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />

                        </div>
                        <div className='flex justify-between'>

                            <FloatingLabelInput
                                className='w-[18rem]'
                                id="country"
                                label="Select cell"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />
                            <FloatingLabelInput
                                className='w-[18rem]'

                                id="country"
                                label="Select village"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />

                        </div>

                        <LocationForm />
                    </div>
                </div>
            </div>

        ],
        [
            <div className='flex flex-col gap-5'>
                <div className='bg-white flex flex-col gap-2.5 p-5 rounded shadow'>
                    <p className='text-start text-sm font-medium'>Property Gallery</p>
                    <div className='flex flex-col gap-2.5'>
                        <div>
                            <p className='text-start'>Upload  images/videos</p>
                            <ImageUpload />

                        </div>

                    </div>
                </div>

                <div className='bg-white flex flex-col gap-2.5 p-5 rounded shadow'>
                    <p className='text-start text-sm font-medium'>Property Basic Information</p>
                    <div className='flex flex-col gap-2.5'>
                        <FloatingLabelInput key="title" id="title" label="Property Title" schema={emailSchema} type="email" />

                        <div className='flex justify-between'>


                            <FloatingLabelInput
                                className='w-[18rem]'

                                id="country"
                                label="Select house type"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={houseTypes}
                            />
                            <FloatingLabelInput className=' w-[18rem] flex flex-col gap-2.5' key="phone" id="phone" label="House number" schema={numberSchema} type="text" value={price} />


                        </div>

                        <div className='flex  justify-between gap-5'>
                            <FloatingLabelInput className=' w-[11rem] flex flex-col gap-2.5' key="phone" id="phone" label="Price" schema={numberSchema} type="text" value={price} />
                            <FloatingLabelInput className=' w-[11rem] flex flex-col gap-2.5' key="address1" id="address1" label="Bed Rooms" value={address} />
                            <FloatingLabelInput className=' w-[11rem] flex flex-col gap-2.5' key="password" id="password" label="Bath Rooms" schema={passwordSchema} type="password" />
                        </div>

                    </div>

                    <div>
                        <p>Other features (optional)</p>
                        <PropertyFeatures />
                    </div>
                </div>

            </div>

        ],


    ];

    // Handlers to navigate between slides
    const goToNextSlide = () => setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1));
    const goToPreviousSlide = () => setCurrentSlide(Math.max(currentSlide - 1, 0));

    return (
        <form className='flex flex-col gap-3'>
           <div className='flex flex-col gap-3'>
            {/* Slide content goes here */}
            {slides[currentSlide]}

            <div className="flex justify-between items-center">
                {currentSlide > 0 && (
                    <button type="button" onClick={goToPreviousSlide}>Previous</button>
                )}

                {/* Slide Indicator */}
                <span className="text-sm">
                    {currentSlide + 1}/{slides.length}
                </span>

                {currentSlide < slides.length - 1 && (
                    <button type="button" onClick={goToNextSlide}>Next</button>
                )}
            </div>
            {currentSlide === slides.length - 1 && (
                <Button label={'Submit'} className={''} />
            )}
        </div>

        </form>
    );
};

export default HouseForm;
