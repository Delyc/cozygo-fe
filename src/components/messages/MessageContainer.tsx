
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
// Assuming Messages and MessageInput components exist
// Define your message type or interface if messages are more complex

const MessageContainer = ({ selectedConvo }: any) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]); // Initialize state with the correct type
  const [userInfo, setUserInfo] = useState("")
  useEffect(() => {
    return setUserInfo(getUserInfo());
}, [])


const {socket} : any = useSocketContext()
useEffect(() => {
    socket?.on("newMessage", (newMessage: any) => {
      setMessages([...messages, newMessage])
  
    })
  
    return () => socket?.off("newMessage")
   }, [socket, setMessages, messages])

   
console.log("userInfo", userInfo)
  // Retrieve senderId, for example, from local storage
  const user = JSON.parse(localStorage.getItem('chat-user') || "{}");

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
            console.log({fetchedMessages})
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
    <div className="w-full">
      {noChat ? <NoChatSelected /> :
        <div>
          <div className="flex items-center gap-1">
            <p>To:</p>
            <p>{selectedConvo?.firstName}</p>
          </div>

          <Messages messages={messages} /> 
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Message here ...."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => <div>hollaaa</div>;