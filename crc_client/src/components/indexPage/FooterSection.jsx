// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Bootstrap icons
import { Facebook, Instagram } from "react-bootstrap-icons";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

export function FooterSection() {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "footer-mobile-padding"
        : "footer-desktop-padding";

    return (
        <Container className={dynamicPadding}>
            <Row className="pb-4 text-center" data-aos="fade-down">
                <Col>
                    <Row>
                        <h2 className="fw-bold">CRC KINESIOLOGÍA</h2>
                    </Row>
                    <Row>
                        <h6>2 Sur 2 Oriente #870</h6>
                    </Row>
                    <Row>
                        <h6>Piso 11 oficina #1120</h6>
                    </Row>
                    <Row>
                        <h6>Talca</h6>
                    </Row>
                    <Row>
                        <h6>
                            <strong>Telefono:</strong> +56 9 66140265
                        </h6>
                    </Row>
                    <Row>
                        <h6>
                            <strong>Correo:</strong> contacto@crckinesiologia.cl
                        </h6>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <h2 className="fw-bold">NUESTRAS REDES SOCIALES</h2>
                    </Row>
                    <Row>
                        <Col className="text-end">
                            <a href="https://www.facebook.com/crckinesiologia/">
                                <Facebook size={35} color="#31B6AD" />
                            </a>
                        </Col>
                        <Col className="text-start">
                            <a href="https://www.instagram.com/crckinesiologia/">
                                <Instagram size={35} color="#31B6AD" />
                            </a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
