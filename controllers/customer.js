const CustomerSchema = require("../models/customer");

const AddCustomer = async (req, res) => {
  try {
    const { customer_name, shop_name, phone, location } = req.body;

    if (!customer_name && !shop_name && !phone && !location) {
      return res.status(400).json({
        error:
          "At least one of the fields (customer_name, shop_name, phone, location) must be provided",
      });
    }

    if (phone) {
      const existingCustomer = await CustomerSchema.findOne({
        phone: phone.trim(),
      });
      if (existingCustomer) {
        return res.status(400).json({ error: "Phone number already exists" });
      }
    }

    const newCustomer = new CustomerSchema({
      customer_name: customer_name && customer_name.trim(),
      shop_name: shop_name && shop_name.trim(),
      phone: phone && phone.toString().trim(),
      location: location,
    });

    await newCustomer.validate();

    const savedCustomer = await newCustomer.save();

    res.status(201).json(savedCustomer);
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: errorMessages });
    }
    res
      .status(500)
      .json({ error: "An error occurred while adding the customer" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await CustomerSchema.find().populate({
      path: "location",
      select: "location -_id",
    });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer_id = req.params.id;
    const customer = await CustomerSchema.findById(customer_id);
    // console.log(customer_id);
    // console.log(customer);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;
    const { customer_name, shop_name, phone, location } = req.body;

    if (!customer_name && !shop_name && !phone && !location) {
      return res.status(400).json({
        error:
          "At least one field (customer_name, shop_name, phone, location) must be provided for update",
      });
    }

    let customer = await CustomerSchema.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    if (customer_name) customer.customer_name = customer_name.trim();
    if (shop_name) customer.shop_name = shop_name.trim();
    if (phone) customer.phone = phone.toString().trim();
    if (location) customer.location = location;

    await customer.validate();
    const updatedCustomer = await customer.save();

    res.json(updatedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const customerId = req.params.id;

    const deletedCustomer = await CustomerSchema.findByIdAndDelete(customerId);

    if (!deletedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

const SearchCustomer = async (req, res) => {
  try {
    const { customer_name } = req.query;
    // console.log(req.query);

    const query = {};
    if (customer_name)
      query.customer_name = { $regex: new RegExp(customer_name, "i") };

    let customers = await CustomerSchema.find(query)
      .populate({ path: "location", select: "location" })
      .exec();

    // console.log(customers);

    if (customers.length === 0) {
      return res.status(204).json({ error: "No customers found" });
    }

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  AddCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  SearchCustomer,
};
