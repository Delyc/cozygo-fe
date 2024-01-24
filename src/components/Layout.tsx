import React, { useState, ReactNode } from 'react';
import Sidebar from './layout/Sidebar';
import { Message } from './svgs/Heart';
import MessageList from './dashboard/Message';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState<ReactNode>(children);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setSelectedContent={setSelectedContent} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <header className="sticky top-0 z-10 bg-white shadow">
          <div className="px-4 py-2">
            {/* Content of the header */}
            <h1 className="text-lg font-semibold">Sticky Header</h1>
          </div>
        </header>
        {/* Main Content */}

      
        <main className="flex-1 overflow-auto px-44">
        <div className='flex gap-20'>
        {selectedContent}
<div>
<MessageList />
</div>

</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
