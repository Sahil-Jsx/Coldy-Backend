const LocationSchema = require("../models/location");

const AddLocation = async (req, res) => {
  try {
    // console.log(req.body);
    const { error } = LocationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the location already exists in the database
    const existingLocation = await LocationSchema.findOne({
      location: req.body.location,
    });
    if (existingLocation) {
      return res.status(400).json({ error: "Location already exists" });
    }

    // Create a new instance of Location model with the validated data
    const newLocation = new LocationSchema(req.body);

    // Save the new location to the database
    const savedLocation = await newLocation.save();

    // Respond with the saved location
    res.status(201).json(savedLocation);

    // console.log(req.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

const GetLocations = async (req, res) => {
  try {
    const locations = await LocationSchema.find();

    res.json(locations);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching locations" });
  }
};

const GetLocationById = async (req, res) => {
  try {
    // console.log(req.params.id);
    const location_id = req.params.id;
    const location = await LocationSchema.findById(location_id);

    if (!location) {
      res.status(404).send("Location Not Found");
    }
    res.status(200).json(location);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const UpdateLocation = async (req, res) => {
  try {
    const location_id = req.params.id;
    const value = req.body;

    const updatedLocation = await LocationSchema.findByIdAndUpdate(
      location_id,
      value,
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).send("Location not found");
    }

    res.status(200).json(updatedLocation);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const DeleteLocation = async (req, res) => {
  try {
    const location_id = req.params.id;

    const deletedLocation = await LocationSchema.findByIdAndDelete(location_id);

    if (!deletedLocation) {
      return res.status(404).send("Location not found");
    }

    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const SearchLocation = async (req, res) => {
  try {
    const value = req.query.location;

    let locations = await LocationSchema.find({
      location: new RegExp(value, "i"),
    });

    if (locations.length === 0) {
      return res.status(204).json({ error: "No customers found" });
    }

    res.status(200).json(locations);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  AddLocation,
  GetLocations,
  GetLocationById,
  UpdateLocation,
  DeleteLocation,
  SearchLocation,
};
