import React from 'react';
import { Cross } from '../svgs/Heart';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AddHouse: React.FC<ModalProps> = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-y-auto h-full flex items-center justify-center  w-full" id="modal">
            <div className="   px-6 py-3  bg-slate-50  overflow-y-scroll flex flex-col items-center justify-center  w-[50rem]">
                {/* <div className='bg-white w-1/2'> */}
            <div className="flex  justify-end bg-pink-500  mt-[70rem]">
                        <button 
                            className=""
                            onClick={onClose}
                        >
                            <Cross fill={''} height={'30px'} width={'30px'} stroke={''} stroke_width={0} />
                        </button>
                    </div>
                <div className=" text-center flex  justify-end w-full">
                    {children}
                    
                </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default AddHouse;
