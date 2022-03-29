const Web3 = require("web3");
const contractConfig = require("../config/contract.config.js");
const infuraConfig = require("../config/infura.config.js");
const ABI = require("./abi.json");

const ethNetwork = `https://mainnet.infura.io/v3/${infuraConfig.ID}`;

const Contract = require("web3-eth-contract");

Contract.setProvider(new Web3.providers.HttpProvider(ethNetwork));

const CryptoBabyLionsContract = new Contract(ABI, contractConfig.ADDRESS);

var currentSupply = 0;

exports.setData = () => {
  CryptoBabyLionsContract.methods
    .totalSupply()
    .call()
    .then(function (result) {
      if (result && typeof result === "string") {
        currentSupply = parseInt(result);
      }
    })
    .catch(console.log);
};

exports.metadata = (req, res) => {
  return currentSupply;
};
