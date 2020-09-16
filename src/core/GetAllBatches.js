import React, { useEffect, useState } from "react";
import web3 from "../etherium/web3";
import { getAllbIds } from "../etherium/Factory";
import Batchdetails from "./Batchdetails";
import { Button, Segment, Input, Card } from "semantic-ui-react";

const GetAllBatches = ({
  setgetallBatch = (f) => f,
  getallBatch = undefined,
}) => {
  useEffect(() => {
    loadIds();
  }, []);
  const [batchs, setBatch] = useState([]);

  const loadIds = async () => {
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];
    const sts = await getAllbIds(sender);

    console.log("====================================");
    console.log("all the batch is are", sts);
    console.log("====================================");
    setBatch(sts);
  };

  const templet = () => (
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
          src={require("../assets/background.jpg")}
          className="card-img-top"
          alt="..."
        ></img>
        <div
          className="card-body"
          style={{ height: "450px", overflow: "scroll" }}
        >
          <Segment inverted>
            <Input inverted placeholder="Search..." />
          </Segment>
          <div className="alert alert-primary" role="alert">
            <h3>All the deployed batches</h3>
          </div>
          {batchs.map((batch, index) => {
            return (
              <div key={index}>
                <h3>
                  <Batchdetails bid={batch} />
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div>{templet()}</div>
    </div>
  );
};

export default GetAllBatches;
