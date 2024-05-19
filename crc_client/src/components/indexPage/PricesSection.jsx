// React
import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes locales
import image from "../../assets/prices.png";

// Importar API
import { getPrograms } from "../../api/program";

export function PricesSection() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStylePrices = {
        paddingTop: isMobile ? "60px" : "150px",
    };

    // Datos de la tabla
    const [programs, setPrograms] = useState([]);

    // Cargar programas
    const [loading, setLoading] = useState(true);

    // Obtener los programas
    const getProgramsBackend = async () => {
        try {
            const res = await getPrograms();

            if (!res) {
                closeSession();
            }
            setPrograms(res.data);
            setLoading(false);
        } catch (error) {
            console.log("Hubo un error inesperado");
        }
    };

    function handleReload() {
        setTimeout(() => {
            getProgramsBackend();
        }, 500);
    }

    // Obtener los programas al cargar el componente
    useEffect(() => {
        handleReload();
    }, []);

    return (
        <Container style={dynamicStylePrices} id="prices">
            <Row className="" data-aos="fade-down">
                <Col md={4} className="text-center">
                    {!isMobile ? (
                        <Image src={image} width="450px" />
                    ) : (
                        <Image src={image} width="250px" />
                    )}
                </Col>
                <Col md={8}>
                    <Row className="text-center">
                        <h1 className="fw-bold">Planes y precios</h1>
                    </Row>
                    <Row className="text-center pt-5">
                        <h5>
                            Contamos con un gran equipo de profesionales de la
                            kinesiología, comprometidos en brindarles la mejor
                            atención, con nuestra experiencia.
                        </h5>
                    </Row>
                    <Row className="text-center pt-5 pb-5">
                        <Col>
                            <Button variant="primary">
                                <h6>Agenda una hora</h6>
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row className="prices-container p-2" data-aos="fade-down">
                {!loading && (
                    <>
                        {programs.map((program, index) => {
                            if (program.visible) {
                                let sale = "";
                                let sale_price = "";
                                let price = "";

                                if (program.on_sale) {
                                    sale = "OFERTA!";
                                    sale_price = program.price;
                                    price = program.on_sale_price;

                                    return (
                                        <Row>
                                            <Col className="text-start">
                                                <h4>{program.name}</h4>
                                            </Col>
                                            <Col className="text-end">
                                                <h4>
                                                    <span
                                                        style={{ color: "red" }}
                                                    >
                                                        {sale}
                                                    </span>
                                                    {"  "}
                                                    <del>{`$${sale_price
                                                        .toLocaleString()
                                                        .replace(
                                                            /,/g,
                                                            "."
                                                        )}`}</del>
                                                    {"  "}
                                                    {`$${price
                                                        .toLocaleString()
                                                        .replace(/,/g, ".")}`}
                                                </h4>
                                            </Col>
                                        </Row>
                                    );
                                } else {
                                    price = program.price;
                                    return (
                                        <Row>
                                            <Col className="text-start">
                                                <h4>{program.name}</h4>
                                            </Col>
                                            <Col className="text-end">
                                                <h4>{`$${price
                                                    .toLocaleString()
                                                    .replace(/,/g, ".")}`}</h4>
                                            </Col>
                                        </Row>
                                    );
                                }
                            }
                        })}
                    </>
                )}
            </Row>
        </Container>
    );
}
