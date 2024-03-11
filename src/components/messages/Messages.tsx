import Message from "./Message"
import { useSocketContext } from "@/socket/socketContext"
import { useEffect } from "react"

const Messages =({messages}: any) => {


    return(
        <div className="flex flex-col overflow-y-auto gap-2 bg-red-500 w-full">

            {messages.map((message: any) => (

            <Message key={message?._id} message={message}/>

                ))}
            
        </div>
    )
}

export default Messages