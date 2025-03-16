import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import "./navbar.css";
const employeeNavbar = () => {
    return (
        <Navbar expand="lg" className="navbar bg-body-tertiary sticky-top">
            <Container fluid className="custom-container">
                <Navbar.Brand as={Link} to="/employeeHome" className="d-flex align-items-center">
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
                            to="/employeeHome"
                            className="capitalize"
                            id="HomeLink"
                            style={{ marginRight: "8px" }}
                        >
                            Accueil
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/employeelocation"
                            className="capitalize"
                            id="LocationsLink"
                            style={{ marginRight: "8px" }}
                        >
                            Créer une location
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
export default employeeNavbar;
