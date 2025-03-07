import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Assignments from "./pages/Assignments/Assignments";
import Upload from "./pages/Upload/Upload";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Assignments />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
