import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DuplicateVideoModal = ({ onClose, onReplace }: any) => (
  <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <p>This video is already added. If you choose another video, it will replace the previous selected one.</p>
      <div className="flex justify-around mt-4">
        <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose}>Cancel</button>
        {/* <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700" onClick={onReplace}>Replace</button> */}
      </div>
    </div>
  </div>
);

const VideoUpload = ({ onVideosSelected }: any) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newPreviewUrls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
    onVideosSelected(files)

    return () => newPreviewUrls.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newFiles = Array.from(e.target.files || []);
//     if (newFiles.length === 0) return;

//     // Filter out duplicates based on file name
//     const nonDuplicateFiles = newFiles.filter(newFile => 
//         !files.some(existingFile => existingFile.name === newFile.name));

//     if (nonDuplicateFiles.length !== newFiles.length) {
//         setShowDuplicateAlert(true); // Show alert if any duplicates were found
//         // Consider adjusting modal to inform about ignoring duplicates
//     }

//     // Add only non-duplicates to the state, ensuring the type is explicitly File[]
//     setFiles(currentFiles => [...currentFiles, ...nonDuplicateFiles] as File[]);

//     // Reset the input for future selections
//     if (fileInputRef.current) fileInputRef.current.value = '';
// };

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
  const removeVideo = (indexToRemove: number) => {
    setFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToRemove));
    setPreviewUrls(currentUrls => currentUrls.filter((_, index) => index !== indexToRemove));
  };

  const handleReplace = () => {
    // Logic for replacing the video goes here
    // For simplicity, this example just closes the modal. Adjust according to your needs.
    setShowDuplicateAlert(false);
  };



  return (
    <div className="relative flex flex-col items-center justify-center w-full p-6 mx-auto border-2 border-gray-300 border-dashed rounded-lg">
      <input
        ref={fileInputRef}
        id="video-upload"
        name="video"
        type="file"
        className="sr-only"
        onChange={handleFileChange}
        accept="video/*"
        multiple
      />
      <label htmlFor="video-upload" className="flex flex-col items-center justify-center text-sm text-gray-600 cursor-pointer">
        <span>Drag & Drop videos here, or click to upload</span>
        <span className="font-medium text-blue-600 hover:underline">click to upload</span>
      </label>
      <div className="flex flex-wrap justify-center mt-4 gap-4">
      {previewUrls.map((url, index) => (
          <div key={index} className="relative">
            <video src={url} controls className="max-w-xs max-h-40" />
            <button 
              className="absolute top-0 right-0 p-1 text-white bg-red-600 rounded-full"
              onClick={() => removeVideo(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {/* <button
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300"
        onClick={uploadVideosToCloudinary}
      >
        Upload Videos
      </button> */}
      <p className="mt-1 text-xs text-gray-500">Supports video formats like MP4, AVI, etc. Max file size: 100MB.</p>
      {showDuplicateAlert && <DuplicateVideoModal onClose={handleModalClose} onReplace={handleReplace} />}
    </div>
  );
};

export default VideoUpload;
