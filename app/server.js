require("dotenv").config();
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require("express");
const cors = require("cors");

const contractController = require("./app/controllers/contract.controller");

// Certificate
const privateKey = fs.readFileSync(path.join(__dirname, 'certs/privkey.pem'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'certs/cert.pem'), 'utf8');
const ca = fs.readFileSync(path.join(__dirname, 'certs/chain.pem'), 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const app = express();

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


contractController.setData();

setInterval(function () {
  contractController.setData();
}, 1000 * 60 * 5);


require("./app/routes/assets.routes")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});