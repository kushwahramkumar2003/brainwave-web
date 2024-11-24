import React from "react";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import Button from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50  bg-opacity-90 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Brain className="w-8 h-8 mr-2 text-blue-500" />
          Brainwave
        </motion.div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#features"
                className="hover:text-gray-600 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-gray-600 transition-colors"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#use-cases"
                className="hover:text-gray-600 transition-colors"
              >
                Use Cases
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex gap-3">
          <Button
            text="Login"
            onClick={() => {
              navigate("/login");
            }}
          />
          <Button
            text="Sign Up"
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
