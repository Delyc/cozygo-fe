import React from 'react';
import FloatingLabelInput from '../UI/Input';
import { z, ZodType } from 'zod';

const HouseForm = ({ price, address }: any) => {

    const emailSchema = z.string().email({ message: "Invalid email address" });

    // Schema for a numeric input
    const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });

    // Schema for a password input
    const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

    return (
        <form className='flex flex-col gap-3'>
            <FloatingLabelInput id={''} label={'House location'} schema={emailSchema}
                type='email' />
            <FloatingLabelInput id={''} label={'phone number'} schema={numberSchema}
                type='text' />
            <FloatingLabelInput id={''} label={'House location'} value={price} />
            <FloatingLabelInput id={''} label={'House location'} value={address}/>
            <FloatingLabelInput id={''} label={'House location'} />
            <FloatingLabelInput id={''} label={'House location'} />
            <FloatingLabelInput id={''} label={'House location'} />
            <FloatingLabelInput id={''} label={'House location'} />
            <FloatingLabelInput id={''} label={'House location'} />
            <FloatingLabelInput id={''} label={'House location'} />
        </form>
    );
};

export default HouseForm;
