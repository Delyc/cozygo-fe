'use client'

import getToken from "@/helpers/getToken";
import getUserInfo from "@/helpers/getUserInfo";
import { createContext, useState, useEffect, useContext } from "react";
import io from 'socket.io-client'
export const SocketContext  = createContext({});

export const useSocketContext= (): any => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}: any) => {
    const [socket, setSocket] = useState<any>(null)
    const [onlineUsers, setOnlineUsers] = useState([])
  const [user, setUser] = useState<any>("")
  useEffect(() => {
    return setUser(getUserInfo());
}, [])

// console.log("userInfo", userInfo)

    // const user = JSON.parse(localStorage.getItem('chat-user')|| "");

    useEffect(() => {
     if(user){
        const socket = io("http://localhost:4000", {
            query:{
                userId : user?._id
            }
        })
        setSocket(socket)
        socket.on("getOnlineUsers", (users) => {
  setOnlineUsers(users)
        })
        // return()=> socket.close()
     }else{
        if(socket){
            socket.close();
            setSocket(null)
        }
     }

    }, [user])
    return(
<SocketContext.Provider value={{socket, onlineUsers}}>
    {children}
</SocketContext.Provider>
    )
}