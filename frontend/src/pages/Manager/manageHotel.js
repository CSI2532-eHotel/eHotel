import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ManagerNavbar from "../../components/managerNavbar";
import axios from "axios";

const ManageHotel = () => {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Obtenir l'ID de l'hôtel du gestionnaire depuis localStorage
    const getManagerHotelId = () => {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const hotelId = userData?.hotel_id || null;
            console.log("userData", userData, "hotelId", hotelId);
            return hotelId;
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
            return null;
        }
    };

    const hotelId = getManagerHotelId();

    useEffect(() => {
        // Vérifier si l'ID de l'hôtel est disponible
        if (!hotelId) {
            setError("Impossible de récupérer l'ID de l'hôtel. Veuillez vous reconnecter.");
            setLoading(false);
            return;
        }

        // Récupérer les informations de l'hôtel depuis l'API
        const fetchHotelData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/hotel/${hotelId}`);
                setHotel(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération des données de l'hôtel:", err);
                setError("Impossible de récupérer les informations de l'hôtel.");
                setLoading(false);
            }
        };

        fetchHotelData();
    }, [hotelId, navigate]);

    if (loading) {
        return (
            <div>
                <ManagerNavbar />
                <Container className="py-4">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
    return (
        <div>
            <ManagerNavbar />
            <Container className="py-4">
                {/* Section Hôtel */}
                <Row className="mb-4">
                    <Col>
                        <h3 className="text-primary">Information de l'Hôtel</h3>
                    </Col>
                </Row>

                {error && (
                    <Row>
                        <Col>
                            <div className="alert alert-danger">{error}</div>
                        </Col>
                    </Row>
                )}

                {hotel && (
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Table responsive striped bordered>
                                        <tbody>
                                            <tr>
                                                <th width="30%">Hôtel ID</th>
                                                <td>{hotel.hotel_ID || hotel.hotel_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Chaîne ID</th>
                                                <td>{hotel.chaine_ID || hotel.chaine_id}</td>
                                            </tr>
                                            <tr>
                                                <th>Étoiles</th>
                                                <td>{hotel.etoile}</td>
                                            </tr>
                                            <tr>
                                                <th>Nom de l'Hôtel</th>
                                                <td>{hotel.nom_hotel}</td>
                                            </tr>
                                            <tr>
                                                <th>Adresse</th>
                                                <td>{hotel.rue}, {hotel.ville}, {hotel.code_postal}</td>
                                            </tr>
                                            <tr>
                                                <th>Courriel</th>
                                                <td>{hotel.courriel_hotel}</td>
                                            </tr>
                                            <tr>
                                                <th>Téléphone</th>
                                                <td>{hotel.numero_telephone_hotel}</td>
                                            </tr>
                                            <tr>
                                                <th>Nombre de chambres</th>
                                                <td>{hotel.nombre_chambre}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default ManageHotel;