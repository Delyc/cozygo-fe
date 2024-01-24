'use client'
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Layout from '@/components/Layout';
import HomeDash from '@/components/dashboard/Home';
import MessageList from '@/components/dashboard/Message';
const MainPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState('Dashboard');

  // Function to render content based on the state

  return (
    <Layout>
      <div className="content">
   
<div className='flex gap-20'>


</div>
      </div>
    </Layout>
  );
};

export default MainPage;
