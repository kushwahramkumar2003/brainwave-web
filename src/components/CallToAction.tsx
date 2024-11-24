import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import Button from "./ui/button";

const CallToAction: React.FC = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (backgroundRef.current) {
      gsap.to(backgroundRef.current, {
        backgroundPosition: "100% 100%",
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
        style={{ backgroundSize: "200% 200%", backgroundPosition: "0% 0%" }}
      ></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          className="text-center text-white"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 50 },
          }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Supercharge Your Knowledge Management?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of users who are already benefiting from Brainwave's
            AI-powered second brain.
          </p>
          <Button size="lg" variant="secondary" text="Get Started for Free" />
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
