import React, { Component, useEffect, useState } from "react";
import web3 from "../etherium/web3";
import { deployAuthContract, deployFactoryContract } from "../etherium/Factory";
import Topbar from "./reusableComponents/Topbar";
import Addnewuser from "./Addnewuser";
import { Button } from "semantic-ui-react";

const Admin = () => {
  const [loadNewuser, setLoadNewuser] = useState(false);

  useEffect(() => {}, [loadNewuser]);
  const [loading, setloading] = useState(false);

  const dpAuth = () => {
    return (
      <Button onClick={deployauth} inverted color="violet">
        deploy the auth contract
      </Button>
    );
  };
  const dpFact = () => (
    <Button onClick={deployfactory} loading={loading} inverted color="teal">
      deploy the factory contract
    </Button>
  );

  //****************************** ADD NEW USER BY ADMIN *******************/
  const loadAdduser = () => {
    // this.setState({ ...this.state, adduser: true });
    setLoadNewuser(true);
  };

  const addNewUser = () => (
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
        <div className="card-body">
          <p className="card-text">
            Drug supplychain integrity using block chain
          </p>
          <p className="card-text">
            <button
              type="button"
              className="btn btn-primary btn-lg btn-block"
              onClick={loadAdduser}
            >
              Add new user
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  //**************************************************************************/

  const deployauth = async (event) => {
    event.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];

      const cont = await deployAuthContract(sender);
      console.log("====================================");
      console.log("The auth contract is deployed", cont);
      console.log(
        "The auth contract is deployed at the addres ===>",
        cont.options.address
      );
      console.log("====================================");
    } catch (error) {
      console.log("we got some error==>", error);
    }
  };

  const deployfactory = async (event) => {
    event.preventDefault();

    try {
      setloading(true);
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];

      const cont = await deployFactoryContract(sender);
      console.log("====================================");
      console.log("The auth contract is deployed", cont);
      console.log(
        "The factory contract is deployed at the addres ===>",
        cont.options.address
      );

      console.log("====================================");
      setloading(false);
    } catch (error) {
      console.log("we got some error", error);
    }
  };

  const loadTemplet = () =>
    loadNewuser ? (
      <Addnewuser setLoadNewuser={setLoadNewuser} loadNewuser={loadNewuser} />
    ) : (
      addNewUser()
    );

  //NOTE change the this to class to deploy the nrew contract
  // {dpAuth()}
  //{dpFact()}
  // inject these two lines to to deploy new contracts

  // TODO add teh functionality to list all the users
  return (
    <div>
      <Topbar
        title="Welcome Admin..!"
        description="admin have the permission to add new user's"
      />
      <div className="row ml-5">
        <div className="col-2">
          {
            // loadTemplet()
          }
          {dpFact()}
        </div>

        <div className="col-4 " style={{ marginLeft: "20%" }}>
          {
            // addNewUser()
          }
          {loadTemplet()}
          {
            // dpFact()
          }
        </div>
        <div className="col-2">
          {
            // addNewUser()
          }

          {dpAuth()}
        </div>
      </div>
    </div>
  );
};

export default Admin;
