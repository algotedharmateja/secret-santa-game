const express = require("express");
const multer = require("multer");
const secretSantaController = require("../../controllers/secretSanta.controller");

const router = express.Router();

// Multer setup: Save uploaded files in `data/`
const upload = multer({
  dest: "data/", // Saves files to `data/`
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB file limit
});

router.get("/download", secretSantaController.downloadAssignments); // Download CSV file
router.get("/assignments", secretSantaController.getAssignments); // Fetch assignments as JSON
router.post(
  "/assign",
  upload.fields([
    { name: "employees", maxCount: 1 }, //Accepts 1 "employees" file
    { name: "previous", maxCount: 1 }, //Accepts 1 "previous" file
  ]),
  secretSantaController.assignSecretSanta
);

module.exports = router;
