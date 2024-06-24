// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Api
import { deleteProfile } from "../../../api/profile";

export function ProfilesModalDelete({
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
        formState: { errors },
        reset,
        setError,
    } = useForm(defaultValues);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler de la eliminación de profile
    const onSubmit = handleSubmit(async (values) => {
        values.staff = values.staff === "staff" ? true : false;

        setLoading(true);
        const backendValidation = async () => {
            try {
                const res = await deleteProfile(values._id);

                setLoading(false);

                setAlertType("success");
                setAlertText("Perfil eliminado correctamente");
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
                    <Modal.Title>Eliminar usuario</Modal.Title>
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
                            disabled
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
                            disabled
                        />
                        <span className="text-danger">
                            {errors.variable && errors.variable.message}
                        </span>
                    </Form.Group>
                    {[...Array(defaultValues.variables)].map((_, index) => (
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
                                disabled
                            />
                            <span className="text-danger">
                                {errors[`variable-${index}`] &&
                                    errors[`variable-${index}`].message}
                            </span>
                        </Form.Group>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cerrar
                    </Button>
                    <Button variant="danger" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Eliminar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
