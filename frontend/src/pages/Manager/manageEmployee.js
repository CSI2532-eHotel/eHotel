import React, { useState, useEffect } from "react";
import {Button,Card,Col,Container,Form,Nav,Navbar,Row,Modal,Table,} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavbar from "../../components/managerNavbar";

const ManageEmployee = () => {
  // Mock employees data
  const [employees] = useState([
    {
      NAS_employe: "123456789",
      hotel_ID: "H001",
      prenom_employe: "Jean",
      nom_employe: "Tremblay",
      rue: "123 Rue Principale",
      ville: "Montréal",
      code_postal: "H2X 1Y6",
      role: "Réceptionniste",
      courriel_employee: "jean.tremblay@ehotel.com",
    },
    {
      NAS_employe: "987654321",
      hotel_ID: "H001",
      prenom_employe: "Marie",
      nom_employe: "Dubois",
      rue: "456 Boulevard St-Laurent",
      ville: "Québec",
      code_postal: "G1R 4P3",
      role: "Gestionnaire",
      courriel_employee: "marie.dubois@ehotel.com",
    },
    {
      NAS_employe: "456789123",
      hotel_ID: "H001",
      prenom_employe: "Pierre",
      nom_employe: "Lavoie",
      rue: "789 Avenue du Parc",
      ville: "Laval",
      code_postal: "H7N 2S3",
      role: "Entretien",
      courriel_employee: "pierre.lavoie@ehotel.com",
    },
  ]);

  const hotelId = "H001";
  const [error, setError] = useState("");

  // State for employee form
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);

  // Employee form data
  const [formData, setFormData] = useState({
    NAS_employe: "",
    hotel_ID: hotelId,
    nom_employe: "",
    prenom_employe: "",
    rue: "",
    ville: "",
    code_postal: "",
    role: "",
    courriel_employee: "",
    motpasse_employee: "",
  });

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Open modal for adding a new employee
  const openAddEmployeeModal = () => {
    setFormData({
      NAS_employe: "",
      hotel_ID: hotelId,
      nom_employe: "",
      prenom_employe: "",
      rue: "",
      ville: "",
      code_postal: "",
      role: "",
      courriel_employee: "",
      motpasse_employee: "",
    });
    setIsEditing(false);
    setValidated(false);
    setShowEmployeeModal(true);
  };

  // Open modal for editing an existing employee
  const openEditEmployeeModal = (employee) => {
    setFormData({
      NAS_employe: employee.NAS_employe,
      hotel_ID: employee.hotel_ID,
      nom_employe: employee.nom_employe,
      prenom_employe: employee.prenom_employe,
      rue: employee.rue,
      ville: employee.ville,
      code_postal: employee.code_postal,
      role: employee.role,
      courriel_employee: employee.courriel_employee,
      motpasse_employee: "", // Password field is empty for editing
    });
    setIsEditing(true);
    setValidated(false);
    setShowEmployeeModal(true);
  };

  // Open delete confirmation modal
  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  // Handle form submission (create/update employee)
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    // Form validation
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    // In a real app, this is where you would save the data
    alert(
      isEditing
        ? "Employé mis à jour avec succès!"
        : "Employé ajouté avec succès!"
    );
    setShowEmployeeModal(false);
  };

  // Handle employee deletion
  const handleDeleteEmployee = () => {
    // In a real app, this is where you would delete the employee
    alert("Employé supprimé avec succès!");
    setShowDeleteModal(false);
  };

  return (
    <div>
      <ManagerNavbar />
      <Container className="py-4">
        {/* Employees Section */}
        <Row className="mb-4">
          <Col>
            <h3 className="text-primary">Liste des Employées</h3>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={openAddEmployeeModal}>
              Ajouter un Employée
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
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>NAS</th>
                      <th>Prénom</th>
                      <th>Nom</th>
                      <th>Rôle</th>
                      <th>Adresse</th>
                      <th>Courriel</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.NAS_employe}>
                        <td>{employee.NAS_employe}</td>
                        <td>{employee.prenom_employe}</td>
                        <td>{employee.nom_employe}</td>
                        <td>{employee.role}</td>
                        <td>{`${employee.rue}, ${employee.ville}, ${employee.code_postal}`}</td>
                        <td>{employee.courriel_employee}</td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            className="me-3"
                            onClick={() => openEditEmployeeModal(employee)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteEmployee(employee)}
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

      {/* Employee Form Modal */}
      <Modal
        show={showEmployeeModal}
        onHide={() => setShowEmployeeModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            {isEditing ? "Modifier un Employée" : "Ajouter un Employée"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <div className="alert alert-danger">{error}</div>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationNAS">
                <Form.Label>NAS Employé</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="NAS"
                  pattern="[0-9]{9}"
                  name="NAS_employe"
                  value={formData.NAS_employe}
                  onChange={handleChange}
                  readOnly={isEditing}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un NAS valide (9 chiffres).
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationHotelID">
                <Form.Label>ID Hôtel</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="ID Hôtel"
                  name="hotel_ID"
                  value={formData.hotel_ID}
                  onChange={handleChange}
                  readOnly={true} // Manager can only add employees to their hotel
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez l'ID de l'hôtel.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Prénom"
                  name="prenom_employe"
                  value={formData.prenom_employe}
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
                  name="nom_employe"
                  value={formData.nom_employe}
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
                  pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]"
                  value={formData.code_postal}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un code postal valide (A1A 1A1).
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationRole">
                <Form.Label>Rôle</Form.Label>
                <Form.Select
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="Réceptionniste">Réceptionniste</option>
                  <option value="Gestionnaire">Gestionnaire</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Svp sélectionnez un rôle.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationEmail">
                <Form.Label>Courriel</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Courriel"
                  name="courriel_employee"
                  value={formData.courriel_employee}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un courriel valide.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationPassword">
                <Form.Label>
                  {isEditing
                    ? "Nouveau Mot de Passe (laisser vide pour garder l'actuel)"
                    : "Mot de Passe"}
                </Form.Label>
                <Form.Control
                  required={!isEditing}
                  type="password"
                  placeholder="Mot de Passe"
                  name="motpasse_employee"
                  value={formData.motpasse_employee}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un mot de passe.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary">
                Sauvegarde
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageEmployee;
