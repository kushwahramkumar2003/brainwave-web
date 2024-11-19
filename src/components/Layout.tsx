import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
