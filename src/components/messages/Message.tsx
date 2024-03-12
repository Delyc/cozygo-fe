import React, { useState, useEffect } from 'react';
import translateText from '@/helpers/translateText'; 

interface MessageProps {
  message: {
    message: string; 
    senderId: string; 
    _id: string; 
    createdAt: string
  };
  viewLanguage: string;
}

const Message: React.FC<MessageProps> = ({ message, viewLanguage }) => {
  const [translatedMessage, setTranslatedMessage] = useState('');
  const user = JSON.parse(localStorage.getItem('chat-user') || "{}");
  const formatTime = (messageDate: any) => {
    const date = new Date(messageDate);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
  };
  useEffect(() => {
      translateText({
        textToTranslate: message.message,
        sourceLang: 'en', 
        targetLang: viewLanguage,
      })
      .then(translatedText => {
        setTranslatedMessage(translatedText || message.message);
      })
      .catch(error => {
        console.error("Translation error:", error);
        setTranslatedMessage(message.message); 
      });
    
  }, [message, viewLanguage]);

  const fromMe = message.senderId === user?._id;
  console.log("translated messageeee", translatedMessage)
  return (
    <div className={` w-full flex ${fromMe ? ' justify-end ' :'justify-start'}`}>
      <div className='w-1/4'>
      <div>
        <img src="/assets/person.jpeg" alt="Profile" className="rounded-full h-12 w-12"/>
      </div>
      <div>
        <p>{translatedMessage}</p>
        <p>{formatTime(message.createdAt)}</p>
      </div>
      </div>
    </div>
  );
}

export default Message;
