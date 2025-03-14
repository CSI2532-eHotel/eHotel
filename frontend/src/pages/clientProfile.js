import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";
import "./clientProfile.css";

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

  // State for reservations
  const [reservations, setReservations] = useState([]);

  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    prenom_client: "",
    nom_client: "",
    rue: "",
    ville: "",
    code_postal: "",
    courriel_client: "",
    motpasse_client: "",
    confirmation_password: ""
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // Fetch client profile data
  const fetchClientProfile = async () => {
    try {
      // For now, using a hardcoded NAS as if it were retrieved from authentication context
      const userNASClient = "123456789";
      
      // This would be replaced with an actual API call
      /* 
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${userNASClient}`);
      setClientData(response.data);
      */
      
      // Mock data for demonstration
      setClientData({
        NAS_client: "123456789",
        prenom_client: "Jean",
        nom_client: "Dupont",
        rue: "123 Rue Principale",
        ville: "Ottawa",
        code_postal: "K1P 1J1",
        courriel_client: "jean.dupont@email.com",
      });
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    }
  };

  // Fetch client reservations
  const fetchClientReservations = async () => {
    try {
      // For now, using a hardcoded NAS as if it were retrieved from authentication context
      const userNASClient = "123456789";
      
      // This would be replaced with an actual API call
      /* 
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${userNASClient}/reservations`);
      setReservations(response.data);
      */
      
      // Mock data for demonstration
      setReservations([
        {
          reservation_ID: "1234",
          NAS_client: "123456789",
          chambre_ID: "101",
          debut_date_reservation: "2025-03-20",
          fin_date_reservation: "2025-03-25",
          hotel_name: "Hôtel du Centre",
          rue: "123 Rue Principale",
          ville: "Ottawa",
          code_postal: "K1P 1J1",
          vue: "Montagne",
          extensible: true,
          commodite: ["TV", "Sofa", "Fridge"],
          prix: 150,
          capacite: "Simple"
        },
        {
          reservation_ID: "1235",
          NAS_client: "123456789",
          chambre_ID: "106",
          debut_date_reservation: "2025-04-10",
          fin_date_reservation: "2025-04-15",
          hotel_name: "Hôtel Luxe",
          rue: "303 Avenue de Luxe",
          ville: "Montreal",
          code_postal: "H2X 2Z7",
          vue: "Mer",
          extensible: true,
          commodite: ["TV", "Sofa", "Fridge"],
          prix: 350,
          capacite: "Double"
        }
      ]);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchClientProfile();
    fetchClientReservations();
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
      confirmation_password: ""
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
      validationConfirmPassword: "confirmation_password"
    };

    setEditFormData({
      ...editFormData,
      [fieldMap[id]]: value
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
        motpasse_client: editFormData.motpasse_client
      };

      // Send data to backend
      /* 
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/client/${clientData.NAS_client}`, updatedClientData);
      console.log("Update successful:", response.data);
      */
      
      // For demo purposes, update local state
      setClientData({
        ...clientData,
        ...updatedClientData
      });
      
      // Close modal and show success message
      setShowEditModal(false);
      alert("Profil mis à jour avec succès !");
      
    } catch (err) {
      console.error("Error during update:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Une erreur s'est produite lors de la mise à jour");
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

  // Handle reservation cancellation
  const handleCancelReservation = async (reservation) => {
    try {
      // Send request to backend
      /* 
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reservations/${reservation.reservation_ID}`);
      */
      
      // Remove the cancelled reservation from local state
      setReservations(reservations.filter(
        res => res.reservation_ID !== reservation.reservation_ID
      ));
      
      // Show success message
      alert("Réservation annulée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'annulation de la réservation:", error);
      alert("Une erreur s'est produite lors de l'annulation de la réservation.");
    }
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
                to="/ClientProfile"
                className="capitalize"
                id="ProfileLink"
                style={{ marginRight: "8px" }}
              >
                Profil
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

      <Container className="py-4">
        {/* Client Profile Section */}
        <Row className="mb-5">
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
                    <Button 
                     variant="danger"
                      onClick={handleDeleteProfile}
                    >
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

        {/* Reservations Section */}
        <Row>
          <Col md={10} className="mx-auto">
            <h3 className="mb-4 text-primary">Mes Réservations</h3>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <Card key={reservation.reservation_ID} className="mb-4 reservation-card">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <h4>{reservation.hotel_name}</h4>
                        <p className="mb-2">
                          <strong>Adresse:</strong> {reservation.rue}, {reservation.ville}, {reservation.code_postal}
                        </p>
                        <p className="mb-2">
                          <strong>Dates:</strong> Du {reservation.debut_date_reservation} au {reservation.fin_date_reservation}
                        </p>
                        <p className="mb-2">
                          <strong>Vue:</strong> {reservation.vue}
                        </p>
                        <p className="mb-2">
                          <strong>Chambre:</strong> {reservation.capacite} {reservation.extensible ? "(Extensible)" : ""}
                        </p>
                        <p className="mb-2">
                          <strong>Prix:</strong> ${reservation.prix}/nuit
                        </p>
                        <p className="mb-0">
                          <strong>Commodités:</strong> {reservation.commodite.join(", ")}
                        </p>
                      </Col>
                      <Col md={4} className="d-flex align-items-center justify-content-end" style={{marginTop: "160px"}}>
                        <Button 
                          variant="danger"
                          onClick={() => handleCancelReservation(reservation)}
                        >
                          Annuler cette réservation
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-center py-5">
                <h5>Vous n'avez aucune réservation active.</h5>
                <Button as={Link} to="/" variant="primary" className="mt-3">
                  Réserver une chambre
                </Button>
              </div>
            )}
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
              <Button variant="danger" className="me-2" onClick={() => setShowEditModal(false)}>
                Annuler
              </Button>
              <Button type="submit" variant="primary">
                Sauvegarder
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientProfile;