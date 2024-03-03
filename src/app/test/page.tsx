'use client'

import { useState } from 'react';
import axios from 'axios';

const WishlistShare = () => {
  const [email, setEmail] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleShareClick = () => {
    setShowInput(true);
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(`https://capstoneapi-production-b1ec.up.railway.app/api/v1/wishlist/share?user_id=1&recipientEmail=${email}`);
      console.log('Request successful', response.data);
      // Handle response here
    } catch (error) {
      console.error('Request failed', error);
      // Handle error here
    }
  };

  return (
    <div>
      <button onClick={handleShareClick}>Share Wishlist</button>
      {showInput && (
        <div>
          <input
            type="email"
            placeholder="Enter recipient's email"
            value={email}
            onChange={handleEmailChange}
          />
          <button onClick={handleSendRequest}>Send</button>
        </div>
      )}
    </div>
  );
};

export default WishlistShare;
