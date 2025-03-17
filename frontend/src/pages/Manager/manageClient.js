import React, { useState, useEffect } from "react";
import {Button,Card,Col,Container,Form,Nav,Navbar,Row,Modal,Table,} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavbar from "../../components/managerNavbar";

const ManageClient = () => {
  // Mock clients data based on the correct schema
  const [clients] = useState([
    {
      NAS_client: "123456789",
      nom_client: "Martin",
      prenom_client: "Sophie",
      rue: "456 Rue Notre-Dame",
      ville: "Montréal",
      code_postal: "H2Y1B6",
      courriel_client: "sophie.martin@example.com",
      date_enregistrement: "2024-01-15"
    },
    {
      NAS_client: "987654321",
      nom_client: "Bouchard",
      prenom_client: "Michel",
      rue: "789 Avenue du Mont-Royal",
      ville: "Montréal",
      code_postal: "H2J1Z7",
      courriel_client: "michel.bouchard@example.com",
      date_enregistrement: "2024-02-10"
    },
    {
      NAS_client: "456789123",
      nom_client: "Tremblay",
      prenom_client: "Claire",
      rue: "123 Boulevard René-Lévesque",
      ville: "Québec",
      code_postal: "G1R5T8",
      courriel_client: "claire.tremblay@example.com",
      date_enregistrement: "2024-03-05"
    },
  ]);

  const [error, setError] = useState("");

  // State for client form
  const [showClientModal, setShowClientModal] = useState(false);
  const [validated, setValidated] = useState(false);

  // Client form data
  const [formData, setFormData] = useState({
    NAS_client: "",
    nom_client: "",
    prenom_client: "",
    rue: "",
    ville: "",
    code_postal: "",
    courriel_client: "",
    motpasse_client: "", // Only for password reset, not displayed in table
    date_enregistrement: ""
  });

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open modal for editing an existing client
  const openEditClientModal = (client) => {
    setFormData({
      NAS_client: client.NAS_client,
      nom_client: client.nom_client,
      prenom_client: client.prenom_client,
      rue: client.rue,
      ville: client.ville,
      code_postal: client.code_postal,
      courriel_client: client.courriel_client,
      motpasse_client: "", // Password field is empty for editing
      date_enregistrement: client.date_enregistrement
    });
    setValidated(false);
    setShowClientModal(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  // Handle form submission (update client)
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Form validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // In a real app, this is where you would update the client data
    alert("Client mis à jour avec succès!");
    setShowClientModal(false);
  };

  // Handle client deletion
  const handleDeleteClient = () => {
    // In a real app, this is where you would delete the client
    alert("Client supprimé avec succès!");
    setShowDeleteModal(false);
  };

  return (
    <div>
      <ManagerNavbar />
      <Container className="py-4">
        {/* Clients Section */}
        <Row className="mb-4">
          <Col>
            <h3 className="text-primary">Liste des Clients</h3>
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
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>NAS</th>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Adresse</th>
                      <th>Courriel</th>
                      <th>Date d'enregistrement</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr key={client.NAS_client}>
                        <td>{client.NAS_client}</td>
                        <td>{client.prenom_client}</td>
                        <td>{client.nom_client}</td>
                        <td>{`${client.rue}, ${client.ville}, ${client.code_postal}`}</td>
                        <td>{client.courriel_client}</td>
                        <td>{new Date(client.date_enregistrement).toLocaleDateString('fr-CA')}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-3"
                            onClick={() => openEditClientModal(client)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(client)}
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

      {/* Client Form Modal */}
      <Modal
        show={showClientModal}
        onHide={() => setShowClientModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Modifier un Client
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationNAS">
                <Form.Label>NAS Client</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="NAS"
                  name="NAS_client"
                  value={formData.NAS_client}
                  readOnly={true}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Prénom"
                  name="prenom_client"
                  value={formData.prenom_client}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez le prénom.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationLastName">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Nom"
                  name="nom_client"
                  value={formData.nom_client}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez le nom.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationAddress">
                <Form.Label>Rue</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Rue"
                  name="rue"
                  value={formData.rue}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez la rue.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCity">
                <Form.Label>Ville</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ville"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez la ville.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationPostalCode">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Code Postal"
                  name="code_postal"
                  pattern="[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]"
                  value={formData.code_postal}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un code postal valide (6 caractères sans espace).
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationEmail">
                <Form.Label>Courriel</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Courriel"
                  name="courriel_client"
                  value={formData.courriel_client}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un courriel valide.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationDate">
                <Form.Label>Date d'enregistrement</Form.Label>
                <Form.Control
                  type="text"
                  name="date_enregistrement"
                  value={new Date(formData.date_enregistrement).toLocaleDateString('fr-CA')}
                  readOnly={true}
                  disabled={true}
                />
                <Form.Text className="text-muted">
                  La date d'enregistrement ne peut pas être modifiée.
                </Form.Text>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationPassword">
                <Form.Label>
                  Nouveau Mot de Passe (laisser vide pour garder l'actuel)
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mot de Passe"
                  name="motpasse_client"
                  value={formData.motpasse_client}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary">
                Mettre à jour
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {clientToDelete && (
            <p>
              Êtes-vous sûr de vouloir supprimer le client{" "}
              <strong>
                {clientToDelete.prenom_client} {clientToDelete.nom_client}
              </strong>
              ? Cette action ne peut pas être annulée.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteClient}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};


export default ManageClient;