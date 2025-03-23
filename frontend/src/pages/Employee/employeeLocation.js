import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Modal } from "react-bootstrap";
import axios from "axios";
import EmployeeNavbar from "../../components/employeeNavbar";

const EmployeeLocation = () => {
  // State for available rooms
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      // Get current employee NAS from localStorage
      const employeeData = JSON.parse(localStorage.getItem('userData'));
      const employeeId = employeeData?.nas_employe;
      
      console.log("Fetching available rooms for employee:", employeeId);
      
      if (!employeeId) {
        throw new Error("Données d'employé non trouvées. Veuillez vous reconnecter.");
      }
      
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee/${employeeId}/availableRooms`);
      
      if (response.data.success) {
        setAvailableRooms(response.data.availableRooms);
        console.log("Available rooms loaded:", response.data.availableRooms.length);
      } else {
        console.error(response.data.message || "Erreur lors de la récupération des chambres disponibles");
        // Nous ne définissons pas l'erreur ici, seulement dans la console
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des chambres disponibles:", error);
      // Nous ne définissons pas l'erreur ici, seulement dans la console
    } finally {
      setLoading(false);
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
      debut_date_location: new Date().toISOString().split('T')[0], // Today by default
      fin_date_location: "",
      montant: room.prix.toString()
    });
    setShowLocationModal(true);
    setValidated(false);
    setError(""); // Réinitialiser l'erreur à chaque ouverture du modal
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

    // Recalculate amount when dates change
    if (name === "debut_date_location" || name === "fin_date_location") {
      const days = calculateDays(
        name === "debut_date_location" ? value : formData.debut_date_location,
        name === "fin_date_location" ? value : formData.fin_date_location
      );

      if (days > 0 && selectedRoom) {
        setFormData(prev => ({
          ...prev,
          [name]: value,
          montant: (selectedRoom.prix * days).toString()
        }));
      }
    }
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
      // Get current employee NAS from localStorage
      const employeeData = JSON.parse(localStorage.getItem('userData'));
      const employeeId = employeeData?.nas_employe;
      
      if (!employeeId) {
        throw new Error("Données d'employé non trouvées. Veuillez vous reconnecter.");
      }

      // Prepare data for API
      const locationData = {
        debut_date_location: formData.debut_date_location,
        fin_date_location: formData.fin_date_location,
        montant: parseFloat(formData.montant),
        NAS_employe: employeeId,
        NAS_client: formData.NAS_client,
        chambre_ID: selectedRoom.chambre_id
      };

      console.log("Sending location data:", locationData);

      // Send data to backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/locations/direct`, locationData);
      
      if (response.data.success) {
        // Refresh available rooms
        fetchAvailableRooms();
        
        // Close location modal
        setShowLocationModal(false);

        // Set success data and open success modal
        setSuccessData({
          chambre_ID: selectedRoom.chambre_id,
          debut_date: formData.debut_date_location,
          fin_date: formData.fin_date_location,
          montant: formData.montant
        });
        setShowSuccessModal(true);
      } else {
        throw new Error(response.data.message || "Erreur lors de la création de la location");
      }

    } catch (err) {
      console.error("Error creating location:", err);
      setError(err.response?.data?.message || err.message || "Une erreur s'est produite lors du traitement");
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
            
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Chargement...</span>
                </div>
                <p className="mt-3">Chargement des chambres disponibles...</p>
              </div>
            ) : availableRooms.length > 0 ? (
              availableRooms.map((room) => (
                <Card key={room.chambre_id} className="mb-4 room-card">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <p className="mb-2">
                          <strong>Chambre ID:</strong> {room.chambre_id}
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
          {error && <div className="alert alert-danger">{error}</div>}
          
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
              <p className="mb-2"><strong>Date de début:</strong> {new Date(successData.debut_date).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Date de fin:</strong> {new Date(successData.fin_date).toLocaleDateString()}</p>
              <p className="mb-0"><strong>Montant total:</strong> ${parseFloat(successData.montant).toFixed(2)}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeLocation;