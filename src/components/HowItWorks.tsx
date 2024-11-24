import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";

const steps = [
  {
    title: "Add Content",
    description: "Upload videos, tweets, documents, or web links to Brainwave",
  },
  {
    title: "Process and Store",
    description: "Our AI analyzes and stores the content in a vector database",
  },
  {
    title: "Query Your Knowledge",
    description:
      "Ask questions or search for information within your personal knowledge base",
  },
  {
    title: "Get Insights",
    description: "Receive AI-generated responses based on your stored content",
  },
];

const HowItWorks: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div ref={timelineRef} className="relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center mb-8"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
