// React
import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export function Stage1({ programs, goStage2 }) {
    return (
        <Row
            className="pt-2 justify-content-center"
            data-aos="fade-up"
            style={{ minHeight: "250px" }}
        >
            <Row className="text-center">
                <h3>Seleccione un dia</h3>
            </Row>
            {programs.map((program) => {
                if (program.agenda) {
                    let sale = "";
                    let sale_price = "";
                    let price = "";

                    if (program.on_sale) {
                        sale = "OFERTA!";
                        sale_price = program.price;
                        price = program.on_sale_price;

                        return (
                            <Col sm={12} md={6} className="p-2">
                                <Card
                                    style={{
                                        borderWidth: "2px",
                                        borderRadius: "3px",
                                    }}
                                >
                                    <Card.Body>
                                        <Row>
                                            <Col className="text-start">
                                                <h3
                                                    style={{
                                                        color: "#444444",
                                                    }}
                                                >
                                                    {program.name}
                                                </h3>
                                            </Col>
                                            <Col className="text-end">
                                                <h3
                                                    style={{
                                                        color: "#444444",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "red",
                                                        }}
                                                    >
                                                        {sale}{" "}
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
                                                </h3>
                                            </Col>
                                        </Row>
                                        <p>{program.description}</p>
                                        <Row className="text-end">
                                            <Col>
                                                <Button
                                                    onClick={() =>
                                                        goStage2(program)
                                                    }
                                                >
                                                    Seleccionar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    } else {
                        price = program.price;
                        return (
                            <Col sm={12} md={6} className="p-2">
                                <Card
                                    style={{
                                        borderWidth: "2px",
                                        borderRadius: "3px",
                                    }}
                                >
                                    <Card.Body>
                                        <Row>
                                            <Col className="text-start">
                                                <h3
                                                    style={{
                                                        color: "#444444",
                                                    }}
                                                >
                                                    {program.name}
                                                </h3>
                                            </Col>
                                            <Col className="text-end">
                                                <h3
                                                    style={{
                                                        color: "#444444",
                                                    }}
                                                >
                                                    {`$${price
                                                        .toLocaleString()
                                                        .replace(/,/g, ".")}`}
                                                </h3>
                                            </Col>
                                        </Row>
                                        <p>{program.description}</p>
                                        <Row className="text-end">
                                            <Col>
                                                <Button
                                                    onClick={() =>
                                                        goStage2(program)
                                                    }
                                                >
                                                    Seleccionar
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    }
                }
            })}
        </Row>
    );
}
