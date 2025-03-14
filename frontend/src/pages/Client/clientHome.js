import {Button,Card,CardText,Col,Container,Form,Nav,Navbar,Row,Badge,Modal,} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios
import logo from "../../assets/logo.png";
import "./clientHome.css";
import image from "../../assets/chambre.jpg";

const ClientHome = () => {
  const [price, setPrice] = useState(0); // State to store the price
  const [viewMode, setViewMode] = useState("zone"); // "zone" or "capacity"
  const [hotelData, setHotelData] = useState([]); // State to store hotel data
  const [groupedHotels, setGroupedHotels] = useState({}); // State to store grouped hotels
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedRoom, setSelectedRoom] = useState(null); // State to store selected room for reservation
  const [reservationData, setReservationData] = useState({
    debut_date: "",
    fin_date: "",
  });
  const [filters, setFilters] = useState({
    montagne: false,
    mer: false,
    extensive: null,
    tv: false,
    sofa: false,
    fridge: false,
    price: 0,
  });
  // States for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reservationId, setReservationId] = useState("");
  // Optional: Add loading and error states for better UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle commodité filter changes
  const handleCommoditeChange = (e) => {
    setFilters({
      ...filters,
      [e.target.id.replace("checkbox", "").toLowerCase()]: e.target.checked,
    });
  };

  // Function to switch view mode
  const switchViewMode = (mode) => {
    setViewMode(mode);
    // Fetch data based on the selected mode
    fetchHotelData(mode);
  };

  // Function to clear all filters
  const clearFilters = () => {
    setFilters({
      montagne: false,
      mer: false,
      extensive: null,
      tv: false,
      sofa: false,
      fridge: false,
      price: 0,
    });
    setPrice(0);
    // Re-fetch data for the current view mode
    fetchHotelData(viewMode);
  };

  // Function to open reservation modal
  const openReservationModal = (room) => {
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

  // Function to generate a random reservation ID
  const generateReservationId = () => {
    // Generate a random 4-digit number starting with 1 (as per your schema)
    return "1" + Math.floor(Math.random() * 900 + 100);
  };

  // Function to submit reservation using axios
  const submitReservation = async () => {
    // Validation
    if (!reservationData.debut_date || !reservationData.fin_date) {
      alert("Veuillez sélectionner les dates de début et de fin.");
      return;
    }

    const startDate = new Date(reservationData.debut_date);
    const endDate = new Date(reservationData.fin_date);
    
    if (startDate >= endDate) {
      alert("La date de fin doit être postérieure à la date de début.");
      return;
    }

    // Get current user's NAS_client (use getClientLoginDetail)
    // For demo purposes, using a hardcoded value
    const userNASClient = "123456789"; // This would come from auth context in a real app

    // Set loading state
    setLoading(true);
    setError(null);

    try {
      // This would be the actual API call to backend using axios
      /* 
      const response = await axios.post('/api/reservations', {
        NAS_client: userNASClient,
        chambre_ID: selectedRoom.chambre_ID,
        debut_date_reservation: reservationData.debut_date,
        fin_date_reservation: reservationData.fin_date
      });
      
      // Use the actual reservation ID from the response
      const newReservationId = response.data.reservation_ID;
      */
      
      // For demo - generate a reservation ID and show success modal
      const newReservationId = generateReservationId();
      
      console.log("Réservation soumise:", {
        reservation_ID: newReservationId,
        NAS_client: userNASClient,
        chambre_ID: selectedRoom.chambre_ID,
        debut_date_reservation: reservationData.debut_date,
        fin_date_reservation: reservationData.fin_date
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReservationId(newReservationId);
      closeReservationModal();
      setShowSuccessModal(true);
    } catch (err) {
      // Handle errors
      console.error("Erreur lors de la réservation:", err);
      setError(err.response?.data?.message || "Erreur lors de la réservation. Veuillez réessayer.");
      alert(err.response?.data?.message || "Erreur lors de la réservation. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch hotel data using axios
  const fetchHotelData = async (mode) => {
    // Set loading state
    setLoading(true);
    setError(null);
    
    try {
      // This would be replaced with actual API calls using axios
      /* 
      let endpoint = '';
      if (mode === 'zone') {
        endpoint = '/api/hotels/by-zone';
      } else if (mode === 'capacity') {
        endpoint = '/api/hotels/by-capacity';
      }

      const response = await axios.get(endpoint);
      const data = response.data;
      setHotelData(data);
      groupHotels(data, mode);
      */

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data for demonstration
      const mockData = [
        {
          hotel_ID: "0001",
          hotel_name: "Hôtel du Centre",
          rue: "123 Rue Principale",
          ville: "Ottawa",
          code_postal: "K1P 1J1",
          vue: "Montagne",
          extensible: true,
          commodite: ["TV", "Sofa", "Fridge"],
          prix: 150,
          capacite: "Simple",
          chambre_ID: "101"
        },
        {
          hotel_ID: "0002",
          hotel_name: "Hôtel Riverside",
          rue: "456 Rue du Pont",
          ville: "Ottawa",
          code_postal: "K1P 2K2",
          vue: "Mer",
          extensible: true,
          commodite: ["TV", "Fridge"],
          prix: 200,
          capacite: "Double",
          chambre_ID: "102"
        },
        {
          hotel_ID: "0003",
          hotel_name: "Hôtel Central",
          rue: "789 Rue Saint-Paul",
          ville: "Toronto",
          code_postal: "M5V 2L6",
          vue: "Mer",
          extensible: false,
          commodite: ["TV", "Sofa"],
          prix: 180,
          capacite: "Simple",
          chambre_ID: "103"
        },
        {
          hotel_ID: "0004",
          hotel_name: "Hôtel Familial",
          rue: "101 Avenue des Pins",
          ville: "Toronto",
          code_postal: "M5V 3L7",
          vue: "Montagne",
          extensible: true,
          commodite: ["TV", "Sofa", "Fridge"],
          prix: 250,
          capacite: "Famille",
          chambre_ID: "104"
        },
        {
          hotel_ID: "0005",
          hotel_name: "Hôtel Economique",
          rue: "202 Boulevard Est",
          ville: "Montreal",
          code_postal: "H2X 1Y6",
          vue: "Montagne",
          extensible: false,
          commodite: ["TV"],
          prix: 120,
          capacite: "Simple",
          chambre_ID: "105"
        },
        {
          hotel_ID: "0006",
          hotel_name: "Hôtel Luxe",
          rue: "303 Avenue de Luxe",
          ville: "Montreal",
          code_postal: "H2X 2Z7",
          vue: "Mer",
          extensible: true,
          commodite: ["TV", "Sofa", "Fridge"],
          prix: 350,
          capacite: "Double",
          chambre_ID: "106"
        },
      ];

      setHotelData(mockData);
      groupHotels(mockData, mode);
    } catch (err) {
      console.error("Error fetching hotel data:", err);
      setError(err.response?.data?.message || "Erreur lors du chargement des données. Veuillez réessayer.");
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
      // Group by capacity
      data.forEach(hotel => {
        if (!grouped[hotel.capacite]) {
          grouped[hotel.capacite] = [];
        }
        grouped[hotel.capacite].push(hotel);
      });
    }
    
    setGroupedHotels(grouped);
  };

  // Filter hotels based on selected criteria
  const filterHotels = () => {
    // Start with all hotels
    let filteredData = [...hotelData];
    
    // Apply filters
    if (filters.montagne) {
      filteredData = filteredData.filter(hotel => hotel.vue === "Montagne");
    }
    
    if (filters.mer) {
      filteredData = filteredData.filter(hotel => hotel.vue === "Mer");
    }
    
    if (filters.extensive !== null) {
      filteredData = filteredData.filter(hotel => hotel.extensible === filters.extensive);
    }
    
    if (filters.tv) {
      filteredData = filteredData.filter(hotel => hotel.commodite.includes("TV"));
    }
    
    if (filters.sofa) {
      filteredData = filteredData.filter(hotel => hotel.commodite.includes("Sofa"));
    }
    
    if (filters.fridge) {
      filteredData = filteredData.filter(hotel => hotel.commodite.includes("Fridge"));
    }
    
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
      <Navbar expand="lg" className="navbar bg-body-tertiary sticky-top pb-3">
        <Container fluid className="custom-container">
          {/* Logo on the left */}
          <Link to="/">
            <img
              src={logo}
              style={{ width: "50px", marginRight: "10px" }}
              id="logo"
              alt="Logo"
            />
          </Link>
          <Navbar.Brand as={Link} to="/" className="capitalize" id="name">
            e-Hotel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Navigation Links */}
            <Nav className="ms-auto py-0 pe-3">
              <Nav.Link
                as={Link}
                to="/"
                className="capitalize"
                id="HomeLink"
                style={{ marginRight: "8px" }}
              >
                Accueil
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/ClientProfile"
                className="capitalize"
                id="ProfileLink"
                style={{ marginRight: "8px" }}
              >
                Profil
              </Nav.Link>
            </Nav>
            {/* Log Out Button */}
            <Button
              as={Link}
              to="/"
              variant="primary"
              className="text-white py-1 px-1 capitalize rounded-2"
              id="loginOutbtn"
            >
              Deconnectez
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
                          left: `calc(${(price / 1000) * 100}% - 10px)`, // Position it relative to the thumb
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

                {/* Commodité */}
                <Row className="align-items-center mt-3">
                  <CardText>Commodité</CardText>
                  <Form className="ms-3">
                    <Form.Check
                      inline
                      label="TV"
                      name="commodite"
                      type="checkbox"
                      id="tvcheckbox"
                      className="custom-checkbox"
                      checked={filters.tv}
                      onChange={handleCommoditeChange}
                    />
                    <Form.Check
                      inline
                      label="Sofa"
                      name="commodite"
                      type="checkbox"
                      id="sofacheckbox"
                      className="custom-checkbox"
                      checked={filters.sofa}
                      onChange={handleCommoditeChange}
                    />
                    <Form.Check
                      inline
                      label="Fridge"
                      name="commodite"
                      type="checkbox"
                      id="fridgecheckbox"
                      className="custom-checkbox"
                      checked={filters.fridge}
                      onChange={handleCommoditeChange}
                    />
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
                    <Col md={3} key={hotel.hotel_ID} className="mb-4">
                      <Card className="h-100 hotel-card">
                        <Card.Body>
                          <Card.Title>{hotel.hotel_name}</Card.Title>
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
                              {hotel.commodite.map((item, idx) => (
                                <Badge key={idx} bg="primary" className="me-1">{item}</Badge>
                              ))}
                            </div>
                          </Card.Text>
                          <Card.Text>
                            <strong>Prix:</strong> ${hotel.prix}/nuit
                          </Card.Text>
                          <Card.Text>
                            <strong>Capacité:</strong> {hotel.capacite}
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Button 
                            variant="primary" 
                            className="w-100"
                            onClick={() => openReservationModal(hotel)}
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
                <h5>{selectedRoom.hotel_name}</h5>
                <p>
                  <strong>Chambre:</strong> {selectedRoom.capacite}
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
              {reservationData.debut_date && reservationData.fin_date && (
                <div className="price-calculation mt-3 p-3 bg-light rounded">
                  <h6>Récapitulatif</h6>
                  <div className="d-flex justify-content-between">
                    <span>Prix par nuit:</span>
                    <span>${selectedRoom.prix}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Nombre de nuits:</span>
                    <span>
                      {Math.ceil(
                        (new Date(reservationData.fin_date) - new Date(reservationData.debut_date)) / 
                        (1000 * 60 * 60 * 24)
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Total:</span>
                    <span>
                      ${selectedRoom.prix * 
                        Math.ceil(
                          (new Date(reservationData.fin_date) - new Date(reservationData.debut_date)) / 
                          (1000 * 60 * 60 * 24)
                        )}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" style={{marginRight:"10px"}} onClick={closeReservationModal}>
            Annuler
          </Button>
          <Button 
            variant="primary" 
            onClick={submitReservation}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Traitement...
              </>
            ) : (
              "Confirmer la réservation"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={closeSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Réservation Confirmée</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-4">
            <span className="text-success" style={{ fontSize: "4rem" }}>
              <i className="bi bi-check-circle-fill"></i>
            </span>
          </div>
          <h5 className="text-center mb-4">Merci de réserver une chambre</h5>
          <div className="alert alert-info">
            <p className="mb-0">
              Présentez votre identifiant de réservation <strong>{reservationId}</strong> à l'hôtel pour transformer votre réservation en une location.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeSuccessModal}>
            Fermer
          </Button>
          <Button 
            variant="outline-primary" 
            as={Link} 
            to="/booking"
          >
            Voir mes réservations
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ClientHome;