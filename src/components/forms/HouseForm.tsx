import { FeaturesState } from "@/app/types/PropertyFeatures";
import {
  uploadImageToCloudinary,
  uploadImagesToCloudinary,
  uploadVideosToCloudinary,
} from "@/helpers/cloudinaryUtils";
import {
  useFetchHousesQuery,
  useRegisterHouseMutation,
  useUpdateHouseMutation,
} from "@/redux/api/apiSlice";
import { HouseDTO } from "@/types/houses";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PropertyFeatures from "../PropertyFeatures";
import Button from "../UI/Button";
import CoverImage from "../UI/CoverImageUpload";
import ImageUpload from "../UI/ImagesUpload";
import FloatingLabelInput from "../UI/Input";
import VideoUpload from "../UI/VideoUpload";
import LocationForm from "./LocationForm";

const emailSchema = z.string().email({ message: "Invalid email address" });
const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });
const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });

const HouseForm = ({ houseData, isEditing }: { houseData?: HouseDTO; isEditing?: boolean }) => {
  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");
  const [updateHouse] = useUpdateHouseMutation();
  const [registerHouse] = useRegisterHouseMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [country, setCountry] = useState(isEditing && houseData?.country ? houseData.country : "");
  const [typeOfHouse, setTypeOfHouse] = useState(
    isEditing && houseData?.typeOfHouse ? houseData.typeOfHouse : ""
  );

  const [googleLocation, setGoogleLocation] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lat, setLat] = useState<String | undefined>(
    isEditing && houseData?.lat ? String(houseData.lat) : undefined
  );
  const [long, setLong] = useState<String>();
  const [streetNumber, setStreetNbr] = useState();
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
    securityCamera: false,
  });

  const getLong = (long: String) => {
    setLong(long);
  };

  const getLat = (lat: String) => {
    setLat(lat);
  };

  const getStreetNumber = (streetNumber: any) => {
    setStreetNbr(streetNumber);
  };

  const updateFeatures = (updatedFeatures: FeaturesState) => {
    setFeatures(updatedFeatures);
  };
  console.log("featuressssss ourrrr", features);

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
  } = useForm<any>({});

  const onSubmit: SubmitHandler<any> = async (formValues) => {
    console.log("here is the formValues", formValues);
    setIsSubmitting(true);
    const coverImageUrl = coverImageFile ? await uploadImageToCloudinary(coverImageFile) : null;
    let pictureUrls = imageFiles ? await uploadImagesToCloudinary(imageFiles) : null;
    pictureUrls = pictureUrls || [];
    let videoUrls = videoFiles ? await uploadVideosToCloudinary(videoFiles) : null;
    videoUrls = videoUrls || [];
    console.log("coverrr", coverImageUrl);
    console.log("testtttinggggg", pictureUrls);
    console.log("testtttinggggg videooooossss", videoUrls);

    if (isEditing) {
      const existingPictureUrls = houseData?.pictureUrls || [];
      const existingVideoUrls = houseData?.videoUrls || [];
      const allData = {
        ...formValues,
        // coverImageUrl: coverImageUrl || houseData?.coverImageUrl,
        // pictureUrls: pictureUrls ? [...existingPictureUrls, ...pictureUrls] : existingPictureUrls,
        // videoUrls: videoUrls ? [...existingVideoUrls, ...videoUrls] : existingVideoUrls,
      };
      try {
        await updateHouse({ houseId: houseData?.id as number, data: allData });
        // reset();
        clearFileSelections();
      } catch (error) {
        console.error("Failed to register house:", error);
      } finally {
        console.log("------done");
        setIsSubmitting(false);
        refetchAllHouses();
        return;
      }
    }
    const allData = {
      ...formValues,
      features,
      typeOfHouse,
      coverImageUrl,
      pictureUrls,
      videoUrls,
      lat,
      long,
      streetNumber,
    };

    if (coverImageUrl && pictureUrls.length > 0 && videoUrls.length > 0) {
      try {
        await registerHouse(allData);
        // reset();
        clearFileSelections();
      } catch (error) {
        console.error("Failed to register house:", error);
      } finally {
        console.log("------done");
        setIsSubmitting(false);
        refetchAllHouses();
      }
    } else {
      console.error("Failed to upload media to Cloudinary.");
      setIsSubmitting(false);
      return;
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

  // const goToNextSlide = () => setCurrentSlide(Math.min(currentSlide + 1, slides.length - 1));
  // const goToPreviousSlide = () => setCurrentSlide(Math.max(currentSlide - 1, 0));
  console.log("first", watch("title"));
  return (
    <div className="w-full  md:px-10 md:py-10">
      <form className="w-full bg-red-500  gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-10">
            <div className="bg-white flex flex-col gap-2.5 p-5 rounded shadow">
              <p className="text-sm font-medium text-start">Property Basic Information</p>
              <div className="flex flex-col gap-2.5">
                <FloatingLabelInput
                  key="title"
                  id="title"
                  label="Property Title"
                  className=""
                  defaultValue={isEditing ? houseData?.title : null}
                  type="text"
                  {...register("title")}
                />

                <div className="flex flex-col w-full lg:justify-between gap-5">
                  <FloatingLabelInput
                    key="bedRooms"
                    id="bedRooms"
                    label="Bed rooms"
                    className=""
                    type="text"
                    defaultValue={isEditing ? houseData?.bedRooms : null}
                    {...register("bedRooms")}
                  />

                  <FloatingLabelInput
                    key="price"
                    id="price"
                    label="Price"
                    className=""
                    type="text"
                    defaultValue={isEditing ? houseData?.price : null}
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
                    defaultValue={isEditing ? houseData?.typeOfHouse : null}
                    onValueChange={(value) => setTypeOfHouse(value)}
                    {...register("typeOfHouse")}
                  />
                </div>
                <div className="flex justify-between  gap-5">
                  <textarea
                    className="h-[6rem] w-full outline-none border p-3 text-xs rounded"
                    placeholder="House description"
                  ></textarea>
                </div>
                <div>
                  <p className="text-start">Upload cover image</p>
                  <CoverImage onFileSelect={handleCoverImageSelect} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-white flex flex-col gap-2.5 p-5 rounded shadow">
              <p className="text-sm font-medium text-start">Property Gallery</p>
              <div className="flex flex-col gap-2.5">
                <div>
                  <p className="text-start">Upload images</p>
                  <ImageUpload onFilesSelect={handleImagesSelected} />
                </div>
                <div>
                  <p className="text-start">Upload videos</p>
                  <VideoUpload onVideosSelected={handleVideosSelected} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-white rounded shadow-xl">
            <p className="text-xs text-start">Property Location</p>
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col lg:justify-between gap-2.5">
                <FloatingLabelInput
                  className="w-full"
                  id="country"
                  label="Select district"
                  value={country}
                  defaultValue={isEditing ? houseData?.country : null}
                  onChange={(e) => setCountry(e.target.value)}
                  options={districts}
                />
                <FloatingLabelInput
                  id="country"
                  label="Select sector"
                  value={country}
                  defaultValue={isEditing ? houseData?.country : null}
                  onChange={(e) => setCountry(e.target.value)}
                  options={districts}
                />
                <FloatingLabelInput
                  id="country"
                  label="Select cell"
                  value={country}
                  defaultValue={isEditing ? houseData?.country : null}
                  onChange={(e) => setCountry(e.target.value)}
                  options={districts}
                />
              </div>
              <div className="flex flex-col gap-2.5 lg:justify-between">
                <FloatingLabelInput
                  className="md:w-[18rem]"
                  id="country"
                  label="Select cell"
                  value={country}
                  defaultValue={isEditing ? houseData?.country : null}
                  onChange={(e) => setCountry(e.target.value)}
                  options={districts}
                />
                <FloatingLabelInput
                  className="md:w-[18rem]"
                  id="country"
                  label="Select village"
                  value={country}
                  defaultValue={isEditing ? houseData?.country : null}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <LocationForm setStreetNbr={getStreetNumber} setLong={getLong} setLat={getLat} />
            </div>
          </div>
          <div>
            <p>Other features (optional)</p>
            <PropertyFeatures features={features} setFeatures={updateFeatures} />
          </div>
          <Button
            label={isSubmitting ? "Submitting..." : "Submit"}
            disabled={isSubmitting}
            className={""}
          />
        </div>
      </form>
    </div>
  );
};

export default HouseForm;
