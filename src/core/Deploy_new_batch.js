import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import web3 from "../etherium/web3";
import { deployMed } from "../etherium/MedicineDeploy";
import { addToFactory } from "../etherium/Factory";
import ErrorMessage from "./reusableComponents/ErrorMessage";
import SuccessMessage from "./reusableComponents/SuccessMessage";

const Deploy_new_batch = ({
  setAddnewBatch = (f) => f,
  addnewBatch = undefined,
}) => {
  const [values, setValues] = useState({
    name: "",
    batchId: "",
    quantity: "",
    manufacturedDate: "",
    expiryDate: "",
    description: "",
    shipper: "",
    receiver: "",
    receiverType: "",
    error: false,
    success: false,
    loading: false,
  });
  const {
    batchId,
    name,
    quantity,
    manufacturedDate,
    expiryDate,
    description,
    shipper,
    receiver,
    receiverType,
    error,
    success,
    loading,
  } = values;

  const handlechange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      success: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      batchId == "" ||
      name == "" ||
      quantity == "" ||
      manufacturedDate == "" ||
      expiryDate == "" ||
      description == "" ||
      shipper == "" ||
      receiver == "" ||
      receiverType == ""
    ) {
      alert("Please fill all the fields");
    } else {
      try {
        setValues({ ...values, loading: true });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        console.log("sender",sender);

        let contract_address = await deployMed(
          name,
          batchId,
          quantity,
          manufacturedDate,
          expiryDate,
          shipper,
          receiver,
          description,
          receiverType,
          sender
        );
        console.log("====================================");
        console.log("batch deployed at ==>", contract_address.options.address);
        console.log("====================================");
        // store that address in the factory mapping with the bid

        const sts = await addToFactory(
          contract_address.options.address,
          batchId,
          sender
        );
        console.log("====================================");
        console.log(`batch id ${sts} added to the factory`);
        console.log("====================================");
        setValues({ ...values, success: true, loading: false });
      } catch (error) {
        console.log("got some error while deploying new batch", error);
        setValues({ ...values, error: true, loading: false });
      }
    }
  };

  const tamplet = () => (
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
                Name
              </label>
              <input
                className="form-control"
                onChange={handlechange("name")}
                value={name}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                Batch Id
              </label>
              <input
                className="form-control"
                onChange={handlechange("batchId")}
                value={batchId}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                Quantity
              </label>
              <input
                className="form-control"
                onChange={handlechange("quantity")}
                value={quantity}
              />
            </div>
            <div className="form-group ">
              <label className="text-dark col-8" style={{ fontSize: "1.5rem" }}>
                Manufactured_date
              </label>
              <input
                className="form-control"
                onChange={handlechange("manufacturedDate")}
                value={manufacturedDate}
              />
            </div>
            <div className="form-group">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                Expiry_date
              </label>
              <input
                className="form-control"
                onChange={handlechange("expiryDate")}
                value={expiryDate}
              />
            </div>
            <div className="form-group">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                Description
              </label>
              <input
                className="form-control"
                onChange={handlechange("description")}
                value={description}
              />
            </div>
            <div className="form-group">
              <label className="text-dark col-4" style={{ fontSize: "1.5rem" }}>
                Shipper
              </label>
              <input
                className="form-control "
                onChange={handlechange("shipper")}
                value={shipper}
              />
            </div>
            <div className="form-group">
              <label className="text-dark col-4" style={{ fontSize: "1.5rem" }}>
                receiver
              </label>
              <input
                className="form-control "
                onChange={handlechange("receiver")}
                value={receiver}
              />
            </div>
            <div className="form-group">
              <label className="text-dark col-6" style={{ fontSize: "1.5rem" }}>
                receiver Type
              </label>
              <input
                className="form-control"
                onChange={handlechange("receiverType")}
                value={receiverType}
                placeholder="1 for whole || 2 for distributor"
              />
            </div>

            <Button onClick={onSubmit} loading={loading} secondary>
              Deploy batch
            </Button>
            <a className="col-6"></a>
            <a className="col-6"></a>
            <a className="col-3"></a>
            <button
              className="btn btn-danger btn-lg col-3 ml-5 "
              onClick={() => {
                setAddnewBatch(!addnewBatch);
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
      {success ? (
        <SuccessMessage message="New batch deployed successfully" />
      ) : (
        ""
      )}
      {error ? (
        <ErrorMessage hea="Oops..! " message=" Unable to deploy new batch" />
      ) : (
        ""
      )}

      {tamplet()}
    </div>
  );
};

export default Deploy_new_batch;
