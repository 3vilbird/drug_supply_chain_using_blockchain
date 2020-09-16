import web3 from "./web3";
import medicine from "./build/Madicine.json";

// deploy new medicine batch
export const deployMed = async (
  name,
  hatchId,
  quantity,
  manufacturedDate,
  expiryDate,
  shipper,
  receiver,
  description,
  receiverType,
  manufacturer
) => {
  return await new web3.eth.Contract(JSON.parse(medicine.interface))
    .deploy({
      data: medicine.bytecode,
      arguments: [
        name,
        hatchId,
        manufacturedDate,
        expiryDate,
        manufacturer,
        description,
        quantity,
        shipper,
        receiver,
        receiverType,
      ],
    })
    .send({ from: manufacturer, gas: "5000000" });
};

// helper methoad to get the instance of the deployed medicine contract
const me_instance = async (medicine_address) => {
  return await new web3.eth.Contract(
    JSON.parse(medicine.interface),
    medicine_address
  );
};

//package pickedup by shipper
export const pickMW = async (medicine_address, sender) => {
  //get the instance of the deployed dp contract
  const Medicineinstance = await new web3.eth.Contract(
    JSON.parse(medicine.interface),
    medicine_address
  );
  await Medicineinstance.methods.pickPackage(sender).send({ from: sender });
  return await Medicineinstance.methods
    .getBatchIDStatus()
    .call({ from: sender });
};

// package received by the wholeseller or distributor receivedPackage
export const receivedByW = async (medicine_address, sender) => {
  //get the instance of the deployed dp contract
  const Medicineinstance = await new web3.eth.Contract(
    JSON.parse(medicine.interface),
    medicine_address
  );
  await Medicineinstance.methods.receivedPackage(sender).send({ from: sender });
  return await Medicineinstance.methods
    .getBatchIDStatus()
    .call({ from: sender });
};

// getting package status
export const trackPackage = async (medicine_address, sender) => {
  //get the instance of the deployed dp contract
  // const Medicineinstance = await new web3.eth.Contract(
  //   JSON.parse(medicine.interface),
  //   medicine_address
  // );
  const Medicineinstance = await me_instance(medicine_address);
  return await Medicineinstance.methods
    .getBatchIDStatus()
    .call({ from: sender });
};

// get medicine info
export const getMed_info = async (med_address, sender) => {
  //get the instance of the deployed dp contract
  const Medicineinstance = await new web3.eth.Contract(
    JSON.parse(medicine.interface),
    med_address
  );
  return await Medicineinstance.methods
    .getMadicineInfo()
    .call({ from: sender });
};
