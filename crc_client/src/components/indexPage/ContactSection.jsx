// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

// Bootstrap icons
import {
    Clock,
    GeoAlt,
    EnvelopeAt,
    Phone,
    CreditCard,
} from "react-bootstrap-icons";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes
import image1 from "../../assets/contact.webp";
import image2 from "../../assets/pagos.webp";

export function ContactSection() {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "contact-mobile-padding"
        : "contact-desktop-padding";

    const dynamicFont = isMobile
        ? "contact-mobile-font"
        : "contact-desktop-font";

    return (
        <Container id="contact" className={dynamicPadding}>
            <Row className="text-center" data-aos="fade-down">
                <h1 className={`fw-bold ${dynamicFont}`}>Contacto</h1>
            </Row>
            <Row data-aos="fade-down">
                <Col className="p-5">
                    <Row className="p-3">
                        <Col md={2} className="d-flex align-items-center">
                            <Clock size={35} color="#31B6AD" />
                        </Col>
                        <Col md={10}>
                            <Row>
                                <h3>Horario de atención:</h3>
                            </Row>
                            <Row>
                                <h6>De Lunes a Viernes de 08:00 a 20:00</h6>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-3">
                        <Col md={2} className="d-flex align-items-center">
                            <GeoAlt size={35} color="#31B6AD" />
                        </Col>
                        <Col md={10}>
                            <Row>
                                <h3>Dirección:</h3>
                            </Row>
                            <Row>
                                <h6>
                                    1 Poniente 1258, entre 2 y 3 Norte, piso 7
                                    oficina 711, Talca
                                </h6>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-3">
                        <Col md={2} className="d-flex align-items-center">
                            <EnvelopeAt size={35} color="#31B6AD" />
                        </Col>
                        <Col md={10}>
                            <Row>
                                <h3>Correo:</h3>
                            </Row>
                            <Row>
                                <h6>contacto@crckinesiologia.cl</h6>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-3">
                        <Col md={2} className="d-flex align-items-center">
                            <Phone size={35} color="#31B6AD" />
                        </Col>
                        <Col md={10}>
                            <Row>
                                <h3>Teléfono:</h3>
                            </Row>
                            <Row>
                                <h6>+56 9 66140265</h6>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="p-3">
                        <Col md={2} className="d-flex align-items-center">
                            <CreditCard size={35} color="#31B6AD" />
                        </Col>
                        <Col md={10}>
                            <Row>
                                <h3>Formas de pago:</h3>
                            </Row>
                            <Image src={image2} width="200px" />
                            <Row>
                                <h6>
                                    Tarjeta de débito, tarjeta de crédito en 3
                                    cuotas sin interés, transferencia o efectivo
                                </h6>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className="p-5 text-center">
                    {!isMobile ? (
                        <Image src={image1} width="400px" />
                    ) : (
                        <Image src={image1} width="250px" />
                    )}
                </Col>
            </Row>
            <Row className="text-center" data-aos="fade-down">
                <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d812.7650592291094!2d-71.66542186434249!3d-35.42853780203311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6a11de5e409%3A0x3442ddff66705722!2sAv.%20Dos%20Sur%20890%2C%20Talca%2C%20Maule!5e0!3m2!1ses!2scl!4v1676962521374!5m2!1ses!2scl`}
                    width="600"
                    height="450"
                ></iframe>
            </Row>
        </Container>
    );
}
