import React, { useState } from 'react';
import axios from 'axios';

const CoverImage = ({ onFileSelect }: any) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e:any) => {
    if (file) {
      e.preventDefault();
      setShowModal(true); 
      return;
    }
    updateFile(e.target.files[0]);
  };

  const updateFile = (newFile: any) => {
    const fileURL = URL.createObjectURL(newFile);
    setFile(newFile);
    setPreviewUrl(fileURL);
    onFileSelect(newFile); 
    setShowModal(false); // Close modal after selection
  };

  const handleModalDecision = (decision: boolean) => {
    const input = document.getElementById('file-upload') as HTMLInputElement; // Ensure input is correctly typed
  
    if (decision) {
      // Allow file change
      if (input && input.files && input.files.length > 0) {
        updateFile(input.files[0]);
      }
    } else {
      // Keep existing file and reset input to allow reselection of the same file
      if (input) {
        input.value = ''; // Reset the input value
      }
      setShowModal(false);
    }
  };
  
  



  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg w-full mx-auto">
      <input
        id="file-upload"
        name="coverImage"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
      />
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center text-sm text-gray-600">
        <span>Drag & Drop an image here, or click to upload</span>
        <span className="font-medium text-blue-600 hover:underline">click to upload</span>
      </label>
      {previewUrl && <img src={previewUrl} alt="Preview" className="max-w-xs max-h-40 mt-4" />}
      {/* <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300" onClick={uploadImageToCloudinary}>
        Upload Image
      </button> */}
      <p className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WEBP. Max file size: 10MB.</p>

      {showModal && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>You are only allowed to pick one cover image. If you choose another image, it will replace the previous selected one.</p>
            <div className="flex justify-around mt-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700" onClick={() => handleModalDecision(true)}>Yes, continue</button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={() => handleModalDecision(false)}>No, cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
