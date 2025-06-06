'use client'

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/context/SocketContext';
import { useFetchUsers, useRequireAuth } from '@/services/hooks/auth';
import { decodeToken } from '@/helpers/decodeToken';
import { uploadMultipleToCloudinary } from '@/helpers/cloudinaryUpload';

import MessagesList from '@/screens/chat/MessageList';
import ChatInput from '@/screens/chat/ChatInput';
import Contacts from '@/screens/chat/Contacts';
import Link from 'next/link';
import { LayoutGrid, HousePlus, MessageCircleMore } from 'lucide-react';
import ChatHeader from '@/screens/chat/ChatHeader';
import ChatDetails from '@/screens/chat/ChatDetails';
import { Message, User } from '@/types/types';

const Chat = () => {
    useRequireAuth();
    const { socket, unreadCounts, resetUnreadCount } = useSocket();
    const { data: users = [] } = useFetchUsers();

    const [selectedChat, setSelectedChat] = useState<User | undefined>(users[0]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [token, setToken] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [chatDetails, setChatDetails] = useState<boolean | undefined>(false)

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
    }, [users, selectedChat]);

    // Fetch messages on chat select
    useEffect(() => {
        if (!selectedChat || !userId || !token) return;

        fetch(`http://localhost:8000/api/chat/${userId}/${selectedChat.id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((msgs) => {
                setMessages(msgs);

                // Mark unread messages as read after fetching
                const unreadMsgIds = msgs
                    .filter(
                        (m: Message) =>
                            m.receiverId === userId && m.status !== 'READ'
                    )
                    .map((m: Message) => m.id);

                if (socket && unreadMsgIds.length > 0) {
                    socket.emit('markAsRead', { messageIds: unreadMsgIds });
                }
            })
            .catch(console.error);
    }, [selectedChat, userId, token, socket]);

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage: Message) => {
            const isCurrentChat =
                (newMessage.senderId === selectedChat?.id && newMessage.receiverId === userId) ||
                (newMessage.senderId === userId && newMessage.receiverId === selectedChat?.id);

            if (isCurrentChat) {
                setMessages(prev => [...prev, newMessage]);
                resetUnreadCount(newMessage.senderId);

                if (newMessage.receiverId === userId) {
                    socket.emit('markAsRead', { messageIds: [newMessage.id] });
                }
            }
            //   else if (newMessage.receiverId === userId) {
            //     toast(`${newMessage.username}: ${newMessage.content}`, { icon: '💬' });
            //   }
        };

        const handleMessageStatusUpdated = ({ messageId, status }: { messageId: string; status: 'SENT' | 'DELIVERED' | 'READ' }) => {
            setMessages(prev =>
                prev.map(msg => (msg.id === messageId ? { ...msg, status } : msg))
            );
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('messageStatusUpdated', handleMessageStatusUpdated);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('messageStatusUpdated', handleMessageStatusUpdated);
        };
    }, [socket, selectedChat, userId, resetUnreadCount]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        setIsUploading(true);
        const filesArray = Array.from(e.target.files);
        try {
            const urls = await uploadMultipleToCloudinary(filesArray);
            setImageUrls(urls);
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setIsUploading(false);
        }
    };

    const sendMessage = (content: string, images: string[]) => {
        if (!socket || !selectedChat) return;
        if (!content && images.length === 0) return;

        socket.emit('sendMessage', {
            content,
            receiverId: selectedChat.id,
            images,
        });
        setInputValue('');
        setImageUrls([]);
    };


    const isScrolled = false
    const isMobileMenuOpen = false
    return (
        <>
            <div className=" bg-slate-100 flex h-screen overflow-hidden">
                <div className='flex flex-col gap-4 px-4 py-4'>
                    <Link href="/" className={`${isScrolled || isMobileMenuOpen ? 'text-blue-950' : 'text-white'} md:text-blue-950 flex items-center gap-1`}> <LayoutGrid className="w-5 h-5" /> </Link>
                    <Link href="/houses" className={`${isScrolled ? 'text-blue-950' : 'text-white'} md:text-blue-950 flex items-center gap-1`}><HousePlus className="w-5 h-5" /></Link>
                    <Link href="/chat" className={`${isScrolled ? 'text-blue-950' : 'text-white'} md:text-blue-950 relative flex items-center gap-1`}>
                        <MessageCircleMore className="w-5 h-5" />
                        {Object.values(unreadCounts).some(count => count > 0) && (
                            <span className="bg-red-500 absolute -top-2 -right-5 rounded-full text-white grid place-content-center w-5 h-5 font-medium text-xs">
                                {Object.values(unreadCounts).reduce((a, b) => a + b, 0)}
                            </span>
                        )}
                    </Link>
                </div>
                <Contacts
                    users={users}
                    unreadCounts={unreadCounts}
                    selectedChatId={selectedChat?.id}
                    onSelectUser={(user) => {
                        setSelectedChat(user);
                        resetUnreadCount(user.id);
                    }}
                />

                <div className='flex w-full'>


                    <div className="flex flex-col flex-1 ">
                        <ChatHeader selectedUser={selectedChat} setChatDetails={setChatDetails} chatDetails={chatDetails} />
                        <MessagesList messages={messages} currentUserId={userId} />
                        <ChatInput
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            imageUrls={imageUrls}
                            onFilesSelected={handleFilesSelected}
                            onSend={sendMessage}
                            isUploading={isUploading}
                        />

                        <div ref={messagesEndRef} />
                    </div>

                    {chatDetails && <ChatDetails selectedUser={selectedChat} setChatDetails={setChatDetails} />}


                </div>
            </div>
        </>
    );
};

export default Chat;
