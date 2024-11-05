// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Api
import { updateProgram } from "../../../api/program";

export function ProgramsModalModify({
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

    // Handler de modificar programa
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
                const res = await updateProgram(values._id, values);

                setLoading(false);

                setAlertType("success");
                setAlertText("Programa modificado correctamente");
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
                        Modificar programa: {defaultValues.name}
                    </Modal.Title>
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
                    <Form.Group className="mb-3" controlId="specialty">
                        <Form.Label>Especialidad</Form.Label>
                        <select
                            className={
                                errors.specialty
                                    ? "form-select is-invalid"
                                    : "form-select"
                            }
                            {...register("specialty", {
                                required: {
                                    value: true,
                                    message: "Se requiere una especialidad",
                                },
                            })}
                        >
                            <option value="">
                                Seleccionar una especialidad...
                            </option>
                            {["Kinesiología", "Nutrición", "Psicología"].map(
                                (option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )
                            )}
                        </select>
                        <span className="text-danger">
                            {errors.specialty && errors.specialty.message}
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
                    <Button variant="warning" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Modificar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
