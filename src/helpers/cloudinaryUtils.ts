import axios from 'axios';

const uploadImageToCloudinary = async (file: File | null): Promise<string | null> => {
  if (!file) {
    console.log("No file provided for upload.");
    return null; // Explicitly return null if no file is provided
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'preset_one');

  try {
    const response = await axios.post('https://api.cloudinary.com/v1_1/dd5ruf2qc/image/upload', formData);
    console.log("uhmmmmmm tesststtt, ", response.data.secure_url)
    return response.data.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null; // Explicitly return null in case of an error
  }
};

const uploadImagesToCloudinary = async (files: any) => {
    const urls = [];
  
    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'preset_one');
  
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dd5ruf2qc/image/upload', formData);
            urls.push(response.data.secure_url); // Accumulate successful URLs
        } catch (error) {
            console.error('Error uploading to Cloudinary', error);

        }
    }
  
    return urls.length > 0 ? urls : null; // Return null only if no URLs were successfully obtained
  };

const uploadVideosToCloudinary = async (files: File[]) => {
    const urls = [];
  
    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'preset_one'); 

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dd5ruf2qc/video/upload', formData);
            urls.push(response.data.secure_url); 
        } catch (error) {
            console.error('Error uploading video to Cloudinary', error);
        }
    }
  
    return urls.length > 0 ? urls : null; 
};

export { uploadImagesToCloudinary, uploadImageToCloudinary, uploadVideosToCloudinary };
