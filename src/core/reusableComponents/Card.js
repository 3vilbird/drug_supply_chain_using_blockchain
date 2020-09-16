import React from "react";
import "../../css/develop.css";

const Card = ({ name, image, email, role }) => {
  return (
    <div className="carddesign">
      <div className="upper">
        <img src={image} />
      </div>
      <h2>{name}</h2>
      <h3>{role}</h3>
      <div className="details">
        &nbsp;
        <i className="fa fa-envelope" aria-hidden="true"></i>
        {email}
        <br />
      </div>
      <div className="social"></div>
    </div>
  );
};

export default Card;
