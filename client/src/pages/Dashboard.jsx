import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
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

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await instance.get("/project");
        setProjects(Array.isArray(res.data?.projects) ? res.data.projects : []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <DarkAuroraBackground>
      <main className="p-6 min-h-screen text-white max-w-screen-xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center sm:text-left"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <ShinyText speed={2.5}>Your Dashboard</ShinyText>
          </motion.h1>
          <motion.button
            onClick={() => navigate("/create")}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-blue-300 hover:text-white font-semibold px-5 py-2 rounded-lg backdrop-blur-md transition"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            ➕ Add New Project
          </motion.button>
        </motion.div>

        {/* Status */}
        {loading && (
          <motion.p className="text-blue-300 text-center" variants={fadeUp}>
            Loading projects...
          </motion.p>
        )}
        {error && (
          <motion.p className="text-red-400 text-center" variants={fadeUp}>
            {error}
          </motion.p>
        )}
        {!loading && projects.length === 0 && (
          <motion.p className="text-gray-400 text-center" variants={fadeUp}>
            No projects found.
          </motion.p>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {projects.map((proj, i) => (
              <motion.div
                key={proj._id}
                onClick={() => navigate(`/project/${proj._id}`)}
                className="bg-white/5 border border-white/10 p-5 rounded-xl shadow-lg hover:shadow-blue-400/30 hover:border-blue-500 cursor-pointer transition"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <h2 className="text-lg font-semibold text-blue-400">{proj.title}</h2>
                <p className="text-sm text-gray-300"><strong>Branch:</strong> {proj.branch}</p>
                <p className="text-sm text-gray-300"><strong>Year:</strong> {proj.year}</p>
                {proj.techStack?.length > 0 && (
                  <p className="text-sm text-gray-300">
                    <strong>Tech:</strong> {proj.techStack.join(", ")}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-400 line-clamp-3">{proj.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </DarkAuroraBackground>
  );
};

export default Dashboard;

