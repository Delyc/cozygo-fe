import axios from "axios";

const CLOUDINARY_UPLOAD_PRESET = 'my_unsigned_preset';
const CLOUDINARY_CLOUD_NAME = 'dci8tsnsb';

export async function uploadMultipleToCloudinary(files: File[]): Promise<string[]> {
  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post<{ secure_url: string }>(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );
    urls.push(res.data.secure_url);
  }

  return urls;
}
