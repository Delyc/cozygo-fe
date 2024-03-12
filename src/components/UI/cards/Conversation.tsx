'use client'

import { useSocketContext } from "@/socket/socketContext";

export default function Conversation({conversation}: any) {
    const {onlineUsers} = useSocketContext()
console.log("online users", onlineUsers)
    const isOnline = onlineUsers.includes(conversation._id)
  return (
    <div className="px-5">
      <div className="flex gap-2 items-center">
        <img src="/assets/person.jpeg"  className="rounded-full w-12 h-12"/>
        <div>
            <p>{isOnline? 'Online' : "no"}</p>
          <p>{conversation?.firstName}</p>
        </div>
      </div>
    </div>
  );
}
