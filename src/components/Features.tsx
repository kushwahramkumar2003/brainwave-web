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
    <section id="features" className="py-12 sm:py-16 md:py-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg bg-gray-800"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
