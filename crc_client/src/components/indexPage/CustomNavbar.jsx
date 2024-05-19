// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

// React
import { useState } from "react";

// Router
import { Link } from "react-router-dom";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes locales
import logo from "../../assets/logo.png";

export function CustomNavbar() {
    // Estado para controlar la visibilidad del Offcanvas
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    // Función para ocultar el Offcanvas
    const hideOffcanvas = () => {
        setShowOffcanvas(false);
    };

    const { isMobile } = MobileHandler();

    return (
        <Navbar
            key="navbar"
            id="navbar"
            expand="md"
            fixed="top"
            className="bg-body-tertiary mb-3"
        >
            <Container>
                <Navbar.Brand>
                    {!isMobile ? (
                        <Image src={logo} href="#navbar" width="450px" />
                    ) : (
                        <Image
                            src={logo}
                            className="fixed-top text-center pt-1"
                            href="#navbar"
                            width="200px"
                        />
                    )}
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls={`offcanvasNavbar-expand-md`}
                    className="p-2"
                    onClick={() => setShowOffcanvas(true)}
                />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-$md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                    show={showOffcanvas}
                    onHide={hideOffcanvas}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            CRC Kinesiología
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="align-items-center">
                        <Nav className="justify-content-end flex-grow-1 pe-3 ">
                            <Nav.Link
                                href="/index#home"
                                onClick={hideOffcanvas}
                            >
                                <h6>Inicio</h6>
                            </Nav.Link>
                            <Nav.Link
                                href="/index#info"
                                onClick={hideOffcanvas}
                            >
                                <h6>Especialidades</h6>
                            </Nav.Link>
                            <Nav.Link
                                href="/index#prices"
                                onClick={hideOffcanvas}
                            >
                                <h6>Planes y precios</h6>
                            </Nav.Link>
                            <Nav.Link
                                href="/index#contact"
                                onClick={hideOffcanvas}
                            >
                                <h6>Contacto</h6>
                            </Nav.Link>
                        </Nav>
                        {/* <Link to="/attention">
                            <Button variant="primary">
                                <h6>Agendar aquí mismo</h6>
                            </Button>
                        </Link> */}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
