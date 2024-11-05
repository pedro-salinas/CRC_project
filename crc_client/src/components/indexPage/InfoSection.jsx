// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Bootstrap icons
import { StarFill } from "react-bootstrap-icons";

// Estilos
import "./Info.css";

export function InfoSection() {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "ourteam-mobile-padding"
        : "ourteam-desktop-padding";

    return (
        <Container id="info" className={dynamicPadding}>
            <Row className="text-center" data-aos="fade-down">
                <h1 className="fw-bold">
                    ¿Cansado de Tratamientos Ineficaces? Descubre una Evaluación
                    Personalizada para tus problemas{" "}
                </h1>
            </Row>
            <Row className="align-items-center" data-aos="fade-down">
                <Col
                    className="text-center align-items-center order-md-1 order-sm-2"
                    sm={12}
                    md={6}
                >
                    <Row className="p-4">
                        <h5 className="text-center p-2 lead">
                            <strong>Querido/a paciente:</strong>
                        </h5>
                        <h5 className="text-center p-2 lead">
                            En CRC Kinesiología, entendemos que cada paciente es
                            único. No creemos en soluciones genéricas para tus
                            distintos problemas. Nuestro enfoque está basado en
                            una evaluación personalizada que nos permite
                            entender tu caso específico y diseñar un plan de
                            tratamiento adaptado a tus necesidades. Al confiar
                            en nosotros, recibirás un acompañamiento integral
                            que busca no solo aliviar tu dolor, sino también
                            brindarte herramientas para que puedas recuperar tu
                            bienestar y calidad de vida. Miles de pacientes ya
                            han experimentado resultados positivos con nuestro
                            enfoque.
                        </h5>
                    </Row>
                </Col>

                <Col sm={12} md={6} className="pt-4 order-md-2 order-sm-1">
                    <Carousel>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card className="info-card lead">
                                        <Card.Body>
                                            <Card.Title>
                                                José Ignacio Andrade Rojas
                                            </Card.Title>
                                            <Card.Text>
                                                Mi rehabilitación junto a Carlos
                                                Vargas fue extraordinaria.
                                                Llegue a él por una fatiga
                                                tibial la cual me inhabilitaba
                                                poder entrenar. En cosa de 10
                                                sesiones y de arduo trabajo mi
                                                lesión sanó y volví con todo
                                                🏻muchas gracias y 100 %
                                                recomendado
                                            </Card.Text>
                                            <hr />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card className="info-card lead">
                                        <Card.Body>
                                            <Card.Title>
                                                Veronica Caceres Arias
                                            </Card.Title>
                                            <Card.Text>
                                                Muy buena experiencia y
                                                excelente atención, es un
                                                ambiente acogedor y con muy
                                                buenos profesionales. En mi
                                                familia nos hemos atendido ya 3
                                                personas y el resultado ha sido
                                                favorable. Totalmente
                                                recomendado
                                            </Card.Text>
                                            <hr />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card className="info-card lead">
                                        <Card.Body>
                                            <Card.Title>
                                                Pablo Vergara
                                            </Card.Title>
                                            <Card.Text>
                                                Estuve lesionado a mitad de
                                                campeonato con un desgarro,
                                                gracias al conocimiento de
                                                Carlos vargas pude llegar a las
                                                últimas fechas en altas
                                                condiciones 🙌🏻 Muy agradecido
                                                del profesional
                                            </Card.Text>
                                            <hr />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card className="info-card lead">
                                        <Card.Body>
                                            <Card.Title>
                                                JAVIERA MONDACA
                                            </Card.Title>
                                            <Card.Text>
                                                Yo ingrese con dolor lumbar, me
                                                vi en la obligación de dejar de
                                                trabajar debido al malestar,
                                                hasta que llegue a CRC donde me
                                                atendí con excelentes
                                                profesionales y lo mejor es que
                                                la atención es personalizada.
                                                Hoy en día, me siento mucho
                                                mejor y lo más importante es que
                                                ya no sufro de dolor lumbar,
                                                gracias a Carlos Vargas y todo
                                                el equipo de profesionales que
                                                atienden en CRC.
                                            </Card.Text>
                                            <hr />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                className="info-star"
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}
