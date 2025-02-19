
import { Container, Row, Col } from 'react-bootstrap';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitterX from '../assets/twitter-x.svg';
import youtube from '../assets/youtube.svg';

const footer = () => {
    return (
        <footer className="bg-primary mt-4 pt-4 pb-3">
            <Container>
                <Row>
                    <Col className="">
                        <p className='fs-5'>&copy; 2024 Paradise Hotel. All rights reserved.</p>
                    </Col>
                    <Col>
                        <div style={{ paddingLeft: "100px" }}>
                            <p>Email: <a href="mailto:info@paradisehotel.com" className="text-black" id='emailFooter'>info@paradisehotel.com</a></p>
                            <p>Tel: <a href="+123456789" className="text-black" id='phoneFooter'>+1 (234) 567-89</a>
                            </p>
                        </div>
                    </Col>
                    <Col className="d-flex flex-column">
                        <div style={{ paddingLeft: "100px" }}>
                            <p className='fs-5 mb-0'>Follow us on:</p>
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
        </footer >
    );
};

export default footer;
