const express = require("express");
const routes = require("./routes/v1")
const cors = require("cors");

const app = express();

// parse json request body
app.use(express.json());

// enable cors
app.use(cors());
app.options("*", cors());

// Reroute all API request starting with "/v1" route
app.use("/v1", routes);

module.exports = app;
