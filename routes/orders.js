const { Router } = require("express");

const router = Router();

const {
  GenerateOrderNo,
  AddOrder,
  getOrders,
  updateOrderById,
  getOrderById,
  deleteOrder,
  getPendingOrdersOfCustomer,
} = require("../controllers/orders");

router.get("/", getOrders);
router.get("/pending", getPendingOrdersOfCustomer);
router.patch("/:id", updateOrderById);
router.get("/:id", getOrderById);
router.post("/", AddOrder);
router.post("/order_no", GenerateOrderNo);
router.delete("/:id", deleteOrder);

module.exports = {
  router,
};
