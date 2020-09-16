import React, { useState, useEffect } from "react";
import { receivedp, getBatchIdStatus } from "../etherium/MedicineDPdeploy";
import web3 from "../etherium/web3";
import Topbar from "./reusableComponents/Topbar";
import { Button, Segment, Input } from "semantic-ui-react";
import SuccessMessage from "./reusableComponents/SuccessMessage";
import ErrorMessage from "./reusableComponents/ErrorMessage";
import { get_dP_address, getAddressById } from "../etherium/Factory";
import { trackPackage, getMed_info } from "../etherium/MedicineDeploy";
import Load_info_to_pharma from "./reusableComponents/Load_info_to_pharma";

const Pharma = () => {
  const [value, setValue] = useState({
    batch_id: "",
    track_bid: "",
    loading: false,
    recev_success: false,
    receve_error: false,
    track_loader: false,
    info_error: false,
    load_info: false,
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
  });

  const [reload, setReload] = useState(false);

  useEffect(() => {}, [reload]);

  const handlechange = (name) => (event) => {
    setValue({ ...value, [name]: event.target.value });
  };
  // destructure
  const {
    batch_id,
    track_bid,
    loading,
    recev_success,
    receve_error,
    track_loader,
    info_error,
    load_info,
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
  } = value;

  /**************** PACKAGE RECEIVED BY THE PHARMA ***********************/
  const onSubmit = async (event) => {
    event.preventDefault();

    if (batch_id == "") {
      alert("Please enter the batch id ");
    } else {
      try {
        setValue({
          ...value,
          loading: true,
          receve_error: false,
          recev_success: false,
        });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        // const sts = await get_wd_address(99, sender);
        const med_address = await getAddressById(sender, batch_id);
        console.log("med_address ====>", med_address);

        const dp_address = await get_dP_address(batch_id, sender);
        console.log("dp_address ====>", dp_address);

        let sts = await receivedp(dp_address, med_address, sender);
        console.log("the status of the package is =====>", sts);
        setValue({ ...value, loading: false, recev_success: true });
      } catch (error) {
        console.log("some error occured==>", error);
        setValue({ ...value, loading: false, receve_error: true });
      }
    }
  };
  /******************* TRACK THE PACKAGE *********************************/
  const trackpackage = async (event) => {
    event.preventDefault();
    console.log("tracker from pharma==>");

    if (track_bid == "") {
      alert("please enter the batch id");
    } else {
      try {
        setValue({ ...value, track_loader: true });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        const med_address = await getAddressById(sender, track_bid);
        console.log("med_address ====>", med_address);

        // load medicine info
        const info = await getMed_info(med_address, sender);
        console.log("med_info==>", info);

        //load shipment Track
        const track = await trackPackage(med_address, sender);
        console.log("the tarck of the medicine is ==>", track);

        // console.log("===>", lol);
        setValue({
          ...value,
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
          track_bid: "",
          track_loader: false,
          load_info: true,
        });
        setReload(true);
      } catch (error) {
        console.log("oops fired with some error==>", error);
        // setValue({ ...value, track_loader: false, info_error: true });
      }
    }
  };
  /************************* ALL TAMPLETS GOES HERE *************************/
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
                  Enter Batch Id :
                </label>
                <input
                  onChange={handlechange("batch_id")}
                  className="form-control"
                  type="text"
                  value={batch_id}
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
                  onChange={handlechange("track_bid")}
                  value={track_bid}
                />
                <Button
                  basic
                  inverted
                  color="teal"
                  className="ml-4"
                  loading={track_loader}
                  onClick={trackpackage}
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
  /************************** END OF TAMPLET **************************************/
  return (
    <div>
      <Topbar title="Pharmasist..!" description="Trusted drug seller" />
      <div className="row ml-5">
        <div className="col-6">
          {recev_success ? (
            <SuccessMessage message="Updated successfully... :)" />
          ) : (
            ""
          )}
          {receve_error ? (
            <ErrorMessage
              hea="Access Denied..!"
              message="Unabel to update the package"
            />
          ) : (
            ""
          )}

          {updatePackage()}
        </div>
        <div className="col-6">
          {info_error ? (
            <ErrorMessage message="Something went wrong..:(" />
          ) : (
            ""
          )}

          {reload ? (
            <Load_info_to_pharma
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
              setReload={setReload}
              reload={reload}
            />
          ) : (
            trackshipment()
          )}
        </div>
      </div>
    </div>
  );
};

export default Pharma;
