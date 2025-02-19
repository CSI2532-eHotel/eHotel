import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import "./app.css";
import "./app.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import ClientHome from "./pages/clientHome";
import EmployeeHome from "./pages/employeeHome";
import Footer from "./components/footer";

function App() {
  return (
   <Router>
     <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ClientHome />} />
        <Route path="/home" element={<EmployeeHome/>} />
        {/* <Route path="/profile" element={<CLientProfile />} /> */}
      </Routes>
    </div>
    <Footer />
   </Router>
  );
}

export default App;
