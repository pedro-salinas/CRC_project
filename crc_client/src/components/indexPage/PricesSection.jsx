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
import { Whatsapp } from "react-bootstrap-icons";

export function PricesSection({ program, programs, loading }) {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStylePrices = {
        paddingTop: isMobile ? "60px" : "150px",
    };

    const fontSizeTitle = {
        fontSize: isMobile ? "36px" : "56px",
    };

    return (
        <Container style={dynamicStylePrices} id="prices">
            <Row className="text-center" data-aos="fade-up">
                <h1 className="pt-2" style={fontSizeTitle}>
                    <strong>
                        Puedes al agendar tu evaluación y acceder ¡A todo esto!
                    </strong>
                    <span style={{ color: "red" }}> (por solo {program})</span>
                </h1>
            </Row>
            <Row className="text-center pt-4" data-aos="fade-up">
                <Row className="text-center justify-content-center">
                    <Col xs={8}>
                        <h5 className="text-center pt-4">
                            Contamos con un gran equipo de profesionales de la
                            kinesiología, comprometidos en brindarles la mejor
                            atención, con nuestra experiencia.
                        </h5>
                    </Col>
                </Row>
                <Row className="text-center pt-4">
                    {/* <Col>
                        <Button variant="primary">
                            <h5>Agendar una hora</h5>
                        </Button>
                    </Col> */}
                    <Link to="https://wa.me/56966140265">
                        <Button
                            variant="info"
                            style={{
                                padding: "0px",
                                margin: "0px",
                                border: "0px",
                            }}
                        >
                            <Row className="p-2 align-items-center">
                                <Col sm={8} className="p-0">
                                    <h6>Agenda por Whatsapp</h6>
                                </Col>
                                <Col sm={3} className="p-0">
                                    <Whatsapp size={30} color="white" />
                                </Col>
                            </Row>
                        </Button>
                    </Link>
                </Row>
            </Row>
            <Row
                className="prices-container pt-4 pb-4 m-1 mt-4"
                data-aos="fade-up"
            >
                {!loading && (
                    <div>
                        {programs.map((program, index) => {
                            if (program.visible) {
                                let sale = "";
                                let sale_price = "";
                                let price = "";

                                if (program.on_sale) {
                                    sale = "OFERTA!";
                                    sale_price = program.price;
                                    price = program.on_sale_price;

                                    const formattedPrice = `$${price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`;

                                    const formattedOnSalePrice = `$${sale_price
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`;

                                    return (
                                        <Row>
                                            <Col className="text-start">
                                                <h4>{program.name}</h4>

                                                <h6>{program.description}</h6>
                                            </Col>
                                            <Col className="text-end">
                                                <h4>
                                                    <span
                                                        style={{ color: "red" }}
                                                    >
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
                                            <Col className="text-start">
                                                <h4>{program.name}</h4>

                                                <h6>{program.description}</h6>
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
                )}
            </Row>

            <Row className="pt-4 text-center" data-aos="fade-up">
                <h1 className="pt-4">
                    <strong>
                        ¡Sí, exacto! Quiero obtener por fín mi solución por solo
                        {program}{" "}
                    </strong>
                </h1>
            </Row>
            <Row className="pt-4 text-center" data-aos="fade-up">
                <Col sm={12} md={6}>
                    <h5 className="pt-4 text-center">
                        ¿Qué más puedes comprar con {program}?
                    </h5>
                    <h5 className="pt-4 text-center">
                        <span style={{ color: "red" }}>
                            Puedes ir con ese precio a comprar una hamburguesa o
                            ir con alguien a comer pizza.
                        </span>
                    </h5>
                    <h5 className="pt-4">
                        ¡¡O puedes comprar este sistema de evaluación para que
                        sepas como{" "}
                        <strong>superar tu cuadro de dolor lumbar</strong> de
                        una vez por todas!!
                    </h5>
                </Col>
                <Col sm={12} md={6} className="pt-4">
                    {!isMobile ? (
                        <Image src={chris} width="300px" />
                    ) : (
                        <Image src={chris} width="250px" />
                    )}
                </Col>
            </Row>

            <Row className="pt-4 text-center" data-aos="fade-up">
                <h1 className="pt-4">
                    <strong>
                        ¿Cuál es la TRAMPA y el motivo de esta oferta?
                    </strong>
                </h1>
                <h5 className="pt-4">
                    En este punto pensarás ¿Todo esto a solo {program}? Está muy
                    bien, pero tiene que haber alguna trampa ... ¿No?
                </h5>
                <h3 className="pt-4">¡NO HAY NINGUNA TRAMPA!</h3>
                <h5 className="pt-4">
                    Sé que en algunos centros dejan incluso a evaluación gratis,
                    pero te ven <span style={{ color: "red" }}>15 MINUTOS</span>{" "}
                    y sin un tratamiento personalizado para ti, con el que
                    terminas haciendo lo mismo que todos los pacientes y
                    <span style={{ color: "red" }}> gastando el doble</span>,
                    sólo por no tener terapias que atiendan a tu condición.
                </h5>
                <h3 className="pt-4">¡Este no es uno de esos casos! </h3>
                <h5 className="pt-4">
                    Ofrezco este servicio con un valor accesible por las
                    siguientes razones:
                </h5>
                <ul className="pt-4">
                    <li className="pt-4">
                        Sé lo difícil que es tener dolor, alejarte de todo y no
                        encontrar solución o un tratamiento efectivo. Por eso,
                        quiero ayudar a tantas personas como sea posible para
                        poder alcanzar la tranquilidad y el alivio de su dolor.
                    </li>
                    <li className="pt-4">
                        Tuve la fortuna de pasar por muchos centros de la
                        séptima región, por lo que pude rescatar lo bueno y lo
                        malo de todos, con el fin de mejorar todo el servicio.
                        Esto me llevo a poder dar un mejor tratamiento y
                        solucionar problemas con mucha más efectividad.
                    </li>
                    <li className="pt-4">
                        Siento que como sistema de salud en general, nos falta
                        mucho para poder dar la atención que las personas se
                        merecen. Por lo que quiero comenzar a mejorarlo
                        aportando ese grano de arena inicial, entregando toda la
                        calidad necesaria a un costo totalmente accesible.
                    </li>
                </ul>
            </Row>
            <Row className="pt-4 text-center" data-aos="fade-up">
                <h1 className="pt-4">
                    <strong>¡Esto es todo!</strong>
                </h1>
                <h5 className="pt-4">
                    Si ya lo pensaste y realmente deseas un sistema de
                    evaluación que te diga como solucionar tu dolor lumbar,
                    incluso con tratamientos fallidos, entonces este plan te
                    dirá como hacerlo
                </h5>
                <h4 className="pt-4">¡Espero verte dentro!</h4>
                <h6 className="pt-4 text-end">
                    Christopher Ramírez Calderón - Kinesiologo
                </h6>
                <h6 className="text-end">Equipo CRC Kinesiología</h6>
            </Row>
        </Container>
    );
}
