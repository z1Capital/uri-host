const Web3 = require("web3");
const Contract = require("web3-eth-contract");
const contractConfig = require("../config/contract.config.js");
const infuraConfig = require("../config/infura.config.js");
const ABI = require("./abi.json");

Contract.setProvider(
  new Web3.providers.HttpProvider(
    `https://${infuraConfig.NETWORK}.infura.io/v3/${infuraConfig.ID}`
  )
);

const ERC721Contract = new Contract(ABI, contractConfig.ADDRESS);

var currentSupply = 0;

exports.updateData = () => {
  ERC721Contract.methods
    .totalSupply()
    .call()
    .then(function (result) {
      if (result && typeof result === "string") {
        currentSupply = parseInt(result);
      }
    })
    .catch(console.log);
};

exports.getData = () => {
  return currentSupply;
};
