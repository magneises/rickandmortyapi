import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
