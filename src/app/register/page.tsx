"use client";

import React, { useState } from 'react';
import Select from 'react-select';
import {z} from "zod"
import { useRegisterMutation } from '@/redux/auth/authSlice';
import FloatingLabelInput from '@/components/UI/Input';
import { uploadImageToCloudinary } from '@/helpers/cloudinaryUtils';
import CoverImage from '@/components/UI/CoverImageUpload';
import { ToastContainer, toast } from 'react-toastify';
import Footer from '@/components/layout/Footer';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import { LoadingSpin } from '@/components/Loaders/LoadingSpin';
import { accountSchema, emailSchema, numberSchema, passwordSchema, stringSchema } from '@/components/Validation/validationsSchema';
function Register() {

  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    fullname:'',
    phone:'',
    email: '',
    role:'',
    password: '',
    companyName:'',
    tiktok: '',
    insta: '',
    youtube: '',

  });

  const router = useRouter()
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const handleFileSelect = async (file: File) => {
    setProfilePicture(file); // Save the file to state for now, upload it when submitting form
  };

  const handleChange = (e: any) => {
    console.log(e.target.name, e.target.value); // This should log "accountType" and the selected value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSelectChange = (selectedOption: any) => {
    setFormData({ ...formData, role: selectedOption.value });
  };

  const roleOptions = [
    { value: 'user', label: 'Home Seeker' },
    { value: 'admin', label: 'Agent' },
  ];
  const [formError, setFormError] = useState<any>({
    firstName: false,
    email: false,
    password: false,
    lastName: false,
    account: false,
    phone: false
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const profilePicUrl = await uploadImageToCloudinary(profilePicture);
    if(profilePicUrl) {
      const completeFormData = { ...formData, profilePictureUrl: profilePicUrl };
      try {
        const user = await register(completeFormData).unwrap();
  
        console.log("user", user?.ourUsers);
        toast.success("Account created successfully");
  
        try {
          const response = await fetch('http://localhost:4000/api/auth/signup', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(user?.ourUsers),
          });
  
          if (response.ok) {
            console.log("Endpoint called successfully.");
          } else {
            console.error("Server responded with an error.");
          }
        } catch (error) {
          console.error("Failed to call the endpoint:", error);
        }
          router.push("/login");
      } catch (error) {
        console.error("Registration error:", error);
      }
    } else {
      console.error("Failed to upload profile picture.");
    }
  };
  

  return (
    <section className="flex flex-col bg-white items-center ">
      <ToastContainer />
       <div className="flex px-20 py-20 bg-white justify-center gap-20 items-center w-4/6 ">
         <div className="relative w-1/2 pt-20 pb-20 pl-20 bg-indigo-600 rounded-3xl">
           <div className="flex flex-col gap-2.5 w-3/4  ml-16">
             <p className="text-2xl text-white/90">Designed for you</p>
             <p className="text-sm text-white/60 leading-5">               Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facilis rem ex
               neque voluptatem voluptate illo, molestiae ducimus alias sapiente id dignissimos
              itaque.{" "}
            </p>
             <div className="flex mt-10 gap-3">
              <div className="w-8 h-8 bg-white rounded grid place-content-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.7302 6.5625H4.11887V11.375H1.97043V6.5625H0.208715V4.58594H1.97043V3.06055C1.97043 1.3418 3.00168 0.375 4.57004 0.375C5.322 0.375 6.11692 0.525391 6.11692 0.525391V2.22266H5.23606C4.37668 2.22266 4.11887 2.73828 4.11887 3.29688V4.58594H6.03098L5.7302 6.5625Z"
                    fill="#4f46e5"
                  />
                </svg>
              </div>

              <div className="w-8 h-8 bg-white rounded grid place-content-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.15888 2.4043C6.51239 2.4043 7.62958 3.52148 7.62958 4.875C7.62958 6.25 6.51239 7.3457 5.15888 7.3457C3.78388 7.3457 2.68818 6.25 2.68818 4.875C2.68818 3.52148 3.78388 2.4043 5.15888 2.4043ZM5.15888 6.48633C6.03974 6.48633 6.74872 5.77734 6.74872 4.875C6.74872 3.99414 6.03974 3.28516 5.15888 3.28516C4.25654 3.28516 3.54755 3.99414 3.54755 4.875C3.54755 5.77734 4.27802 6.48633 5.15888 6.48633ZM8.2956 2.31836C8.2956 2.64062 8.03779 2.89844 7.71552 2.89844C7.39325 2.89844 7.13544 2.64062 7.13544 2.31836C7.13544 1.99609 7.39325 1.73828 7.71552 1.73828C8.03779 1.73828 8.2956 1.99609 8.2956 2.31836ZM9.92841 2.89844C9.97138 3.69336 9.97138 6.07812 9.92841 6.87305C9.88544 7.64648 9.71357 8.3125 9.15497 8.89258C8.59638 9.45117 7.90888 9.62305 7.13544 9.66602C6.34052 9.70898 3.95575 9.70898 3.16083 9.66602C2.38739 9.62305 1.72138 9.45117 1.1413 8.89258C0.582707 8.3125 0.410832 7.64648 0.367863 6.87305C0.324894 6.07812 0.324894 3.69336 0.367863 2.89844C0.410832 2.125 0.582707 1.4375 1.1413 0.878906C1.72138 0.320312 2.38739 0.148438 3.16083 0.105469C3.95575 0.0625 6.34052 0.0625 7.13544 0.105469C7.90888 0.148438 8.59638 0.320312 9.15497 0.878906C9.71357 1.4375 9.88544 2.125 9.92841 2.89844ZM8.89716 7.71094C9.15497 7.08789 9.09052 5.58398 9.09052 4.875C9.09052 4.1875 9.15497 2.68359 8.89716 2.03906C8.72529 1.63086 8.40302 1.28711 7.99482 1.13672C7.35029 0.878906 5.84638 0.943359 5.15888 0.943359C4.44989 0.943359 2.94599 0.878906 2.32294 1.13672C1.89325 1.30859 1.57099 1.63086 1.39911 2.03906C1.1413 2.68359 1.20575 4.1875 1.20575 4.875C1.20575 5.58398 1.1413 7.08789 1.39911 7.71094C1.57099 8.14062 1.89325 8.46289 2.32294 8.63477C2.94599 8.89258 4.44989 8.82812 5.15888 8.82812C5.84638 8.82812 7.35029 8.89258 7.99482 8.63477C8.40302 8.46289 8.74677 8.14062 8.89716 7.71094Z"
                    fill="#4f46e5"
                  />
                </svg>
              </div>

              <div className="w-8 h-8 bg-white rounded grid place-content-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 7 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.7302 6.5625H4.11887V11.375H1.97043V6.5625H0.208715V4.58594H1.97043V3.06055C1.97043 1.3418 3.00168 0.375 4.57004 0.375C5.322 0.375 6.11692 0.525391 6.11692 0.525391V2.22266H5.23606C4.37668 2.22266 4.11887 2.73828 4.11887 3.29688V4.58594H6.03098L5.7302 6.5625Z"
                    fill="#4f46e5"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col w-4/5 px-10 py-5 mt-20 bg-black/10 rounded-md gap-5">
              <p className="text-sm text-white/60 leading-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facilis rem ex
                neque voluptatem voluptate illo, molestiae ducimus alias sapiente id dignissimos
                itaque.{" "}
              </p>
              <div className="flex items-center gap-2.5">
                <img src="/assets/person.jpeg" className="w-12 rounded h-11" />
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-white">Ange Teta</p>
                  <p className="text-xs text-white/50">Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
    <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-2/5'>
       <FloatingLabelInput
      id="fullname"
      label="Full Name"
      type="text"
      name="fullname"
      value={formData.fullname}
      schema={stringSchema}
      setFormError={setFormError}
      onChange={handleChange}
    />


<FloatingLabelInput
      id="companyName"
      label="companyName"
      type="text"
      name="companyName"
      // schema={stringSchema}
      setFormError={setFormError}
      value={formData.companyName}
      onChange={handleChange}
    />

<FloatingLabelInput
      id="tiktok"
      label="tiktok"
      type="text"
      name="tiktok"
      // schema={stringSchema}
      setFormError={setFormError}
      value={formData.tiktok}
      onChange={handleChange}
    />

<FloatingLabelInput
      id="youtube"
      label="youtube"
      type="text"
      name="youtube"
      // schema={stringSchema}
      setFormError={setFormError}
      value={formData.youtube}
      onChange={handleChange}
    />

<FloatingLabelInput
      id="insta"
      label="insta"
      type="text"
      name="insta"
      // schema={stringSchema}
      setFormError={setFormError}
      value={formData.insta}
      onChange={handleChange}
    />
<CoverImage onFileSelect={handleFileSelect} />

    <FloatingLabelInput
      id="email"
      label="Email"
      type="email"
      name="email"
      schema={emailSchema}
      setFormError={setFormError}
      value={formData.email}
      onChange={handleChange}
    />
    <FloatingLabelInput
      id="password"
      label="Password"
      type="password"
      name="password"
      schema={passwordSchema}
      setFormError={setFormError}
      value={formData.password}
      onChange={handleChange}
    />

  <div className="input-field">
        <label htmlFor="role">Account Type</label>
        <Select
          id="role"
          name="role"
          value={roleOptions.find(option => option.value === formData.role)}
          onChange={handleSelectChange}
          options={roleOptions}
          classNamePrefix="select"
      // setFormError={setFormError}
      // schema={accountSchema}
          
        />
      </div>
      <FloatingLabelInput
      id="phone"
      label="Phone Number"
      type="text"
      name="phone"
      schema={numberSchema}
      setFormError={setFormError}
      value={formData.phone}
      onChange={handleChange}
    />
    <Button
            label={isLoading ? <LoadingSpin /> : "Submit"}
            disabled={isLoading || Object.values(formError).find((val) => val === true)}
            className={"text-white cursor-pointer"}
          />
    {/* <Button type="submit" disabled={isLoading} label={isLoading ? <LoadingSpin /> : "Register"} className='text-white text-sm' /> */}
    <p className='text-primary_gray'>Already have an account? <span className='font-bold text-indigo-600 cursor-pointer' onClick={() => router.push("/login")}>Login</span> here</p>
    
  </form>
  </div>
<Footer />
</section>
  );
}


export default Register