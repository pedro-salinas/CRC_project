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

    // Padding para movil o navegador
    const dynamicStyleInfo = {
        paddingTop: isMobile ? "60px" : "150px",
    };

    // CSS movil
    const dynamicPadding = isMobile
        ? "info-mobile-padding"
        : "info-desktop-padding";

    return (
        <Container id="info" className="dynamicPadding">
            <Row className="text-center" data-aos="fade-down">
                <h4 style={{ fontSize: "28px" }}>
                    Lo sé... Estas frustrado(a) por tu dolor lumbar persistente
                    y has agotado todas las opciones
                    <strong> sin encontrar alivio.</strong>
                </h4>
            </Row>
            <Row className="pt-2 align-items-center" data-aos="fade-down">
                <Col className="text-center align-items-center" sm={12} md={6}>
                    <Row className="pt-4">
                        <h1 className="fw-bold">
                            De: Christopher Ramírez C., Fundador CRC
                            Kinesiología Talca, Chile.{" "}
                        </h1>
                    </Row>
                    <Row className="p-4">
                        <h5 className="text-start p-2">
                            <strong>
                                Querido/a paciente con dolor lumbar:
                            </strong>
                        </h5>
                        <h5 className="text-start p-2">
                            Es evidente que muchas personas que sufren de dolor
                            no encuentran una solución efectiva, lo que
                            contribuye al aumento del dolor crónico en la
                            población. Esto se debe en gran parte a la calidad
                            deficiente de los tratamientos disponibles en Chile,
                            lo que puede ser tu situación actual.
                        </h5>
                        <h5 className="text-start p-2">
                            ¿Has probado tratamientos costosos que incluyen
                            medicamentos, exámenes y diversas terapias sin
                            obtener resultados significativos? ¿O incluso te
                            resulta difícil costear esos tratamientos?
                        </h5>
                        <h5 className="text-start p-2">
                            Sé que estás buscando algo que funcione de manera
                            efectiva y rápida, sin recurrir a los tratamientos
                            convencionales que pueden no haber dado resultados
                            en el pasado. Por eso, este sistema de evaluación
                            está diseñado pensando en ti y en tus necesidades.
                        </h5>
                        <h5 className="text-start p-2">
                            Detrás de este sistema de evaluación hay una razón
                            sólida, no salió de la nada, fue desarrollado
                            después de considerar diversos factores y
                            necesidades de los pacientes como tú que me
                            motivaron a crearlo.
                        </h5>
                    </Row>
                </Col>

                <Col sm={12} md={6} className="pt-4">
                    <Carousel data-bs-theme="">
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card
                                        style={{
                                            border: "solid 1px grey",
                                            borderRadius: "10px",
                                            padding: "50px",
                                            minHeight: "450px",
                                        }}
                                    >
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
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card
                                        style={{
                                            border: "solid 1px grey",
                                            borderRadius: "10px",
                                            padding: "50px",
                                            minHeight: "450px",
                                        }}
                                    >
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
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card
                                        style={{
                                            border: "solid 1px grey",
                                            borderRadius: "10px",
                                            padding: "50px",
                                            minHeight: "450px",
                                        }}
                                    >
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
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Container>
                                <Row className="pt-2 b-2 p-2">
                                    <Card
                                        style={{
                                            border: "solid 1px grey",
                                            borderRadius: "10px",
                                            padding: "50px",
                                            minHeight: "450px",
                                        }}
                                    >
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
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                            <StarFill
                                                size={25}
                                                color="yellow"
                                                style={{
                                                    stroke: "black",
                                                    strokeWidth: 0.2,
                                                    marginRight: "5px",
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row className="pt-4 text-center" data-aos="fade-down">
                <h2>Te contaré aún más a continuación</h2>
            </Row>
        </Container>
    );
}
