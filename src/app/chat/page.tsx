'use client'
import Button from "@/components/UI/Button";
import Conversation from "@/components/UI/cards/Conversation";
import SearchInput from "@/components/UI/cards/SearchInput";
import MessageContainer from "@/components/messages/MessageContainer";
import { Call, Mail } from "@/components/svgs/Heart";
import getToken from "@/helpers/getToken";
import getUserInfo from "@/helpers/getUserInfo";
import { useEffect, useState } from "react";
export default function Chat() {
  const [convo, setConvo] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState<any>(null); 
  const [user, setUser] = useState<any>()

  useEffect(() => {
    return setUser(getUserInfo())
  }, [])
  // const user = JSON.parse(localStorage.getItem('chat-user') || "");
  const userId = user?._id;

  useEffect(() => {
    const getConvo = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/users/${userId}`);
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

  console.log("conversation", selectedConvo)
  return (
    <div className="flex flex-col md:flex-row gap-10  w-full max-h-screen ">
      <div className="flex-colmd:flex-row  md:gap-5 overflow-scroll   py-5 md:py-10 bg-white  border-b  xl:w-1/3 2xl:w-1/5 ">
        <SearchInput />
        <div className="flex md:flex-col gap-2.5">
        {convo.map((conversation: any, index: number) => (
          <div  className="bg-yellow- flex"
            key={conversation._id} 
            onClick={() => handleSelectConvo(conversation)}
            style={{backgroundColor: selectedConvo?._id === conversation._id ? '#f8fafc' : 'transparent'}}>
            <Conversation conversation={conversation} />
          </div>
        ))}
          </div>

      </div>
      <MessageContainer selectedConvo={selectedConvo} />
     
   
    </div>
  );
}