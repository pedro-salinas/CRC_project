// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes
import ella from "../../assets/ella.jpg";
import estoy_yo from "../../assets/estoy_yo.jpg";

// Bootstrap icons
import { ArrowRight, ArrowDown } from "react-bootstrap-icons";

// Grafico
import { Chart } from "./Chart";

export function ExampleCase() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleInfo = {
        paddingTop: isMobile ? "60px" : "150px",
    };

    const fontSizeTitle = {
        fontSize: isMobile ? "36px" : "56px",
    };

    const chartSize = {
        height: isMobile ? 400 : 450,
    };

    return (
        <Container style={dynamicStyleInfo} id="info">
            <Row className="text-center">
                <Row className="text-center" data-aos="fade-up">
                    <h1 style={fontSizeTitle}>
                        <strong>
                            Ella no podía siquiera agacharse por dolor{" "}
                        </strong>
                    </h1>
                </Row>
                <Row className="pt-4" data-aos="fade-up">
                    <Col sm={12} md={6} className="pt-4">
                        {!isMobile ? (
                            <Image src={ella} width="350px" />
                        ) : (
                            <Image src={ella} width="300px" />
                        )}
                    </Col>
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            <span style={{ color: "red" }}>
                                Se olvidó{"  "}
                            </span>
                            de poder trabajar con comodidad. De moverse con
                            <span style={{ color: "red" }}>
                                {"  "}tranquilidad
                            </span>
                            .
                        </h5>
                        <h5 className="pt-4 text-start">
                            Tenía un{" "}
                            <span style={{ color: "red" }}>
                                {"  "}miedo{"  "}
                            </span>{" "}
                            gigante de quedar con esa complicación para siempre.
                            Entonces, nos pusimos manos a la obra y comenzamos a
                            trabajar. Hasta que{" "}
                            <strong>
                                aprovechamos todas sus capacidades y las
                                potenciamos al máximo
                            </strong>
                            .
                        </h5>
                        <h3 className="pt-4">
                            <strong>
                                Volvió a su trabajo, volvió a moverse y lo
                                mejor, ahora esta lista para cumplir su sueño:
                                Entrenar artes marciales.
                            </strong>
                        </h3>
                        <h3 className="pt-4">
                            {" "}
                            <strong>No me detuve ahí.... </strong>
                        </h3>
                    </Col>
                </Row>
                <Row
                    className="pt-4 text-center justify-content-center"
                    data-aos="fade-up"
                >
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            Era hora de probarlo en alguien que ya hubiese{" "}
                            <span style={{ color: "red" }}>
                                fracasado en otros tratamientos
                            </span>
                            , como yo.
                        </h5>
                        <h5 className="pt-4 text-start">
                            Así, llegó Marisol, quien acudió a distintos
                            traumatólogos y kinesiologos con anterioridad,
                            <span style={{ color: "red" }}>
                                {"  "}fallando con los tratamientos que le
                                indicaban
                            </span>
                            ,<strong>ya que algo faltaba</strong>.
                        </h5>

                        <h5 className="pt-4 text-start">
                            Buscamos ese algo con el sistema de evaluación
                            durante una hora completa y logramos revertir ese
                            pronóstico bajo el diagnóstico lumbociática que
                            empeoraba a medida que pasaba el tiempo.
                        </h5>

                        <h5 className="pt-4">
                            Consiguiendo cambios como estos
                        </h5>
                        {!isMobile ? (
                            <ArrowRight size={60} color="#31B6AD" />
                        ) : (
                            <ArrowDown size={36} color="#31B6AD" />
                        )}
                    </Col>
                    <Col sm={12} md={6} className="pt-4">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: chartSize.height,
                            }}
                        >
                            <Chart />
                        </div>
                    </Col>
                </Row>
                <Row className="pt-4 text-center" data-aos="fade-up">
                    <h1 style={fontSizeTitle}>
                        <strong>
                            Un método que está ayudando a cientos de personas a
                            aliviar su cuadro
                        </strong>
                    </h1>
                </Row>
                <Row className="pt-4 text-center" data-aos="fade-up">
                    <Col sm={12} md={6} className="pt-4">
                        {!isMobile ? (
                            <Image src={estoy_yo} width="350px" />
                        ) : (
                            <Image src={estoy_yo} width="300px" />
                        )}
                    </Col>
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            Y así fue como más y más personas llegaron hasta mí,
                            y me di cuenta de que el sistema estaba ofreciendo
                            un cambio constante con el que podría ayudar a mucha
                            gente que sufre dolor.
                        </h5>
                        <h5 className="pt-4 text-start">
                            Sin embargo,{" "}
                            <span style={{ color: "red" }}>
                                tú no tienes cinco años
                            </span>{" "}
                            para descubrir cómo solucionar tu dolor sin gastar
                            todo tu tiempo y dinero en la búsqueda.
                        </h5>
                        <h3 className="pt-4">
                            <strong>¡Para eso estoy yo!</strong>
                        </h3>
                    </Col>
                </Row>

                {/* <Row className="pt-4 text-center">
                    <h3>
                        <strong>Y lo mejor de todo:</strong>
                    </h3>
                    <h3 className="pt-4">
                        <strong>
                            Quiero rebajar su precio para que todo el mundo
                            pueda obtenerlo
                        </strong>
                    </h3>
                </Row>
                <Row className="pt-4 text-center">
                    <Col>
                        <Button
                            variant="primary"
                            style={{
                                borderRadius: "28px",
                            }}
                        >
                            <h1
                                style={{
                                    color: "white",
                                }}
                            >
                                Por tan solo{"  "}
                                <strong>
                                    <span style={{ color: "red" }}>
                                        $14.990
                                    </span>
                                </strong>
                            </h1>
                        </Button>
                    </Col>
                </Row> */}
            </Row>
        </Container>
    );
}