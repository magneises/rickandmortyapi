import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import Testing from './components/Testing';
import CardDetails from './components/CardDetails';
import Nav from './components/Nav'; 

export default function App() {
  return (
    <Router>
      {/* <Nav /> */}
      <div>
        <Routes>
          <Route path="/" element={<Testing />} />
          <Route path="/character/:id" element={<CardDetails />} />
        </Routes>
      </div>
    </Router>
  );
};
