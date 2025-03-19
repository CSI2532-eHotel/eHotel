import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Modal, Table, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavbar from "../../components/managerNavbar";

const ManageChambre = () => {
    const navigate = useNavigate();
    const [chambres, setChambres] = useState([]);
    const [error, setError] = useState("");
    const [modalError, setModalError] = useState(""); // Nouvel état pour les erreurs du modal
    const [loading, setLoading] = useState(true);

    // État pour les modals
    const [showChambreModal, setShowChambreModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chambreToDelete, setChambreToDelete] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [validated, setValidated] = useState(false);

    // Obtenir l'ID de l'hôtel du gestionnaire depuis localStorage
    const employeeData = JSON.parse(localStorage.getItem("userData") || "{}");
    const hotelId = employeeData ? (employeeData.hotel_id || employeeData.hotel_ID) : null;

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

    // Charger les chambres depuis l'API
    const fetchChambres = async () => {
        try {
            setLoading(true);
            console.log("Fetching chambers for hotel ID:", hotelId);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chambres/${hotelId}`);
            console.log("Chambers response:", response.data);
            setChambres(response.data);
            setError("");
        } catch (err) {
            console.error("Erreur lors du chargement des chambres:", err);
            setError("Erreur lors du chargement des chambres: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    // Vérifier si la chambre est réservée ou louée
    const verifyChambreStatus = async (chambreId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chambre/${chambreId}/status`);
            return response.data;
        } catch (err) {
            console.error("Erreur lors de la vérification du statut de la chambre:", err);
            throw err;
        }
    };

    useEffect(() => {
        // Vérifier si le gestionnaire est connecté
        const userType = localStorage.getItem("userType");
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");

        if (userType !== "employee" || !userData.est_gestionnaire) {
            navigate("/login");
            return;
        }

        if (hotelId) {
            console.log("Hotel ID found:", hotelId);
            fetchChambres();
        } else {
            console.error("Hotel ID not found in user data");
            setError("Impossible de déterminer l'hôtel du gestionnaire. Veuillez vous reconnecter.");
            setLoading(false);
        }
    }, [hotelId, navigate]);

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
        setModalError(""); // Réinitialiser l'erreur du modal
        setShowChambreModal(true);
    };

    // Ouvrir le modal pour modifier une chambre existante
    const openEditChambreModal = (chambre) => {
        setFormData({
            chambre_ID: chambre.chambre_id,
            prix: chambre.prix,
            commodite: chambre.commodite,
            capacite: chambre.capacite,
            extensible: chambre.extensible,
            dommage: chambre.dommage,
            vue: chambre.vue,
            hotel_ID: chambre.hotel_id,
        });
        setIsEditing(true);
        setValidated(false);
        setModalError(""); // Réinitialiser l'erreur du modal
        setShowChambreModal(true);
    };

    // Ouvrir le modal de confirmation de suppression
    const openDeleteModal = (chambre) => {
        setChambreToDelete(chambre);
        setModalError(""); // Réinitialiser l'erreur du modal
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
            if (isEditing) {
                // Mettre à jour une chambre existante
                await axios.put(`${process.env.REACT_APP_API_URL}/api/chambre/${formData.chambre_ID}`, formData);
                alert("Chambre mise à jour avec succès!");
            } else {
                // Ajouter une nouvelle chambre
                await axios.post(`${process.env.REACT_APP_API_URL}/api/chambre`, formData);
                alert("Chambre ajoutée avec succès!");
            }

            // Rafraîchir la liste des chambres
            fetchChambres();

            // Fermer le modal
            setShowChambreModal(false);
            setModalError(""); // Réinitialiser l'erreur du modal
        } catch (err) {
            console.error("Erreur lors de l'enregistrement de la chambre:", err);
            setModalError("Erreur lors de l'enregistrement de la chambre: " + (err.response?.data?.error || err.message));
            // Ne pas fermer le modal pour que l'utilisateur puisse voir l'erreur
        }
    };

    // Gérer la suppression d'une chambre
    const handleDeleteChambre = async () => {
        try {
            // Vérifier si la chambre peut être supprimée (pas de réservation ou location active)
            const status = await verifyChambreStatus(chambreToDelete.chambre_id);

            if (status.can_delete) {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/chambre/${chambreToDelete.chambre_id}`);
                alert("Chambre supprimée avec succès!");
                fetchChambres();
                setShowDeleteModal(false);
            } else {
                setModalError("Impossible de supprimer cette chambre car elle est actuellement réservée ou louée.");
                // Ne pas fermer le modal pour que l'utilisateur puisse voir l'erreur
            }
        } catch (err) {
            console.error("Erreur lors de la suppression de la chambre:", err);
            setModalError("Erreur lors de la suppression de la chambre: " + (err.response?.data?.error || err.message));
            // Ne pas fermer le modal pour que l'utilisateur puisse voir l'erreur
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
                                {loading ? (
                                    <div className="text-center">
                                        <p>Chargement des chambres...</p>
                                    </div>
                                ) : (
                                    <Table responsive striped>
                                        <thead>
                                            <tr>
                                                <th>Chambre ID</th>
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
                                            {chambres.length > 0 ? (
                                                chambres.map((chambre) => (
                                                    <tr key={chambre.chambre_id}>
                                                        <td>{chambre.chambre_id}</td>
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
                                                                className="me-4"
                                                                onClick={() => openEditChambreModal(chambre)}
                                                            >
                                                                Modifier
                                                            </Button>
                                                            {chambre.status === "disponible" && (
                                                                <Button
                                                                    variant="danger"
                                                                    size="sm"
                                                                    onClick={() => openDeleteModal(chambre)}
                                                                >
                                                                    Supprimer
                                                                </Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="9" className="text-center">
                                                        Aucune chambre trouvée pour cet hôtel
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                )}
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
                    {modalError && <div className="alert alert-danger">{modalError}</div>}

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationChambreID">
                                <Form.Label>ID Chambre</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="ID Chambre"
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
                                <Form.Label>Hôtel ID</Form.Label>
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
                                <Form.Label>Capacité</Form.Label>
                                <Form.Select
                                    required
                                    name="capacite"
                                    value={formData.capacite}
                                    onChange={handleChange}
                                >
                                    <option value="">Sélectionner une capacité</option>
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
                                    <option value="">Sélectionner une vue</option>
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
                                    <option value="">Sélectionner une commodité</option>
                                    <option value="Sofa">Sofa</option>
                                    <option value="TV">TV</option>
                                    <option value="Fridge">Fridge</option>
                                    <option value="Sofa, TV">Sofa, TV</option>
                                    <option value="Sofa, Fridge">Sofa, Fridge</option>
                                    <option value="TV, Fridge">TV, Fridge</option>
                                    <option value="Sofa, TV, Fridge">Sofa, TV, Fridge</option>
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
                                    <option value="">Sélectionner un état</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Veuillez sélectionner l'état de dommage.
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
                    {modalError && <div className="alert alert-danger">{modalError}</div>}

                    {chambreToDelete && (
                        <p>
                            Êtes-vous sûr de vouloir supprimer la chambre {chambreToDelete.chambre_id} ? Cette action est irréversible.
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