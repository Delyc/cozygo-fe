import React from 'react';

interface MessageProps {
  name: string;
  message: string;
  time: string;
  unread: boolean; 
}

const Message: React.FC<MessageProps> = ({ name, message, time, unread }) => {
  return (
    <div className="flex items-center py-3 px-4 border-b border-gray-300 last:border-b-0">
      <div className="flex-none w-12 h-12 rounded-full bg-gray-200 mr-4">
        <img src='/assets/person.jpeg' className='rounded-full' />
        </div> 
      <div className="flex-grow">
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

const MessageList: React.FC = () => {
  const messages: any[] = [
    { id: 1, name: 'Orlando Diggs', messagePreview: 'How\'s your stay dude?', timestamp: '08:30 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false },
  ];

  return (
    <div className="w-[20rem] h-[49rem] mx-auto bg-white rounded-lg shadow">
      <div className="text-lg font-semibold py-2 px-4 border-b border-gray-300">
        Messages <span className="text-indigo-600">View All</span>
      </div>
      <div className="divide-y divide-gray-300">
        {messages.map((msg, index) =>  (
          <Message key={index} name={msg.name} message={msg.messagePreview} time={msg.timestamp} unread={msg.unread} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
