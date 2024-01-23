'use client'
import React, { useState } from 'react';

type SidebarProps = {
  setSelectedContent: (content: React.ReactNode) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ setSelectedContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to handle clicking on the expandable item
  const handleExpandableItemClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      // When not already expanded, clicking will expand and set content for the expandable item
      setSelectedContent(<h1>Expandable Item Content</h1>);
    }
  };

  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-indigo-600 h-full">
        <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="block p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
          Home
        </button>
        <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="block p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
          My Houses
        </button>
        {/* Expandable Menu Item */}
        <div className="mt-2">
          <button onClick={handleExpandableItemClick} className="block p-2 rounded text-white/80 w-full text-start hover:bg-black/20">
            Request
          </button>
          {isExpanded && (
            <div className="mt-1">
              <button onClick={() => setSelectedContent(<h1>Subitem 1 Content</h1>)} className="block p-2 w-full rounded hover:bg-black/20 text-start text-white/80 ml-4">
                Accepted
              </button>
              <button onClick={() => setSelectedContent(<h1>Subitem 2 Content</h1>)} className="block p-2 w-full rounded hover:bg-black/20 text-start text-white/80 ml-4">
                Rejected
              </button>
              {/* Add more subitems if needed */}
            </div>
          )}
        </div>

        <button onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)} className="block p-2 w-full text-white/80 text-start rounded hover:bg-black/20">
          Home
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
