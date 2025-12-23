const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/connectDatabase");
const customOrderRoute = require("./routes/customOrderRoute");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
app.use("/api/v1", productRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", customOrderRoute);
app.use("/api/v1", require("./routes/adminRoute"));


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
