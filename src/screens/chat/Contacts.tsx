import Image from 'next/image';
import { User } from '@/types/types';
import { Search } from 'lucide-react';

interface SidebarProps {
  users: User[];
  unreadCounts: Record<string, number>;
  selectedChatId?: string;
  onSelectUser: (user: User) => void;
}

export default function Contacts({ users, unreadCounts, selectedChatId, onSelectUser }: SidebarProps) {
  return (
    <div className="overflow-y-auto bg-white w-72 p-5 flex flex-col gap-4 border-r">
      <div className='bg-slate-100 rounded-full w-full flex gap-2 py-2 px-4'>
        <Search className='text-black w-4 h-4' />
        <input placeholder="Search or start a new chat" className='text-black text-xs outline-none' />
      </div>

      {users.map((person) => (
        <div
          key={person.id}
          onClick={() => onSelectUser(person)}
          className={`flex gap-2 items-center text-gray-700 cursor-pointer hover:bg-slate-100 rounded p-2 ${selectedChatId === person.id ? 'bg-blue-100' : ''
            }`}
        >
          <div className="relative">
            <Image
              src={person.avatarUrl ?? '/default-avatar.png'}
              alt="profile"
              width={50}
              height={50}
              className="w-12 h-12 rounded-full"
            />
            {person.isOnline && <div className="bg-green-500 h-3 w-3 rounded-full absolute top-0"></div>}
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
  );
}
