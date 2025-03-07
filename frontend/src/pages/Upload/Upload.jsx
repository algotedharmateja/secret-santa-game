import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import BackupIcon from "@mui/icons-material/Backup";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const Upload = () => {
  const [employeesFile, setEmployeesFile] = useState(null);
  const [previousFile, setPreviousFile] = useState(null);

  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!employeesFile) {
      alert("Please upload the Employees CSV file.");
      toast.error("Please upload the Employees CSV file.");
      return;
    }

    //Validate file type (Allow only .csv)
    if (!employeesFile.name.endsWith(".csv")) {
      alert("Invalid file format. Please upload a .csv file.");
      toast.error("Invalid file format. Please upload a .csv file.");
      return;
    }

    if (previousFile && !previousFile.name.endsWith(".csv")) {
      alert(
        "Invalid file format for previous file. Please upload a .csv file."
      );
      toast.error(
        "Invalid file format for previous file. Please upload a .csv file."
      );
      return;
    }

    const formData = new FormData();
    formData.append("employees", employeesFile);
    if (previousFile) {
      formData.append("previous", previousFile);
    }

    try {
      await axios.post(
        "http://localhost:8082/v1/secret-santa/assign",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert(
        "Files uploaded successfully! You can now generate Secret Santa assignments."
      );
      toast.success(
        "Files uploaded successfully! You can now generate Secret Santa assignments."
      );
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading files. Please try again.");
      toast.error("Error uploading files. Please try again.");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Upload Employee Data</Typography>

        <Button
          variant="outlined"
          color="secondary"
          href="Employee-List.csv"
          download="sample-employees-list.csv"
          startIcon={<DownloadIcon />}
        >
          Download Sample File
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setEmployeesFile(e.target.files[0])}
        />
        <Typography>Employees CSV (Required)</Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setPreviousFile(e.target.files[0])}
        />
        <Typography>Previous Assignments CSV (Optional)</Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<BackupIcon />}
        color="primary"
        onClick={handleFileUpload}
      >
        Upload Files
      </Button>
      <Toaster />
    </Container>
  );
};

export default Upload;
