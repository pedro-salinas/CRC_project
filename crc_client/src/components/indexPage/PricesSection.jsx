// React
import { useState, useEffect } from "react";

// Router
import { Link } from "react-router-dom";

// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes
import chris from "../../assets/crc_chris.webp";

// Bootstrap icons
import { Laptop } from "react-bootstrap-icons";

export function PricesSection({ program, programs, loading }) {
    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "prices-mobile-padding"
        : "prices-desktop-padding";

    const dynamicFontSize = isMobile
        ? "prices-mobile-font"
        : "prices-desktop-font";

    return (
        <Container className={dynamicPadding} id="prices">
            <Row className="text-center" data-aos="fade-down">
                <h1 className={`pt-2 ${dynamicFontSize}`}>
                    <strong>
                        Puedes al agendar tu evaluación y acceder ¡A todo esto!
                    </strong>

                    {/* <span className="prices-red-color">
                        {" "}
                        (por solo{" "}
                        {!loading && (
                            <span className="prices-red-color">{program}</span>
                        )}
                        {loading && (
                            <span className="prices-red-color">
                                ..............
                            </span>
                        )}
                        )
                    </span> */}
                </h1>
            </Row>
            <Row
                className="text-center justify-content-center pt-4"
                data-aos="fade-down"
            >
                <Col xs={8}>
                    <h5 className="text-center pt-2 lead">
                        Contamos con un gran equipo de profesionales de la
                        kinesiología, comprometidos en brindarles la mejor
                        atención, con nuestra experiencia.
                    </h5>
                </Col>
            </Row>
            <Row className="text-center pt-4" data-aos="fade-down">
                {/* <Col>
                        <Button variant="primary">
                            <h5>Agendar una hora</h5>
                        </Button>
                    </Col> */}
                {/* <Link to="https://wa.me/56966140265">
                    <Button variant="info" className="prices-no-p-m-b">
                        <Row className="p-2 align-items-center">
                            <Col sm={8} className="p-0">
                                <h6>Agenda por Whatsapp</h6>
                            </Col>
                            <Col sm={3} className="p-0">
                                <Whatsapp size={30} color="white" />
                            </Col>
                        </Row>
                    </Button>
                </Link> */}
                <Link to="/attention">
                    <Button variant="primary" className="customnavbar-no-p-m-b">
                        <Row className="p-2 align-items-center">
                            <Col sm={8} className="p-0">
                                <h6>Agenda por internet</h6>
                            </Col>
                            <Col sm={3} className="p-0">
                                <Laptop size={30} color="white" />
                            </Col>
                        </Row>
                    </Button>
                </Link>
            </Row>
            {!loading && (
                <Row
                    className="prices-container pt-4 pb-4 m-1 mt-4"
                    data-aos="fade-down"
                >
                    <div data-aos="fade-down">
                        {programs.map((program, index) => {
                            if (program.visible) {
                                let sale = "";
                                let sale_price = "";
                                let price = "";

                                if (program.on_sale) {
                                    sale = "OFERTA!";
                                    sale_price = program.price;
                                    price = program.on_sale_price;

                                    const formattedPrice = `$${sale_price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`;

                                    const formattedOnSalePrice = `$${price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`;

                                    return (
                                        <Row>
                                            <Col className="text-start">
                                                <h4>{program.name}</h4>

                                                <h6 className="lead">
                                                    {program.description}
                                                </h6>
                                            </Col>
                                            <Col className="text-end">
                                                <h4>
                                                    <span className="prices-red-color">
                                                        {sale}
                                                    </span>
                                                    {"  "}
                                                    <del>{`${formattedPrice}`}</del>
                                                    {"  "}
                                                    {`${formattedOnSalePrice}`}
                                                </h4>
                                            </Col>
                                        </Row>
                                    );
                                } else {
                                    price = program.price;

                                    const formattedPrice = `$${price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`;

                                    return (
                                        <Row>
                                            <Col className="text-start lead">
                                                <h4>{program.name}</h4>

                                                <h4 className="lead">
                                                    {program.description}
                                                </h4>
                                            </Col>
                                            <Col className="text-end">
                                                <h4>{`${formattedPrice}`}</h4>
                                            </Col>
                                        </Row>
                                    );
                                }
                            }
                        })}
                    </div>
                </Row>
            )}
        </Container>
    );
}
