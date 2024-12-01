"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigetor = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Brain className="w-8 h-8 mr-2 text-primary" />
            <span className="hidden sm:inline">Brainwave</span>
          </motion.div>
          <nav className="hidden md:block"></nav>
          <div className="hidden md:flex gap-3">
            <Button
              text="Login"
              onClick={() => {
                navigetor("/login");
              }}
            />
            <Button
              text="Sign Up"
              onClick={() => {
                navigetor("/signup");
              }}
            />
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-background"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <nav className="mx-auto px-4 py-4">
            <div className="mt-6 space-y-4 flex flex-col">
              <Button
                text="Login"
                onClick={() => {
                  navigetor("/login");
                }}
              />
              <Button
                text="Sign Up"
                onClick={() => {
                  navigetor("/signup");
                }}
              />
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
