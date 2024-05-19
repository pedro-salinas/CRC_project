// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../../utils/MobileHandler";

export function EndPageLogin() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleFooter = {
        paddingTop: isMobile ? "30px" : "30px",
    };

    return (
        <Container
            style={dynamicStyleFooter}
            id="end"
            expand="md"
            fluid
            className="d-flex flex-column align-items-between fixed-bottom"
        >
            <Row className="pb-4">
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
