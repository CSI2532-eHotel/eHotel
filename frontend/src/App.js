import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./App.scss";
import Login from "./pages/login";
import Register from "./pages/register";
import Footer from "./components/footer";
import ClientHome from "./pages/Client/clientHome";
import ClientProfile from "./pages/Client/clientProfile";
import EmployeeHome from "./pages/Employee/employeeHome";
import EmployeeLocation from "./pages/Employee/employeeLocation";
import ManageEmployee from "./pages/Manager/manageEmployee";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/clientHome" element={<ClientHome />} />
            <Route path="/clientProfile" element={<ClientProfile />} />
            <Route path="/employeeHome" element={<EmployeeHome />} /> 
            <Route path="/employeeLocation" element={<EmployeeLocation />} /> 
            <Route path="/manageEmployee" element={<ManageEmployee />} /> 
            {/* <Route path="/manageChambre" element={<manageChambre />} />  */}
             {/* <Route path="/manageHotel" element={<manageHotel />} />  */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
