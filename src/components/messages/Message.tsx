import React, { useState, useEffect } from 'react';
import translateText from '@/helpers/translateText'; 

interface MessageProps {
  message: {
    message: string; 
    senderId: string; 
    _id: string; 
  };
  viewLanguage: string;
}

const Message: React.FC<MessageProps> = ({ message, viewLanguage }) => {
  const [translatedMessage, setTranslatedMessage] = useState('');
  
  const user = JSON.parse(localStorage.getItem('chat-user') || "{}");

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
    <div className={`w-full flex ${fromMe ? 'bg-yellow-500 justify-end' :'bg-green-500 justify-start'}`}>
      <div>
        <img src="/assets/person.jpeg" alt="Profile" className="rounded-full h-12 w-12"/>
      </div>
      <div>
        <p>{translatedMessage}</p>
        <p>12:03 am</p>
      </div>
    </div>
  );
}

export default Message;
