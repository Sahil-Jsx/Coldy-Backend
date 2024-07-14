const OrderSchema = require("../models/orders");
const moment = require("moment");
const getDashboardDetails = async (req, res) => {
  try {
    const orders = await OrderSchema.find({});

    // Step 1: Calculate the total pending amount
    const pending_orders = orders.filter((item) => item.status === 0);
    const pending_order_amount = pending_orders.reduce(
      (accumulator, current) => accumulator + current.pending,
      0
    );

    // Step 2: Calculate today's revenue
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

    // Step 3: Calculate weekly revenue and pending amounts
    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const weekData = {};

    // Initialize weekData with empty totals
    weekDays.forEach((day) => {
      weekData[day] = {
        total_revenue: 0,
        total_pending: 0,
      };
    });

    orders.forEach((order) => {
      const orderDate = moment(order.order_date);
      const dayName = weekDays[orderDate.day()];

      // Calculate total amount and pending amount for the day
      weekData[dayName].total_revenue += order.total_amount;
      weekData[dayName].total_pending += order.pending;
    });

    // Step 4: Return the results
    const dashboard = {
      pending_orders: pending_orders.length,
      pending: pending_order_amount,
      today_revenue: total_amounts.total_amount,
      today_pending: total_amounts.pending,
      weekly_revenue: weekData,
    };

    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getDashboardDetails,
};
