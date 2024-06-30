// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

export function EndPage() {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "end-mobile-padding"
        : "end-desktop-padding";

    const dynamicFontSize = isMobile ? "end-mobile-font" : "end-desktop-font";

    return (
        <Container
            id="end"
            expand="md"
            fluid
            className={`d-flex flex-column align-items-between ${dynamicPadding}`}
        >
            <Row className={`pb-4 ${dynamicFontSize}`}>
                <Col>
                    © Copyright <strong>CRC kinesiología</strong>. Todos los
                    derechos reservados
                </Col>
                <Col className="text-end">
                    Diseñado por <strong>Pedro Salinas</strong>
                </Col>
            </Row>
        </Container>
    );
}
