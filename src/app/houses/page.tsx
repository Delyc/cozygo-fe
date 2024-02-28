// pages/index.tsx
"use client";
import { useRouter } from "next/navigation"; // Import useRouter

const Houses = () => {
  const router = useRouter(); // Initialize useRouter

  // Function to handle button click
  // Inside your handleMessageAgentClick function
  const handleMessageAgentClick = (agentId: any, agentName: any) => {
    // Store agent details in localStorage
    localStorage.setItem("selectedAgent", JSON.stringify(agentId));
    localStorage.setItem("agentName", JSON.stringify(agentName));

    // Navigate to the chat page
    router.push("/chatt");
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Houses</h1>
    </div>
  );
};

export default Houses;
