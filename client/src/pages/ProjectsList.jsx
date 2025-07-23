import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import { motion } from "framer-motion";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";

const branches = [
  "CSE", "ECE", "EEE", "MECH", "CIVIL",
  "CHEMICAL", "METALLURGY", "MINING", "ARCHITECTURE", "OTHER"
];
const years = ["2026", "2027", "2028", "2029", "Other"];

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

const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({ branch: "", year: "", tags: "", title: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (filters.branch) params.branch = filters.branch;
      if (filters.year) params.year = filters.year;
      if (filters.tags) params.tags = filters.tags;
      if (filters.title) params.title = filters.title;

      const res = await instance.get("/project", { params });
      setProjects(res.data?.projects || []);
    } catch (err) {
      console.error("Error fetching:", err);
      setError("Error fetching projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  const inputClass =
    "bg-white/10 border border-white/20 text-blue-200 placeholder:text-blue-300 " +
    "backdrop-blur-md rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 " +
    "transition duration-300 w-full";

  return (
    <DarkAuroraBackground>
      <main className="p-6 min-h-screen text-white max-w-screen-xl mx-auto">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <ShinyText speed={2.5}>Project Repository</ShinyText>
        </motion.h1>

        {/* Filters */}
        <motion.div
          className="mb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Branch Dropdown */}
          <select
            value={filters.branch}
            onChange={e => setFilters({ ...filters, branch: e.target.value })}
            className={inputClass}
          >
            <option value="">All Branches</option>
            {branches.map((b) => (
              <option
                key={b}
                value={b}
                className="bg-[#1c1c2c] text-white"
              >
                {b}
              </option>
            ))}
          </select>

          {/* Year Dropdown */}
          <select
            value={filters.year}
            onChange={e => setFilters({ ...filters, year: e.target.value })}
            className={inputClass}
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option
                key={y}
                value={y}
                className="bg-[#1c1c2c] text-white"
              >
                {y}
              </option>
            ))}
          </select>

          {/* Tags Input */}
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={filters.tags}
            onChange={e => setFilters({ ...filters, tags: e.target.value })}
            className={inputClass}
          />

          {/* Title Search Input */}
          <input
            type="text"
            placeholder="Search title..."
            value={filters.title}
            onChange={e => setFilters({ ...filters, title: e.target.value })}
            className={inputClass}
          />
        </motion.div>

        {/* Clear Filters */}
        <motion.button
          onClick={() => setFilters({ branch: "", year: "", tags: "", title: "" })}
          className="text-blue-300 hover:text-white text-sm underline block mb-8 mx-auto"
          whileHover={{ scale: 1.05 }}
        >
          Clear Filters
        </motion.button>

        {/* Status */}
        {loading && (
          <motion.p className="text-blue-200 text-center" variants={fadeUp}>
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
            No projects found for chosen filters.
          </motion.p>
        )}

        {/* Project Cards */}
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
                  <p className="text-sm text-gray-300"><strong>Tech:</strong> {proj.techStack.join(", ")}</p>
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

export default ProjectsList;
