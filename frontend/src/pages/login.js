import { useState } from "react";
import { Navbar, Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./login.css";

function Login() {
  const [userType, setUserType] = useState("client"); // Default to "client"
  

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary px-3 shadow-sm">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src={logo} style={{ width: "50px", marginRight: "10px" }} alt="Logo" />
          E-Hôtel
        </Navbar.Brand>
      </Navbar>

      {/* Login Form */}
      <Row className="p-5 mx-auto mt-4">
        <Col>
          <Card className="p-5 mx-auto loginCard">
            <h4 className="text-primary mb-4">Se connecter</h4>

            <Form>
              {/* User Type Selection */}
              <Row className="mb-3 text-center">
                <Col>
                  <Form.Check
                    style={{ marginRight: "50px" }}
                    type="radio"
                    label="Client"
                    name="userType"
                    value="client"
                    checked={userType === "client"}
                    onChange={() => setUserType("client")}
                    inline
                  />
                  <Form.Check
                    type="radio"
                    label="Employee"
                    name="userType"
                    value="employee"
                    checked={userType === "employee"}
                    onChange={() => setUserType("employee")}
                    inline
                  />
                </Col>
              </Row>

              {/* Email Input */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label>Courriel</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Entrez votre courriel"
                    // value={username}
                    // onChange={handleUsernameChange}
                    className="mt-2"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Courriel invalide</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Password Input */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    // value={password}
                    // onChange={handlePasswordChange}
                    className="mt-2"
                    required
                  />
                  <Form.Control.Feedback type="invalid">Mot de passe invalide</Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Forgot Password & Login Button */}
              <Row className="mb-2 mt-2">
                <Col>
                  <Link to="/" className="text-primary">Oubliez mot de passe?</Link>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button type="submit" className="bg-primary border-0" id="loginIdBtn">
                    Se connecter
                  </Button>
                </Col>
              </Row>

              {/* Register Link Only for Clients */}
              {userType === "client" && (
                <Row className="mt-3">
                  <Col className="text-center">
                    <p>Pas de compte?</p>
                    <Link to="/register" className="text-primary">Inscrire</Link>
                  </Col>
                </Row>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
