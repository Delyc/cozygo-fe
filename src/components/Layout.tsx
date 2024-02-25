import React, { useState, ReactNode } from 'react';
import Sidebar from './layout/Sidebar';
import HomeDash from './dashboard/Home';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedContent, setSelectedContent] = useState<ReactNode>(children);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<any>(true);

  return (
    <div className="flex h-screen overflow-x-hidden bg-gray-100 relative w-full">
       <header className="fixed top-0 z-50 bg-white shadow w-full">
            <div className="px-4 py-2">
              {/* Content of the header */}
              <h1 className="text-lg text-red-500 font-semibold">Sticky Header</h1>
            </div>
          </header>
     
      <div className=" flex overflow-hidden w-full justify-between">
        {/* <h1>test</h1> */}
        {/* Sidebar is positioned absolutely relative to this container */}
        <Sidebar setSelectedContent={setSelectedContent}  setIsSidebarExpanded={setIsSidebarExpanded} isSidebarExpanded={isSidebarExpanded}/>
        {/* Main content area with padding for sidebar */}
        {/* <div className='bg-red-500 h-screen w-full'>

        </div> */}
        {/* <div className={` overflow-y-scroll  ${isSidebarExpanded ? 'w-full' : 'w-full'}`}> */}
          {/* Sticky Header */}
          {/* <header className="fixed top-0 z-50 bg-white shadow w-full"> */}
            {/* <div className="px-4 py-2"> */}
              {/* Content of the header */}
              {/* <h1 className="text-lg font-semibold">Sticky Header</h1> */}
            {/* </div> */}
          {/* </header> */}
          {/* Main Content */}
         
          <main className={`overflow-y-scroll ${isSidebarExpanded? 'w-full flex justify-end lg:justify-start pr-5' : ' w-full pr-5 flex justify-end ml-20'}`}>
         
            {/* <div className={`flex md:flex md:flex-row   ${isSidebarExpanded ? 'w-full bg-orange-5 00  justify-end  absolute right-5 md:right-7 lg:bg-green-500': 'bg-yellow-500  justify-end pr-3 md:pr-7'} `}> */}
              {selectedContent ? selectedContent : ''}

            {/* </div> */}
          </main>
        </div>
      </div>
  );
};

export default Layout;
