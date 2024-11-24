import React from "react";
import { motion } from "framer-motion";
import { Book, Briefcase, Lightbulb, GraduationCap } from "lucide-react";

const useCases = [
  {
    icon: Book,
    title: "Personal Knowledge Management",
    description:
      "Organize and access your personal notes, research, and ideas effortlessly.",
  },
  {
    icon: Briefcase,
    title: "Professional Development",
    description:
      "Stay up-to-date with industry trends and manage your learning resources.",
  },
  {
    icon: Lightbulb,
    title: "Creative Projects",
    description:
      "Collect inspiration, brainstorm ideas, and manage your creative workflow.",
  },
  {
    icon: GraduationCap,
    title: "Academic Research",
    description:
      "Streamline your literature review process and manage citations with ease.",
  },
];

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <useCase.icon className="w-12 h-12 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-600">{useCase.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
