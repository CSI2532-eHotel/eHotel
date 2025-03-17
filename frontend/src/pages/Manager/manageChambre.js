import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Modal, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavbar from "../../components/managerNavbar";
const ManageChambre = () => {
    const navigate = useNavigate();
    const [chambres, setChambres] = useState([]);
    const [error, setError] = useState("");
    // Suppression de l'état loading

    // État pour les modals
    const [showChambreModal, setShowChambreModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chambreToDelete, setChambreToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [validated, setValidated] = useState(false);

    // Obtenir l'ID de l'hôtel du gestionnaire depuis localStorage
    const getManagerHotelId = () => {
        try {
            const userData = JSON.parse(localStorage.getItem("userData"));
            return userData?.hotel_ID || "H001"; // Ajout d'une valeur par défaut
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur:", error);
            return "H001"; // Valeur par défaut
        }
    };

    const hotelId = getManagerHotelId();

    // Formulaire de chambre
    const [formData, setFormData] = useState({
        chambre_ID: "",
        prix: "",
        commodite: "",
        capacite: "",
        extensible: "Non",
        dommage: "",
        vue: "",
        hotel_ID: hotelId,
    });

    // Initialisation directe des données fictives au chargement
    useEffect(() => {
        // Vérifier si le gestionnaire est connecté
        const userType = localStorage.getItem("userType");
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");

        if (userType !== "employee" && !userData.est_gestionnaire) {
            // Pour le développement, on ne redirige pas vers login
            // navigate("/login");
            // return;
        }

        // Initialisation directe des données fictives
        setChambres([
            {
                chambre_ID: 101,
                prix: 120,
                commodite: "WiFi, TV, Mini-bar",
                capacite: "2",
                extensible: "Oui",
                dommage: "Oui",
                vue: "Mer",
                hotel_ID: hotelId,
                status: "disponible" // disponible, réservé, loué
            },
            {
                chambre_ID: 102,
                prix: 150,
                commodite: "WiFi, TV, Baignoire",
                capacite: "2",
                extensible: "Non",
                dommage: "Noon",
                vue: "Montagne",
                hotel_ID: hotelId,
                status: "réservé"
            },
            {
                chambre_ID: 103,
                prix: 200,
                commodite: "WiFi, TV, Mini-bar, Cuisine",
                capacite: "4",
                extensible: "Oui",
                dommage: "Aucun",
                vue: "Ville",
                hotel_ID: hotelId,
                status: "loué"
            },
        ]);
    }, [hotelId]);

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Ouvrir le modal pour ajouter une nouvelle chambre
    const openAddChambreModal = () => {
        setFormData({
            chambre_ID: "",
            prix: "",
            commodite: "",
            capacite: "",
            extensible: "Non",
            dommage: "",
            vue: "",
            hotel_ID: hotelId,
        });
        setIsEditing(false);
        setValidated(false);
        setShowChambreModal(true);
    };

    // Ouvrir le modal pour modifier une chambre existante
    const openEditChambreModal = (chambre) => {
        setFormData({
            chambre_ID: chambre.chambre_ID,
            prix: chambre.prix,
            commodite: chambre.commodite,
            capacite: chambre.capacite,
            extensible: chambre.extensible,
            dommage: chambre.dommage,
            vue: chambre.vue,
            hotel_ID: chambre.hotel_ID,
        });
        setIsEditing(true);
        setValidated(false);
        setShowChambreModal(true);
    };

    // Ouvrir le modal de confirmation de suppression
    const openDeleteModal = (chambre) => {
        setChambreToDelete(chambre);
        setShowDeleteModal(true);
    };

    // Gérer la soumission du formulaire (créer/mettre à jour une chambre)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        // Validation du formulaire
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        try {
            // Pour des fins de démonstration, simuler un succès et mettre à jour les données locales
            if (isEditing) {
                // Mettre à jour la chambre dans l'état local
                setChambres(chambres.map(chambre =>
                    chambre.chambre_ID === formData.chambre_ID ? formData : chambre
                ));
                alert("Chambre mise à jour avec succès!");
            } else {
                // Ajouter la nouvelle chambre à l'état local avec un statut par défaut
                setChambres([...chambres, { ...formData, status: "disponible" }]);
                alert("Chambre ajoutée avec succès!");
            }

            // Fermer le modal
            setShowChambreModal(false);
        } catch (err) {
            console.error("Erreur lors de l'enregistrement de la chambre:", err);
            setError("Erreur lors de l'enregistrement de la chambre. Veuillez réessayer.");
        }
    };

    // Gérer la suppression d'une chambre
    const handleDeleteChambre = async () => {
        try {
            // Simuler une suppression en mettant à jour l'état local
            setChambres(chambres.filter(chambre => chambre.chambre_ID !== chambreToDelete.chambre_ID));
            alert("Chambre supprimée avec succès!");

            // Fermer le modal
            setShowDeleteModal(false);
        } catch (err) {
            console.error("Erreur lors de la suppression de la chambre:", err);
            setError("Erreur lors de la suppression de la chambre. Veuillez réessayer.");
        }
    };

    // Afficher un badge selon le statut de la chambre
    const renderStatusBadge = (status) => {
        switch (status) {
            case "disponible":
                return <Badge bg="success">Disponible</Badge>;
            case "réservé":
                return <Badge bg="warning">Réservé</Badge>;
            case "loué":
                return <Badge bg="danger">Loué</Badge>;
            default:
                return <Badge bg="secondary">Inconnu</Badge>;
        }
    };
    return (
        <div>
            <ManagerNavbar />
            <Container className="py-4">
                {/* Section Chambres */}
                <Row className="mb-4">
                    <Col>
                        <h3 className="text-primary">Liste des Chambres</h3>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={openAddChambreModal}>
                            Ajouter une Chambre
                        </Button>
                    </Col>
                </Row>

                {error && (
                    <Row>
                        <Col>
                            <div className="alert alert-danger">{error}</div>
                        </Col>
                    </Row>
                )}

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Table responsive striped>
                                    <thead>
                                        <tr>
                                            <th>chambre_ID</th>
                                            <th>Prix</th>
                                            <th>Capacité</th>
                                            <th>Extensible</th>
                                            <th>Vue</th>
                                            <th>Commodités</th>
                                            <th>Dommages</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chambres.map((chambre) => (
                                            <tr key={chambre.chambre_ID}>
                                                <td>{chambre.chambre_ID}</td>
                                                <td>{chambre.prix}$/nuit</td>
                                                <td>{chambre.capacite}</td>
                                                <td>{chambre.extensible}</td>
                                                <td>{chambre.vue}</td>
                                                <td>{chambre.commodite}</td>
                                                <td>{chambre.dommage}</td>
                                                <td>{renderStatusBadge(chambre.status)}</td>
                                                <td>
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        className="me-3"
                                                        onClick={() => openEditChambreModal(chambre)}
                                                    >
                                                        Modifier
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => openDeleteModal(chambre)}
                                                        disabled={chambre.status === "loué" || chambre.status === "réservé"}
                                                    >
                                                        Supprimer
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Modal de formulaire de chambre */}
            <Modal
                show={showChambreModal}
                onHide={() => setShowChambreModal(false)}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">
                        {isEditing ? "Modifier une Chambre" : "Ajouter une Chambre"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <div className="alert alert-danger">{error}</div>}

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationChambreID">
                                <Form.Label>chambre_ID</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="chmabre_id"
                                    name="chambre_ID"
                                    value={formData.chambre_ID}
                                    onChange={handleChange}
                                    readOnly={isEditing}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Veuillez entrer un numéro de chambre valide.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationHotelID">
                                <Form.Label>Hôtel_ID</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="ID Hôtel"
                                    name="hotel_ID"
                                    value={formData.hotel_ID}
                                    readOnly={true}
                                />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationPrix">
                                <Form.Label>Prix par Nuit ($)</Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    placeholder="Prix"
                                    name="prix"
                                    value={formData.prix}
                                    onChange={handleChange}
                                    min="0"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Veuillez entrer un prix valide.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationcapacite">
                                <Form.Label>capacite</Form.Label>
                                <Form.Select
                                    required
                                    name="capacite"
                                    value={formData.capacite}
                                    onChange={handleChange}
                                >
                                    <option value="Simple">Simple</option>
                                    <option value="Double">Double</option>
                                    <option value="Famille">Famille</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationExtensible">
                                <Form.Label>Extensible</Form.Label>
                                <Form.Select
                                    required
                                    name="extensible"
                                    value={formData.extensible}
                                    onChange={handleChange}
                                >
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationVue">
                                <Form.Label>Vue</Form.Label>
                                <Form.Select
                                    required
                                    name="vue"
                                    value={formData.vue}
                                    onChange={handleChange}
                                >
                                    <option value="Mer">Mer</option>
                                    <option value="Montagne">Montagne</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Veuillez sélectionner une vue.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md="6" controlId="validationCommodite">
                                <Form.Label>Commodités</Form.Label>
                                <Form.Select
                                    required
                                    name="commodite"
                                    value={formData.commodite}
                                    onChange={handleChange}
                                >
                                    <option value="TV">TV</option>
                                    <option value="Sofa">Sofa</option>
                                    <option value="Fridge">Fridge</option>
                                </Form.Select>

                                <Form.Control.Feedback type="invalid">
                                    Veuillez sélectionner une commodité.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationDommage">
                                <Form.Label>Dommage</Form.Label>
                                <Form.Select
                                    required
                                    name="dommage"
                                    value={formData.dommage}
                                    onChange={handleChange}
                                >
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Veuillez sélectionner si c'est dommage.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button type="submit" variant="primary">
                                {isEditing ? "Sauvegarder" : "Ajouter"}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal de confirmation de suppression */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-danger">Confirmation de suppression</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {chambreToDelete && (
                        <p>
                            Êtes-vous sûr de vouloir supprimer la chambre_ID {chambreToDelete.chambre_ID} ? Cette action est irréversible.
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteChambre}>
                        Supprimer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ManageChambre;
