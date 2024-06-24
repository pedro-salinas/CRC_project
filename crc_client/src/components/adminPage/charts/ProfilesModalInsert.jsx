// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Bootstrap icons
import { XLg, PlusCircle, XCircle } from "react-bootstrap-icons";

// Api
import { insertProfileRequest } from "../../../api/profile";

export function ProfilesModalInsert({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    closeSession,
}) {
    // Botones se cambian en cargando
    const [loading, setLoading] = useState(false);

    // UseForm para formulario
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        unregister,
        watch,
        setValue,
    } = useForm();

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler para ingresar perfiles
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);
        const backendValidation = async () => {
            try {
                const name = values.name;
                delete values.name;
                const array = Object.values(values);
                const data = { name: name, variables: array };

                const res = await insertProfileRequest(data);

                setLoading(false);

                setAlertType("success");
                setAlertText("Perfil ingresado correctamente");
                setShowAlert(true);

                onHideClear();
                handleClose();
            } catch (error) {
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

                    backendErrors.forEach((backendErr) => {
                        const field = backendErr[0];
                        const errorMessage = backendErr[1];
                        setError(field, {
                            type: "custom",
                            message: errorMessage,
                        });
                    });
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
                        closeSession();
                    }
                } else if (error.response.status === 401) {
                    closeSession();
                } else {
                    closeSession();
                }
                setLoading(false);
            }
        };
        setTimeout(() => {
            backendValidation();
        }, 500);
    });

    const onHideClear = () => {
        Object.keys(watch()).forEach((name) => setValue(name, ""));
        Object.keys(watch()).forEach((name) => unregister(name));

        setNumAdditionalContent(0);
    };

    const [numAdditionalContent, setNumAdditionalContent] = useState(0);

    const addAdditionalContent = () => {
        setNumAdditionalContent(numAdditionalContent + 1);
    };

    const removeAdditionalContent = () => {
        if (numAdditionalContent != 0) {
            unregister(`variable-${numAdditionalContent - 1}`);
            setNumAdditionalContent(numAdditionalContent - 1);
        }
    };

    return (
        <Modal
            show={show}
            onHide={() => {
                onHideClear();
                handleClose();
            }}
        >
            <Form className="p-2" onSubmit={onSubmit}>
                <Modal.Header closeButton disabled={loading}>
                    <Modal.Title>Ingresar perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Form.Group className="mb-3" controlId="variable">
                        <Form.Label>Variable 1</Form.Label>
                        <input
                            type="text"
                            className={
                                errors.variable
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("variable", {
                                required: {
                                    value: true,
                                    message: "Se requiere una variable",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.variable && errors.variable.message}
                        </span>
                    </Form.Group>
                    {[...Array(numAdditionalContent)].map((_, index) => (
                        <Form.Group
                            key={index}
                            className="mb-3"
                            controlId={`variable-${index}`}
                        >
                            <Form.Label>Variable {index + 2}</Form.Label>
                            <input
                                type="text"
                                className={
                                    errors[`variable-${index}`]
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                {...register(`variable-${index}`, {
                                    required: {
                                        value: true,
                                        message: "Se requiere una variable",
                                    },
                                })}
                            />
                            <span className="text-danger">
                                {errors[`variable-${index}`] &&
                                    errors[`variable-${index}`].message}
                            </span>
                        </Form.Group>
                    ))}
                    <Form.Group className="mb-3" controlId="state">
                        <Row className="text-center">
                            <Col>
                                <Button
                                    variant="primary"
                                    onClick={addAdditionalContent}
                                    className="mx-1"
                                >
                                    Agregar variable{"     "}
                                    <PlusCircle size={20} color="white" />
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    variant="secondary"
                                    onClick={removeAdditionalContent}
                                    className="mx-1"
                                >
                                    Quitar variable{"     "}
                                    <XCircle size={20} color="white" />
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            onHideClear();
                            handleClose();
                        }}
                        disabled={loading}
                    >
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Ingresar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
