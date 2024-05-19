import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Importar API
import { insertProgramRequest } from "../../../api/program";

export function ProgramsModalInsert({
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
    } = useForm();

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler para ingresar programa
    const onSubmit = handleSubmit(async (values) => {
        // Formato booleano
        values.on_sale = values.on_sale === "true" ? true : false;
        values.visible = values.visible === "true" ? true : false;
        values.agenda = values.agenda === "true" ? true : false;
        values.price = parseInt(values.price);
        values.on_sale_price = parseInt(values.on_sale_price);

        setLoading(true);
        const backendValidation = async () => {
            try {
                const res = await insertProgramRequest(values);

                setLoading(false);

                setAlertType("success");
                setAlertText("Programa ingresado correctamente");
                setShowAlert(true);

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

    return (
        <Modal show={show} onHide={handleClose}>
            <Form className="p-2" onSubmit={onSubmit}>
                <Modal.Header closeButton disabled={loading}>
                    <Modal.Title>Ingresar programa</Modal.Title>
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
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <input
                            type="text"
                            className={
                                errors.description
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Se requiere una descripción",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.description && errors.description.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <input
                            type="number"
                            className={
                                errors.price
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: "Se requiere un precio",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.price && errors.price.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="on_sale_price">
                        <Form.Label>Precio de oferta</Form.Label>
                        <input
                            type="number"
                            className={
                                errors.on_sale_price
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("on_sale_price", {
                                required: {
                                    value: true,
                                    message: "Se requiere un precio de oferta",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.on_sale_price &&
                                errors.on_sale_price.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="on_sale">
                        <Form.Label>Oferta disponible</Form.Label>
                        <div className="form-check">
                            <input
                                name="on_sale"
                                type="radio"
                                value="true"
                                className="form-check-input"
                                {...register("on_sale", {
                                    required: {
                                        value: true,
                                        message:
                                            "Se requiere seleccionar una opción",
                                    },
                                })}
                            />
                            <label class="form-check-label">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                name="on_sale"
                                type="radio"
                                value="false"
                                className="form-check-input"
                                {...register("on_sale", {
                                    required: {
                                        value: true,
                                        message:
                                            "Se requiere seleccionar una opción",
                                    },
                                })}
                            />
                            <label class="form-check-label">No</label>
                        </div>
                        <span className="text-danger">
                            {errors.on_sale && errors.on_sale.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="visible">
                        <Form.Label>Programa disponible en la web</Form.Label>
                        <div className="form-check">
                            <input
                                name="visible"
                                type="radio"
                                value="true"
                                className="form-check-input"
                                {...register("visible", {
                                    required: {
                                        value: true,
                                        message:
                                            "Se requiere seleccionar una opción",
                                    },
                                })}
                            />
                            <label class="form-check-label">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                name="visible"
                                type="radio"
                                value="false"
                                className="form-check-input"
                                {...register("visible", {
                                    required: {
                                        value: true,
                                        message:
                                            "Se requiere seleccionar una opción",
                                    },
                                })}
                            />
                            <label class="form-check-label">No</label>
                        </div>
                        <span className="text-danger">
                            {errors.visible && errors.visible.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="agenda">
                        <Form.Label>
                            Programa disponible para agendar
                        </Form.Label>
                        <div className="form-check">
                            <input
                                name="agenda"
                                type="radio"
                                value="true"
                                className="form-check-input"
                                {...register("agenda", {
                                    required: {
                                        value: true,
                                        message:
                                            "Se requiere seleccionar una opción",
                                    },
                                })}
                            />
                            <label class="form-check-label">Sí</label>
                        </div>
                        <div className="form-check">
                            <input
                                name="agenda"
                                type="radio"
                                value="false"
                                className="form-check-input"
                                {...register("agenda", {
                                    required: {
                                        value: true,
                                        message:
                                            "Se requiere seleccionar una opción",
                                    },
                                })}
                            />
                            <label class="form-check-label">No</label>
                        </div>
                        <span className="text-danger">
                            {errors.agenda && errors.agenda.message}
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
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Ingresar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
