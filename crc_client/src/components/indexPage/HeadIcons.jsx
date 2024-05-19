// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Bootstrap icons
import { Telephone, Whatsapp, GeoAlt } from "react-bootstrap-icons";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

export function HeadIcons() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyle = {
        paddingTop: isMobile ? "80px" : "150px",
    };

    return (
        <Container style={dynamicStyle} data-aos="fade-down">
            <Row>
                <Col>
                    <Row className="text-center align-items-center">
                        <Telephone size={60} color="#31B6AD" />
                        <Col>
                            <div className="p-2 text-center">
                                <h4 className="p-2 fw-bold">Mesa central</h4>
                            </div>
                            <div className="p-2  text-center">
                                <h5>+56 9 6614 0265</h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="text-center align-items-center">
                        <Whatsapp size={60} color="#31B6AD" />
                        <Col>
                            <div className="p-2 text-center">
                                <h4 className="p-2 fw-bold">Reservas</h4>
                            </div>
                            <div className="p-2 text-center">
                                <h5>+56 9 6614 0265</h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="text-center align-items-center">
                        <GeoAlt size={60} color="#31B6AD" className="" />
                        <Col>
                            <div className="p-2 text-center">
                                <h4 className="p-2 fw-bold">Ubicación</h4>
                            </div>
                            <div className="p-2 text-center">
                                <h5>
                                    2 Sur 2 Oriente #870 Edificio Espacio Talca,
                                    Oficina 1120
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
