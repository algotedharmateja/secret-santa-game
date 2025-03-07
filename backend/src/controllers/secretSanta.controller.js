const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const secretSantaService = require("../services/secretSanta.service");

const outputDir = path.join(__dirname, "../output");
const outputFilePath = path.join(outputDir, "new_secret_santa_assignments.csv");

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created output directory at: ${outputDir}`);
}

const assignSecretSanta = async (req, res) => {
  try {
    if (!req.files || !req.files.employees) {
      return res.status(400).json({ error: "No employees file uploaded!" });
    }

    const employees = [];
    const previousAssignments = new Map(); // Store previous year’s assignments

    const employeesFilePath = req.files.employees[0].path; //Get uploaded employees file
    const previousAssignmentsPath = req.files.previous
      ? req.files.previous[0].path
      : null; //Get previous file if exists

    // Read employee list from uploaded CSV
    fs.createReadStream(employeesFilePath)
      .pipe(csv())
      .on("data", (row) => employees.push(row))
      .on("end", async () => {
        // Check if previous assignments exist
        if (previousAssignmentsPath) {
          fs.createReadStream(previousAssignmentsPath)
            .pipe(csv())
            .on("data", (row) => {
              previousAssignments.set(
                row.Employee_EmailID,
                row.Secret_Child_EmailID
              );
            })
            .on("end", async () => {
              processAssignments(res, employees, previousAssignments);
            });
        } else {
          processAssignments(res, employees, previousAssignments);
        }
      });
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ message: error.message });
  }
};

/// Function to generate and send the CSV file
const processAssignments = (res, employees, previousAssignments) => {
  const assignments = secretSantaService.assignSecretSanta(
    employees,
    previousAssignments
  );

  // Write new assignments to the CSV file
  const outputStream = fs.createWriteStream(outputFilePath);

  //Ensure the file is fully written before sending
  outputStream.on("finish", () => {
    // Send the file as a response for download
    res.download(outputFilePath, "new_secret_santa_assignments.csv", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  });

  outputStream.write(
    "Employee_Name,Employee_EmailID,Secret_Child_Name,Secret_Child_EmailID\n"
  );
  assignments.forEach(
    ({
      Employee_Name,
      Employee_EmailID,
      Secret_Child_Name,
      Secret_Child_EmailID,
    }) => {
      outputStream.write(
        `${Employee_Name},${Employee_EmailID},${Secret_Child_Name},${Secret_Child_EmailID}\n`
      );
    }
  );

  outputStream.end(); //End the stream to trigger "finish" event
};

// API to download the CSV file
const downloadAssignments = (req, res) => {
  if (!fs.existsSync(outputFilePath)) {
    return res.status(404).json({ error: "Assignments file not found!" });
  }
  res.download(outputFilePath, "new_secret_santa_assignments.csv", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).json({ message: "Error downloading file" });
    }
  });
};

// API to fetch assignments as JSON
const getAssignments = (req, res) => {
  const results = [];

  if (!fs.existsSync(outputFilePath)) {
    return res.status(404).json({ error: "Assignments file not found!" });
  }

  fs.createReadStream(outputFilePath)
    .pipe(csv())
    .on("data", (row) => results.push(row))
    .on("end", () => {
      res.status(200).json(results);
    })
    .on("error", (err) => {
      console.error("Error reading CSV:", err);
      res.status(500).json({ error: "Error reading assignments file" });
    });
};

module.exports = { assignSecretSanta, downloadAssignments, getAssignments };
