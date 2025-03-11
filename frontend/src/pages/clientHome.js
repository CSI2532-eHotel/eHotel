import {
  Button,
  Card,
  CardText,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./clientHome.css";
import image from "../assets/chambre.jpg";

const ClientHome = () => {
  const [price, setPrice] = useState(0); // State to store the price

  const handleChange = (e) => {
    setPrice(e.target.value);
  };
  return (
    <div>
      <Navbar expand="lg" className="navbar bg-body-tertiary sticky-top pb-3">
        <Container fluid className="custom-container">
          {/* Logo on the left */}
          <Link to="/">
            <img
              src={logo}
              style={{ width: "50px", marginRight: "10px" }}
              id="logo"
              alt="Logo"
            />
          </Link>
          <Navbar.Brand as={Link} to="/" className="capitalize" id="name">
            e-Hotel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links */}
            <Nav className="ms-auto py-0 pe-3">
              <Nav.Link
                as={Link}
                to="/"
                className="capitalize"
                id="HomeLink"
                style={{ marginRight: "8px" }}
              >
                Accueil
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/booking"
                className="capitalize"
                id="BookingLink"
                style={{ marginRight: "8px" }}
              >
                Mes Reservations
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/profile"
                className="capitalize"
                id="ProfileLink"
                style={{ marginRight: "8px" }}
              >
                Profile
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
      <Container>
        <Row>
          <Col md={5} className="mt-4 mb-5">
            <img
              src={image}
              style={{ width: "100%", height: "100%" }}
              alt="iamge d'une chambre"
            />
          </Col>
          <Col md={7} className="mt-4 mb-5">
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card.Title>Filtrer par</Card.Title>
                  </Col>
                  <Col md={6} className="d-flex justify-content-end gap-4">
                    <Button
                      as="input"
                      type="submit"
                      value="Par Zone"
                      id="zonebtn"
                      className="custom-button"
                    />
                    <Button
                      as="input"
                      type="submit"
                      value="Par capacité"
                      id="capacitebtn"
                      className="custom-button"
                    />
                    <Button
                      as="input"
                      type="submit"
                      value="Effacer Filtre"
                      id="effacerfiltrebtn"
                      className="custom-button"
                    />
                  </Col>
                </Row>

                {/* Vue */}
                <Row>
                  <CardText>Vue</CardText>
                  <Form style={{ marginLeft: "20px" }}>
                    <div className="mb-3">
                      <Form.Check
                        inline
                        label="Montagne"
                        name="MontagneCheckbox"
                        type="checkbox"
                        id="MontagneCheckbox"
                        className="custom-checkbox"
                      />
                      <Form.Check
                        inline
                        label="Mer"
                        name="MerCheckbox"
                        type="checkbox"
                        id="MerCheckbox"
                        className="custom-checkbox"
                      />
                    </div>
                  </Form>
                </Row>

                {/* Price Range */}
                <Row className="align-items-center">
                  <CardText>Prix</CardText>
                  <Form
                    className="d-flex align-items-center"
                    style={{ marginLeft: "20px", width: "20rem" }}
                  >
                    <Form.Label className="me-2">$0</Form.Label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <Form.Range
                        min={0}
                        max={10000}
                        value={price}
                        onChange={handleChange}
                        className="custom-range"
                      />
                      {/* Display the price above the thumb */}
                      <span
                        style={{
                          position: "absolute",
                          left: `calc(${(price / 10000) * 100}% - 10px)`, // Position it relative to the thumb
                          bottom: "25px",
                          fontWeight: "bold",
                          color: "#D1A062",
                          fontSize: "12px",
                          transform: "translateX(-50%)",
                        }}
                      >
                        ${price}
                      </span>
                    </div>
                    <Form.Label className="ms-2">$10,000</Form.Label>
                  </Form>
                </Row>

                {/* Extensive */}
                <Row className="align-items-center mt-3">
                  <CardText>Extensive</CardText>
                  <Form className="ms-3">
                    <Form.Check
                      inline
                      label="Oui"
                      name="extensive"
                      type="checkbox"
                      id="extensive-oui"
                      className="custom-checkbox"
                    />
                    <Form.Check
                      inline
                      label="Non"
                      name="extensive"
                      type="checkbox"
                      id="extensive-non"
                      className="custom-checkbox"
                    />
                  </Form>
                </Row>

                {/* Commodité */}
                <Row className="align-items-center mt-3">
                  <CardText>Commodité</CardText>
                  <Form className="ms-3">
                    <Form.Check
                      inline
                      label="TV"
                      name="commodite"
                      type="checkbox"
                      id="tvcheckbox"
                      className="custom-checkbox"
                    />
                    <Form.Check
                      inline
                      label="Sofa"
                      name="commodite"
                      type="checkbox"
                      id="sofacheckbox"
                      className="custom-checkbox"
                    />
                    <Form.Check
                      inline
                      label="Fridge"
                      name="commodite"
                      type="checkbox"
                      id="fridgecheckbox"
                      className="custom-checkbox"
                    />
                  </Form>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ClientHome;
