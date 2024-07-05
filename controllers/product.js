const ProductSchema = require("../models/product");

const AddProduct = async (req, res) => {
  try {
    const { product_name, product_price } = req.body;

    if (!product_name || !product_name.trim()) {
      return res.status(400).json({ error: "Product name is required" });
    }
    if (!product_price || isNaN(product_price)) {
      return res
        .status(400)
        .json({ error: "Product price is required and should be a number" });
    }

    const product = new ProductSchema({
      product_name,
      product_price,
      quantity: 0,
    });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const GetProduct = async (req, res) => {
  try {
    const products = await ProductSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, product_price } = req.body;

    if (!product_name || !product_name.trim()) {
      return res.status(400).json({ error: "Product name is required" });
    }
    if (!product_price || isNaN(product_price)) {
      return res
        .status(400)
        .json({ error: "Product price is required and should be a number" });
    }

    const product = await ProductSchema.findByIdAndUpdate(
      id,
      {
        product_name,
        product_price,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductSchema.findByIdAndDelete(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const SearchProduct = async (req, res) => {
  try {
    const { product_name } = req.query;
    // console.log(req.query);

    const query = {};
    if (product_name)
      query.product_name = { $regex: new RegExp(product_name, "i") };

    let product = await ProductSchema.find(query);
    // console.log(product);

    if (product.length === 0) {
      return res.status(204).json({ error: "No Products found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const GetProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductSchema.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  AddProduct,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
  SearchProduct,
  GetProductById,
};
