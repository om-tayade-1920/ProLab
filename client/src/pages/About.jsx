
import React from "react";
import { motion } from "framer-motion";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const About = () => {
  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex items-center justify-center px-6 py-10">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8 sm:p-12 max-w-2xl w-full text-center shadow-xl border border-white/20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-white"
            custom={0}
            variants={fadeUp}
          >
            <ShinyText speed={2}>About Me</ShinyText>
          </motion.h1>

          {/* Paragraph 1 */}
          <motion.p
            className="text-lg sm:text-xl text-blue-200 leading-relaxed"
            custom={1}
            variants={fadeUp}
          >
            Hi! I’m{" "}
            <strong >Om Rajesh Tayade</strong>, a pre-final year student at{" "}
            <strong >VNIT Nagpur</strong>. I'm from the{" "}
            <strong >Department of Electronics and Communication Engineering (ECE)</strong>.
          </motion.p>

          {/* Paragraph 2 */}
          <motion.p
            className="mt-6 text-base sm:text-lg text-purple-200 leading-relaxed"
            custom={2}
            variants={fadeUp}
          >
            I’m passionate about full-stack web development, building real-world projects,
             and looking for software engineering roles. I created this platform to help VNIT 
             students easily discover and share projects built by their peers and seniors..
          </motion.p>
        </motion.div>
      </div>
    </DarkAuroraBackground>
  );
};

export default About;
