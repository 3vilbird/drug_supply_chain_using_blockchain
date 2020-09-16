import React from "react";
import "../css/develop.css";
import { Button, Segment } from "semantic-ui-react";
import Card from "./reusableComponents/Card";

const Developers = () => {
  return (
    <div className="cont">
      <div className="header">
        <h1 className="text-white">Drug supply chain integrity....</h1>
      </div>
      <h3 className="text-white" style={{ textAlign: "center" }}>
        Developers team
      </h3>
      <div className="row pb-5 pt-2">
        <div className="col-12">
          <Card
            name="ganapati"
            image={require("../assets/p2.jpg")}
            email="mdganapati@gmal.com"
            role="Lead developer"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Card
            name="abhijeet"
            image={require("../assets/abhi.jpg")}
            email="abhi@gmail.com"
            role="Backend developer"
          />
        </div>
        <div className="col-4">
          <Card
            name="amitesh"
            image={require("../assets/amitesh.jpg")}
            email="amitesh@gmail.com"
            role="Frontend developer"
          />
        </div>
        <div className="col-4">
          <Card
            name="kalyan"
            image={require("../assets/Kal.jpg")}
            email="kalyan4kp@gmail.com"
            role="Frontend developer"
          />
        </div>
      </div>
    </div>
  );
};

export default Developers;
