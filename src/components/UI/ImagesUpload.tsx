// ImageUpload.tsx
import React, { useState } from 'react';

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg w-full mx-auto">
      <input
        id="file-upload"
        name="file-upload"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        accept=".jpg, .png, .mp4"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center text-sm text-gray-600"
      >
        <span>Drag & Drop file here, or</span>
        <span className="font-medium text-blue-600 hover:underline">
          click to upload
        </span>
      </label>
      <p className="mt-1 text-xs text-gray-500">Supports JPG, PNG and MP4 videos. Max file size: 10MB.</p>
    </div>
  );
};

export default ImageUpload;
