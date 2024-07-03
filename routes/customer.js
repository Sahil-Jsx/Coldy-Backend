const { Router } = require("express");
const {
  AddCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  SearchCustomer,
} = require("../controllers/customer");

const router = Router();

router.get("/", getCustomers);
router.post("/", AddCustomer);
router.get("/search", SearchCustomer);
router.get("/:id", getCustomerById);
router.patch("/:id", updateCustomerById);
router.delete("/:id", deleteCustomerById);

module.exports = {
  router,
};
