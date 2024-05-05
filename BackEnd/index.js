const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//route
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const authorRoute = require("./routes/author.route");
const bookRoute = require("./routes/book.route");
const categoryRoute = require("./routes/category.route");
const cartRoute = require("./routes/cart.route");
const orderRoute = require("./routes/order.route");
const order_paymentRoute = require("./routes/order-route.route");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOpts = {
  origin: "*",
  exposedHeaders: ["Authorization"],

  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Request-With",
  ],
};
app.use(cors(corsOpts));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/authors", authorRoute);
app.use("/api/books", bookRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/order-payment",order_paymentRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    "mongodb+srv://admin:admin123@onebook.vaqehom.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Onebook"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
