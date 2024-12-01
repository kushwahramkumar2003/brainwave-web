"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (timelineRef.current) {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      timeline.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-12 sm:py-16 md:py-20 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground">
          How It Works
        </h2>
        <div ref={timelineRef} className="relative space-y-8 sm:space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col sm:flex-row items-start sm:items-center mb-8 sm:mb-0"
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
