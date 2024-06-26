'use client'
import Button from "@/components/UI/Button";
import Conversation from "@/components/UI/cards/Conversation";
import SearchInput from "@/components/UI/cards/SearchInput";
import NavBar from "@/components/layout/Navbar";
import MessageContainer from "@/components/messages/MessageContainer";
import { Call, Eye, Mail } from "@/components/svgs/Heart";
import getToken from "@/helpers/getToken";
import getUserInfo from "@/helpers/getUserInfo";
import { useSocketContext } from "@/socket/socketContext";
import { useEffect, useState } from "react";
export default function Chat() {
  const [convo, setConvo] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState<any>(null);
  const [user, setUser] = useState<any>()
  const [showAgentDetails, setShowAgentDetails] = useState(false)

  useEffect(() => {
    return setUser(getUserInfo())
  }, [])
  // const user = JSON.parse(localStorage.getItem('chat-user') || "");
  const userId = user?._id;

  useEffect(() => {
    const getConvo = async () => {
      try {
        const res = await fetch(`https://cozygo-chat-service.onrender.com/api/users/${userId}`);
        const data = await res.json();
        setConvo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getConvo();
  }, []);


  const handleSelectConvo = (conversation: any) => {
    setSelectedConvo(conversation);
  };

  const { onlineUsers } = useSocketContext()

  console.log("conversation", selectedConvo)
  console.log("convoooo", convo)
  // console.log("tessssss", conversation)
  return (
    <>
      <div className="flex flex-col bg-[#F5F7FB] md:flex-row  w-full h-screen overflow-hidden fixed">
        <div className="flex-col md:flex-row  md:gap-5 mb-20 py-5 md:py-10 bg-indigo-50 border-b h-screen xl:min-w-[18rem]  ">
          <div className="fixed top-0 z-50 bg-indigo-50 px-5 py-5 flex flex-col gap-5 w-[18rem] ">

            <SearchInput />

            <div className=" flex flex-col  w-full  flex flex-col gap-2">
              <p className="font-medium">Active</p>
              <div className="flex gap-2 overflow-auto overflow-x-scroll w-full  ">

                {/* filter and only display users who are in onlineUsers array */}

                {convo.map((conversation: any, index: number) => {
                  console.log("convo", conversation)
                  const isOnline = onlineUsers.includes(conversation._id)
                  return isOnline && <div className="relative w-12 min-w-10">
                    <img src={conversation?.profilePictureUrl} className="rounded-full w-10 h-10" />
                    <p className="absolute bottom-0 right-2">{isOnline ? <div className="bg-green-400 w-3 h-3 rounded-full"></div> : ""}</p>
                  </div>;
                })}
              </div>
            </div>
          </div>
          <div className="flex  overflow-auto h-5/6  overflow-y-scroll   md:flex-col mt-36">
          {
  convo
    .filter((conversation: any) => conversation?.accountType === 'admin') 
    .map((conversation: any, index: number) => (
      <div className="flex"
           key={conversation._id}
           onClick={() => handleSelectConvo(conversation)}
           style={{ backgroundColor: selectedConvo?._id === conversation._id ? '#f8fafc' : 'transparent' }}>
        <Conversation conversation={conversation} />
      </div>
    ))
}

          </div>

        </div>
        <div className={`${showAgentDetails ? 'w-4/5 h-screen' : 'w-full'}`}>
          <MessageContainer selectedConvo={selectedConvo} setShowAgentDetails={setShowAgentDetails} showAgentDetails={showAgentDetails} />
        </div>
        {showAgentDetails && <div className="h-full  w-1/3 flex bg-white py-20 flex-col gap-2.5 items-center">

          <img src={selectedConvo?.profilePictureUrl} className="w-32 h-32 rounded-full" />
          <div className="flex flex-col  items-center ">
            <p className="text-xl font-medium">{selectedConvo?.fullname}</p>
            <p className="text-xs text-primary_gray">{selectedConvo?.companyName}</p>
          </div>

          <div className="flex justify-center gap-2 border-b border-gray-100 w-full pb-5">
            <a href={selectedConvo.tiktok} target="_blank">
              <svg width="30px" height="30px" viewBox="62.370000000000005 70.49 675.3000000000001 675.3000000000001" xmlns="http://www.w3.org/2000/svg">

                <g fill="#ee1d52">

                  <path d="M196 498.32l1.64 4.63c-.21-.53-.81-2.15-1.64-4.63zM260.9 393.39c2.88-24.88 12.66-38.81 31.09-53.09 26.37-19.34 59.31-8.4 59.31-8.4V267a135.84 135.84 0 0 1 23.94 1.48V352s-32.93-10.94-59.3 8.41c-18.42 14.27-28.22 28.21-31.09 53.09-.09 13.51 2.34 31.17 13.53 46.44q-4.15-2.22-8.46-5.06c-24.65-17.27-29.14-43.18-29.02-61.49zM511.25 147c-18.14-20.74-25-41.68-27.48-56.39h22.82s-4.55 38.57 28.61 76.5l.46.51A132.76 132.76 0 0 1 511.25 147zM621.18 205.8v81.84s-29.12-1.19-50.67-6.91c-30.09-8-49.43-20.27-49.43-20.27s-13.36-8.75-14.44-9.36v169c0 9.41-2.47 32.91-10 52.51-9.83 25.64-25 42.47-27.79 45.91 0 0-18.45 22.75-51 38.07-29.34 13.82-55.1 13.47-62.8 13.82 0 0-44.53 1.84-84.6-25.33a169.63 169.63 0 0 1-24.16-20.26l.2.15c40.08 27.17 84.6 25.33 84.6 25.33 7.71-.35 33.47 0 62.8-13.82 32.52-15.32 51-38.07 51-38.07 2.76-3.44 18-20.27 27.79-45.92 7.51-19.59 10-43.1 10-52.51V231c1.08.62 14.43 9.37 14.43 9.37s19.35 12.28 49.44 20.27c21.56 5.72 50.67 6.91 50.67 6.91v-64.13c9.96 2.33 18.45 2.96 23.96 2.38z" />

                </g>

                <path d="M597.23 203.42v64.11s-29.11-1.19-50.67-6.91c-30.09-8-49.44-20.27-49.44-20.27s-13.35-8.75-14.43-9.37V400c0 9.41-2.47 32.92-10 52.51-9.83 25.65-25 42.48-27.79 45.92 0 0-18.46 22.75-51 38.07-29.33 13.82-55.09 13.47-62.8 13.82 0 0-44.52 1.84-84.6-25.33l-.2-.15a157.5 157.5 0 0 1-11.93-13.52c-12.79-16.27-20.63-35.51-22.6-41a.24.24 0 0 1 0-.07c-3.17-9.54-9.83-32.45-8.92-54.64 1.61-39.15 14.81-63.18 18.3-69.2A162.84 162.84 0 0 1 256.68 303a148.37 148.37 0 0 1 42.22-25 141.61 141.61 0 0 1 52.4-11v64.9s-32.94-10.9-59.3 8.4c-18.43 14.28-28.21 28.21-31.09 53.09-.12 18.31 4.37 44.22 29 61.5q4.31 2.85 8.46 5.06a65.85 65.85 0 0 0 15.5 15.05c24.06 15.89 44.22 17 70 6.68C401.06 474.78 414 459.23 420 442c3.77-10.76 3.72-21.59 3.72-32.79V90.61h60c2.48 14.71 9.34 35.65 27.48 56.39a132.76 132.76 0 0 0 24.41 20.62c2.64 2.85 16.14 16.94 33.47 25.59a130.62 130.62 0 0 0 28.15 10.21z" />

                <path d="M187.89 450.39v.05l1.48 4.21c-.17-.49-.72-1.98-1.48-4.26z" fill="#69c9d0" />

                <path d="M298.9 278a148.37 148.37 0 0 0-42.22 25 162.84 162.84 0 0 0-35.52 43.5c-3.49 6-16.69 30.05-18.3 69.2-.91 22.19 5.75 45.1 8.92 54.64a.24.24 0 0 0 0 .07c2 5.44 9.81 24.68 22.6 41a157.5 157.5 0 0 0 11.93 13.52 166.64 166.64 0 0 1-35.88-33.64c-12.68-16.13-20.5-35.17-22.54-40.79a1 1 0 0 1 0-.12v-.07c-3.18-9.53-9.86-32.45-8.93-54.67 1.61-39.15 14.81-63.18 18.3-69.2a162.68 162.68 0 0 1 35.52-43.5 148.13 148.13 0 0 1 42.22-25 144.63 144.63 0 0 1 29.78-8.75 148 148 0 0 1 46.57-.69V267a141.61 141.61 0 0 0-52.45 11z" fill="#69c9d0" />

                <path d="M483.77 90.61h-60v318.61c0 11.2 0 22-3.72 32.79-6.06 17.22-18.95 32.77-36.13 39.67-25.79 10.36-45.95 9.21-70-6.68a65.85 65.85 0 0 1-15.54-15c20.49 10.93 38.83 10.74 61.55 1.62 17.17-6.9 30.08-22.45 36.12-39.68 3.78-10.76 3.73-21.59 3.73-32.78V70.49h82.85s-.93 7.92 1.14 20.12zM597.23 185.69v17.73a130.62 130.62 0 0 1-28.1-10.21c-17.33-8.65-30.83-22.74-33.47-25.59a93.69 93.69 0 0 0 9.52 5.48c21.07 10.52 41.82 13.66 52.05 12.59z" fill="#69c9d0" />

                <path d="M486.85 701.51a22.75 22.75 0 0 1-1-6.73v-.16a24.53 24.53 0 0 0 1 6.89zM536.44 694.62v.16a23.07 23.07 0 0 1-1 6.73 24.89 24.89 0 0 0 1-6.89z" fill="none" />

                <path d="M485.84 694.78a22.75 22.75 0 0 0 1 6.73 2.59 2.59 0 0 0 .14.45 25.28 25.28 0 0 0 24.16 17.8v25.59c-12.46 0-21.38.44-35-7.59-15.44-9.16-24.14-25.91-24.14-43.3 0-17.94 9.74-35.91 26.25-44.57 12-6.28 21.09-6.32 32.92-6.32v25.58a25.31 25.31 0 0 0-25.31 25.31z" fill="#69c9d0" />

                <path d="M536.64 694.78a23.07 23.07 0 0 1-1 6.73c0 .15-.09.3-.14.45a25.3 25.3 0 0 1-24.16 17.8v25.59c12.45 0 21.38.44 34.95-7.59 15.49-9.16 24.21-25.91 24.21-43.3 0-17.94-9.74-35.91-26.25-44.57-12-6.28-21.09-6.32-32.91-6.32v25.58a25.31 25.31 0 0 1 25.3 25.31z" fill="#ee1d52" />

                <path d="M119.51 620.36h93.71l-8.66 25.78H180v98.67h-30.13v-98.67h-30.36zm248.35 0v25.78h30.36v98.67h30.17v-98.67h24.52l8.66-25.78zm-134.25 29.38A14.6 14.6 0 1 0 219 635.15a14.59 14.59 0 0 0 14.61 14.59zM219 744.81h29.58v-84.75H219zM355 649h-34.6l-29.82 29.82v-58.36h-29.39l-.09 124.35h29.67v-32.4L300 704l28.8 40.77h31.72l-41.72-59.62zm283.77 36.17L674.94 649h-34.59l-29.83 29.82v-58.36h-29.38L581 744.81h29.68v-32.4L620 704l28.8 40.77h31.73zm-76.06 9.27c0 28.1-23.09 50.89-51.57 50.89s-51.57-22.79-51.57-50.89 23.09-50.89 51.57-50.89 51.57 22.8 51.57 50.91zm-26.27 0a25.3 25.3 0 1 0-25.3 25.3 25.3 25.3 0 0 0 25.3-25.28z" />

              </svg>
            </a>
            <a href={selectedConvo?.youtube}>
              <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                width="30px" height="30px" viewBox="0 0 90.677 90.677"
                xmlSpace="preserve">
                <g>
                  <g>
                    <path d="M82.287,45.907c-0.937-4.071-4.267-7.074-8.275-7.521c-9.489-1.06-19.098-1.065-28.66-1.06
			c-9.566-0.005-19.173,0-28.665,1.06c-4.006,0.448-7.334,3.451-8.27,7.521c-1.334,5.797-1.35,12.125-1.35,18.094
			c0,5.969,0,12.296,1.334,18.093c0.936,4.07,4.264,7.073,8.272,7.521c9.49,1.061,19.097,1.065,28.662,1.061
			c9.566,0.005,19.171,0,28.664-1.061c4.006-0.448,7.336-3.451,8.272-7.521c1.333-5.797,1.34-12.124,1.34-18.093
			C83.61,58.031,83.62,51.704,82.287,45.907z M28.9,50.4h-5.54v29.438h-5.146V50.4h-5.439v-4.822H28.9V50.4z M42.877,79.839h-4.629
			v-2.785c-1.839,2.108-3.585,3.136-5.286,3.136c-1.491,0-2.517-0.604-2.98-1.897c-0.252-0.772-0.408-1.994-0.408-3.796V54.311
			h4.625v18.795c0,1.084,0,1.647,0.042,1.799c0.111,0.718,0.462,1.082,1.082,1.082c0.928,0,1.898-0.715,2.924-2.166v-19.51h4.629
			L42.877,79.839L42.877,79.839z M60.45,72.177c0,2.361-0.159,4.062-0.468,5.144c-0.618,1.899-1.855,2.869-3.695,2.869
			c-1.646,0-3.234-0.914-4.781-2.824v2.474h-4.625V45.578h4.625v11.189c1.494-1.839,3.08-2.769,4.781-2.769
			c1.84,0,3.078,0.969,3.695,2.88c0.311,1.027,0.468,2.715,0.468,5.132V72.177z M77.907,67.918h-9.251v4.525
			c0,2.363,0.773,3.543,2.363,3.543c1.139,0,1.802-0.619,2.066-1.855c0.043-0.251,0.104-1.279,0.104-3.134h4.719v0.675
			c0,1.491-0.057,2.518-0.099,2.98c-0.155,1.024-0.519,1.953-1.08,2.771c-1.281,1.854-3.179,2.768-5.595,2.768
			c-2.42,0-4.262-0.871-5.599-2.614c-0.981-1.278-1.485-3.29-1.485-6.003v-8.941c0-2.729,0.447-4.725,1.43-6.015
			c1.336-1.747,3.177-2.617,5.54-2.617c2.321,0,4.161,0.87,5.457,2.617c0.969,1.29,1.432,3.286,1.432,6.015v5.285H77.907z"/>
                    <path d="M70.978,58.163c-1.546,0-2.321,1.181-2.321,3.541v2.362h4.625v-2.362C73.281,59.344,72.508,58.163,70.978,58.163z" />
                    <path d="M53.812,58.163c-0.762,0-1.534,0.36-2.307,1.125v15.559c0.772,0.774,1.545,1.14,2.307,1.14
			c1.334,0,2.012-1.14,2.012-3.445V61.646C55.824,59.344,55.146,58.163,53.812,58.163z"/>
                    <path d="M56.396,34.973c1.705,0,3.479-1.036,5.34-3.168v2.814h4.675V8.82h-4.675v19.718c-1.036,1.464-2.018,2.188-2.953,2.188
			c-0.626,0-0.994-0.37-1.096-1.095c-0.057-0.153-0.057-0.722-0.057-1.817V8.82h-4.66v20.4c0,1.822,0.156,3.055,0.414,3.836
			C53.854,34.363,54.891,34.973,56.396,34.973z"/>
                    <path d="M23.851,20.598v14.021h5.184V20.598L35.271,0h-5.242l-3.537,13.595L22.812,0h-5.455c1.093,3.209,2.23,6.434,3.323,9.646
			C22.343,14.474,23.381,18.114,23.851,20.598z"/>
                    <path d="M42.219,34.973c2.342,0,4.162-0.881,5.453-2.641c0.981-1.291,1.451-3.325,1.451-6.067v-9.034
			c0-2.758-0.469-4.774-1.451-6.077c-1.291-1.765-3.11-2.646-5.453-2.646c-2.33,0-4.149,0.881-5.443,2.646
			c-0.993,1.303-1.463,3.319-1.463,6.077v9.034c0,2.742,0.47,4.776,1.463,6.067C38.069,34.092,39.889,34.973,42.219,34.973z
			 M39.988,16.294c0-2.387,0.724-3.577,2.231-3.577c1.507,0,2.229,1.189,2.229,3.577v10.852c0,2.387-0.722,3.581-2.229,3.581
			c-1.507,0-2.231-1.194-2.231-3.581V16.294z"/>
                  </g>
                </g>
              </svg>
            </a>

            <a href={selectedConvo?.insta}>
              <svg width="30px" height="30px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)" />
                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)" />
                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)" />
                <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white" />
                <defs>
                  <radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                    <stop stop-color="#B13589" />
                    <stop offset="0.79309" stop-color="#C62F94" />
                    <stop offset="1" stop-color="#8A3AC8" />
                  </radialGradient>
                  <radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                    <stop stop-color="#E0E8B7" />
                    <stop offset="0.444662" stop-color="#FB8A2E" />
                    <stop offset="0.71474" stop-color="#E2425C" />
                    <stop offset="1" stop-color="#E2425C" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                    <stop offset="0.156701" stop-color="#406ADC" />
                    <stop offset="0.467799" stop-color="#6A45BE" />
                    <stop offset="1" stop-color="#6A45BE" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </a>
          </div>

          <div className="flex flex-col mt-3 w-3/5 gap-2">
            <div className="flex items-center gap-2">
              <Call fill={"#757B8D"} height={"30px"} width={"30px"} stroke={""} strokeWidth={0} />
              <div>
                <p className="text-sm">{selectedConvo?.phone}</p>
                <p className="text-xs text-primary_gray">Phone</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail fill={"#757B8D"} height={"30px"} width={"30px"} stroke={""} strokeWidth={0} />
              <div>
                <p className="text-sm">{selectedConvo?.email}</p>
                <p className="text-xs text-primary_gray">Email</p>
              </div>
            </div>

          {/* <a href={""} className="text-indigo-600 underline flex items-center gap-2 text-sm"><Eye fill={"#757B8D"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} /> View My Properties</a> */}

          </div>

          <button className="text-white px-6 text-sm bg-indigo-600 rounded py-3 mt-3 flex items-center gap-2"><Eye fill={"white"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} /> View My Properties</button>
        </div>}

      </div>
    </>
  );
}