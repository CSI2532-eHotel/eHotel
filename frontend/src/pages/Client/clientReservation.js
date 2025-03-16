import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const ClientReservation = () => {
    // State for reservations
    const [reservations, setReservations] = useState([]);

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
                    capacite: "Simple",
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
                    capacite: "Double",
                },
            ]);
        } catch (error) {
            console.error("Erreur lors de la récupération des réservations:", error);
        }
    };

    // Initial data load
    useEffect(() => {
        fetchClientReservations();
    }, []);

    // Handle reservation cancellation
    const handleCancelReservation = async (reservation) => {
        try {
            // Send request to backend
            /* 
            await axios.delete(`${process.env.REACT_APP_API_URL}/api/reservations/${reservation.reservation_ID}`);
            */
            // Remove the cancelled reservation from local state
            setReservations(
                reservations.filter(
                    (res) => res.reservation_ID !== reservation.reservation_ID
                )
            );
            // Show success message
            alert("Réservation annulée avec succès !");
        } catch (error) {
            console.error("Erreur lors de l'annulation de la réservation:", error);
            alert(
                "Une erreur s'est produite lors de l'annulation de la réservation."
            );
        }
    };
    return (
        <div>
            <Container>
                {/* Reservations Section */}
                <Row>
                    <Col md={10} className="mx-auto mb-5">
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
                                            <Col md={4} className="d-flex align-items-center justify-content-end" style={{ marginTop: "160px" }}>
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
        </div>
    );
};
export default ClientReservation;


