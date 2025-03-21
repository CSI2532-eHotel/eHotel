import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import EmployeeNavbar from "../../components/employeeNavbar";

const EmployeeHome = () => {
  // State for reservations
  const [reservations, setReservations] = useState([]);

  // State for payment modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  // State for cancellation modal
  const [showCancellationModal, setShowCancellationModal] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState(null);

  // Fetch reservations
  const fetchReservations = async () => {
    try {
      // This would be replaced with an actual API call
      /*
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/reservations`);
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
          nom_client: "Dupont",
          prenom_client: "Jean",
          montant: 750,
        },
        {
          reservation_ID: "1235",
          NAS_client: "987654321",
          chambre_ID: "106",
          debut_date_reservation: "2025-04-10",
          fin_date_reservation: "2025-04-15",
          nom_client: "Martin",
          prenom_client: "Sophie",
          montant: 1750,
        }
      ]);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchReservations();
  }, []);

  // Handle opening payment modal
  const openPaymentModal = (reservation) => {
    setSelectedReservation(reservation);
    setPaymentAmount(reservation.montant.toString());
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
      // Prepare data for API
      const locationData = {
        debut_date_location: selectedReservation.debut_date_reservation,
        fin_date_location: selectedReservation.fin_date_reservation,
        montant: parseFloat(paymentAmount),
        NAS_employe: "123456789", // This would come from authentication context
        NAS_client: selectedReservation.NAS_client,
        chambre_ID: selectedReservation.chambre_ID,
        reservation_ID: selectedReservation.reservation_ID
        // transaction_date will be generated by a trigger in the backend
      };

      // Send data to backend
      /* 
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/locations`, locationData);
      console.log("Location created successfully:", response.data);
      */

      // For demo purposes, remove the reservation from local state
      setReservations(reservations.filter(
        res => res.reservation_ID !== selectedReservation.reservation_ID
      ));

      // Close modal and show success message
      setShowPaymentModal(false);
      alert("Paiement confirmé et réservation transformée en location !");

    } catch (err) {
      console.error("Error creating location:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Une erreur s'est produite lors du traitement");
    }

    setValidated(true);
  };

  // Handle opening cancellation modal
  const openCancellationModal = (reservation) => {
    setReservationToCancel(reservation);
    setShowCancellationModal(true);
  };

  // Handle reservation cancellation
  const handleCancelReservation = async () => {
    try {
      // This would be replaced with an actual API call
      /*
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/reservations/${reservationToCancel.reservation_ID}`);
      */

      // For demo purposes, remove the reservation from local state
      setReservations(reservations.filter(
        res => res.reservation_ID !== reservationToCancel.reservation_ID
      ));

      // Close modal and show success message
      setShowCancellationModal(false);
      alert("La réservation a été annulée avec succès !");

    } catch (err) {
      console.error("Error cancelling reservation:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Une erreur s'est produite lors de l'annulation");
    }
  };

  return (
    <div>
      <EmployeeNavbar />
      <Container className="py-4">
        {/* Reservations Section */}
        <Row>
          <Col md={10} className="mx-auto">
            <h3 className="mb-4 text-primary">Liste des Réservations des Clients</h3>
            {reservations.length > 0 ? (
              reservations.map((reservation) => (
                <Card key={reservation.reservation_ID} className="mb-4 reservation-card">
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <p className="mb-2">
                          <strong>Client:</strong> {reservation.prenom_client} {reservation.nom_client}
                        </p>
                        <p className="mb-2">
                          <strong>NAS Client:</strong> {reservation.NAS_client}
                        </p>
                        <p className="mb-2">
                          <strong>Chambre ID:</strong> {reservation.chambre_ID}
                        </p>
                        <p className="mb-2">
                          <strong>Dates:</strong> Du {reservation.debut_date_reservation} au {reservation.fin_date_reservation}
                        </p>
                        <p className="mb-2">
                          <strong>Montant:</strong> ${reservation.montant}
                        </p>
                      </Col>
                      <Col md={4} className="d-flex align-items-end justify-content-end">
                        <Button
                          variant="danger"
                          onClick={() => openCancellationModal(reservation)}
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
      </Container>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer le Paiement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form noValidate validated={validated} onSubmit={handlePaymentSubmit}>
            <Form.Group className="mb-3" controlId="validationPaymentAmount">
              <Form.Label>Montant</Form.Label>
              <Form.Control
                required
                type="number"
                placeholder="Entrez le montant"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
                min="0"
                step="0.01"
              />
              <Form.Control.Feedback type="invalid">
                Svp entrez un montant valide.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary">
                Confirmer
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Cancellation Modal */}
      <Modal show={showCancellationModal} onHide={() => setShowCancellationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Annuler la Réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <p>Êtes-vous sûr de vouloir annuler cette réservation ?</p>
          <p>
            <strong>Client:</strong> {reservationToCancel?.prenom_client} {reservationToCancel?.nom_client}
          </p>
          <p>
            <strong>Dates:</strong> Du {reservationToCancel?.debut_date_reservation} au {reservationToCancel?.fin_date_reservation}
          </p>
          <p>
            <strong>Chambre:</strong> {reservationToCancel?.chambre_ID}
          </p>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="danger" onClick={handleCancelReservation}>
              Confirmer l'annulation
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeeHome;