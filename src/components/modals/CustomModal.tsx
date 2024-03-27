const CustomModal = ({ isOpen, onClose, children }: any) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 lg:w-1/3 shadow-lg rounded-md bg-white">
          <div className="flex justify-end items-center">
            <button onClick={onClose} className="text-black close-modal">
              <span className="text-2xl">&times;</span>
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };
  

  export default CustomModal;