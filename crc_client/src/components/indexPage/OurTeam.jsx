// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imágenes de los especialistas
import chris from "../../assets/crc_chris.webp";

export function OurTeam({ kines, loading }) {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "ourteam-mobile-padding"
        : "ourteam-desktop-padding";

    return (
        <Container id="info" className={dynamicPadding}>
            <Row className="text-center mb-4" data-aos="fade-down">
                <Col>
                    <h1 className="fw-bold">
                        Nuestro equipo de CRC Kinesiología
                    </h1>
                    <h5 className="lead pt-2">
                        En CRC Kinesiología, ofrecemos los mejores tratamientos
                        únicos y personalizados para cada paciente. Gracias a la
                        colaboración integrada de profesionales de la salud en
                        kinesiología, nutrición y psicología, garantizamos un
                        enfoque holístico que permite alcanzar los mejores
                        resultados en la región. Nuestro compromiso es brindarte
                        el apoyo necesario para que retomes el control de tu
                        salud y bienestar.
                    </h5>
                </Col>
            </Row>
            <Row data-aos="fade-up">
                {loading ? (
                    <Col className="text-center">
                        <h4>Cargando miembros del equipo...</h4>
                    </Col>
                ) : kines.length > 0 ? (
                    kines.map((member, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="shadow-sm border-0">
                                <Image
                                    src={chris}
                                    className="card-img-top"
                                    alt={member.name}
                                />
                                <Card.Body>
                                    <Card.Title>{member.name}</Card.Title>
                                    <Card.Text>{member.specialty}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <h4>No se encontraron miembros del equipo.</h4>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
