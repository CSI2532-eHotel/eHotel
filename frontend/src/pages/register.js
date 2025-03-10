import React, { useState } from "react";
import { Navbar, Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    prenom_client: "",
    nom_client: "",
    NAS_client: "",
    rue: "",
    ville: "",
    code_postal: "",
    courriel_client: "",
    motpasse_client: "",
    confirmation_password: ""
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    // Map form control ids to database field names
    const fieldMap = {
      validationFirstName: "prenom_client",
      validationLastName: "nom_client",
      validationSIN: "NAS_client",
      validationStreet: "rue",
      validationCity: "ville",
      validationPostal: "code_postal",
      validationEmail: "courriel_client",
      validationPassword: "motpasse_client",
      validationConfirmPassword: "confirmation_password"
    };

    setFormData({
      ...formData,
      [fieldMap[id]]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    // Form validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Check if passwords match
    if (formData.motpasse_client !== formData.confirmation_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Add current date for registration date
      const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Prepare data for API
      const clientData = {
        NAS_client: formData.NAS_client,
        nom_client: formData.nom_client,
        prenom_client: formData.prenom_client,
        rue: formData.rue,
        ville: formData.ville,
        code_postal: formData.code_postal,
        courriel_client: formData.courriel_client,
        motpasse_client: formData.motpasse_client,
        date_enregistrement: currentDate
      };

      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/client', clientData);
      
      console.log("Registration successful:", response.data);
      
      // Redirect to login page or show success message
      alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
      navigate("/"); // Redirect to login page
      
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Une erreur s'est produite lors de l'inscription");
    }

    setValidated(true);
  };

  return (
    <Container fluid className="d-flex flex-column mb-4">
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary px-3 shadow-sm">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={logo} style={{ width: "50px", marginRight: "10px" }} alt="Logo" />
          eHotel
        </Navbar.Brand>
      </Navbar>

      {/* Inscription Form */}
      <Row className="p-3 mx-auto my-3 mt-4">
        <Col>
          <Card className="p-4 mx-auto registerCard">
            <h4 className="text-primary mb-1">Inscription</h4>

            {error && <div className="alert alert-danger">{error}</div>}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <h5 className="mt-3 mb-3">Information Personnelle</h5>
              
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFirstName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Prénom"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre prénom.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationLastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Nom"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre nom.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationSIN">
                  <Form.Label>Numéro Assurance Social (NAS)</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="NAS"
                    pattern="[0-9]{9}"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez un NAS valide (9 chiffres).
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <h5 className="mt-4 mb-3">Adresse</h5>
              
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationStreet">
                  <Form.Label>Rue</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Rue"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre adresse.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCity">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ville"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre ville.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationPostal">
                  <Form.Label>Code Postal</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Code Postal"
                    pattern="[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez un code postal valide (ex: K1A 0B1).
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <h5 className="mt-4 mb-3">Information Compte</h5>
              
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationEmail">
                  <Form.Label>Courriel</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Courriel"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez un courriel valide
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre mot de passe.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationConfirmPassword">
                  <Form.Label>Confirmer mot de passe</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Confirmer mot de passe"
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Mot de passe ne correspond pas.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row>
                <Col className="text-center">
                  <Button type="submit" className="bg-primary border-0" id="registerBtn">
                    Inscrire
                  </Button>
                </Col>
              </Row>
              {/* Login Link */}
              <Row className="mt-3">
                <Col className="text-center">
                  <p>Déjà un compte?</p>
                  <p>
                    <Link to="/" className="text-primary">
                      Se connecter
                    </Link>
                  </p>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;