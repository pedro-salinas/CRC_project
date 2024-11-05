// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";

// Api
import { insertAttentionWebRequest } from "../../api/attention";

export function Stage3({ goStage2, goStage4 }) {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        getValues,
    } = useForm();

    // Valores importantes
    const [program, setProgram] = useState(
        JSON.parse(localStorage.getItem("program"))
    );

    const [price, setPrice] = useState(
        JSON.parse(localStorage.getItem("price"))
    );

    const [specialty, setSpecialty] = useState(
        localStorage.getItem("specialty")
    );

    const [prevision, setPrevision] = useState(
        localStorage.getItem("prevision")
    );

    const [day, setDay] = useState(localStorage.getItem("day"));

    const [hour, setHour] = useState(localStorage.getItem("hour"));

    const [fullHour, setFullHour] = useState(localStorage.getItem("fullHour"));

    // Formato de precio
    const formatPrice = (price) => `$${price.toLocaleString("es-CL")}`;

    const formattedPrice = formatPrice(price);

    // Alerta en tabla y mensaje
    const [showAlert, setShowAlert] = useState(false);

    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    function cleanAlert() {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }

    // Handler para ingresar kine
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);
        const backendValidation = async () => {
            try {
                const auxDay = Number(day.split(" ")[1]);
                const auxMonth = Number(day.split(" ")[2]);
                const auxYear = Number(day.split(" ")[3]);

                const auxHour = Number(hour.split(":")[0]);

                const auxPrice = Number(price);
                values.price = auxPrice;

                values.prevision = prevision;

                const programID = program._id;

                const description = `RUT: ${values.rut}\nNombre: ${
                    values.name
                }\nEmail: ${values.email}\nTeléfono: ${
                    values.phone
                }\nEspecialidad: ${specialty}\nPrevisión: ${prevision}\nTotal a pagar: $${auxPrice.toLocaleString(
                    "es-CL"
                )}`;

                const data = {
                    rut: values.rut,
                    email: values.email,
                    program: programID,
                    hour: auxHour,
                    day: auxDay,
                    month: auxMonth,
                    year: auxYear,
                    blocked: false,
                    state: "pendiente",
                    web_client: values,
                    specialty,
                    description,
                };

                localStorage.setItem("rut", values.rut);
                localStorage.setItem("email", values.email);

                const res2 = await insertAttentionWebRequest(data);

                setLoading(false);

                goStage4();

                // setAlertType("success");
                // setAlertText("Hora agendada exitosamente");
                // setShowAlert(true);
            } catch (error) {
                console.log(error);
                if (error.response.status === 400) {
                    // Fallo anterior al controlador
                    let backendErrors;

                    if (error.response.data.error !== undefined) {
                        // Error de zod
                        backendErrors = error.response.data.error;
                    } else if (error.response.data.message !== undefined) {
                        // Error de validación (middlewares)
                        backendErrors = [error.response.data.message];
                    }

                    let auxAlexMessage = "";

                    let hasErrors = false;

                    const allFields = Object.keys(getValues());

                    backendErrors.forEach((backendErr) => {
                        const field = backendErr[0];
                        const errorMessage = backendErr[1];

                        const existsFieldError = allFields.includes(field);

                        if (existsFieldError) {
                            hasErrors = true;

                            setError(field, {
                                type: "custom",
                                message: errorMessage,
                            });
                        } else {
                            auxAlexMessage =
                                auxAlexMessage + errorMessage + "\n";
                        }
                    });

                    if (!hasErrors) {
                        setAlertType("danger");
                        setAlertText(auxAlexMessage);
                        setShowAlert(true);
                    }
                } else if (error.response.status === 500) {
                    // Fallo del controlador
                    if (error.response.data.message.code == 11000) {
                        // Error de duplicacion
                        const field = Object.keys(
                            error.response.data.message.keyValue
                        )[0];

                        const fieldsObj = {
                            email: "Correo",
                            rut: "Rut",
                            color: "Color",
                            name: "Nombre",
                        };
                        const errorMessage =
                            fieldsObj[field] + " ya se encuentra en uso";

                        setError(field, {
                            type: "custom",
                            message: errorMessage,
                        });
                    } else {
                        console.log(error);
                    }
                } else if (error.response.status === 401) {
                    console.log(error);
                } else {
                    console.log(error);
                }
                setLoading(false);
            }
        };
        setTimeout(() => {
            backendValidation();
        }, 500);
    });

    return (
        <Col className="pt-4 attention-height">
            <Row className="text-center">
                <h1 className="fw-bold ">Resumen</h1>
                <h4 className="lead fw-bold">
                    {program.name} - {prevision} - {specialty}
                </h4>
                <h4 className="lead">Fecha: {fullHour}</h4>
                <h4 className="lead">Valor: {formattedPrice}</h4>
            </Row>
            <Row className="text-center">
                <h1 className="fw-bold ">Introducir datos personales</h1>{" "}
            </Row>
            <Row className="p-4">
                <Col md={6} className="mx-auto">
                    {showAlert && (
                        <Alert
                            className="m-2"
                            variant={alertType}
                            onClose={cleanAlert}
                            dismissible
                        >
                            {alertText}
                        </Alert>
                    )}
                    <Form className="p-2" onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Nombre</Form.Label>
                            <input
                                type="text"
                                className={
                                    errors.name
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Se requiere un nombre",
                                    },
                                })}
                            />
                            <span className="text-danger">
                                {errors.name && errors.name.message}
                            </span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="rut">
                            <Form.Label>RUT</Form.Label>
                            <input
                                type="text"
                                className={
                                    errors.rut
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                {...register("rut", {
                                    required: {
                                        value: true,
                                        message: "Se requiere un RUT",
                                    },
                                })}
                            />
                            <span className="text-danger">
                                {errors.rut && errors.rut.message}
                            </span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Correo electrónico</Form.Label>
                            <input
                                type="email"
                                className={
                                    errors.email
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Se requiere un correo",
                                    },
                                })}
                            />
                            <span className="text-danger">
                                {errors.email && errors.email.message}
                            </span>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label>Teléfono</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>+5 69</InputGroup.Text>
                                <input
                                    type="number"
                                    className={
                                        errors.phone
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    {...register("phone", {
                                        required: {
                                            value: true,
                                            message: "Se requiere un teléfono",
                                        },
                                    })}
                                />
                            </InputGroup>
                            <span className="text-danger">
                                {errors.phone && errors.phone.message}
                            </span>
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                disabled={loading}
                                className="me-2"
                                onClick={() => {
                                    goStage2(null, null, null);
                                }}
                            >
                                Volver
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                                className="me-2"
                            >
                                {loading ? "Cargando.." : "Agendar"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Col>
            </Row>
        </Col>
    );
}
