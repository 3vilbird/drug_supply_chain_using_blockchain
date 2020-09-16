import Web3 from "web3";

let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  //WE ARE IN         browser
  web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
} else {
  const provider = new Web3.providers.HttpProvider("enter you infura key here");
  web3 = new Web3(provider);
}
export default web3;
