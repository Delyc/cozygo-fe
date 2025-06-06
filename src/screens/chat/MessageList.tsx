import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Check, CheckCheck } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content?: string;
  images?: { url: string }[];
  createdAt: string;
  status?: 'SENT' | 'DELIVERED' | 'READ';
}

interface MessagesListProps {
  messages: Message[];
  currentUserId: string;
}

export default function MessagesList({ messages, currentUserId }: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
      {messages.map((msg) => {
        const isSender = msg.senderId === currentUserId;
        return (
          <div key={msg.id} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-sm px-4 py-2 rounded-xl ${
                isSender ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content && <p>{msg.content}</p>}

              {msg.images && msg.images.length > 0 && (
                <PhotoProvider>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.images.map((img, i) => (
                      <PhotoView key={i} src={img.url}>
                        <Image
                          src={img.url}
                          alt={`attachment-${i}`}
                          width={150}
                          height={150}
                          className="rounded-md border object-cover cursor-pointer min-h-[150px]"
                        />
                      </PhotoView>
                    ))}
                  </div>
                </PhotoProvider>
              )}

              <div className="flex gap-1 justify-end items-center mt-1">
                <span className="text-xs opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>

                {isSender && (
                  <span className="ml-1">
                    {msg.status === 'SENT' && <Check className="text-gray-300 w-4 h-4" />}
                    {msg.status === 'DELIVERED' && <CheckCheck className="text-gray-300 w-4 h-4" />}
                    {msg.status === 'READ' && <CheckCheck className="text-blue-500 w-4 h-4" />}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}
