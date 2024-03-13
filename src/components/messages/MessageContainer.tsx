
interface Message {
  id: string; // Assuming each message has a unique ID
  content: string; // The message text
  senderId: string; // The ID of the user who sent the message
  // Add more fields as necessary
}

import React, { useEffect, useState } from "react";
import Messages from "./Messages";
import getUserInfo from "@/helpers/getUserInfo";
import { useSocketContext } from "@/socket/socketContext";
import Button from "../UI/Button";
import { Call, Mail } from "../svgs/Heart";


const MessageContainer = ({ selectedConvo }: any) => {
  const [message, setMessage] = useState('');
  const [showAgentDetails, setShowAgentDetails] = useState(false)
  const [viewLanguage, setViewLanguage] = useState('en');
  const [messages, setMessages] = useState<Message[]>([]); // Initialize state with the correct type
  const [userInfo, setUserInfo] = useState("")
  useEffect(() => {
    return setUserInfo(getUserInfo());
  }, [])


  const { socket }: any = useSocketContext()
  useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage])
    })
    return () => socket?.off("newMessage")
  }, [socket, setMessages, messages])


  console.log("userInfo", userInfo)
  // Retrieve senderId, for example, from local storage
  const [user, setUser] = useState<any>()

  useEffect(() => {
    return setUser(getUserInfo())
  }, [])

  console.log("userrr", user)
  const senderId = user?._id; // Ensure this is securely managed in a real application
  console.log(selectedConvo?.id, "this is")
  // Function to fetch existing messages
  // Function to fetch existing messages
  const fetchMessages = async () => {
    if (!selectedConvo) {
      setMessages([]); // Clear messages if there's no selected conversation
      return;
    }

    // Clear messages before fetching new ones
    setMessages([]);

    // Assuming you have an API endpoint to fetch messages for a conversation
    try {
      const response = await fetch(`http://localhost:4000/api/messages/${senderId}/${selectedConvo._id}`);
      if (response.ok) {
        const fetchedMessages = await response.json();
        console.log({ fetchedMessages })
        setMessages(fetchedMessages); // Assuming this is an array of Message objects
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };




  useEffect(() => {
    fetchMessages();
  }, [selectedConvo]); // Refetch messages when selectedConvo changes

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedConvo || !senderId) return;

    const receiverId = selectedConvo._id; // Assuming selectedConvo has the receiver's ID

    try {
      const res = await fetch(`http://localhost:4000/api/messages/send/${senderId}/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary headers, like authorization tokens
        },
        body: JSON.stringify({ message }) // Sending the message content
      });

      if (res.ok) {
        const newMessage = await res.json(); // Assuming the response includes the new message
        setMessages(prevMessages => [...prevMessages, newMessage]); // Append the new message
        setMessage(''); // Clear message input after successful send
      } else {
        console.error("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };


  const noChat = !selectedConvo;
  return (
    <div className="w-full  overflow-y-scroll">
      <div>
       
      </div>
      {noChat ? <NoChatSelected /> :
        <div className=" xl:py-8 flex flex-col gap-4  justify-between h-full min-h-[80vh]  overflow-y-scroll">

          <div className="flex justify-between bg-white">
          <div onClick={() => setShowAgentDetails(!showAgentDetails)} className="flex items-center relative gap-1">
            <p>To:</p>
            <p>{selectedConvo?.firstName}</p>
            {showAgentDetails && <div className="bg-white py-5 rounded-lg shadow-2xl px-5 flex flex-col gap-2.5 absolute top-10 ">
              <div className="flex items-center gap-2 ">
                <img src="./assets/person.jpeg" className="w-16 h-16 rounded-full" />
                <div>

                  <p>{selectedConvo.firstName}</p>
                  <p className="text-xs text-primary_gray">Member since 2020</p>

                </div>
              </div>
              <div>
                <h1>Contact Agent</h1>
                <div className="flex flex-col gap-1">
                  <a href={`tel:`} className="flex items-center gap-1 text-xs text-primary_gray"><Call fill={"#757B8D"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} />07810993895</a>
                  <a href={`mailto:`} className="text-xs text-primary_gray flex items-center gap-1"><Mail fill={"#757B8D"} height={"20px"} width={"20px"} stroke={"none"} strokeWidth={0} />delyce35@gmail.com</a>
                </div>
              </div>
              <button className=" px-4 bg-white border border-indigo-600 text-indigo-600 text-xs py-2 rounded">View Houses From This Agent</button>
            </div>}
          </div>
          <select value={viewLanguage} onChange={(e) => setViewLanguage(e.target.value)}>
          {/* List of languages */}
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="rw">Kinyarwanda</option>
        </select>
          </div>
          <Messages messages={messages} viewLanguage={viewLanguage} />
          <div className=" w-full">

            <form onSubmit={sendMessage} className="relative w-full  ">
              <input
                type="text"
                placeholder="Message here ...."
                className="py-5 px-5 rounded-md w-full outline-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="absolute right-5 top-[30%]">
              <svg width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
  <circle cx="24" cy="23" r="5" stroke="#535358" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
  <path stroke="#535358" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M24 21v2l-1.5 1.5M29 3L3 15l12 2.5M29 3L15 17.5M29 3l-4.375 11.375M15 17.5l.625 2.875"/>
</svg>
              </button>
            </form>
          </div>
        </div>}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => <div>hollaaa</div>;
