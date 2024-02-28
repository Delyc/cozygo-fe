// import React, { useState } from 'react';
// import MessageList from './Message';
// import { Search } from '../svgs/Heart';

// interface Message {
//   id: number;
//   name: string;
//   profile: string;
//   messagePreview: string;
//   timestamp: string;
//   unread: boolean;
//   online: boolean;
// }

// interface Profile{
//     profile: string;

// }
// const ChatLayout: React.FC = () => {

//     const [messages, setMessages] = React.useState([
//         { isSender: false, message: 'Hi', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: false, message: 'Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },

//         { isSender: false, message: 'Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//         { isSender: false, message: 'Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long? Oh my God, Forgot it How long?' , timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },

//         { isSender: false, message: 'Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: true, message: 'No, I told you about it', timestamp: '10:58 AM' },
//         { isSender: false, message: 'Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//         { isSender: false, message: 'Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//         { isSender: false, message: 'Oh my God, Forgot it How long?', timestamp: '10:58 AM' },
//       ]);
    
//       const handleSendMessage = (newMessage: string) => {
//         const newMsg = { isSender: true, message: newMessage, timestamp: new Date().toLocaleTimeString() };
//         setMessages([...messages, newMsg]);
//       };
    

//     const ChatMessage = ({ isSender, message, timestamp }: { isSender: boolean; message: string; timestamp: string }) => {
//         return (
//           <div className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
//             <div>
//             <div className={`max-w-xs md:max-w-md  text-sm lg:max-w-lg p-3 my-1 rounded-md flex flex-col text-start leading-5 ${isSender ? 'bg-indigo-600 text-white items-end' : 'bg-gray-300 items-start'}`}>
//               <p>{message}</p>
//             </div>
//             <p  className={`text-xs t text-primary_gray mt-1 ${isSender ? 'text-end' : 'text-start'}`}>{timestamp}</p>
//             </div>
            

//           </div>
//         );
//       };



//       const ChatInput = ({ onSend }: { onSend: (message: string) => void }) => {
//         const [message, setMessage] = React.useState('');
      
//         const handleSend = () => {
//           onSend(message);
//           setMessage('');
//         };
      
//         return (
//           <div className="flex items-center p-2">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="flex-grow p-2 border-gray-300 rounded-md"
//               placeholder="Type a message"
//             />
//             <button onClick={handleSend} className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-md">
//               Send
//             </button>
//           </div>
//         );
//       };


//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
// const [showProfile, setShowProfile] = useState<Profile | null>(null)
//   const handleSelectMessage = (message: Message) => {
//     setSelectedMessage(message);
//   };

//   const handleShowProfile = (message: Message) => {
//     setSelectedMessage(message);
//   };
//   return (
//     <div className=' w-full  h-[50rem] 2xl:h-[59rem] overflow-y-scroll px-5 bg-white flex flex-col lg:flex-row'>
//         <div className='flex flex-col w-[25rem] border-r  bg-white gap-4'>
//         <div className='flex justify-between bg-white gap-3 px-5 items-center  border-b fixed z-50 w-[23rem]'>
//             <input placeholder='Search...' className='bg-none outline-none w-[20rem] py-2 text-primary_gray' />
//             <Search fill={''} height={'20px'} width={'20px'} stroke={''} stroke_width={0} />
//         </div>
//         <div className='h-screen overflow-y-scroll mt-14 '>
//       <MessageList onSelectMessage={handleSelectMessage} />
//         </div>
//         </div>
       
//       <div className='w-3/4 h-full overflow-y-scroll bg-white '>
//         <p className='text-center'>
//           {selectedMessage ? <div>
//             <div className='fixed w-full bg-green-500'>
//                 <p>{selectedMessage.name}</p>
//             </div>
//             <div className="flex flex-col h-[40rem] 2xl:h-[50rem]  overflow-y-scroll">
//       <div className="flex-1 p-4 overflow-y-auto">
//         {messages.map((msg, index) => (
//           <ChatMessage key={index} isSender={msg.isSender} message={msg.message} timestamp={msg.timestamp} />
//         ))}
//       </div>
//       <div className='z-50 flex justify-center bg-white'>
//       <div className='fixed bottom-5 w-[55%] bg-white z-50 border rounded-xl'>
//       <ChatInput onSend={handleSendMessage} />
//       </div>
//       </div>
//     </div>
//           </div> : 'Chat with your people'}
//         </p>
//         <div>
//             {/* {selectedMessage && <img src={showProfile.profile} />} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatLayout;
