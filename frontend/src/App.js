import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="page">
      <h1>🏠 Welcome to the Home Page</h1>
      <p>This is where users can explore features of our app.</p>
    </div>
  );
}

function UserPref() {
  return (
    <div className="page">
      <h1>⚙️ User Preferences</h1>
      <p>Fill out the form below to set your preferences.</p>
    </div>
  );
}

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
