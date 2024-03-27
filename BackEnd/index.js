const express = require("express");
const mongoose = require("mongoose");

//route
const userRoute = require('./routes/user.route');
const authorRoute = require('./routes/author.route');
const bookRoute = require('./routes/book.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/users", userRoute);
app.use("/api/authors", authorRoute);
app.use("/api/books", bookRoute);

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