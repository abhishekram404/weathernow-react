import React from "react";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import "./css/Loader.css";
const Loader = () => {
  return (
    <div className="loader-container">
      <CloudQueueIcon className="loader-icon" />
      <h1 className="loader-text">Loading...</h1>
    </div>
  );
};

export default Loader;
