const { Router } = require("express");

const router = Router();

const {
  GenerateOrderNo,
  AddOrder,
  getOrders,
  updateOrderById,
  getOrderById,
  deleteOrder,
} = require("../controllers/orders");

router.get("/", getOrders);
router.patch("/:id", updateOrderById);
router.get("/:id", getOrderById);
router.post("/", AddOrder);
router.post("/order_no", GenerateOrderNo);
router.delete("/:id", deleteOrder);

module.exports = {
  router,
};
