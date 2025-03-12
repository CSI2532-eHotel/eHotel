import {
  Button,
  Card,
  CardText,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Badge,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./clientHome.css";
import image from "../assets/chambre.jpg";

const ClientHome = () => {
  const [price, setPrice] = useState(0); // State to store the price
  const [viewMode, setViewMode] = useState("zone"); // "zone" or "capacity"
  const [hotelData, setHotelData] = useState([]); // State to store hotel data
  const [groupedHotels, setGroupedHotels] = useState({}); // State to store grouped hotels
  const [filters, setFilters] = useState({
    montagne: false,
    mer: false,
    extensive: null,
    tv: false,
    sofa: false,
    fridge: false,
    price: 0,
  });

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

  // Mock function to fetch hotel data (replace with actual API calls later)
  const fetchHotelData = (mode) => {
    // This would be replaced with actual API calls to your backend
    // For now, using mock data
    
    /* 
    // Actual API call would look something like this:
    let endpoint = '';
    if (mode === 'zone') {
      endpoint = '/api/hotels/by-zone';
    } else if (mode === 'capacity') {
      endpoint = '/api/hotels/by-capacity';
    }

    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setHotelData(data);
        groupHotels(data, mode);
      })
      .catch(error => console.error('Error fetching hotel data:', error));
    */

    // Mock data for demonstration
    const mockData = [
      {
        hotel_id: 1,
        hotel_name: "Hôtel du Centre",
        rue: "123 Rue Principale",
        ville: "Ottawa",
        code_postal: "K1P 1J1",
        vue: "Montagne",
        extensive: true,
        commodite: ["TV", "Sofa", "Fridge"],
        prix: 150,
        capacite: "Simple"
      },
      {
        hotel_id: 2,
        hotel_name: "Hôtel Riverside",
        rue: "456 Rue du Pont",
        ville: "Ottawa",
        code_postal: "K1P 2K2",
        vue: "Mer",
        extensive: true,
        commodite: ["TV", "Fridge"],
        prix: 200,
        capacite: "Double"
      },
      {
        hotel_id: 3,
        hotel_name: "Hôtel Central",
        rue: "789 Rue Saint-Paul",
        ville: "Toronto",
        code_postal: "M5V 2L6",
        vue: "Mer",
        extensive: false,
        commodite: ["TV", "Sofa"],
        prix: 180,
        capacite: "Simple"
      },
      {
        hotel_id: 4,
        hotel_name: "Hôtel Familial",
        rue: "101 Avenue des Pins",
        ville: "Toronto",
        code_postal: "M5V 3L7",
        vue: "Montagne",
        extensive: true,
        commodite: ["TV", "Sofa", "Fridge"],
        prix: 250,
        capacite: "Famille"
      },
      {
        hotel_id: 5,
        hotel_name: "Hôtel Economique",
        rue: "202 Boulevard Est",
        ville: "Montreal",
        code_postal: "H2X 1Y6",
        vue: "Montagne",
        extensive: false,
        commodite: ["TV"],
        prix: 120,
        capacite: "Simple"
      },
      {
        hotel_id: 6,
        hotel_name: "Hôtel Luxe",
        rue: "303 Avenue de Luxe",
        ville: "Montreal",
        code_postal: "H2X 2Z7",
        vue: "Mer",
        extensive: true,
        commodite: ["TV", "Sofa", "Fridge"],
        prix: 350,
        capacite: "Double"
      },
    ];

    setHotelData(mockData);
    groupHotels(mockData, mode);
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
      filteredData = filteredData.filter(hotel => hotel.extensive === filters.extensive);
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
                to="/profile"
                className="capitalize"
                id="ProfileLink"
                style={{ marginRight: "8px" }}
              >
                Profile
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
          {Object.keys(groupedHotels).length > 0 ? (
            Object.keys(groupedHotels).map((group, index) => (
              <div key={index} className="group-section mb-5">
                <h2 className="group-heading mb-4">{group}</h2>
                <Row>
                  {groupedHotels[group].map((hotel) => (
                    <Col md={4} key={hotel.hotel_id} className="mb-4">
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
                            <strong>Extensive:</strong> {hotel.extensive ? "Oui" : "Non"}
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
                          <Button variant="primary" className="w-100">Réserver</Button>
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
    </div>
  );
};

export default ClientHome;