// pages/index.tsx
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const router = useRouter(); // Initialize useRouter

  const fetchHouses = async () => {
    const BASE_URL = 'http://localhost:8080/api/v1/getAllHouses';
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch houses');
      }
      const data = await response.json();
      setHouses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  // Function to handle button click
  // Inside your handleMessageAgentClick function
const handleMessageAgentClick = (agentId: any, agentName: any) => {
    // Store agent details in localStorage
    localStorage.setItem('selectedAgent', JSON.stringify(agentId));
    localStorage.setItem('agentName', JSON.stringify(agentName));
    
    // Navigate to the chat page
    router.push('/chatt');
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Houses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {houses.map((house: any, index) => (
          <div key={index} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{house?.title}</h2>
            <p>{house?.price}</p>
            <p>{house?.agentId}</p>
            {/* Update the button to call handleMessageAgentClick with the agent's id and firstName */}
            <button onClick={() => handleMessageAgentClick(house.agentId, house.agentName)} className='border p-4'>
              Message agent
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;
