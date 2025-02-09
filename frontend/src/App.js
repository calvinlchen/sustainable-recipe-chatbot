import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Home() {
  return <h1 style={{ color: "green" }}>Home Page</h1>;
}

function UserPref() {
  return <h1 style={{ color: "blue" }}>User Preferences Form</h1>;
}

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/userpreferences">UserPref</a>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userpreferences" element={<UserPref />} />
        </Routes>
      </div>
    </Router>
  );
}