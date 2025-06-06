import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { MessageCircleMore } from 'lucide-react';
import { Message } from '@/types/types';

type UnreadCounts = Record<string, number>;

interface SocketContextValue {
  socket: Socket | null;
  unreadCounts: UnreadCounts;
  resetUnreadCount: (userId: string) => void;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider = ({ children, userId }: { children: React.ReactNode; userId: string }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<UnreadCounts>({});

  useEffect(() => {
    if (!userId) return;

    const newSocket = io('http://localhost:8000', {
      query: { userId },
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected:', newSocket.id, 'as user', userId);
    });

    newSocket.on('newMessage', (message: Message) => {
      if (message.receiverId === userId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.senderId]: (prev[message.senderId] || 0) + 1,
        }));

        toast(`${message.senderName || 'Someone'}: ${message.content}`, {
          icon: <div className='bg-blue-900 rounded-full w-8 h-8'> <MessageCircleMore className='text-white ' /></div>,
        });
      }
    });

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [userId]);


  const resetUnreadCount = (chatUserId: string) => {
    setUnreadCounts((prev) => {
      const copy = { ...prev };
      delete copy[chatUserId];
      return copy;
    });
  };

  return (
    <SocketContext.Provider value={{ socket, unreadCounts, resetUnreadCount }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) throw new Error('useSocket must be used within a SocketProvider');
  return context;
};
