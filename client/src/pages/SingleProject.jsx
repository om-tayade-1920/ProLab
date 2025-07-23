import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const SingleProject = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await instance.get(`/project/${id}`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project. It may not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <DarkAuroraBackground>
        <div className="min-h-screen flex items-center justify-center text-white text-lg">
          Loading project...
        </div>
      </DarkAuroraBackground>
    );

  if (error)
    return (
      <DarkAuroraBackground>
        <div className="min-h-screen flex items-center justify-center text-red-400 text-lg font-semibold">
          {error}
        </div>
      </DarkAuroraBackground>
    );

  if (!project || Object.keys(project).length === 0)
    return (
      <DarkAuroraBackground>
        <div className="min-h-screen flex items-center justify-center text-white text-lg">
          No project found.
        </div>
      </DarkAuroraBackground>
    );

  return (
    <DarkAuroraBackground>
      <div className="min-h-screen flex justify-center px-4 py-10 text-white">
        <motion.div
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg max-w-4xl w-full p-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          {/* Title */}
          <motion.h2
            className="text-4xl font-bold text-center mb-6"
            custom={0}
            variants={fadeUp}
          >
            <ShinyText speed={2.5}>{project.title}</ShinyText>
          </motion.h2>

          {/* Meta Info */}
          <motion.div className="space-y-2 text-blue-300 text-sm" custom={1} variants={fadeUp}>
            {project.branch && <p><strong>Branch:</strong> {project.branch}</p>}
            {project.year && <p><strong>Year:</strong> {project.year}</p>}
            {project.tags?.length > 0 && <p><strong>Tags:</strong> {project.tags.join(", ")}</p>}
            {project.techStack?.length > 0 && <p><strong>Tech Stack:</strong> {project.techStack.join(", ")}</p>}
          </motion.div>

          {/* GitHub & Report Links */}
          <motion.div className="text-blue-400 mt-4 text-sm space-y-1" custom={2} variants={fadeUp}>
            {project.githubLink && (
              <p>
                <strong>GitHub:</strong>{" "}
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="underline">
                  {project.githubLink}
                </a>
              </p>
            )}
            {project.reportLink && (
              <p>
                <strong>Report:</strong>{" "}
                <a href={project.reportLink} target="_blank" rel="noopener noreferrer" className="underline">
                  {project.reportLink}
                </a>
              </p>
            )}
          </motion.div>

          {/* Description */}
          {project.description && (
            <motion.div className="mt-4 leading-relaxed text-blue-100 whitespace-pre-line" custom={3} variants={fadeUp}>
              {project.description}
            </motion.div>
          )}

          {/* Screenshots
          {project.screenshots?.length > 0 && (
            <motion.div className="mt-6" custom={4} variants={fadeUp}>
              <h3 className="font-semibold text-lg text-blue-200 mb-2">Screenshots:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.screenshots.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`screenshot-${i}`}
                    className="rounded border border-white/20 shadow-md"
                  />
                ))}
              </div>
            </motion.div>
          )} */}

          {/* Posted By */}
          {project.postedBy && (
            <motion.div className="mt-6 text-sm text-blue-300 border-t border-white/10 pt-4" custom={5} variants={fadeUp}>
              <p>
                <strong>Posted By:</strong> {project.postedBy.name} ({project.postedBy.email})
              </p>
              <p>
                <strong>Enrollment:</strong> {project.postedBy.enrollmentNumber} | {" "}
                <strong>Dept:</strong> {project.postedBy.department} | {" "}
                <strong>Pass Out:</strong> {project.postedBy.passOutYear}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </DarkAuroraBackground>
  );
};

export default SingleProject;
