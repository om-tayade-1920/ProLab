import { useNavigate } from "react-router-dom";
import ShinyText from "../components/animations/ShinyText";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import { Rocket, Plus } from "lucide-react";
import { motion } from "framer-motion";

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

const Home = () => {
  const navigate = useNavigate();

  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 text-white">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-2 tracking-tight"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <ShinyText speed={2.5}>VNIT Project Repository</ShinyText>
        </motion.h1>

        <motion.p
          className="text-xl font-medium text-blue-300 mb-3"
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Share and Explore Projects by VNITians
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-purple-300 max-w-3xl leading-relaxed mb-8"
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Browse through amazing academic and personal projects built by VNIT students.
          <br className="hidden sm:block" />
          Discover innovative ideas, learn from others, or contribute your own work
          to inspire the community.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-blue-300 hover:text-white font-semibold py-2 px-6 rounded-xl shadow-md transition backdrop-blur-md"
          >
            <Rocket size={18} />
            <span className="text-sm sm:text-base">Explore Projects</span>
          </button>

        </motion.div>
      </div>
    </DarkAuroraBackground>
  );
};

export default Home; 