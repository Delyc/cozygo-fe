import { useRegisterHouseMutation } from "@/redux/api/apiSlice";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../UI/Button";
import ImageUpload from "../UI/ImagesUpload";
import FloatingLabelInput from "../UI/Input";
import VideoUpload from "../UI/VideoUpload";
import CoverImage from "../UI/CoverImageUpload";
import { uploadImageToCloudinary, uploadImagesToCloudinary, uploadVideosToCloudinary } from "@/helpers/cloudinaryUtils";
import { all } from "axios";
import LocationForm from "./LocationForm";
import { FeaturesState } from "@/app/types/PropertyFeatures";
import PropertyFeatures from "../PropertyFeatures";


const emailSchema = z.string().email({ message: "Invalid email address" });
const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });
const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });


const HouseForm = ({ price, address }: any) => {
  const [registerHouse] = useRegisterHouseMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [country, setCountry] = useState("");
const [typeOfHouse, setTypeOfHouse] = useState('');

  const [googleLocation, setGoogleLocation] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [features, setFeatures] = useState<FeaturesState>({
    onsiteParking: false,
    fireAlarm: false,
    coolingSystem: false,
    diningRoom: false,
    elevator: false,
    emergencyExit: false,
    garden: false,
    familyRoom: false,
    firePlace: false,
  });
  const updateFeatures = (updatedFeatures: FeaturesState) => {
    setFeatures(updatedFeatures);
  };
  console.log("featuressssss ourrrr", features)

  const handleCoverImageSelect = (file: any) => {
    setCoverImageFile(file);
  };

  const handleImagesSelected = (selectedFiles: any) => {
    setImageFiles(selectedFiles);
  };
  
  const handleVideosSelected = (selectedVideos: any) => {
    setVideoFiles(selectedVideos);
  };
  
  const clearFileSelections = () => {
    setCoverImageFile(null);
    setImageFiles([]);
    setVideoFiles([]);
  };
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = async (formValues) => {
    setIsSubmitting(true);
    const coverImageUrl = coverImageFile ? await uploadImageToCloudinary(coverImageFile) : null;
    let pictureUrls = await uploadImagesToCloudinary(imageFiles);
    pictureUrls = pictureUrls || []; 
    let videoUrls = await uploadVideosToCloudinary(videoFiles);
    videoUrls = videoUrls || []; 
  
    console.log("coverrr", coverImageUrl)
    console.log("testtttinggggg", pictureUrls)
    console.log("testtttinggggg videooooossss", videoUrls)
    const allData = {
      ...formValues,
      features,
      typeOfHouse,
      coverImageUrl, 
      pictureUrls, 
      videoUrls, 
    };

    console.log('adddd dataaaa', allData)
    console.log("featuressssss ourrrr", features)
  
    if (coverImageUrl && pictureUrls.length > 0 && videoUrls.length > 0) {
      try {
        await registerHouse(allData);
        // reset();
        clearFileSelections();

      } catch (error) {
        console.error("Failed to register house:", error);
      }finally {
        setIsSubmitting(false);
      }
  
    } else {
      console.error("Failed to upload media to Cloudinary.");
      setIsSubmitting(false);
      return
    }
  };
  
  const districts = [
    { value: "", label: "" },
    { value: "gs", label: "Gasabo" },
    { value: "ny", label: "Nyarugenge" },
    { value: "kc", label: "Kicukiro" },
  ];
  const googleMapLocation = [
    { value: "", label: "" },
    { value: "gs", label: "street number" },
    { value: "ll", label: "Use Live Location" },
    { value: "kc", label: "Paste link of house location" },
  ];
  const houseTypes = [
    { value: "", label: "" },
    { value: "STUDIO", label: "Studio Apartments" },
    { value: "APARTMENTS", label: "2-Bedroom Apartments" },
    { value: "TOWNHOUSE", label: "Townhouses" },
    { value: "DETACHED", label: "Detached Houses" },
    { value: "SEMI_DETACHED", label: "Semi-Detached Houses" },
    { value: "BUNGALOW", label: "Bungalows" },
    { value: "PENTHOUSE", label: "Penthouse Suites" },
    { value: "VILLA", label: "Villas" },
    { value: "SERVICE_APT", label: "Service Apartments" },
  ];
console.log(typeOfHouse, "testing house type")
  const slides = [
    [



      <div  className="flex flex-col gap-3">
      <div className="flex flex-col gap-10" >
        <div className="bg-white flex flex-col gap-2.5 p-5 rounded shadow">
          <p className="text-start text-sm font-medium">Property Basic Information</p>
          <div className="flex flex-col gap-2.5">
          <FloatingLabelInput
              key="title"
              id="title"
              label="Property Title"
              className=""
              type="text"
              {...register("title")}
            />  

              <div className="flex justify-between gap-5 w-full">
              <FloatingLabelInput
            key="bedRooms"
            id="bedRooms"
            label="Bed rooms"
            className=""
            type="text"
            {...register("bedRooms")}
          />  
          {/* <FloatingLabelInput
          key="-"
          id="-"
          label="Bath  rooms"
          className=""
          type="email"
          {...register("-")}
        /> */}
<FloatingLabelInput
          key="price"
          id="price"
          label="Price"
          className=""
          type="text"
          {...register("price")}
        />

            <FloatingLabelInput
                className="flex flex-col gap-2.5"
                key="typeOfHouse"
                id="typeOfHouse"
                label="House type"
                options={houseTypes}
                value={typeOfHouse}
                // onChange={handleHouseTypeChange}
                // schema={numberSchema}
                type="text"
                onValueChange={(value) => setTypeOfHouse(value)}
                {...register("typeOfHouse")}
              />
              </div>


            <div className="flex  justify-between gap-5">
             <textarea className="h-[6rem] w-full outline-none border p-3 text-xs rounded" placeholder="House description"></textarea>

            </div>
            <div>
              <p className="text-start">Upload cover image</p>
              <CoverImage onFileSelect={handleCoverImageSelect}/>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col gap-5">
        <div className="bg-white flex flex-col gap-2.5 p-5 rounded shadow">
          <p className="text-start text-sm font-medium">Property Gallery</p>
          <div className="flex flex-col gap-2.5">
            <div>
              <p className="text-start">Upload images</p>
                           <ImageUpload onFilesSelect={handleImagesSelected}/>

            </div>
            <div>
              <p className="text-start">Upload videos</p>
              <VideoUpload  onVideosSelected={handleVideosSelected}/>
            </div>
          </div>
        </div>

        
      </div>


      <div className='bg-white p-5 rounded shadow-xl'>
                    <p className='text-start text-xs'>Property Location</p>
                    <div className='flex flex-col gap-2.5'>

                        <div className='flex justify-between bg-red-500'>

                            <FloatingLabelInput
                            className="w-full"
                                id="country"
                                label="Select district"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />
                            <FloatingLabelInput

                                id="country"
                                label="Select sector"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />

<FloatingLabelInput
                                id="country"
                                label="Select cell"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />

                        </div>
                        <div className='flex justify-between'>

                            <FloatingLabelInput
                                className='w-[18rem]'
                                id="country"
                                label="Select cell"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                options={districts}
                            />
                            <FloatingLabelInput
                                className='w-[18rem]'

                                id="country"
                                label="Select village"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />

                        </div>

                        <LocationForm />
                    </div>
                </div>
                <div>
                        <p>Other features (optional)</p>
                        <PropertyFeatures features={features} setFeatures={updateFeatures} />

                    </div>
      </div>
    ]
  ];

  // Handlers to navigate between slides
  const goToNextSlide = () => setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1));
  const goToPreviousSlide = () => setCurrentSlide(Math.max(currentSlide - 1, 0));

  return (
    <div className="bg-slate-100 w-full px-10 py-10">
    <form className="  gap-5 w-1/2" onSubmit={handleSubmit(onSubmit)}>
      
      <div className="flex flex-col gap-3">
        {slides[currentSlide]}

        <div className="flex justify-between gap-10 items-center">
          {currentSlide > 0 && (
            <button type="button" onClick={goToPreviousSlide}>
              Previous
            </button>
          )}

          <span className="text-sm">
            {currentSlide + 1}/{slides.length}
          </span>

          {currentSlide < slides.length - 1 && (
            <button type="button" onClick={goToNextSlide}>
              Next
            </button>
          )}
        </div>
        {currentSlide === slides.length - 1 && <Button label={isSubmitting ? "Submitting..." : "Submit"} disabled={isSubmitting} className={""} />}
      </div>

    </form>
    </div>
  );
};

export default HouseForm;

