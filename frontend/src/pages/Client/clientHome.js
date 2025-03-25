import { Button, Card, CardText, Col, Container, Form, Row, Badge, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./clientHome.css";
import image from "../../assets/chambre.jpg";
import ClientNavbar from "../../components/clientNavbar";
import { toast } from "react-toastify";
import 'bootstrap-icons/font/bootstrap-icons.css';

const ClientHome = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const [viewMode, setViewMode] = useState("zone");
  const [hotelData, setHotelData] = useState([]);
  const [groupedHotels, setGroupedHotels] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationData, setReservationData] = useState({
    debut_date: "",
    fin_date: "",
  });
  const [filters, setFilters] = useState({
    montagne: false,
    mer: false,
    extensive: null,
    stars: {
      one: false,
      two: false,
      three: false,
      four: false,
      five: false
    },
    price: 0,
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationId, setReservationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Handle change of price slider
  const handleChange = (e) => {
    setPrice(e.target.value);
    setFilters({ ...filters, price: parseInt(e.target.value) });
  };

  // Handle filter checkbox changes
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id.replace("Checkbox", "").toLowerCase()]: e.target.checked,
    });
  };

  // Handle extensive filter changes
  const handleExtensiveChange = (e) => {
    if (e.target.id === "extensive-oui") {
      setFilters({ ...filters, extensive: e.target.checked ? true : null });
    } else if (e.target.id === "extensive-non") {
      setFilters({ ...filters, extensive: e.target.checked ? false : null });
    }
  };

  // Handle star rating filter changes
  const handleStarChange = (e) => {
    setFilters({
      ...filters,
      stars: {
        ...filters.stars,
        [e.target.id]: e.target.checked
      }
    });
  };

  // Function to switch view mode
  const switchViewMode = (mode) => {
    setViewMode(mode);
    fetchHotelData(mode);
  };

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      montagne: false,
      mer: false,
      extensive: null,
      stars: {
        one: false,
        two: false,
        three: false,
        four: false,
        five: false
      },
      price: 0,
    });
    setPrice(0);
    fetchHotelData(viewMode);
  };

  // Function to open reservation modal
  const openReservationModal = (room) => {
    // Check if user is logged in
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      toast.error("Veuillez vous connecter pour réserver une chambre");
      navigate("/login");
      return;
    }

    setSelectedRoom(room);
    setShowModal(true);
  };

  // Function to close reservation modal
  const closeReservationModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
    setReservationData({
      debut_date: "",
      fin_date: "",
    });
  };

  // Function to close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // Handle reservation form input changes
  const handleReservationInputChange = (e) => {
    const { name, value } = e.target;
    setReservationData({
      ...reservationData,
      [name]: value,
    });
  };

  // Function to submit reservation using axios
  const submitReservation = async () => {
    // Validation
    if (!reservationData.debut_date || !reservationData.fin_date) {
      toast.error("Veuillez sélectionner les dates de début et de fin.");
      return;
    }

    const startDate = new Date(reservationData.debut_date);
    const endDate = new Date(reservationData.fin_date);

    if (startDate >= endDate) {
      toast.error("La date de fin doit être postérieure à la date de début.");
      return;
    }

    // Get current user's NAS_client from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      toast.error("Session expirée, veuillez vous reconnecter");
      navigate("/login");
      return;
    }

    const userNASClient = userData.nas_client;

    // Set loading state
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/reservations`, {
        NAS_client: userNASClient,
        chambre_ID: selectedRoom.chambre_ID,
        debut_date_reservation: reservationData.debut_date,
        fin_date_reservation: reservationData.fin_date
      });

      // Extract the reservation ID from the response
      console.log("Réponse de la réservation:", response.data);
      console.log("ID de réservation:", response.data.reservation.reservation_id);
      const newReservationId = response.data.reservation.reservation_id;
      console.log("Réservation réussie. ID de réservation:", newReservationId);

      // Set the reservation ID in state to display in the success modal
      setReservationId(newReservationId);

      // Close the reservation modal and show the success modal
      closeReservationModal();
      setShowSuccessModal(true);

      // Refresh data after successful reservation
      fetchHotelData(viewMode);
    } catch (err) {
      console.error("Erreur lors de la réservation:", err);
      const errorMessage = err.response?.data?.message || "Erreur lors de la réservation. Veuillez réessayer.";
      setError(errorMessage);
      toast.error(errorMessage);
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

  // Function to fetch hotel data using axios
  const fetchHotelData = async (mode) => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = '';
      if (mode === 'zone') {
        endpoint = `${API_BASE_URL}/api/rooms/by-zone`;
      } else if (mode === 'capacity') {
        endpoint = `${API_BASE_URL}/api/rooms/by-capacity`;
      }

      const response = await axios.get(endpoint);
      const data = response.data;

      // Format the data to match our expected structure
      const formattedData = data.map(room => {
        // Parse commodite
        const commoditeArray = parseCommodites(room.commodite);

        // Determine extensible boolean value
        const isExtensible = room.extensible === 'oui' || room.extensible === 'Oui';

        return {
          hotel_ID: room.hotel_id,
          hotel_name: room.nom_hotel,
          rue: room.rue,
          ville: room.ville,
          code_postal: room.code_postal,
          vue: room.vue,
          extensible: isExtensible,
          commodite: commoditeArray,
          prix: parseInt(room.prix),
          capacite: room.capacite,
          chambre_ID: room.chambre_id,
          etoile: room.etoile
        };
      });

      setHotelData(formattedData);
      groupHotels(formattedData, mode);
    } catch (err) {
      console.error("Error fetching hotel data:", err);
      setError(err.response?.data?.message || "Erreur lors du chargement des données. Veuillez réessayer.");
      toast.error("Erreur lors du chargement des données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Function to group hotels based on the selected view mode
  const groupHotels = (data, mode) => {
    const grouped = {};

    if (mode === "zone") {
      // Group by city/zone
      data.forEach(hotel => {
        if (!grouped[hotel.ville]) {
          grouped[hotel.ville] = [];
        }
        grouped[hotel.ville].push(hotel);
      });
    } else if (mode === "capacity") {
      // Group by capacity and capitalize first letter
      data.forEach(hotel => {
        // Capitalize the first letter of capacity
        const formattedCapacity = hotel.capacite.charAt(0).toUpperCase() + hotel.capacite.slice(1);

        if (!grouped[formattedCapacity]) {
          grouped[formattedCapacity] = [];
        }
        grouped[formattedCapacity].push({
          ...hotel,
          // Update the display capacity, but keep the original for filtering
          displayCapacity: formattedCapacity
        });
      });
    }

    setGroupedHotels(grouped);
  };

  // Filter hotels based on selected criteria
  const filterHotels = () => {
    // Start with all hotels
    let filteredData = [...hotelData];

    // Apply filters (making vue comparison case-insensitive)
    if (filters.montagne) {
      filteredData = filteredData.filter(hotel =>
        hotel.vue && hotel.vue.toLowerCase() === "montagne"
      );
    }

    if (filters.mer) {
      filteredData = filteredData.filter(hotel =>
        hotel.vue && hotel.vue.toLowerCase() === "mer"
      );
    }

    if (filters.extensive !== null) {
      filteredData = filteredData.filter(hotel => hotel.extensible === filters.extensive);
    }

    // Filter by star rating using the checkboxes
    const selectedStars = [];
    if (filters.stars.one) selectedStars.push(1);
    if (filters.stars.two) selectedStars.push(2);
    if (filters.stars.three) selectedStars.push(3);
    if (filters.stars.four) selectedStars.push(4);
    if (filters.stars.five) selectedStars.push(5);

    // Only apply star filter if at least one star checkbox is selected
    if (selectedStars.length > 0) {
      filteredData = filteredData.filter(hotel =>
        selectedStars.includes(parseInt(hotel.etoile))
      );
    }

    // N'applique pas le filtre de prix si le prix est à 0
    if (filters.price > 0) {
      filteredData = filteredData.filter(hotel => hotel.prix <= filters.price);
    }

    // Re-group filtered data
    groupHotels(filteredData, viewMode);
  };

  // Apply filters when they change
  useEffect(() => {
    if (hotelData.length > 0) {
      filterHotels();
    }
  }, [filters]);

  // Initial data fetch
  useEffect(() => {
    fetchHotelData("zone"); // Default view is by zone
  }, []);

  // Calculate minimum date for reservation (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <ClientNavbar />
      <Container>
        <Row>
          <Col md={5} className="mt-4 mb-5">
            <img
              src={image}
              style={{ width: "100%", height: "100%" }}
              alt="image d'une chambre"
            />
          </Col>
          <Col md={7} className="mt-4 mb-5">
            <Card>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Card.Title>Filtrer par</Card.Title>
                  </Col>
                  <Col md={6} className="d-flex justify-content-end gap-4">
                    <Button
                      as="input"
                      type="submit"
                      value="Par Zone"
                      id="zonebtn"
                      className={`custom-button ${viewMode === "zone" ? "active" : ""}`}
                      onClick={() => switchViewMode("zone")}
                    />
                    <Button
                      as="input"
                      type="submit"
                      value="Par capacité"
                      id="capacitebtn"
                      className={`custom-button ${viewMode === "capacity" ? "active" : ""}`}
                      onClick={() => switchViewMode("capacity")}
                    />
                    <Button
                      as="input"
                      type="submit"
                      value="Effacer Filtre"
                      id="effacerfiltrebtn"
                      className="custom-button"
                      onClick={clearFilters}
                    />
                  </Col>
                </Row>

                {/* Vue */}
                <Row>
                  <CardText>Vue</CardText>
                  <Form style={{ marginLeft: "20px" }}>
                    <div className="mb-3">
                      <Form.Check
                        inline
                        label="Montagne"
                        name="MontagneCheckbox"
                        type="checkbox"
                        id="MontagneCheckbox"
                        className="custom-checkbox"
                        checked={filters.montagne}
                        onChange={handleFilterChange}
                      />
                      <Form.Check
                        inline
                        label="Mer"
                        name="MerCheckbox"
                        type="checkbox"
                        id="MerCheckbox"
                        className="custom-checkbox"
                        checked={filters.mer}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </Form>
                </Row>

                {/* Price Range */}
                <Row className="align-items-center">
                  <CardText>Prix</CardText>
                  <Form
                    className="d-flex align-items-center"
                    style={{ marginLeft: "20px", width: "20rem" }}
                  >
                    <Form.Label className="me-2">$0</Form.Label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <Form.Range
                        min={0}
                        max={1000}
                        value={price}
                        onChange={handleChange}
                        className="custom-range"
                      />
                      {/* Display the price above the thumb */}
                      <span
                        style={{
                          position: "absolute",
                          left: `calc(${(price / 1000) * 100}% - 10px)`,
                          bottom: "25px",
                          fontWeight: "bold",
                          color: "#D1A062",
                          fontSize: "12px",
                          transform: "translateX(-50%)",
                        }}
                      >
                        ${price}
                      </span>
                    </div>
                    <Form.Label className="ms-2">$1000</Form.Label>
                  </Form>
                </Row>

                {/* Extensive */}
                <Row className="align-items-center mt-3">
                  <CardText>Extensive</CardText>
                  <Form className="ms-3">
                    <Form.Check
                      inline
                      label="Oui"
                      name="extensive"
                      type="checkbox"
                      id="extensive-oui"
                      className="custom-checkbox"
                      checked={filters.extensive === true}
                      onChange={handleExtensiveChange}
                    />
                    <Form.Check
                      inline
                      label="Non"
                      name="extensive"
                      type="checkbox"
                      id="extensive-non"
                      className="custom-checkbox"
                      checked={filters.extensive === false}
                      onChange={handleExtensiveChange}
                    />
                  </Form>
                </Row>

                {/* Stars Rating Filter - Modified to use checkboxes */}
                <Row className="align-items-center mt-3">
                  <CardText>Nombre d'Étoiles</CardText>
                  <Form className="ms-3">
                    <div className="d-flex flex-wrap gap-2">
                      <Form.Check
                        inline
                        label="1"
                        name="star-rating"
                        type="checkbox"
                        id="one"
                        className="custom-checkbox"
                        checked={filters.stars.one}
                        onChange={handleStarChange}
                      />
                      <Form.Check
                        inline
                        label="2"
                        name="star-rating"
                        type="checkbox"
                        id="two"
                        className="custom-checkbox"
                        checked={filters.stars.two}
                        onChange={handleStarChange}
                      />
                      <Form.Check
                        inline
                        label="3"
                        name="star-rating"
                        type="checkbox"
                        id="three"
                        className="custom-checkbox"
                        checked={filters.stars.three}
                        onChange={handleStarChange}
                      />
                      <Form.Check
                        inline
                        label="4"
                        name="star-rating"
                        type="checkbox"
                        id="four"
                        className="custom-checkbox"
                        checked={filters.stars.four}
                        onChange={handleStarChange}
                      />
                      <Form.Check
                        inline
                        label="5"
                        name="star-rating"
                        type="checkbox"
                        id="five"
                        className="custom-checkbox"
                        checked={filters.stars.five}
                        onChange={handleStarChange}
                      />
                    </div>
                  </Form>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Hotel Display Section */}
        <div className="hotel-results mt-4 mb-5">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Chargement des hôtels...</p>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          ) : Object.keys(groupedHotels).length > 0 ? (
            Object.keys(groupedHotels).map((group, index) => (
              <div key={index} className="group-section mb-5">
                <h2 className="group-heading mb-4">{group}</h2>
                <Row>
                  {groupedHotels[group].map((hotel) => (
                    <Col md={4} key={hotel.chambre_ID} className="mb-4">
                      <Card className="h-100 hotel-card">
                        <Card.Body>
                          <Card.Title className="d-flex align-items-center">
                            {hotel.hotel_name}
                            <div className="ms-1">
                              {Array.from({ length: parseInt(hotel.etoile) || 0 }).map((_, i) => (
                                <i key={i} className="bi bi-star-fill" style={{ color: "#D1A062" }}></i>
                              ))}
                            </div>
                          </Card.Title>
                          <Card.Text>
                            <strong>Adresse:</strong> {hotel.rue}, {hotel.ville}, {hotel.code_postal}
                          </Card.Text>
                          <Card.Text>
                            <strong>Vue:</strong> {hotel.vue}
                          </Card.Text>
                          <Card.Text>
                            <strong>Extensive:</strong> {hotel.extensible ? "Oui" : "Non"}
                          </Card.Text>
                          <Card.Text>
                            <strong>Commodités:</strong>
                            <div className="d-flex flex-wrap gap-1 mt-1">
                              {hotel.commodite && hotel.commodite.map((item, idx) => (
                                <Badge key={idx} bg="primary" style={{ backgroundColor: "#D1A062" }} className="me-1">
                                  {item.trim()}
                                </Badge>
                              ))}
                            </div>
                          </Card.Text>
                          <Card.Text>
                            <strong>Prix:</strong> ${hotel.prix}/nuit
                          </Card.Text>
                          <Card.Text>
                            <strong>Capacité:</strong> {viewMode === "capacity" && hotel.displayCapacity
                              ? hotel.displayCapacity
                              : hotel.capacite.charAt(0).toUpperCase() + hotel.capacite.slice(1)}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            variant="primary"
                            className="w-100"
                            onClick={() => openReservationModal(hotel)}
                            style={{ backgroundColor: "#D1A062", borderColor: "#D1A062" }}
                          >
                            Réserver
                          </Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))
          ) : (
            <div className="text-center py-5">
              <h3>Aucun hôtel trouvé correspondant à vos critères</h3>
              <p>Veuillez ajuster vos filtres ou définir un prix supérieur à 0$.</p>
            </div>
          )}
        </div>
      </Container>

      {/* Reservation Modal */}
      <Modal show={showModal} onHide={closeReservationModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Réserver une chambre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRoom && (
            <>
              <div className="mb-4">
                <h5>
                  {selectedRoom.hotel_name}
                  <span className="ms-2">
                    {Array.from({ length: parseInt(selectedRoom.etoile) || 0 }).map((_, i) => (
                      <i key={i} className="bi bi-star-fill" style={{ color: "#D1A062" }}></i>
                    ))}
                  </span>
                </h5>
                <p>
                  <strong>Chambre:</strong> {selectedRoom.capacite.charAt(0).toUpperCase() + selectedRoom.capacite.slice(1)}
                  <br />
                  <strong>Prix:</strong> ${selectedRoom.prix} par nuit
                  <br />
                  <strong>Vue:</strong> {selectedRoom.vue}
                </p>
              </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Début_date</Form.Label>
                  <Form.Control
                    type="date"
                    name="debut_date"
                    value={reservationData.debut_date}
                    onChange={handleReservationInputChange}
                    min={today}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fin_date</Form.Label>
                  <Form.Control
                    type="date"
                    name="fin_date"
                    value={reservationData.fin_date}
                    onChange={handleReservationInputChange}
                    min={reservationData.debut_date || today}
                    required
                  />
                </Form.Group>
              </Form>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={submitReservation}
            disabled={loading}
            style={{ backgroundColor: "#D1A062", borderColor: "#D1A062" }}
          >
            {loading ? 'Traitement en cours...' : 'Confirmer la réservation'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={closeSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Réservation confirmée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "3rem" }}></i>
            <h4 className="mt-3">Votre réservation a été confirmée!</h4>
            <p className="mt-3">Numéro de réservation: <strong>{reservationId}</strong></p>
            <p>Vous pouvez consulter les détails de votre réservation dans votre espace client.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={closeSuccessModal}
            style={{ backgroundColor: "#D1A062", borderColor: "#D1A062" }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientHome;