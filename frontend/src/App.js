import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/footer";
import ClientHome from "./pages/clientHome";
import ClientProfile from "./pages/clientProfile";

function App() {
  return (
   <Router>
      <div className="app-container">
      <div className="content">
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ClientHome />} />          
            {/* <Route path="/employee-home" element={<EmployeeHome />} />  */}
            <Route path="/clientProfile" element={<ClientProfile />} />
          </Routes>
        </div>
        <Footer />
      </div>
   </Router>
  );
}

export default App;