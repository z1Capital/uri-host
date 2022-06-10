const path = require("path");
const contractController = require("./contract.controller");

exports.image = (req, res) => {
  const { id } = req.params;
  const numberId = parseInt(id.replace(".png", ""));

  const currentSupply = contractController.getData();

  if (numberId >= 0 && numberId < currentSupply) {
    res.sendFile(id, { root: path.join(__dirname, "../assets/images") });
  } else {
    res.json({ message: "Welcome to AnimaVerse assets application." });
  }
};

exports.metadata = (req, res) => {
  const { id } = req.params;
  const numberId = parseInt(id);

  const currentSupply = contractController.getData();

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

exports.placeholder = (req, res) => {
  const { id } = req.params;
  res.sendFile(id, {
    root: path.join(__dirname, "../assets/placeholder"),
  });
};
