import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";         
import UserPref from "./pages/UserPref";

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>🍽️ Sustainable Recipes</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/userpreferences">User Preferences</Link></li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userpreferences" element={<UserPref />} />
        </Routes>
      </div>
    </Router>
  );
}
