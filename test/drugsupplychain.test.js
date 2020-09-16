const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const medicine = require("../src/etherium/build/Madicine.json");
const medicineDP = require("../src/etherium/build/MadicineD_P.json");
const medicineWD = require("../src/etherium/build/MadicineW_D.json");
const authenticate = require("../src/etherium/build/Authenticate.json");
const medicinefactory = require("../src/etherium/build/MedicineFactory.json");

let madicine;
let medicine_w_d;
let medicineD_P;
let accounts;
let user_auth;

// beforeEach(async () => {
// accounts = await web3.eth.getAccounts();
//   madicine = await new web3.eth.Contract(JSON.parse(medicine.interface))
//     .deploy({
//       data: medicine.bytecode,
//       arguments: [
//         accounts[0],
//         "this is a test",
//         3,
//         accounts[1],
//         accounts[2],
//         1,
//       ],
//     })
//     .send({ from: accounts[0], gas: "1000000" });

// console.log("the contract deployed at ====>", madicine.options.address);
// });

// lets test the madicine
describe("testing the medicine contract", () => {
  // test to deploy a contract
  // it("it deployes a contracct", () => {
  //   assert.ok(madicine.options.address);
  // });
  // // test for the medicine  info
  // it("this checks for the content of the medicine info", async () => {
  //   const madicineInfo = await madicine.methods.getMadicineInfo().call({
  //     from: accounts[0],
  //   });
  //   // console.log(madicineInfo);
  //   assert.equal(String(accounts[0]), madicineInfo.Manu);
  //   assert.equal("this is a test", madicineInfo.Des);
  //   assert.equal("raw materials", madicineInfo.RM);
  //   assert.equal(3, madicineInfo.Quant);
  //   assert.equal(String(accounts[1]), madicineInfo.Shpr);
  // });
  // // getting the package info
  // it("this will get the package status", async () => {
  //   const stus = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[0],
  //   });
  //   // console.log("=====================>", stus);
  //   // now the medicine is with manufaturer
  //   assert.equal(0, stus);
  // });
  // // this  is to ckeck the W D P
  // it("check for the wholeseller", async () => {
  //   const stus = await madicine.methods.getWDP().call({
  //     from: accounts[0],
  //   });
  //   assert.equal(String(accounts[2]), stus[0]);
  // });
  // // test to pick the package give the same shipper address
  // it("test for the pick package", async () => {
  //   await madicine.methods.pickPackage(accounts[1]).send({ from: accounts[1] });
  //   const status = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[1],
  //   });
  //   assert.equal(1, status);
  // });
  // // test to receive the package
  // it("test for the receive package", async () => {
  //   await madicine.methods.pickPackage(accounts[1]).send({ from: accounts[1] });
  //   await madicine.methods
  //     .receivedPackage(accounts[2])
  //     .send({ from: accounts[2] });
  //   const status = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[2],
  //   });
  //   assert.equal(3, status);
  // });
  // test from manufacturer to wholeseller to distributer
  // it("test from manufacturer to wholeseller to distributer to pharma end to end test", async () => {
  //   // pick the package from Manu
  //   await madicine.methods.pickPackage(accounts[1]).send({ from: accounts[1] });
  //   // package received at wholeseller
  //   await madicine.methods
  //     .receivedPackage(accounts[2])
  //     .send({ from: accounts[2] });
  //   const status = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[2],
  //   });
  //   // ******************************************* here starts the wholeseller to distributor**********
  //   medicine_w_d = await new web3.eth.Contract(JSON.parse(medicineWD.interface))
  //     .deploy({
  //       data: medicineWD.bytecode,
  //       arguments: [
  //         madicine.options.address,
  //         accounts[2],
  //         accounts[3],
  //         accounts[4],
  //       ],
  //     })
  //     .send({ from: accounts[2], gas: "1000000" });
  //   // console.log("medicine_w_d deployed at ====>", medicine_w_d);
  //   sta = await medicine_w_d.methods.getBatchIDStatus().call({
  //     from: accounts[2],
  //   });
  //   // // so package is with wholeseller
  //   console.log("===================> pakage status", sta);
  //   // pick the package fro the wholeseller so shipper test
  //   await medicine_w_d.methods
  //     .pickWD(madicine.options.address, accounts[3])
  //     .send({ from: accounts[3] });
  //   sta = await medicine_w_d.methods.getBatchIDStatus().call({
  //     from: accounts[3],
  //   });
  //   // so package is with shipper
  //   console.log("===================> pakage status", sta);
  //   stat = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[3],
  //   });
  //   console.log("====> status from the global  contract==>", stat);
  //   // package received  at distributor
  //   await medicine_w_d.methods
  //     .recieveWD(madicine.options.address, accounts[4])
  //     .send({ from: accounts[4] });
  //   stat = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[3],
  //   });
  //   // package received at destributor
  //   console.log("====> status from the global  contract==>", stat);
  //   //*********************************** here starts the Distributor to pharma****************
  //   medicineD_P = await new web3.eth.Contract(JSON.parse(medicineDP.interface))
  //     .deploy({
  //       data: medicineDP.bytecode,
  //       arguments: [
  //         madicine.options.address,
  //         accounts[4],
  //         accounts[5],
  //         accounts[6],
  //       ],
  //     })
  //     .send({ from: accounts[2], gas: "1000000" });
  //   // package picked for pharma by associated shipper
  //   await medicineD_P.methods
  //     .pickDP(madicine.options.address, accounts[5])
  //     .send({ from: accounts[5] });
  //   // ckeck in the global
  //   // picked for pharma
  //   stat = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[5],
  //   });
  //   console.log("====> status from the global  contract==>", stat);
  //   // delivered  at pharma..
  //   await medicineD_P.methods
  //     .recieveDP(madicine.options.address, accounts[6])
  //     .send({ from: accounts[6] });
  //   // final check that the package is received
  //   stat = await madicine.methods.getBatchIDStatus().call({
  //     from: accounts[5],
  //   });
  //   console.log("====> status from the global  contract==>", stat);
  //   console.log("deployed contract by w_d==> ", medicine_w_d);
  // });
  //********************************************************************************************/
  // it("this will deploy the authenticate contract", async () => {
  //   user_auth = await new web3.eth.Contract(JSON.parse(authenticate.interface))
  //     .deploy({
  //       data: authenticate.bytecode,
  //     })
  //     .send({ from: accounts[0], gas: "1000000" });
  //   console.log("contract deployed at ==>", user_auth.options.address);
  // });
});

it("this will deploy the medicinefactory contract", async () => {
  accounts = await web3.eth.getAccounts();

  _auth = await new web3.eth.Contract(JSON.parse(medicinefactory.interface))
    .deploy({
      data: medicinefactory.bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("contract deployed at ==>", _auth.options.address);
  await _auth.methods
    .setwdAddress("22", "0x1a200AeA63aED3076d5c54f3f5F7fE8EdA3452a1")
    .send({ from: accounts[0] });
  const lol = await _auth.methods.getwdAddress(22).call({ from: accounts[0] });
  console.log("======>", lol);
});
