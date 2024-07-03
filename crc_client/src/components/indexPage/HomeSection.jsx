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

    const videoSize = {
        height: isMobile ? "300px" : "500px",
    };

    // CSS movil
    const dynamicPadding = isMobile
        ? "home-mobile-padding"
        : "home-desktop-padding";

    const dynamicFontSize = isMobile ? "home-mobile-font" : "home-desktop-font";

    const dynamicHeight = isMobile ? "300" : "500";

    useEffect(() => {
        const today = new Date();
        const weekOfMonth = getWeekOfMonth(today);
        const number = getRandomNumberForWeek(weekOfMonth);
        setCounter(number);
    }, []);

    return (
        <Container>
            <Row id="home" className={dynamicPadding}>
                <Col
                    className="text-center align-items-center"
                    data-aos="fade-down"
                >
                    <Row>
                        <h4>
                            <span className="red-color">¡Atención!</span> Te
                            presento...
                        </h4>
                        <h1 className={`pt-2 ${dynamicFontSize}`}>
                            <strong>Supera al DOLOR LUMBAR</strong>
                        </h1>
                        <h4 className="pt-2">
                            El sistema de evaluación paso a paso para encontrar
                            la SOLUCIÓN a tu dolor
                        </h4>
                        <iframe
                            height={dynamicHeight}
                            className={`pt-2`}
                            src="https://www.youtube.com/embed/ReuJnbJfkwo?si=emr6NMOsGxfa2qdy"
                            title="CRC - Anuncio youtube"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen
                        ></iframe>
                    </Row>
                    <Row className="pt-4" data-aos="fade-down">
                        <Col>
                            <Button variant="primary" className="home-home-box">
                                <h4>¡Sí! Quiero solucionar mi dolor lumbar.</h4>

                                <h4>
                                    Dame acceso inmediato para saber cómo
                                    aliviar mi dolor a solo{" "}
                                    <strong>
                                        {!loading && (
                                            <span className="red-color">
                                                {program}
                                            </span>
                                        )}
                                        {loading && (
                                            <span className="red-color">
                                                ..............
                                            </span>
                                        )}
                                    </strong>
                                </h4>
                            </Button>
                        </Col>
                    </Row>

                    <Row className="pt-4" data-aos="fade-down">
                        <h1 className={`pt-2 ${dynamicFontSize}`}>
                            <strong>
                                Últimos{" "}
                                <span className="red-color">
                                    {counter} cupos
                                </span>
                            </strong>
                        </h1>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
