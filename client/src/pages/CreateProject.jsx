import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios";
import DarkAuroraBackground from "../components/animations/DarkAuroraBackground";
import ShinyText from "../components/animations/ShinyText";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const CreateProject = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    branch: "",
    year: "",
    tags: "",
    techStack: "",
    githubLink: "",
    reportLink: "",
    screenshots: [],
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImageChange = (e) => {
    setForm({ ...form, screenshots: Array.from(e.target.files) });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  const payload = {
    title: form.title,
    description: form.description,
    branch: form.branch,
    year: form.year,
    tags: form.tags.split(","),
    techStack: form.techStack.split(","),
    githubLink: form.githubLink,
    reportLink: form.reportLink,
    screenshots: [], // Add actual image handling later
  };

  try {
    await instance.post("/project/create", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    alert("✅ Project submitted successfully!");
    navigate("/project");
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError(err.response?.data?.message || "Something went wrong");
  }
};

  return (
    <DarkAuroraBackground>
      <main className="min-h-screen flex items-center justify-center px-4 py-10 text-white">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white/10 border border-white/20 backdrop-blur p-8 rounded-xl space-y-6 shadow-md"
          encType="multipart/form-data"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <motion.h2
            className="text-3xl font-bold text-center text-blue-300 mb-4"
            variants={fadeUp}
          >
            <ShinyText>Post a Project</ShinyText>
          </motion.h2>

          {["title", "description", "branch", "year", "tags", "techStack", "githubLink", "reportLink"].map((field, i) => (
            <motion.div key={field} variants={fadeUp} custom={i}>
              <label className="block text-sm font-medium text-blue-200 capitalize mb-1">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-white/10 text-white placeholder:text-blue-200 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                required={field !== "reportLink"}
                placeholder={`Enter ${field}`}
              />
            </motion.div>
          ))}

          {/* <motion.div variants={fadeUp}>
            <label className="block text-sm font-medium text-blue-200 mb-1">Screenshots</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </motion.div> */}

          {error && (
            <motion.p className="text-red-400 text-sm text-center" variants={fadeUp}>
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition"
            variants={fadeUp}
          >
            Submit Project
          </motion.button>
        </motion.form>
      </main>
    </DarkAuroraBackground>
  );
};

export default CreateProject;
