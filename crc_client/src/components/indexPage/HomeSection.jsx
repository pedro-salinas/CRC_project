// React
import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

export function HomeSection({ program, loading }) {
    // Contador fake de cupos
    function getRandomNumberForWeek(week) {
        switch (week) {
            case 1:
                return Math.floor(Math.random() * (7 - 6 + 1)) + 6; // 6 or 7
            case 2:
                return Math.floor(Math.random() * (5 - 4 + 1)) + 4; // 4 or 5
            case 3:
                return Math.floor(Math.random() * (3 - 2 + 1)) + 2; // 2 or 3
            default:
                return 2; // 2
        }
    }

    function getWeekOfMonth(date) {
        const day = date.getDate();
        return Math.ceil(day / 7);
    }

    const [counter, setCounter] = useState();

    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleHome = {
        paddingTop: isMobile ? "60px" : "100px",
    };

    const fontSizeTitle = {
        fontSize: isMobile ? "36px" : "46px",
    };

    const videoSize = {
        height: isMobile ? "300px" : "500px",
    };

    useEffect(() => {
        const today = new Date();
        const weekOfMonth = getWeekOfMonth(today);
        const number = getRandomNumberForWeek(weekOfMonth);
        setCounter(number);
    }, []);

    return (
        <Container>
            <Row id="home" style={dynamicStyleHome}>
                <Col
                    className="text-center align-items-center"
                    data-aos="fade-down"
                >
                    <Row>
                        <h4>
                            <span style={{ color: "red" }}>¡Atención!</span> Te
                            presento...
                        </h4>
                        <h1 className="pt-2" style={fontSizeTitle}>
                            <strong>Supera al DOLOR LUMBAR</strong>
                        </h1>
                        <h4 className="pt-2">
                            El sistema de evaluación paso a paso para encontrar
                            la SOLUCIÓN a tu dolor
                        </h4>
                        <iframe
                            className="pt-2"
                            height={videoSize.height}
                            src="https://www.youtube.com/embed/ReuJnbJfkwo?si=emr6NMOsGxfa2qdy"
                            title="CRC - Anuncio youtube"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </Row>
                    <Row className="pt-4" data-aos="fade-down">
                        <Col>
                            <Button
                                variant="primary"
                                style={{
                                    pointerEvents: "none",
                                    cursor: "default",
                                    borderRadius: "28px",
                                }}
                            >
                                <h4>¡Sí! Quiero solucionar mi dolor lumbar.</h4>

                                <h4>
                                    Dame acceso inmediato para saber cómo
                                    aliviar mi dolor a solo{" "}
                                    <strong>
                                        {!loading && (
                                            <span style={{ color: "red" }}>
                                                {program}
                                            </span>
                                        )}
                                        {loading && (
                                            <span style={{ color: "red" }}>
                                                ..............
                                            </span>
                                        )}
                                    </strong>
                                </h4>
                            </Button>
                        </Col>
                    </Row>

                    <Row className="pt-4" data-aos="fade-down">
                        <h1 className="pt-2" style={fontSizeTitle}>
                            <strong>
                                Últimos{" "}
                                <span style={{ color: "red" }}>
                                    {counter} cupos
                                </span>
                            </strong>
                        </h1>
                    </Row>
                </Col>
            </Row>
            {/* <Row className="pt-2">
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
            </Row> */}
        </Container>
    );
}
