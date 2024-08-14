// React
import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export function Stage1({ programs, goStage2 }) {
    return (
        <Col className="pt-4 attention-height">
            <Row className="text-center">
                <h3>Seleccione el tipo de atención</h3>{" "}
            </Row>
            <Row className="p-4 justify-content-center">
                {programs.map((program, i) => {
                    if (program.agenda) {
                        let sale = "";
                        let sale_price = "";
                        let price = "";

                        if (program.on_sale) {
                            sale = "OFERTA!";
                            sale_price = program.price;
                            price = program.on_sale_price;

                            return (
                                <Col sm={12} md={6} className="p-2" key={i}>
                                    <Card className="attention-card-border">
                                        <Card.Body>
                                            <Row>
                                                <Col className="text-start">
                                                    <h3 className="attention-grey">
                                                        {program.name}
                                                    </h3>
                                                </Col>
                                                <Col className="text-end">
                                                    <h3 className="attention-grey">
                                                        <span className="attention-red">
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
                                                            .replace(
                                                                /,/g,
                                                                "."
                                                            )}`}
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
                                    <Card className="attention-card-border">
                                        <Card.Body>
                                            <Row>
                                                <Col className="text-start">
                                                    <h3 className="attention-grey">
                                                        {program.name}
                                                    </h3>
                                                </Col>
                                                <Col className="text-end">
                                                    <h3 className="attention-grey">
                                                        {`$${price
                                                            .toLocaleString()
                                                            .replace(
                                                                /,/g,
                                                                "."
                                                            )}`}
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
        </Col>

        // <Row
        //     className="pt-4 justify-content-center attention-height"
        //     data-aos="fade-down"
        // >
        //     <Row className="text-center">
        //         <h3>Seleccione el tipo de atención</h3>
        //     </Row>
        //     {programs.map((program) => {
        //         if (program.agenda) {
        //             let sale = "";
        //             let sale_price = "";
        //             let price = "";

        //             if (program.on_sale) {
        //                 sale = "OFERTA!";
        //                 sale_price = program.price;
        //                 price = program.on_sale_price;

        //                 return (
        //                     <Col sm={12} md={6} className="p-2">
        //                         <Card className="attention-card-border">
        //                             <Card.Body>
        //                                 <Row>
        //                                     <Col className="text-start">
        //                                         <h3 className="attention-grey">
        //                                             {program.name}
        //                                         </h3>
        //                                     </Col>
        //                                     <Col className="text-end">
        //                                         <h3 className="attention-grey">
        //                                             <span className="attention-red">
        //                                                 {sale}{" "}
        //                                             </span>
        //                                             {"  "}
        //                                             <del>{`$${sale_price
        //                                                 .toLocaleString()
        //                                                 .replace(
        //                                                     /,/g,
        //                                                     "."
        //                                                 )}`}</del>
        //                                             {"  "}
        //                                             {`$${price
        //                                                 .toLocaleString()
        //                                                 .replace(/,/g, ".")}`}
        //                                         </h3>
        //                                     </Col>
        //                                 </Row>
        //                                 <p>{program.description}</p>
        //                                 <Row className="text-end">
        //                                     <Col>
        //                                         <Button
        //                                             onClick={() =>
        //                                                 goStage2(program)
        //                                             }
        //                                         >
        //                                             Seleccionar
        //                                         </Button>
        //                                     </Col>
        //                                 </Row>
        //                             </Card.Body>
        //                         </Card>
        //                     </Col>
        //                 );
        //             } else {
        //                 price = program.price;
        //                 return (
        //                     <Col sm={12} md={6} className="p-2">
        //                         <Card className="attention-card-border">
        //                             <Card.Body>
        //                                 <Row>
        //                                     <Col className="text-start">
        //                                         <h3 className="attention-grey">
        //                                             {program.name}
        //                                         </h3>
        //                                     </Col>
        //                                     <Col className="text-end">
        //                                         <h3 className="attention-grey">
        //                                             {`$${price
        //                                                 .toLocaleString()
        //                                                 .replace(/,/g, ".")}`}
        //                                         </h3>
        //                                     </Col>
        //                                 </Row>
        //                                 <p>{program.description}</p>
        //                                 <Row className="text-end">
        //                                     <Col>
        //                                         <Button
        //                                             onClick={() =>
        //                                                 goStage2(program)
        //                                             }
        //                                         >
        //                                             Seleccionar
        //                                         </Button>
        //                                     </Col>
        //                                 </Row>
        //                             </Card.Body>
        //                         </Card>
        //                     </Col>
        //                 );
        //             }
        //         }
        //     })}
        // </Row>
    );
}
