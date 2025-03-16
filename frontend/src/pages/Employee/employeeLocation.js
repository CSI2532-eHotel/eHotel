import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeNavbar from "../../components/employeeNavbar";

const EmployeeLocation = () => {
  // State for available rooms
  const [availableRooms, setAvailableRooms] = useState([]);

  // State for location modal
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // State for form data
  const [formData, setFormData] = useState({
    NAS_client: "",
    debut_date_location: "",
    fin_date_location: "",
    montant: ""
  });

  // State for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  // Fetch available rooms
  const fetchAvailableRooms = async () => {
    try {
      // This would be replaced with an actual API call
      /*
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chambres/disponibles`);
      setAvailableRooms(response.data);
      */

      // Mock data for demonstration
      setAvailableRooms([
        {
          chambre_ID: "101",
          prix: 150,
          commodite: "Wi-Fi, Mini-bar, TV",
          capacite: "2 personnes",
          extensible: "Non",
          vue: "Vue sur la ville",
          hotel_ID: "1",
          nom_hotel: "Hôtel Central"
        },
        {
          chambre_ID: "205",
          prix: 275,
          commodite: "Wi-Fi, Mini-bar, TV, Climatisation, Balcon",
          capacite: "4 personnes",
          extensible: "Oui",
          vue: "Vue sur la mer",
          hotel_ID: "1",
          nom_hotel: "Hôtel Central"
        }
      ]);
    } catch (error) {
      console.error("Erreur lors de la récupération des chambres disponibles:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  // Handle opening location modal
  const openLocationModal = (room) => {
    setSelectedRoom(room);
    setFormData({
      NAS_client: "",
      debut_date_location: "",
      fin_date_location: "",
      montant: room.prix.toString()
    });
    setShowLocationModal(true);
    setValidated(false);
    setError("");
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Pour NAS_client, ne permettre que des chiffres et limiter à 9 caractères
    if (name === "NAS_client" && !/^\d*$/.test(value)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate NAS format (9 chiffres)
  const validateNAS = (nas) => {
    return /^\d{9}$/.test(nas);
  };

  // Handle location form submission
  const handleLocationSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // NAS validation
    if (!validateNAS(formData.NAS_client)) {
      setError("Le NAS doit contenir exactement 9 chiffres.");
      setValidated(true);
      return;
    }

    // Form validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      // Prepare data for API
      const locationData = {
        debut_date_location: formData.debut_date_location,
        fin_date_location: formData.fin_date_location,
        montant: parseFloat(formData.montant),
        NAS_employe: "123456789", // This would come from authentication context
        NAS_client: formData.NAS_client,
        chambre_ID: selectedRoom.chambre_ID,
        reservation_ID: null // Direct location, not from reservation
      };

      // Send data to backend
      /* 
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/locations`, locationData);
      console.log("Location created successfully:", response.data);
      */

      // For demo purposes, remove the room from local state
      setAvailableRooms(availableRooms.filter(
        room => room.chambre_ID !== selectedRoom.chambre_ID
      ));

      // Close location modal
      setShowLocationModal(false);

      // Set success data and open success modal
      setSuccessData({
        chambre_ID: selectedRoom.chambre_ID,
        debut_date: formData.debut_date_location,
        fin_date: formData.fin_date_location,
        montant: formData.montant
      });
      setShowSuccessModal(true);

    } catch (err) {
      console.error("Error creating location:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Une erreur s'est produite lors du traitement");
    }

    setValidated(true);
  };

  // Calculate number of days between dates
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      <EmployeeNavbar />

      <Container className="py-4">
        {/* Available Rooms Section */}
        <Row>
          <Col md={10} className="mx-auto">
            <h3 className="mb-4 text-primary">Liste de Chambres Disponibles</h3>
            {availableRooms.length > 0 ? (
              availableRooms.map((room) => (
                <Card key={room.chambre_ID} className="mb-4 room-card">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <p className="mb-2">
                          <strong>Chambre ID:</strong> {room.chambre_ID}
                        </p>
                        <p className="mb-2">
                          <strong>Prix:</strong> ${room.prix} par nuit
                        </p>
                        <p className="mb-2">
                          <strong>Commodités:</strong> {room.commodite}
                        </p>
                        <p className="mb-2">
                          <strong>Capacité:</strong> {room.capacite}
                        </p>
                        <p className="mb-2">
                          <strong>Vue:</strong> {room.vue}
                        </p>
                      </Col>
                      <Col md={4} className="d-flex align-items-end justify-content-end">
                        <Button
                          variant="primary"
                          onClick={() => openLocationModal(room)}
                        >
                          Créer une location
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className="text-center py-5">
                <h5>Il n'y a aucune chambre disponible pour le moment.</h5>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Location Modal */}
      <Modal show={showLocationModal} onHide={() => setShowLocationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleLocationSubmit}>
            <Form.Group className="mb-3" controlId="validationNASClient">
              <Form.Label>NAS Client</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Entrez le NAS du client"
                name="NAS_client"
                value={formData.NAS_client}
                onChange={handleInputChange}
                maxLength={9}
                pattern="\d{9}"
              />
              <Form.Control.Feedback type="invalid">
                Le NAS du client doit contenir exactement 9 chiffres.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationStartDate">
              <Form.Label>Date de début</Form.Label>
              <Form.Control
                required
                type="date"
                name="debut_date_location"
                value={formData.debut_date_location}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
              />
              <Form.Control.Feedback type="invalid">
                La date de début est requise.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationEndDate">
              <Form.Label>Date de fin</Form.Label>
              <Form.Control
                required
                type="date"
                name="fin_date_location"
                value={formData.fin_date_location}
                onChange={handleInputChange}
                min={formData.debut_date_location || new Date().toISOString().split('T')[0]}
              />
              <Form.Control.Feedback type="invalid">
                La date de fin est requise et doit être après la date de début.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationAmount">
              <Form.Label>Montant</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Entrez le montant"
                name="montant"
                value={formData.montant}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
              <Form.Text className="text-muted">
                {formData.debut_date_location && formData.fin_date_location && (
                  <>
                    Prix suggéré: ${(selectedRoom.prix * calculateDays(formData.debut_date_location, formData.fin_date_location)).toFixed(2)}
                    ({calculateDays(formData.debut_date_location, formData.fin_date_location)} jours à ${selectedRoom.prix}/nuit)
                  </>
                )}
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Un montant valide est requis.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary">
                Créer la location
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Success Modal */}
      <Modal
        show={showSuccessModal}
        onHide={() => setShowSuccessModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>
            <i className="bi bi-check-circle me-2"></i>
            Succès
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
            <h4 className="mt-3">Votre location a été créée</h4>
          </div>

          {successData && (
            <div className="p-3 border rounded">
              <p className="mb-2"><strong>Chambre:</strong> {successData.chambre_ID}</p>
              <p className="mb-2"><strong>Date de début:</strong> {successData.debut_date}</p>
              <p className="mb-2"><strong>Date de fin:</strong> {successData.fin_date}</p>
              <p className="mb-0"><strong>Montant total:</strong> ${parseFloat(successData.montant).toFixed(2)}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowSuccessModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeLocation;