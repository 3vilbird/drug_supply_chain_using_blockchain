import web3 from "./web3";
import authenticate from "./build/Authenticate.json";
import factory from "./build/MedicineFactory.json";

//************************* AUTHENTICATION ****************************/
// this is for authentication
export const deployAuthContract = async (sender) => {
  return await new web3.eth.Contract(JSON.parse(authenticate.interface))
    .deploy({
      data: authenticate.bytecode,
    })
    .send({ from: sender, gas: "1000000" });
};

// adding the user into block chain
// TODO make sure that the caller is the admin
export const AddNewUser = async (address, name, email, role, sender) => {
  //get the instance of the contract
  const authInstance = await new web3.eth.Contract(
    JSON.parse(authenticate.interface),
    process.env.REACT_APP_AUTH
  );
  await authInstance.methods
    .setAccounts(address, email, name, role)
    .send({ from: sender });
  // temporarly return the list of user
  return await authInstance.methods
    .verifyUser(address, email)
    .call({ from: sender });
};

// authentication route
export const Login = async (sender, username) => {
  //get the instance of the contract
  const authInstance = await new web3.eth.Contract(
    JSON.parse(authenticate.interface),
    process.env.REACT_APP_AUTH
  );
  return await authInstance.methods
    .verifyUser(sender, username)
    .call({ from: sender });
};
//******************************** FACTORY *********************************/
// this is to deploy the factory
export const deployFactoryContract = async (sender) => {
  return await new web3.eth.Contract(JSON.parse(factory.interface))
    .deploy({
      data: factory.bytecode,
    })
    .send({ from: sender, gas: "1000000" });
};
// adding the batch to the fadctory;

export const addToFactory = async (_address, bId, sender) => {
  const factInstance = await new web3.eth.Contract(
    JSON.parse(factory.interface),
    process.env.REACT_APP_FACT
  );
  await factInstance.methods
    .setFactory_address(_address, bId)
    .send({ from: sender });

  return factInstance.methods.getBatchIds().call({ from: sender });
};

// helper function to get fact instance
const Finstance = async () => {
  return await new web3.eth.Contract(
    JSON.parse(factory.interface),
    process.env.REACT_APP_FACT
  );
};

// getting the  all deployed batche ids
export const getAllbIds = async (sender) => {
  const factInstance = await new web3.eth.Contract(
    JSON.parse(factory.interface),
    process.env.REACT_APP_FACT
  );
  return await factInstance.methods.getBatchIds().call({ from: sender });
};

// get address by batch id
export const getAddressById = async (sender, id) => {
  const factInstance = await new web3.eth.Contract(
    JSON.parse(factory.interface),
    process.env.REACT_APP_FACT
  );
  return await factInstance.methods.getBatchAddress(id).call({ from: sender });
};
//add wd address to factory
export const add_wd_address = async (bid, wd_address, sender) => {
  const factInstance = await new web3.eth.Contract(
    JSON.parse(factory.interface),
    process.env.REACT_APP_FACT
  );

  await factInstance.methods
    .setwdAddress(bid, wd_address)
    .send({ from: sender });
};

// get wd_address by bid
export const get_wd_address = async (bid, sender) => {
  const factInstance = await new web3.eth.Contract(
    JSON.parse(factory.interface),
    process.env.REACT_APP_FACT
  );
  return await factInstance.methods.getwdAddress(bid).call({ from: sender });
};


// add d_p_adrress to the factory
export const add_dp_address = async (bid, dp_address, sender) => {
  const factInstance = await Finstance();
  await factInstance.methods
    .setdpAddress(bid, dp_address)
    .send({ from: sender });
};
// get dp_address by id
export const get_dP_address = async (bid, sender) => {
  const factInstance = await Finstance();
  return await factInstance.methods.getdpAddress(bid).call({ from: sender });
};
