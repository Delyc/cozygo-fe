'use client'
import Button from "@/components/UI/Button";
import Conversation from "@/components/UI/cards/Conversation";
import SearchInput from "@/components/UI/cards/SearchInput";
import MessageContainer from "@/components/messages/MessageContainer";
import { Call, Mail } from "@/components/svgs/Heart";
import { useEffect, useState } from "react";
export default function Chat() {
  const [convo, setConvo] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState<any>(null); 
  const user = JSON.parse(localStorage.getItem('chat-user') || "");
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
    <div className="flex gap-10  w-full  ">
      <div className="flex flex-col gap-5 overflow-y-scroll py-20 bg-white  xl:w-2/5 2xl:w-1/5 ">
        <SearchInput />
        {convo.map((conversation: any) => (
          <div  
            key={conversation._id} 
            onClick={() => handleSelectConvo(conversation)}
            style={{backgroundColor: selectedConvo?._id === conversation._id ? '#f8fafc' : 'transparent'}}>
            <Conversation conversation={conversation} />
          </div>
        ))}
      </div>
      <MessageContainer selectedConvo={selectedConvo} />
     
   
    </div>
  );
}