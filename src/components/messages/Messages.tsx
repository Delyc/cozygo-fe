import Message from "./Message"
import { useSocketContext } from "@/socket/socketContext"
import { useEffect } from "react"

const Messages =({messages, viewLanguage}: any) => {
    return(
        <div className="flex flex-col   overflow-y-auto h-full  gap-2 px-10 w-full">
            {
  messages.length > 0 ? (
    messages.map((message: any) => (
      <Message key={message.id} message={message} viewLanguage={viewLanguage} />
    ))
  ) : (
   <div className="flex flex-col gap-5 items-center justify-center h-full">
    <h1 className="text-primary_gray w-2/5 text-center text-lg">You haven't chatted with this agent yet. Send a message to start the conversation!</h1>
    <svg width="30px" height="30px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4f46e5" d="M9 0a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm3.5 3A1.5 1.5 0 1 1 11 4.5 1.5 1.5 0 0 1 12.5 3zm-7 0A1.5 1.5 0 1 1 4 4.5 1.5 1.5 0 0 1 5.5 3zM9 15a6 6 0 0 1-6-6 1 1 0 0 1 2 0 4 4 0 0 0 8 0 1 1 0 0 1 2 0 6 6 0 0 1-6 6z"/>
</svg>
{/* <svg fill="#4f46e5" width="100px" height="100px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <title>happy-face-line</title>
    <path d="M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z" className="clr-i-outline clr-i-outline-path-1"></path><circle cx="10.89" cy="13.89" r="2" className="clr-i-outline clr-i-outline-path-2"></circle><circle cx="25.05" cy="13.89" r="2" className="clr-i-outline clr-i-outline-path-3"></circle><path d="M18.13,28.21a8.67,8.67,0,0,0,8.26-6H9.87A8.67,8.67,0,0,0,18.13,28.21Z" className="clr-i-outline clr-i-outline-path-4"></path>
    <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
</svg> */}
    </div>
  )
}

        </div>
    )
}

export default Messages