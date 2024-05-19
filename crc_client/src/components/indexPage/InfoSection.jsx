// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes locales
import image1 from "../../assets/image_1.png";
import image2 from "../../assets/image_2.png";
import image3 from "../../assets/image_3.png";

export function InfoSection() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleInfo = {
        paddingTop: isMobile ? "60px" : "150px",
    };

    // Padding para movil o navegador
    const dynamicStyleImageWidth = {
        width: isMobile ? "150px" : "150px",
        height: isMobile ? "150px" : "150px",
    };

    // Padding para movil o navegador
    const dynamicStyleCard = {
        minHeight: "350px",
    };

    return (
        <Container style={dynamicStyleInfo} id="info">
            <Row className="text-center" data-aos="fade-down">
                <h1>
                    <strong>Especialidades</strong>
                </h1>
            </Row>
            <Row className="text-center pt-2" data-aos="fade-right">
                <h6>
                    En CRC tratamos a personas con dolor persistente o con
                    cuadros complejos de dolor que no cedieron con los
                    tratamientos o tiempos que esperabas. Es por esto que si te
                    has topado con las siguientes situaciones
                </h6>
            </Row>
            <Row className="text-center pt-2" data-aos="fade-right">
                <h6>
                    Dentro de todos los problemas que podemos trabajar en
                    conjunto, puedes encontrar solución a los siguientes:
                </h6>
            </Row>
            <Row className="text-center">
                <Col md className="pt-5" data-aos="fade-up">
                    <Card style={dynamicStyleCard}>
                        <Card.Img
                            className="rounded mx-auto d-block pt-2"
                            src={image1}
                            style={dynamicStyleImageWidth}
                        />
                        <Card.Body>
                            <Card.Title>
                                <h2>Situación A</h2>
                            </Card.Title>
                            <Card.Text>
                                Haz visitado a muchos profesionales, y no han
                                encontrado la solución de tu dolor
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md className="pt-5" data-aos="fade-up">
                    <Card style={dynamicStyleCard}>
                        <Card.Img
                            className="rounded mx-auto d-block pt-2"
                            src={image2}
                            style={dynamicStyleImageWidth}
                        />
                        <Card.Body>
                            <Card.Title>
                                <h2>Situación B</h2>
                            </Card.Title>
                            <Card.Text>
                                ¿Especialistas te están orillando a que te
                                operes sin darte mayores opciones?
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md className="pt-5" data-aos="fade-up">
                    <Card style={dynamicStyleCard}>
                        <Card.Img
                            className="rounded mx-auto d-block pt-2"
                            src={image3}
                            style={dynamicStyleImageWidth}
                        />
                        <Card.Body>
                            <Card.Title>
                                <h2>Situación C</h2>
                            </Card.Title>
                            <Card.Text>
                                Haces tratamientos, te disminuyen las molestias,
                                pero al tiempo vuelves con el mismo cuadro?
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="text-center pt-5" data-aos="fade-up">
                <h2>¡Entonces déjame decirte, que CRC es para tí!</h2>
                <Col className="pt-2">
                    <Button
                        variant="primary"
                        className="button-href"
                        href="https://www.youtube.com/watch?v=UUpKjjMaww4"
                    >
                        <h6>¡Quiero mi solución ahora!🙌</h6>
                    </Button>
                </Col>
            </Row>
            <Row className="text-center pt-5 fw-bold" data-aos="fade-up">
                <h2>Te dejo más información en este video</h2>
                <iframe
                    width="auto"
                    height="500px"
                    src={`https://www.youtube.com/embed/UUpKjjMaww4`}
                ></iframe>
                <Col className="pt-5">
                    <Button variant="primary">
                        <h6>Súper!! Quiero agendar 😍</h6>
                    </Button>
                </Col>
            </Row>
            <Row className="text-center pt-5" data-aos="fade-rigth">
                <h5 className="pt-2">¡No solo se resume a esto!</h5>
                <h5 className="pt-2">
                    En CRC encontrarás al profesional que necesitas, el que se
                    dedicará en un 100% a tí, para que en conjunto puedan
                    superar esa lesión o cuadro doloroso que estés presentando.
                </h5>
                <h5 className="pt-2">
                    Tendrás si o sí un plan de tratamiento adaptado para tí, tus
                    tiempos y tus implementos, por lo que solo necesitas hacer
                    click aquí para encontrar la solución que buscabas.
                </h5>
                <h2 className="pt-2">Tu solución 👇</h2>
            </Row>
        </Container>
    );
}
