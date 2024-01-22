import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileApp: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); 
      }, 3000);

      return () => clearTimeout(timer); 
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg absolute -right-10 top-32 animate-bounce w-[15rem] shadow-2xl">
      {children}
    </div>
  );
};

export default MobileApp;
