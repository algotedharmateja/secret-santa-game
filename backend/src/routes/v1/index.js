const express = require("express");
const secretSantaRoute = require("./secretSanta.route");

const router = express.Router();

router.use("/secret-santa", secretSantaRoute);

module.exports = router;
