import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row, Modal, Table } from "react-bootstrap";
import axios from "axios";
import ManagerNavbar from "../../components/managerNavbar";

const ManageClient = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  // Get manager data from localStorage
  const employeeData = JSON.parse(localStorage.getItem("userData"));
  const hotelId = employeeData ? employeeData.hotel_id : null;

  // State for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // State for clients with their reservation and location information
  const [clientsWithDetails, setClientsWithDetails] = useState([]);

  // Load clients for the hotel and add reservation and location information
  useEffect(() => {
    const fetchClients = async () => {
      if (!hotelId) {
        setLoading(false);
        setError("L'ID de l'hôtel n'est pas disponible. Veuillez vous reconnecter.");
        return;
      }
      try {
        // Fetch basic client information
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/clients/${hotelId}`);
        
        // Format the NAS_client as string
        const formattedClients = response.data.map(client => ({
          ...client,
          NAS_client: String(client.nas_client || client.NAS_client)
        }));
        
        setClients(formattedClients);
        
        // Get detailed information for each client
        const clientsWithDetailsArray = await Promise.all(
          formattedClients.map(async (client) => {
            try {
              // Fetch client's reservations
              const resResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${client.NAS_client}/reservations`);
              const sortedReservations = resResponse.data.sort((a, b) => 
                new Date(b.debut_date_reservation) - new Date(a.debut_date_reservation)
              );
              
              // Fetch client's locations/stays
              const locResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/client/${client.NAS_client}/locations`);
              const sortedLocations = locResponse.data.sort((a, b) => 
                new Date(b.debut_date_location) - new Date(a.debut_date_location)
              );
              
              return {
                ...client,
                reservations: sortedReservations,
                locations: sortedLocations
              };
            } catch (err) {
              console.error(`Error fetching details for client ${client.NAS_client}:`, err);
              return {
                ...client,
                reservations: [],
                locations: []
              };
            }
          })
        );
        
        setClientsWithDetails(clientsWithDetailsArray);
        setError("");
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError("Erreur lors du chargement des clients: " + (err.response?.data?.error || err.message));
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [hotelId]);

  // Open delete confirmation modal
  const openDeleteModal = (client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
  };

  // Handle client deletion
  const handleDeleteClient = async () => {
    if (!clientToDelete) return;

    try {
      // Delete the client
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/client/${clientToDelete.NAS_client}`);

      // Remove client from both local lists
      setClients(clients.filter(client => client.NAS_client !== clientToDelete.NAS_client));
      setClientsWithDetails(clientsWithDetails.filter(client => client.NAS_client !== clientToDelete.NAS_client));

      alert("Client supprimé avec succès!");
      setShowDeleteModal(false);
    } catch (err) {
      setError("Erreur lors de la suppression: " + (err.response?.data?.error || err.message));
      setShowDeleteModal(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-CA');
  };

  return (
    <div>
      <ManagerNavbar />
      <Container className="py-4">
        {/* Clients Section */}
        <Row className="mb-2">
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
                {loading ? (
                  <p>Chargement des données...</p>
                ) : (
                  <Table responsive striped hover>
                    <tbody>
                      {clientsWithDetails.length > 0 ? (
                        clientsWithDetails.map((client) => (
                          <React.Fragment key={client.NAS_client}>
                            {/* Row 1: Client Information */}
                            <tr className="bg-light">
                              <td colSpan="6">
                                <div className="d-flex justify-content-between align-items-center">
                                  <strong>Client: {client.prenom_client} {client.nom_client} (NAS: {client.NAS_client})</strong>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => openDeleteModal(client)}
                                  >
                                    Supprimer
                                  </Button>
                                </div>
                                <div>
                                  <small>
                                    <strong>Adresse:</strong> {`${client.rue}, ${client.ville}, ${client.code_postal}`} |
                                    <strong> Courriel:</strong> {client.courriel_client} |
                                    <strong> Date d'enregistrement:</strong> {formatDate(client.date_enregistrement)}
                                  </small>
                                </div>
                              </td>
                            </tr>
                            
                            {/* Row 2: Reservations */}
                            <tr>
                              <td colSpan="6">
                                <div className="px-2">
                                  <h6 className="mb-2 text-primary ">Réservations</h6>
                                  {client.reservations && client.reservations.length > 0 ? (
                                    <Table responsive borderless size="sm" className="mb-2">
                                      <thead>
                                        <tr className="text-muted">
                                          <th>ID Réservation</th>
                                          <th>Date de début</th>
                                          <th>Date de fin</th>
                                          <th>ID Chambre</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {client.reservations.map(reservation => (
                                          <tr key={reservation.reservation_id}>
                                            <td>{reservation.reservation_id}</td>
                                            <td>{formatDate(reservation.debut_date_reservation)}</td>
                                            <td>{formatDate(reservation.fin_date_reservation)}</td>
                                            <td>{reservation.chambre_id}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  ) : (
                                    <p className="text-muted small">Aucune réservation pour ce client</p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            
                            {/* Row 3: Locations/Stays */}
                            <tr>
                              <td colSpan="6">
                                <div className="px-2 mb-4">
                                  <h6 className="mb-2 text-primary ">Séjours</h6>
                                  {client.locations && client.locations.length > 0 ? (
                                    <Table responsive borderless size="sm">
                                      <thead>
                                        <tr className="text-muted">
                                          <th>ID Location</th>
                                          <th>Date de début</th>
                                          <th>Date de fin</th>
                                          <th>Montant</th>
                                          <th>ID Chambre</th>
                                          <th>ID Réservation</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {client.locations.map(location => (
                                          <tr key={location.location_id}>
                                            <td>{location.location_id}</td>
                                            <td>{formatDate(location.debut_date_location)}</td>
                                            <td>{formatDate(location.fin_date_location)}</td>
                                            <td>$ {location.montant}</td>
                                            <td>{location.chambre_id}</td>
                                            <td>{location.reservation_id || 'N/A'}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  ) : (
                                    <p className="text-muted small">Aucun séjour pour ce client</p>
                                  )}
                                </div>
                              </td>
                            </tr>
                            
                            {/* Separator between clients */}
                            <tr>
                              <td colSpan="6" className="p-0">
                                <hr className="my-0" />
                              </td>
                            </tr>
                          </React.Fragment>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">
                            Aucun client trouvé pour cet hôtel
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