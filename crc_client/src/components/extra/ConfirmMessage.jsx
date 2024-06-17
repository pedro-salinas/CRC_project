import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

// API
import { verifyEmailRequest } from "../../api/user";

// Router
import { Link, useSearchParams, useNavigate } from "react-router-dom";

// Imagenes locales
import logo from "../../assets/logo.png";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

export function ConfirmMessage() {
    const [queryParameters] = useSearchParams();
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function verifyEmail() {
            try {
                const res = await verifyEmailRequest(queryParameters.get("id"));
                setShow(true);
            } catch (error) {
                console.log(error);
            }
        }
        verifyEmail();
    }, []);

    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const widthImage = {
        width: isMobile ? "250px" : "450px",
    };

    return (
        <Container className="pt-5 p-5">
            <Row className="pt-5 justify-content-center">
                <Col className="border shadow-lg" lg={6}>
                    <Row className="bg-light">
                        <Col className="p-5 text-center">
                            <Image src={logo} style={widthImage} />
                        </Col>
                    </Row>
                    <Row>
                        {show && (
                            <Row className="p-5 text-center pb-0">
                                <h5 className="text-success">
                                    !Tu correo electrónico ha sido confirmado
                                    correctamente!
                                </h5>
                                <h6>
                                    Ahora puedes inisiar sesión cuando quieras
                                </h6>
                            </Row>
                        )}
                        <Row className="text-center p-3">
                            <Col>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    as={Link}
                                    to="/index"
                                >
                                    Ir a pagina principal
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
