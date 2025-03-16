import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import "./navbar.css";
const managerNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar bg-body-tertiary sticky-top">
      <Container fluid className="custom-container">
        <Navbar.Brand as={Link} to="/manageEmployee" className="d-flex align-items-center">
          <img
            src={logo}
            style={{ width: "60px", marginRight: "10px" }}
            alt="Logo"
          />
          E-Hôtel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="ms-auto py-0 pe-3">
            <Nav.Link
              as={Link}
              to="/manageEmployee"
              className="capitalize active"
              id="EmployeeLink"
              style={{ marginRight: "8px" }}
            >
              Employée
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/manageClient"
              className="capitalize"
              id="ClientLink"
              style={{ marginRight: "8px" }}
            >
              Client
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/manageChambre"
              className="capitalize"
              id="ChambreLink"
              style={{ marginRight: "8px" }}
            >
              Chambre
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/manageHotel"
              className="capitalize"
              id="HotelLink"
              style={{ marginRight: "8px" }}
            >
              Hôtel
            </Nav.Link>
          </Nav>
          {/* Log Out Button */}
          <Button
            as={Link}
            to="/"
            variant="primary"
            className="text-white py-1 px-1 capitalize rounded-2"
            id="loginOutbtn"
          >
            Deconnectez
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default managerNavbar;
