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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto h-full flex items-center  w-full" id="modal">
            <div className="relative top-0  mx-auto px-6 py-3 border  shadow-lg bg-slate-100 w-[42rem]">
            <div className="flex justify-end">
                        <button 
                            className=""
                            onClick={onClose}
                        >
                            <Cross fill={''} height={'30px'} width={'30px'} stroke={''} stroke_width={0} />
                        </button>
                    </div>
                <div className="mt-3 text-center">
                    {children}
                    
                </div>
            </div>
        </div>
    );
};

export default AddHouse;
