import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';

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
  
    newSocket.on('newMessage', (message: any) => {
      if (message.receiverId === userId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [message.senderId]: (prev[message.senderId] || 0) + 1,
        }));
  
        toast(`${message.senderName || 'Someone'}: ${message.content}`, {
          icon: '💬',
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
