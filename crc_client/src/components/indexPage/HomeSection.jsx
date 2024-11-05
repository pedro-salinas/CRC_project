// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Router
import { Link } from "react-router-dom";

// Imagenes
import chris from "../../assets/crc_chris.webp";

export function HomeSection({}) {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "home-mobile-padding align-items-center"
        : "home-desktop-padding align-items-center";

    // const dynamicFontSize = isMobile ? "home-mobile-font" : "home-desktop-font";

    return (
        <Container>
            <Row id="home" className={dynamicPadding}>
                <Col md={6} className="text-center " data-aos="fade-right">
                    <h1 className="fw-bold ">
                        <strong>¿Necesitas ayuda?</strong>
                    </h1>
                    <h5 className="lead pt-2 lead">
                        Ten calma, sabemos que esta condición es completamente
                        incómoda, frustrante y que te está alejando de tus
                        actividades. ¡¡Afortunadamente encontraste tu solución!!
                    </h5>
                    <p className="lead pt-2">
                        En CRC Kinesiología crearemos en conjunto un plan de
                        tratamiento totalmente especializado para que retomes el
                        control de tu vida.
                    </p>
                    <Link to="/attention">
                        <Button variant="primary" size="lg">
                            Agendar aquí
                        </Button>
                    </Link>
                </Col>
                <Col md={6} className="text-center" data-aos="fade-left">
                    {!isMobile ? (
                        <Image src={chris} width="450px" />
                    ) : (
                        <Image src={chris} width="250px" />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
