// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Api
import { updateClient } from "../../../api/client";

export function ClientsModalModify({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    defaultValues,
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
        reset,
    } = useForm(defaultValues);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler de modificar cliente
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);
        const backendValidation = async () => {
            try {
                const res = await updateClient(values._id, values);

                setLoading(false);

                setAlertType("success");
                setAlertText("Paciente modificado correctamente");
                setShowAlert(true);

                handleClose();
            } catch (error) {
                if (error.response.status === 400) {
                    let backendErrors;

                    if (error.response.data.error !== undefined) {
                        // Error de zod
                        backendErrors = error.response.data.error;
                    } else if (error.response.data.message !== undefined) {
                        // Error de validación
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

    return (
        <Modal show={show} onHide={handleClose}>
            <Form className="p-2" onSubmit={onSubmit}>
                <Modal.Header closeButton disabled={loading}>
                    <Modal.Title>
                        Modificar paciente: {defaultValues.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    message: "Se requiere un rut",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.rut && errors.rut.message}
                        </span>
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
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
                        <span className="text-danger">
                            {errors.phone && errors.phone.message}
                        </span>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cerrar
                    </Button>
                    <Button variant="warning" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Modificar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
