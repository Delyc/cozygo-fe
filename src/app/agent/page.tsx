'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Layout from '@/components/Layout';
import HomeDash from '@/components/dashboard/Home';
import MessageList from '@/components/dashboard/Message';
const MainPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState('Dashboard');

  // Function to render content based on the state
  const renderContent = () => {
    switch (selectedContent) {
      case 'Dashboard':
        return <h1>Dashboard Content</h1>;
      case 'Dashboard1':
        return <h1>Dashboard 1 Content</h1>;
      case 'Dashboard2':
        return <h1>Dashboard 2 Content</h1>;
      default:
        return <h1>Default Content</h1>;
    }
  };

  return (
    <Layout>
      {/* <Sidebar setSelectedContent={setSelectedContent} /> */}
      <div className="content">
        {/* Render the content based on the selected item */}
        {/* {renderContent()} */}
<div className='flex gap-20'>
{/* <HomeDash /> */}

{/* <div className='bg-white rounded-xl w-[25rem] h-[50rem]'>
<MessageList />
</div> */}

</div>
      </div>
    </Layout>
  );
};

export default MainPage;
