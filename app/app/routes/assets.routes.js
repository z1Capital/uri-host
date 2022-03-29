module.exports = app => {
  const assets = require("../controllers/assets.controller.js");

  var router = require("express").Router();

  router.get("/images/:id", assets.image);
  router.get("/metadata/:id", assets.metadata);

  app.use('/v1', router);
};
