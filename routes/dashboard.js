const { Router } = require("express");

const { getDashboardDetails } = require("../controllers/dashboard");

const router = Router();

router.get("/", getDashboardDetails);

module.exports = {
  router,
};
