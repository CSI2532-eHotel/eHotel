import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'
import './clientHome.css';
function clientHome() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <img src={logo} style={{ width: '50px', marginRight: '10px' }} alt="Logo" />
        <Navbar.Brand href="#" className="me-auto my-2 my-lg-0">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
          </Nav.Link>
          </Nav>
          <Button variant="outline-success">Search</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default clientHome;
