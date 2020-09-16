import React, { useState } from "react";
import { Button, Segment, Step, Icon } from "semantic-ui-react";
import web3 from "../etherium/web3";
import { getAddressById } from "../etherium/Factory";
import { trackPackage, getMed_info } from "../etherium/MedicineDeploy";
import DisplayTracker from "./DisplayTracker";

const Batchdetails = ({ bid }) => {
  const [loadInfo, setLoadinfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reload, setreload] = useState(false);
  const [stat, setStat] = useState({
    b_id: "",
    name: "",
    des: "",
    manu_date: "",
    exp_date: "",
    manuFctr: "",
    wholese: "",
    distri: "",
    pharma: "",
    shipment: "",
    quantity: "",
  });

  

  const {
    b_id,
    name,
    des,
    manu_date,
    exp_date,
    manuFctr,
    wholese,
    distri,
    pharma,
    shipment,
    quantity,
  } = stat;

  const bDetails = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const accounts = await new web3.eth.getAccounts();
      const sender = accounts[0];
      const med_address = await getAddressById(sender, bid);
      const sts = await trackPackage(med_address, sender);
      const details = await getMed_info(med_address, sender);

      console.log("===============> details", details);
      console.log("===============> details", details.Manu);

      console.log("====================================");
      console.log("status is===>", sts);
      console.log("====================================");
      // store info in the state
      setStat({
        ...stat,
        shipment: sts,
        b_id: bid,
        name: details.RM,
        des: details.Des,
        manu_date: details.mdate,
        exp_date: details.exdate,
        manuFctr: details.Manu,
        wholese: details.whol,
        distri: details.destri,
        pharma: details.phar,
        quantity: details.Quant,
      });

      setLoading(false);
      setLoadinfo(true);
    } catch (error) {
      console.log("got error==>", error);
    }
  };

  const loadbatch = () => (
    <div className="row alert alert-dark" role="alert">
      <p className="col-8">{bid}</p>
      <Button color="violet" onClick={bDetails} loading={loading}>
        View more
      </Button>
    </div>
  );

  return (
    <div>
      <div>
        {loadInfo ? (
          <DisplayTracker
            b_id={b_id}
            name={name}
            des={des}
            manu_date={manu_date}
            exp_date={exp_date}
            manuFctr={manuFctr}
            wholese={wholese}
            distri={distri}
            pharma={pharma}
            shipment={shipment}
            quantity={quantity}
            
          />
        ) : (
          loadbatch()
        )}
      </div>
    </div>
  );
};

export default Batchdetails;
