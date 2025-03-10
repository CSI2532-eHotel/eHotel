import { Container, Row, Col } from 'react-bootstrap';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitterX from '../assets/twitter-x.svg';
import youtube from '../assets/youtube.svg';

const Footer = () => {
    return (
        <footer className="bg-primary pt-4 pb-3">
            <Container>
                <Row>
                    <Col>
                        <p className='fs-5'>&copy; 2025 eHotel. Tous droits réservés.</p>
                    </Col>
                    <Col>
                        <div style={{ paddingLeft: "100px" }}>
                            <p>Courriel: <a href="mailto:info@ehotel.com" className="text-black" id='emailFooter'>info@ehotel.com</a></p>
                            <p>Tel: <a href="tel:+123456789" className="text-black" id='phoneFooter'>+1 (435) 567-89</a></p>
                        </div>
                    </Col>
                    <Col className="d-flex flex-column">
                        <div style={{ paddingLeft: "100px" }}>
                            <p className='fs-5 mb-0'>Suivez nous sur</p>
                        </div>
                        <div className='mt-2' style={{ paddingLeft: "175px" }}>
                            <img src={facebook} alt="facebook icon" className="img-fluid ms-3" style={{ width: "25px", height: "25px", cursor: "pointer" }} />
                            <img src={instagram} alt="instagram icon" className="img-fluid ms-3" style={{ width: "25px", height: "25px", cursor: "pointer" }} />
                            <img src={twitterX} alt="twitterX icon" className="img-fluid ms-3" style={{ width: "25px", height: "30px", cursor: "pointer" }} />
                            <img src={youtube} alt="youtube icon" className="img-fluid ms-3" style={{ width: "25px", height: "30px", cursor: "pointer" }} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
