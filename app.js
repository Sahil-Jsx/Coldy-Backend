require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
const PORT = process.env.PORT;

console.log(process.env.MONGODB_CONNECT_URI);

//connection to database
mongoose
  .connect(process.env.MONGODB_CONNECT_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Success !");
  })
  .catch((err) => {
    console.error("Connection Field !", err);
  });

const AuthRoute = require("./routes/auth").router;
const LocationRoute = require("./routes/location").router;
const CustomerRoute = require("./routes/customer").router;
const ProductRoute = require("./routes/product").router;
const OrderRoute = require("./routes/orders").router;
const DashboardRoute = require("./routes/dashboard").router;

app.use(express.json());

app.use("/api/auth", AuthRoute);
app.use("/api/location", LocationRoute);
app.use("/api/customer", CustomerRoute);
app.use("/api/product", ProductRoute);
app.use("/api/order", OrderRoute);
app.use("/api/dashboard", DashboardRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log("It's Live !");
});
