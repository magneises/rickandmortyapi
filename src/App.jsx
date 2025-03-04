import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import Testing from './components/Testing';
import CardDetails from './components/CardDetails';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Testing />} />
          <Route path="/character/:id" element={<CardDetails />} />
          {/* You can add additional routes for locations and episodes */}
        </Routes>
      </div>
    </Router>
  );
};
