import Message from "./Message"
import { useSocketContext } from "@/socket/socketContext"
import { useEffect } from "react"

const Messages =({messages, viewLanguage}: any) => {
    return(
        <div className="flex flex-col overflow-y-auto gap-2  w-full">
            {messages.map((message: any) => (
            <Message key={message.id} message={message} viewLanguage={viewLanguage} />
                ))}
        </div>
    )
}

export default Messages