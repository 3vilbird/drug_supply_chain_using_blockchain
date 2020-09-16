import web3 from "./web3";
import medicinewd from "./build/MadicineW_D.json";
import medicine from "./build/Madicine.json";
import { add_wd_address, get_wd_address } from "./Factory";

export const deployWD = async (batchId, sender, shipper, receiver, bid) => {
  return await new web3.eth.Contract(JSON.parse(medicinewd.interface))
    .deploy({
      data: medicinewd.bytecode,
      arguments: [batchId, sender, shipper, receiver],
    })
    .send({ from: sender, gas: "5000000" });
};

// get batchidstatus
export const getBatchIdStatus = async (medimedicinewd_address, sender) => {
  const WDinstance = await new web3.eth.Contract(
    JSON.parse(medicinewd.interface),
    medimedicinewd_address
  );
  return await WDinstance.methods.getBatchIDStatus().call({ from: sender });
};

// picked from W to D ,on the way to distributr ,batchid==> medicine deployed address
// shipper is accessing this method so shipper and sender are same??????
export const pickWD = async (medimedicinewd_address, batchid, sender) => {
  //get the instance of the deployed dp contract
  const WDinstance = await new web3.eth.Contract(
    JSON.parse(medicinewd.interface),
    medimedicinewd_address
  );
  await WDinstance.methods.pickWD(batchid, sender).send({ from: sender });
  // get the instance of the medicine
  const medicine_instance = await new web3.eth.Contract(
    JSON.parse(medicine.interface),
    batchid
  );
  return await medicine_instance.methods
    .getBatchIDStatus()
    .call({ from: sender });
};

// package is received by the ditributor
// receiver is accessing this method so receiver and sender are same??????
export const recieveWD = async (medimedicinewd_address, batchid, receiver) => {
  const WDinstance = await new web3.eth.Contract(
    JSON.parse(medicinewd.interface),
    medimedicinewd_address
  );
  await WDinstance.methods
    .recieveWD(batchid, receiver)
    .send({ from: receiver });
  // get medicine contract instanec
  const medicine_instance = await new web3.eth.Contract(
    JSON.parse(medicine.interface),
    batchid
  );
  return await medicine_instance.methods
    .getBatchIDStatus()
    .call({ from: receiver });
};
