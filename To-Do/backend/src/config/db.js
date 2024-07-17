const mongoose = require("mongoose");
require("dotenv").config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const url =
  "mongodb+srv://" +
  username +
  ":" +
  password +
  "@to-do-app.dsl5y4h.mongodb.net/?retryWrites=true&w=majority&appName=To-Do-App";

async function runDB() {
  await mongoose.connect(url);
  await mongoose.connection.db
    .admin()
    .command({ ping: 1 })

    .then(() => {
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
}

module.exports = runDB;
