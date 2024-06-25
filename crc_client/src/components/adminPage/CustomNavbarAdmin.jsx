// Bootstrap
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

// Context
import { useUserContext } from "../../context/userContext";

// Api
import { logout } from "../../api/user";

// React
import { useEffect, useState } from "react";

// Router
import { Link, useNavigate } from "react-router-dom";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes locales
import logo from "../../assets/logo.webp";

export function CustomNavbarAdmin() {
    // Cerrar sesión
    const navigate = useNavigate();

    const {
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
    } = useUserContext();

    function closeSession() {
        logout();
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        navigate("/admin/login", { replace: true });
    }

    // Estado para controlar la visibilidad del Offcanvas
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    // Función para ocultar el Offcanvas
    const hideOffcanvas = () => {
        setShowOffcanvas(false);
    };

    const { isMobile } = MobileHandler();

    useEffect(() => {
        if (!loading) {
            if (user) {
                console.log("Datos del usuario cargados:", user); // Datos del usuario disponibles
            } else if (!isAuthenticated) {
                console.log("Usuario no autenticado"); // Usuario no autenticado
            }
        }
    }, [isAuthenticated, loading, user]);

    return (
        <Navbar
            key="navbar"
            id="navbar"
            expand="lg"
            className="bg-body-tertiary mb-3 p-2"
        >
            <Navbar.Brand>
                {!isMobile ? (
                    <Image src={logo} href="#navbar" width="200px" />
                ) : (
                    <Image
                        src={logo}
                        className="text-center pt-1"
                        href="#navbar"
                        width="200px"
                    />
                )}
            </Navbar.Brand>

            <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-lg`}
                className="p-2"
                onClick={() => setShowOffcanvas(true)}
            />

            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-$lg`}
                aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                placement="end"
                show={showOffcanvas}
                onHide={hideOffcanvas}
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        CRC Kinesiología
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="">
                    <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                        <Nav.Link as={Link} to="/admin/attentions">
                            <h6>Atenciones</h6>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/attentionstable">
                            <h6>Tabla atenciones</h6>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/programs">
                            <h6>Progamas</h6>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/kines">
                            <h6>Kinesiólogos</h6>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/clients">
                            <h6>Paciente</h6>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admin/charts">
                            <h6>Gráficos</h6>
                        </Nav.Link>
                        {!isMobile ? (
                            <div className="red-sub">
                                <Nav.Link as={Link} to="/admin/users">
                                    <h6>Usuarios</h6>
                                </Nav.Link>
                            </div>
                        ) : (
                            <Nav.Link as={Link} to="/admin/users">
                                <h6>Usuarios</h6>
                            </Nav.Link>
                        )}
                        <Row className="p-1 text-center align-items-center">
                            <Col>
                                <h6>
                                    Sesión iniciada como:{" "}
                                    {user && <strong> {user.name}</strong>}
                                </h6>
                                <Nav className="justify-content-center">
                                    <a
                                        onClick={closeSession}
                                        className="close-session"
                                    >
                                        Cerrar sesión
                                    </a>
                                </Nav>
                            </Col>
                        </Row>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
    );
}
