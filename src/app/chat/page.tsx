'use client';

import { useEffect, useState, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import Navbar from '@/components/organisms/Navbar';
import { useFetchUsers } from '@/services/hooks/auth';
import { Profile } from '@/types/types';
import { Check, CheckCheck, Send } from 'lucide-react';
import Image from 'next/image';
import { decodeToken } from '@/helpers/decodeToken';
import toast from 'react-hot-toast';

const Chat = () => {
    const { socket, unreadCounts, resetUnreadCount } = useSocket();
    const { data: users = [] } = useFetchUsers();

    const [selectedChat, setSelectedChat] = useState<Profile | undefined>();
    const [messages, setMessages] = useState<any[]>([]);
    const [token, setToken] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const user = token ? decodeToken(token) : null;
    const userId = user?.userId || '';

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    useEffect(() => {
        if (users.length > 0 && !selectedChat) {
            setSelectedChat(users[0]);
        }
    }, [users]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Fetch chat history
    useEffect(() => {
        if (!selectedChat || !userId || !token) return;

        fetch(`http://localhost:8000/api/chat/${userId}/${selectedChat.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => {
                setMessages(data);
            })
            .catch(console.error);
    }, [selectedChat, userId, token]);

    // Join socket and handle events
    useEffect(() => {
        if (!socket || !userId) return;

        socket.emit('join', { userId });

        socket.on('userOnline', ({ userId: onlineId }) => {
        });

        socket.on('userOffline', ({ userId: offlineId }) => {
        });



        socket.on('newMessage', (message) => {
            const isCurrentChat =
                (message.senderId === selectedChat?.id && message.receiverId === userId) ||
                (message.senderId === userId && message.receiverId === selectedChat?.id);
        
            if (isCurrentChat) {
                setMessages(prev => [...prev, message]);
                resetUnreadCount(message.senderId);
        
                // If current chat is open, tell server it's been READ
                if (message.receiverId === userId) {
                    socket.emit('markAsRead', { messageId: message.id });
                }
            } else if (message.receiverId === userId) {
                const sender = usersState.find(u => u.id === message.senderId);
                toast(`${sender?.username || 'Someone'}: ${message.content}`, {
                    icon: '💬',
                });
            }
        });

        socket.on('messageStatusUpdated', ({ messageId, status }) => {
            setMessages(prev =>
              prev.map(msg => msg.id === messageId ? { ...msg, status } : msg)
            );
          });
          
        

        return () => {
            socket.off('userOnline');
            socket.off('userOffline');
            socket.off('newMessage');
        };
    }, [socket, userId, selectedChat, users, resetUnreadCount]);

    // Mark messages as read
    useEffect(() => {
        if (!socket || !selectedChat || !userId) return;

        const unreadMessages = messages.filter(
            m => m.receiverId === userId && m.senderId === selectedChat.id && m.status !== 'READ'
        );

        if (unreadMessages.length > 0) {
            socket.emit('markAsRead', {
                messageIds: unreadMessages.map(m => m.id),
            });
        }
    }, [messages, selectedChat, socket, userId]);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const input = e.currentTarget.elements[0] as HTMLInputElement;
        const text = input.value.trim();
        if (!text || !socket || !selectedChat) return;
    
        const message = {
            content: text,
            receiverId: selectedChat.id,
        };
    
        socket.emit('sendMessage', message); 
    
        input.value = '';
    };
    

    return (
        <>
            <Navbar />
            <div className="pt-24 flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="overflow-y-auto bg-white w-72 p-5 flex flex-col gap-4 border-r">
                    <div className="text-right text-sm text-gray-500 px-6 pt-4">
                        {Object.values(unreadCounts).reduce((a, b) => a + b, 0)} unread messages
                    </div>

                    {users.map((person: Profile) => (
                        <div
                            key={person.id}
                            onClick={() => {
                                setSelectedChat(person);
                                resetUnreadCount(person.id);
                            }}
                            className={`${selectedChat?.id === person.id ? 'bg-blue-100' : ''
                                } flex gap-2 items-center text-gray-700 cursor-pointer hover:bg-slate-100 rounded p-2`}
                        >
                            <div className="relative">
                                <Image
                                    src={person.avatarUrl ?? '/default-avatar.png'}
                                    alt="profile"
                                    width={50}
                                    height={50}
                                    className="w-12 h-12 rounded-full"
                                />
                                {person?.isOnline && (
                                    <div className="bg-green-500 h-3 w-3 rounded-full absolute top-0"></div>
                                )}
                            </div>
                            <p>
                                {person.username}
                                {unreadCounts[person.id] > 0 && (
                                    <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
                                        {unreadCounts[person.id]}
                                    </span>
                                )}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-slate-100 justify-between">
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-sm px-4 py-2 rounded-xl ${msg.senderId === userId
                                            ? 'bg-blue-900 text-white'
                                            : 'bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    <p>{msg.content}</p>
                                    <div className='flex gap-1 justify-end items-center'>
                                        <span className="text-xs opacity-70 mt-1">
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </span>
                                        {msg.senderId === userId && (
                                            <span className="ml-1">
                                                {msg.status === 'DELIVERED' && <CheckCheck className='text-gray-300 w-4 h-4 mt-1' />}
                                                {msg.status === 'SENT' && <CheckCheck className='text-gray-300 w-4 h-4 mt-1' />}
                                                {msg.status === 'READ' && <CheckCheck className='text-blue-500 w-4 h-4 mt-1' />}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 w-4/5 mx-auto mb-10">
                        <form onSubmit={sendMessage} className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="flex-1 text-gray-500 bg-white rounded-full px-4 py-3 outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-blue-900 text-white px-6 py-2 rounded-full flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;
