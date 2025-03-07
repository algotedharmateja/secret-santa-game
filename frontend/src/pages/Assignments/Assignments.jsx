import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/v1/secret-santa/assignments"
      );
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setError("Failed to load assignments. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8082/v1/secret-santa/download",
        {
          responseType: "blob", // ✅ Ensures CSV is received as a file
        }
      );

      saveAs(response.data, "secret_santa_assignments.csv");
    } catch (error) {
      console.error("Error downloading CSV:", error);
      alert("Failed to download CSV. Please try again.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Secret Santa Assignments
      </Typography>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && assignments.length === 0 && (
        <Alert severity="warning">No assignments found!</Alert>
      )}

      {!loading && assignments.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="Secret Santa Assignments Table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Employee Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Employee Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Secret Child Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Secret Child Email</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((row, index) => (
                <TableRow key={row.Employee_EmailID || index}>
                  <TableCell>{row.Employee_Name}</TableCell>
                  <TableCell>{row.Employee_EmailID}</TableCell>
                  <TableCell>{row.Secret_Child_Name}</TableCell>
                  <TableCell>{row.Secret_Child_EmailID}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleDownloadCSV}
        disabled={assignments.length === 0}
        startIcon={<DownloadIcon />}
      >
        Download CSV
      </Button>
    </Container>
  );
};

export default Assignments;
