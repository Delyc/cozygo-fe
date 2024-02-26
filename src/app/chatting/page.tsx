'use client'
// interface ChattingProps {
//     jwtToken: string;
//     loggedInUserId: number;
//     payload: any;
// }
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



const Chatting: React.FC<any> = ({ jwtToken, loggedInUserId, payload }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<string>('');
    const socketRef = useRef<ReturnType<typeof io> | null>(null);

    useEffect(() => {
        const agentId = localStorage.getItem('selectedAgent');
        const agentName = localStorage.getItem('agentName');
    
        if (agentId && agentName) {
          const newAgent: User = { id: parseInt(agentId, 10), name: agentName };
          setSelectedUser(newAgent.id); // Set the newly selected user
          setUsers(prevUsers => {
            const userExists = prevUsers.some(user => user.id === newAgent.id);
            return userExists ? prevUsers : [newAgent, ...prevUsers];
          });
        }
      }, [localStorage.getItem('selectedAgent')]);

    useEffect(() => {
        // Establish WebSocket connection using the JWT token
        socketRef.current = io("http://localhost:3001", {
            auth: {
                token: jwtToken,
            },
        });

        socketRef.current.on("message", (newMessage: Message) => {
            if ((newMessage.senderId === selectedUser && newMessage.receiverId === payload.id) || 
                (newMessage.receiverId === selectedUser && newMessage.senderId === payload.id)) {
                setMessages(prevMessages => [...prevMessages, newMessage]);
            }
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, [jwtToken, selectedUser, payload.id]);

    useEffect(() => {
        // Fetch messages between the logged-in user and the selected user
        const fetchMessages = async () => {
            if (selectedUser) {
                const response = await fetch(`http://localhost:3001/messages?senderId=${payload.id}&receiverId=${selectedUser}`);
                const data = await response.json();
                setMessages(data);
            }
        };

        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser, payload.id]);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message && selectedUser) {
            const newMessage: Message = {
                senderId: payload.id,
                receiverId: selectedUser,
                text: message,
                timestamp: new Date(),
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
            <h1>Logged in user: {payload.firstName} {payload.id}</h1>
            <div className="users-list">
                {users.map((user) => (
                    <div key={user.id} onClick={() => setSelectedUser(user.id)} className={`user-item ${selectedUser === user.id ? 'selected' : ''}`}>
                        {user.name}{user.id}
                        {/* Replace the hard-coded true value with actual online status if available */}
                        <OnlineIndicator online={true} />
                    </div>
                ))}
            </div>
            <div className="chat-container max-w-md mx-auto p-4 bg-white shadow-lg">
                <div className="messages overflow-y-auto h-80 mb-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="mb-2">
                            <p className={`text-sm ${msg.senderId === payload.id ? 'text-blue-500' : 'text-gray-800'}`}>{msg.text}</p>
                            <span className="text-gray-500 text-xs">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                                <OnlineIndicator online={true} />

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

const OnlineIndicator = ({ online }: { online: boolean }) => (
    <span style={{ color: online ? 'green' : 'red' }}>
        {online ? 'Online' : 'Offline'}
    </span>
);

export default Chatting;
