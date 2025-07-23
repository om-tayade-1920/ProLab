import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";
import { useNavigate } from "react-router-dom";

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

const Contact = () => {
  const navigate = useNavigate();

  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex items-center justify-center px-6 py-12 text-white">
        <motion.div
          className="w-full max-w-xl rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-8 space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.h1
            className="text-4xl font-bold tracking-tight text-center"
            custom={0}
            variants={fadeUp}
          >
            <ShinyText speed={2.5}>Contact Me</ShinyText>
          </motion.h1>

          <motion.p
            className="text-lg text-blue-300 text-center"
            custom={1}
            variants={fadeUp}
          >
            Feel free to reach out via email or connect on platforms below.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
            custom={2}
            variants={fadeUp}
          >
            <a
              href="https://www.linkedin.com/in/omtayade86"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-blue-300 hover:text-white font-semibold py-2 px-6 rounded-xl shadow-md transition backdrop-blur-md"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/om-tayade-1920"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-blue-300 hover:text-white font-semibold py-2 px-6 rounded-xl shadow-md transition backdrop-blur-md"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>

            <a
              href="mailto:omtayade86@gmail.com"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-blue-300 hover:text-white font-semibold py-2 px-6 rounded-xl shadow-md transition backdrop-blur-md"
            >
              <Mail size={18} />
              <span>Email Me</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </DarkAuroraBackground>
  );
};

export default Contact;
