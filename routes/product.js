const { Router } = require("express");

const router = Router();

const {
  AddProduct,
  GetProduct,
  GetProductById,
  UpdateProduct,
  SearchProduct,
  DeleteProduct,
} = require("../controllers/product");

router.get("/search", SearchProduct);
router.get("/", GetProduct);
router.get("/:id", GetProductById);
router.post("/", AddProduct);
router.put("/:id", UpdateProduct);
router.delete("/:id", DeleteProduct);

module.exports = {
  router,
};
