import { useState } from "react";
import {
  Navbar,
  Container,
  Button,
  Row,
  Col,
  Card,
  Form,
  Alert,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "./login.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";

function Login() {
  const [userType, setUserType] = useState("client"); // Default to "client"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorField, setErrorField] = useState(""); // To indicate which field has an error

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrorField("");
    setLoading(true);

    try {
      // Choose endpoint based on user type
      const endpoint =
        userType === "client"
          ? `${process.env.REACT_APP_API_URL}/api/login/client`
          : `${process.env.REACT_APP_API_URL}/api/login/employee`;

      const response = await axios.post(endpoint, {
        courriel: email,
        motpasse: password,
      });

      if (response.data.success) {
        // Store user data in localStorage
        localStorage.setItem(
          "userData",
          JSON.stringify(response.data.userData)
        );
        localStorage.setItem("userType", response.data.userType);

        // Redirect based on user type and role
        if (response.data.userType === "client") {
          navigate("/clientHome");
        } else if (response.data.userType === "employee") {
          // Check if employee is a manager or receptionist
          if (response.data.userData.est_gestionnaire) {
            navigate("/manageEmployee");
          } else if (response.data.userData.est_receptioniste) {
            navigate("/employeeHome");
          } else {
            setError("Accès non autorisé pour ce type d'employé");
            return;
          }
        }
      }
    } catch (err) {
      console.error("Login error:", err);

      // Determine which field might be incorrect
      if (err.response?.status === 401) {
        setError("Courriel ou mot de passe incorrect");
        setErrorField("credentials");
      } else if (err.response?.status === 403) {
        setError(err.response.data.message || "Accès non autorisé");
      } else {
        setError(
          err.response?.data?.message ||
          "Erreur de connexion. Veuillez réessayer."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column">
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary px-3">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            style={{ width: "50px", marginRight: "10px" }}
            alt="Logo"
          />
          E-Hôtel
        </Navbar.Brand>
      </Navbar>

      {/* Login Form */}
      <Row className="p-5 mx-auto mt-4">
        <Col>
          <Card className="p-5 mx-auto loginCard">
            <h4 className="text-primary mb-4">Se connecter</h4>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-2 ${
                      errorField === "credentials" ? "border-danger" : ""
                    }`}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Courriel invalide
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Password Input with Toggle */}
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom02">
                  <Form.Label>Mot de passe</Form.Label>
                  <InputGroup className="mt-2">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Entrez votre mot de passe"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={
                        errorField === "credentials" ? "border-danger" : ""
                      }
                      required
                    />
                    <InputGroup.Text
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer", backgroundColor: "white" }}
                    >
                      {showPassword ? <EyeSlash /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Mot de passe invalide
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* Forgot Password & Login Button */}
              <Row className="mb-2 mt-2">
                <Col>
                  <Link to="/" className="text-primary">
                    Oubliez mot de passe?
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  <Button
                    type="submit"
                    className="bg-primary border-0"
                    id="loginIdBtn"
                    disabled={loading}
                  >
                    {loading ? "Traitement..." : "Se connecter"}
                  </Button>
                </Col>
              </Row>

              {/* Register Link Only for Clients */}
              {userType === "client" && (
                <Row className="mt-3">
                  <Col className="text-center">
                    <p>Pas de compte?</p>
                    <Link to="/register" className="text-primary">
                      Inscrire
                    </Link>
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
