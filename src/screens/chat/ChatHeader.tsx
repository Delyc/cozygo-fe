import Image from 'next/image';
import { Phone, Video } from 'lucide-react';
import { User } from '@/types/types';

interface SidebarProps {
    selectedChatId?: string;
    setChatDetails?: (value: boolean) => void;
    chatDetails?: boolean;
    selectedUser?: User
}

export default function ChatHeader({ selectedUser, setChatDetails, chatDetails }: SidebarProps) {
    return (
        <div className="overflow-y-auto bg-white w-full p-5 flex justify-between  gap-4 border-r">
            <div className="flex items-center gap-2"
                onClick={() => setChatDetails?.(!chatDetails)}>
                <Image
                    src={selectedUser?.avatarUrl ?? '/default-avatar.png'}
                    alt="profile"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <p className='text-gray-500'>{selectedUser?.username}</p>
                    <p className={`text-xs  ${selectedUser?.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                        {selectedUser?.isOnline ? 'online' : 'offline'}
                    </p>
                </div>
            </div>

            <div className='flex items-center gap-4 pr-2'>
                <Phone className='text-gray-500 w-6 h-6' />
                <Video className='text-gray-500 w-6 h-6' />
            </div>

        </div>
    );
}
