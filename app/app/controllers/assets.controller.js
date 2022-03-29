const path = require("path");
const Web3 = require("web3");
const ABI = require("./abi.json");

const ethNetwork =
  "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

var Contract = require("web3-eth-contract");

// set provider for all later instances to use
Contract.setProvider(new Web3.providers.HttpProvider(ethNetwork));

// let's fetch a balance
var CryptoBabyLionsContract = new Contract(
  ABI,
  "0xc81feadcbcd93dd4bb0a0760f9a9fc8348ea8dee"
);

var currentSupply = 0;

getData();

function getData() {
  CryptoBabyLionsContract.methods
    .totalSupply()
    .call()
    .then(function (result) {
      if (result && typeof result === "string") {
        currentSupply = parseInt(result);
      }
    })
    .catch(console.log);
}

setInterval(function () {
  getData();
}, 1000 * 60 * 5);

exports.image = (req, res) => {
  const { id } = req.params;

  const numberId = parseInt(id.replace(".png", ""));

  if (numberId >= 0 && numberId < currentSupply) {
    res.sendFile(id, { root: path.join(__dirname, "../assets/images") });
  } else {
    res.json({ message: "Welcome to crypto baby lions assets application." });
  }
};

exports.metadata = (req, res) => {
  const { id } = req.params;

  const numberId = parseInt(id);

  if (numberId >= 0 && numberId < currentSupply) {
    res.sendFile(id, {
      root: path.join(__dirname, "../assets/metadata"),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    res.sendFile("placeholder.json", {
      root: path.join(__dirname, "../assets"),
    });
  }
};
