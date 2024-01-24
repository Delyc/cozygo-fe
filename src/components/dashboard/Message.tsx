import React from 'react';
import { Message } from './MessageTypes';
import { Profile } from './ProfileTypesProps';
interface MessageProps {
  name: string;
  message: string;
  time: string;
  profile: string;
  unread: boolean; 
  online: boolean; 
  onClick: any;
  // viewProfile: any;
}

interface MessageListProps {
  onSelectMessage: (message: Message) => void;
}
interface ProfileView{
  onSelectedProfile:(profile: Profile) => void;
}
const Message: React.FC<MessageProps> = ({ name, message, time, unread, online,onClick  , profile}) => {
  return (
    <div className="flex items-center py-3 px-4 border-b gap-3 border-gray-300 last:border-b-0 hover:bg-gray-100">
      <div className="flex-none w-12 h-12 rounded-full  relative bg-gray-200" >
        <img src='/assets/person.jpeg' className='rounded-full'  />
      {online && <span className="flex-none absolute w-2 left-[95%] top-10 grid place-content-center font-bold h-2 bg-green-500 rounded-full text-white  text-[8px]"></span>}

        </div> 
      <div className="flex-grow "  onClick={onClick} >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-sm">{name}</h2>
        </div>
        <p className="text-gray-600 text-xs">{message}</p>
      </div>
      <div className='flex flex-col gap-[3px] items-end'>
        <p className='text-[10px] text-primary_gray'>{time}</p>
      {unread && <span className="flex-none w-4 grid place-content-center font-bold h-4 bg-blue-500 rounded-full text-white  text-[8px]">2</span>}

      </div>
    </div>
  );
};

const MessageList: React.FC<MessageListProps> = ({onSelectMessage}) => {
  const messages: any[] = [
    { id: 1,profile:'/assets/person.jpeg', name: 'Orlando Diggs', messagePreview: 'How\'s your stay dude?', timestamp: '08:30 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true, online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true, online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true , online: false},
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false, online: false },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true, online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false, online: false },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true},
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true, online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false , online: true },
  ];

  return (
    <div className=" h-[49rem] mx-auto bg-white  shadow">
     
      <div className="divide-y divide-gray-300">
        {messages.map((msg, index) =>  (
          <Message key={index} name={msg.name} message={msg.messagePreview} time={msg.timestamp} unread={msg.unread} online={msg.online} onClick={() => onSelectMessage(msg)}  profile={msg.profile} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
