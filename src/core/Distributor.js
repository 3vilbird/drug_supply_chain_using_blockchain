import React, { Component, useState, useEffect } from "react";
import web3 from "../etherium/web3";
import { recieveWD } from "../etherium/MedicineWDdeploy";
import { deployDP, getBatchIdStatus } from "../etherium/MedicineDPdeploy";
import Topbar from "./reusableComponents/Topbar";
import { Button, Segment, Input } from "semantic-ui-react";
import { getMed_info } from "../etherium/MedicineDeploy";
import Tracker_shipper from "./reusableComponents/Tracker_shipper";
import SuccessMessage from "./reusableComponents/SuccessMessage";
import ErrorMessage from "./reusableComponents/ErrorMessage";
import {
  getAddressById,
  get_wd_address,
  get_dP_address,
} from "../etherium/Factory";

const Distributor = () => {
  const [state, setState] = useState({
    batch_Id: "",
    batch_Id_track: "",
    wd_address: "",
    shipper: "",
    receiver: "",
    loading: false,
    load_track: false,
    load_dp: false,
    Batch_id: "",
    name: "",
    Des: "",
    Quan: "",
    mnfdate: "",
    expdate: "",
    manufacturer: "",
    wholeseller: "",
    distributor: "",
    pharmacist: "",
    status: "",
    update_error: "",
    update_success: "",
    send_error: "",
    send_success: "",
    track_error: "",
  });
  const [reload, setReload] = useState(false);
  useEffect(() => {}, [reload]);

  const handlechange = (name) => (event) => {
    setState({
      ...state,
      update_error: false,
      track_error: false,
      [name]: event.target.value,
    });
  };
  // destructure
  const {
    shipper,
    receiver,
    loading,
    batch_Id,
    load_track,
    batch_Id_track,
    load_dp,
    Batch_id,
    name,
    Des,
    Quan,
    mnfdate,
    expdate,
    manufacturer,
    wholeseller,
    distributor,
    pharmacist,
    status,
    update_error,
    update_success,
    send_error,
    send_success,
    track_error,
  } = state;

  //********************* PACKAGE RECEIVED BY DISTRIBUTOR *********************/
  const onSubmit = async (event) => {
    event.preventDefault();

    if (batch_Id == "") {
      alert("Please enter the batch id");
    } else {
      try {
        setState({ ...state, loading: true });
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const med_address = await getAddressById(sender, batch_Id);
        console.log("med_address=>",med_address);
        const wdAddress = await get_wd_address(batch_Id, sender);
        console.log(wdAddress);
        const sts = await recieveWD(wdAddress, med_address, sender);
        console.log("the status of the package is =====>", sts);
        setState({
          ...state,
          loading: false,
          batch_Id: "",
          update_success: true,
        });
      } catch (error) {
        console.log("some error occured==>", error);
        setState({
          ...state,
          loading: false,
          batch_Id: "",
          update_error: true,
        });
      }
    }
  };
  //**************************** TRACK THE STATUS OF THE PACKAGE******************/
  const trackshipment_dp = async (event) => {
    event.preventDefault();
    console.log("hello tracker from track_sp==>");

    if (batch_Id_track == "") {
      alert("Please enter the batch id");
    } else {
      try {
        setState({ ...state, load_track: true });
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        const med_address = await getAddressById(sender, batch_Id_track);
        const info = await getMed_info(med_address, sender);
        const dp_address = await get_dP_address(batch_Id_track, sender);
        console.log("hi");
        const sts = await getBatchIdStatus(dp_address, sender);
        console.log("hi");

        console.log("the ststus of the shipment from D_P===>", sts);
        setState({
          ...state,
          load_track: false,
          batch_Id_track: "",
          Batch_id: info.id,
          name: info.RM,
          Des: info.Des,
          Quan: info.Quant,
          mnfdate: info.mdate,
          expdate: info.exdate,
          manufacturer: info.Manu,
          wholeseller: info.whol,
          distributor: info.destri,
          pharmacist: info.phar,
          status: parseInt(sts),
        });
        setReload(true);
      } catch (error) {
        console.log("we have some error from tracker d_p");
        setState({
          ...state,
          load_track: false,
          batch_Id_track: "",
          track_error: true,
        });
      }
    }
  };
  //********************************* SEND THE PACKAGE TO PHARMA *******************/
  const send_dp = async (event) => {
    event.preventDefault();
    if (batch_Id == "" || shipper == "" || receiver == "") {
      alert("Enter all the fields");
    } else {
      try {
        setState({ ...state, load_dp: true });
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        const med_address = await getAddressById(sender, batch_Id);
        const dpinstance = await deployDP(
          med_address,
          sender,
          shipper,
          receiver,
          batch_Id
        );
        // add the address into the factory

        console.log("====================================");
        console.log(
          "the subcontract for distributor is ddeployed at ==>",
          dpinstance
        );
        console.log("====================================");
        setState({ ...state, load_dp: false, send_success: true });
      } catch (error) {
        console.log("ooops we got some error from distributor page==>", error);
        setState({ ...state, load_dp: false, send_error: true });
      }
    }
  };
  //************************************ ALL THE TAMPLET GOES HERE ********************/
  const updatePackage = () => (
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
            <form>
              <div className="form-group">
                <label
                  className="text-dark col-10"
                  style={{ fontSize: "1.5rem" }}
                >
                  Enter the Batch Id :
                </label>
                <input
                  onChange={handlechange("batch_Id")}
                  className="form-control"
                  type="text"
                  value={batch_Id}
                />
              </div>

              <Button
                secondary
                className="btn btn-primary btn-lg btn-block"
                loading={loading}
                onClick={onSubmit}
              >
                package Received
              </Button>
            </form>
          </p>
        </div>
      </div>
    </div>
  );
  const sendPackage = () => (
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
            <form>
              <div className="form-group">
                <label className="text-dark" style={{ fontSize: "1.5rem" }}>
                  Enter Batch Id :
                </label>
                <input
                  onChange={handlechange("batch_Id")}
                  className="form-control"
                  type="text"
                  value={batch_Id}
                />
              </div>
              <div className="form-group">
                <label className="text-dark" style={{ fontSize: "1.5rem" }}>
                  Shipper
                </label>
                <input
                  onChange={handlechange("shipper")}
                  className="form-control"
                  type="text"
                  value={shipper}
                />
              </div>
              <div className="form-group">
                <label className="text-dark" style={{ fontSize: "1.5rem" }}>
                  Receiver
                </label>
                <input
                  onChange={handlechange("receiver")}
                  className="form-control"
                  type="text"
                  value={receiver}
                />
              </div>
              <Button
                secondary
                className="btn btn-primary btn-lg btn-block"
                onClick={send_dp}
                loading={load_dp}
              >
                send package
              </Button>
            </form>
          </p>
        </div>
      </div>
    </div>
  );

  const trackshipment = () => (
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
            <form>
              <Segment inverted>
                <Input
                  inverted
                  placeholder="Enter the batch Id"
                  onChange={handlechange("batch_Id_track")}
                  value={batch_Id_track}
                />
                <Button
                  basic
                  inverted
                  color="teal"
                  className="ml-4"
                  loading={load_track}
                  onClick={trackshipment_dp}
                >
                  Track Shipment
                </Button>
              </Segment>
            </form>
          </p>
        </div>
      </div>
    </div>
  );
  //*********************************** END OF THE TAMPLETS ************************************/
  return (
    <div>
      {
        <Topbar
          title="Distributor..!"
          description="Can receive and ship the shipment"
        />
      }

      <div className="row ml-5">
        <div className="col-4">
          {update_error ? (
            <ErrorMessage
              hea="Access Denied.. :("
              message="Unable to update the package "
            />
          ) : (
            ""
          )}
          {update_success ? (
            <SuccessMessage message="Upadated successfully.." />
          ) : (
            ""
          )}
          {updatePackage()}
        </div>
        <div className="col-4">
          {send_error ? (
            <ErrorMessage
              hea="Access denied... :("
              message="Unable to send the package"
            />
          ) : (
            ""
          )}
          {send_success ? (
            <SuccessMessage message="Package sent Successfuly" />
          ) : (
            ""
          )}

          {sendPackage()}
        </div>
        <div className="col-4">
          {reload ? (
            <Tracker_shipper
              setReload={setReload}
              reload={reload}
              Batch_id={Batch_id}
              name={name}
              Des={Des}
              Quan={Quan}
              mnfdate={mnfdate}
              expdate={expdate}
              manufacturer={manufacturer}
              wholeseller={wholeseller}
              distributor={distributor}
              pharmacist={pharmacist}
              status={status}
            />
          ) : (
            trackshipment()
          )}
        </div>
      </div>
    </div>
  );
};
export default Distributor;
