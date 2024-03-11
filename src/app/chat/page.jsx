'use client'
import Conversation from "@/components/UI/cards/Conversation";
import SearchInput from "@/components/UI/cards/SearchInput";
import MessageContainer from "@/components/messages/MessageContainer";
import { useEffect, useState } from "react";
export default function Chat() {
  const [convo, setConvo] = useState([]);
  const [selectedConvo, setSelectedConvo] = useState(null); 
  const user = JSON.parse(localStorage.getItem('chat-user'));
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


  const handleSelectConvo = (conversation) => {
    setSelectedConvo(conversation);
  };

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-2.5">
        <SearchInput />
        {convo.map((conversation) => (
          <div 
            key={conversation._id} 
            onClick={() => handleSelectConvo(conversation)}
            style={{backgroundColor: selectedConvo?._id === conversation._id ? 'red' : 'transparent'}}
          >
            <Conversation conversation={conversation} />
          </div>
        ))}
      </div>
      <MessageContainer selectedConvo={selectedConvo} />
    </div>
  );
}
