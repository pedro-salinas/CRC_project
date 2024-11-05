// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

// Bootstrap icons
import { Check2Circle } from "react-bootstrap-icons";

export function Stage4({ goStage1 }) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }

    // Porcentaje barra de progreso
    const [email, setEmail] = useState(localStorage.getItem("email"));

    return (
        <Col className="pt-4 attention-height">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="text-center border-0 ">
                        <Card.Body>
                            <h3 className="fw-bold mb-3">
                                ¡Hora agendada con éxito!
                            </h3>
                            <p className="mb-4">
                                Su hora ha sido agendada exitosamente. Hemos
                                enviado un correo a{" "}
                                <span>
                                    <strong>{email}</strong>
                                </span>{" "}
                                con todos los detalles de la cita, incluyendo la
                                fecha, hora, y lugar de atención. Cualquier duda
                                por favor responda a este correo o póngase en
                                contacto con +56 9 66140265. Gracias.
                            </p>
                            <Button
                                variant="primary"
                                className="mt-3"
                                onClick={goStage1}
                            >
                                Volver a agendar
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
    );
}
