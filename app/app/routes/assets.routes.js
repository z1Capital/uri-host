module.exports = app => {
  const assets = require("../controllers/assets.controller.js");

  var router = require("express").Router();

  router.get("/images/:id", assets.image);
  router.get("/metadata/:id", assets.metadata);

  router.get("/.well-known/acme-challenge/OhsdbIvDJ8kay3ZBgLaGUrb62MJDz9G43xSDEN2asVE", assets.challenge);

  app.use('/', router);
};
