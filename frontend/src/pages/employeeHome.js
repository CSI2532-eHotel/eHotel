import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./employeeHome.css";

const ClientHome = () => {
  return (
    <Navbar expand="lg" className="navbar bg-white sticky-top bg-info">
      <Container fluid className="custom-container">
        {/* Logo on the left */}
        <Link to="/">
          <img src={logo} style={{ width: "50px", marginRight: "10px" }} id="logo" alt="Logo" />
        </Link>
        <Navbar.Brand as={Link} to="/" className="capitalize" id="name">
          e-Hotel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="ms-auto py-0 pe-3">
            <Nav.Link as={Link} to="/" className="capitalize" id="HomeLink"style={{ marginRight: "8px" }}>
              Accueil
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="capitalize" id="ProfileLink" style={{ marginRight: "8px" }}>
              Profile
            </Nav.Link>
          </Nav>
          {/* Log Out Button */}
          <Button as={Link} to='/' variant="primary" className='text-white py-1 px-1 capitalize rounded-2' id='loginOutbtn'>Deconnectez</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ClientHome;
