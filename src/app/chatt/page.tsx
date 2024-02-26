
// 'use client'

// import React, { useState, useEffect } from 'react';
// import Chatting from '@/app/chatting/page';
// import Login from '@/app/login/page';
// import jwt from 'jsonwebtoken';


// const Chatt = () => {
//     console.log('componentttt')
//     const [jwtToken, setJwtToken] = useState<string | null>(null);
//     const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
//     const [userInfo, setUserInfo] = useState({});

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
//     console.log(token, 'jwt token');
    
//     if (token) {
//         setJwtToken(token);
//         const userId = extractUserIdFromToken(token); // Call the function to extract user ID
//         console.log(userId, "test");
//         setLoggedInUserId(userId);
//         const payload = extractUserIdFromToken(token)
//         setUserInfo(payload)
//     }
//     }, []);

   
    
//     function extractUserIdFromToken(token: any) {
//         // Decode the JWT token
//         const base64Url = token.split('.')[1]; // Get the payload part of the token
//         const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters with regular base64 characters
//         const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//         }).join(''));
    
//         const payload = JSON.parse(jsonPayload);
//         console.log(payload, "payloadddddd")
    
//         // Adjust the key according to your token's payload structure
//         const userId = payload.id  // Example keys, use the actual key from your JWT payload
//         return payload;
//     }
    
//     if (!jwtToken || loggedInUserId === null) {
//         return <Login onLogin={handleLogin} />;
//     }

//     return <Chatting jwtToken={jwtToken} loggedInUserId={loggedInUserId} payload={userInfo}/>;
// };

// export default Chatt;




