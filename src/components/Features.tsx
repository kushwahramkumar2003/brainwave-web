import React from "react";
import { motion } from "framer-motion";
import {
  Youtube,
  Twitter,
  FileText,
  Link,
  Database,
  Share2,
} from "lucide-react";

const features = [
  {
    icon: Youtube,
    title: "YouTube Integration",
    description: "Easily save and analyze YouTube videos",
  },
  {
    icon: Twitter,
    title: "Tweet Capture",
    description: "Store and process tweets for quick reference",
  },
  {
    icon: FileText,
    title: "Document Analysis",
    description: "Parse and extract insights from documents",
  },
  {
    icon: Link,
    title: "Web Page Archiving",
    description: "Save and analyze web pages for future reference",
  },
  {
    icon: Database,
    title: "Vector Database",
    description: "Efficiently store and query your knowledge base",
  },
  {
    icon: Share2,
    title: "Share Your Brain",
    description: "Collaborate and share your knowledge with others",
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
