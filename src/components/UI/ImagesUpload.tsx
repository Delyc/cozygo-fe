import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DuplicateImageModal = ({ onClose, onReplace }: any) => (
  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <p>This image is already added. If you choose another image, it will replace the previous selected one.</p>
      <div className="flex justify-around mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700" onClick={onReplace}>Replace</button>
      </div>
    </div>
  </div>
);

const ImageUpload = ({ onFilesSelect }: any) => {
  const [files, setFiles] = useState<File[]>([]);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
    onFilesSelect(files)

    return () => newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const handleFileChange = (e: any) => {
    const newFiles = e.target.files;
    if (!newFiles) return;

    const existingFileNames = files.map(file => file.name);
    for (let i = 0; i < newFiles.length; i++) {
      if (existingFileNames.includes(newFiles[i].name)) {
        setShowDuplicateAlert(true);
        return;
      }
    }

    setFiles([...files, ...newFiles]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleModalClose = () => setShowDuplicateAlert(false);
  const removeImage = (indexToRemove: any) => {
    setFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToRemove));
    setPreviewUrls(currentUrls => currentUrls.filter((_, index) => index !== indexToRemove));
  };

  const handleReplace = () => {
    setShowDuplicateAlert(false);
    // Replace logic can be implemented here
  };

 


  return (
    <div className="relative flex flex-col items-center justify-center w-full p-6 mx-auto border-2 border-gray-300 border-dashed rounded-lg">
      <input
        ref={fileInputRef}
        id="image-upload"
        name="image"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        accept="image/*"
        multiple
      />
      <label htmlFor="image-upload" className="flex flex-col items-center justify-center text-sm text-gray-600 cursor-pointer">
        <span>Drag & Drop images here, or click to upload</span>
        <span className="font-medium text-blue-600 hover:underline">click to upload</span>
      </label>
      <div className="flex flex-wrap justify-center mt-4 gap-4">
        {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <img src={url} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            <button 
              className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full"
              onClick={() => removeImage(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <p className="mt-1 text-xs text-gray-500">Supports image formats like JPG, PNG, etc. Max file size: 10MB.</p>
      {showDuplicateAlert && <DuplicateImageModal onClose={handleModalClose} onReplace={handleReplace} />}
    </div>
  );
};

export default ImageUpload;
