"use client";
import Layout from "@/components/Layout";
import HomeDash from "@/components/dashboard/Home";
import React, { useState } from "react";
const MainPage: React.FC = () => {
  const [selectedContent, setSelectedContent] = useState("Dashboard");

  // Function to render content based on the state

  return (
    <Layout>
      <div className="flex justify-center gap-20 ">
        <HomeDash />
      </div>
    </Layout>
  );
};

export default MainPage;
