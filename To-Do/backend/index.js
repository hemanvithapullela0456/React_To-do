const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

const connectDB = require("./src/config/db");
const TodoRoutes = require("./src/routes/todoRoutes");
const UserRoutes = require("./src/routes/userRoutes");
const TodoFiltersRoutes = require("./src/routes/todoFiltersRoutes");

// set up rate limiter: maximum of five requests per minute
var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello there you are on todo Application server");
});

app.use("/todo", TodoRoutes);
app.use("/filters", TodoFiltersRoutes);
app.use("/user", UserRoutes);

app.listen(port, () => {
  console.log("Server is running on port ", port);
  connectDB();
});