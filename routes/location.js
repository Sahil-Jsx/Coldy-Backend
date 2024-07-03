const { Router } = require("express");
const {
  AddLocation,
  GetLocations,
  GetLocationById,
  UpdateLocation,
  DeleteLocation,
  SearchLocation,
} = require("../controllers/location");

const router = Router();

router.post("/", AddLocation);
router.get("/", GetLocations);
router.get("/search", SearchLocation);
router.get("/:id", GetLocationById);
router.put("/:id", UpdateLocation);
router.delete("/:id", DeleteLocation);

module.exports = {
  router,
};
