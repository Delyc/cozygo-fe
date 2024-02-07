
// 'use client'

// import React, { useState, useEffect } from 'react';
// import Chatting from '@/app/chatting/page';
// import Login from '@/app/login/page';
// import jwt from 'jsonwebtoken';


// const ChatApp = () => {
//     console.log('componentttt')
//     const [jwtToken, setJwtToken] = useState<string | null>(null);
//     const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

//     const handleLogin = (token: string) => {
//         setJwtToken(token);
//         // Here, extract the user ID from the token or login response
//         // For now, I'm using a placeholder
//         // Replace this with real logic to extract the user ID
//         const userId = extractUserIdFromToken(token); // Implement this function based on your token structure
//         console.log(userId, "user idddddddd")
//         setLoggedInUserId(userId);
//     };

//     useEffect(() => {
//         // If you store the token in localStorage, you can also retrieve it on component mount
//         const token = localStorage.getItem('jwtToken');
//         if (token) {
//             setJwtToken(token);
//             const userId = extractUserIdFromToken(token); // Implement this function
//             setLoggedInUserId(userId);
//         }
//     }, []);

//     if (!jwtToken || loggedInUserId === null) {
//         return <Login onLogin={handleLogin} />;
//     }

//     return <Chatting jwtToken={jwtToken} loggedInUserId={loggedInUserId} payload={paylo}/>;
// };

// export default ChatApp;

// function extractUserIdFromToken(token: string) {
//     try {
//         // Decode the JWT token
//         const decodedToken = jwt.decode(token) as { [key: string]: any } | null;

//         // Check if decodedToken is null
//         if (decodedToken === null) {
//             console.error('Token is invalid or could not be decoded.');
//             return null;
//         }
// console.log(decodedToken, 'decodedddddddddddddd')
//         // Extract the user ID from the decoded payload (adjust this based on your token structure)
//         const userId = decodedToken.userId;

//         return userId;
//     } catch (error) {
//         console.error('Error decoding token:', error);
//         return null; // Return null or handle the error appropriately
//     }
// }


