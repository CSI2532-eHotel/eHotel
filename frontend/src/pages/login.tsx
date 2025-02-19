import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import logo from '../assets/logo1.png'
import './login.css';
function login() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <img src={logo} style={{ width: '50px', marginRight: '10px' }} alt="Logo" />
        <Navbar.Brand href="#" className="me-auto my-2 my-lg-0">Hotel Name</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
export default login;
