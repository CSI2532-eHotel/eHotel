import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Nav, Navbar, Row, Modal, Table, } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ManagerNavbar from "../../components/managerNavbar";

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Récupérer les données du gestionnaire connecté depuis localStorage
  const employeeData = JSON.parse(localStorage.getItem("userData"));
  const hotelId = employeeData ? employeeData.hotel_id : null;

  // State pour le modal de formulaire d'employé
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);

  // Données du formulaire employé
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

  // State pour le modal de confirmation de suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Charger les employés depuis le backend
  useEffect(() => {
    const fetchEmployees = async () => {
      if (!hotelId) {
        setLoading(false);
        setError("L'ID de l'hôtel n'est pas disponible. Veuillez vous reconnecter.");
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees/${hotelId}`);
        const modifiedData = response.data.map((employee) => ({
          ...employee,
          NAS_employe: String(employee.nas_employe),
        }));
        setEmployees(modifiedData);
        setError("");
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Erreur lors du chargement des employés: " + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [hotelId]);

  // Gérer les changements d'entrée de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Ouvrir le modal pour ajouter un nouvel employé
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

  // Ouvrir le modal pour modifier un employé existant
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
      motpasse_employee: "", // Le champ mot de passe est vide pour l'édition
    });
    setIsEditing(true);
    setValidated(false);
    setShowEmployeeModal(true);
  };

  // Ouvrir le modal de confirmation de suppression
  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteModal(true);
  };

  // Gérer la soumission du formulaire (créer/mettre à jour l'employé)
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
        // Mise à jour d'un employé existant
        await axios.put(`${process.env.REACT_APP_API_URL}/api/employee/${formData.NAS_employe}`, formData);
        // Mettre à jour l'employé dans la liste locale
        setEmployees(employees.map(emp =>
          emp.NAS_employe === formData.NAS_employe ? { ...formData } : emp
        ));

        alert("Employé mis à jour avec succès!");
      } else {
        // Création d'un nouvel employé
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/employee`, formData);
        // convertir le NAS_employe qui est un nombre en string
        const newEmployee = {
          ...response.data,
          NAS_employe: String(response.data.nas_employe || response.data.NAS_employe)
        };
        // Ajouter le nouvel employé à la liste locale
        setEmployees([...employees, newEmployee]);

        alert("Employé ajouté avec succès!");
      }

      setShowEmployeeModal(false);
    } catch (err) {
      setError("Erreur lors de l'enregistrement: " + (err.response?.data?.error || err.message));
    }
  };
  // Gérer la suppression d'un employé
  const handleDeleteEmployee = async () => {
    if (!employeeToDelete) return;

    try {
      // Suppression d'un employé
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/employee/${employeeToDelete.NAS_employe}`);

      // Supprimer l'employé de la liste locale
      setEmployees(employees.filter(emp => emp.NAS_employe !== employeeToDelete.NAS_employe));

      alert("Employé supprimé avec succès!");
      setShowDeleteModal(false);
    } catch (err) {
      setError("Erreur lors de la suppression: " + (err.response?.data?.error || err.message));
      setShowDeleteModal(false);
    }
  };
  return (
    <div>
      <ManagerNavbar />
      <Container className="py-4">
        {/* Section des employés */}
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
                {loading ? (
                  <p>Chargement des données...</p>
                ) : (
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
                      {employees.length > 0 ? (
                        employees.map((employee) => (
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
                                onClick={() => openDeleteModal(employee)}
                              >
                                Supprimer
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            Aucun employé trouvé pour cet hôtel
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

      {/* Modal du formulaire employé */}
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
                  placeholder={hotelId}
                  name="hotel_ID"
                  value={formData.hotel_ID}
                  onChange={handleChange}
                  readOnly={true} // Le gestionnaire ne peut ajouter des employés qu'à son hôtel
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
                  pattern="[A-Za-z][0-9][A-Za-z][0-9][A-Za-z][0-9]"
                  value={formData.code_postal}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un code postal valide (A1A1A1).
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
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  required={!isEditing}
                  type="password"
                  placeholder={isEditing ? "Laisser vide pour conserver le mot de passe actuel" : "Mot de passe"}
                  name="motpasse_employee"
                  value={formData.motpasse_employee}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Svp entrez un mot de passe.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary">
                {isEditing ? "Mettre à jour" : "Ajouter"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal de confirmation de suppression */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirmer la suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr de vouloir supprimer l'employé {employeeToDelete?.prenom_employe} {employeeToDelete?.nom_employe}?
          Cette action est irréversible.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteEmployee}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageEmployee;