'use client'

import { useSocketContext } from "@/socket/socketContext";

export default function Conversation({conversation, selectedConvo, messages}: any) {

    const {onlineUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
  return (
    <div className="border-b border-slate-200 w-full py-2">
      <div className="flex flex-col min-w-12 md:flex-row xl:px-5 md:gap-3 items-center ">
        <div className="relative">
        <img src={conversation?.profilePictureUrl}  className="rounded-full w-12 h-12"/>
        <p className="absolute bottom-0 right-0">{isOnline? <div className="bg-green-400 w-3 h-3 rounded-full"></div> : ""}</p>
        </div>
          <p className="text-sm font-medium">{conversation?.fullname}</p>
      </div>
    </div>
  );
}
