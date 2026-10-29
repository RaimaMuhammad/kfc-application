const express = require("express");
const cors = require("cors");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/user.route");
const cartRoute = require("./routes/cart.route");
const menuRoute = require("./routes/menu.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "KFC API is running" });
});

app.use("/api", productRoute);
app.use("/api", userRoute);
app.use("/api", cartRoute);
app.use("/api", menuRoute);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});