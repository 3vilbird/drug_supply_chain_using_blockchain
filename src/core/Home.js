import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import { render } from "@testing-library/react";
import web3 from "../etherium/web3";
import { deployMed } from "../etherium/MedicineDeploy";
import "../css/homestyle.css";
import { Button, Step } from "semantic-ui-react";
import Topbar from "./reusableComponents/Topbar";
import Deploy_new_batch from "./Deploy_new_batch";
import GetAllBatches from "./GetAllBatches";

const Home = () => {
  const [addnewBatch, setAddnewBatch] = useState(false);
  const [getallBatch, setgetallBatch] = useState(false);
  useEffect(() => {}, [addnewBatch, getallBatch]);

  const add = () => {
    setAddnewBatch(true);
  };
  const getbt = () => {
    setgetallBatch(true);
  };

  const newBatch = () => {
    return (
      <div className="ml-5">
        <div
          className="card"
          style={{
            width: "30rem",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={require("../assets/manu.jpg")}
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <p className="card-text">
              Drug supplychain integrity using block chain
            </p>
            <p className="card-text">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={add}
              >
                Deploy new batch
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const getAllthebatches = () => {
    return (
      <div className="ml-5">
        <div
          className="card"
          style={{
            width: "30rem",
            alignItem: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={require("../assets/pills.jpg")}
            className="card-img-top"
            alt="..."
          ></img>
          <div className="card-body">
            <p className="card-text">
              Drug supplychain integrity using block chain
            </p>
            <p className="card-text">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={getbt}
              >
                get all the medicine batches
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const loadTemplet = () => {
    return addnewBatch ? (
      <Deploy_new_batch
        setAddnewBatch={setAddnewBatch}
        addnewBatch={addnewBatch}
      />
    ) : (
      newBatch()
    );
  };
  const loadbase = () => {
    return getallBatch ? (
      <GetAllBatches
        setgetallBatch={setgetallBatch}
        getallBatch={getallBatch}
      />
    ) : (
      getAllthebatches()
    );
  };

  return (
    <div>
      <Topbar
        title="Manufacturer..!"
        description=" manufacturer can delpoy new batches"
      />
      <div className="row">
        <div className="col-7 ml-5 ">{loadTemplet()}</div>
        <div className="col-4"> {loadbase()}</div>
      </div>
    </div>
  );
};

export default Home;
