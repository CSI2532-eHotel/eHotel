import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/footer";

function App() {
  return (
   <Router>
      <div className="app-container">
      <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/client-home" element={<ClientHome />} />
            <Route path="/employee-home" element={<EmployeeHome />} /> */}
            {/* <Route path="/profile" element={<ClientProfile />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
   </Router>
  );
}

export default App;