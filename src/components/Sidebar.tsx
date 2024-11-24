import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Brain,
  Twitter,
  Video,
  FileText,
  Link2,
  Hash,
  ChevronLeft,
  Menu,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  onMobileClose?: () => void;
}

interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  href: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { id: "home", icon: <Brain size={20} />, label: "Home", href: "/b" },
    {
      id: "tweets",
      icon: <Twitter size={20} />,
      label: "Tweets",
      href: "/b/tweets",
    },
    {
      id: "videos",
      icon: <Video size={20} />,
      label: "Videos",
      href: "/b/videos",
    },
    {
      id: "documents",
      icon: <FileText size={20} />,
      label: "Documents",
      href: "/b/documents",
    },
    {
      id: "links",
      icon: <Link2 size={20} />,
      label: "Links",
      href: "/b/links",
    },
    { id: "tags", icon: <Hash size={20} />, label: "Tags", href: "/b/tags" },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
    if (onMobileClose && !isMobileOpen) {
      onMobileClose();
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      <button
        onClick={toggleMobileSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md lg:hidden ${
          isMobileOpen && "hidden"
        }`}
      >
        <Menu size={20} />
      </button>

      <aside
        className={`
          fixed top-0 left-0 z-40
          h-full bg-white shadow-lg
          transition-all duration-300 ease-in-out
          flex flex-col
          ${isCollapsed ? "w-16" : "w-64"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${className}
        `}
      >
        <div className="flex items-center p-4 h-16 border-b">
          <Brain className="w-8 h-8 text-indigo-600 shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 font-semibold text-gray-900">Brainwave</span>
          )}
          {isMobileOpen && (
            <button
              onClick={toggleMobileSidebar}
              className="ml-auto p-2 rounded-md hover:bg-gray-100 lg:hidden block"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button
            onClick={toggleSidebar}
            className="ml-auto p-2 rounded-md hover:bg-gray-100 lg:block hidden"
          >
            <ChevronLeft
              size={20}
              className={`transform transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto pt-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`
                flex items-center px-4 py-3
                text-gray-700 hover:bg-gray-100
                cursor-pointer transition-colors
                ${location.pathname === item.href ? "bg-gray-100" : ""}
              `}
            >
              <span className="shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      <div
        className={`
          hidden lg:block
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "ml-16" : "ml-64"}
        `}
      />
    </>
  );
};

export default Sidebar;
