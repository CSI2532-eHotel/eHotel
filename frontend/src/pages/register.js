import { Navbar, Container, Button, Row, Col, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./register.css";

function Register() {
  // const navigate = useNavigate();
  // const [validated, setValidated] = useState(false);

  
  return (
    <Container fluid className="d-flex flex-column mb-4">
      {/* Navbar */}
      <Navbar expand="lg" className="bg-body-tertiary px-3 shadow-sm">
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={logo} style={{ width: "50px", marginRight: "10px" }} alt="Logo" />
          eHotel
        </Navbar.Brand>
      </Navbar>

      {/* Incription Form */}
      <Row className="p-3 mx-auto my-3 mt-4">
        <Col>
          <Card className="p-4 mx-auto registerCard">
            <h4 className="text-primary mb-1">Inscription</h4>

            <Form>
              <h5 className="mt-3 mb-3">Information Personnelle</h5>
              
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationFirstName">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control required type="text" placeholder="Prenom" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre prenom.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationLastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control required type="text" placeholder="Nom" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre nom.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationSIN">
                  <Form.Label>Numero Assurance Social (NAS)</Form.Label>
                  <Form.Control required type="text" placeholder="NAS" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre NAS.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <h5 className="mt-4 mb-3">Adresse</h5>
              
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationStreet">
                  <Form.Label>Rue</Form.Label>
                  <Form.Control required type="text" placeholder="Rue" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre adresse.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCity">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control required type="text" placeholder="City" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre ville.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationPostal">
                  <Form.Label>Code Postal</Form.Label>
                  <Form.Control required type="text" placeholder="Code Postal" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre code postal.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <h5 className="mt-4 mb-3">Information Compte</h5>
              
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationEmail">
                  <Form.Label>Courriel</Form.Label>
                  <Form.Control required type="email" placeholder="Courriel" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre courriel.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationPassword">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control required type="password" placeholder="Mot de passe" />
                  <Form.Control.Feedback type="invalid">
                    Svp entrez votre mot de passe.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group as={Col} md="6" controlId="validationConfirmPassword">
                  <Form.Label>Confirmer mot de passe</Form.Label>
                  <Form.Control required type="password" placeholder="Confirmer mot de passe" />
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
                  <p>A deja une compe?</p>
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
