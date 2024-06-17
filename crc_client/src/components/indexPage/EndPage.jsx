// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

export function EndPage() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleFooter = {
        paddingTop: isMobile ? "30px" : "30px",
    };

    const fontSize = {
        fontSize: isMobile ? "12px" : "18px",
    };

    return (
        <Container
            style={dynamicStyleFooter}
            id="end"
            expand="md"
            fluid
            className="d-flex flex-column align-items-between"
        >
            <Row className="pb-4" style={fontSize}>
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
