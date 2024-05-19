// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes locales
import image1 from "../../assets/home_image.jpg";

export function HomeSection() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleHome = {
        paddingTop: isMobile ? "60px" : "150px",
    };
    const dynamicStyle = {
        paddingTop: isMobile ? "20px" : "0px",
    };

    return (
        <Container>
            <Row id="home" style={dynamicStyleHome}>
                <Col
                    className="text-center align-items-center"
                    data-aos="fade-right"
                >
                    <Row className="pt-4">
                        <h1 className="fw-bold">¿Estás con dolor?</h1>
                    </Row>
                    <Row className="pt-4">
                        <h5>
                            Ten calma, sabemos que esta condición es
                            completamente incómoda, frustrante y que te está
                            alejando de tus actividades. ¡¡Afortunadamente
                            encontraste tu solución!!
                        </h5>
                        <h5>
                            En CRC Kinesiología crearemos en conjunto un plan de
                            tratamiento totalmente especializado para que
                            retomes el control de tu vida.
                        </h5>
                    </Row>
                    <Row className="pt-4">
                        <Col>
                            <Button variant="primary" data-aos="fade-right">
                                <h6>¡Quiero mi solución ahora!</h6>
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col
                    className="text-center align-items-center"
                    data-aos="fade-right"
                >
                    {!isMobile ? (
                        <Image src={image1} width="600px" />
                    ) : (
                        <Image
                            src={image1}
                            width="300px"
                            style={dynamicStyle}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
