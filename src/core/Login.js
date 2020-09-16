import React, { useState, useEffect } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import Signin from "./reusableComponents/Signin";
import Topbar from "./reusableComponents/Topbar";
import { getAddressById } from "../etherium/Factory";
import { Button, Divider, Form, Grid, Segment, Input } from "semantic-ui-react";
import { trackPackage, getMed_info } from "../etherium/MedicineDeploy";
import web3 from "../etherium/web3";
import Load_info_to_pharma from "./reusableComponents/Load_info_to_pharma";
import ErrorMessage from "./reusableComponents/ErrorMessage";

const Login = () => {
  const [loadsignin, setLoadsignin] = useState(false);
  const [loadbase, setLoadbase] = useState(true);
  const [reload, setReload] = useState(false);
  const [batch_id, setBatch_id] = useState({
    bid: "",
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
  });
  const [state, setState] = useState({ loading: false, info_error: false });
  const {
    bid,
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
  } = batch_id;
  const { loading, info_error } = state;

  const handlechange = (name) => (event) => {
    setState({ ...state, info_error: false });
    setBatch_id({ ...batch_id, [name]: event.target.value });
  };

  const onSubmit = () => {
    setLoadsignin(true);
    setLoadbase(false);
  };

  useEffect(() => {}, [reload]);

  const load_info = async (event) => {
    event.preventDefault();
    if (bid === "") {
      alert("please enter the batch id");
    } else {
      //
      try {
        setState({ ...state, loading: true, info_error: false });

        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0];

        const med_address = await getAddressById(sender, bid);
        console.log("med_address ====>", med_address);
        // load medicine info
        const info = await getMed_info(med_address, sender);
        console.log("med_info==>", info);
        //load shipment Track
        const sts = await trackPackage(med_address, sender);
        console.log("the tarck of the medicine is ==>", sts);

        setBatch_id({
          ...batch_id,
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
          bid: "",
        });
        setReload(true);
        setState({ ...state, loading: false });
      } catch (error) {
        console.log("====================================");
        console.log("got error while loading the info", error);
        console.log("====================================");
        setState({ ...state, loading: false, info_error: true });
        setBatch_id({ ...batch_id, bid: "" });
      }
    }
  };

  /*************************************  TAMPLETS *************/
  const basicTamplet = () => (
    <div className="col-5">
      <div
        className="card"
        style={{
          width: "50rem",
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
          <p className="card-text">{advanced_tamplet()}</p>
        </div>
      </div>
    </div>
  );

  const advanced_tamplet = () => (
    <Segment placeholder inverted>
      <Grid columns={2} relaxed="very" stackable>
        <Grid.Column>
          <form>
            <Signin />
          </form>
        </Grid.Column>

        <Grid.Column>
          <form>
            <div className="form-group ">
              <label className="text  col-6" style={{ fontSize: "1.5rem" }}>
                Batch id :
              </label>
              <input
                onChange={handlechange("bid")}
                className="form-control"
                placeholder="Batch_id"
                type="text"
                value={bid}
              />
            </div>
            <Button inverted color="teal" loading={loading} onClick={load_info}>
              Get info ..!
            </Button>
          </form>
        </Grid.Column>
      </Grid>

      <Divider vertical style={{ color: "white" }}>
        OR
      </Divider>
    </Segment>
  );

  return (
    <div>
      <Topbar
        title="DRUG SUPPLY CHAIN... !"
        description="YOU'R SECURITY IS OUR RESPONSIBILITY"
      />
      <div className="" style={{ marginLeft: "30%" }}>
        <div className="col-6">
          {info_error ? (
            <ErrorMessage
              hea="Something is wrong... :("
              message="We don't have the information about this medicine in db"
            />
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
            basicTamplet()
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
