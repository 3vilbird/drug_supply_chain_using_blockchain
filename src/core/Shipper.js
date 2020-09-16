import React, { useState, useEffect } from "react";
import web3 from "../etherium/web3";
// import "../etherium/MedicineDeploy";
import { pickMW, trackPackage, getMed_info } from "../etherium/MedicineDeploy";
import { pickWD } from "../etherium/MedicineWDdeploy";
import { pickdp, getBatchIdStatus } from "../etherium/MedicineDPdeploy";
import Topbar from "./reusableComponents/Topbar";
import { Button, Segment, Input } from "semantic-ui-react";
import {
  getAddressById,
  get_wd_address,
  get_dP_address,
} from "../etherium/Factory";
import SuccessMessage from "./reusableComponents/SuccessMessage";
import ErrorMessage from "./reusableComponents/ErrorMessage";
import Load_info_to_pharma from "./reusableComponents/Load_info_to_pharma";
import Tracker_shipper from "./reusableComponents/Tracker_shipper";

// TODO give options for the shipper m-w or w-d or d-p based on that
// call render the componentes

const Shipper = () => {
  const [state, setState] = useState({
    batch_Id: "",
    s_type: "",
    st_type: "",
    loading: "",
    success: false,
    error: false,
    track_loader: false,
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
    status: "",
    track_error: false,
  });
  const [reload, setReload] = useState(false);
  useEffect(() => {}, [reload]);

  const handlechange = (name) => (event) => {
    setState({
      ...state,
      error: false,
      [name]: event.target.value,
    });
  };
  // destructure
  const {
    batch_Id,
    success,
    error,
    loading,
    s_type,
    st_type,
    track_loader,
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
    status,
    track_error,
  } = state;

  const splitter = async (event) => {
    event.preventDefault();
    if (batch_Id == "") {
      alert("Please enter the batch id");
    } else {
      switch (s_type) {
        case "1":
          onSubmit();
          break;
        case "2":
          updateW_D();
          break;
        case "3":
          updateD_P();
          break;

        default:
          alert("please do select the type of shipper");
          break;
      }
    }
  };
  // splitter to track the shipment of different shippers
  const track_splitter = async (event) => {
    event.preventDefault();
    if (batch_Id == "") {
      alert("please  enter the batch id");
    } else {
      switch (st_type) {
        case "1":
          get_sts_mw_shipment();
          break;
        case "2":
          get_sts_wd_shipment();
          break;
        case "3":
          get_sts_dp_shipment();
          break;

        default:
          alert("please do select the type of shipper");
          break;
      }
    }
  };

  const onSubmit = async () =>
    // event
    {
      if (batch_Id === "") {
        alert("Please fill all the fields..");
      } else {
        try {
          // event.preventDefault();
          setState({ ...state, loading: true, error: false });

          const accounts = await web3.eth.getAccounts();
          const sender = accounts[0];
          const med_address = await getAddressById(sender, batch_Id);
          const sts = await pickMW(med_address, sender);
          console.log("the status of the package is =====>", sts);
          setState({
            state,
            loading: false,
            batch_Id: "",
            success: true,
          });
        } catch (error) {
          console.log("some error occured==>", error);

          setState({
            ...state,
            loading: false,
            batch_Id: "",
            error: true,
          });
        }
      }
    };

  const updateW_D = async () => {
    try {
      setState({ ...state, loading: true, error: false });
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];
      console.log("hellooooo from  w_d shipper");
      const med_address = await getAddressById(sender, batch_Id);
      console.log("med address=>", med_address);

      // const shat = await add_wd_address(batch_Id,"0x4fE2C9c072168Bf0Dc930610fC8B857D6937a5f9",sender)
      console.log(batch_Id);

      const wdAddress = await get_wd_address(batch_Id, sender);

      console.log("wd address ==>", wdAddress);

      const sts = await pickWD(wdAddress, med_address, sender);
      setState({ ...state, loading: false, success: true });

      console.log(
        "the status of the package from shipper of w_d is =====>",
        sts
      );
    } catch (error) {
      setState({ ...state, loading: false, error: true });

      console.log("some error occured==>", error);
    }
  };

  const updateD_P = async () => {
    // event.preventDefault();
    try {
      setState({ ...state, loading: true, error: false });

      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];

      console.log("hellooooo from  d_P shipper");

      const med_address = await getAddressById(sender, batch_Id);
      console.log("med_address ====>", med_address);

      const dp_address = await get_dP_address(batch_Id, sender);
      console.log("dp_address ====>", dp_address);

      const sss = await pickdp(dp_address, med_address, sender);
      // let sts = await getBatchIdStatus(dp_address, sender);
      console.log("the shipment status from d_p shipper ===>", sss);
      setState({ ...state, loading: false, success: true });
    } catch (error) {
      console.log("got someerror from the shipment page==>", error);
      setState({ ...state, loading: false, error: true });
    }
  };
  /************************************* ALL TAMPLETS GESO HERE *************************/
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
              <div className="form-group">
                <label
                  className="text-dark col-6"
                  style={{ fontSize: "1.5rem" }}
                >
                  Shipper Type :
                </label>
                <select
                  className="form-control "
                  onChange={handlechange("s_type")}
                  value={s_type}
                >
                  <option value="0">Select the shipper type</option>
                  <option value="1">Manufacturer to Wholeseller</option>
                  <option value="2">Wholeseller to Distributer</option>
                  <option value="3">Distributer to Pharma</option>
                </select>
              </div>

              <Button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={splitter}
                secondary
                loading={loading}
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
                  onChange={handlechange("batch_Id")}
                  value={batch_Id}
                />
                <Button
                  basic
                  inverted
                  color="teal"
                  className="ml-4"
                  onClick={track_splitter}
                  loading={track_loader}
                >
                  Track Shipment
                </Button>
              </Segment>
              <div className="form-group">
                <label
                  className="text-dark col-6"
                  style={{ fontSize: "1.5rem" }}
                >
                  Shipper Type :
                </label>
                <select
                  className="form-control "
                  onChange={handlechange("st_type")}
                  value={st_type}
                >
                  <option value="0">Select the shipper type</option>
                  <option value="1">Manufacturer to Wholeseller</option>
                  <option value="2">Wholeseller to Distributer</option>
                  <option value="3">Distributer to Pharma</option>
                </select>
              </div>
            </form>
          </p>
        </div>
      </div>
    </div>
  );
  /*********************************** TEMPLETS ENDS HERE *********************************/

  //**************************** SHIPMENT  TRACKERS STARTS HERE ********/
  const shipment_helper = (info, sts) => {
    setState({
      ...state,
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
  };

  const get_sts_mw_shipment = async () => {
    console.log("shipment tracker form m_w");
    //write the logic here
    try {
      setState({
        ...state,
        error: false,
        track_loader: true,
        track_error: false,
      });
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];
      const med_adrres = await getAddressById(sender, batch_Id);
      console.log("med address=>", med_adrres);
      const info = await getMed_info(med_adrres, sender);
      const sts = await trackPackage(med_adrres, sender);
      console.log("====================================");
      console.log("the stasus of the package is==> ", sts);
      console.log("====================================");
      setState({
        ...state,
        error: false,
        track_loader: false,
        st_type: "",
        batch_Id: "",
        load_info: true,
      });
      shipment_helper(info, sts);
      setReload(true);
    } catch (error) {
      console.log("===> we got some error in tracking the shipment M_W", error);
      setState({
        ...state,
        error: false,
        track_loader: false,
        st_type: "",
        batch_Id: "",
        track_error: true,
      });
    }
  };
  const get_sts_wd_shipment = async () => {
    console.log("shipment tracker form w_d");
    //write the logic here

    try {
      setState({
        ...state,
        error: false,
        track_loader: true,
        track_error: false,
      });

      const accounts = await new web3.eth.getAccounts();
      const sender = accounts[0];
      const med_adrres = await getAddressById(sender, batch_Id);
      const info = await getMed_info(med_adrres, sender);
      const wdAddress = await get_wd_address(batch_Id, sender);
      const sts = await getBatchIdStatus(wdAddress, sender);

      console.log("the status from w_d contract ==> ", sts);
      setState({
        ...state,
        error: false,
        track_loader: false,
        st_type: "",
        batch_Id: "",
      });
      shipment_helper(info, sts);
      setReload(true);
    } catch (error) {
      console.log(
        "we  got some error while getting the status w_d shipment",
        error
      );
      setState({
        ...state,
        error: false,
        track_loader: false,
        st_type: "",
        batch_Id: "",
        track_error: true,
      });
    }
  };
  const get_sts_dp_shipment = async () => {
    console.log("shipment tracker form d_p");

    //write the logic here
    try {
      setState({
        ...state,
        error: false,
        track_loader: true,
        track_error: false,
      });
      const accounts = await new web3.eth.getAccounts();
      const sender = accounts[0];
      const med_adrres = await getAddressById(sender, batch_Id);
      const info = await getMed_info(med_adrres, sender);
      const sts = await trackPackage(med_adrres, sender);
      console.log("====================================");
      console.log("the stasus of the package is==> ", sts);
      console.log("====================================");
      shipment_helper(info, sts);
      setReload(true);
      setState({
        ...state,
        error: false,
        track_loader: false,
        st_type: "",
        batch_Id: "",
      });
    } catch (error) {
      console.log("we got some error from tracker d_p", error);
      setState({
        ...state,
        error: false,
        track_loader: false,
        st_type: "",
        batch_Id: "",
        track_error: true,
      });
    }
  };
  //**************************** SHIPMENT  TRACKERS ENDS HERE ********/

  return (
    <div>
      <Topbar title="Shipper...!" description="trusted shipper" />

      <div className="col-3 ml-5">
        {success ? <SuccessMessage message="Updated successfully... :)" /> : ""}
        {error ? (
          <ErrorMessage
            message="You are not authorized...! "
            hea="Access denied.... :("
          />
        ) : (
          ""
        )}
      </div>
      <div className="row">
        <div className="col-7 ml-5  ">{updatePackage()}</div>
        <div className="col-4 ">
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
          ) : track_error ? (
            <ErrorMessage message="Oops ! something went wrong..." />
          ) : (
            trackshipment()
          )}
        </div>
      </div>
    </div>
  );
};
export default Shipper;
