// components/EmailInput.tsx or within your page file directly
import { decodeToken } from '@/helpers/decodeToken';
import React, { useState } from 'react';

const EmailInput: React.FC<{ userId: number }> = ({ userId }) => {
  const [recipientEmail, setRecipientEmail] = useState('');
const [formData, setFormData] = useState({})
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`http://localhost:8080/api/api/v1/wishlist/share/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'delyce35@gmail.com',
      });
console.log(response, "responseee")
      if (response.ok) {
        // Handle success
        alert('Wishlist shared successfully!');
        setRecipientEmail(''); // Reset email input after successful submission
      } else {
        // Handle errors
        alert('Failed to share wishlist. Please try again.');
      }
    } catch (error) {
      console.error('Error sharing wishlist:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="email"
        placeholder="Enter your email"
        className="border rounded p-2"
        name='recipientEmail'
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Send
      </button>
    </form>
  );
};

export default EmailInput;
