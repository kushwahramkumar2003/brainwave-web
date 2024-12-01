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
    <section id="use-cases" className="py-12 sm:py-16 md:py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 white">
          Use Cases
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <useCase.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-white" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-50">
                {useCase.title}
              </h3>
              <p className="text-sm sm:text-base text-white">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
