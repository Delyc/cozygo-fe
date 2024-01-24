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
      <div className="flex-none w-12 h-12 rounded-full bg-gray-200 mr-4"></div> 
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{name}</h2>
          <span className="text-sm text-gray-500">{time}</span>
        </div>
        <p className="text-gray-600">{message}</p>
      </div>
      {unread && <span className="flex-none w-3 h-3 bg-blue-500 rounded-full ml-2"></span>}
    </div>
  );
};

const MessageList: React.FC = () => {
  const messages: any[] = [
    { id: 1, name: 'Orlando Diggs', messagePreview: 'How\'s your stay dude?', timestamp: '08:30 AM', unread: true },
    { id: 2, name: 'Marx Hertlambang', messagePreview: 'Is it possible for me to rent...', timestamp: '09:36 AM', unread: false },
  ];

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow">
      <div className="text-lg font-semibold py-2 px-4 border-b border-gray-300">
        Messages <span className="text-blue-500">View All</span>
      </div>
      <div className="divide-y divide-gray-300">
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;
