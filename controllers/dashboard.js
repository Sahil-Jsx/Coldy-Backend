const OrderSchema = require("../models/orders");

const getDashboardDetails = async (req, res) => {
  const orders = await OrderSchema.find({});

  const pending_orders = orders.filter((item) => item.status === 0);
  const pending_order_amount = pending_orders.reduce(
    (accumulator, current) => accumulator + current.pending,
    0
  );

  const dashboard = {
    pending_orders: pending_orders?.length,
    pending: pending_order_amount,
  };

  res.json(dashboard);
  console.log(orders);
};

module.exports = {
  getDashboardDetails,
};
