import React, { useState, useEffect } from 'react';
import translateText from '@/helpers/translateText'; 
import getUserInfo from '@/helpers/getUserInfo';

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
  const [user, setUser] = useState<any>()

  useEffect(() => {
    return setUser(getUserInfo())
  }, [])
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
    <div className={` w-full flex ${fromMe ? ' justify-end ' :'justify-start '}`}>
      <div className=' w-5/6 md:w-2/5'>
      <div className={` px-5 py-3  break-all ${fromMe ? 'bg-indigo-100 text-black rounded-t-xl rounded-bl-xl ' : 'rounded-t-xl rounded-br-xl bg-gray-200'}`}>
        <p className='text-sm w-5/6'>{translatedMessage}</p>
      </div>
      <p className={`text-[10px] ${fromMe ? 'text-end' : 'text-start'} `}>{formatTime(message.createdAt)}</p>

      </div>
    </div>
  );
}

export default Message;
