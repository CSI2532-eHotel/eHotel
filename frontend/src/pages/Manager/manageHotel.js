import React, { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ManagerNavbar from "../../components/managerNavbar";

const ManageHotel = () => {
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [error, setError] = useState("");

    // Obtenir l'ID de l'hôtel du gestionnaire depuis localStorage
    const getManagerHotelId = () => {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            return userData?.hotel_ID || "1"; // Ajout d'une valeur par défaut
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
            return "1"; // Valeur par défaut
        }
    };

    const hotelId = getManagerHotelId();

    // Initialisation des données fictives au chargement
    useEffect(() => {
        // Vérifier si le gestionnaire est connecté
        const userType = localStorage.getItem("userType");
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");

        if (userType !== "employee" && !userData.est_gestionnaire) {
            // Pour le développement, on ne redirige pas vers login
            // navigate("/login");
            // return;
        }

        // Initialisation des données fictives de l'hôtel
        const hotelData = {
            hotel_ID: parseInt(hotelId),
            chaine_ID: 1,
            nom_hotel: "Hôtel Luxe Paris",
            rue: "123 Avenue des Champs-Élysées",
            ville: "Paris",
            code_postal: "75008",
            nombre_chambre: 100,
            courriel_hotel: "contact@luxehotels.com",
            numero_telephone_hotel: "0123456789",
            etoile: 5,
        };

        setHotel(hotelData);
    }, [hotelId]);

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
                                                <td>{hotel.hotel_ID}</td>
                                            </tr>
                                            <tr>
                                                <th>Chaîne ID</th>
                                                <td>{hotel.chaine_ID}</td>
                                            </tr>
                                            <tr>
                                                <th>étoile</th>
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