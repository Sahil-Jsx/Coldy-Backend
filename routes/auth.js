const { Router } = require("express");
const { Authenticate } = require("../controllers/auth");

const router = Router();

router.post("/login", Authenticate);

module.exports = {
  router,
};
