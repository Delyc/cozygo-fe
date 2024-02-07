'use client'

import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

type Message = {
  senderId: number;
  receiverId: number;
  text: string;
  timestamp: Date;
};

type User = {
  id: number;
  name: string;
};

interface ChattingProps {
  jwtToken: string;
  loggedInUserId: number;
}

const Chatting: React.FC<ChattingProps> = ({ jwtToken, loggedInUserId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useEffect(() => {
    // Fetch users (excluding the logged-in user)
    const fetchUsers = async () => {
      const response = await fetch('./users.json');
      const data = await response.json();
      setUsers(data.filter((user: User) => user.id !== loggedInUserId));
    };
    fetchUsers();
  }, [loggedInUserId]);

  useEffect(() => {
    // Establish WebSocket connection using the JWT token
    socketRef.current = io("http://localhost:3001", {
      auth: {
        token: jwtToken,
      },
    });

    socketRef.current.on("message", async (newMessage: Message) => {
      if ((newMessage.senderId === selectedUser && newMessage.receiverId === loggedInUserId) || 
          (newMessage.receiverId === selectedUser && newMessage.senderId === loggedInUserId)) {
        // Assume senderLanguage is always 'en' for simplicity
        const senderLanguage = 'en';
        const receiverLanguage = selectedLanguage;

        // Translate the message if languages do not match
        if (senderLanguage !== receiverLanguage) {
          const translatedText = await translateText(newMessage.text, senderLanguage, receiverLanguage);
          newMessage.text = translatedText;
        }

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [selectedUser, loggedInUserId, selectedLanguage, jwtToken]);

  const translateText = async (text: string, sourceLang: string, targetLang: string) => {
    // Placeholder for translation API call
    // Replace with actual call to your translation service
    return text; // Return the original text for now
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message && selectedUser) {
      const newMessage = {
        senderId: loggedInUserId,
        receiverId: selectedUser,
        text: message,
        timestamp: new Date()
      };
      socketRef.current?.emit("sendMessage", newMessage);
      setMessage('');
    }
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat-app-container">
      <div className="users-list">
        {users.map((user) => (
          <div key={user.id} onClick={() => setSelectedUser(user.id)} className={`user-item ${selectedUser === user.id ? 'selected' : ''}`}>
            {user.name}
          </div>
        ))}
      </div>
      <div className="language-selection">
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div className="chat-container max-w-md mx-auto p-4 bg-white shadow-lg">
        <div className="messages overflow-y-auto h-80 mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p className={`text-sm ${msg.senderId === loggedInUserId ? 'text-blue-500' : 'text-gray-800'}`}>{msg.text}</p>
              <span className="text-gray-500 text-xs">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="flex">
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-2 border-gray-300 p-2 mr-2"
            disabled={!selectedUser}
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={!selectedUser}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatting;
