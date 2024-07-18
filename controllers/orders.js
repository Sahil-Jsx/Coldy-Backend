const OrdersSchema = require("../models/orders");
const CustomerSchema = require("../models/customer");

const GenerateOrderNo = async (req, res) => {
  // console.log(req.body);
  const { customer_name } = req.body;
  try {
    const nameParts = customer_name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();

    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year

    const order_no = `${initials}/${day}/${month}/${year}`;
    res.json({ order_no });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const AddOrder = async (req, res) => {
  try {
    const {
      customer_id,
      order_details,
      order_no,
      status,
      total_amount,
      pending,
    } = req.body;

    const order_date = new Date().toISOString();
    console.log(order_date.split("T")[0]);

    if (customer_id && order_details) {
      const order = new OrdersSchema({
        customer_id: customer_id,
        order_details: order_details,
        order_no: order_no,
        total_amount: total_amount,
        status: status,
        order_date: order_date.split("T")[0],
        pending: pending,
      });

      const saved_order = await order.save();

      res.status(200).json(saved_order);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await OrdersSchema.find({})
      .populate({
        path: "customer_id",
      })
      .sort({ order_date: -1 })
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await OrdersSchema.findById(req.params.id)
      .populate({
        path: "customer_id",
        // select: "customer_name",
      })
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const order = await OrdersSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await OrdersSchema.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

const getPendingOrdersOfCustomer = async (req, res) => {
  try {
    const customers = await CustomerSchema.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customer_id",
          as: "orders",
        },
      },
      {
        $addFields: {
          pending_orders: {
            $filter: {
              input: "$orders",
              as: "order",
              cond: {
                $eq: ["$$order.status", 0],
              },
            },
          },
        },
      },
      {
        $match: {
          "pending_orders.0": { $exists: true },
        },
      },
      {
        $lookup: {
          from: "locations",
          localField: "location",
          foreignField: "_id",
          as: "location",
        },
      },
      {
        $addFields: {
          location: { $arrayElemAt: ["$location.location", 0] },
        },
      },
      {
        $project: {
          orders: 0,
        },
      },
    ]);
    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GenerateOrderNo,
  AddOrder,
  updateOrderById,
  getOrderById,
  getOrders,
  deleteOrder,
  getPendingOrdersOfCustomer,
};
