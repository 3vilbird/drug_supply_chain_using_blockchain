import React from "react";

const Topbar = ({
  title = "My Title",
  description = "This is a test for reusable component",
}) => {
  return (
    <div className="container-fuild">
      <div className="jumbotron bg-dark text-white  text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </div>
  );
};

export default Topbar;
