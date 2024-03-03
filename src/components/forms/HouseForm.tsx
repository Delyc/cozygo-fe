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
import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import PropertyFeatures from "../PropertyFeatures";
import Button from "../UI/Button";
import CoverImage from "../UI/CoverImageUpload";
import ImageUpload from "../UI/ImagesUpload";
import FloatingLabelInput from "../UI/Input";
import VideoUpload from "../UI/VideoUpload";
import LocationForm from "./LocationForm";
import { LoadingSpin } from "../Loaders/LoadingSpin";
import { decodeToken } from "@/helpers/decodeToken";
import getToken from "@/helpers/getToken";

interface Option {
  value: string;
  label: string;
}

type PositionState = {
  latitude: number | null;
  longitude: number | null;
};

type LocationProps = {
  setLong: (long: string) => void;
  setLat: (long: string) => void;
  setStreetNbr: (long: string) => void;
};


const googleMapLocation: Option[] = [
  { value: '', label: '' },
  { value: 'sn', label: 'Street Number' },
  { value: 'll', label: 'Use Live Location' },
];

const HouseForm = ({ houseData, isEditing }: { houseData?: HouseDTO; isEditing?: boolean }) => {
  const validHouseTypes = [
    "STUDIO", "APARTMENTS", "TOWNHOUSE", "DETACHED", "SEMI_DETACHED",
    "BUNGALOW", "PENTHOUSE", "VILLA", "SERVICE_APT",
  ] as [string, ...string[]];
  const [position, setPosition] = useState<PositionState>({ latitude: null, longitude: null });
  const [locationRequested, setLocationRequested] = useState<boolean>(false);
  const [googleLocation, setGoogleLocation] = useState<string>('');
  const [showStreetNumberInput, setShowStreetNumberInput] = useState<boolean>(true);
  const [streetNumber, setStreetNumber] = useState<string>('');

  const handleSuccess = (pos: GeolocationPosition) => {
    setPosition({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    });
  };
  // setLong(position.longitude)
  // setLat(position.latitude)


  const handleError = (error: GeolocationPositionError) => {
    console.error('Error getting location:', error.message);
  };

  const handleGoogleLocationChange = (e: any) => {
    const value = e.target.value;
    setGoogleLocation(value);

    // Show input for street number if 'sn' is selected, otherwise hide
    setShowStreetNumberInput(value === 'sn');

    if (value === 'll') {
      setLocationRequested(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
      } else {
        console.log("Geolocation is not available in your browser.");
      }
    } else {
      setLocationRequested(false);
      setPosition({ latitude: null, longitude: null });
    }
  };

  const onChangeStreet = (street: any) => {
    setStreetNumber(street)
    // setStreetNbr(street)

  }
  const emailSchema = z.string().email({ message: "Invalid email address" });
  const numberSchema = z.string().regex(/^\d+$/, { message: "Only numbers are allowed" });
  const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters" });
  const houseTypeSchema = z.enum(validHouseTypes).refine(value => value !== "", {
    message: "Please select a house type.",
  });

  const locationSchema = z.string().nonempty({ message: "Location cannot be empty." });

  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
  }, [])

  const { refetch: refetchAllHouses } = useFetchHousesQuery("iii");
  const [updateHouse] = useUpdateHouseMutation();
  const [registerHouse] = useRegisterHouseMutation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formError, setFormError] = useState({
    title: false,
    bedRooms: false,
    location: false
  })
  const [country, setCountry] = useState(isEditing && houseData?.country ? houseData.country : "");
  const [typeOfHouse, setTypeOfHouse] = useState(
    isEditing && houseData?.typeOfHouse ? houseData.typeOfHouse : ""
  );


  // const [googleLocation, setGoogleLocation] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lat, setLat] = useState<String | undefined>(
    isEditing && houseData?.lat ? String(houseData.lat) : undefined
  );
  const [long, setLong] = useState<String>();
  // const [streetNumber, setStreetNbr] = useState();
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
    // setStreetNbr(streetNumber);
  };

  const getFormErroLoc = (statuss: any) => {
    setFormError(statuss)
  }

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
  console.log("streetNumber", streetNumber)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({});

  console.log("form error", formError)
  const onSubmit: SubmitHandler<any> = async (formValues) => {
    console.log("here is the formValues", formValues);
    setIsSubmitting(true);
    const coverImageUrl = coverImageFile ? await uploadImageToCloudinary(coverImageFile) : null;
    let pictureUrls = imageFiles ? await uploadImagesToCloudinary(imageFiles) : null;
    pictureUrls = pictureUrls || [];
    let videoUrls = videoFiles ? await uploadVideosToCloudinary(videoFiles) : null;
    videoUrls = videoUrls || [];

    console.log("tokneee", decodeToken(token))
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
      lat: position.latitude,
      longi: position.longitude,
      streetNumber,
    };

    if (coverImageUrl && pictureUrls.length > 0 && videoUrls.length > 0) {
      try {

        await registerHouse({ allData, id: decodeToken(token)?.id });
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
      <form className="w-full  gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-10">
            <div className="bg-white flex flex-col gap-2.5 p-5 rounded shadow">
              <p className="text-sm font-medium text-start">Property Basic Information</p>
              <div className="flex flex-col gap-2.5">
                <FloatingLabelInput
                  key="title"
                  id="title"
                  named="title"
                  label="Property Title"
                  className=""
                  schema={emailSchema}
                  setFormError={setFormError}
                  defaultValue={isEditing ? houseData?.title : null}
                  type="text"
                  {...register("title")}
                />

                <div className="flex flex-col w-full lg:justify-between gap-5">
                  <FloatingLabelInput
                    key="bedRooms"
                    id="bedRooms"
                    label="Bed rooms"
                    schema={numberSchema}
                    setFormError={setFormError}
                    named="title"
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
                    setFormError={setFormError}
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
                    setFormError={setFormError}
                    schema={houseTypeSchema}
                    // onChange={handleHouseTypeChange}
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
              {/* <div className="flex flex-col lg:justify-between gap-2.5">
                <FloatingLabelInput
                  className="w-full"
                  id="district"
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
              </div> */}
              {/* <div className="flex flex-col gap-2.5 lg:justify-between">
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
              </div> */}
              {/* <LocationForm setFormError={getFormErroLoc} setStreetNbr={getStreetNumber} setLong={getLong} setLat={getLat} /> */}

              <div className='flex flex-col gap-4'>
                <div className='flex gap-2'>
                  {/* <FloatingLabelInput
          className='w-full'
          id="googleMapLocation"
          label="Select Location Type"
          value={googleLocation}
          named="location"
          schema={locationSchema}
          
          onChange={handleGoogleLocationChange}
          setFormError={setFormError}
          options={googleMapLocation.map(option => ({ value: option.value, label: option.label }))}
        /> */}
                  {/* {showStreetNumberInput && ( */}
                  <FloatingLabelInput
                    className='px-3 py-2 border border-gray-300 form-input'
                    type="text"
                    named="location"
                    schema={locationSchema}
                    setFormError={setFormError}

                    value={streetNumber}
                    onChange={(e) => onChangeStreet(e.target.value)}
                    label="Street Number" id={'streetNumber'} />
                  {/* )} */}
                </div>
                {locationRequested && !position.latitude && <p>Loading...</p>}
                {position.latitude && position.longitude && (
                  <p>Latitude: {position.latitude}, Longitude: {position.longitude}</p>
                )}
              </div>


            </div>
          </div>
          <div>
            <p>Other features (optional)</p>
            <PropertyFeatures features={features} setFeatures={updateFeatures} />
          </div>
          <Button
            label={isSubmitting ? <LoadingSpin /> : "Submit"}
            disabled={isSubmitting || Object.values(formError).find((val) => val === true)}
            className={"text-white cursor-pointer"}
          />
          
         
        </div>
      </form>
    </div>
  );
};

export default HouseForm;
