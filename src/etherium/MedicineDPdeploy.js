import web3 from "./web3";
import medicine from "./build/Madicine.json";
import medicinedp from "./build/MadicineD_P.json";
import { add_dp_address, get_dP_address } from "./Factory";

export const deployDP = async (batchId, sender, shipper, receiver, bid) => {
  const dp_inst = await new web3.eth.Contract(JSON.parse(medicinedp.interface))
    .deploy({
      data: medicinedp.bytecode,
      arguments: [batchId, sender, shipper, receiver],
    })
    .send({ from: sender, gas: "2000000" });
  await add_dp_address(bid, dp_inst.options.address, sender);
  return await get_dP_address(bid, sender);
};

// Now at access the already deployed contract pass the deployed address as a second parameter
// to get batchIdStatus
export const getBatchIdStatus = async (medimedicinedp_address, sender) => {
  const DPinstance = await new web3.eth.Contract(
    JSON.parse(medicinedp.interface),
    medimedicinedp_address
  );
  return await DPinstance.methods.getBatchIDStatus().call({ from: sender });
};

// picked from D to P ,on the way to pahrma ,batchid==> medicine deployed address
// shipper is accessing this method so shipper and sender are same??????
export const pickdp = async (medimedicinedp_address, batchid, sender) => {
  //get the instance of the deployed dp contract
  const DPinstance = await new web3.eth.Contract(
    JSON.parse(medicinedp.interface),
    medimedicinedp_address
  );
  await DPinstance.methods.pickDP(batchid, sender).send({ from: sender });
  return await DPinstance.methods.getBatchIDStatus().call({ from: sender });
};

// package is received by the pharma
// receiver is accessing this method so receiver and sender are same??????
export const receivedp = async (medimedicinedp_address, batchid, sender) => {
  const DPinstance = await new web3.eth.Contract(
    JSON.parse(medicinedp.interface),
    medimedicinedp_address
  );
  await DPinstance.methods.recieveDP(batchid, sender).send({ from: sender });
  return DPinstance.methods.getBatchIDStatus().call({ from: sender });
};
