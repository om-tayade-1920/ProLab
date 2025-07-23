import React from "react";
import "./ShinyText.css";

const ShinyText = ({ children, className = "text-2xl" }) => {
  return (
    <span className={`shiny-text ${className}`}>
      {children}
    </span>
  );
};

export default ShinyText;
