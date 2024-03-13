'use client'

import { useSocketContext } from "@/socket/socketContext";

export default function Conversation({conversation, selectedConvo, messages}: any) {
  console.log("congoooooo", messages)
    const {onlineUsers} = useSocketContext()
console.log("online users", onlineUsers)
    const isOnline = onlineUsers.includes(conversation._id)
  return (
    <div className="">
      <div className="flex flex-col min-w-12 md:flex-col md:gap-2 items-center">
        <div className="relative">
        <img src="/assets/person.jpeg"  className="rounded-full w-12 h-12"/>
        <p className="absolute bottom-0 right-0">{isOnline? <div className="bg-green-400 w-3 h-3 rounded-full"></div> : ""}</p>
        </div>
          <p className="text-xs">{conversation?.firstName}</p>
      </div>
    </div>
  );
}
