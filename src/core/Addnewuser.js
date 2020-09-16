import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddNewUser } from "../etherium/Factory";
import web3 from "../etherium/web3";
import { Button } from "semantic-ui-react";
import SuccessMessage from "./reusableComponents/SuccessMessage";

const Addnewuser = ({ setLoadNewuser = (f) => f, loadNewuser = undefined }) => {
  const [values, setValues] = useState({
    _address: "",
    name: "",
    email: "",
    role: "",
    loading: false,
    error: false,
    success: false,
  });

  const handlechange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: event.target.value,
    });
  };
  //destructure
  const { _address, name, email, role, loading, success, error } = values;

  const Add = async (event) => {
    event.preventDefault();
    // validation

    if (_address === "" || name === "" || email === "" || role === "") {
      alert("fill all the fileds");
    } else {
      setValues({ ...values, loading: true });
      try {
        console.log("====================================");
        console.log(values);
        console.log("====================================");
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const sts = await AddNewUser(_address, name, email, role, sender);
        console.log("====================================");
        console.log("the response from the block chain==>", sts);
        console.log("====================================");
        setValues({ ...values, success: true });
        setValues({ ...values, loading: false });
        setLoadNewuser(!loadNewuser);
      } catch (error) {
        console.log("we got some error ==>", error);
      }
    }
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
          <form>
            <div className="form-group ">
              <label
                className="text text-dark col-4"
                style={{ fontSize: "1.5rem" }}
              >
                Address
              </label>
              <input
                className="form-control"
                onChange={handlechange("_address")}
                type="text"
                value={_address}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                Name
              </label>
              <input
                className="form-control"
                onChange={handlechange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                Email
              </label>
              <input
                className="form-control"
                onChange={handlechange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-dark col-4" style={{ fontSize: "1.5rem" }}>
                Role
              </label>
              <select
                className="form-control "
                onChange={handlechange("role")}
                value={role}
              >
                <option>select the role</option>
                <option value="2">Manufacturer</option>
                <option value="3">Wholeseller</option>
                <option value="4">Distributer</option>
                <option value="5">Pharma</option>
                <option value="6">Shipper</option>
              </select>
            </div>

            <Button onClick={Add} loading={loading} secondary>
              Add user
            </Button>
            <a className="col-6"></a>
            <a className="col-6"></a>
            <a className="col-3"></a>
            <button
              className="btn btn-danger btn-lg col-3 ml-5 "
              onClick={() => {
                setLoadNewuser(!loadNewuser);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {success ? <SuccessMessage message="user created successfully" /> : ""}
      {addNewUser()}
    </div>
  );
};

export default Addnewuser;
