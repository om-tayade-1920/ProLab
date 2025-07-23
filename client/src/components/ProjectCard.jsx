import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-lg transition"
      onClick={() => navigate(`/project/${project._id}`)}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-indigo-100 text-indigo-700 px-2 py-1 text-xs rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
