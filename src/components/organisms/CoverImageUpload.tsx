import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'my_unsigned_preset';
const CLOUDINARY_CLOUD_NAME = 'dci8tsnsb';

type CoverImageProps = {
  onFileSelect: (url: string) => void;
};

const CoverImage: React.FC<CoverImageProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (file) {
      setShowModal(true);
    } else {
      uploadToCloudinary(selectedFile);
    }
  };

  const uploadToCloudinary = async (selectedFile: File) => {
    const fileURL = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileURL);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post<{ secure_url: string }>(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      setFile(imageUrl);
      onFileSelect(imageUrl);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
      setShowModal(false);
    }
  };

  const uploadMultipleToCloudinary = async (files: File[]) => {
    setIsUploading(true);
    const urls: string[] = [];
  
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  
      try {
        const res = await axios.post<{ secure_url: string }>(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        urls.push(res.data.secure_url);
      } catch (err) {
        console.error('Upload error for', file.name, err);
      }
    }
  
    setIsUploading(false);
    onFileSelect(urls);
  };
  

  const handleModalDecision = (decision: boolean) => {
    const input = document.getElementById('file-upload') as HTMLInputElement;

    if (decision && input?.files?.[0]) {
      uploadToCloudinary(input.files[0]);
    } else {
      if (input) input.value = '';
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 mx-auto border-2 border-gray-300 border-dashed rounded-lg relative">
      <input
        id="file-upload"
        name="coverImage"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
      />
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center text-sm text-gray-600 cursor-pointer">
        {isUploading ? (
          <span className="text-blue-500 font-bold">Uploading...</span>
        ) : previewUrl ? (
          <h1 className="text-green-500 font-bold">Uploaded ✅</h1>
        ) : (
          <div className="flex flex-col text-center">
            <span>Drag & Drop or click to upload</span>
            <span className="font-medium text-blue-600 hover:underline">click to upload</span>
            <p className="mt-1 text-xs text-gray-500">Supports JPG, PNG, WEBP. Max size: 10MB.</p>
          </div>
        )}
      </label>

      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="p-4 bg-white rounded-lg">
            <p>Another image is already selected. Replace it?</p>
            <div className="flex justify-around mt-4">
              <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-700" onClick={() => handleModalDecision(true)}>Yes</button>
              <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700" onClick={() => handleModalDecision(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
