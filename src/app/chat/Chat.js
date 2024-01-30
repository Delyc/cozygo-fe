import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect("http://localhost:8000"); // Your server URL

        socketRef.current.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => socketRef.current.disconnect();
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socketRef.current.emit("sendMessage", { text: message, timestamp: new Date() });
            setMessage('');
        }
    };

    // Automatically scroll to the latest message
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    return (
<div className="chat-container max-w-md mx-auto p-4 bg-white shadow-lg">
    <div className="messages overflow-y-auto h-80 mb-4">
        {messages.map((msg, index) => (
            <div key={index} className="mb-2">
                <p className="text-gray-800 text-sm">{msg.text}</p>
                <span className="text-gray-500 text-xs">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
        ))}
        <div ref={messagesEndRef} />
    </div>
    <form onSubmit={sendMessage} className="flex">
        <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-2 border-gray-300 p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Send</button>
    </form>
</div>

    );
};

export default Chat;
