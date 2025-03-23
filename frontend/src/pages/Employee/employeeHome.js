import React, { useState, useEffect } from "react";import { Button, Card, Col, Container, Form, Row, Modal, Nav, Tab } from "react-bootstrap";
import axios from "axios";
import EmployeeNavbar from "../../components/employeeNavbar";

const EmployeeHome = () => {
  // State for reservations
  const [reservations, setReservations] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("reservations");

  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [validated, setValidated] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Fetch reservations
  const fetchReservations = async () => {
    try {
      setLoading(true);
      // Get current employee NAS from localStorage
      const employeeData = JSON.parse(localStorage.getItem('userData'));
      const employeeId = employeeData?.nas_employe;
      
      console.log("Fetching reservations for employee:", employeeId);
      
      if (!employeeId) {
        throw new Error("Données d'employé non trouvées. Veuillez vous reconnecter.");
      }
  
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee/${employeeId}/reservations`);
      
      if (response.data.success) {
        setReservations(response.data.reservations);
        console.log("Reservations loaded:", response.data.reservations.length);
      } else {
        throw new Error(response.data.message || "Erreur lors de la récupération des réservations");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      setError(error.message || "Une erreur est survenue lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  // Fetch locations
  const fetchLocations = async () => {
    try {
      setLoading(true);
      // Get current employee NAS from localStorage
      const employeeData = JSON.parse(localStorage.getItem('userData'));
      const employeeId = employeeData?.nas_employe;
      
      console.log("Fetching locations for employee:", employeeId);
      
      if (!employeeId) {
        throw new Error("Données d'employé non trouvées. Veuillez vous reconnecter.");
      }
  
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employee/${employeeId}/locations`);
      console.log("Locations API response:", response.data);
      
      if (response.data.success) {
        setLocations(response.data.locations);
        console.log("Locations loaded:", response.data.locations.length);
      } else {
        throw new Error(response.data.message || "Erreur lors de la récupération des locations");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des locations:", error);
      setError(error.message || "Une erreur est survenue lors du chargement des locations");
    } finally {
      setLoading(false);
    }
  };

  // Initial data load - fetch both data sets on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchReservations(), fetchLocations()]);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Change tab without re-fetching data
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Handle opening payment modal
  const openPaymentModal = (reservation) => {
    setSelectedReservation(reservation);
    setPaymentAmount(reservation.montant.toString());
    setPaymentError("");
    setShowPaymentModal(true);
  };

  // Handle payment amount change
  const handlePaymentAmountChange = (e) => {
    setPaymentAmount(e.target.value);
  };

  // Handle payment form submission
  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

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
        debut_date_location: selectedReservation.debut_date_reservation,
        fin_date_location: selectedReservation.fin_date_reservation,
        montant: parseFloat(paymentAmount),
        NAS_employe: employeeId,
        NAS_client: selectedReservation.nas_client,
        chambre_ID: selectedReservation.chambre_id,
        reservation_ID: selectedReservation.reservation_id
        // transaction_date will be generated by a trigger in the backend
      };

      console.log("Sending location data:", locationData);

      // Send data to backend
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/locations`, locationData);
      
      if (response.data.success) {
        // Refresh both datasets
        await Promise.all([fetchReservations(), fetchLocations()]);
        setShowPaymentModal(false);
        alert("Paiement confirmé et réservation transformée en location !");
      } else {
        throw new Error(response.data.message || "Erreur lors de la création de la location");
      }

    } catch (err) {
      console.error("Error creating location:", err);
      setPaymentError(err.response?.data?.message || err.message || "Une erreur s'est produite lors du traitement");
    }

    setValidated(true);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/reservations/${reservationId}`);
      
      if (response.data.success) {
        // Refresh reservations list
        fetchReservations();
        
        // Show success message
        alert("La réservation a été annulée avec succès !");
      } else {
        throw new Error(response.data.message || "Erreur lors de l'annulation de la réservation");
      }

    } catch (err) {
      console.error("Error cancelling reservation:", err);
      setError(err.response?.data?.message || err.message || "Une erreur s'est produite lors de l'annulation");
      alert("Erreur lors de l'annulation: " + (err.response?.data?.message || err.message || "Une erreur s'est produite"));
    }
  };


  // Get the correct loading state based on active tab
  const isLoading = () => {
    if (activeTab === "reservations") {
      return loading && reservations.length === 0;
    } else {
      return loading && locations.length === 0;
    }
  };

  return (
    <div>
      <EmployeeNavbar />
      <Container className="py-4">
        {/* Navigation Tabs */}
        <Tab.Container id="management-tabs" activeKey={activeTab} onSelect={handleTabChange}>
          <Nav variant="tabs" className="mb-4">
            <Nav.Item>
              <Nav.Link eventKey="reservations" className="text-primary">Réservations</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="locations" className="text-primary">Locations</Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Tab.Content>
            {/* Reservations Tab */}
            <Tab.Pane eventKey="reservations">
              <Row>
                <Col md={10} className="mx-auto">
                  <h3 className="mb-4 text-primary">Liste des Réservations des Clients</h3>
                  
                  {isLoading() ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                      </div>
                      <p className="mt-3">Chargement des réservations...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : reservations.length > 0 ? (
                    reservations.map((reservation) => (
                      <Card key={reservation.reservation_id} className="mb-4 reservation-card">
                        <Card.Body>
                          <Row>
                            <Col md={8}>
                              <p className="mb-2">
                                <strong>Client:</strong> {reservation.prenom_client} {reservation.nom_client}
                              </p>
                              <p className="mb-2">
                                <strong>NAS Client:</strong> {reservation.nas_client}
                              </p>
                              <p className="mb-2">
                                <strong>Chambre ID:</strong> {reservation.chambre_id}
                              </p>
                              <p className="mb-2">
                                <strong>Dates:</strong> Du {new Date(reservation.debut_date_reservation).toLocaleDateString()} au {new Date(reservation.fin_date_reservation).toLocaleDateString()}
                              </p>
                              <p className="mb-2">
                                <strong>Montant:</strong> ${reservation.montant}
                              </p>
                            </Col>
                            <Col md={4} className="d-flex align-items-end justify-content-end">
                              <Button
                                variant="danger"
                                onClick={() => handleCancelReservation(reservation.reservation_id)}
                                className="me-3"
                              >
                                Annulez
                              </Button>
                              <Button
                                variant="primary"
                                onClick={() => openPaymentModal(reservation)}
                              >
                                Confirmez
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <h5>Il n'y a aucune réservation à confirmer.</h5>
                    </div>
                  )}
                </Col>
              </Row>
            </Tab.Pane>
            
            {/* Locations Tab */}
            <Tab.Pane eventKey="locations">
              <Row>
                <Col md={10} className="mx-auto">
                  <h3 className="mb-4 text-primary">Liste des Locations Actuelles</h3>
                  
                  {isLoading() ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                      </div>
                      <p className="mt-3">Chargement des locations...</p>
                    </div>
                  ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                  ) : locations.length > 0 ? (
                    locations.map((location) => (
                      <Card key={location.location_id} className="mb-4 location-card">
                        <Card.Body>
                          <Row>
                            <Col md={6}>
                              <h5 className="mb-3">Informations du Client</h5>
                              <p className="mb-2">
                                <strong>Client:</strong> {location.prenom_client} {location.nom_client}
                              </p>
                              <p className="mb-2">
                                <strong>NAS Client:</strong> {location.nas_client}
                              </p>
                            </Col>
                            <Col md={6}>
                              <h5 className="mb-3">Détails de la Location</h5>
                              <p className="mb-2">
                                <strong>Chambre ID:</strong> {location.chambre_id}
                              </p>
                              <p className="mb-2">
                                <strong>Période:</strong> Du {new Date(location.debut_date_location).toLocaleDateString()} au {new Date(location.fin_date_location).toLocaleDateString()}
                              </p>
                              <p className="mb-2">
                                <strong>Date de Transaction:</strong> {new Date(location.transaction_date).toLocaleDateString()}
                              </p>
                              <p className="mb-2">
                                <strong>Montant Payé:</strong> ${location.montant}
                              </p>
                              <p className="mb-2">
                                <strong>Approuvé par:</strong> {location.prenom_employe} {location.nom_employe}
                              </p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <h5>Il n'y a aucune location active.</h5>
                    </div>
                  )}
                </Col>
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default EmployeeHome;