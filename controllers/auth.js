const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const UserSchema = require("../models/users");
const Authenticate = async (req, res) => {
  try {
    console.log(req.body);

    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password is required" });
    }

    const user = await UserSchema.findOne({ username, password });
    console.log(user);
    if (user) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.json({
        id: user._id,
        username: user.username,
        token: token,
      });
    } else {
      res.status(404).json({ error: "Invalid username and password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};

module.exports = {
  Authenticate,
};
