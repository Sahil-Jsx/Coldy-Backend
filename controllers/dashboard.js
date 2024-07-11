const OrderSchema = require("../models/orders");

const getDashboardDetails = async (req, res) => {
  const orders = await OrderSchema.find({});

  // for getting the total pending amount
  const pending_orders = orders.filter((item) => item.status === 0);
  const pending_order_amount = pending_orders.reduce(
    (accumulator, current) => accumulator + current.pending,
    0
  );

  // get the today revenue
  const today = new Date().toISOString().split("T")[0];

  const today_orders = orders.filter((item) => {
    const orderDate = item?.order_date;
    return orderDate && orderDate.toISOString().split("T")[0] === today;
  });

  const total_amounts = today_orders.reduce(
    (acc, order) => {
      acc.total_amount += order?.total_amount || 0;
      acc.pending += order?.pending || 0;
      return acc;
    },
    { total_amount: 0, pending: 0 }
  );
  
  const dashboard = {
    pending_orders: pending_orders.length,
    pending: pending_order_amount,
    today_revenue: total_amounts.total_amount,
    today_pending: total_amounts.pending
  };
  
  console.log(dashboard);
  res.json(dashboard);
};


module.exports = {
  getDashboardDetails,
};
