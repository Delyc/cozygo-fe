import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Ensure this matches your server's address and port

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const conversationId = '123'; // Example conversation ID; this might come from props or context in a real app
  // Assuming "from" and "to" user IDs are known and static for this example
  const fromUserId = '1';
  const toUserId = '2';

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // Construct the message object based on your backend's expected structure
      const messageData = {
        conversationId,
        from: fromUserId,
        to: toUserId,
        text: message,
      };

      socket.emit('sendMessage', messageData);
      setMessage(''); // Clear the message input after sending
      console.log(messageData)
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-2 p-3 max-h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div> // Adjust based on how you want to display messages
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          className="border p-2 flex-grow"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="border px-4 py-2 bg-blue-500 text-white" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
