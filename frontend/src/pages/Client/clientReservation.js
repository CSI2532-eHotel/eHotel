import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./clientProfile.css";
import { toast } from "react-toastify";
import 'bootstrap-icons/font/bootstrap-icons.css';

const ClientReservation = () => {
    // State for reservations data
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for cancel modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [reservationToCancel, setReservationToCancel] = useState(null);

    // API base URL
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    // Fetch client reservations
    const fetchClientReservations = async () => {
        try {
            setLoading(true);

            // Get client data from localStorage that was stored during login
            const userData = JSON.parse(localStorage.getItem("userData"));

            if (!userData || !userData.nas_client) {
                setError("Vous devez être connecté pour voir vos réservations.");
                setLoading(false);
                return;
            }

            // Ensure NAS_client is a string to avoid integer parsing issues
            const nasClient = String(userData.nas_client);

            // Use the NAS_client to fetch the reservations
            const response = await axios.get(
                `${API_BASE_URL}/api/client/${nasClient}/reservations`
            );

            // Format the data with proper types
            const formattedReservations = response.data.map(reservation => ({
                ...reservation,
                reservation_id: String(reservation.reservation_id || reservation.reservation_id),
                commodite: Array.isArray(reservation.commodite)
                    ? reservation.commodite
                    : parseCommodites(reservation.commodite)
            }));

            setReservations(formattedReservations);
            setError(null);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations:", error);
            setError("Impossible de charger vos réservations. Veuillez réessayer plus tard.");
            toast.error("Erreur lors du chargement des réservations. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    // Function to parse commodities string to array
    const parseCommodites = (commoditeString) => {
        if (!commoditeString) return [];

        // Diviser la chaîne par "+" et nettoyer les espaces
        return commoditeString.split("+").map(item => item.trim());
    };

    // Initial data load
    useEffect(() => {
        fetchClientReservations();
    }, []);

    // Open confirmation modal
    const confirmCancelReservation = (reservation) => {
        setReservationToCancel(reservation);
        setShowConfirmModal(true);
    };

    // Handle reservation cancellation
    const handleCancelReservation = async () => {
        try {
            // Ensure reservation_id is a string
            const reservationId = String(reservationToCancel.reservation_id);

            // Send request to backend
            await axios.delete(
                `${API_BASE_URL}/api/reservations/${reservationId}`
            );

            // Remove the cancelled reservation from local state
            setReservations(
                reservations.filter(
                    (res) => res.reservation_id !== reservationToCancel.reservation_id
                )
            );

            // Close modal and reset reservation to cancel
            setShowConfirmModal(false);
            setReservationToCancel(null);

            // Show success message
            toast.success("Réservation annulée avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'annulation de la réservation:", error);
            toast.error("Une erreur s'est produite lors de l'annulation de la réservation.");
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <Container className="py-4">
            {/* Reservations Section */}
            <Row className="mb-5">
                <Col md={10} className="mx-auto">
                    <Card className="reservation-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="m-0 text-primary">Mes Réservations</h3>
                            </div>

                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Chargement de vos réservations...</p>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : reservations.length > 0 ? (
                                reservations.map((reservation) => (
                                    <Card key={reservation.reservation_id} className="mb-4 hotel-card">
                                        <Card.Body>
                                            <Row>
                                                <Col md={12}>
                                                    <Card.Title className="d-flex align-items-center mb-3">
                                                        <h4 className="text-black m-0">{reservation.hotel_name}</h4>
                                                        <div className="ms-2 d-flex align-items-center">
                                                            {Array.from({ length: parseInt(reservation.etoile) || 0 }).map((_, i) => (
                                                                <i key={i} className="bi bi-star-fill" style={{ color: "#D1A062", fontSize: "1.3rem" }}></i>
                                                            ))}
                                                        </div>
                                                    </Card.Title>
                                                    <Row className="mb-3 mt-3">
                                                        <Col md={12}>
                                                            <h5>
                                                                <span className="text-black">Réservation ID:  {reservation.reservation_id}</span>
                                                            </h5>
                                                            <h5 className="text-black">
                                                                Adresse: <span className="profile-value">
                                                                    {reservation.rue}, {reservation.ville}, {reservation.code_postal}
                                                                </span>
                                                            </h5>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={12}>
                                                            <h5 className="text-black">
                                                                Dates: <span className="profile-value">
                                                                    Du {formatDate(reservation.debut_date_reservation)} au {formatDate(reservation.fin_date_reservation)}
                                                                </span>
                                                            </h5>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <h5 className="text-black">
                                                                Vue: <span>{reservation.vue}</span>
                                                            </h5>
                                                        </Col>
                                                        <Col md={6}>
                                                            <h5 className="text-black">
                                                                Chambre: <span >
                                                                    {reservation.capacite} {reservation.extensible ? "(Extensible)" : ""}
                                                                </span>
                                                            </h5>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md={6}>
                                                            <h5 className="text-black d-flex flex-wrap gap-1">
                                                                Prix: <span>${reservation.prix}/nuit</span>
                                                            </h5>
                                                        </Col>
                                                        <Col md={6}>
                                                            <h5 className="text-black">
                                                                <span style={{ marginRight: "10px" }}>Commodités:</span>
                                                                {Array.isArray(reservation.commodite) && reservation.commodite.map((item, idx) => (
                                                                    <span key={idx} className="badge" style={{ backgroundColor: "#D1A062", marginRight: "5px" }}>
                                                                        {item.trim()}
                                                                    </span>
                                                                ))}
                                                            </h5>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={12} className="d-flex justify-content-end">
                                                            <Button
                                                                variant="danger"
                                                                onClick={() => confirmCancelReservation(reservation)}
                                                            >
                                                                Annuler cette réservation
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <i className="bi bi-calendar-x text-muted" style={{ fontSize: "3rem" }}></i>
                                    <h5 className="mt-3">Vous n'avez aucune réservation active.</h5>
                                    <Button as={Link} to="/" variant="primary" className="mt-3" style={{ backgroundColor: "#D1A062", borderColor: "#D1A062" }}>
                                        <i className="bi bi-calendar-plus me-2"></i>
                                        Réserver une chambre
                                    </Button>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Cancellation Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmer l'annulation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Êtes-vous sûr de vouloir annuler cette réservation? Cette action est irréversible.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCancelReservation}>
                        <i className=""></i>
                        Confirmer l'annulation
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ClientReservation;