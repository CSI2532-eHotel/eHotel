import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./clientProfile.css";
import ClientNavbar from "../../components/clientNavbar";
import ClientReservation from "./clientReservation";

const ClientProfile = () => {
  // State for client data
  const [clientData, setClientData] = useState({
    NAS_client: "",
    prenom_client: "",
    nom_client: "",
    rue: "",
    ville: "",
    code_postal: "",
    courriel_client: "",
  });

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    NAS_client: "",
    prenom_client: "",
    nom_client: "",
    rue: "",
    ville: "",
    code_postal: "",
    courriel_client: "",
    motpasse_client: "",
    confirmation_password: "",
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // Fetch client profile data
  const fetchClientProfile = async () => {
    try {
      // Get client data from localStorage that was stored during login
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!userData || !userData.courriel_client) {
        console.error("User data not found in local storage");
        // Redirect to login page if user data is not found
        window.location.href = "/";
        return;
      }

      // Use the email to fetch the latest client data as the client can update their profile
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/client/${userData.courriel_client}`
      );
      //need to convert the nas_client which in integer to string for display
      const modifiedData = {
        ...response.data,
        NAS_client: String(response.data.nas_client),
      };
      setClientData(modifiedData);
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchClientProfile();
  }, []);

  // Handle opening edit modal
  const openEditModal = () => {
    setEditFormData({
      prenom_client: clientData.prenom_client,
      nom_client: clientData.nom_client,
      rue: clientData.rue,
      ville: clientData.ville,
      code_postal: clientData.code_postal,
      courriel_client: clientData.courriel_client,
      motpasse_client: "",
      confirmation_password: "",
    });
    setShowEditModal(true);
  };

  // Handle edit form input changes
  const handleEditChange = (e) => {
    const { id, value } = e.target;
    // Map form control ids to database field names
    const fieldMap = {
      validationFirstName: "prenom_client",
      validationLastName: "nom_client",
      validationStreet: "rue",
      validationCity: "ville",
      validationPostal: "code_postal",
      validationEmail: "courriel_client",
      validationPassword: "motpasse_client",
      validationConfirmPassword: "confirmation_password",
    };

    setEditFormData({
      ...editFormData,
      [fieldMap[id]]: value,
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Form validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // Check if passwords match
    if (editFormData.motpasse_client !== editFormData.confirmation_password) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      // Prepare data for API
      const updatedClientData = {
        NAS_client: clientData.NAS_client,
        nom_client: editFormData.nom_client,
        prenom_client: editFormData.prenom_client,
        rue: editFormData.rue,
        ville: editFormData.ville,
        code_postal: editFormData.code_postal,
        courriel_client: editFormData.courriel_client,
        motpasse_client: editFormData.motpasse_client,
      };

      // Send data to backend
      /* 
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client/${clientData.NAS_client}`, updatedClientData);
      console.log("Update successful:", response.data);
      */

      // For demo purposes, update local state
      setClientData({
        ...clientData,
        ...updatedClientData,
      });

      // Close modal and show success message
      setShowEditModal(false);
      alert("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Error during update:", err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          "Une erreur s'est produite lors de la mise à jour"
      );
    }

    setValidated(true);
  };

  // Handle delete profile
  const handleDeleteProfile = async () => {
    try {
      // Send request to backend
      /* 
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/client/${clientData.NAS_client}`);
      */

      // Show success message and redirect to login page
      alert("Votre compte a été supprimé avec succès !");
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      alert("Une erreur s'est produite lors de la suppression du compte.");
    }
  };

  return (
    <div>
      <ClientNavbar />
      <Container className="py-4">
        {/* Client Profile Section */}
        <Row className="mb-3 mt-3">
          <Col md={10} className="mx-auto">
            <Card className="profile-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="m-0 text-primary">Mon Profil</h3>
                  <div>
                    <Button
                      variant="primary"
                      className="me-4"
                      onClick={openEditModal}
                    >
                      Modifiez mon Profil
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProfile}>
                      Supprimer Profil
                    </Button>
                  </div>
                </div>

                <div>
                  <Row className="mb-3">
                    <Col md={6}>
                      <h5 className="text-black">Prénom: <span className="profile-value">{clientData.prenom_client}</span></h5>
                    </Col>
                    <Col md={6}>
                      <h5 className="text-black">Nom: <span className="profile-value">{clientData.nom_client}</span></h5>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                      <h5 className="text-black">NAS: <span className="profile-value">{clientData.NAS_client}</span></h5>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={12}>
                      <h5 className="text-black">Adresse: <span className="profile-value">{clientData.rue}, {clientData.ville}, {clientData.code_postal}</span></h5>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={12}>
                      <h5 className="text-black">Courriel: <span className="profile-value">{clientData.courriel_client}</span></h5>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Edit Profile Modal*/}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modifier mon profil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form noValidate validated={validated} onSubmit={handleEditSubmit}>
            <h5 className="mb-3">Information Personnelle</h5>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Prénom"
                  defaultValue={editFormData.prenom_client}
                  onChange={handleEditChange}
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
                  defaultValue={editFormData.nom_client}
                  onChange={handleEditChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez votre nom.
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
                  defaultValue={editFormData.rue}
                  onChange={handleEditChange}
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
                  defaultValue={editFormData.ville}
                  onChange={handleEditChange}
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
                  defaultValue={editFormData.code_postal}
                  onChange={handleEditChange}
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
                  defaultValue={editFormData.courriel_client}
                  onChange={handleEditChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un courriel valide
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationPassword">
                <Form.Label>Nouveau mot de passe</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Mot de passe"
                  onChange={handleEditChange}
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
                  onChange={handleEditChange}
                />
                <Form.Control.Feedback type="invalid">
                  Mot de passe ne correspond pas.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary">
                Sauvegarder
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ClientReservation />
    </div>
  );
};

export default ClientProfile;