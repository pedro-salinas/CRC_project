// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

export function Stage1({ programs, goStage2 }) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = async (values, selectedProgram, price) => {
        goStage2(selectedProgram, price, values.prevision);
    };

    const handleSelect = (selectedProgram, price) => {
        handleSubmit((values) => onSubmit(values, selectedProgram, price))();
    };

    return (
        <Col className="pt-4 attention-height">
            <Form className="p-2" onSubmit={onSubmit}>
                <Row className="text-center">
                    <h1 className="fw-bold ">Seleccionar previsón</h1>{" "}
                </Row>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Form.Group className="mb-3 mt-3" controlId="prevision">
                            <select
                                type="text"
                                className={
                                    errors.prevision
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                {...register("prevision", {
                                    required: {
                                        value: true,
                                        message: "Se requiere una previsión",
                                    },
                                })}
                            >
                                <option value="">
                                    Seleccionar previsión...
                                </option>
                                <option key={1} id={1} value="Fonasa">
                                    Fonasa
                                </option>
                                <option key={2} id={2} value="Isapre">
                                    Isapre
                                </option>
                            </select>

                            <span className="text-danger">
                                {errors.prevision && errors.prevision.message}
                            </span>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="text-center">
                    <h1 className="fw-bold ">Seleccionar tipo de atención</h1>{" "}
                </Row>
                <Row className="p-4 justify-content-center">
                    {programs.map((program, i) => {
                        if (program.agenda && program.specialty) {
                            let sale = "";
                            let sale_price = "";
                            let price = "";

                            if (program.on_sale) {
                                sale = "OFERTA!";
                                sale_price = program.price;
                                price = program.on_sale_price;

                                if (watch("prevision") == "Fonasa") {
                                    price = Math.floor(price / 2);
                                }

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
                                                            <del>{`$${sale_price.toLocaleString(
                                                                "es-CL"
                                                            )}`}</del>
                                                            {"  "}
                                                            {`$${price.toLocaleString(
                                                                "es-CL"
                                                            )}`}
                                                        </h3>
                                                    </Col>
                                                </Row>
                                                <p>{program.description}</p>
                                                <Row className="text-end">
                                                    <Col>
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                handleSelect(
                                                                    program,
                                                                    price
                                                                )
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

                                if (watch("prevision") == "Fonasa") {
                                    price = Math.floor(price / 2);
                                }

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
                                                            {`$${price.toLocaleString(
                                                                "es-CL"
                                                            )}`}
                                                        </h3>
                                                    </Col>
                                                </Row>
                                                <p>{program.description}</p>
                                                <Row className="text-end">
                                                    <Col>
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                handleSelect(
                                                                    program,
                                                                    price
                                                                )
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
            </Form>
        </Col>
    );
}
