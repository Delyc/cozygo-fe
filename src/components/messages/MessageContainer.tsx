
interface Message {
  id: string; 
  content: string; 
  senderId: string; 
}

import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import getUserInfo from "@/helpers/getUserInfo";
import { useSocketContext } from "@/socket/socketContext";
import Button from "../UI/Button";
import { Call, LanguageIcon, Mail } from "../svgs/Heart";
import Select from 'react-select'

const MessageContainer = ({ selectedConvo, setShowAgentDetails, showAgentDetails }: any) => {
  const [message, setMessage] = useState('');

  console.log("tessssss", selectedConvo)
  // const [showAgentDetails, setShowAgentDetails] = useState(false)
  const [viewLanguage, setViewLanguage] = useState('en');
  const [messages, setMessages] = useState<Message[]>([]); 
  const [userInfo, setUserInfo] = useState("")

  const languageOptions = [
    { value: 'en', label: 'English', icon: 'path/to/english-icon.png' },
    { value: 'es', label: 'Spanish', icon: 'path/to/spanish-icon.png' },
    { value: 'fr', label: 'French', icon: 'path/to/french-icon.png' },
    { value: 'rw', label: 'Kinyarwanda', icon: 'path/to/kinyarwanda-icon.png' },
  ];

  const {onlineUsers} = useSocketContext()
  console.log("online users", onlineUsers)
      const isOnline = onlineUsers.includes(selectedConvo?._id)
  const handleChange = (selectedOption: any) => {
    setViewLanguage(selectedOption.value);
  };
  useEffect(() => {
    return setUserInfo(getUserInfo());
  }, [])


  const { socket }: any = useSocketContext()
  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage])
    })
    return () => socket?.off("newMessage")
  }, [socket, setMessages, messages])


  console.log("userInfo", userInfo)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    return setUser(getUserInfo())
  }, [])

  console.log("userrr", user)
  const senderId = user?._id; 
  console.log(selectedConvo?.id, "this is")

  const fetchMessages = async () => {
    if (!selectedConvo) {
      setMessages([]); // Clear messages if there's no selected conversation
      return;
    }

    // Clear messages before fetching new ones
    setMessages([]);

    try {
      const response = await fetch(`https://cozygo-chat-service.onrender.com/api/messages/${senderId}/${selectedConvo._id}`);
      if (response.ok) {
        const fetchedMessages = await response.json();
        console.log({ fetchedMessages })
        setMessages(fetchedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };




  useEffect(() => {
    fetchMessages();
  }, [selectedConvo]); // Refetch messages when selectedConvo changes

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedConvo || !senderId) return;

    const receiverId = selectedConvo._id; 

    try {
      const res = await fetch(`https://cozygo-chat-service.onrender.com/api/messages/send/${senderId}/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }) 
      });

      if (res.ok) {
        const newMessage = await res.json(); 
        setMessages(prevMessages => [...prevMessages, newMessage]); 
        setMessage(''); // Clear message input after successful send
      } else {
        console.error("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };


  console.log("selected convoooooo", selectedConvo)

  const noChat = !selectedConvo;
  return (
    <div className="w-full  max-h-5/6  ">
      <div>
       
      </div>
      {noChat ? <NoChatSelected /> :
        <div className=" flex flex-col gap-4   w-full justify-between h-screen min-h-[80vh]  relative overflow-hidden">

          <div className="flex justify-between  border-b border-gray-300 py-3 px-10 fixed top-0  z-50 bg-white  w-full">
           


            
          <div onClick={() => setShowAgentDetails(!showAgentDetails)} className="flex items-center gap-2">

            <div className="relative ">
            <img src={selectedConvo?.profilePictureUrl}  className="rounded-full w-12 h-12 bg-gray-100"/>
        <p className="absolute bottom-0 right-0">{isOnline? <div className="bg-green-400 w-3 h-3 rounded-full"></div> : ""}</p>
</div>
<div>

            <p>{selectedConvo?.fullname}</p>
            <p className="text-xs text-primary_gray font-medium">{isOnline ? 'Active Now' : 'Offline'}</p>
            </div>
            
          </div>
<div className="flex items-center">
  <LanguageIcon fill={"#757B8D"} height={"20px"} width={"20px"} stroke={"#757B8D"} strokeWidth={0} />
          <select value={viewLanguage} onChange={(e) => setViewLanguage(e.target.value)} className="bg-red-100/10 outline-none text-primary_gray">
          {/* List of languages */}
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="rw">Kinyarwanda</option>
        </select>
        </div>
<div className="w-2 bg-yellow-500 h-10">
  </div>
          </div>

          <div className="mt-20 flex flex-col z-1 relative justify-between h-[90%] py-10 gap-10">

          <Messages messages={messages} viewLanguage={viewLanguage} />
          <div className="   px-10 relative">

            <form onSubmit={sendMessage} className=" flex justify-between rounded-md items-center  w-full bg-white  px-5 ">
              <input
                type="text"
                placeholder="Message here ...."
                className="py-5  w-full text-primary_gray  rounded-md  outline-none "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className=" ">
              <svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
  <circle cx="24" cy="23" r="5" stroke="#535358" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  <path stroke="#535358" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M24 21v2l-1.5 1.5M29 3L3 15l12 2.5M29 3L15 17.5M29 3l-4.375 11.375M15 17.5l.625 2.875"/>
</svg>
              </button>
            </form>
          </div>
          </div>
        </div>}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => <div className="flex justify-center px-20 py-20 ">

  <div className="flex flex-col  items-center gap-5 w-1/2">
  <svg fill="#4f46e5" height="100px" width="100px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 32 32" xmlSpace="preserve">
<path d="M16,2C8.3,2,2,8.3,2,16s6.3,14,14,14s14-6.3,14-14S23.7,2,16,2z M19,12c0-0.6,0.4-1,1-1s1,0.4,1,1v4c0,0.6-0.4,1-1,1
	s-1-0.4-1-1V12z M11,12c0-0.6,0.4-1,1-1s1,0.4,1,1v4c0,0.6-0.4,1-1,1s-1-0.4-1-1V12z M21.9,19.8C20.3,21.2,18.2,22,16,22
	s-4.3-0.8-5.9-2.2c-0.4-0.4-0.5-1-0.1-1.4c0.4-0.4,1-0.5,1.4-0.1c1.3,1.1,2.9,1.8,4.6,1.8s3.3-0.6,4.6-1.8c0.4-0.4,1-0.3,1.4,0.1
	C22.4,18.8,22.4,19.4,21.9,19.8z"/>
</svg>
    <p className="text-primary_gray text-center">Ready to take the first step towards your new home? <br/> Browse our agents and discover a community eager to welcome you.</p>

<p className="text-primary_gray text-center">Language should never be a barrier when it comes to finding your next home. That’s why our chat feature supports multiple languages. 
</p>

<ul >

<li className="check-item text-sm">Click on the agent</li>
<li className="check-item text-sm">In the right top corner</li>
<li className="check-item text-sm">Option to switch languages</li>
<li className="check-item text-sm">Select your preferred languages</li>
</ul>

<p className="text-3xl">You’re all set to chat!</p>


<p className="text-lg"> Your dream home is just a conversation away.</p>

<button className="bg-indigo-600 text-white px-10 py-3 rounded">Home</button>

{/* <svg width="100px" height="100px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4f46e5" d="M9 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm3.5 3A1.5 1.5 0 1 1 11 4.5 1.5 1.5 0 0 1 12.5 3zm-7 0A1.5 1.5 0 1 1 4 4.5 1.5 1.5 0 0 1 5.5 3zM9 15a6 6 0 0 1-6-6 1 1 0 0 1 2 0 4 4 0 0 0 8 0 1 1 0 0 1 2 0 6 6 0 0 1-6 6z"/>
</svg>
<svg fill="#4f46e5" width="100px" height="100px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>happy-face-line</title>
    <path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z" className="clr-i-outline clr-i-outline-path-1"></path><circle cx="10.89" cy="13.89" r="2" className="clr-i-outline clr-i-outline-path-2"></circle><circle cx="25.05" cy="13.89" r="2" className="clr-i-outline clr-i-outline-path-3"></circle><path d="M18.13,28.21a8.67,8.67,0,0,0,8.26-6H9.87A8.67,8.67,0,0,0,18.13,28.21Z" className="clr-i-outline clr-i-outline-path-4"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
</svg> */}
</div>


</div>;
