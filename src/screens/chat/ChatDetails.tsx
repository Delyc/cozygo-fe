'use client'

import Image from 'next/image';
import { User } from '@/types/types';
import { Images, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFetchChatImages } from '@/services/hooks/chat';
import { decodeToken } from '@/helpers/decodeToken';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface SidebarProps {
    selectedChatId?: string;
    setChatDetails?: (value: boolean) => void;
    selectedUser?: User
}

export default function ChatDetails({ selectedUser, setChatDetails }: SidebarProps) {
    const [token, setToken] = useState('');
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);


    const user = token ? decodeToken(token) : null;

    const { images } = useFetchChatImages(
        selectedUser?.id ?? '',
        user?.userId ?? ''
    );

    return (
        <div className="overflow-y-auto bg-white  p-5 flex flex-col gap-4 border-r">
            <div className='flex gap-2 items-center'>

                <X onClick={() => setChatDetails?.(false)} className='text-black' />
                <p className='text-gray-500'>Contact info</p>
            </div>
            <div className="flex flex-col gap-2 items-center ">
                <Image
                    src={selectedUser?.avatarUrl ?? '/assets/hero.png'}
                    alt="profile"
                    width={200}
                    height={200}
                    className="rounded-full"
                />
                <p className='text-blue-900'>{selectedUser?.username}</p>
            </div>
            <div className='h-[1px] w-full bg-neutral-100'></div>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2 mt-5 pr-2'>
                    <Images className='text-gray-500' />
                    <p className='text-gray-500'>Media</p>
                </div>
                <p className='text-gray-500'>{images?.length}</p>
            </div>

            <PhotoProvider>
                <div className="flex flex-wrap gap-2 mt-2 w-[24rem]">
                    {images?.map((img, i) => (
                        <PhotoView key={i} src={img.url}>
                            <Image
                                src={img.url}
                                alt={`attachment-${i}`}
                                width={185}
                                height={185}
                            />
                        </PhotoView>
                    ))}
                </div>
            </PhotoProvider>

        </div>
    );
}
