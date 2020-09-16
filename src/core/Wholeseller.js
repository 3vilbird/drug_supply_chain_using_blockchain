import React, { useState, useEffect } from "react";
import web3 from "../etherium/web3";
import {
  receivedByW,
  trackPackage,
  getMed_info,
} from "../etherium/MedicineDeploy";
import { deployWD } from "../etherium/MedicineWDdeploy";
import Topbar from "./reusableComponents/Topbar";
import { Button, Segment, Input } from "semantic-ui-react";
import {
  getAddressById,
  add_wd_address,
  get_wd_address,
} from "../etherium/Factory";
import SuccessMessage from "./reusableComponents/SuccessMessage";
import ErrorMessage from "./reusableComponents/ErrorMessage";
import Tracker_shipper from "./reusableComponents/Tracker_shipper";

const Wholeseller = () => {
  const [state, setState] = useState({
    batch_Id: "",
    bat_Id: "",
    med_address: "",
    shipper: "",
    receiver: "",
    loading: false,
    error: false,
    success: false,
    send_error: false,
    send_success: false,
    track_bid: "",
    load_tracker: false,
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
    track_error: "",
  });

  const [reload, setReload] = useState(false);
  useEffect(() => {}, [reload]);

  const handlechange = (name) => (event) => {
    setState({
      ...state,
      send_error: false,
      error: false,
      [name]: event.target.value,
    });
  };
  // destructure
  const {
    med_address,
    shipper,
    receiver,
    batch_Id,
    loading,
    send_success,
    send_error,
    success,
    error,
    bat_Id,
    track_bid,
    load_tracker,
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

  //********************* PACKAGE RECEIVED BY WHOLWSELLER *********************/

  const pkgReceved = async (event) => {
    event.preventDefault();

    if (batch_Id == "") {
      alert("Please Enter the Batch  id");
    } else {
      try {
        setState({ ...state, loading: true });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const M_address = await getAddressById(sender, batch_Id);
        console.log("thre address is ==>", M_address);
        const sts = await receivedByW(M_address, sender);
        console.log("the status of the package is =====>", sts);
        setState({
          ...state,
          loading: false,
          error: false,
          batch_Id: "",
          success: true,
        });
      } catch (error) {
        console.log("some error occured==>", error);
        setState({
          ...state,
          loading: false,
          error: true,
          batch_Id: "",
        });
      }
    }
  };
  //********************* SEND PACKAGE TO DISTRIBUTOR *********************/

  const send_wd = async (event) => {
    event.preventDefault();

    if (bat_Id == "" || shipper == "" || receiver == "") {
      alert("Please Do fill all the fields... :)");
    } else {
      try {
        setState({ ...state, loading: true });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const m_address = await getAddressById(sender, batch_Id);

        // args batchId, sender, shipper, receiver
        // might have some bugs
        const wdinstance = await deployWD(
          m_address,
          sender,
          shipper,
          receiver,
          batch_Id
        );
        console.log("====================================");
        console.log(
          "the sub contract w to d deployed at and added to the  factory==>",
          wdinstance.options.address
        );
        // 0x4fE2C9c072168Bf0Dc930610fC8B857D6937a5f9
        console.log("====================================");
        const add = await add_wd_address(
          bat_Id,
          wdinstance.options.address,
          // "0x4fE2C9c072168Bf0Dc930610fC8B857D6937a5f9",
          sender
        );

        console.log(
          "the values of the atste are==>",

          batch_Id,
          "and==>",

          bat_Id
        );

        // const st = await get_wd_address(batch_Id, sender);
        const st = await get_wd_address(bat_Id, sender);

        console.log("====================================");
        console.log("the wd address=>", st);
        console.log("====================================");

        // reset the form
        setState({
          ...state,
          bat_Id: "",
          shipper: "",
          receiver: "",
          loading: false,
          send_success: true,
        });
      } catch (error) {
        console.log("we got some errorfrom wholeseller page==>", error);
        setState({
          ...state,
          loading: false,
          send_error: true,
          bat_Id: "",
          shipper: "",
          receiver: "",
        });
      }
    }
  };
  //**************************** TRACK THE STATUS OF THE PACKAGE******************/

  const track = async (event) => {
    event.preventDefault();
    if (track_bid == "") {
      alert("Please enter the batch id");
    } else {
      try {
        setState({ ...state, load_tracker: true });
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];
        const med_adrres = await getAddressById(sender, track_bid);
        console.log("med address=>", med_adrres);
        const info = await getMed_info(med_adrres, sender);
        const sts = await trackPackage(med_adrres, sender);

        setState({
          ...state,
          track_bid: "",
          load_tracker: false,
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
        setState({ ...state, track_error: true });
        console.log("got some error while tracking from wholeseller");
      }
    }
  };
  //******************************* ALL TAMPLETS GGOES HERE ***********************/
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
                  Enter the batch Id
                </label>
                <input
                  onChange={handlechange("batch_Id")}
                  className="form-control"
                  type="text"
                  value={batch_Id}
                />
              </div>

              <Button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={pkgReceved}
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
                  Batch Id:
                </label>
                <input
                  onChange={handlechange("bat_Id")}
                  className="form-control"
                  type="text"
                  value={bat_Id}
                />
              </div>
              <div className="form-group">
                <label className="text-dark" style={{ fontSize: "1.5rem" }}>
                  Shipper :
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
                  Receiver :
                </label>
                <input
                  onChange={handlechange("receiver")}
                  className="form-control"
                  type="text"
                  value={receiver}
                />
              </div>
              <Segment inverted>
                <Button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={send_wd}
                  basic
                  inverted
                  color="teal"
                  loading={loading}
                >
                  send package
                </Button>
              </Segment>
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
                  onClick={track}
                  loading={load_tracker}
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
  //******************************* END OF TAMPLET ***********************/

  return (
    <div>
      <Topbar
        title="Wholeseller..!"
        description="can receive and ship the shipment"
      />

      <div className="row ml-5">
        <div className="col-4">
          {success ? <SuccessMessage message="Updated successfully...!" /> : ""}
          {error ? (
            <ErrorMessage
              hea="Access Denied ...!"
              message="unable to update the shipment... :("
            />
          ) : (
            ""
          )}
          {updatePackage()}
        </div>

        <div className="col-4">
          {send_success ? (
            <SuccessMessage message="sent successfully...!" />
          ) : (
            ""
          )}
          {send_error ? (
            <ErrorMessage
              hea="Access Denied...!"
              message="Unable to send the shipment.. :("
            />
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
          ) : track_error ? (
            <ErrorMessage
              message="unable to track the package"
              hea="Access Denied"
            />
          ) : (
            trackshipment()
          )}
        </div>
      </div>
    </div>
  );
};

export default Wholeseller;
