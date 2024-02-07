import React, { useState } from 'react';
import FloatingLabelInput from '../UI/Input';
import { z } from 'zod';

const HouseForm = ({ price, address }: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const emailSchema = z.string().email({ message: "Invalid email address" });
    const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });
    const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

    // Inputs grouped by slides
    const slides = [
        [
            <div className=''>
                <p className='text-start text-xs'>Property Basic Information</p>
                <div className='flex flex-col gap-2.5'>
                <FloatingLabelInput key="location" id="location" label="House location" schema={emailSchema} type="email" />
            <FloatingLabelInput key="phone" id="phone" label="Phone number" schema={numberSchema} type="text" value={price} />
            <FloatingLabelInput key="address1" id="address1" label="House address" value={address} />,
            <FloatingLabelInput key="password" id="password" label="Password" schema={passwordSchema} type="password" />
                </div>

            </div>

        ],
        [
            // Assuming other inputs for the second slide, using placeholders here
            <FloatingLabelInput key="input5" id="input5" label="Input 5" />,
            <FloatingLabelInput key="input6" id="input6" label="Input 6" />,
            <FloatingLabelInput key="input7" id="input7" label="Input 7" />,
            <FloatingLabelInput key="input8" id="input8" label="Input 8" />
        ],

        [
            // Assuming other inputs for the second slide, using placeholders here
            <FloatingLabelInput key="input5" id="input5" label="Input 5" />,
            <FloatingLabelInput key="input6" id="input6" label="Input 6" />,
            <FloatingLabelInput key="input7" id="input7" label="Input 7" />,
            <FloatingLabelInput key="input8" id="input8" label="Input 8" />
        ],
        // Add more slides as needed
    ];

    // Handlers to navigate between slides
    const goToNextSlide = () => setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1));
    const goToPreviousSlide = () => setCurrentSlide(Math.max(currentSlide - 1, 0));

    return (
        <form className='flex flex-col gap-3'>
            {slides[currentSlide]}
            <div className="flex justify-between">
                {currentSlide > 0 && (
                    <button type="button" onClick={goToPreviousSlide}>Previous</button>
                )}
                {currentSlide < slides.length - 1 && (
                    <button type="button" onClick={goToNextSlide}>Next</button>
                )}
            </div>
        </form>
    );
};

export default HouseForm;
