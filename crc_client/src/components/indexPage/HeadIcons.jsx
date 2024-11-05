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

    // CSS movil
    const dynamicPadding = isMobile
        ? "head-icons-mobile-padding"
        : "head-icons-desktop-padding";

    const dynamicFontSize = isMobile
        ? "head-icons-mobile-font"
        : "head-icons-desktop-font";

    return (
        <Container>
            <Row
                data-aos="fade-down"
                id="head-icons"
                className={dynamicPadding}
            >
                <Col>
                    <Row className="text-center align-items-center">
                        <Telephone size={45} color="#31B6AD" />
                        <Col>
                            <div>
                                <h4
                                    className={`p-2 fw-bold ${dynamicFontSize}`}
                                >
                                    Mesa central
                                </h4>
                            </div>
                            <div>
                                <h5 className={`p-2 ${dynamicFontSize}`}>
                                    +56 9 6614 0265
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="text-center align-items-center">
                        <Whatsapp size={45} color="#31B6AD" />
                        <Col>
                            <div>
                                <h4
                                    className={`p-2 fw-bold ${dynamicFontSize}`}
                                >
                                    Reservas
                                </h4>
                            </div>
                            <div>
                                <h5 className={`p-2 ${dynamicFontSize}`}>
                                    +56 9 6614 0265
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="text-center align-items-center">
                        <GeoAlt size={45} color="#31B6AD" className="" />
                        <Col>
                            <div>
                                <h4
                                    className={`p-2 fw-bold ${dynamicFontSize}`}
                                >
                                    Ubicación
                                </h4>
                            </div>
                            <div>
                                <h5 className={`p-2 ${dynamicFontSize}`}>
                                    1 Poniente 2 y 3 Norte 1258, piso 7 oficina
                                    711, Talca
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
