import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import HomePage from "./components/home/HomePage";
import NewCaseForm from "./components/cases/NewCaseForm";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/newcase" element={<NewCaseForm />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
